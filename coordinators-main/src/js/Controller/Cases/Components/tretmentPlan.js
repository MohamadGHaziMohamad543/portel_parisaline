var CONT_tretmentPlan=function($scope,$location,$sce) {
    this.$onInit = function() {
        $scope.datatest=this.filters;
        $scope.buttonNext=this.buttonNext;
        $scope.Submit=false;
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

        $scope.TremtentLevel=[];
        $scope.getAll=()=>{
            HTTPs.POST(CONFIG.serverUrl+"/GTP",{patientId:this.idPatient}).then(res=>{
                res=JSON.parse(res);
                if(res.error==0)
                {
                   $scope.$apply(()=>{
                       console.log(res);
                    for(var i=0;i<res.data.length;i++)
                    {
                        $scope.Tabs.push({id:res.data[i].id,link:URLStatICBAS+"/CV/"+$CRID.TO(res.data[i].id.toString()),nLevel:res.data[i].nLevel,salary:res.data[i].salary,set:(i==res.data.length-1?true:false),select:'Setup'
                            ,Setup:res.data[i].pdfLink.Setup.length==0?null:$sce.trustAsResourceUrl(CONFIG.serverImageUrl+res.data[i].pdfLink.Setup[0].path),
                            Simulation:res.data[i].pdfLink.Simulation.length==0?null:$sce.trustAsResourceUrl(CONFIG.serverImageUrl+res.data[i].pdfLink.Simulation[0].path),
                            Right:res.data[i].pdfLink.Right.length==0?null:$sce.trustAsResourceUrl(CONFIG.serverImageUrl+res.data[i].pdfLink.Right[0].path),
                            Left:res.data[i].pdfLink.Left.length==0?null:$sce.trustAsResourceUrl(CONFIG.serverImageUrl+res.data[i].pdfLink.Left[0].path),
                            Frontal:res.data[i].pdfLink.Frontal.length==0?null:$sce.trustAsResourceUrl(CONFIG.serverImageUrl+res.data[i].pdfLink.Frontal[0].path),
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


