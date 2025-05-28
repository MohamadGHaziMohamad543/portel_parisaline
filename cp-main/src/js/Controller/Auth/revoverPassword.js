$ANContreoller.Auth_revoverPassword={
    FUN:['$scope','$cookies','$location',
    function($scope,$cookies,$location){
        $scope.$emit('AuthChanged', false);
        // $cookies.put('testCok', 'oatmeal');
       //  console.log($cookies.remove('PUCL'));
        if($cookies.get('PUCL'))
        {
           // $location.path('/');
        }
        $scope.submited=0;
        $scope.errorEmail=0;
        $scope.init=()=>{
            var l = Ladda.create(document.querySelector('.ladda-button'));
            $scope.loader=true;
            $scope.ErrorMessagss=" ";
            $scope.RecoveryEmail=()=>{
                var valueForm=Validate(document.getElementById('formLogin'));
                if(!valueForm)
                {
                    return false;
                }
                l.start();
                HTTPs.POST(CONFIG.serverUrl+"/RPA",valueForm).then(res=>{
                    res=JSON.parse(res);
                    if(res.message==2001)
                    {
                        $scope.$apply(()=>{
                            $scope.submited=1;
                        })
                    }
                    else if(res.error==1001)
                    {
                        $scope.$apply(()=>{
                            $scope.errorEmail=1;
                        })
                        $('#email').addClass("errorInput");
                        $('#email').removeClass("sucssInput");
                    }
        
                });
        
            }
        
        }
       
    }
    ],
    Router:{
        Url:"/Auth/Rec",
        Templete:'Views/Auth/revoverPassword.html',
        Render:[
            {link:'assets/libs/ladda/ladda-themeless.min.css',type:"CSS"},
            {link:'https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js',type:"JS"},
            {link:'https://www.gstatic.com/firebasejs/8.0.0/firebase-auth.js',type:"JS"},
            {link:'assets/libs/ladda/spin.js',type:"JS"},
            {link:'assets/libs/ladda/ladda.js',type:"JS"},
            {link:'assets/libs/parsleyjs/parsley.min.js',type:"JS"},
        ],
        AUTH:false
    }
}