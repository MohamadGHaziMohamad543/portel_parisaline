var CONT_PatientRecords=function($scope,$location) {
    $scope.idPatient=-1;
    this.$onInit = function() {
        $scope.PR=[];
        HTTPs.POST(CONFIG.serverUrl+"/GRP",{id:this.idPatient}).then(res=>{
            res=JSON.parse(res);
            if(res.message==2000)
            {
                $scope.$apply(()=>{
                    $scope.PR=res.data;
                });
            }
        });
        $scope.idPatient=this.idPatient;
        $scope.nextTab=()=>{
            this.buttonNext();
        };
        $scope.backTab=()=>{
            this.buttonBack();
        };
        $scope.files=[
            {name:"",src:"assets/images/imagePatient/2.png",status:0,prosessNumber:0}
        ];
    }
}


adminApp.controller('PatientRecords', ['$scope','$location',CONT_PatientRecords]);
adminApp.component('patientRecords', {
    bindings: { 
        idPatient: '<',
        buttonNext: '&',
        buttonBack: '&'
    },
    templateUrl: 'Views/Cases/Components/PatientRecords.html',
    controller: 'PatientRecords'
});
