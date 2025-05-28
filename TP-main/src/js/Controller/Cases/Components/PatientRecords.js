var CONT_PatientRecords = function ($scope, $location) {
    $scope.idPatient = -1;
    let popup;
    $scope.ServerUrl = CONFIG.serverUrl;
    this.$onInit = function () {
        $scope.PR = [];
        HTTPs.POST(CONFIG.serverUrl + "/GRP", { id: this.idPatient }).then(res => {
            res = JSON.parse(res);
            if (res.message == 2000) {
                $scope.$apply(() => {
                    $scope.PR = res.data;
                });
            }
        });
        $scope.idPatient = this.idPatient;
        $scope.nextTab = () => {
            this.buttonNext();
        };
        $scope.backTab = () => {
            this.buttonBack();
        };

        $scope.ShowModalCbctUpload = (file = null) => {
            if (popup && !popup.closed) {
                popup.focus();
            } else {
                const width = 1430;
                const height = 820;
                const left = (screen.width / 2) - (width / 2);
                const top = (screen.height / 2) - (height / 2);
                popup = window.open(`https://cbctviewer.parisaline.com/?link=${file.path}`, 'popupWindow', `width=${width},height=${height},top=${top},left=${left},toolbar=no, menubar=no, location=no, addressbar=no,resizable=no,scrollbars=yes`);
            }
        }

        $scope.files = [
            { name: "", src: "assets/images/imagePatient/2.png", status: 0, prosessNumber: 0 }
        ];
    }
}


adminApp.controller('PatientRecords', ['$scope', '$location', CONT_PatientRecords]);
adminApp.component('patientRecords', {
    bindings: {
        idPatient: '<',
        buttonNext: '&',
        buttonBack: '&'
    },
    templateUrl: 'Views/Cases/Components/PatientRecords.html',
    controller: 'PatientRecords'
});
