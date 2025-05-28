var CONT_attachments = function ($scope, $location, $sce, $rootScope, $cookies) {
    this.$onInit = function () {
        $scope.Files = [];
        $scope.idPatient = this.idPatient;
        $scope.GetAllFiles = async () => {
            let result = await HTTPs.POST(CONFIG.serverUrl + "/GetAllFiles", { patientId: this.idPatient });
            result = JSON.parse(result);
            if (result.error == 0) {
                $scope.$apply(() => {
                    $scope.Files = result.data;
                });
                console.log($scope.Files);
            }
        }

        $scope.eventDonUpload = (path, id) => {
            $scope.GetAllFiles();
        }
        $scope.eventafterremove = () => {
            $scope.GetAllFiles();
        }
        $scope.ServerUrl = CONFIG.serverImageUrl;
        $scope.GetAllFiles();
    }
}

adminApp.controller('attachments', ['$scope', '$location', '$sce', '$rootScope', '$cookies', CONT_attachments]);

adminApp.component('attachments', {
    bindings: {
        filters: '@',
        buttonNext: '&',
        idPatient: '<',
        status: '<',
        justPrintFile: '<',
        showModelBarcode: '&'
    },
    templateUrl: 'Views/Cases/Components/Attachments.html',
    controller: 'attachments'
});
