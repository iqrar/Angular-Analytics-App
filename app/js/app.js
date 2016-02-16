'use strict';

angular
    .module('angular-analytics-app', [
        'ui.router', 'ui.bootstrap', 'chart.js'
    ])
    .config(function($urlRouterProvider, $stateProvider) {
       $urlRouterProvider.otherwise("/cities");
        $stateProvider
            .state('cities', {
                url: "/cities",
                templateUrl: "views/cities.html",
                controller: 'Cities'
            });
    });
