var CONT_Auth_Signup = function ($scope, $cookies) {
    $scope.$emit('AuthChanged', false);
    var l = Ladda.create(document.querySelector('.ladda-button'));
    $scope.loader = true;
    $scope.clickButton = false;
    $scope.termsAndConditions = false;
    $scope.iCertifyThat = false;
    $scope.clickButton = false;
    $scope.ErrorMessagss = ' ';
    $scope.CreateAccount = () => {
        $scope.clickButton = true;
        var valueForm = Validate(document.getElementById('formLogin'));
        if (!valueForm) {
            return false;
        }
        if (valueForm['password'] != valueForm['ConfirmPassword']) {
            $('#ConfirmPassword').addClass("errorInput");
            $('#ConfirmPassword').removeClass("sucssInput");
            var pp = document.querySelector('#ConfirmPassword').parentNode.querySelector("a");
            pp.innerHTML = pp.getAttribute("titleError");
            return;
        }
        else {
            $('#ConfirmPassword').addClass("sucssInput");
            $('#ConfirmPassword').removeClass("errorInput");
            var pp = document.querySelector('#ConfirmPassword').parentNode.querySelector("a");
            pp.innerHTML = "";
        }
        if (!iti.isValidNumber()) {
            $('.ErrorMessagePhone').html($('.ErrorMessagePhone').attr('titleError'));
            return;
        }
        else {
            $('.ErrorMessagePhone').html("");
            valueForm['phoneNumber'] = iti.getNumber();
        }
        if (!$scope.termsAndConditions || !$scope.iCertifyThat) {
            return;
        }
        l.start();
        HTTPs.POST(CONFIG.serverUrl + "/DC", valueForm).then(res => {
            res = JSON.parse(res);
            if (res.error == 1001) {
                $scope.$apply(() => {
                    $scope.ErrorMessagss = `
                    <p>The email you entered already exists </p>
                    <p>Please try to login with your existing account</p>
                    `;
                });
            }
            else {
                if (res.message == "Auth successful") {
                    Login(res);
                }
            }

            l.stop();
        });

    }

    let Login = (res) => {
        CONFIG.Did = res.user.dentalCenterId;
        $cookies.put('PUD', JSON.stringify({ token: res.token, Did: res.user.dentalCenterId, name: res.user.nameDoctor, image: res.user.logo, phone: res.user.phoneNumber })); //PUD Parisaline User Doctor
        $scope.$apply(() => {
            $scope.ErrorMessagss = "Authentication completed successfully, you will be redirected to the control panel";
            setTimeout(() => {
                $('#email').css('border', '1px dashed green');
                $('#password').css('border', '1px dashed green');
                location.reload();
                m.remove();
                l.remove();
            }, 1000);
        });
        $('#ErrorMessagePublic').css('background', '#0baf2921');
    }

    var input = document.querySelector("#phone");
    var errorMap = ["Invalid number", "Invalid country code", "Too short", "Too long", "Invalid number"];
    var countryCode = "";
    $scope.showButton = false;
    // initialise plugin
    var iti = window.intlTelInput(input, {
        initialCountry: "auto",
        geoIpLookup: function (callback) {
            $.get('https://ipinfo.io/json?token=185e80a0d228c6', function () { }, "json").always(function (resp) {
                countryCode = (resp && resp.country) ? resp.country : "us";
                callback(countryCode);
            });
        },
        nationalMode: true,
        formatOnDisplay: true,
        separateDialCode: true,
        autoFormat: true,
        utilsScript: "/assets/libs/tellPhone/utils.js?1638200991544"
    });


    var reset = function () {
        input.classList.add('errorInput');
    };

    // on blur: validate
    input.addEventListener('blur', function (e) {
        reset();
        if (input.value.trim()) {
            if (iti.isValidNumber()) {
                input.classList.add("sucssInput");
                input.classList.remove("errorInput");
            } else {
                input.classList.remove("sucssInput");
                input.classList.add("errorInput");
            }
        }
    });

    // on keyup / change flag: reset
    input.addEventListener('change', reset);
    input.addEventListener('keyup', reset);
    input.addEventListener("keydown", (e) => {
        placHolder(e);
    });
    $('.iti__selected-flag').click(res => {
        $(input).mask("000000000000000000000");
    });
    input.addEventListener("countrychange", function (e) {
        e.target.value = "";
        $scope.$apply(() => {
            if (!$scope.CountryItem || $scope.CountryItem.length == 0) {
                $scope.getCitys();
            }
            $scope.changeCountry(null, iti.getSelectedCountryData().iso2);
        });
        placHolder(e, true);
    });
    var placHolder = (e, maskEvev = null) => {
        let plac = e.target.getAttribute("placeholder");
        let stringTemp = "";
        let mask = "";
        for (var i = 0; i < plac.length; i++) {
            if (plac[i] != '-' && plac[i] != "(" && plac[i] != ")" && plac[i] != " ") {
                stringTemp += "x";
                mask += "0";
            }
            else {
                stringTemp += plac[i];
                mask += plac[i];
            }
        }
        e.target.setAttribute('placeholder', stringTemp);
        if (maskEvev) {
            $(input).mask(mask);
        }
    }


    //country and City
    $scope.Country = "73";
    $scope.TitleForm = "";
    $scope.CountryItem = [];
    $scope.CitysItemFull = [];
    $scope.CitysItem = [];
    $scope.City = "";
    $scope.getCountrys = () => {
        HTTPs.POST(CONFIG.serverUrl + "/CC/GCU", {})
            .then(res => {
                res = JSON.parse(res);
                if (res.error == 0) {
                    $scope.$apply(() => {
                        $scope.CountryItem = res.data;
                        $scope.Country = res.data.find(x => x.code === countryCode.toLowerCase()).id.toString();
                        $scope.changeCountry();
                    });
                }
            });
    }
    $scope.getCitys = () => {
        HTTPs.POST(CONFIG.serverUrl + "/CC/GCI", {})
            .then(res => {
                let data = JSON.parse(res);
                $scope.getCountrys();
                if (data.error == 0) {
                    $scope.$apply(() => {
                        $('.ladda-button').css({ display: 'block' });
                        $scope.CitysItemFull = data.data;
                    });
                }
            });
    }
    $scope.changeCountry = (id = null, code = null) => {
        let country = $scope.Country;
        if (code && $scope.CountryItem.length !== 0) {
            country = $scope.CountryItem.find(x => x.code == code).id;
            $('#countryId').val(country);
        }
        $scope.CitysItem = $scope.CitysItemFull.filter(x => x.countryId == country);
        if (id) {
            $scope.City = id;
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

    var l = Ladda.create(document.querySelector('.ladda-button'));
    var m = Ladda.create(document.querySelector('#loginGoogel'));
    $scope.loader = true;
    $scope.ErrorMessagss = " ";

    if (!firebaseApp1) {
        provider = new firebase.auth.GoogleAuthProvider();
        const firebaseConfig = {
            apiKey: "AIzaSyAByCjD3hZ62O5KtA4wWtnWyU7lllbDk94",
            authDomain: "parisaline-4733c.firebaseapp.com",
            databaseURL: "https://parisaline-4733c-default-rtdb.firebaseio.com",
            projectId: "parisaline-4733c",
            storageBucket: "parisaline-4733c.appspot.com",
            messagingSenderId: "860262996325",
            appId: "1:860262996325:web:6b0ccdca03e9c83899698c",
            measurementId: "G-9HT5C6F0PE"
        };
        firebaseApp1 = firebase.initializeApp(firebaseConfig);
    }
    document.getElementById('loginGoogel').addEventListener('click', () => {
        $scope.$apply(() => {
            $scope.clickButton = true;
        });
        if (!$scope.termsAndConditions && !$scope.iCertifyThat) {
            return;
        }
        m.start();
        l.start();
        firebaseApp1.auth().signInWithPopup(provider).then(res => {
            console.log(res);
            HTTPs.POST(CONFIG.serverUrl + "/CLG", { an: res.credential.accessToken }).then(res => {
                res = JSON.parse(res);
                if (res.message == "Auth successful") {
                    regestry(res);
                }
                else if (res.message == "Auth Exsist") {
                    regestry(res);
                }
            });
        }).catch(e => {
            m.remove();
            l.remove();
            console.log(e);
        });
    });
    let regestry = (res) => {
        if (res.tempPass) {
            $cookies.put("PS", JSON.stringify({ token: res.token }));
            location.reload();
        }
        else {
            CONFIG.Did = res.user.dentalCenterId;
            $cookies.put('PUD', JSON.stringify({ token: res.token, Did: res.user.dentalCenterId, name: res.user.nameDoctor, image: res.user.logo, phone: res.user.phoneNumber, email: res.user.email })); //PUD Parisaline User Doctor
            $scope.$apply(() => {
                $scope.ErrorMessagss = "Authentication completed successfully, you will be redirected to the control panel";
                setTimeout(() => {
                    $('#email').css('border', '1px dashed green');
                    $('#password').css('border', '1px dashed green');
                    location.reload();
                    m.remove();
                    l.remove();
                }, 1000);
            });
            $('#ErrorMessagePublic').css('background', '#0baf2921');
        }
    }
    $scope.TermsAndConditions = '';
    $scope.TitleForm = 'Terms and Conditions';
    $scope.ShowModalTRM = () => {
        $('#ModalTRMS').modal('show');
    }

    $scope.GetTermsAndConditions = () => {
        HTTPs.POST(CONFIG.serverUrl + '/S/getTermsAndConditions', {}).then(res => {
            res = JSON.parse(res);
            if (res.error == 0) {
                $scope.TermsAndConditions = res.data[0].Content;
            }
        });
    }

    $scope.GetTermsAndConditions();


}
