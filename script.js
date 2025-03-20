window.addEventListener('scroll', function() {
    const header = document.getElementById('header');
    const scrollPosition = window.scrollY || window.pageYOffset;

    // Adiciona a classe "shrink" se o scroll for maior que 100px
    if (scrollPosition > 100) {
        header.classList.add('shrink');
    } else {
        header.classList.remove('shrink');
    }
});

// Seleciona o ícone do WhatsApp pelo ID
const whatsappIcon = document.getElementById('whatsapp-icon');

// Adiciona um evento de clique ao ícone
if (whatsappIcon) {
    whatsappIcon.addEventListener('click', function(event) {
        event.preventDefault(); // Evita o comportamento padrão do link

        // Adiciona a classe de efeito
        this.classList.add('explode-effect');

        // Remove a classe após a animação terminar
        this.addEventListener('animationend', () => {
            this.classList.remove('explode-effect');
        });

        // Redireciona para o WhatsApp após a animação
        setTimeout(() => {
            window.location.href = 'http://wa.me/5531991242925'; // Substitua SEUNUMERO pelo seu número
        }, 500); // Tempo correspondente à duração da animação
    });
}