
var CONT_Cases = function ($scope, $location, $routeParams) {
    Reloader.Start('#cases');
    $scope.Status = -1;
    $scope.Submited = false;
    $scope.$emit('AuthChanged', true);
    $scope.idPatient = -1;

    $scope.CaseRefinementAndRetainer = ($event) => {
        if ($event) {
            $scope.TAB['selectPakge'] = { display: false, set: false, active: false };
        }
        else {
            $scope.TAB['selectPakge'] = { display: true, set: false, active: false };
        }
    }

    $scope.DeleteCases = false;
    if ($routeParams.id != "_") {
        let testId = $CRID.END($routeParams.id);
        if (testId) {
            $scope.idPatient = testId
        }
        else {
            $location.path('/NotFondPage');
            return;
        }
    }

    $scope.refinementNumber;
    if ($scope.idPatient != -1) {
        HTTPs.POST(CONFIG.serverUrl + "/P/GetStatus", { id: $scope.idPatient }).then(res => {
            res = JSON.parse(res);
            console.log(res);
            if (res.message == 2000) {
                if (res.data.length > 0) {
                    $scope.$apply(() => {
                        $scope.Status = res.data[0].caseStatus;
                        if ((res.data[0].caseStatus == 0 || !res.data[0].caseStatus) && $location.search().D == "T") {
                            $scope.DeleteCases = true;
                            $scope.TAB['selectPakge'] = { display: true, set: false, active: false };
                            return;
                        }
                        if (res.data[0].caseStatus >= 4) {
                            $scope.TAB.tretmentPlan.display = true;
                            if (res.data[0].caseStatus == 6) {
                                $scope.TAB.afterTretment.display = true;
                            }
                        }
                        if (res.data[0].refinementNumber && res.data[0].refinementNumber != 0) {
                            $scope.refinementNumber = res.data[0].refinementNumber;
                            if (res.data[0].caseStatus >= 1) {
                                $scope.TAB['selectPakge'] = { display: true, set: false, active: false };
                            }
                        }
                        else {
                            if ((res.data[0].caseStatus == 0 || res.data[0].caseStatus == null) && res.data[0].idPricestrategy == null) {
                                $scope.TAB['selectPakge'] = { display: true, set: false, active: false };
                            }
                            if (res.data[0].caseStatus >= 0) {
                                $scope.TAB['selectPakge'] = { display: true, set: false, active: false };
                            }
                        }
                    })
                }
                else {
                    $location.path('/NotFondPage');
                }

            }
        });
    }

    $scope.TAB = {
        patientInformation: { display: true, set: true, active: true },
        patientRecords: { display: true, set: false, active: false },
        createOrder: { display: true, set: false, active: false },
        submitCase: { display: true, set: false, active: false },
        AdditionalInstructions: { display: true, set: false, active: false },
        tretmentPlan: { display: true, set: false, active: false },
        afterTretment: { display: false, set: false, active: false }
    };

    if ($routeParams.id == "_") {
        $scope.TAB['selectPakge'] = { display: true, set: false, active: false };
    }

    //vairable Static
    var ImageELement = {};
    $scope.hideNavbar = false;
    $scope.hideNav = () => {
        $scope.hideNavbar = true;
    }
    $scope.nextTab = (id, submited = false, nav = false) => {
        if (nav & ($scope.Status == -1 || $scope.Status == null)) {
            return;
        }
        Object.keys($scope.TAB).forEach(key => {
            if (id == 'submitCase' && $scope.Status >= 1) {
                id = 'AdditionalInstructions';
            }
            if (key == id) {
                $scope.TAB[key].set = true;
                $scope.TAB[key].active = true;
                if (submited) {
                    $scope.Submited = true;
                    $scope.hideNavbar = false;
                    $scope.Status = 1;
                }
            }
            else {
                $scope.TAB[key].set = false;
                $scope.TAB[key].active = false;
            }

        })

    }
    if (!$location.search().TB && !$location.search().D != "T") {
        $location.search().TB = "patientInformation";
    }

    $scope.nextTab($location.search().TB);
    Reloader.Stop('#cases');


    //Shippings information
    $scope.CitysItemFull = [];
    $scope.CitysItem = [];
    $scope.City = "";
    $scope.Country = "73";
    $scope.getCountrys = () => {
        HTTPs.POST(CONFIG.serverUrl + "/CC/GCU", {})
            .then(res => {
                res = JSON.parse(res);
                if (res.error == 0) {
                    $scope.$apply(() => {
                        $scope.CountryItem = res.data;
                        $scope.changeCountry();
                    });
                }
            });
    }
    $scope.getCitys = () => {
        HTTPs.POST(CONFIG.serverUrl + "/CC/GCI", {})
            .then(res => {
                let data = JSON.parse(res);
                if (data.error == 0) {
                    $scope.$apply(() => {
                        $scope.CitysItemFull = data.data;
                        $scope.CitysItem = $scope.CitysItemFull.filter(x => x.countryId == $scope.Country);
                        $scope.getCountrys();
                    });
                }
            });
    }
    $scope.getCitys();
    $scope.changeCountry = (id = null) => {
        $scope.CitysItem = $scope.CitysItemFull.filter(x => x.countryId == $scope.Country);
        if (id) {
            $scope.City = id;
            setTimeout(() => {
                $('#cityId').val($scope.City);
            }, 200);
        }
        else {
            if ($scope.CitysItem.length !== 0) {
                $scope.City = $scope.CitysItem[0].id;
                setTimeout(() => {
                    $('#cityId').val($scope.City);
                }, 200);
            }
        }
    }

    $scope.TitleFormSh = "";
    $scope.showModelShippingCreate = () => {
        $scope.idAdressSh = -1;
        $scope.TitleFormSh = 'Add a New Address';
        $('#modelShippingForm input').val('');
        $('#modelShippingForm input').removeClass('sucssInput');
        $('#modelShippingForm select').removeClass('sucssInput');
        $('#modelShippingForm').modal('show');
    }
    $scope.LoaderFormSh = false;
    $scope.idAdress = -1;
    $scope.ShippingCreateUpdate = () => {
        var valueForm = Validate(document.getElementById('modelShippingForm'));
        if (!valueForm) {
            return false;
        }
        valueForm['id'] = $scope.idAdress;
        $scope.LoaderForm = true;
        HTTPs.POST(CONFIG.serverUrl + "/SHCAU", valueForm).then(res => {
            res = JSON.parse(res);
            if (res.message == 2000) {
                $('#modelShippingForm').modal('hide');
                $scope.$apply(() => {
                    $scope.$emit('updateShippings', null);
                    $scope.LoaderForm = false;
                });
            }
            else if (res.message == 2001) {
                $('#modelShippingForm').modal('hide');
                $scope.$apply(() => {
                    $scope.$emit('updateShippings', null);
                    $scope.LoaderForm = false;
                });
            }
            else if (res.error == 1) {
                alert("You cannot modify the shipping address because it was used in another case");
                $('#modelShipping').modal('hide');
            }
        });
    }

    $scope.formStop = false;
    $scope.showModelShippingEdit = (id) => {
        $('#modelShippingForm input').removeClass('sucssInput');
        $('#modelShippingForm select').removeClass('sucssInput');
        $scope.idAdress = id;
        $scope.formStop = true;
        $scope.TitleForm = 'Edit Address';
        HTTPs.POST(CONFIG.serverUrl + "/GISH", { id: id }).then(res => {
            res = JSON.parse(res);
            if (res.error == 0) {
                $scope.$apply(() => {
                    $scope.idAdress = res.data[0].id;
                    $('#address1').val(res.data[0].address1);
                    $('#address2').val(res.data[0].address2);
                    $scope.Country = res.data[0].countryId.toString();
                    $scope.changeCountry(res.data[0].cityId.toString());
                    $('#fullName').val(res.data[0].fullName);
                    $('#phone').val(res.data[0].phone);
                    $('#postalCode').val(res.data[0].postalCode);
                    $('#modelShippingForm').modal('show');
                });
            }
        })
    }

}


