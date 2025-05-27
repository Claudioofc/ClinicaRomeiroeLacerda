'use strict';

angular.module('clinicaApp')
.service('AnalyticsService', ['$window', function($window) {
    // Rastreamento de cliques no WhatsApp
    this.trackWhatsAppClick = function(origin) {
        console.log('Clique no WhatsApp detectado. Origem: ' + origin);
        if ($window.gtag) {
            $window.gtag('event', 'click', {
                'event_category': 'WhatsApp',
                'event_label': origin,
                'value': 1
            });
        }
    };

    // Rastreamento de origem do tráfego
    this.trackReferrer = function() {
        const referrer = document.referrer || 'Direto';
        console.log('Usuário acessou a partir de: ' + referrer);
        if ($window.gtag) {
            $window.gtag('event', 'referrer', {
                'event_category': 'Traffic Source',
                'event_label': referrer,
                'value': 1
            });
        }
    };

    // Rastreamento de localização
    this.trackLocation = function() {
        if ($window.navigator.geolocation) {
            $window.navigator.geolocation.getCurrentPosition(
                function(position) {
                    const latitude = position.coords.latitude;
                    const longitude = position.coords.longitude;
                    
                    console.log('Localização do usuário: Latitude ' + latitude + ', Longitude ' + longitude);
                    
                    if ($window.gtag) {
                        $window.gtag('event', 'location', {
                            'event_category': 'User Location',
                            'event_label': 'Lat: ' + latitude + ', Long: ' + longitude,
                            'value': 1
                        });
                    }

                    fetch('https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=' + latitude + '&longitude=' + longitude + '&localityLanguage=pt')
                        .then(response => response.json())
                        .then(data => {
                            const city = data.city || 'Desconhecido';
                            const country = data.countryName || 'Desconhecido';
                            console.log('Usuário acessou de: ' + city + ', ' + country);
                            if ($window.gtag) {
                                $window.gtag('event', 'location', {
                                    'event_category': 'User Location',
                                    'event_label': city + ', ' + country,
                                    'value': 1
                                });
                            }
                        })
                        .catch(function(error) {
                            console.error('Erro ao obter localização:', error);
                        });
                },
                function(error) {
                    console.error('Erro ao obter localização:', error.message);
                }
            );
        } else {
            console.log('Geolocalização não suportada pelo navegador.');
        }
    };

    // Rastreamento de parâmetros UTM
    this.trackUTM = function() {
        const urlParams = new URLSearchParams($window.location.search);
        const utmSource = urlParams.get('utm_source') || 'Direto';
        const utmMedium = urlParams.get('utm_medium') || 'Nenhum';
        const utmCampaign = urlParams.get('utm_campaign') || 'Nenhum';
        
        console.log('UTM Source: ' + utmSource + ', UTM Medium: ' + utmMedium + ', UTM Campaign: ' + utmCampaign);
        
        if ($window.gtag) {
            $window.gtag('event', 'utm', {
                'event_category': 'Traffic Source',
                'event_label': 'Source: ' + utmSource + ', Medium: ' + utmMedium + ', Campaign: ' + utmCampaign,
                'value': 1
            });
        }
    };

    // Inicialização do rastreamento
    this.init = function() {
        this.trackReferrer();
        this.trackLocation();
        this.trackUTM();
    };
}]); 