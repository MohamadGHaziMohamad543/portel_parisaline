
$ANContreoller.Cases={
    FUN:['$scope','$location','$routeParams','$cookies',function($scope,$location,$routeParams,$cookies) {
        Reloader.Start('#cases');
        $scope.Status=-1;
        $scope.Submited=false;
        $scope.$emit('AuthChanged', true);
        $scope.idPatient=-1;
        $scope.DeleteCases=false;
        if($routeParams.id !="_")
        {
            let testId=$CRID.END($routeParams.id);
            if(testId)
            {
                $scope.idPatient=testId
            }
            else{
                $location.path('/NotFondPage');
                return;
            }
        }


        if($scope.idPatient!=-1)
        {
            HTTPs.POST(CONFIG.serverUrl+"/P/GetStatus",{id:$scope.idPatient}).then(res=>{
                res=JSON.parse(res);
                if(res.message==2000)
                {
                    if(res.data.length > 0)
                    {
                        $scope.$apply(()=>{
                            $scope.Status=res.data[0].caseStatus;
                            if((res.data[0].caseStatus==0 || !res.data[0].caseStatus ) && $location.search().D=="T")
                            {
                                $scope.DeleteCases=true;
                                return;
                            }
                            if(res.data[0].caseStatus >=4)
                            {
                                $scope.TAB.tretmentPlan.display=true;
                            }
                        })
                    }
                    else{
                        $location.path('/NotFondPage');
                    }
                
                }
            });
        }
    
        HTTPs.POST(CONFIG.serverUrl+"/CCV",{patientId:$scope.idPatient}).then(res=>{
            if(res.error==0)
            {
                
            }
        });
        $scope.TAB={
            AdditionalInstructions:{display:false,set:false,active:false},
        };

        $scope.roolAdditionalInstructions=true;
        var isAuthenticated=$cookies.get('PUTERCL')?JSON.parse($cookies.get('PUTERCL')):false;

    

        $scope.getPermtaion=()=>{
            HTTPs.POST(CONFIG.serverUrl+"/PA/GP",{}).then(res=>{
                res=JSON.parse(res);
                console.log(res);
                if(res.error==0)
                {
                    $scope.$apply(()=>{
                        $scope.TAB['createOrder']={display:(res.data[0].CreateOrder===1?true:false),set:false,active:false};
                        $scope.TAB['patientInformation']={display:(res.data[0].PatientInformation===1?true:false),set:false,active:false};
                        $scope.TAB['tretmentPlan']={display:(res.data[0].TretmentPlan===1?true:false),set:false,active:false};
                        $scope.TAB['submitCase']={display:(res.data[0].TasksForCase===1?true:false),set:false,active:false};
                        $scope.TAB['patientRecords']={display:(res.data[0].PatientRecords===1?true:false),set:false,active:false},
                        $scope.TAB['selectPakge']={display:(res.data[0].SelectPackage===1?true:false),set:false,active:false};
                        $scope.TAB['AdditionalInstructions']={display:(res.data[0].AdditionalInstructions===1?true:false),set:false,active:false};
                        $scope.roolAdditionalInstructions=(res.data[0].AdditionalInstructions===1?true:false);
                        console.log($scope.TAB);
                    });

                }
            });
        }
    
        $scope.getPermtaion();
        //vairable Static
        var ImageELement={};
        $scope.hideNavbar=false;
        $scope.hideNav=()=>{
            $scope.hideNavbar=true;
        }
        $scope.nextTab=(id,submited=false,nav=false)=>{
            if(nav & ($scope.Status==-1 || $scope.Status==null))
            {
                return;
            }
            Object.keys($scope.TAB).forEach(key=>{
                if(key == id)
                {
                    $scope.TAB[key].set=true;
                    $scope.TAB[key].active=true;
                    if(submited)
                    {
                        $scope.Submited=true;
                        $scope.hideNavbar=false;
                        $scope.Status=1;
                    }
                }
                else{
                    $scope.TAB[key].set=false;
                    $scope.TAB[key].active=false;
                }
                
            })
    
        }
        if(!$location.search().TB && !$location.search().D!="T")
        {
            $location.search().TB="patientInformation";
        }
        
         $scope.nextTab($location.search().TB);
         Reloader.Stop('#cases');
    
    
        //Shippings information
        $scope.Country="214";
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
        $scope.City="3555";
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
        $scope.TitleFormSh="";
        $scope.showModelShippingCreate=()=>{
          $scope.idAdressSh=-1;
          $scope.TitleFormSh='Add a New Address';
          $('#modelShippingForm input').val('');
          $('#modelShippingForm input').removeClass('sucssInput');
          $('#modelShippingForm select').removeClass('sucssInput');
          $('#modelShippingForm').modal('show');
         }
         $scope.LoaderFormSh=false;
         $scope.idAdress=-1;
    
         $scope.ShippingCreateUpdate=()=>{
          var valueForm=Validate(document.getElementById('modelShippingForm'));
          if(!valueForm)
          {
              return false;
          }
          valueForm['id']= $scope.idAdress;
          $scope.LoaderForm=true;
          HTTPs.POST(CONFIG.serverUrl+"/SHCAU",valueForm).then(res=>{
              res=JSON.parse(res);
              if(res.message==2000)
              {
                  $('#modelShippingForm').modal('hide');
                  $scope.$apply(()=>{
                    $scope.$emit('updateShippings',null);
                  });
              }
              $scope.LoaderForm=false;
          });
      }
      
       
    }],
    Router:{
        Url:"/Cases/:id",
        Templete:'Views/Cases/Cases.html',
        Render:[
            {link:'//vjs.zencdn.net/7.10.2/video-js.min.css',type:"CSS"},
            {link:'assets/libs/animate/animate.min.css',type:"CSS"},
            {link:'assets/libs/flatpickr/flatpickr.min.css',type:"CSS"},
            {link:'https://cdn.jsdelivr.net/npm/uikit@3.4.2/dist/css/uikit.min.css',type:"CSS"},
            {link:'https://cdn.jsdelivr.net/npm/uikit@3.4.2/dist/js/uikit.min.js',type:"JS"},
            {link:'https://cdn.jsdelivr.net/npm/uikit@3.4.2/dist/js/uikit-icons.min.js',type:"JS"},
            {link:'https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.1.1/crypto-js.min.js',type:"JS"},
            {link:'assets/libs/flatpickr/flatpickr.min.js',type:"JS"},
            {link:'assets/libs/tippy-js/tippy.all.min.js',type:"JS"},
            {link:'//vjs.zencdn.net/7.10.2/video.min.js',type:"JS"},
            {link:'assets/libs/jquery-ui/jquery-ui.min.js',type:"JS"},
            {link:'assets/libs/custombox/custombox.min.css',type:"CSS"},
            {link:'assets/libs/custombox/custombox.min.js',type:"JS"},
            {link:'assets/libs/ladda/spin.js',type:"JS"},
            {link:'assets/libs/ladda/ladda.js',type:"JS"},
        ],
        AUTH:true
    }
}