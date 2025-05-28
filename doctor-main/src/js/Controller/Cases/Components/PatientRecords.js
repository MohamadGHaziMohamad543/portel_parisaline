var CONT_PatientRecords = function ($scope, $location) {
    $scope.idPatient = -1;
    let popup;
    let checkPopupClosed;
    this.$onInit = function () {
        $scope.PR = [];
        $scope.doctorPartner = 0;
        $scope.getDoctorIdPartner = () => {
            //getDoctorIdPartner
            HTTPs.POST(CONFIG.serverUrl + "/P/getDoctorIdPartner", {}).then(res => {
                res = JSON.parse(res);
                $scope.$apply(() => {
                    $scope.doctorPartner = res.data[0].Partner;
                });
            });
        }

        $scope.getDoctorIdPartner();
        $scope.GetAll = () => {
            HTTPs.POST(CONFIG.serverUrl + "/GRP", { id: this.idPatient }).then(res => {
                res = JSON.parse(res);
                if (res.message == 2000) {
                    $scope.$apply(() => {
                        $scope.PR = res.data;
                    });
                }
            });
        }
        $scope.GetAll();
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
                if (file) {
                    popup = window.open(`https://cbctviewer.parisaline.com/?link=${file.path}`, 'popupWindow', `width=${width},height=${height},top=${top},left=${left},toolbar=no, menubar=no, location=no, addressbar=no,resizable=no,scrollbars=yes`);
                }
                else {
                    popup = window.open(`https://cbctviewer.parisaline.com/?patientId=${this.idPatient}&tk=${HTTPs.Token}`, 'popupWindow', `width=${width},height=${height},top=${top},left=${left},toolbar=no, menubar=no, location=no, addressbar=no,resizable=no,scrollbars=yes`);
                }
                if (!checkPopupClosed) {
                    checkPopupClosed = setInterval(() => {
                        if (popup.closed) {
                            clearInterval(checkPopupClosed);
                            $scope.$apply(() => {
                                $scope.GetAll();
                            });
                            checkPopupClosed = null;
                        }
                    }, 500);
                }
            }



        }

        $scope.RemoveCbct = (file) => {
            if(confirm("Are you sure to delete the file?")){
                HTTPs.POST(CONFIG.serverUrl + "/DRP", { src: file.path }).then(res => {
                    $scope.GetAll();
                });
            }

        }
        $scope.files = [
            { name: "", src: "assets/images/imagePatient/2.png", status: 0, prosessNumber: 0 }
        ];
    }
}
