// Função para mostrar/ocultar texto ao clicar nas caixas
function toggleTexto(element) {
    const texto = element.querySelector('.hidden-texto');
    texto.classList.toggle('show-texto');
}

// Função para controlar o efeito de shrink/expand no header ao rolar a página
window.addEventListener('scroll', function () {
    const header = document.getElementById('header');
    const scrollPosition = window.scrollY || window.pageYOffset;

    // Adiciona a classe "shrink" se o scroll for maior que 100px
    if (scrollPosition > 100) {
        header.classList.add('shrink');
    } else {
        header.classList.remove('shrink');
    }
});

// Bloquear rolagem ao abrir o menu
document.addEventListener('DOMContentLoaded', function () {
    const closeMenuCheckbox = document.getElementById('close-menu');
    const closeMenuLabel = document.querySelector('.close-menu-label');

    if (closeMenuCheckbox && closeMenuLabel) {
        closeMenuLabel.addEventListener('click', function (event) {
            event.preventDefault(); // Evita o comportamento padrão do label
            closeMenuCheckbox.checked = !closeMenuCheckbox.checked; // Alterna o estado do checkbox

            // Adiciona ou remove a classe para bloquear a rolagem
            if (closeMenuCheckbox.checked) {
                document.body.classList.add('menu-open');
            } else {
                document.body.classList.remove('menu-open');
            }

            // Impede o scroll para o topo
            return false;
        });

        // Remove a associação do label com o checkbox
        closeMenuLabel.removeAttribute('for');
    }
});

