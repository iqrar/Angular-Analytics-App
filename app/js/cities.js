'use strict';

angular.module('angular-analytics-app')
    .controller('Cities', ['$scope', '$http', 'Cities', function($scope, $http, Cities) {
        // Data from factory    
        Cities.getCities().then(function(data) {
           $scope.result = data;
            //Parse date
            for (var i = 0; i < $scope.result.length; i++) {
                $scope.result[i].start_date = Date.parse($scope.result[i].start_date);
                $scope.result[i].end_date = Date.parse($scope.result[i].end_date);
            }
            $scope.cities = $scope.result;
            
        }, function() {
            console.log('not working');
        });

        //Filter order by values and reverse
        $scope.value = 'city';
        $scope.reverse = true;
        $scope.sort = function(value) {
            $scope.reverse = ($scope.value === value) ? !$scope.reverse : false;
            $scope.value = value;
        };

        // Date Picker
        $scope.today = function() {
            $scope.dt2 = new Date(2015, 11, 26);
            $scope.dt1 = new Date(2015, 6, 17);
        };
        $scope.today();
        $scope.toggleMin = function() {
            $scope.minDate = $scope.minDate ? null : new Date();
        };
        $scope.toggleMin();
        $scope.maxDate = new Date(2020, 5, 22);
        $scope.open1 = function($event) {
            $scope.status1.opened = true;
        };
        $scope.open2 = function($event) {
            $scope.status2.opened = true;
        };
        $scope.setDate = function(year, month, day) {
            $scope.dt1 = new Date(month, day, year);
            $scope.dt2 = new Date(month, day, year);

        };
        $scope.dateOptions = {
            formatYear: 'yyyy',
            startingDay: 1
        };
        // convert into desire date format
        $scope.format = 'M/d/yyyy';

        $scope.status1 = {
            opened: false
        };

        $scope.status2 = {
            opened: false
        };
        // AngularJs-chart to display data dynamically which will automatically change on filtering date 
        $scope.newValue = function(sd, ed){
                if(ed === undefined || sd === undefined){
                    ed = $scope.dt2;
                    sd = $scope.dt1;
                }
                Cities.getCities().then(function(data) {
                    $scope.chartdata = data;
                    var chartDateArray = [];
                    for (var i = 0; i < $scope.chartdata.length; i++) {
                        var start_date = $scope.chartdata[i].start_date;
                        var end_date = $scope.chartdata[i].end_date;
                        if ( start_date > sd && ed > start_date && end_date > sd && ed > end_date) {
                            chartDateArray.push($scope.chartdata[i]);
                        }
                }
                    var chartLabel = [],
                    chartData = [];
                    for (var j = 0; j <chartDateArray.length; j++) {
                        chartLabel.push(chartDateArray[j].city);
                        chartData.push(chartDateArray[j].price);
                        }
                        $scope.labels = chartLabel;
                        $scope.series = ['price'];
                        $scope.data = [
                            chartData
                    ];

                });
                      
        };

       $scope.newValue($scope.dt1, $scope.dt2);

}]);



















