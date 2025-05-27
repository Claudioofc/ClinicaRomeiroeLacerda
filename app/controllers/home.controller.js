'use strict';

angular.module('clinicaApp.home', [])
.controller('HomeController', ['$scope', '$window', function($scope, $window) {
    // Dados da seção intro
    $scope.intro = {
        title: 'Romeiro e Lacerda',
        subtitle: 'Estética e Reabilitação Oral',
        image: 'assets/img/Clinica.jpg'
    };

    // Dados das lentes de resina
    $scope.lentes = {
        tipos: [
            {
                id: 'porcelanas',
                title: 'Porcelanas',
                description: 'Facetas em porcelana são lâminas finas, personalizadas, que cobrem a superfície dos dentes para corrigir imperfeições e melhorar o sorriso. Duráveis e estéticas, elas oferecem uma solução de alta qualidade para dentes manchados, desgastados ou desiguais, proporcionando um sorriso natural e brilhante.'
            },
            {
                id: 'lentes-resina',
                title: 'Lentes em Resina',
                description: 'Nossa técnica é projetada para proporcionar uma aparência esteticamente uniforme, sem detalhes anatômicos proeminentes. Suavidade e Alignamento: Criamos sorrisos elegantes e harmoniosos, com uma superfície suave e dentes perfeitamente alinhados. Resina importada e Longevidade +10 anos.'
            }
        ]
    };

    // Controle das abas de tratamentos
    $scope.tabs = {
        active: 1,
        items: [
            {
                id: 1,
                title: 'Implantes de Protocolo',
                content: 'Os implantes de protocolo são uma solução avançada para a substituição de dentes perdidos. Consistem em um conjunto de implantes dentários suportando uma prótese fixa, proporcionando estabilidade, funcionalidade e um sorriso estético. Ideal para pacientes que buscam uma recuperação rápida e eficaz.'
            },
            {
                id: 2,
                title: 'Procedimentos',
                content: [
                    'Limpeza e Prevenção: Realizamos limpezas profissionais para remover placa bacteriana, tártaro e manchas, prevenindo o acúmulo de cáries e doenças periodontais.',
                    'Restaurações Dentárias: Oferecemos restaurações de alta qualidade, como obturações de resina composta, para tratar cáries e restaurar a integridade dos dentes afetados.',
                    'Tratamento de Canal: Em casos de infecção ou danos severos na polpa do dente, nossos especialistas em endodontia realizam o tratamento de canal.',
                    'Extrações Dentárias: Quando necessário, realizamos extrações dentárias com o máximo de cuidado e conforto para o paciente.',
                    'Gengivoplastia: Cirurgia plástica que tem como objetivo corrigir a gengiva e o sorriso do paciente.',
                    'Placa de Bruxismo: A placa miorrelaxante é indicada em casos que o ranger de dentes, ligado diretamente ou não ao bruxismo.'
                ]
            }
        ]
    };

    // Função para alternar a aba ativa
    $scope.setActiveTab = function(tabId) {
        $scope.tabs.active = tabId;
    };

    // Função para mostrar/ocultar texto das lentes
    $scope.toggleTexto = function(lente) {
        lente.showDescription = !lente.showDescription;
    };

    // Rastreamento de scroll para efeito de shrink no header
    angular.element($window).bind('scroll', function() {
        $scope.scrollY = this.pageYOffset;
        $scope.$apply();
    });
}]); 