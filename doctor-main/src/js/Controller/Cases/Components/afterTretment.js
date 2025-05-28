var CONT_afterTretment=function($scope,$location,$sce,$rootScope) {
    this.$onInit = function() {
        $scope.Folder=[];
        $scope.Devices=[];
        $scope.idPatient=this.idPatient;

        $scope.GetAllFolder=()=>{
            HTTPs.POST(CONFIG.serverUrl+"/CA/GAFA",{id:this.idPatient}).then(res=>{
                res=JSON.parse(res);
                if(res.message==2000){
                    $scope.$apply(()=>{
                        $scope.Folder=[];
                        res.data=res.data.sort((a, b) => a - b);
                        for (let i = 0; i < res.data.length; i++) {
                            if(i===0){
                                $scope.Folder.push({id:res.data[i],set:true,PR:[]});
                            }
                            else{
                                $scope.Folder.push({id:res.data[i],set:false,PR:[]});
                            }
                            
                        }
                        $scope.getAllDevices();
                    });
                }
            });
        }

        $scope.GetAllFolder();
        $scope.getAllDevices=()=>{
            HTTPs.POST(CONFIG.serverUrl+"/CA/GNA",{id:this.idPatient}).then(res=>{
                res=JSON.parse(res);
                $scope.$apply(()=>{
                    $scope.Devices=[];
                    if(res.data[0].x){
                        for (let i = 0; i < res.data[0].x; i++) {
                            if($scope.Folder.find(x=>x.id==(i+1))){
    
                            }
                            else{
                                $scope.Devices.push({id:(i+1),text:'Device'+(i+1)});
                            }
                           
                        }
                    }
                });
            });
        }

        $scope.setTab=(id)=>{
            for (let i = 0; i < $scope.Folder.length; i++) {
                if($scope.Folder[i].id==id){
                    $scope.Folder[i].set=true;
                }
                else{
                    $scope.Folder[i].set=false;
                }
            }
        }

        $scope.renderTab=(numberDevice)=>{
            HTTPs.POST(CONFIG.serverUrl+"/CA/GAIFD",{id:this.idPatient,numberDevice:numberDevice}).then(res=>{
                res=JSON.parse(res);
                if(res.message==2000)
                {
                    $scope.$apply(()=>{
                        if($scope.Folder.find(x=>x.id==numberDevice)){
                            $scope.Folder.find(x=>x.id==numberDevice).PR=res.data;
                        }
                    });
                }
            });
        }

        $scope.modelOpen=false;
        $scope.AddDevice=()=>{
            $scope.modelOpen=true;
        }


        $scope.CloseModel=()=>{
            $scope.modelOpen=false;
        }

        $scope.formStop=false;
        $scope.CreateDevice=()=>{//numberDevice
            $scope.formStop=true;
            HTTPs.POST(CONFIG.serverUrl+"/CA/CD",{id:this.idPatient,numberDevice:document.getElementById('deviceNumber').value}).then(res=>{
                res=JSON.parse(res);
                if(res.message==2000){
                    $scope.$apply(()=>{
                        $scope.GetAllFolder();
                        $scope.formStop=false;
                        $scope.modelOpen=false;
                    });
                }
            });
        }
        $scope.idPatient=this.idPatient;
    }
}