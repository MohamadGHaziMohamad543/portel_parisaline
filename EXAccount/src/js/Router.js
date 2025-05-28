    adminApp.run(
                function($rootScope, $location){
                //If the route change failed due to authentication error, redirect them out
                    $rootScope.$on('$routeChangeError',function(event, current, previous, rejection){
                            RUNAUTOTSTARTAPP(event, current, previous, rejection,$location);
                    });
                }
            );
    //factory services
    adminApp.factory('Render', function($q,$cookies,$location){
        return {
            Render :async function(linkArray,auth) {
            return await FACT_Render(linkArray,auth,$q,$cookies,$location) 
            }
        }
    });

    


    var $StartController=(key)=>{
        adminApp.controller(key, $ANContreoller[key].FUN);

        if($ANContreoller[key].Router)
        {
            Routing.config(['$routeProvider', function($routeProvider) {
                $routeProvider.when($ANContreoller[key].Router.Url, {
                        templateUrl: $ANContreoller[key].Router.Templete,
                        controller: key,
                        resolve : {
                            //This function is injected with the AuthService where you'll put your authentication logic
                            'Render' : function(Render){
                                return Render.Render($ANContreoller[key].Router.Render,$ANContreoller[key].Router.AUTH);
                            }
                        }
                    });
                }
            ]);
        }
    }

    var $StartComponent=(key)=>{
        adminApp.controller(key+"_Comonenet", $ANComponent[key].FUN);
        adminApp.component(key, {
            bindings:$ANComponent[key].Paramter?$ANComponent[key].Paramter:{},
            templateUrl: $ANComponent[key].Templete,
            controller: key+"_Comonenet"
        });
    }

    var $StartDirective=(key)=>{
        adminApp.directive(key, $ANDirective[key].FUN);
    }
    var $StartFilter=(key)=>{
        adminApp.filter(key, $ANFilter[key].FUN);
    }
    for (var key in $ANComponent) {
        $StartComponent(key);
    }
    for (var key in $ANContreoller) {
        $StartController(key);
    }
    for (var key in $ANDirective) {
        $StartDirective(key);
    }

    for (var key in $ANFilter) {
        $StartFilter(key);
    }

    Routing.config(['$routeProvider', function($routeProvider) {
         $routeProvider.otherwise({redirectTo: '/NotFondPage'});
        }
    ]); 


