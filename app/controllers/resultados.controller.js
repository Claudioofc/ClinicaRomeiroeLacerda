'use strict';

angular.module('clinicaApp.resultados', [])
.controller('ResultadosController', ['$scope', 'AnalyticsService', function($scope, AnalyticsService) {
    $scope.resultados = {
        title: 'Resultados',
        description: 'Explore nossa galeria para ver os resultados impressionantes das lentes em resina aplicadas pelos nossos especialistas. Cada sorriso é uma prova do nosso compromisso com a estética e a qualidade, mostrando como nossas facetas em resina podem transformar seu visual com naturalidade e brilho.',
        images: [
            {
                src: 'assets/img/img-resultados-7.webp',
                alt: 'Resultado 1'
            },
            {
                src: 'assets/img/Foto-resina8.jpg',
                alt: 'Resultado 2'
            },
            {
                src: 'assets/img/Foto-resina3.jpg',
                alt: 'Resultado 3'
            },
            {
                src: 'assets/img/Foto-resina2.jpg',
                alt: 'Resultado 4'
            },
            {
                src: 'assets/img/Foto-resina4.jpg',
                alt: 'Resultado 5'
            },
            {
                src: 'assets/img/Foto-resina7.jpg',
                alt: 'Resultado 6'
            },
            {
                src: 'assets/img/Foto-resina5.jpg',
                alt: 'Resultado 7'
            },
            {
                src: 'assets/img/Foto-resina9.jpg',
                alt: 'Resultado 8'
            }
        ]
    };

    $scope.trackWhatsAppClick = function(origin) {
        AnalyticsService.trackWhatsAppClick(origin);
    };
}]); 