'use strict';

angular.module('clinicaApp.contato', [])
.controller('ContatoController', ['$scope', 'AnalyticsService', function($scope, AnalyticsService) {
    $scope.contato = {
        whatsapp: {
            number: '5531991242925',
            message: 'Vim pelo site Dr Pedro Romeiro. Quero transformar meu sorriso!'
        },
        endereco: {
            rua: 'Rua Exemplo, 123',
            bairro: 'Centro',
            cidade: 'Belo Horizonte',
            estado: 'MG',
            cep: '30000-000'
        },
        horario: {
            segunda_sexta: '8h às 18h',
            sabado: '8h às 12h'
        }
    };

    $scope.getWhatsAppLink = function() {
        return 'https://wa.me/' + $scope.contato.whatsapp.number + 
               '?text=' + encodeURIComponent($scope.contato.whatsapp.message);
    };

    $scope.trackWhatsAppClick = function(origin) {
        AnalyticsService.trackWhatsAppClick(origin);
    };
}]); 