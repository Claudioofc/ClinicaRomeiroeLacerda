angular.module('clinicaApp')
    .service('analyticsService', ['$window', function($window) {
        
        // Google Analytics Configuration
        const GA_MEASUREMENT_ID = 'G-XXXXXXXXXX'; // Substitua por um ID válido do Google Analytics
        
        // Initialize Google Analytics
        function initGoogleAnalytics() {
            // Check if already loaded
            if ($window.dataLayer && $window.gtag) {
                console.log('✅ Google Analytics já carregado');
                return;
            }
            
            console.log('🚀 Inicializando Google Analytics...');
            
            // Create and configure loading script
            const script = document.createElement('script');
            script.async = true;
            script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
            
            // Add error handling
            script.onerror = function() {
                console.error('❌ Erro ao carregar Google Analytics');
            };
            
            script.onload = function() {
                console.log('✅ Script do Google Analytics carregado');
            };
            
            // Add to document
            document.head.appendChild(script);
            
            // Configure dataLayer and gtag function
            $window.dataLayer = $window.dataLayer || [];
            $window.gtag = function() { 
                $window.dataLayer.push(arguments); 
                console.log('📊 GA Event:', arguments);
            };
            
            // Initialize with current date
            $window.gtag('js', new Date());
            $window.gtag('config', GA_MEASUREMENT_ID, {
                // Configurações opcionais
                send_page_view: true,
                anonymize_ip: true,
                allow_google_signals: false
            });
            
            console.log(`📈 Google Analytics configurado com ID: ${GA_MEASUREMENT_ID}`);
        }



        // Track Referrer
        function trackReferrer() {
            const referrer = document.referrer || 'Direct';
            trackEvent('Traffic Source', 'referrer', referrer);
        }

        // Track Location - Múltiplas fontes de dados geográficos
        function trackLocation() {
            console.log('🌍 Iniciando rastreamento de localização...');
            
            // 1. Tentar geolocalização precisa (GPS)
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    function(position) {
                        const latitude = position.coords.latitude;
                        const longitude = position.coords.longitude;
                        const accuracy = position.coords.accuracy;
                        
                        console.log(`📍 Coordenadas obtidas: ${latitude}, ${longitude} (precisão: ${accuracy}m)`);
                        
                        // Buscar informações detalhadas da localização
                        fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=pt`)
                            .then(response => response.json())
                            .then(data => {
                                const locationData = {
                                    city: data.city || data.locality || 'Desconhecida',
                                    state: data.principalSubdivision || data.region || 'Desconhecido',
                                    country: data.countryName || 'Desconhecido',
                                    countryCode: data.countryCode || 'XX',
                                    postalCode: data.postcode || '',
                                    latitude: latitude.toFixed(6),
                                    longitude: longitude.toFixed(6),
                                    accuracy: Math.round(accuracy)
                                };
                                
                                console.log('🏙️ Localização detalhada:', locationData);
                                
                                // Enviar eventos detalhados para o Google Analytics
                                trackEvent('User Location', 'precise_location', `${locationData.city}, ${locationData.state}, ${locationData.country}`);
                                trackEvent('Geographic Data', 'country', locationData.country);
                                trackEvent('Geographic Data', 'state', locationData.state);
                                trackEvent('Geographic Data', 'city', locationData.city);
                                
                                // Enviar coordenadas para GA (útil para mapas de calor)
                                if ($window.gtag) {
                                    $window.gtag('event', 'location_data', {
                                        'custom_parameter_latitude': locationData.latitude,
                                        'custom_parameter_longitude': locationData.longitude,
                                        'custom_parameter_city': locationData.city,
                                        'custom_parameter_state': locationData.state,
                                        'custom_parameter_country': locationData.country,
                                        'custom_parameter_accuracy': locationData.accuracy
                                    });
                                }
                            })
                            .catch(error => {
                                console.error('❌ Erro ao buscar dados de localização:', error);
                                // Fallback: enviar apenas coordenadas
                                trackEvent('User Location', 'coordinates_only', `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`);
                            });
                    },
                    function(error) {
                        console.warn('⚠️ Geolocalização negada ou indisponível:', error.message);
                        // Fallback para localização por IP
                        trackLocationByIP();
                    },
                    {
                        enableHighAccuracy: true,
                        timeout: 10000,
                        maximumAge: 300000 // 5 minutos
                    }
                );
            } else {
                console.warn('⚠️ Geolocalização não suportada pelo navegador');
                trackLocationByIP();
            }
        }
        
        // Fallback: Rastreamento por IP
        function trackLocationByIP() {
            console.log('🌐 Tentando localização por IP...');
            
            // Usar múltiplas APIs para maior precisão
            const ipApis = [
                'https://ipapi.co/json/',
                'https://ip-api.com/json/?lang=pt',
                'https://ipinfo.io/json'
            ];
            
            // Tentar primeira API
            fetch(ipApis[0])
                .then(response => response.json())
                .then(data => {
                    const locationData = {
                        city: data.city || 'Desconhecida',
                        state: data.region || data.region_code || 'Desconhecido',
                        country: data.country_name || data.country || 'Desconhecido',
                        countryCode: data.country_code || 'XX',
                        ip: data.ip || 'Desconhecido',
                        isp: data.org || data.isp || 'Desconhecido'
                    };
                    
                    console.log('🌐 Localização por IP:', locationData);
                    
                    // Enviar dados para Analytics
                    trackEvent('User Location', 'ip_location', `${locationData.city}, ${locationData.state}, ${locationData.country}`);
                    trackEvent('Geographic Data', 'country_ip', locationData.country);
                    trackEvent('Geographic Data', 'state_ip', locationData.state);
                    trackEvent('Geographic Data', 'city_ip', locationData.city);
                    trackEvent('Network Info', 'isp', locationData.isp);
                    
                    // Dados customizados para GA
                    if ($window.gtag) {
                        $window.gtag('event', 'ip_location_data', {
                            'custom_parameter_ip_city': locationData.city,
                            'custom_parameter_ip_state': locationData.state,
                            'custom_parameter_ip_country': locationData.country,
                            'custom_parameter_isp': locationData.isp
                        });
                    }
                })
                .catch(error => {
                    console.error('❌ Erro na localização por IP:', error);
                    // Último fallback: dados básicos do navegador
                    trackBasicLocationData();
                });
        }
        
        // Último fallback: dados básicos
        function trackBasicLocationData() {
            console.log('🔤 Usando dados básicos do navegador...');
            
            const basicData = {
                language: navigator.language || 'Desconhecido',
                languages: navigator.languages ? navigator.languages.join(', ') : 'Desconhecido',
                timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || 'Desconhecido',
                platform: navigator.platform || 'Desconhecido'
            };
            
            console.log('🔤 Dados básicos:', basicData);
            
            trackEvent('User Info', 'language', basicData.language);
            trackEvent('User Info', 'timezone', basicData.timezone);
            trackEvent('User Info', 'platform', basicData.platform);
            
            if ($window.gtag) {
                $window.gtag('event', 'basic_user_data', {
                    'custom_parameter_language': basicData.language,
                    'custom_parameter_timezone': basicData.timezone,
                    'custom_parameter_platform': basicData.platform
                });
            }
        }

        // Track UTM Parameters e dados de origem
        function trackUTM() {
            const urlParams = new URLSearchParams($window.location.search);
            const utmData = {
                source: urlParams.get('utm_source') || 'Direct',
                medium: urlParams.get('utm_medium') || 'None',
                campaign: urlParams.get('utm_campaign') || 'None',
                term: urlParams.get('utm_term') || 'None',
                content: urlParams.get('utm_content') || 'None'
            };
            
            console.log('📊 Dados UTM:', utmData);
            
            // Rastrear cada parâmetro UTM separadamente
            trackEvent('Traffic Source', 'utm_source', utmData.source);
            trackEvent('Traffic Source', 'utm_medium', utmData.medium);
            trackEvent('Traffic Source', 'utm_campaign', utmData.campaign);
            
            if (utmData.term !== 'None') {
                trackEvent('Traffic Source', 'utm_term', utmData.term);
            }
            
            if (utmData.content !== 'None') {
                trackEvent('Traffic Source', 'utm_content', utmData.content);
            }
            
            // Enviar dados completos para GA
            if ($window.gtag) {
                $window.gtag('event', 'utm_tracking', {
                    'custom_parameter_utm_source': utmData.source,
                    'custom_parameter_utm_medium': utmData.medium,
                    'custom_parameter_utm_campaign': utmData.campaign,
                    'custom_parameter_utm_term': utmData.term,
                    'custom_parameter_utm_content': utmData.content
                });
            }
        }
        
        // Rastrear dados de sessão e comportamento
        function trackSessionData() {
            console.log('📈 Rastreando dados de sessão...');
            
            const sessionData = {
                timestamp: new Date().toISOString(),
                url: $window.location.href,
                pathname: $window.location.pathname,
                hostname: $window.location.hostname,
                referrer: document.referrer || 'Direct',
                userAgent: navigator.userAgent,
                screenResolution: `${screen.width}x${screen.height}`,
                viewportSize: `${$window.innerWidth}x${$window.innerHeight}`,
                colorDepth: screen.colorDepth,
                pixelRatio: $window.devicePixelRatio || 1,
                connectionType: navigator.connection ? navigator.connection.effectiveType : 'Unknown',
                cookiesEnabled: navigator.cookieEnabled,
                javaEnabled: navigator.javaEnabled ? navigator.javaEnabled() : false,
                doNotTrack: navigator.doNotTrack === '1' ? 'Yes' : 'No'
            };
            
            console.log('📱 Dados da sessão:', sessionData);
            
            // Rastrear informações técnicas
            trackEvent('Technical Info', 'screen_resolution', sessionData.screenResolution);
            trackEvent('Technical Info', 'viewport_size', sessionData.viewportSize);
            trackEvent('Technical Info', 'color_depth', sessionData.colorDepth.toString());
            trackEvent('Technical Info', 'pixel_ratio', sessionData.pixelRatio.toString());
            
            if (sessionData.connectionType !== 'Unknown') {
                trackEvent('Technical Info', 'connection_type', sessionData.connectionType);
            }
            
            // Rastrear origem do tráfego
            if (sessionData.referrer !== 'Direct') {
                try {
                    const referrerDomain = new URL(sessionData.referrer).hostname;
                    trackEvent('Traffic Source', 'referrer_domain', referrerDomain);
                } catch (e) {
                    trackEvent('Traffic Source', 'referrer', sessionData.referrer);
                }
            }
            
            // Enviar dados completos para GA
            if ($window.gtag) {
                $window.gtag('event', 'session_data', {
                    'custom_parameter_screen_resolution': sessionData.screenResolution,
                    'custom_parameter_viewport_size': sessionData.viewportSize,
                    'custom_parameter_connection_type': sessionData.connectionType,
                    'custom_parameter_pixel_ratio': sessionData.pixelRatio,
                    'custom_parameter_referrer': sessionData.referrer
                });
            }
        }

        // Simple Local Tracking (fallback)
        function trackLocalEvent(category, action, label) {
            const event = {
                timestamp: new Date().toISOString(),
                category: category,
                action: action,
                label: label,
                url: $window.location.href,
                userAgent: navigator.userAgent
            };
            
            // Store in localStorage for debugging
            const events = JSON.parse(localStorage.getItem('clinica_events') || '[]');
            events.push(event);
            localStorage.setItem('clinica_events', JSON.stringify(events.slice(-50))); // Keep last 50 events
        }

        // Enhanced Track Events
        function trackEvent(category, action, label, value) {
            const eventData = {
                category: category,
                action: action,
                label: label,
                value: value || 1,
                timestamp: new Date().toISOString()
            };
            
            // Always track locally
            trackLocalEvent(category, action, label);
            
            // Try Google Analytics if available
            if ($window.gtag) {
                try {
                    $window.gtag('event', action, {
                        'event_category': category,
                        'event_label': label,
                        'value': value || 1,
                        'custom_parameter_url': $window.location.href,
                        'custom_parameter_timestamp': eventData.timestamp
                    });
                    console.log(`✅ GA Event sent: ${category} - ${action} - ${label}`);
                } catch (e) {
                    console.warn('❌ Google Analytics error:', e);
                }
            } else {
                console.warn('⚠️ Google Analytics não disponível - evento salvo apenas localmente');
            }
            
            console.log(`📝 Event tracked: ${category} - ${action} - ${label}`);
        }

        // Check Analytics Status
        function getAnalyticsStatus() {
            const status = {
                googleAnalytics: {
                    loaded: !!($window.gtag && $window.dataLayer),
                    dataLayerEvents: $window.dataLayer ? $window.dataLayer.length : 0,
                    measurementId: GA_MEASUREMENT_ID
                },
                localStorage: {
                    available: typeof(Storage) !== "undefined",
                    eventsCount: JSON.parse(localStorage.getItem('clinica_events') || '[]').length
                },
                browser: {
                    cookiesEnabled: navigator.cookieEnabled,
                    language: navigator.language,
                    userAgent: navigator.userAgent.substring(0, 100) + '...'
                }
            };
            
            console.log('📊 Analytics Status:', status);
            return status;
        }

        // Initialize All Tracking
        function initTracking() {
            console.log('🚀 Analytics initialized - Rastreamento Geográfico Avançado');
            initGoogleAnalytics();
            
            // Track initial events
            setTimeout(() => {
                trackSessionData();  // Dados da sessão primeiro
                trackReferrer();     // Origem do tráfego
                trackUTM();          // Parâmetros de campanha
                trackLocation();     // Localização geográfica (pode demorar)
                
                // Log status after initialization
                setTimeout(() => {
                    const status = getAnalyticsStatus();
                    console.log('📊 Resumo do rastreamento iniciado:', {
                        googleAnalytics: status.googleAnalytics.loaded ? '✅ Ativo' : '❌ Inativo',
                        localStorage: status.localStorage.available ? '✅ Disponível' : '❌ Indisponível',
                        eventsTracked: status.localStorage.eventsCount
                    });
                }, 1000);
            }, 500);
        }

        // Public API
        return {
            initTracking: initTracking,
            trackEvent: trackEvent,
            getLocalEvents: function() {
                return JSON.parse(localStorage.getItem('clinica_events') || '[]');
            },
            getStatus: getAnalyticsStatus,
            clearLocalEvents: function() {
                localStorage.removeItem('clinica_events');
                console.log('🗑️ Eventos locais limpos');
            }
        };
    }]); 