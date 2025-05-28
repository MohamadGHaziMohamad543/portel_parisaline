
$ANContreoller.Cases={
    FUN:['$scope','$location','$routeParams',function($scope,$location,$routeParams) {
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
    
        $scope.TAB={
            patientInformation:{display:true,set:true,active:true},
            patientRecords:{display:true,set:false,active:false},
            createOrder:{display:true,set:false,active:false},
            submitCase:{display:true,set:false,active:false},
            AdditionalInstructions:{display:true,set:false,active:false},
            tretmentPlan:{display:false,set:false,active:false},
        };
    
    
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
                if(id=='submitCase' && $scope.Status >= 1)
                {
                    id='AdditionalInstructions';
                }
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
            {link:'https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.1.1/crypto-js.min.js',type:"JS"},
            {link:'assets/libs/flatpickr/flatpickr.min.js',type:"JS"},
            {link:'assets/libs/tippy-js/tippy.all.min.js',type:"JS"},
            {link:'//vjs.zencdn.net/7.10.2/video.min.js',type:"JS"},
        // {link:'assets/libs/jsPdf/jspdf.umd.min.js',type:"JS"},
        ],
        AUTH:true
    }
}