// Ativar a aba "Clínico Geral" ao clicar no link do menu
document.addEventListener('DOMContentLoaded', function () {
    const clinicoGeralLink = document.querySelector('a[href="#tab-2"]');
    if (clinicoGeralLink) {
        clinicoGeralLink.addEventListener('click', function (event) {
            event.preventDefault(); // Evita o comportamento padrão do link

            // Remove a classe 'active' de todos os botões e conteúdos
            const tabButtons = document.querySelectorAll('.tab-button');
            const tabContents = document.querySelectorAll('.tab-content');
            tabButtons.forEach((btn) => btn.classList.remove('active'));
            tabContents.forEach((content) => content.classList.remove('active'));

            // Adiciona a classe 'active' ao botão e conteúdo da aba Clínico Geral
            const tabButton = document.querySelector('.tab-button[data-tab="2"]');
            const tabContent = document.getElementById('tab-2');
            if (tabButton && tabContent) {
                tabButton.classList.add('active');
                tabContent.classList.add('active');
            }

            // Rola a página até a seção de Tratamentos
            const tratamentosSection = document.getElementById('tratamentos');
            if (tratamentosSection) {
                tratamentosSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    // Adiciona eventos de clique aos botões das abas
    const tabButtons = document.querySelectorAll('.tab-button');
    tabButtons.forEach((button) => {
        button.addEventListener('click', function () {
            // Remove a classe 'active' de todos os botões e conteúdos
            tabButtons.forEach((btn) => btn.classList.remove('active'));
            const tabContents = document.querySelectorAll('.tab-content');
            tabContents.forEach((content) => content.classList.remove('active'));

            // Adiciona a classe 'active' ao botão e conteúdo da aba clicada
            const tabId = this.getAttribute('data-tab');
            const tabContent = document.getElementById(`tab-${tabId}`);
            if (tabContent) {
                this.classList.add('active');
                tabContent.classList.add('active');
            }
        });
    });
});

// Rolagem suave ao clicar na logo
document.addEventListener('DOMContentLoaded', function () {
    const logoLink = document.getElementById('logo-link');

    if (logoLink) {
        logoLink.addEventListener('click', function (event) {
            event.preventDefault(); // Evita o comportamento padrão do link

            // Rola a página suavemente para o topo
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});

// Garante que a página role para o topo ao ser carregada
window.onload = function () {
    window.scrollTo(0, 0);
};

// Função para rastrear cliques nos links do WhatsApp
function trackWhatsAppClicks() {
    const whatsappLinks = document.querySelectorAll('a[href*="wa.me"]');

    whatsappLinks.forEach(link => {
        link.addEventListener('click', function (event) {
            const href = this.href;
            const origin = href.includes('Resultados') ? 'Resultados' :
                href.includes('Lentes%20de%20Resina') ? 'Lentes de Resina' :
                    href.includes('Contato') ? 'Contato' :
                        href.includes('Ícone%20Flutuante') ? 'Ícone Flutuante' : 'Desconhecido';

            console.log(`Clique no WhatsApp detectado. Origem: ${origin}`);

            if (window.gtag) {
                gtag('event', 'click', {
                    'event_category': 'WhatsApp',
                    'event_label': origin,
                    'value': 1
                });
            }
        });
    });
}

// Função para rastrear cliques em qualquer elemento da página
function trackClicks() {
    document.addEventListener('click', function (event) {
        const target = event.target;

        // Verifica se o elemento clicado tem um ID ou classe
        const elementId = target.id || 'Sem ID';
        const elementClass = target.className || 'Sem Classe';

        // Registra a origem do clique no console
        console.log(`Clique detectado. Origem: ID - ${elementId}, Classe - ${elementClass}`);

        // Se você estiver usando Google Analytics, pode enviar um evento personalizado
        if (window.gtag) {
            gtag('event', 'click', {
                'event_category': 'User Interaction',
                'event_label': `ID: ${elementId}, Classe: ${elementClass}`,
                'value': 1
            });
        }
    });
}

// Função para rastrear a origem do tráfego (referrer)
function trackReferrer() {
    const referrer = document.referrer || 'Direto';
    console.log(`Usuário acessou a partir de: ${referrer}`);
    if (window.gtag) {
        gtag('event', 'referrer', {
            'event_category': 'Traffic Source',
            'event_label': referrer,
            'value': 1
        });
    }
}

// Função para rastrear a localização do usuário
function trackLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            function (position) {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                console.log(`Localização do usuário: Latitude ${latitude}, Longitude ${longitude}`);
                if (window.gtag) {
                    gtag('event', 'location', {
                        'event_category': 'User Location',
                        'event_label': `Lat: ${latitude}, Long: ${longitude}`,
                        'value': 1
                    });
                }
                fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=pt`)
                    .then(response => response.json())
                    .then(data => {
                        const city = data.city || 'Desconhecido';
                        const country = data.countryName || 'Desconhecido';
                        console.log(`Usuário acessou de: ${city}, ${country}`);
                        if (window.gtag) {
                            gtag('event', 'location', {
                                'event_category': 'User Location',
                                'event_label': `${city}, ${country}`,
                                'value': 1
                            });
                        }
                    })
                    .catch(error => {
                        console.error('Erro ao obter localização:', error);
                    });
            },
            function (error) {
                console.error('Erro ao obter localização:', error.message);
            }
        );
    } else {
        console.log('Geolocalização não suportada pelo navegador.');
    }
}

// Função para capturar parâmetros UTM da URL
function trackUTM() {
    const urlParams = new URLSearchParams(window.location.search);
    const utmSource = urlParams.get('utm_source') || 'Direto';
    const utmMedium = urlParams.get('utm_medium') || 'Nenhum';
    const utmCampaign = urlParams.get('utm_campaign') || 'Nenhum';
    console.log(`UTM Source: ${utmSource}, UTM Medium: ${utmMedium}, UTM Campaign: ${utmCampaign}`);
    if (window.gtag) {
        gtag('event', 'utm', {
            'event_category': 'Traffic Source',
            'event_label': `Source: ${utmSource}, Medium: ${utmMedium}, Campaign: ${utmCampaign}`,
            'value': 1
        });
    }
}

// Inicializa o rastreamento ao carregar a página
document.addEventListener('DOMContentLoaded', function () {
    trackReferrer();
    trackLocation();
    trackUTM();
    trackWhatsAppClicks(); // Sua função existente
    trackClicks(); // Sua função existente
});