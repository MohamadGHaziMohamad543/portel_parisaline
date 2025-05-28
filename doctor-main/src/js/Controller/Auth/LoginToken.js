
var CONT_Auth_LoginToken=function($scope,$cookies,$location,$routeParams){
    $scope.$emit('AuthChanged', false);
    // $cookies.put('testCok', 'oatmeal');
   //  console.log($cookies.remove('PUD'));
   $cookies.remove('PUD');
    $scope.loader=true;
    $scope.ErrorMessagss=" ";
    $scope.Login=(Token)=>{
        HTTPs.POST(CONFIG.serverUrl+"/LWT",{Token:Token}).then(res=>{
            res=JSON.parse(res);
            if(res.message=="Auth successful")
            {
                Login(res);
            }
            else if(res.message=="error Login"){
                //not fond account
                $scope.$apply(()=>{
                    $scope.ErrorMessagss="You do not have an account Do you want to <a href='/Auth/Log'>register</a> a new account";
                    $('#email').css('border','1px dashed red');
                    $('#email').focus();
                    $('#password').css('border','1px solid #f1f1f5'); 
                })
            }
            else if(res.message=="Error Password"){
                $scope.$apply(()=>{
                    $scope.ErrorMessagss="You may have entered the wrong password, retype the password again";  
                    $('#email').css('border','1px dashed green');  
                    $('#password').css('border','1px dashed red');  
                    $('#email').focus();    
                });
                
            }
        });

    }
    if(!firebaseApp1)
    {
      provider = new firebase.auth.GoogleAuthProvider();
      const firebaseConfig = {
          apiKey: "AIzaSyBocHvWEfdQ8A78A9xyPVpe5tWCzkIkOgo",
          authDomain: "parisaline-4733c.firebaseapp.com",
          projectId: "parisaline-4733c",
          storageBucket: "parisaline-4733c.appspot.com",
          messagingSenderId: "860262996325",
          appId: "1:860262996325:web:2e39abb3b9f8a6f099698c",
          measurementId: "G-39ZF95XN8T"
      };
      firebaseApp1=firebase.initializeApp(firebaseConfig);
    }

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
                    location.href="/";

                }, 1000);
            });
            $('#ErrorMessagePublic').css('background','#0baf2921');
        }
    }
    $scope.Login($CRID.END($routeParams.Token));
}
