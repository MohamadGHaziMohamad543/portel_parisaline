
$ANContreoller.Auth_Confirm={
    FUN:['$scope','$location','$cookies',function($scope,$cookies){
        $scope.$emit('AuthChanged', false);
    
        //country and City
        $scope.CountryId="219";
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
                    $scope.CitysItem=$scope.CitysItemFull.filter(x=>x.countryId==$scope.CountryId);
                });
            });
        }
        $scope.getCountrys();
        $scope.getCitys();
        $scope.changeCountry=(id=null)=>{
            $scope.CitysItem=$scope.CitysItemFull.filter(x=>x.countryId==$scope.CountryId);
            if(id)
            {
                $scope.City=id;
            }
            else{
                $scope.City=$scope.CitysItem[0].id;
            }
        }
        
        $scope.confirmStatus="1";
        $scope.init=()=>{
                 var l = Ladda.create(document.querySelector('.ladda-button'));
                $scope.loader=true;
    
                document.getElementById('countryId').addEventListener("change",(re)=>{
                    $scope.$apply(()=>{
                        $scope.CountryId=re.target.value.toString();
                        $scope.changeCountry();
                    });
                });
                $scope.ErrorMessagss=" ";
                $scope.fullName="";
                $scope.ConfirmAccount=()=>{
                    var valueForm=Validate(document.getElementById('formLogin'));
                    if(!valueForm)
                    {
                        return false;
                    }
                    if(!iti.isValidNumber())
                    {
                        $('.ErrorMessagePhone').html($('.ErrorMessagePhone').attr('titleError'));
                        $('#phone').addClass("errorInput");
                        $('#phone').removeClass("sucssInput");
                        return;
                    }
                    else{
                        $('#phone').removeClass("errorInput");
                        $('#phone').addClass("sucssInput");
                        $('.ErrorMessagePhone').html("");
                        valueForm['phoneNumber']=iti.getNumber();
                    }
                    l.start();
                    HTTPs.Token=$scope.PUTR.token;
                    HTTPs.POST(CONFIG.serverUrl+"/DCA",valueForm).then(res=>{
                        res=JSON.parse(res);
                        console.log(res);
                        if(res.message=="confirm Sucess")
                        {
                            $scope.$apply(()=>{
                                $scope.confirmStatus=0;
                                $cookies.put('PUTR', JSON.stringify({token:$scope.PUTR.token,Did:res.user.dentalCenterId,name:res.user.nameDoctor,image:res.user.logo,phone:res.user.phoneNumber,email:res.user.email}));
                                l.stop();
                            });
                        }
                    });
    
                }
                if($cookies.get("PUCL"))
                {
                    $scope.PUD=JSON.parse($cookies.get("PUCL"));
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
    
                $scope.logout=()=>{
                    $cookies.remove("PUCL");
                    location.reload();
                }
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
                        $scope.CountryId=idCountry.id;
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
     
        }
    }],
    Router:{
        Url:"/Auth/Confirm",
        Templete:'Views/Auth/Confirm.html',
        Render:[
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
        ],
        AUTH:true
    }
}