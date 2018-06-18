/*global angular*/
/*global google*/
/*global zingchart*/

angular
    .module("Principal")
    .controller("IntegracionFinalI", ["$scope", "$http", function($scope, $http) {
        console.log("integracion controller initialized");

        /*eliminar eltos. duplicados*/

        Array.prototype.unique = function(a) {
            return function() { return this.filter(a) }
        }(function(a, b, c) {
            return c.indexOf(a, b + 1) < 0
        });

        /*ordenar array*/

        Array.prototype.sortNumbers = function() {
            return this.sort(
                function(a, b) {
                    return a - b
                }
            );
        }




        $http.get("/api/v1/buses").then(function(responseBuses) {
            $http.get("https://restcountries.eu/rest/v2/all").then(function(responseRest) {


                var popuArray = [];
                var nameArray=[];

                for (var i = 0; i < 5; i++) {



                    popuArray.push([responseRest.data[i].population]);
                    nameArray.push(responseRest.data[i].name);
                    


                }

                





                zingchart.THEME = "classic";

                var myConfig = {
                    type: "pie",
                    backgroundColor: "#f1f1f1 #ffffff",
                    title: {
                        text: "Countries Population",
                        backgroundColor: "#052C4E"
                    },
                    
                    legend: {
                        layout: "h",
                        align: "center",
                        verticalAlign: "bottom",
                        toggleAction: "remove",
                        header: {
                            text: "County",
                            backgroundColor: "#052C4E"
                        },
                        shadow: 0
                    },
                    plotarea: {
                        y: 150
                    },
                    plot: {
                        refAngle: 180,
                        size: 250,
                        valueBox: {
                            placement: "in",
                            offsetR: 20
                        }
                    },
                    scaleR: {
                        aperture: 180
                    },
                    tooltip: {
                        text: "%t<br>Deliveries: %v<br>Percent of Shirt %npv%",
                        textAlign: "left",
                        shadow: 0,
                        borderRadius: 4,
                        borderWidth: 2,
                        borderColor: "#fff"
                    },
                    series: [{
                            values: popuArray[0],
                            text: nameArray[0],
                            backgroundColor: "#2870B1"
                        },
                        {
                            values: popuArray[1],
                            text: nameArray[1],
                            backgroundColor: "#BB1FA8"
                        },
                        {
                            values: popuArray[2],
                            text: nameArray[2],
                            backgroundColor: "#7E971D"
                        },

                        {
                            values: popuArray[3],
                            text: nameArray[3],
                            backgroundColor: "#FFA72A"

                        },
                        {
                            values: popuArray[4],
                            text: nameArray[4],
                            backgroundColor: "#54004A"
                        }
                    ]
                };

                zingchart.render({
                    id: 'myChart',
                    data: myConfig,
                });


            });

        });
    }]);
