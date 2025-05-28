var CONT_printStl=function($scope,$location,$sce,$rootScope,$cookies) {
    this.$onInit = function() {
        $scope.datatest=this.filters;
        $scope.buttonNext=this.buttonNext;
        $scope.Submit=false;
        $scope.idPatient=this.idPatient;
        $scope.UpperArray=[];
        $scope.LowerArray=[];
        $scope.UpperArraypts = [];
        $scope.LowerArraypts = [];
        $scope.JustprintFile=this.justPrintFile
        $scope.LinkServer=CONFIG.serverImageUrl;
        $scope.typeNumberAliner='';
        $scope.NumberAliner=0;
        $scope.showModelBarcode=this.showModelBarcode;
        $scope.boxes=[];
        $scope.getFile=()=>{
            HTTPs.POST(CONFIG.serverUrl+"/GFP",{id:this.idPatient}).then(res=>{
                res=JSON.parse(res);
                if(res.message==2000)
                {
                    $scope.$apply(()=>{
                        let UpperAligners=(res.numberStl[0].UpperAligners >= 0 && res.numberStl[0].UpperAligners != null)?res.numberStl[0].UpperAligners+1:61;
                        let LowerAligners=(res.numberStl[0].LowerAligners >= 0 && res.numberStl[0].LowerAligners != null)?res.numberStl[0].LowerAligners+1:61;
                        if(UpperAligners != LowerAligners)
                        {
                            if(UpperAligners>LowerAligners)
                            {
                                $scope.typeNumberAliner='U';
                            }
                            else{
                                $scope.typeNumberAliner='L';
                            }
                            $scope.NumberAliner=res.numberStl[0].numberAligner;
                        }
                        for(var i=0;i<UpperAligners;i++)
                        {
                            $scope.UpperArray.push({id:i,name:"upper",Path:""});
                        }
                        for(var i=0;i<LowerAligners;i++)
                        {
                             $scope.LowerArray.push({id:i,name:"lower",Path:""});
                        }

                        for (var i = 0; i < UpperAligners; i++) {
                            $scope.UpperArraypts.push({ id: i, name: "upper", Path: "" });
                        }

                        for (var i = 0; i < LowerAligners; i++) {
                            $scope.LowerArraypts.push({ id: i, name: "lower", Path: "" });
                        }
                        for(var i=0;i<res.data.length;i++)
                        {
                            if($scope.UpperArray.find(x=>x.name+x.id+".stl"==res.data[i].name))
                            {
                                $scope.UpperArray.find(x=>x.name+x.id+".stl"==res.data[i].name).Path=res.data[i].path;
                            }
                            else if($scope.LowerArray.find(x=>x.name+x.id+".stl"==res.data[i].name))
                            {
                                $scope.LowerArray.find(x=>x.name+x.id+".stl"==res.data[i].name).Path=res.data[i].path;
                            }
                            if ($scope.UpperArraypts.find(x => x.name + x.id + ".pts" == res.data[i].name)) {
                                $scope.UpperArraypts.find(x => x.name + x.id + ".pts" == res.data[i].name).Path = res.data[i].path;
                            }
                            else if ($scope.LowerArraypts.find(x => x.name + x.id + ".pts" == res.data[i].name)) {
                                $scope.LowerArraypts.find(x => x.name + x.id + ".pts" == res.data[i].name).Path = res.data[i].path;
                            }
                        }
                        $scope.getAllBarcode();
                    });
                }
            })
        }
        $scope.getAllBarcode=()=>{
            HTTPs.POST(CONFIG.serverUrl+"/BR/GAB",{patientId:this.idPatient}).then(res=>{
                res=JSON.parse(res);
                $scope.$apply(()=>{
                    if(($scope.UpperArray.length > $scope.LowerArray.length) || ($scope.UpperArray.length === $scope.LowerArray.length))
                    {
                        for (let index = 0; index < $scope.UpperArray.length; index++) {
                            for (let v = 0; v < res.data.length; v++) {
                                if(($scope.UpperArray[index].id)==res.data[v].alignerName.split('Device')[1])
                                {
                                    $scope.UpperArray[index].barcode=true;
                                }
                            }
                            
                        }
                    }
                    else if($scope.UpperArray.length < $scope.LowerArray.length){
                        for (let index = 0; index < $scope.LowerArray.length; index++) {
                            for (let v = 0; v < res.data.length; v++) {
                                if(($scope.LowerArray[index].id)==res.data[v].alignerName.split('Device')[1])
                                {
                                    $scope.LowerArray[index].barcode=true;
                                }
                            }
                            
                        }
                    }
                 });
            })
        }
        $scope.addBoxOrData=(id)=>{
            var dataBox=$scope.checkBoxData(id);
            if(dataBox)
            {
                let num=0;
                for (let i = 0; i < $scope.boxes.length; i++) {
                   if($scope.boxes[i].FULL==false && $scope.boxes[i].batch==null)
                   {
                        let value=JSON.parse(JSON.stringify($scope.boxes[i].value));
                        let FULLBox=false;
                        value.push(id);
                        if(value.length ==20)
                        {
                            FULLBox=true;
                        }
                        HTTPs.POST(CONFIG.serverUrl+"/BR/ABB",{id:$scope.boxes[i].id,value:value,FULL:FULLBox,batch:null,idPatient:this.idPatient}).then(res=>{
                            res=JSON.parse(res);
                            if(res.error==0)
                            {
                                $scope.$apply(()=>{
                                    $scope.boxes[i].value.push(id);
                                    if($scope.boxes[i].value.length ==20)
                                    {
                                        $scope.boxes[i].FULL=true;
                                    }
                                    $scope.showRemoveButtonBox();
                                });
                            }
                        });
                        num++;
                        break;
                   }
                }
                if(num==0)
                {
                   
                    HTTPs.POST(CONFIG.serverUrl+"/BR/ABB",{id:-1,value:[id],FULL:false,batch:null,idPatient:this.idPatient}).then(res=>{
                        res=JSON.parse(res);
                        if(res.error==0)
                        {
                            $scope.$apply(()=>{
                                $scope.boxes.push({id:res.data,value:[id],FULL:false,batch:null,idPatient:this.idPatient});
                                $scope.showRemoveButtonBox();
                            });
                        }
                    });
                }
                
            }
            else
            {

            }
            
        }

        $scope.getAllBox=()=>{
            HTTPs.POST(CONFIG.serverUrl+"/BR/GABB",{idPatient:this.idPatient}).then(res=>{
                res=JSON.parse(res);
                if(res.error==0)
                {
                    $scope.$apply(()=>{
                        for (let b = 0; b < res.data.length; b++) {
                            res.data[b].value=JSON.parse(res.data[b].value);
                        }
                        $scope.boxes=res.data;
                        $scope.showRemoveButtonBox();
                    });
                }
            });
            
        }
        $scope.getAllBox();
        $scope.boxRemove=[];
        $scope.showBarcode=true;
        var isAuthenticated=$cookies.get('PULAB')?JSON.parse($cookies.get('PULAB')):false;
        if(isAuthenticated.email=="demouaelab@yopmail.com")
        {
            $scope.showBarcode=false;
        }
        $scope.showRemoveButtonBox=()=>{
            $scope.boxRemove=[];
            for (let i = 0; i < $scope.boxes.length; i++) {
                for (let v = 0; v < $scope.boxes[i].value.length; v++) {
                    $scope.boxRemove[$scope.boxes[i].value[v]]=true;
                }
            }
        }
        $scope.checkBoxData=(id)=>{
            for (let i = 0; i < $scope.boxes.length; i++) {
                for (let v = 0; v < $scope.boxes[i].value.length; v++) {
                   if($scope.boxes[i].value[v]==id)
                   {
                        return $scope.boxes[i];
                   }
                }
            }
            return true;
        }
        $scope.removeDviceOfBox=(id)=>{
            for (let i = 0; i < $scope.boxes.length; i++) {
                for (let v = 0; v < $scope.boxes[i].value.length; v++) {
                   if($scope.boxes[i].value[v]==id)
                   {
                        if($scope.boxes[i].batch==null)
                        {
                            let value=JSON.parse(JSON.stringify($scope.boxes[i].value));
                            let FULLBox=false;
                            value.splice(v, 1);
                            if(value.length !=20)
                            {
                                FULLBox=false;
                            }
                            HTTPs.POST(CONFIG.serverUrl+"/BR/ABB",{id:$scope.boxes[i].id,value:value,FULL:FULLBox,batch:null,idPatient:this.idPatient}).then(res=>{
                                res=JSON.parse(res);
                                if(res.error==0)
                                {
                                    $scope.$apply(()=>{
                                        $scope.boxes[i].value.splice(v, 1);
                                        if($scope.boxes[i].value.length !=20)
                                        {
                                            $scope.boxes[i].FULL=false;
                                        }
                                        $scope.showRemoveButtonBox();
                                    });
                                }
                            });
                        }
                        else{
                            alert("you cant Delete the device");
                        }
                   }
                }
            }
        }
        $scope.getFile();
        $scope.getAllBarcode();
        $scope.nextTab=()=>{
            $scope.buttonNext();
        };
        $scope.eventDonUpload=(Path,name)=>{
            if($scope.UpperArray.find(x=>x.name+x.id==name))
            {
                $scope.UpperArray.find(x=>x.name+x.id==name).Path=CONFIG.serverImageUrl+Path;
            }
            else if($scope.LowerArray.find(x=>x.name+x.id==name))
            {
                $scope.LowerArray.find(x=>x.name+x.id==name).Path=CONFIG.serverImageUrl+Path;
            }
        }

        $scope.DeleteStl=(path,name)=>{
            HTTPs.POST(CONFIG.serverUrl+"/DRP",{src:path.split(CONFIG.serverImageUrl)[1]}).then(res=>{
               if(res)
               {
                   $scope.$apply(()=>{
                    if($scope.UpperArray.find(x=>x.name+x.id==name))
                    {
                        $scope.UpperArray.find(x=>x.name+x.id==name).Path="";
                    }
                    else if($scope.LowerArray.find(x=>x.name+x.id==name))
                    {
                        $scope.LowerArray.find(x=>x.name+x.id==name).Path="";
                    }
                   })
               }
            });
        }
        $scope.showStl=(src)=>{
            $scope.$emit('showModelStl', src);
        }

        $scope.getNumberFiles=()=>{
            
        }

        $scope.showModelBarcode=(id,numberAliner,numberOfAliner,statusBarcode,numberOfAlinerLower,numberOfAlinerUpper,Upper=false,duble=false,alinerType,key=null)=>{
            this.showModelBarcode({data:{id:id,numberAliner:numberAliner,numberOfAliner:numberOfAliner,statusBarcode:statusBarcode,Upper:Upper,duble:duble,numberOfAlinerLower:numberOfAlinerLower,numberOfAlinerUpper:numberOfAlinerUpper,numberAlignerPlus:$scope.NumberAliner,alinerType:alinerType,key:key}});
        }
        $rootScope.$on("changeSocketBarckode",(event,data)=>{
            $scope.getAllBarcode();
        });
        $rootScope.$on("changeSocketBarckodeBox",(event,data)=>{
            $scope.getAllBox();
        });

    }
}

adminApp.controller('printStl', ['$scope','$location','$sce','$rootScope','$cookies',CONT_printStl]);

adminApp.component('printStl', {
    bindings: { 
        filters: '@',
        buttonNext: '&',
        idPatient: '<',
        status: '<',
        justPrintFile: '<',
        showModelBarcode:'&'
    },
    templateUrl: 'Views/Cases/Components/printStl.html',
    controller: 'printStl'
});


