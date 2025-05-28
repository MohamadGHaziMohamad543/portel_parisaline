
var CONT_Auth_Login=function($scope,$cookies,$location){
    $scope.$emit('AuthChanged', false);
    // $cookies.put('testCok', 'oatmeal');
   //  console.log($cookies.remove('PUD'));
    if($cookies.get('PUD'))
    {
       // $location.path('/');
    }
    var l = Ladda.create(document.querySelector('.ladda-button'));
    var m = Ladda.create(document.querySelector('#loginGoogel'));
    $scope.loader=true;
    $scope.ErrorMessagss=" ";
    $scope.Login=()=>{
        var valueForm=Validate(document.getElementById('formLogin'));
        if(!valueForm)
        {
            return false;
        }
        valueForm['kiven']="asdas";
        m.start();
        l.start();
        HTTPs.POST(CONFIG.serverUrl+"/Login",valueForm).then(res=>{
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
                    l.remove(); 
                    m.remove(); 
                })
            }
            else if(res.message=="Error Password"){
                $scope.$apply(()=>{
                    $scope.ErrorMessagss="You may have entered the wrong password, retype the password again";  
                    $('#email').css('border','1px dashed green');  
                    $('#password').css('border','1px dashed red');  
                    $('#email').focus();    
                    l.remove(); 
                    m.remove(); 
                });
                
            }
        });

    }

    if(!firebaseApp1)
    {
      provider = new firebase.auth.GoogleAuthProvider();
      const firebaseConfig = {
        apiKey: "AIzaSyAByCjD3hZ62O5KtA4wWtnWyU7lllbDk94",
        authDomain: "parisaline-4733c.firebaseapp.com",
        databaseURL: "https://parisaline-4733c-default-rtdb.firebaseio.com",
        projectId: "parisaline-4733c",
        storageBucket: "parisaline-4733c.appspot.com",
        messagingSenderId: "860262996325",
        appId: "1:860262996325:web:6b0ccdca03e9c83899698c",
        measurementId: "G-9HT5C6F0PE"
      };
      firebaseApp1=firebase.initializeApp(firebaseConfig);
    }
    document.getElementById('loginGoogel').addEventListener('click', ()=>{
        m.start();
        l.start();
        firebaseApp1.auth().signInWithPopup(provider).then(res=>{
            HTTPs.POST(CONFIG.serverUrl+"/CLG",{an:res.credential.accessToken}).then(res=>{
                 res=JSON.parse(res);
                 if(res.message=="Auth successful"){
                     Login(res);
                 }
                 else if(res.message=="Auth Exsist")
                 {
                    Login(res);
                 }
            });
          }).catch(e=>{
                m.remove(); 
                l.remove();
          });
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
                    if($locationOld)
                    {
                        window.location=$locationOld;
                        $locationOld=null;
                    }
                    else{
                        location.reload();
                    }
                    m.remove(); 
                    l.remove();
                }, 1000);
            });
            $('#ErrorMessagePublic').css('background','#0baf2921');
        }
    }
}
