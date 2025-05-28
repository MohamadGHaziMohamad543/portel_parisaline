
$ANContreoller.Auth_Signup={
    FUN:['$scope','$cookies',function($scope,$cookies){
        $scope.$emit('AuthChanged', false);
        var l = Ladda.create(document.querySelector('.ladda-button'));
        $scope.loader=true;
        $scope.clickButton=false;
        $scope.termsAndConditions=false;
        $scope.iCertifyThat=false;
        $scope.clickButton=false;
        $scope.ErrorMessagss=' ';
        $scope.CreateAccount=()=>{
            $scope.clickButton=true;
            var valueForm=Validate(document.getElementById('formLogin'));
            if(!valueForm)
            {
                return false;
            }
            if(valueForm['password']!=valueForm['ConfirmPassword'])
            {
                $('#ConfirmPassword').addClass("errorInput");
                $('#ConfirmPassword').removeClass("sucssInput");
                var pp=document.querySelector('#ConfirmPassword').parentNode.querySelector("a");
                pp.innerHTML=pp.getAttribute("titleError");
                return ;
            }
            else{
                $('#ConfirmPassword').addClass("sucssInput");
                $('#ConfirmPassword').removeClass("errorInput");
                var pp=document.querySelector('#ConfirmPassword').parentNode.querySelector("a");
                pp.innerHTML="";
            }
            if(!iti.isValidNumber())
            {
                $('.ErrorMessagePhone').html($('.ErrorMessagePhone').attr('titleError'));
                return;
            }
            else{
                $('.ErrorMessagePhone').html("");
                valueForm['phoneNumber']=iti.getNumber();
            }
            if(!$scope.termsAndConditions || !$scope.iCertifyThat)
            {
                return ;
            }
            l.start();
            HTTPs.POST(CONFIG.serverUrl+"/DC",valueForm).then(res=>{
                res=JSON.parse(res);
                if(res.error==1001)
                {
                    $scope.ErrorMessagss=`
                    <p>The email you entered already exists </p>
                    <p>Please try to login with your existing account</p>
                    `;
                }
                else{
                    if(res.message=="Auth successful")
                    {
                        Login(res);
                    }
                }
    
                l.stop();
            });
    
        }
    
        let Login=(res)=>{
            CONFIG.Did=res.user.dentalCenterId;
            $cookies.put('PUTR', JSON.stringify({token:res.token,Did:res.user.dentalCenterId,name:res.user.nameDoctor,image:res.user.logo,phone:res.user.phoneNumber})); //PUA Parisaline User Doctor
            $scope.$apply(()=>{
                $scope.ErrorMessagss="Authentication completed successfully, you will be redirected to the control panel";
                setTimeout(() => {
                    $('#email').css('border','1px dashed green'); 
                    $('#password').css('border','1px dashed green'); 
                    location.reload();
                    m.remove(); 
                    l.remove();
                }, 1000);
            });
            $('#ErrorMessagePublic').css('background','#0baf2921');
        }
    
        var input = document.querySelector("#phone");
        var errorMap = ["Invalid number", "Invalid country code", "Too short", "Too long", "Invalid number"];
    
        // initialise plugin
        var iti = window.intlTelInput(input, {
            initialCountry: "auto",
            geoIpLookup: function(callback) { 
    
              $.get('https://ipinfo.io/json?token=185e80a0d228c6', function() {}, "json").always(function(resp) {
                var countryCode = (resp && resp.country) ? resp.country : "us";
                callback(countryCode);
              });
            },
            nationalMode: true,
            formatOnDisplay: true,
            separateDialCode: true,
            autoFormat:true,
            utilsScript: "/assets/libs/tellPhone/utils.js?1638200991544"
        });
    
        
        var reset = function() {
            input.classList.add('errorInput');
        };
        
        // on blur: validate
        input.addEventListener('blur', function(e) {
            reset();
            if (input.value.trim()) {
                if (iti.isValidNumber()) {
                    input.classList.add("sucssInput");
                    input.classList.remove("errorInput");
                } else {
                    input.classList.remove("sucssInput");
                    input.classList.add("errorInput");
                }
            }
        });
    
        // on keyup / change flag: reset
        input.addEventListener('change', reset);
        input.addEventListener('keyup', reset);
        input.addEventListener("keydown", (e)=>{
            placHolder(e);
        });
        $('.iti__selected-flag').click(res=>{
            $(input).mask("000000000000000000000");
        });
        input.addEventListener("countrychange", function(e) {
            e.target.value="";
            $scope.$apply(()=>{
               let idCountry=$scope.CountryItem.find(x=>x.code==iti.getSelectedCountryData().iso2);
               $scope.Country=idCountry.id;
               $scope.changeCountry();
            });
            placHolder(e,true);
          });
          var placHolder=(e,maskEvev=null)=>{
            let plac= e.target.getAttribute("placeholder");
            let stringTemp="";
            let mask="";
            for(var i=0;i<plac.length;i++)
            {
                if(plac[i] !='-' && plac[i] != "(" && plac[i]!= ")" && plac[i] != " ")
                {
                     stringTemp+="x";
                     mask+="0";
                }
                else{
                     stringTemp+=plac[i];
                     mask+=plac[i];
                }
            }
            e.target.setAttribute('placeholder',stringTemp);
            if(maskEvev)
            {
                $(input).mask(mask);
            }
          }
    
    
          //country and City
          $scope.Country="219";
          $scope.TitleForm="";
          $scope.CountryItem=[];
          $scope.getCountrys=()=>{
              $.get("/assets/data/countrys.json", function( data ) {
                 $scope.$apply(()=>{
                     $scope.CountryItem=data;
                 });
              });
          }
          $scope.CitysItemFull=[];
          $scope.CitysItem=[];
          $scope.City="";
          $scope.getCitys=()=>{
              $.get( "/assets/data/citys.json", function( data ) {
                 $scope.$apply(()=>{
                     $scope.CitysItemFull=data;
                     $scope.CitysItem=$scope.CitysItemFull.filter(x=>x.countryId==$scope.Country);
                 });
              });
          }
          $scope.getCountrys();
          $scope.getCitys();
          $scope.changeCountry=(id=null)=>{
              $scope.CitysItem=$scope.CitysItemFull.filter(x=>x.countryId==$scope.Country);
              if(id)
              {
                  $scope.City=id;
              }
              else{
                  $scope.City=$scope.CitysItem[0].id;
              }
          }
    
          var l = Ladda.create(document.querySelector('.ladda-button'));
          var m = Ladda.create(document.querySelector('#loginGoogel'));
          $scope.loader=true;
          $scope.ErrorMessagss=" ";
    
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
        document.getElementById('loginGoogel').addEventListener('click', ()=>{
            $scope.$apply(()=>{
                $scope.clickButton=true;
            });
            if(!$scope.termsAndConditions && !$scope.iCertifyThat)
            {
                return ;
            }
            m.start();
            l.start();
            firebaseApp1.auth().signInWithPopup(provider).then(res=>{
                HTTPs.POST(CONFIG.serverUrl+"/CLG",{an:res.credential.accessToken}).then(res=>{
                     res=JSON.parse(res);
                     if(res.message=="Auth successful"){
                        regestry(res);
                     }
                     else if(res.message=="Auth Exsist")
                     {
                        regestry(res);
                     }
                });
              }).catch(e=>{
                    m.remove(); 
                    l.remove();
              });
        });
        let regestry=(res)=>{
            if(res.tempPass)
            {
                $cookies.put("PS",JSON.stringify({token:res.token}));
                location.reload();
            }
            else{
                CONFIG.Did=res.user.dentalCenterId;
                $cookies.put('PUTR', JSON.stringify({token:res.token,Did:res.user.dentalCenterId,name:res.user.nameDoctor,image:res.user.logo,phone:res.user.phoneNumber,email:res.user.email})); //PUA Parisaline User Doctor
                $scope.$apply(()=>{
                    $scope.ErrorMessagss="Authentication completed successfully, you will be redirected to the control panel";
                    setTimeout(() => {
                        $('#email').css('border','1px dashed green'); 
                        $('#password').css('border','1px dashed green'); 
                        location.reload();
                        m.remove(); 
                        l.remove();
                    }, 1000);
                });
                $('#ErrorMessagePublic').css('background','#0baf2921');
            }
        }
    
    
    }],
    Router:{
        Url:"/Auth/Signup",
        Templete:'Views/Auth/Signup.html',
        Render:[
            {link:'assets/libs/ladda/ladda-themeless.min.css',type:"CSS"},
            {link:'assets/libs/tellPhone/intlTelInput.min.css',type:"CSS"},
            {link:'assets/libs/tellPhone/intlTelInput.min.js',type:"JS"},
            {link:'assets/libs/jquery-mask-plugin/jquery.mask.min.js',type:"JS"},
            {link:'assets/libs/autonumeric/autoNumeric-min.js',type:"JS"},
            {link:'assets/libs/ladda/spin.js',type:"JS"},
            {link:'assets/libs/ladda/ladda.js',type:"JS"},
            {link:'assets/libs/parsleyjs/parsley.min.js',type:"JS"},
        ],
        AUTH:false
    }
}