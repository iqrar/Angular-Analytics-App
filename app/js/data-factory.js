'use strict';

angular.module('angular-analytics-app')
    .factory('Cities', ['$http', '$q', function($http, $q) {
      var deferred = $q.defer();
        return {
           getCities: function() {
                $http.get('data.json').success(function(data) {
                    deferred.resolve(data);
                }).
                error(function(data) {
                    deferred.reject(data);
                });

                return deferred.promise;
            }

        };

    }]);