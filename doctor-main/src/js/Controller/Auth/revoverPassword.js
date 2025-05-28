var CONT_Auth_revoverPassword=function($scope,$cookies,$location){
    $scope.$emit('AuthChanged', false);
    // $cookies.put('testCok', 'oatmeal');
   //  console.log($cookies.remove('PUD'));
    if($cookies.get('PUD'))
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