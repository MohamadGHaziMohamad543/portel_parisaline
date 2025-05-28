var CONT_tretmentPlan=function($scope,$location,$sce) {
    this.$onInit = function() {
        $scope.datatest=this.filters;
        $scope.buttonNext=this.buttonNext;
        $scope.Submit=false;
        $scope.idPatient=this.idPatient;
        $scope.nextTab=()=>{
            $scope.buttonNext();
        };
        $scope.Submited=()=>{
            HTTPs.POST(CONFIG.serverUrl+"/CS",{id:this.idPatient}).then(res=>{
                res=JSON.parse(res);
                if(res.message==2001)
                {
                    $scope.$apply(()=>{
                        $scope.Submit=true;
                        this.btnHideNav();
                    });
                }
            });
        }

        $scope.downloadSart=0;
        $scope.download=(url, filename)=> {
          $scope.downloadSart=1;
          fetch(url)
            .then(response => response.blob())
            .then(blob => {
              const link = document.createElement("a");
              link.href = URL.createObjectURL(blob);
              link.download = filename;
              link.click();
              $scope.$apply(()=>{
                  $scope.downloadSart=0;
              });
          })
          .catch(console.error);
        }
        $scope.TremtentLevel=[];
        $scope.getAll=()=>{
            HTTPs.POST(CONFIG.serverUrl+"/GTP",{patientId:this.idPatient}).then(res=>{
                res=JSON.parse(res);
               
                if(res.error==0)
                {
                   $scope.$apply(()=>{
                    $scope.Tabs=[];
                    for(var i=0;i<res.data.length;i++)
                    {
                        $scope.Tabs.push({id:res.data[i].id,link:URLStatICBAS+"/CV/"+$CRID.TO(res.data[i].id.toString()),nLevel:res.data[i].nLevel,salary:res.data[i].salary,set:(i==res.data.length-1?true:false),select:'Setup'
                            ,Setup:res.data[i].pdfLink.Setup.length==0?null:$sce.trustAsResourceUrl(CONFIG.serverImageUrl+res.data[i].pdfLink.Setup[0].path),
                            Simulation:res.data[i].pdfLink.Simulation.length==0?null:$sce.trustAsResourceUrl(CONFIG.serverImageUrl+res.data[i].pdfLink.Simulation[0].path),
                            Right:res.data[i].pdfLink.Right.length==0?null:$sce.trustAsResourceUrl(CONFIG.serverImageUrl+res.data[i].pdfLink.Right[0].path),
                            Left:res.data[i].pdfLink.Left.length==0?null:$sce.trustAsResourceUrl(CONFIG.serverImageUrl+res.data[i].pdfLink.Left[0].path),
                            Frontal:res.data[i].pdfLink.Frontal.length==0?null:$sce.trustAsResourceUrl(CONFIG.serverImageUrl+res.data[i].pdfLink.Frontal[0].path),
                            ModelOPN:res.data[i].pdfLink.ModelOPN.length==0?null:$sce.trustAsResourceUrl(CONFIG.serverImageUrl+res.data[i].pdfLink.ModelOPN[0].path),
                            treatmentPlanOPN:res.data[i].pdfLink.treatmentPlanOPN.length==0?null:$sce.trustAsResourceUrl(CONFIG.serverImageUrl+res.data[i].pdfLink.treatmentPlanOPN[0].path),
                            SetupBisec:res.data[i].pdfLink.Setup.length==0?null:res.data[i].pdfLink.Setup[0].path,
                            SimulationBisec:res.data[i].pdfLink.Simulation.length==0?null:res.data[i].pdfLink.Simulation[0].path,
                            RightBisec:res.data[i].pdfLink.Right.length==0?null:res.data[i].pdfLink.Right[0].path,
                            LeftBisec:res.data[i].pdfLink.Left.length==0?null:res.data[i].pdfLink.Left[0].path,
                            FrontalBisec:res.data[i].pdfLink.Frontal.length==0?null:res.data[i].pdfLink.Frontal[0].path,
                            ModelOPNBisec:res.data[i].pdfLink.ModelOPN.length==0?null:res.data[i].pdfLink.ModelOPN[0].path,
                            treatmentPlanOPNBisec:res.data[i].pdfLink.treatmentPlanOPN.length==0?null:res.data[i].pdfLink.treatmentPlanOPN[0].path,
                        });
                    }
                   });
                }
            });
        }
        $scope.getAll();

        $scope.Tabs=[]
        $scope.TabsLevel=[]

        $scope.setTabs=(id)=>{
            $scope.Tabs.forEach(res => {
                if(res.id==id)
                {
                    res.set=true;
                }
                else{
                    res.set=false;
                }
            });
        }
        $scope.approval=()=>{
            HTTPs.POST(CONFIG.serverUrl+"/CAP",{patientId:this.idPatient}).then(res=>{
                res=JSON.parse(res);
                if(res.error==0)
                {
                    $scope.$apply(()=>{
                        $location.path('/');
                    });
                }
            });
        }
        $scope.setSelect=(select,nLevel)=>{
            $scope.Tabs.find(x=>x.nLevel==nLevel).select=select;
        }
        $scope.CopyLink=()=>{
            var copyText = document.getElementById("linkShereyStringsUrl");
            copyText.select();
            document.execCommand("copy");
            Tost.info("Link copied","",3000);
        }

        $scope.taskStatus=0;

        HTTPs.POST(CONFIG.serverUrl+"/TAS/CTS",{id:this.idPatient}).then(res=>{
            res=JSON.parse(res);
            if(res.error==0)
            {
                $scope.$apply(()=>{
                    if(res.data.Count==0)
                    {
                        $scope.taskStatus=0;
                    }
                    else{
                        $scope.taskStatus=1;
                    }
                });
            }
        })
        $scope.AddLevel=()=>{
            
            HTTPs.POST(CONFIG.serverUrl+"/TPCL",{patientId:this.idPatient}).then(res=>{
                res=JSON.parse(res);
                if(res.message==2000)
                {
                    $scope.$apply(()=>{
                        $scope.getAll();
                    });
                }
            });
        }
        $scope.removeFile=(link,nLevel,index)=>{
            var linkSrc=link.toString().split(CONFIG.serverImageUrl);
            if(linkSrc.length==2)
            {
                linkSrc=linkSrc[1];
            }
            HTTPs.POST(CONFIG.serverUrl+"/DRP",{src:linkSrc}).then(res=>{
                if(res)
                {
                    $scope.$apply(()=>{
                        $scope.Tabs.find(x=>x.nLevel==nLevel)[index]=null;
                        $scope.Tabs.find(x=>x.nLevel==nLevel)[index+"Bisec"]=null;
                    }) 
                }
            });
        }
        $scope.eventDonUpload=(PATH,nLevel,index)=>{
            $scope.Tabs.find(x=>x.nLevel==nLevel)[index]=$sce.trustAsResourceUrl(CONFIG.serverImageUrl+PATH);
            $scope.Tabs.find(x=>x.nLevel==nLevel)[index+"Bisec"]=PATH;
           // $scope.getAll();
        }
    }
}

adminApp.controller('tretmentPlan', ['$scope','$location','$sce',CONT_tretmentPlan]);

adminApp.component('tretmentPlan', {
    bindings: { 
        filters: '@',
        buttonNext: '&',
        idPatient: '<',
        status: '<',
    },
    templateUrl: 'Views/Cases/Components/tretmentPlan.html',
    controller: 'tretmentPlan'
});


