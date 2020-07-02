//Application init
var app = angular.module('myapp', ['ngStorage']);

/* ***********************************************************
    Array for chart View
**************************************************************/
var chart_date = [];
var chart_cases = [];
var chart_death = [];
var chart_recoved = [];

/* ***********************************************************
    world Cases Controller
**************************************************************/
app.controller('mycontroller', ['$scope', '$http', '$localStorage', function ($scope, $http, $localStorage) {

    /*------------------------------------------------------------
    ------> function to check data present in localStorage or Not
    */
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
    /*----------------------------------------------------------
    ------> function to refresh Data
    */
    $scope.refreshData = function () {
        $http.get('https://api.covid19api.com/summary').then(function (res) {
            $scope.data = res.data;
            $localStorage.datastorage = res.data;
            $scope.getdatainfo();
        });
    };
    /*----------------------------------------------------------
    ------> function to Order the Data
    */
    $scope.orderbyme = function (item) {
        $scope.item = item;
    }
}]);


/* ***********************************************************
    India Cases Controller
**************************************************************/
app.controller('india_Controller', ['$scope', '$http', '$localStorage', function ($scope, $http, $localStorage) {

    /*------------------------------------------------------------
    ------> function to check data present in localStorage or Not
    */
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

    /*------------------------------------------------------------
    ------> function to Refresh The Data
    */
    $scope.refresh_India_Data = function () {
        $http.get('https://api.covid19india.org/data.json').then(function (res) {
            console.warn(res.data);
            $scope.india_data = res.data;
            $localStorage.India_data_storage = res.data;
            $scope.get_india_data();
            alert('refresh Button call');
        });
    };
    /*------------------------------------------------------------
    ------> function to Order the Data
    */
    $scope.orderby = function (item) {
        $scope.data_sort = item;
    }
    /*------------------------------------------------------------
    ------> function for chart Data
    */
    $scope.chartfun = function () {
        if ($localStorage.India_data_storage) {
            $scope.chart_data = $localStorage.India_data_storage;
            for (var i = 31, j = 0; i < $scope.chart_data.cases_time_series.length; i += 5, j++) {
                chart_date[j] = $scope.chart_data.cases_time_series[i].date;
                chart_cases[j] = $scope.chart_data.cases_time_series[i].totalconfirmed;
                chart_death[j] = $scope.chart_data.cases_time_series[i].totaldeceased;
                chart_recoved[j] = $scope.chart_data.cases_time_series[i].totalrecovered;
            }
        }
    };
}]);

/* ***********************************************************
    District Cases Controller
**************************************************************/
app.controller('stateController', ['$scope', '$http', '$localStorage', function ($scope, $http, $localStorage) {
    //variable ------------
    var u_state;

    /*------------------------------------------------------------
    ------> function to Refresh the Distict Data
    */
    $scope.refresh_State_Data = function () {
        $scope.date_time = new Date();
        $http.get('https://api.covid19india.org/state_district_wise.json').then(function (res) {
            console.warn(res.data);
            $scope.state_data = res.data;
            $localStorage.state_data_storage = res.data;
        });
    };

    /*------------------------------------------------------------
    ------> function to get Distict from the Enter State
    */
    $scope.get_state_data = function () {
        if ($scope.User_state == null | $scope.User_state == "") {
            alert('Please Enter State');
        } else if ($localStorage.state_data_storage) {
            u_state = $scope.User_state;
            var state_data = $localStorage.state_data_storage;
            $scope.distict = state_data[$scope.User_state].districtData;
        }
    };

    /*------------------------------------------------------------
    ------> function to get Caseses Data from selected District
    */
    $scope.get_distict_data = function (key) {
        $scope.district = key;
        if ($localStorage.state_data_storage) {
            $scope.data = $localStorage.state_data_storage[u_state].districtData[key];
        }
    };
}]);

