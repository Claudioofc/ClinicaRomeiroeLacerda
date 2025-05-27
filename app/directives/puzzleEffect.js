angular.module('clinicaApp')
    .directive('paintEffect', ['$window', function($window) {
        return {
            restrict: 'A',
            link: function(scope, element) {
                function isElementInViewport(el) {
                    var rect = el[0].getBoundingClientRect();
                    var threshold = 100; // pixels antes do elemento entrar na viewport
                    return (
                        rect.top <= ($window.innerHeight || document.documentElement.clientHeight) + threshold &&
                        rect.bottom >= -threshold
                    );
                }

                function checkVisibility() {
                    if (isElementInViewport(element)) {
                        // Adiciona a classe que ativa a animação
                        element.addClass('paint-active');
                        
                        // Remove o listener após a animação
                        angular.element($window).off('scroll', checkVisibility);
                    }
                }

                // Inicializa com a classe base
                element.addClass('paint-element');
                
                // Verifica visibilidade no scroll
                angular.element($window).on('scroll', checkVisibility);
                
                // Verifica visibilidade inicial
                setTimeout(checkVisibility, 100);

                // Limpa o listener quando a diretiva é destruída
                scope.$on('$destroy', function() {
                    angular.element($window).off('scroll', checkVisibility);
                });
            }
        };
    }])
    .directive('fadeRotateEffect', ['$window', function($window) {
        return {
            restrict: 'A',
            link: function(scope, element) {
                function isElementInViewport(el) {
                    var rect = el[0].getBoundingClientRect();
                    var threshold = 50; // pixels antes do elemento entrar completamente na viewport
                    return (
                        rect.top <= ($window.innerHeight || document.documentElement.clientHeight) + threshold &&
                        rect.bottom >= -threshold
                    );
                }

                function checkVisibility() {
                    if (isElementInViewport(element)) {
                        element.addClass('fade-rotate-active');
                        angular.element($window).off('scroll', checkVisibility);
                    }
                }

                // Inicializa com a classe base
                element.addClass('fade-rotate-element');
                
                // Verifica visibilidade no scroll
                angular.element($window).on('scroll', checkVisibility);
                
                // Verifica visibilidade inicial
                checkVisibility();

                // Limpa o listener quando a diretiva é destruída
                scope.$on('$destroy', function() {
                    angular.element($window).off('scroll', checkVisibility);
                });
            }
        };
    }])
    .directive('sliceEffect', ['$window', function($window) {
        return {
            restrict: 'A',
            link: function(scope, element) {
                function isElementInViewport(el) {
                    var rect = el[0].getBoundingClientRect();
                    var threshold = 50;
                    return (
                        rect.top <= ($window.innerHeight || document.documentElement.clientHeight) + threshold &&
                        rect.bottom >= -threshold
                    );
                }

                function checkVisibility() {
                    if (isElementInViewport(element)) {
                        // Adiciona a classe base que inicia a animação
                        element.addClass('slice-active');
                        
                        // Cria os elementos de slice
                        var slices = '';
                        for (var i = 0; i < 8; i++) {
                            slices += '<div class="slice-overlay" style="animation-delay: ' + (i * 0.1) + 's"></div>';
                        }
                        
                        // Adiciona os slices como irmãos da imagem
                        element.parent().append(slices);
                        
                        // Remove o listener após a animação
                        angular.element($window).off('scroll', checkVisibility);
                    }
                }

                // Inicializa com a classe base
                element.addClass('slice-element');
                
                // Verifica visibilidade no scroll
                angular.element($window).on('scroll', checkVisibility);
                
                // Verifica visibilidade inicial
                checkVisibility();

                // Limpa o listener quando a diretiva é destruída
                scope.$on('$destroy', function() {
                    angular.element($window).off('scroll', checkVisibility);
                });
            }
        };
    }])
    .directive('alternateEffect', ['$window', function($window) {
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                function isElementInViewport(el) {
                    var rect = el[0].getBoundingClientRect();
                    var threshold = 50;
                    return (
                        rect.top <= ($window.innerHeight || document.documentElement.clientHeight) + threshold &&
                        rect.bottom >= -threshold
                    );
                }

                function checkVisibility() {
                    if (isElementInViewport(element)) {
                        // Pega o índice do elemento pai para alternar a direção
                        var index = element.parent().scope().$index;
                        var direction = index % 2 === 0 ? 'left' : 'right';
                        
                        // Adiciona classes baseadas na direção
                        element.addClass('alternate-element');
                        element.addClass('alternate-from-' + direction);
                        
                        // Pequeno delay antes de adicionar a classe active
                        setTimeout(function() {
                            element.addClass('alternate-active');
                        }, 100);

                        angular.element($window).off('scroll', checkVisibility);
                    }
                }

                // Verifica visibilidade no scroll
                angular.element($window).on('scroll', checkVisibility);
                
                // Verifica visibilidade inicial
                checkVisibility();

                // Limpa o listener quando a diretiva é destruída
                scope.$on('$destroy', function() {
                    angular.element($window).off('scroll', checkVisibility);
                });
            }
        };
    }])
    .directive('sequentialEffect', ['$window', function($window) {
        return {
            restrict: 'A',
            link: function(scope, element) {
                function isElementInViewport(el) {
                    var rect = el[0].getBoundingClientRect();
                    var threshold = 50;
                    return (
                        rect.top <= ($window.innerHeight || document.documentElement.clientHeight) + threshold &&
                        rect.bottom >= -threshold
                    );
                }

                function checkVisibility() {
                    if (isElementInViewport(element)) {
                        // Adiciona a classe base que inicia a animação
                        element.addClass('sequential-active');
                        
                        // Remove o listener após a animação
                        angular.element($window).off('scroll', checkVisibility);
                    }
                }

                // Inicializa com a classe base
                element.addClass('sequential-element');
                
                // Verifica visibilidade no scroll
                angular.element($window).on('scroll', checkVisibility);
                
                // Verifica visibilidade inicial
                checkVisibility();

                // Limpa o listener quando a diretiva é destruída
                scope.$on('$destroy', function() {
                    angular.element($window).off('scroll', checkVisibility);
                });
            }
        };
    }])
    .directive('revealZoomEffect', ['$window', function($window) {
        return {
            restrict: 'A',
            link: function(scope, element) {
                function isElementInViewport(el) {
                    var rect = el[0].getBoundingClientRect();
                    var threshold = 50;
                    return (
                        rect.top <= ($window.innerHeight || document.documentElement.clientHeight) + threshold &&
                        rect.bottom >= -threshold
                    );
                }

                function checkVisibility() {
                    if (isElementInViewport(element)) {
                        // Adiciona a classe base que inicia a animação
                        element.addClass('reveal-zoom-active');
                        
                        // Remove o listener após a animação
                        angular.element($window).off('scroll', checkVisibility);
                    }
                }

                // Inicializa com a classe base
                element.addClass('reveal-zoom-element');
                
                // Verifica visibilidade no scroll
                angular.element($window).on('scroll', checkVisibility);
                
                // Verifica visibilidade inicial
                checkVisibility();

                // Limpa o listener quando a diretiva é destruída
                scope.$on('$destroy', function() {
                    angular.element($window).off('scroll', checkVisibility);
                });
            }
        };
    }])
    .directive('verticalBuildEffect', ['$window', function($window) {
        return {
            restrict: 'A',
            link: function(scope, element) {
                function isElementInViewport(el) {
                    var rect = el[0].getBoundingClientRect();
                    var threshold = 50;
                    return (
                        rect.top <= ($window.innerHeight || document.documentElement.clientHeight) + threshold &&
                        rect.bottom >= -threshold
                    );
                }

                function checkVisibility() {
                    if (isElementInViewport(element)) {
                        // Adiciona a classe base que inicia a animação
                        element.addClass('vertical-build-active');
                        
                        // Remove o listener após a animação
                        angular.element($window).off('scroll', checkVisibility);
                    }
                }

                // Inicializa com a classe base
                element.addClass('vertical-build-element');
                
                // Verifica visibilidade no scroll
                angular.element($window).on('scroll', checkVisibility);
                
                // Verifica visibilidade inicial
                checkVisibility();

                // Limpa o listener quando a diretiva é destruída
                scope.$on('$destroy', function() {
                    angular.element($window).off('scroll', checkVisibility);
                });
            }
        };
    }])
    .directive('sequentialMountEffect', ['$window', function($window) {
        return {
            restrict: 'A',
            link: function(scope, element) {
                var activated = false;

                function isElementInViewport(el) {
                    var rect = el[0].getBoundingClientRect();
                    var threshold = 100; // Aumentei o threshold para começar a animação mais cedo
                    return (
                        rect.top <= ($window.innerHeight || document.documentElement.clientHeight) + threshold &&
                        rect.bottom >= -threshold
                    );
                }

                function checkVisibility() {
                    if (!activated && isElementInViewport(element)) {
                        // Adiciona a classe base que inicia a animação
                        element.addClass('sequential-mount-active');
                        activated = true;
                        
                        // Remove o listener após a animação
                        angular.element($window).off('scroll', checkVisibility);
                    }
                }

                // Inicializa com a classe base
                element.addClass('sequential-mount-element');
                
                // Verifica visibilidade no scroll
                angular.element($window).on('scroll', checkVisibility);
                
                // Verifica visibilidade inicial
                setTimeout(checkVisibility, 100); // Pequeno delay para garantir que tudo está carregado

                // Limpa o listener quando a diretiva é destruída
                scope.$on('$destroy', function() {
                    angular.element($window).off('scroll', checkVisibility);
                });
            }
        };
    }])
    .directive('unfoldEffect', ['$window', function($window) {
        return {
            restrict: 'A',
            link: function(scope, element) {
                var activated = false;

                function isElementInViewport(el) {
                    var rect = el[0].getBoundingClientRect();
                    var threshold = 100; // Threshold maior para começar a animação mais cedo
                    return (
                        rect.top <= ($window.innerHeight || document.documentElement.clientHeight) + threshold &&
                        rect.bottom >= -threshold
                    );
                }

                function checkVisibility() {
                    if (!activated && isElementInViewport(element)) {
                        // Adiciona a classe base que inicia a animação
                        element.addClass('unfold-active');
                        activated = true;
                        
                        // Remove o listener após a animação
                        angular.element($window).off('scroll', checkVisibility);
                    }
                }

                // Inicializa com a classe base
                element.addClass('unfold-element');
                
                // Verifica visibilidade no scroll
                angular.element($window).on('scroll', checkVisibility);
                
                // Verifica visibilidade inicial
                setTimeout(checkVisibility, 100); // Pequeno delay para garantir que tudo está carregado

                // Limpa o listener quando a diretiva é destruída
                scope.$on('$destroy', function() {
                    angular.element($window).off('scroll', checkVisibility);
                });
            }
        };
    }])
    .directive('cascadeEffect', ['$window', function($window) {
        return {
            restrict: 'A',
            link: function(scope, element) {
                var activated = false;

                function isElementInViewport(el) {
                    var rect = el[0].getBoundingClientRect();
                    var threshold = 100; // Threshold maior para começar a animação mais cedo
                    return (
                        rect.top <= ($window.innerHeight || document.documentElement.clientHeight) + threshold &&
                        rect.bottom >= -threshold
                    );
                }

                function checkVisibility() {
                    if (!activated && isElementInViewport(element)) {
                        // Adiciona a classe base que inicia a animação
                        element.addClass('cascade-active');
                        activated = true;
                        
                        // Remove o listener após a animação
                        angular.element($window).off('scroll', checkVisibility);
                    }
                }

                // Inicializa com a classe base
                element.addClass('cascade-element');
                
                // Verifica visibilidade no scroll
                angular.element($window).on('scroll', checkVisibility);
                
                // Verifica visibilidade inicial
                setTimeout(checkVisibility, 100); // Pequeno delay para garantir que tudo está carregado

                // Limpa o listener quando a diretiva é destruída
                scope.$on('$destroy', function() {
                    angular.element($window).off('scroll', checkVisibility);
                });
            }
        };
    }])
    .directive('mosaicEffect', ['$window', function($window) {
        return {
            restrict: 'A',
            link: function(scope, element) {
                var activated = false;

                function isElementInViewport(el) {
                    var rect = el[0].getBoundingClientRect();
                    var threshold = 100; // Threshold maior para começar a animação mais cedo
                    return (
                        rect.top <= ($window.innerHeight || document.documentElement.clientHeight) + threshold &&
                        rect.bottom >= -threshold
                    );
                }

                function checkVisibility() {
                    if (!activated && isElementInViewport(element)) {
                        // Adiciona a classe base que inicia a animação
                        element.addClass('mosaic-active');
                        activated = true;
                        
                        // Remove o listener após a animação
                        angular.element($window).off('scroll', checkVisibility);
                    }
                }

                // Inicializa com a classe base
                element.addClass('mosaic-element');
                
                // Verifica visibilidade no scroll
                angular.element($window).on('scroll', checkVisibility);
                
                // Verifica visibilidade inicial
                setTimeout(checkVisibility, 100); // Pequeno delay para garantir que tudo está carregado

                // Limpa o listener quando a diretiva é destruída
                scope.$on('$destroy', function() {
                    angular.element($window).off('scroll', checkVisibility);
                });
            }
        };
    }])
    .directive('paintEffect', ['$window', function($window) {
        return {
            restrict: 'A',
            link: function(scope, element) {
                var activated = false;

                function isElementInViewport(el) {
                    var rect = el[0].getBoundingClientRect();
                    var threshold = 100; // Threshold maior para começar a animação mais cedo
                    return (
                        rect.top <= ($window.innerHeight || document.documentElement.clientHeight) + threshold &&
                        rect.bottom >= -threshold
                    );
                }

                function checkVisibility() {
                    if (!activated && isElementInViewport(element)) {
                        // Adiciona a classe base que inicia a animação
                        element.addClass('paint-active');
                        activated = true;
                        
                        // Remove o listener após a animação
                        angular.element($window).off('scroll', checkVisibility);
                    }
                }

                // Inicializa com a classe base
                element.addClass('paint-element');
                
                // Verifica visibilidade no scroll
                angular.element($window).on('scroll', checkVisibility);
                
                // Verifica visibilidade inicial
                setTimeout(checkVisibility, 100); // Pequeno delay para garantir que tudo está carregado

                // Limpa o listener quando a diretiva é destruída
                scope.$on('$destroy', function() {
                    angular.element($window).off('scroll', checkVisibility);
                });
            }
        };
    }]); 