var CONT_SelectPakge = function ($scope, $location, $routeParams, $rootScope) {
    this.$onInit = function () {
        $scope.idPatient = this.idPatient;
        $scope.buttonNext = this.buttonNext;
        $scope.nextTab = () => {
            if ($scope.selectPakage != undefined) {
                this.buttonNext();
            }
            else {
                $('#selectPakageItem').css({
                    "border": "1px solid #ff0404"
                });
                $('#errorPakaage').css({
                    "display": "block"
                });
            }
        };
        $scope.backTab = () => {
            this.buttonBack();
        };

        $scope.refinementnumber = this.refinementnumber;
        $scope.selectPakage;
        $scope.setPakage = (id) => {
            if (this.status == null || this.status == 0 || this.status == 1 || this.status == 2 || this.status == 3 || this.status == 4.5 || this.status == 4 || this.status == 12 || this.status == 14) {
                HTTPs.POST(CONFIG.serverUrl + "/PA/SP", { idPatient: this.idPatient, idPakage: id }).then(res => {
                    res = JSON.parse(res);
                    if (res.error == 0) {
                        $scope.$apply(() => {
                            $scope.getPakage();
                        });
                    }
                });
            }
        }
        $scope.SelectPakageMode = true;
        $scope.SelectPakageInfo;
        $scope.getPakage = () => {
            HTTPs.POST(CONFIG.serverUrl + "/PA/GP", { idPatient: this.idPatient }).then(res => {
                res = JSON.parse(res);
                if (res.error == 0) {
                    $scope.$apply(() => {
                        if (res.data) {
                            if ((this.status == null || this.status == 0 || this.status == 1 || this.status == 2 || this.status == 3 || this.status == 4.5 || this.status == 4 || this.status == 12 || this.status == 14) && !$scope.refinementnumber) {
                                $scope.selectPakage = res.data.idPricestrategy;
                            }
                            else {
                                $scope.SelectPakageMode = false;
                                $scope.SelectPakageInfo = res.data;
                            }
                        }
                        else {
                            $scope.selectPakag = -2;
                            $('#selectPakageItem').css({
                                "border": "none"
                            });

                            $('#errorPakaage').css({
                                "display": "none"
                            });
                        }
                    });
                }
            });

        }
        $scope.Pakages = [];
        $scope.GetAllPakge = () => {
            HTTPs.POST(CONFIG.serverUrl + "/PA/GA", { id: this.idPatient }).then(res => {
                res = JSON.parse(res);
                if (res.error == 0) {
                    $scope.$apply(() => {
                        $scope.Pakages = res.data;
                    });
                }
            });
        }
        $scope.getPakage();
        $scope.GetAllPakge();


        $scope.submitionText = {};
        $scope.loadSubmitionText = () => {
            HTTPs.POST(CONFIG.serverUrl + '/submtion/getAll', {}).then(res => {
                res = JSON.parse(res);
                $scope.$apply(() => {
                    for (let i = 0; i < res.length; i++) {
                        $scope.submitionText[res[i].nameKey] = res[i];
                    }
                });
            });
        }
        $scope.loadSubmitionText();

        $scope.contentSubmtion = '';
        $scope.openMoedelSubmtion = (Content) => {
            $('#minContent').html(Content);
            $('#modelContentSubmtion').modal('show');
        }
    }
}
