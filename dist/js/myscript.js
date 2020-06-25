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
                console.warn(res.data);
                $scope.data = res.data;
                $localStorage.datastorage = res.data;
                alert('first time call');
            });
        }
    };
    $scope.refreshData = function () {
        $http.get('https://api.covid19api.com/summary').then(function (res) {
            console.warn(res.data);
            $scope.data = res.data;
            $localStorage.datastorage = res.data;
            alert('refresh Data function call');
            $scope.getdatainfo();
        });
    };
    $scope.orderbyme = function (item) {
        $scope.item = item;
    }
}]);

app.controller('india_Controller', ['$scope', '$http', '$localStorage', '$window', function ($scope, $http, $localStorage, $window) {
    $scope.getindiainfo = function () {
       alert('working');
    };
}]);