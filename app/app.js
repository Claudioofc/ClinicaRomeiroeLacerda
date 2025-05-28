'use strict';

// Definição do módulo principal do AngularJS
angular.module('clinicaApp', [
  'ngRoute',
  'ngAnimate'
])
.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'app/views/home.html',
      controller: 'MainController'
    })
    .otherwise({redirectTo: '/'});

  // Configuração para usar links sem #
  $locationProvider.hashPrefix('');
}])
.controller('MainController', ['$scope', '$window', '$location', '$anchorScroll', function($scope, $window, $location, $anchorScroll) {
  // Controle do menu
  $scope.menuOpen = false;
  
  $scope.toggleMenu = function() {
    $scope.menuOpen = !$scope.menuOpen;
    document.body.classList.toggle('menu-open', $scope.menuOpen);
  };

  // Controle das abas
  $scope.activeTab = 1;
  
  $scope.setActiveTab = function(tabId) {
    $scope.activeTab = tabId;
  };

  $scope.activateTab = function(tabId) {
    $scope.activeTab = tabId;
  };

  // Função para mostrar/ocultar texto das lentes
  $scope.toggleTexto = function(element) {
    angular.element(element).find('.hidden-texto').toggleClass('show-texto');
  };

  // Rastreamento de scroll para efeito de shrink no header
  angular.element($window).bind('scroll', function() {
    $scope.scrollY = this.pageYOffset;
    if ($scope.scrollY > 100) {
      angular.element(document.getElementById('header')).addClass('shrink');
    } else {
      angular.element(document.getElementById('header')).removeClass('shrink');
    }
    $scope.$apply();
  });

  // Rolagem suave para seções
  $scope.scrollTo = function(elementId) {
    var element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    if ($scope.menuOpen) {
      $scope.toggleMenu();
    }
  };

  // Rolagem para o topo ao clicar na logo
  $scope.scrollToTop = function() {
    $window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Rastreamento de analytics
  $scope.trackWhatsAppClick = function(origin) {
    console.log('Clique no WhatsApp detectado. Origem: ' + origin);
    if ($window.gtag) {
      gtag('event', 'click', {
        'event_category': 'WhatsApp',
        'event_label': origin,
        'value': 1
      });
    }
  };

  // Rastreamento de cliques gerais
  $scope.trackClick = function(event) {
    const target = event.target;
    const elementId = target.id || 'Sem ID';
    const elementClass = target.className || 'Sem Classe';

    console.log(`Clique detectado. Origem: ID - ${elementId}, Classe - ${elementClass}`);

    if ($window.gtag) {
      gtag('event', 'click', {
        'event_category': 'User Interaction',
        'event_label': `ID: ${elementId}, Classe: ${elementClass}`,
        'value': 1
      });
    }
  };

  // Rastreamento de origem do tráfego
  function trackReferrer() {
    const referrer = document.referrer || 'Direto';
    console.log(`Usuário acessou a partir de: ${referrer}`);
    if ($window.gtag) {
      gtag('event', 'referrer', {
        'event_category': 'Traffic Source',
        'event_label': referrer,
        'value': 1
      });
    }
  }

  // Rastreamento de localização
  function trackLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function(position) {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          console.log(`Localização do usuário: Latitude ${latitude}, Longitude ${longitude}`);
          if ($window.gtag) {
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
              if ($window.gtag) {
                gtag('event', 'location', {
                  'event_category': 'User Location',
                  'event_label': `${city}, ${country}`,
                  'value': 1
                });
              }
            })
            .catch(error => console.error('Erro ao obter localização:', error));
        },
        function(error) {
          console.error('Erro ao obter geolocalização:', error);
        }
      );
    }
  }

  // Rastreamento de parâmetros UTM
  function trackUTM() {
    const urlParams = new URLSearchParams($window.location.search);
    const utmSource = urlParams.get('utm_source') || 'Direto';
    const utmMedium = urlParams.get('utm_medium') || 'Nenhum';
    const utmCampaign = urlParams.get('utm_campaign') || 'Nenhuma';

    console.log(`UTM Source: ${utmSource}, Medium: ${utmMedium}, Campaign: ${utmCampaign}`);

    if ($window.gtag) {
      gtag('event', 'utm', {
        'event_category': 'Campaign',
        'event_label': `Source: ${utmSource}, Medium: ${utmMedium}, Campaign: ${utmCampaign}`,
        'value': 1
      });
    }
  }

  // Efeito de montagem alternada nas imagens
  $scope.initAlternateEffect = function() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('alternate-active');
        }
      });
    }, {
      threshold: 0.1
    });

    document.querySelectorAll('.alternate-element').forEach(img => {
      observer.observe(img);
    });
  };

  // Inicialização dos rastreamentos e efeitos
  angular.element(document).ready(function() {
    trackReferrer();
    trackLocation();
    trackUTM();
    $scope.initAlternateEffect();
  });
}]); 