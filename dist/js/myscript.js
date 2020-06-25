var app = angular.module('myapp', ['ngStorage']);

app.controller('mycontroller', ['$scope', '$http', '$localStorage', function ($scope, $http, $localStorage) {
    $scope.getdatainfo = function () {
        if ($localStorage.datastorage) {
            $scope.data = $localStorage.datastorage;
            var date = $scope.data.Date;
            date = new Date(date);
            $scope.date = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
            $scope.time = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
        } else {
            $http.get('https://api.covid19api.com/summary').then(function (res) {
                $scope.data = res.data;
                $localStorage.datastorage = res.data;
            });
        }
    };
    $scope.refreshData = function () {
        $http.get('https://api.covid19api.com/summary').then(function (res) {
            $scope.data = res.data;
            $localStorage.datastorage = res.data;
            $scope.getdatainfo();
        });
    };
    $scope.orderbyme = function (item) {
        $scope.item = item;
    }
}]);

app.controller('india_Controller', ['$scope', '$http', '$localStorage', function ($scope, $http, $localStorage) {
    
    $scope.get_india_data = function (){
        if ($localStorage.India_data_storage) {
            $scope.india_data = $localStorage.India_data_storage;
            $scope.in_date = $scope.india_data.statewise['0'].lastupdatedtime;
        } else {
            $http.get('https://api.covid19india.org/data.json').then(function (res) {
                $scope.india_data = res.data;
                $localStorage.India_data_storage = res.data;
                alert('fetch data from api');
            });
        }    
    };
    
    $scope.refresh_India_Data = function () {
        $http.get('https://api.covid19india.org/data.json').then(function (res) {
            console.warn(res.data);
            $scope.india_data = res.data;
            $localStorage.India_data_storage = res.data;
            $scope.get_india_data();
            alert('refresh Button call');
        });
    };
    $scope.orderby = function (item) {
        $scope.data_sort = item;
    }
}]);