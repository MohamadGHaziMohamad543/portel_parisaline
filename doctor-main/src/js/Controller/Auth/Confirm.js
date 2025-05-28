
var CONT_Auth_Confirm=function($scope,$cookies){
    $scope.$emit('AuthChanged', false);

    //country and City
    $scope.CountryId="73";
    $scope.TitleForm="";
    $scope.CountryItem=[];
    $scope.CitysItemFull=[];
    $scope.CitysItem=[];
    $scope.City="";
    $scope.Country="";
    // initialise plugin
    var countryCode="FR";
    $scope.getCountrys = () => {
        HTTPs.POST(CONFIG.serverUrl + "/CC/GCU", {})
            .then(res => {
                res = JSON.parse(res);
                if (res.error == 0) {
                    $scope.$apply(() => {
                        $scope.CountryItem = res.data;
                        $scope.Country = res.data.find(x => x.code === countryCode.toLowerCase()).id.toString();
                        $('#countryId').val($scope.Country);
                        $scope.changeCountry(null, countryCode.toLowerCase());
                    });
                }
            });
    }
    $scope.getCitys = () => {
        HTTPs.POST(CONFIG.serverUrl + "/CC/GCI", {})
            .then(res => {
                let data = JSON.parse(res);
                $scope.getCountrys();
                if (data.error == 0) {
                    $scope.$apply(() => {
                        $('.ladda-button').css({display:'block'});
                        $scope.CitysItemFull = data.data;
                    });
                }
            });
    }
    $scope.changeCountry = (id = null, code = null) => {
        let country = $('#countryId').val();
        if (code && $scope.CountryItem.length !== 0) {
            country = $scope.CountryItem.find(x => x.code == code).id;
            $('#countryId').val(country);
        }
        $scope.CitysItem = $scope.CitysItemFull.filter(x => x.countryId == country);
        if (id) {
            $scope.City = id;
        }
        else {
            if ($scope.CitysItem.length !== 0) {
                $scope.City = $scope.CitysItem[0].id;
                setTimeout(() => {
                    $('#cityId').val($scope.City);
                }, 200);
            }
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
                HTTPs.Token=$scope.PUD.token;
                HTTPs.POST(CONFIG.serverUrl+"/DCA",valueForm).then(res=>{
                    res=JSON.parse(res);
                    console.log(res);
                    if(res.message=="confirm Sucess")
                    {
                        $scope.$apply(()=>{
                            $scope.confirmStatus=0;
                            $cookies.put('PUD', JSON.stringify({token:$scope.PUD.token,Did:res.user.dentalCenterId,name:res.user.nameDoctor,image:res.user.logo,phone:res.user.phoneNumber,email:res.user.email}));
                            l.stop();
                        });
                    }
                });

            }
            if($cookies.get("PUD"))
            {
                $scope.PUD=JSON.parse($cookies.get("PUD"));
            }

            var input = document.querySelector("#phone");
            var errorMap = ["Invalid number", "Invalid country code", "Too short", "Too long", "Invalid number"];

            var iti = window.intlTelInput(input, {
                initialCountry: "auto",
                geoIpLookup: function(callback) { 

                $.get('https://ipinfo.io/json?token=185e80a0d228c6', function() {}, "json").always(function(resp) {
                    countryCode = (resp && resp.country) ? resp.country : "us";
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
                $cookies.remove("PUD");
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
                    if (!$scope.CountryItem || $scope.CountryItem.length == 0) {
                        $scope.getCitys();
                    }
                    else{
                        $scope.changeCountry(null, iti.getSelectedCountryData().iso2);
                    }
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
}
