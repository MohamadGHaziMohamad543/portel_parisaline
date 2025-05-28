var CONT_Shipping = function ($scope, $location, $routeParams) {
    $scope.Status = 0;
    $scope.$emit('AuthChanged', true);
    $scope.idPatient = -1;
    $scope.Country = "73";
    $scope.TitleForm = "";
    $scope.CountryItem = [];

    $scope.CitysItemFull = [];
    $scope.CitysItem = [];
    $scope.City = "";
    $scope.changeCountry = (id = null) => {
        $scope.CitysItem = $scope.CitysItemFull.filter(x => x.countryId == $scope.Country);
        if (id) {
            $scope.City = id;
            setTimeout(() => {
                $('#cityId').val($scope.City);
            }, 200);
        }
        else {
            $scope.City = $scope.CitysItem[0].id;
            setTimeout(() => {
                $('#cityId').val($scope.City);
            }, 200);
        }
    }
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


    $scope.showModelShippingCreate = () => {
        $scope.formStop = false;
        $scope.idAdress = -1;
        $scope.TitleForm = 'Add a New Address';
        $('#modelShipping input').val('');
        $('#modelShipping input').removeClass('sucssInput');
        $('#modelShipping select').removeClass('sucssInput');
        $('#modelShipping').modal('show');
    }
    $scope.formStop = false;
    $scope.showModelShippingEdit = (id) => {
        $('#modelShipping input').removeClass('sucssInput');
        $('#modelShipping select').removeClass('sucssInput');
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
                    $('#modelShipping').modal('show');
                });
            }
        })
    }
    $scope.DataAdress = [];
    $scope.getAll = () => {
        HTTPs.POST(CONFIG.serverUrl + "/GASH", {}).then(res => {
            res = JSON.parse(res);
            if (res.error == 0) {
                $scope.$apply(() => {
                    $scope.DataAdress = res.data;
                });
            }
        });
    }
    $scope.LoaderForm = false;
    $scope.idAdress = -1;
    $scope.getAll();
    $scope.CreateUpdate = () => {
        var valueForm = Validate(document.getElementById('modelShipping'));
        if (!valueForm) {
            return false;
        }
        valueForm['id'] = $scope.idAdress;
        $scope.LoaderForm = true;
        HTTPs.POST(CONFIG.serverUrl + "/SHCAU", valueForm).then(res => {
            res = JSON.parse(res);
            if (res.message == 2000) {
                $('#modelShipping').modal('hide');
                $scope.getAll();
            }
            else if (res.message == 2001) {
                $('#modelShipping').modal('hide');
                $scope.getAll();
            }
            else if (res.error == 1) {
                alert("You cannot modify the shipping address because it was used in another case");
                $('#modelShipping').modal('hide');
            }
            $scope.LoaderForm = false;
        });
    }

    $scope.RemoveShippingById = (id) => {
        HTTPs.POST(CONFIG.serverUrl + "/RSBI", { id: id }).then(res => {
            res = JSON.parse(res);
            if (res.error == 0) {
                $scope.getAll();
            }
            else {
                alert("You cannot delete the shipping address because it was used in another case");
            }
        });
    }

    $scope.Edit = () => {
        $scope.formStop = false;
    }



    //renderInput Message box 
}
