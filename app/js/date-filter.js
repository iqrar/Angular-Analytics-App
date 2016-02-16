'use strict';

angular.module('angular-analytics-app')
    .filter('dateFilter', function() {
        return function(cities, start, end) {
            var sd = Date.parse(start);
            var ed = Date.parse(end);
            var filterDateArray = [];
             if(cities){
                for (var i = 0; i < cities.length; i++) {
                    var start_date = cities[i].start_date;
                    var end_date = cities[i].end_date;
                    if ( start_date > sd && ed > start_date && end_date > sd && ed > end_date) {
                        filterDateArray.push(cities[i]);
                    }
                }
              }
            
            return filterDateArray;
        };
});
