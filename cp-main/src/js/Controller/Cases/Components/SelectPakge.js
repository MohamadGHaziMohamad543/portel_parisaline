$ANComponent.selectPakge={
    FUN:['$scope','$location','$routeParams','$rootScope',
    function($scope,$location,$routeParams,$rootScope) {
        this.$onInit = function() {
            $scope.idPatient=this.idPatient;
            $scope.buttonNext=this.buttonNext;
            $scope.nextTab=()=>{
                this.buttonNext();
            };
            $scope.backTab=()=>{
                this.buttonBack();
            };
            
            $scope.selectPakage;
            $scope.setPakage=(id)=>{
                HTTPs.POST(CONFIG.serverUrl+"/PA/SP",{idPatient:this.idPatient,idPakage:id}).then(res=>{
                    res=JSON.parse(res);
                    if(res.error==0)
                    {
                        $scope.$apply(()=>{
                            $scope.getPakage();
                        });
                    }
                });
            }
            $scope.getPakage=()=>{
                HTTPs.POST(CONFIG.serverUrl+"/PA/GP",{idPatient:this.idPatient}).then(res=>{
                    res=JSON.parse(res);
                    if(res.error==0)
                    {
                        $scope.$apply(()=>{
                            if(res.data)
                            {
                                $scope.selectPakage=res.data.idPricestrategy;
                            }
                            else{
                                $scope.selectPakag=-2;
                                $('#selectPakageItem').css({
                                    "border":"none"
                                });
                                $('#errorPakaage').css({
                                    "display":"none"
                                });
                            }
                        });
                    }
                });
                
            }
            $scope.Pakages=[];
            $scope.GetAllPakge=()=>{
                HTTPs.POST(CONFIG.serverUrl+"/PA/GA",{patientId:this.idPatient}).then(res=>{
                    res=JSON.parse(res);
                    if(res.error==0)
                    {
                        $scope.$apply(()=>{
                            $scope.Pakages=res.data;
                        });
                    }
                });
            }
            $scope.getPakage();
            $scope.GetAllPakge();
    
    
            $scope.submitionText={};
            $scope.loadSubmitionText=()=>{
                HTTPs.POST(CONFIG.serverUrl+'/submtion/getAll',{}).then(res=>{
                    res=JSON.parse(res);
                    $scope.$apply(()=>{
                        for (let i = 0; i < res.length; i++) {
                            $scope.submitionText[res[i].nameKey]=res[i];
                        }
                    });
                });
            }
            $scope.loadSubmitionText();
    
            $scope.contentSubmtion='';
            $scope.openMoedelSubmtion=(Content)=>{
                $('#minContent').html(Content);
                $('#modelContentSubmtion').modal('show');
            }
        }
    }],
    Templete:"Views/Cases/Components/SelectPakge.html?"+VERSTION,
    Paramter:{ 
        filters: '@',
        buttonNext: '&',
        idPatient: '<',
        deleteCases: '<',
    }
}