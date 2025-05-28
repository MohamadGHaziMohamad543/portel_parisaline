
var CONT_caseView=function($scope,$location,$routeParams,$sce) {
    Reloader.Start('#cases');
    $scope.idPatient=-1;
    if($routeParams.id !="_")
    {
        let testId=$CRID.END($routeParams.id);
        if(testId)
        {
            $scope.idPatient=testId;
        }
        else{
            $location.path('/NotFondPage');
            return;
        }
    }
    $scope.TremtentLevel=[];
    if($scope.idPatient!=-1)
    {
        HTTPs.POST(CONFIG.serverUrl+"/GTPLI",{patientId:$scope.idPatient}).then(res=>{
            res=JSON.parse(res);
            console.log(res);
            if(res.error==0)
            {
               $scope.$apply(()=>{
                        $scope.Tabs.push({id:res.data[0].id,nLevel:res.data[0].nLevel,salary:res.data[0].salary,select:'Setup'
                        ,Setup:res.data[0].pdfLink.Setup.length==0?null:$sce.trustAsResourceUrl(CONFIG.serverImageUrl+res.data[0].pdfLink.Setup[0].path),
                        Simulation:res.data[0].pdfLink.Simulation.length==0?null:$sce.trustAsResourceUrl(CONFIG.serverImageUrl+res.data[0].pdfLink.Simulation[0].path),
                        Right:res.data[0].pdfLink.Right.length==0?null:$sce.trustAsResourceUrl(CONFIG.serverImageUrl+res.data[0].pdfLink.Right[0].path),
                        Left:res.data[0].pdfLink.Left.length==0?null:$sce.trustAsResourceUrl(CONFIG.serverImageUrl+res.data[0].pdfLink.Left[0].path),
                        Frontal:res.data[0].pdfLink.Frontal.length==0?null:$sce.trustAsResourceUrl(CONFIG.serverImageUrl+res.data[0].pdfLink.Frontal[0].path),
                        });        
               });
            }
        });
    }
    else{
        $location.path('/NotFondPage');
    }

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
    $scope.setSelect=(select,nLevel)=>{
        $scope.Tabs.find(x=>x.nLevel==nLevel).select=select;
    }
    
}



