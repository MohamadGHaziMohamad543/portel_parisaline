adminApp.controller('home', ['$scope','$location','$cookies',CONT_home]);

Routing.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/', {
            templateUrl: 'Views/home.html'+'?v='+numberVisrtion,
            controller: 'home',
            resolve : {
                //This function is injected with the AuthService where you'll put your authentication logic
                'Render' : function(Render){
                    return Render.Render([
                        {link:'assets/libs/datatables/dataTables.bootstrap4.css',type:"CSS"},
                        {link:'assets/libs/datatables/buttons.bootstrap4.css',type:"CSS"},
                        {link:'assets/libs/datatables/select.bootstrap4.css',type:"CSS"},
                        {link:'assets/libs/datatables/jquery.dataTables.min.js',type:"JS"},
                        {link:'assets/libs/datatables/dataTables.bootstrap4.js',type:"JS"},
                        {link:'assets/libs/datatables/dataTables.select.min.js',type:"JS"},
                    ],true);
                }
            }
        });
    }
]);

adminApp.run(
    function($rootScope, $location){
        //If the route change failed due to authentication error, redirect them out
            $rootScope.$on('$routeChangeError', function(event, current, previous, rejection){
                if(rejection === 'Not Authenticated'){
                    $locationOld=window.location.toString();
                    $location.path('/Auth/Login');
                }
                else if(rejection==="Not Login")
                {
                    $location.path('/');
                }
                else if(rejection==="Not Confirm")
                {
                    $location.path('/Auth/Confirm');
                }
                else if(rejection==="rePassword")
                {
                    $location.path('/Auth/RP');
                }
            })
        });
//factory services
adminApp.factory('Render', function($q,$cookies,$location){
    return {
        Render :async function(linkArray,auth) {
           return await FACT_Render(linkArray,auth,$q,$cookies,$location) 
        }
    }
});
//filter
adminApp.filter('nl2p', FILTER_nl2p);
adminApp.filter('time', FILTER_time);
adminApp.filter('imageUser', FILTER_imageUser);

//not Fond Page 
adminApp.controller('notFondPage', ['$scope','$location','$cookies',CONT_NotFondPage]);

Routing.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/NotFondPage', {
            templateUrl: 'NotFondPage.html'+'?v='+numberVisrtion,
            controller: 'notFondPage',
            resolve : {
                //This function is injected with the AuthService where you'll put your authentication logic
                'Render' : function(Render){
                    return Render.Render([],true);
                }
            }
        }).otherwise({redirectTo: '/NotFondPage'});
    }
]);
//shipping

adminApp.controller('Shipping', ['$scope','$location','$routeParams',CONT_Shipping]);

Routing.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/Settings/Shipping/', {
            templateUrl: 'Views/settings/Shipping.html'+'?v='+numberVisrtion,
            controller: 'Shipping',
            resolve : {
                //This function is injected with the AuthService where you'll put your authentication logic
                'Render' : function(Render){
                    return Render.Render([
                        {link:'assets/libs/animate/animate.min.css',type:"CSS"},
                        {link:'assets/libs/flatpickr/flatpickr.min.css',type:"CSS"},
                        {link:'https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.1.1/crypto-js.min.js',type:"JS"},
                        {link:'assets/libs/flatpickr/flatpickr.min.js',type:"JS"},
                        {link:'assets/libs/tippy-js/tippy.all.min.js',type:"JS"},
                       // {link:'assets/libs/jsPdf/jspdf.umd.min.js',type:"JS"},
                    ],true);
                }
            }
        });
    }
]);

//Accounts
adminApp.controller('Accounts', ['$scope','$location','$routeParams',CONT_Accounts]);

Routing.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/Settings/Accounts/', {
            templateUrl: 'Views/settings/Accounts.html'+'?v='+numberVisrtion,
            controller: 'Accounts',
            resolve : {
                //This function is injected with the AuthService where you'll put your authentication logic
                'Render' : function(Render){
                    return Render.Render([
                        {link:'assets/libs/animate/animate.min.css',type:"CSS"},
                        {link:'assets/libs/ladda/ladda-themeless.min.css',type:"CSS"},
                        {link:'assets/libs/tellPhone/intlTelInput.min.css',type:"CSS"},
                        {link:'https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js',type:"JS"},
                        {link:'https://www.gstatic.com/firebasejs/8.0.0/firebase-auth.js',type:"JS"},
                        {link:'assets/libs/tellPhone/intlTelInput.min.js',type:"JS"},
                        {link:'assets/libs/jquery-mask-plugin/jquery.mask.min.js',type:"JS"},
                        {link:'assets/libs/autonumeric/autoNumeric-min.js',type:"JS"},
                        {link:'assets/libs/ladda/spin.js',type:"JS"},
                        {link:'assets/libs/ladda/ladda.js',type:"JS"},
                        {link:'assets/libs/parsleyjs/parsley.min.js',type:"JS"},
                    ],true);
                }
            }
        });
    }
]);

