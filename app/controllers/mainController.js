angular.module('clinicaApp')
    .controller('MainController', ['$scope', '$window', '$location', '$anchorScroll', '$sce', 'analyticsService', 
        function($scope, $window, $location, $anchorScroll, $sce, analyticsService) {
            
            // Menu and Header Control
            $scope.menuOpen = false;
            $scope.shrinkHeader = false;

            $scope.toggleMenu = function(event) {
                event.preventDefault();
                $scope.menuOpen = !$scope.menuOpen;
                document.body.classList.toggle('menu-open', $scope.menuOpen);
            };

            $scope.closeMenu = function() {
                $scope.menuOpen = false;
                document.body.classList.remove('menu-open');
            };

            // Scroll Control
            angular.element($window).on('scroll', function() {
                $scope.$apply(function() {
                    $scope.shrinkHeader = $window.pageYOffset > 100;
                });
            });

            $scope.scrollToTop = function(event) {
                event.preventDefault();
                $window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            };

            // Função para navegação suave
            $scope.scrollToSection = function(sectionId, event) {
                event.preventDefault();
                const section = document.getElementById(sectionId);
                if (section) {
                    const headerHeight = document.getElementById('header').offsetHeight;
                    const elementPosition = section.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
                $scope.closeMenu();
            };

            // Resultados Images
            $scope.resultadosImages = [
                { src: 'assets/img/img-resultados-7.webp', alt: 'Resultado 1' },
                { src: 'assets/img/Foto-resina8.jpg', alt: 'Resultado 2' },
                { src: 'assets/img/Foto-resina3.jpg', alt: 'Resultado 3' },
                { src: 'assets/img/Foto-resina2.jpg', alt: 'Resultado 4' },
                { src: 'assets/img/Foto-resina4.jpg', alt: 'Resultado 5' },
                { src: 'assets/img/Foto-resina7.jpg', alt: 'Resultado 6' },
                { src: 'assets/img/Foto-resina5.jpg', alt: 'Resultado 7' },
                { src: 'assets/img/Foto-resina9.jpg', alt: 'Resultado 8' }
            ];

            // Tipos de Lentes
            $scope.tiposLentes = [
                {
                    id: 'porcelanas',
                    titulo: 'Porcelanas',
                    texto: 'Facetas em porcelana são lâminas finas, personalizadas, que cobrem a superfície dos dentes para corrigir imperfeições e melhorar o sorriso. Duráveis e estéticas, elas oferecem uma solução de alta qualidade para dentes manchados, desgastados ou desiguais, proporcionando um sorriso natural e brilhante.',
                    active: false
                },
                {
                    id: 'lentes-resina',
                    titulo: 'Lentes em Resina',
                    texto: 'Nossa técnica é projetada para proporcionar uma aparência esteticamente uniforme, sem detalhes anatômicos proeminentes. Suavidade e Alignamento: Criamos sorrisos elegantes e harmoniosos, com uma superfície suave e dentes perfeitamente alinhados.\n\nResina importada e Longevidade +10 anos.',
                    active: false
                }
            ];

            // Toggle Texto
            $scope.toggleTexto = function(event) {
                const box = event.currentTarget;
                const tipo = $scope.tiposLentes.find(t => t.id === box.querySelector('.lentes-tipo-subtitle').id);
                if (tipo) {
                    tipo.active = !tipo.active;
                }
            };

            // Tabs
            $scope.tabs = [
                {
                    id: '1',
                    title: 'Implantes de Protocolo',
                    content: $sce.trustAsHtml(`
                        <p>Os implantes de protocolo são uma solução avançada para a substituição de dentes perdidos. 
                        Consistem em um conjunto de implantes dentários suportando uma prótese fixa, proporcionando 
                        estabilidade, funcionalidade e um sorriso estético. Ideal para pacientes que buscam uma 
                        recuperação rápida e eficaz.</p>
                    `),
                    active: true
                },
                {
                    id: '2',
                    title: 'Procedimentos',
                    content: $sce.trustAsHtml(`
                        <p>• <strong>Limpeza e Prevenção:</strong> Realizamos limpezas profissionais para remover placa bacteriana, tártaro e manchas, prevenindo o acúmulo de cáries e doenças periodontais.</p>
                        <p>• <strong>Restaurações Dentárias:</strong> Oferecemos restaurações de alta qualidade, como obturações de resina composta, para tratar cáries e restaurar a integridade dos dentes afetados.</p>
                        <p>• <strong>Tratamento de Canal:</strong> Em casos de infecção ou danos severos na polpa do dente, nossos especialistas em endodontia realizam o tratamento de canal.</p>
                        <p>• <strong>Extrações Dentárias:</strong> Quando necessário, realizamos extrações dentárias com o máximo de cuidado e conforto para o paciente.</p>
                        <p>• <strong>Gengivoplastia:</strong> Cirurgia plástica que tem como objetivo corrigir a gengiva e o sorriso do paciente.</p>
                        <p>• <strong>Placa de Bruxismo:</strong> A placa miorrelaxante é indicada em casos que o ranger de dentes, ligado diretamente ou não ao bruxismo.</p>
                    `),
                    active: false
                }
            ];

            $scope.setActiveTab = function(tabId) {
                $scope.tabs.forEach(tab => {
                    tab.active = tab.id === tabId;
                });
            };

            $scope.activateTab = function(tabId, event) {
                event.preventDefault();
                $scope.setActiveTab(tabId);
                const tratamentosSection = document.getElementById('tratamentos');
                if (tratamentosSection) {
                    tratamentosSection.scrollIntoView({ behavior: 'smooth' });
                }
            };

            // Social Media Tracking
            $scope.trackWhatsAppClick = function(origin) {
                if (origin.includes('Instagram')) {
                    analyticsService.trackEvent('Instagram', 'click', origin);
                } else {
                    analyticsService.trackEvent('WhatsApp', 'click', origin);
                }
            };

            // Analytics Debug Functions (disponível no console)
            $scope.getAnalyticsStatus = function() {
                return analyticsService.getStatus();
            };

            $scope.getLocalEvents = function() {
                return analyticsService.getLocalEvents();
            };

            $scope.clearAnalyticsEvents = function() {
                analyticsService.clearLocalEvents();
            };

            // Expor funções globalmente para debug
            $window.debugAnalytics = {
                getStatus: $scope.getAnalyticsStatus,
                getEvents: $scope.getLocalEvents,
                clearEvents: $scope.clearAnalyticsEvents,
                trackTest: function() {
                    analyticsService.trackEvent('Debug', 'test_event', 'Console Test');
                }
            };

            // Initialize
            analyticsService.initTracking();
            
            console.log('🔧 Debug Analytics disponível em: window.debugAnalytics');
        }
    ]); 