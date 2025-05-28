var CONT_Auth_newPassword=function($scope,$cookies,$location){
    $scope.$emit('AuthChanged', false);
    // $cookies.put('testCok', 'oatmeal');
   //  console.log($cookies.remove('PUD'));
    if($cookies.get('PUD'))
    {
       // $location.path('/');
    }
    $scope.submited=0;
    $scope.errorPasswrd=0;
    $scope.init=()=>{
        var l = Ladda.create(document.querySelector('.ladda-button'));
        $scope.loader=true;
        $scope.ErrorMessagss=" ";
        $scope.recoveryPassword=()=>{
            var valueForm=Validate(document.getElementById('formLogin'));
            if(!valueForm)
            {
                return false;
            }
            if(valueForm['password']!=valueForm['confirmPassowrd'])
            {
                $scope.errorPasswrd=1;
                $('#confirmPassowrd').addClass("errorInput");
                $('#password').removeClass("errorInput");
                return;
            }
            if(valueForm['password']=="")
            {
                $scope.errorPasswrd=2;
                $('#password').addClass("errorInput");
                $('#confirmPassowrd').addClass("errorInput");
                return;
            }
            l.start();
            if($cookies.get("PS"))
            {
                HTTPs.Token=JSON.parse($cookies.get("PS")).token;
            }
            HTTPs.POST(CONFIG.serverUrl+"/RUP",valueForm).then(res=>{
                res=JSON.parse(res);
                if(res.message=="Auth successful")
                {
                   $cookies.remove("PS");
                   Login(res);
                }
            });
    
            let Login=(res)=>{
                if(res.tempPass)
                {
                    $cookies.put("PS",JSON.stringify({token:res.token}));
                    location.reload();
                }
                else{
                    CONFIG.Did=res.user.dentalCenterId;
                    $cookies.put('PUD', JSON.stringify({token:res.token,Did:res.user.dentalCenterId,name:res.user.nameDoctor,image:res.user.logo,phone:res.user.phoneNumber,email:res.user.email})); //PUD Parisaline User Doctor
                    $scope.$apply(()=>{
                        $scope.ErrorMessagss="Authentication completed successfully, you will be redirected to the control panel";
                        setTimeout(() => {
                            $('#email').css('border','1px dashed green'); 
                            $('#password').css('border','1px dashed green'); 
                            location.reload();
                            l.remove();
                        }, 1000);
                    });
                    $('#ErrorMessagePublic').css('background','#0baf2921');
                }
            }
        }
    
    }
   
}
