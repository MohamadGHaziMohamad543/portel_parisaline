var CONT_SubmitCase=function($scope,$location,$rootScope) {
    this.$onInit = function() {
        $scope.datatest=this.filters;
        $scope.buttonNext=this.buttonNext;
        $scope.Submit=false;
        $scope.Tasks=[];
        $scope.TasksTemp=[];
        $scope.serverImage=CONFIG.serverImageUrl;
        $scope.Loader=false;
        $scope.titleForm="Add Task";
        $scope.numberIndex=-1;
        
    }
}


adminApp.controller('SubmitCase', ['$scope','$location','$rootScope',CONT_SubmitCase]);

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