//Appointment
adminApp.controller('Appointment', ['$scope','$location','$routeParams',CONT_Tabsppointment]);

Routing.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/Appointment/', {
            templateUrl: 'Views/appointment/tabsappintment.html'+'?v='+numberVisrtion,
            controller: 'Appointment',
            resolve : {
                //This function is injected with the AuthService where you'll put your authentication logic
                'Render' : function(Render){
                    return Render.Render([
                        {link:'assets/libs/animate/animate.min.css',type:"CSS"},
                        {link:'assets/libs/datatables/jquery.dataTables.min.js',type:"JS"},
                        {link:'assets/libs/datatables/dataTables.bootstrap4.css',type:"CSS"},
                        {link:'assets/libs/datatables/dataTables.bootstrap4.js',type:"JS"},
                        {link:'assets/libs/ladda/ladda-themeless.min.css',type:"CSS"},
                        {link:'assets/libs/tellPhone/intlTelInput.min.css',type:"CSS"},
                        {link:'https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js',type:"JS"},
                        {link:'https://www.gstatic.com/firebasejs/8.0.0/firebase-auth.js',type:"JS"},
                        {link:'assets/libs/tellPhone/intlTelInput.min.js',type:"JS"},
                        {link:'assets/libs/jquery-mask-plugin/jquery.mask.min.js',type:"JS"},
                        {link:'assets/libs/autonumeric/autoNumeric-min.js',type:"JS"},
                        {link:'assets/libs/ladda/spin.js',type:"JS"},
                        {link:'assets/libs/ladda/ladda.js',type:"JS"},
                        {link:'assets/libs/parsleyjs/parsley.min.js',type:"JS"},
                    ],true);
                }
            }
        });
    }
]);

adminApp.controller('ComAppointment', ['$scope','$location','$rootScope',CONT_Appointment]);
adminApp.component('comappointment', {
    bindings: { 
        filters: '@'
     },
    templateUrl: 'Views/appointment/appointment.html'+'?v='+numberVisrtion,
    controller: 'ComAppointment'
  });

//MEET
adminApp.controller('MEET', ['$scope','$location','$routeParams',CONT_Meet]);

Routing.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/MEET/:id', {
            templateUrl: 'Views/meet/meet.html'+'?v='+numberVisrtion,
            controller: 'MEET',
            resolve : {
                //This function is injected with the AuthService where you'll put your authentication logic
                'Render' : function(Render){
                    return Render.Render([
                        {link:'assets/libs/animate/animate.min.css',type:"CSS"},
                        {link:'assets/libs/ladda/ladda-themeless.min.css',type:"CSS"},
                        {link:'assets/libs/tellPhone/intlTelInput.min.css',type:"CSS"},
                        {link:'https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js',type:"JS"},
                        {link:'https://www.gstatic.com/firebasejs/8.0.0/firebase-auth.js',type:"JS"},
                        {link:'assets/libs/tellPhone/intlTelInput.min.js',type:"JS"},
                        {link:'assets/libs/jquery-mask-plugin/jquery.mask.min.js',type:"JS"},
                        {link:'assets/libs/autonumeric/autoNumeric-min.js',type:"JS"},
                        {link:'https://meet.kb-turk.com/external_api.js',type:"JS"},
                        {link:'assets/libs/ladda/spin.js',type:"JS"},
                        {link:'assets/libs/ladda/ladda.js',type:"JS"},
                        {link:'assets/libs/parsleyjs/parsley.min.js',type:"JS"},
                    ],true);
                }
            }
        });
    }
]);

//caseView
adminApp.controller('caseView', ['$scope','$location','$routeParams','$sce',CONT_caseView]);

