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

// Efeito de clique no ícone do WhatsApp
const whatsappIcon = document.getElementById('whatsapp-icon');
if (whatsappIcon) {
    whatsappIcon.addEventListener('click', function (event) {
        event.preventDefault(); // Evita o comportamento padrão do link

        // Adiciona a classe de efeito
        this.classList.add('explode-effect');

        // Remove a classe após a animação terminar
        this.addEventListener('animationend', () => {
            this.classList.remove('explode-effect');
        });

        // Redireciona para o WhatsApp após a animação
        setTimeout(() => {
            window.location.href = 'https://wa.me/5531991242925?text=Vim%20pelo%20site%20romeiroelacerda%20(Ícone%20Flutuante)';
        }, 500); // Tempo correspondente à duração da animação
    });
}

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
window.onload = function() {
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

// Inicializa o rastreamento ao carregar a página
document.addEventListener('DOMContentLoaded', trackWhatsAppClicks);