$ANContreoller.Accounts={
    FUN:['$scope','$location','$routeParams',function($scope,$location,$routeParams) {
        $scope.Status=0;
        $scope.$emit('AuthChanged', true);
        $scope.idPatient=-1;
        $scope.Country="214";
        $scope.TitleForm="";
        $scope.formEdit=0;
        $scope.CountryItem=[];
        $scope.CitysItemFull=[];
        $scope.CitysItem=[];
        $scope.City="3555";
        $scope.getCountrys=()=>{
            HTTPs.POST(CONFIG.serverUrl+"/CC/GCU",{})
            .then(res=>{
                res=JSON.parse(res);
                if(res.error==0)
                {
                    $scope.$apply(()=>{
                        $scope.CountryItem=res.data;
                    });
                }
            });
        }
        $scope.getCitys=()=>{
            HTTPs.POST(CONFIG.serverUrl+"/CC/GCI",{})
            .then(res=>{
                let data=JSON.parse(res);
                if(data.error==0)
                {
                    $scope.$apply(()=>{
                        $scope.CitysItemFull=data.data;
                        $scope.CitysItem=$scope.CitysItemFull.filter(x=>x.countryId==$scope.Country);
                    });
                }
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
        $scope.Edit=()=>{
            $scope.formEdit=1;
            EnableForm();
        }
        $scope.openFIle=()=>{
            $('#fileImageUser').click();
        }
        var FileUpload=null;
        document.getElementById('fileImageUser').addEventListener("change",(file)=>{
            var input = file.target;
    
            var reader = new FileReader();
            reader.onload = function(){
                $('#imageUser').attr("src",reader.result);
            };
            FileUpload=input.files[0];
            reader.readAsDataURL(input.files[0]);
        });
        $scope.DataAccount={};
        var displedForm=()=>{
            $("#phone").attr("disabled","disabled");
            $("#email").attr("disabled","disabled");
            $("#countryId").attr("disabled","disabled");
            $("#cityId").attr("disabled","disabled");
            $("#fullName").attr("disabled","disabled");
            $("#fileImageUser").attr("disabled","disabled");
        }
        var EnableForm=()=>{
            $("#phone").removeAttr("disabled");
            $("#email").removeAttr("disabled");
            $("#countryId").removeAttr("disabled");
            $("#cityId").removeAttr("disabled");
            $("#fullName").removeAttr("disabled");
            $("#fileImageUser").removeAttr("disabled");
        }
        $scope.getAll=()=>{
            HTTPs.POST(CONFIG.serverUrl+"/GPA",{}).then(res=>{
                res=JSON.parse(res);
                if(res.error==0)
                {
                    $scope.$apply(()=>{
                        $scope.DataAccount=res.data;
                        iti.setNumber(res.data.phoneNumber);
                        displedForm();
                    });
                }
            });
        }
        $scope.LoaderForm=false;
        $scope.Save=()=>{
            var valueForm=Validate(document.getElementById('modelProfileForm'));
            if(!valueForm)
            {
                return false;
            }
            if(!iti.isValidNumber())
            {
                $('#phone').addClass("errorInput");
                $('#phone').removeClass("sucssInput");
                $('.ErrorMessagePhone').text($('.ErrorMessagePhone').attr("titleError"));
                return;
            }
            else{
                $('#phone').removeClass("errorInput");
                $('#phone').addClass("sucssInput");
            }
            valueForm['phoneNumber']=iti.getNumber();
            $scope.LoaderForm=true;
            console.log(valueForm);
            var dataF=new FormData();
            dataF.append("fileData",FileUpload);
            Reloader.Start('#formInformationPatient');
            HTTPs.POST(CONFIG.serverUrl+"/UPA",dataF,valueForm).then(res=>{
                res=JSON.parse(res);
                if(res.data)
                {
                    $scope.$apply(()=>{
                        $scope.LoaderForm=false;
                        $scope.getAll();
                        $scope.formEdit=0;
                        displedForm();
                    });
                }
            });
        }
    
    
    
    
        //renderInput Message box 
        
    
        var input = document.querySelector("#phone");
        var errorMap = ["Invalid number", "Invalid country code", "Too short", "Too long", "Invalid number"];
    
        // initialise plugin
        var iti = window.intlTelInput(input, {
            initialCountry: "auto",
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
            placHolder(e,true);
            });
            var placHolder=(e,maskEvev=null)=>{
            let plac= e.target.getAttribute("placeholder");
            let stringTemp="";
            let mask="";
            if(plac)
            {
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
    
            $scope.getAll();
    }],
    Router:{
        Url:'/Settings/Accounts/',
        Templete:'Views/settings/Accounts.html',
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