Routing.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/CV/:id', {
            templateUrl: 'Views/Cases/caseView.html'+'?v='+numberVisrtion,
            controller: 'caseView',
            resolve : {
                //This function is injected with the AuthService where you'll put your authentication logic
                'Render' : function(Render){
                    return Render.Render([
                        {link:'//vjs.zencdn.net/7.10.2/video-js.min.css',type:"CSS"},
                        {link:'assets/libs/animate/animate.min.css',type:"CSS"},
                        {link:'https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.1.1/crypto-js.min.js',type:"JS"},
                        {link:'assets/libs/tippy-js/tippy.all.min.js',type:"JS"},
                        {link:'//vjs.zencdn.net/7.10.2/video.min.js',type:"JS"},
                       // {link:'assets/libs/jsPdf/jspdf.umd.min.js',type:"JS"},
                    ],false);
                }
            }
        });
    }
]);


//Cases
adminApp.controller('Cases', ['$scope','$location','$routeParams',CONT_Cases]);

Routing.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/Cases/:id', {
            templateUrl: 'Views/Cases/Cases.html'+'?v='+numberVisrtion,
            controller: 'Cases',
            resolve : {
                //This function is injected with the AuthService where you'll put your authentication logic
                'Render' : function(Render){
                    return Render.Render([
                        {link:'//vjs.zencdn.net/7.10.2/video-js.min.css',type:"CSS"},
                        {link:'assets/libs/animate/animate.min.css',type:"CSS"},
                        {link:'assets/libs/flatpickr/flatpickr.min.css',type:"CSS"},
                        {link:'https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.1.1/crypto-js.min.js',type:"JS"},
                        {link:'assets/libs/flatpickr/flatpickr.min.js',type:"JS"},
                        {link:'assets/libs/tippy-js/tippy.all.min.js',type:"JS"},
                        {link:'//vjs.zencdn.net/7.10.2/video.min.js',type:"JS"},
                        {link:'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.3.0-beta.1/pdfmake.min.js',type:"JS"},
                        {link:'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.3.0-beta.1/vfs_fonts.min.js',type:"JS"},
                       // {link:'assets/libs/jsPdf/jspdf.umd.min.js',type:"JS"},
                    ],true);
                }
            }
        });
    }
]);

//compnanent  for Cases
adminApp.controller('AdditionalInstructions', ['$scope','$location','$rootScope',CONT_AdditionalInstructions]);
adminApp.component('additionalInstructions', {
    bindings: { 
        filters: '@',
        buttonNext: '&',
        idPatient: '<',
        optionId: '@',
        status: '=',
     },
    templateUrl: 'Views/Cases/Components/AdditionalInstructions.html'+'?v='+numberVisrtion,
    controller: 'AdditionalInstructions'
  });

  adminApp.controller('CreateOrder', ['$scope','$location','$routeParams','$rootScope',CONT_CreateOrder]);

adminApp.component('createOrder', {
    bindings: { 
        idPatient: '<',
        buttonNext: '&',
        buttonBack: '&',
        showModelShippingCreate: '&',
     },
    templateUrl: 'Views/Cases/Components/CreateOrder.html'+'?v='+numberVisrtion,
    controller: 'CreateOrder'
  });


  adminApp.controller('SelectPakge', ['$scope','$location','$routeParams','$rootScope',CONT_SelectPakge]);

  adminApp.component('selectPakge', {
      bindings: { 
          idPatient: '<',
          buttonNext: '&',
          buttonBack: '&',
          showModelShippingCreate: '&',
          status: '=',
          refinementnumber: '=',
       },
      templateUrl: 'Views/Cases/Components/SelectPakge.html'+'?v='+numberVisrtion,
      controller: 'SelectPakge'
    });


  adminApp.controller('PatientInformation', ['$scope','$location',CONT_PatientInformation]);

