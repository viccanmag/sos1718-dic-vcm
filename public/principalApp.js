/*global angular*/

angular.module("Principal", ["ngRoute"]).config(function($routeProvider) {
    $routeProvider.when("/", {
        templateUrl: "index1.html"
    }).when("/analytics", {
        templateUrl: "../public_apis/integration.html",
        controller: "integrationCtrl"
    }).
    when("/integrations", {
        templateUrl: "../public_apis/grupo.html"
    }).
    when("/about", {
        templateUrl: "../public_apis/videos.html"
    }).
    /*VICTOR*/
    when("/buses", {
            templateUrl: "../public_apis/buses/front-end/list.html",
            controller: "ListCtrl2"
        })
        .when("/graphsBuses", {
            templateUrl: "../public_apis/buses/front-end/graphs.html",
            controller: "MainCtrl"
        })
        .when("/integracionBuses", {
            templateUrl: "../public_apis/buses/front-end/integracion.html",
            controller: "IntegracionCtrl3"
        })
        .when("/integracionProxyBuses", {
            templateUrl: "../public_apis/buses/front-end/integracionProxy.html",
            controller: "IntegracionProxy"
        })
        .when("/integracionFinalI", {
            templateUrl: "../public_apis/buses/front-end/integracionFinalI.html",
            controller: "IntegracionFinalI"
        })
        .when("/integracionFinalII", {
            templateUrl: "../public_apis/buses/front-end/integracionFinalII.html",
            controller: "IntegracionFinalII"
        })
        .when("/integracionFinal3", {
            templateUrl: "../public_apis/buses/front-end/integracionFinal3.html",
            controller: "IntegracionFinal3"
        })
        .when("/buses/:community", {
            templateUrl: "../public_apis/buses/front-end/edit.html",
            controller: "EditCtrl2"
        });


});
