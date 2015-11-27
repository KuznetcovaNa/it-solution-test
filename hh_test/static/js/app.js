app = angular.module('app', ['ui.bootstrap', 'ngResource', 'ui.router']);

app.config(function($httpProvider){
    $httpProvider.defaults.xsrfCookieName = "csrftoken";
    $httpProvider.defaults.xsrfHeaderName = "X-CSRFToken";
});

app.config(function($stateProvider, $urlRouterProvider){


    //$urlRouterProvider.otherwise("/");

    $stateProvider
        .state('task', {
            url: "/",
            templateUrl: "/static/partials/task.html"
        })

        .state('user', {
            url: '/user',
            templateUrl: "static/partials/users.html",
            controller: ['$scope', '$http',
                function( $scope,   $http) {

                    $scope.users = [];
                    $http.get('/api/v1/user/').success(function(data) {
                        $scope.users = data.objects;
                        $scope.selectedUser = null;
                        $scope.setSelected = function(idSelectedUser) {
                            $scope.selectedUser = idSelectedUser;
                        }
                    }).error(function(data, status, headers, config) {
                            if(status=401){
                                window.location = '/admin'
                            }
                    })
                }
            ]
        })

        .state('user.view', {
            url: '/:userId',
            views: {
                '': {
                    templateUrl: "static/partials/users.view.html",
                    controller: ['$scope', '$http', '$stateParams',
                        function( $scope,   $http,   $stateParams) {

//                    $scope.users = [];
//                    $http.get('/api/v1/user/').success(function(data) {
//                        $scope.users = data.objects;
//                    })

                            $scope.selectedUser = {};
                            $http.get('/api/v1/user/'+$stateParams.userId+'/').success(function(data) {
                                $scope.selectedUser = data;
                            }).error(function(data, status, headers, config) {
                            if(status=401){
                                window.location = '/admin'
                            }
                    })
                        }
                    ]
                }
            }
        })

        .state('auto_model', {
            url: '/auto_model',
            templateUrl: "static/partials/auto_models.html",
            controller: ['$scope', '$http',
                function( $scope,   $http) {
                    $scope.auto_models = [];
                    $http.get('/api/v1/auto_model/').success(function(data) {
                        $scope.auto_models = data.objects;
                    }).error(function(data, status, headers, config) {
                            if(status=401){
                                window.location = '/admin'
                            }
                    })
                }
            ]
        })

        .state('auto_model.view', {
            url: '/:auto_modelId',
            views: {
                '': {
                    templateUrl: "static/partials/auto_models.view.html",
                    controller: ['$scope', '$http', '$stateParams',
                        function( $scope,   $http,   $stateParams) {
                            $scope.show_edit_area = true;
                            $scope.update_auto = function() {
                                data = {id: $stateParams.auto_modelId, name: $scope.value};
                                $http.post('/edit_auto', data).success(function(){
                                    var n = $scope.auto_models.length;
                                    for (i = 0; i < n; i++){
                                        $scope.auto_models.pop()
                                    }
                                    $http.get('/api/v1/auto_model/').success(function(data) {
                                        for (i = 0; i < data.objects.length; i++){
                                            $scope.auto_models.push(data.objects[i])
                                        }
                                    });
                                });
                                $scope.show_edit_area = false;
                            };
                            $scope.delete_auto = function(){
                                $http.delete('/edit_auto?' + 'id=' + $stateParams.auto_modelId).success(function(){
                                    var n = $scope.auto_models.length;
                                    for (i = 0; i < n; i++){
                                        $scope.auto_models.pop()
                                    }
                                    $http.get('/api/v1/auto_model/').success(function(data) {
                                        for (i = 0; i < data.objects.length; i++){
                                            $scope.auto_models.push(data.objects[i])
                                        }
                                    });
                                });
                                $scope.show_edit_area = false;
                            };
                            if ($stateParams.auto_modelId !== 'create'){
                                $scope.show_delete_button = true;
                                $http.get('/api/v1/auto_model/'+$stateParams.auto_modelId+'/').success(function(data){
                                    $scope.value = data.name;
                                }).error(function(data, status, headers, config){
                                    if(status=401){
                                        window.location = '/admin'
                                    }
                                })
                            }
                            else {
                                $scope.show_delete_button = false;
                            }
                        }
                    ]
                }
            }
        })
});

app.run(['$rootScope', function($rootScope) {

}]);