adminApp.component('patientInformation', {
    bindings: { 
        filters: '@',
        buttonNext: '&',
        idPatient: '<',
        deleteCases: '<',
        eventCaseRefinementAndRetainer: '&',
     },
    templateUrl: 'Views/Cases/Components/PatientInformation.html'+'?v='+numberVisrtion,
    controller: 'PatientInformation'
  });
  adminApp.controller('PatientRecords', ['$scope','$location',CONT_PatientRecords]);
    adminApp.component('patientRecords', {
        bindings: { 
            idPatient: '<',
            buttonNext: '&',
            buttonBack: '&'
        },
        templateUrl: 'Views/Cases/Components/PatientRecords.html'+'?v='+numberVisrtion,
        controller: 'PatientRecords'
    });


    adminApp.controller('SubmitCase', ['$scope','$location',CONT_SubmitCase]);

    adminApp.component('submitCase', {
        bindings: { 
            filters: '@',
            buttonNext: '&',
            btnHideNav: '&',
            idPatient: '<',
        },
        templateUrl: 'Views/Cases/Components/SubmitCase.html'+'?v='+numberVisrtion,
        controller: 'SubmitCase'
    });



    adminApp.controller('tretmentPlan', ['$scope','$location','$sce','$rootScope',CONT_tretmentPlan]);

    adminApp.component('tretmentPlan', {
        bindings: { 
            filters: '@',
            buttonNext: '&',
            idPatient: '<',
            status: '<',
            showModelShippingCreate: '&',
            showModelShippingEdit: '&',
        },
        templateUrl: 'Views/Cases/Components/tretmentPlan.html'+'?v='+numberVisrtion,
        controller: 'tretmentPlan',
    });


    adminApp.controller('afterTretment', ['$scope','$location','$sce','$rootScope',CONT_afterTretment]);

    adminApp.component('afterTretment', {
        bindings: { 
            filters: '@',
            buttonNext: '&',
            idPatient: '<',
            status: '<',
            showModelShippingCreate: '&',
        },
        templateUrl: 'Views/Cases/Components/afterTretment.html'+'?v='+numberVisrtion,
        controller: 'afterTretment',
    });
    //end Componenet for Cases

    //AUTH CONFIRM
    adminApp.controller('Auth.Confirm', ['$scope','$cookies',CONT_Auth_Confirm]);

    Routing.config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/Auth/Confirm', {
            templateUrl: 'Views/Auth/Confirm.html'+'?v='+numberVisrtion,
            controller: 'Auth.Confirm',
            resolve : {
                //This function is injected with the AuthService where you'll put your authentication logic
                'Render' : function(Render){
                    return Render.Render([
                        {link:'assets/libs/animate/animate.min.css',type:"CSS"},
                        {link:'assets/libs/ladda/ladda-themeless.min.css',type:"CSS"},
                        {link:'assets/libs/tellPhone/intlTelInput.min.css',type:"CSS"},
                        {link:'https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js',type:"JS"},
                        {link:'https://www.gstatic.com/firebasejs/8.0.0/firebase-auth.js',type:"JS"},
                        {link:'assets/libs/tellPhone/intlTelInput.min.js',type:"JS"},
                        {link:'assets/libs/jquery-mask-plugin/jquery.mask.min.js',type:"JS"},
                        {link:'assets/libs/autonumeric/autoNumeric-min.js',type:"JS"},
                        {link:'assets/libs/ladda/spin.js',type:"JS"},
                        {link:'assets/libs/ladda/ladda.js',type:"JS"},
                        {link:'assets/libs/parsleyjs/parsley.min.js',type:"JS"},
                    ],true);
                }
            }
        });
    }
    ]);

    //AUTH LOGIN
    adminApp.controller('Auth.Login', ['$scope','$cookies','$location',CONT_Auth_Login]);

    Routing.config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/Auth/Login', {
            templateUrl: 'Views/Auth/Login.html'+'?v='+numberVisrtion,
            controller: 'Auth.Login',
            resolve : {
                //This function is injected with the AuthService where you'll put your authentication logic
                'Render' : function(Render){
                    return Render.Render([
                        {link:'assets/libs/ladda/ladda-themeless.min.css',type:"CSS"},
                        {link:'assets/libs/ladda/spin.js',type:"JS"},
                        {link:'assets/libs/ladda/ladda.js',type:"JS"},
                        {link:'assets/libs/parsleyjs/parsley.min.js',type:"JS"},
                    ],false);
                }
            }
        });
    }
    ]);


        //AUTH LOGIN Token
        adminApp.controller('Auth.LoginToken', ['$scope','$cookies','$location','$routeParams',CONT_Auth_LoginToken]);

        Routing.config(['$routeProvider', function($routeProvider) {
            $routeProvider.when('/Auth/Token/:Token', {
                templateUrl: 'Views/Auth/LoginToken.html'+'?v='+numberVisrtion,
                controller: 'Auth.LoginToken',
                resolve : {
                    //This function is injected with the AuthService where you'll put your authentication logic
                    'Render' : function(Render){
                        return Render.Render([
                            {link:'assets/libs/ladda/ladda-themeless.min.css',type:"CSS"},
                            {link:'assets/libs/ladda/spin.js',type:"JS"},
                            {link:'assets/libs/ladda/ladda.js',type:"JS"},
                            {link:'assets/libs/parsleyjs/parsley.min.js',type:"JS"},
                        ],false);
                    }
                }
            });
        }
        ]);
    //Auth newPassword
    adminApp.controller('Auth.newPassword', ['$scope','$cookies','$location',CONT_Auth_newPassword]);

    Routing.config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/Auth/RP', {
            templateUrl: 'Views/Auth/newPassword.html'+'?v='+numberVisrtion,
            controller: 'Auth.newPassword',
            resolve : {
                //This function is injected with the AuthService where you'll put your authentication logic
                'Render' : function(Render){
                    return Render.Render([
                        {link:'assets/libs/ladda/ladda-themeless.min.css',type:"CSS"},
                        {link:'https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js',type:"JS"},
                        {link:'https://www.gstatic.com/firebasejs/8.0.0/firebase-auth.js',type:"JS"},
                        {link:'assets/libs/ladda/spin.js',type:"JS"},
                        {link:'assets/libs/ladda/ladda.js',type:"JS"},
                        {link:'assets/libs/parsleyjs/parsley.min.js',type:"JS"},
                    ],false);
                }
            }
        });
    }
    ]);

    //Auth recover Password 
    adminApp.controller('Auth.revoverPassword', ['$scope','$cookies','$location',CONT_Auth_revoverPassword]);

    Routing.config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/Auth/Rec', {
            templateUrl: 'Views/Auth/revoverPassword.html'+'?v='+numberVisrtion,
            controller: 'Auth.revoverPassword',
            resolve : {
                //This function is injected with the AuthService where you'll put your authentication logic
                'Render' : function(Render){
                    return Render.Render([
                        {link:'assets/libs/ladda/ladda-themeless.min.css',type:"CSS"},
                        {link:'https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js',type:"JS"},
                        {link:'https://www.gstatic.com/firebasejs/8.0.0/firebase-auth.js',type:"JS"},
                        {link:'assets/libs/ladda/spin.js',type:"JS"},
                        {link:'assets/libs/ladda/ladda.js',type:"JS"},
                        {link:'assets/libs/parsleyjs/parsley.min.js',type:"JS"},
                    ],false);
                }
            }
        });
    }
    ]);

    //Auth SignUp

    adminApp.controller('Auth.Signup', ['$scope','$cookies',CONT_Auth_Signup]);

    Routing.config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/Auth/Signup', {
            templateUrl: 'Views/Auth/Signup.html'+'?v='+numberVisrtion,
            controller: 'Auth.Signup',
            resolve : {
                //This function is injected with the AuthService where you'll put your authentication logic
                'Render' : function(Render){
                    return Render.Render([
                        {link:'assets/libs/ladda/ladda-themeless.min.css',type:"CSS"},
                        {link:'assets/libs/tellPhone/intlTelInput.min.css',type:"CSS"},
                        {link:'assets/libs/tellPhone/intlTelInput.min.js',type:"JS"},
                        {link:'assets/libs/jquery-mask-plugin/jquery.mask.min.js',type:"JS"},
                        {link:'assets/libs/autonumeric/autoNumeric-min.js',type:"JS"},
                        {link:'assets/libs/ladda/spin.js',type:"JS"},
                        {link:'assets/libs/ladda/ladda.js',type:"JS"},
                        {link:'assets/libs/parsleyjs/parsley.min.js',type:"JS"},
                    ],false);
                }
            }
        });
    }
    ]);

    //end AUTH
adminApp.controller('Layouts', ['$scope','$rootScope','$location',CONT_Layouts]);

adminApp.controller('topbar', ['$scope','$cookies','$rootScope','$location',CONT_topbar]);
adminApp.controller('left_side', ['$scope',CONT_left_side]);

adminApp.controller('viewerStl', ['$scope','$rootScope',CONT_viewerStl]);
adminApp.directive('format', ['$rootScope',DIR_format]);
adminApp.directive('counterMeet', ['$rootScope',DIR_Counter]);
adminApp.directive('dragDrop', ['$rootScope',COMP_dragDrop]);
adminApp.directive('audioRender', ['$rootScope',COMP_audioRender]);