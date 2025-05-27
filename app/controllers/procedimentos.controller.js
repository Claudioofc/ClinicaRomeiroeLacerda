'use strict';

angular.module('clinicaApp.procedimentos', [])
.controller('ProcedimentosController', ['$scope', 'AnalyticsService', function($scope, AnalyticsService) {
    $scope.procedimentos = [
        {
            title: 'Limpeza e Prevenção',
            description: 'Realizamos limpezas profissionais para remover placa bacteriana, tártaro e manchas, prevenindo o acúmulo de cáries e doenças periodontais.'
        },
        {
            title: 'Restaurações Dentárias',
            description: 'Oferecemos restaurações de alta qualidade, como obturações de resina composta, para tratar cáries e restaurar a integridade dos dentes afetados.'
        },
        {
            title: 'Tratamento de Canal',
            description: 'Em casos de infecção ou danos severos na polpa do dente, nossos especialistas em endodontia realizam o tratamento de canal.'
        },
        {
            title: 'Extrações Dentárias',
            description: 'Quando necessário, realizamos extrações dentárias com o máximo de cuidado e conforto para o paciente.'
        },
        {
            title: 'Gengivoplastia',
            description: 'Cirurgia plástica que tem como objetivo corrigir a gengiva e o sorriso do paciente.'
        },
        {
            title: 'Placa de Bruxismo',
            description: 'A placa miorrelaxante é indicada em casos que o ranger de dentes, ligado diretamente ou não ao bruxismo.'
        }
    ];

    $scope.trackWhatsAppClick = function(origin) {
        AnalyticsService.trackWhatsAppClick(origin);
    };
}]); 