var CONT_SubmitCase=function($scope,$location) {
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
    }
}


adminApp.controller('SubmitCase', ['$scope','$location',CONT_SubmitCase]);

adminApp.component('submitCase', {
    bindings: { 
        filters: '@',
        buttonNext: '&',
        btnHideNav: '&',
        idPatient: '<',
    },
    templateUrl: 'Views/Cases/Components/SubmitCase.html',
    controller: 'SubmitCase'
});
