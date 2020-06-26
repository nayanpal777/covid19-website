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

    $scope.get_india_data = function () {
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

app.controller('stateController', ['$scope', '$http', '$localStorage', function ($scope, $http, $localStorage) {
    var u_state;
    $scope.refresh_State_Data = function () {
        $scope.date_time = new Date();
        $http.get('https://api.covid19india.org/state_district_wise.json').then(function (res) {
            console.warn(res.data);
            $scope.state_data = res.data;
            $localStorage.state_data_storage = res.data;
        });
    };

    $scope.get_state_data = function () {
        if ($scope.User_state == null | $scope.User_state == "") {
            alert('Please Enter State');
        } else if ($localStorage.state_data_storage) {
            u_state = $scope.User_state;
            var state_data = $localStorage.state_data_storage;
            $scope.distict = state_data[$scope.User_state].districtData;
        }
    };
    $scope.get_distict_data = function (key) {
        $scope.district = key;
        if($localStorage.state_data_storage){
            $scope.data = $localStorage.state_data_storage[u_state].districtData[key];
        }
    };
}]);