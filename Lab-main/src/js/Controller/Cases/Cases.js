
$ANContreoller.Cases = {
    FUN: ['$scope', '$location', '$routeParams', '$cookies', function ($scope, $location, $routeParams, $cookies) {
        Reloader.Start('#cases');
        $scope.Status = -1;
        $scope.Submited = false;
        $scope.$emit('AuthChanged', true);
        $scope.idPatient = -1;
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
        var isAuthenticated = $cookies.get('PULAB') ? JSON.parse($cookies.get('PULAB')) : false;
        var visibleClome = false;
        var shortNameDoctor = false;
        if (isAuthenticated.email == "info@parisaline.com" || isAuthenticated.email == "demosaudilab@yopmail.com") {
            visibleClome = true;
        }

        var GS1 = true;
        if (isAuthenticated.email == "mi@mais.com.sa") {
            shortNameDoctor = true;
            GS1 = false;
        }
        $scope.dataCases = null;
        if ($scope.idPatient != -1) {
            HTTPs.POST(CONFIG.serverUrl + "/P/GetStatus", { id: $scope.idPatient }).then(res => {
                res = JSON.parse(res);
                if (res.message == 2000) {
                    if (res.data.length > 0) {
                        $scope.$apply(() => {
                            $scope.dataCases = res.data[0];
                            console.log($scope.dataCases);
                            $scope.Status = res.data[0].caseStatus;
                            if ((res.data[0].caseStatus == 0 || !res.data[0].caseStatus) && $location.search().D == "T") {
                                $scope.DeleteCases = true;
                                return;
                            }
                            if (res.data[0].caseStatus >= 4) {
                                $scope.TAB.tretmentPlans.display = true;
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
            patientInformation: { display: false, set: false, active: false },
            patientRecords: { display: false, set: false, active: false },
            createOrder: { display: false, set: false, active: false },
            submitCase: { display: false, set: false, active: false },
            AdditionalInstructions: { display: false, set: false, active: false },
            tretmentPlans: { display: false, set: false, active: false },
            printStl: { display: false, set: false, active: false },
            attachments: { display: false, set: false, active: false },
        };


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
        $scope.Country = "214";
        $scope.CountryItem = [];
        $scope.getCountrys = () => {
            $.get("/assets/data/countrys.json", function (data) {
                $scope.$apply(() => {
                    $scope.CountryItem = data;

                });
            });
        }
        $scope.CitysItemFull = [];
        $scope.CitysItem = [];
        $scope.City = "3555";
        $scope.getCitys = () => {
            $.get("/assets/data/citys.json", function (data) {
                $scope.$apply(() => {
                    $scope.CitysItemFull = data;
                    $scope.CitysItem = $scope.CitysItemFull.filter(x => x.countryId == $scope.Country);
                });
            });
        }
        $scope.getCountrys();
        $scope.getCitys();
        $scope.changeCountry = (id = null) => {
            $scope.CitysItem = $scope.CitysItemFull.filter(x => x.countryId == $scope.Country);
            if (id) {
                $scope.City = id;
            }
            else {
                $scope.City = $scope.CitysItem[0].id;
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
                    });
                }
                $scope.LoaderForm = false;
            });
        }

        $scope.taskStatus = 0;
        $scope.taskAction = 0;

        $scope.taskData = {};
        $scope.JustprintFile = false;
        $scope.FileSumlationPdf = false;
        $scope.IsYouCanReject = false;
        HTTPs.POST(CONFIG.serverUrl + "/TAS/CTS", { id: $scope.idPatient }).then(res => {
            res = JSON.parse(res);
            if (res.error == 0) {
                $scope.$apply(() => {
                    if (res.data.length == 0) {
                        $scope.taskStatus = 0;
                    }
                    else {
                        $scope.taskData = res.data;
                        $scope.IsYouCanReject = res.IsYouCanReject;
                        if (res.data.action == -1 || res.data.action == null) {
                            $scope.TAB.printStl.display = true;
                            $scope.TAB.attachments.display = true;
                            $scope.TAB.createOrder.display = true;
                            $scope.TAB.tretmentPlans.display = true;
                            $scope.TAB.AdditionalInstructions.display = true;
                            $scope.TAB.createOrder.display = true;
                            $scope.TAB.patientInformation.display = true;
                            $scope.TAB.patientInformation.set = true;
                            $scope.TAB.patientInformation.active = true;
                            $scope.TAB.patientRecords.display = true;
                        }
                        if (res.data.action == 0) {
                            $scope.TAB.printStl.display = false;
                            $scope.TAB.createOrder.display = true;
                            $scope.TAB.tretmentPlans.display = true;

                        }
                        if (res.data.action == 1) {
                            $scope.TAB.printStl.display = true;
                            $scope.TAB.createOrder.display = false;
                            $scope.TAB.tretmentPlans.display = true;
                            $scope.TAB.patientInformation.display = true;
                            $scope.TAB.patientRecords.display = true;
                        }
                        if (res.data.action == 2) {

                            $scope.TAB.printStl.display = true;
                            $scope.TAB.printStl.set = true;
                            $scope.TAB.printStl.active = true;
                            $scope.TAB.AdditionalInstructions.display = true;
                            $scope.TAB.createOrder.display = false;
                            $scope.TAB.patientInformation.display = false;
                            $scope.TAB.patientRecords.display = false;
                            $scope.TAB.tretmentPlans.display = false;
                            $scope.JustprintFile = true;
                            $scope.taskAction = res.data.action;
                            $scope.FileSumlationPdf = true;
                        }
                        $scope.taskStatus = 1;
                    }
                });
            }
        })
        $scope.FinshTask = (Commnet) => {
            let Param = {};
            Param['id'] = $scope.idPatient;
            Param['Commnet'] = Commnet;
            if ($scope.taskAction == 2) {
                Param['TrackingNumber'] = document.getElementById('TrackingNumber')?.value;
                Param['attachTemplateAmount'] = document.getElementById('attachTemplateAmount')?.value;
                Param['alignersAmount'] = document.getElementById('alignersAmount')?.value;
                Param['risinAmount'] = document.getElementById('risinAmount')?.value;
            }

            HTTPs.POST(CONFIG.serverUrl + "/TAS/FT", Param).then(res => {
                res = JSON.parse(res);
                if (res.message == 2000) {
                    $scope.$apply(() => {
                        $scope.taskStatus = 0;
                    });
                }
            });
        }
        $scope.RejectTash = (Commnet) => {
            HTTPs.POST(CONFIG.serverUrl + "/TAS/RT", { id: $scope.idPatient, Commnet: Commnet }).then(res => {
                res = JSON.parse(res);
                if (res.message == 2000) {
                    $scope.$apply(() => {
                        $scope.taskStatus = 0;
                    });
                }
            });
        }

        $scope.barcodeId = "";
        $scope.numberOfAliner = "";
        $scope.numberAliner = "";
        $scope.statusBarcode = 0;
        $scope.barcodeAliner = 0;
        $scope.EXAliner = 0;
        $scope.patientId = 0;
        $scope.alinerId = 0;
        $scope.dataModelBar = null;
        $scope.showModelBarcode = (data) => {
            $scope.dataModelBar = data;
            var showAlinerUpper = true;
            var showAlinerLower = true;
            if (data.Upper) {
                if (data.duble == true) {
                    showAlinerUpper = true;
                    showAlinerLower = true;
                }
                else {
                    showAlinerLower = false;
                }
            }
            else {
                if (data.duble == true) {
                    showAlinerUpper = true;
                    showAlinerLower = true;
                }
                else {
                    showAlinerUpper = false;
                }
            }
            $scope.statusBarcode = data.statusBarcode;
            if ($scope.statusBarcode === 0) {
                console.log(data);
                $scope.barcodeId = data.id;
                $scope.numberAliner = data.numberAliner;
                $scope.numberOfAliner = parseInt(data.numberOfAliner) - 1;
                if (data.alinerType == 'L') {
                    data.numberOfAlinerUpper = (data.numberOfAlinerUpper + data.numberAlignerPlus);
                }
                else {
                    data.numberOfAlinerLower = (data.numberOfAlinerLower + data.numberAlignerPlus);
                }
                HTTPs.POST(CONFIG.serverUrl + "/BR/GBI", {
                    patientId: $scope.idPatient,
                    alignerName: $scope.barcodeId,
                    type: 0,
                    numberOfAliner: data.numberOfAliner,
                }).then(res => {
                    res = JSON.parse(res);
                    if (res.error == 0) {
                        $scope.$apply(() => {
                            $scope.FormAcrylicResinName = res.data[0].AcrylicResinName;
                            $scope.FormThermoformingFoilName = res.data[0].ThermoformingFoilName;
                            $scope.FormAcrylicResinREF = res.data[0].AcrylicResinREF;
                            $scope.FormAcrylicResinLOT = res.data[0].AcrylicResinLOT;
                            $scope.FormThermoformingFoilREF = res.data[0].ThermoformingFoilREF;
                            $scope.FormThermoformingFoilLOT = res.data[0].ThermoformingFoilLOT;
                            $scope.FormThermoformingFoilEX = new Date(res.data[0].ThermoformingFoilEX);
                            $scope.FormAcrylicResinEX = new Date(res.data[0].AcrylicResinEX);
                            $scope.FormalignerProductionDate = new Date(res.data[0].alignerProductionDate);
                            $scope.alignerName = res.data[0].barcodeId;
                            $scope.Formlink2d = res.data[0].link2d;
                            $scope.FormlinkQr = res.data[0].linkQr;
                            $scope.barcodeAliner = res.data[0].barCode;
                            var today = new Date(res.data[0].alignerProductionDate);
                            var dd = String(today.getDate()).padStart(2, '0');
                            var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
                            var yyyy = String(today.getFullYear());
                            $scope.EXAliner = dd + '' + mm + '' + yyyy[2] + '' + yyyy[3];
                            $scope.patientId = res.data[0].patientId;
                            $scope.alinerId = res.data[0].id;
                            $('#FormModalBarcode').modal("show");
                            $scope.renderIframe(res.data[0].firstName, $scope.idPatient, (shortNameDoctor ? renderDoctor(res.data[0].nameDoctor) : res.data[0].nameDoctor), res.data[0].nameStrategy, data.numberAliner, data.numberAliner, data.numberOfAlinerUpper, data.numberOfAlinerLower, res.data[0].barCode, $scope.EXAliner, showAlinerUpper, showAlinerLower, $scope.FormlinkQr, $scope.Formlink2d, data.numberAlignerPlus);
                        });
                    }
                    else {
                        $scope.$apply(() => {
                            try {
                                var div = document.getElementById('barcodePrint');
                                div.innerHTML = "";
                            } catch {

                            }
                            $scope.barcodeAliner = null;
                            $scope.Formlink2d = "";
                            $('#FormModalBarcode').modal("show");
                        })
                    }
                });
            }
            else {

                $scope.barcodeId = data.id;
                $scope.numberAliner = data.numberAliner;
                $scope.numberOfAliner = data.numberOfAliner;
                HTTPs.POST(CONFIG.serverUrl + "/BR/GBIB", {
                    patientId: $scope.idPatient,
                    numberOfAliner: data.numberOfAliner,
                    id: $scope.barcodeId.split('BOX')[1],
                }).then(res => {
                    res = JSON.parse(res);
                    if (res.error == 0) {
                        console.log(res);
                        $scope.$apply(() => {
                            $scope.alignerName = res.data.barcodeId;
                            $scope.Formlink2d = res.data.link2d;
                            $scope.FormlinkQr = res.data.linkQr;
                            $scope.patientId = res.data.idPatient;
                            $scope.barcodeAliner = res.data.barCode;
                            $scope.alinerId = res.data.id;
                            if (res.data.alignerProductionDate) {
                                $scope.FormalignerProductionDate = new Date(res.data.alignerProductionDate);
                            }

                            if (res.data.barCode != null) {
                                let valAlinerInBox = JSON.parse(res.data.value);
                                let minAlinger = Math.min(...valAlinerInBox);
                                let maxAlinger = Math.max(...valAlinerInBox);
                                $scope.renderIframeBox(res.data.firstName, $scope.idPatient, res.data.nameStrategy, minAlinger, maxAlinger, data.numberOfAliner, $scope.FormlinkQr, $scope.Formlink2d, data.key, res.data.alignerProductionDate);
                            }
                        });
                    }
                    else {
                        $scope.$apply(() => {
                            $scope.Formlink2d = "";
                        })
                    }
                })
                $('#FormModalBarcodeBOX').modal("show");
            }
        }
        function renderDoctor(nameDoctor) {
            let firstName = nameDoctor.replace("DR ", '').
                replace("DR.", '').
                replace("dr ", '').
                replace("dr.", '').
                replace("Dr ", '').
                replace("Dr. ", '').
                replace("Dr.", '');
            return firstName.split(' ', 2)[0][0] + "." + (firstName.split(' ').length > 1 ? firstName.split(' ')[firstName.split(' ').length - 1] : '');
        }
        $scope.FormAcrylicResinName = "";
        $scope.FormThermoformingFoilName = "";
        $scope.FormAcrylicResinREF = "";
        $scope.FormAcrylicResinLOT = "";
        $scope.FormThermoformingFoilREF = "";
        $scope.FormhermoformingFoilLOT = "";
        $scope.FormThermoformingFoilEX = "";
        $scope.FormAcrylicResinEX = "";
        $scope.FormalignerProductionDate = "";
        $scope.Formlink2d = "";
        $scope.FormlinkQr = "";
        $scope.GnreateBarcode = () => {
            if ($scope.statusBarcode === 0) {
                HTTPs.POST(CONFIG.serverUrl + "/BR/GBA", {
                    ThermoformingFoilName: $scope.FormThermoformingFoilName,
                    AcrylicResinName: $scope.FormAcrylicResinName,
                    AcrylicResinREF: $scope.FormAcrylicResinREF,
                    AcrylicResinLOT: $scope.FormAcrylicResinLOT,
                    ThermoformingFoilREF: $scope.FormThermoformingFoilREF,
                    ThermoformingFoilLOT: $scope.FormThermoformingFoilLOT,
                    ThermoformingFoilEX: $scope.FormThermoformingFoilEX,
                    AcrylicResinEX: $scope.FormAcrylicResinEX,
                    alignerProductionDate: $scope.FormalignerProductionDate,
                    patientId: $scope.idPatient,
                    alignerName: $scope.barcodeId,
                    GS1: GS1,
                    type: 0,
                    FillAllNextWithTheSameDetails: $('#FillAllNextWithTheSameDetails').is(':checked'),
                    numberOfAliner:$scope.numberOfAliner,
                    numberAliner:$scope.numberAliner
                }).then(res => {
                    res = JSON.parse(res);
                    if (res.error == 0) {
                        $scope.$apply(() => {
                            $scope.FormAcrylicResinREF = res.data.AcrylicResinREF;
                            $scope.FormAcrylicResinLOT = res.data.AcrylicResinLOT;
                            $scope.FormThermoformingFoilREF = res.data.ThermoformingFoilREF;
                            $scope.FormThermoformingFoilLOT = res.data.ThermoformingFoilLOT;
                            $scope.FormThermoformingFoilEX = new Date(res.data.ThermoformingFoilEX);
                            $scope.FormAcrylicResinEX = new Date(res.data.AcrylicResinEX);
                            $scope.FormalignerProductionDate = new Date(res.data.alignerProductionDate);
                            $scope.alignerName = res.data.barcodeId;
                            $scope.Formlink2d = res.data.link2d;
                            $scope.FormlinkQr = res.data.linkQr;
                            $scope.barcodeAliner = res.data.barCode;
                            var today = new Date(res.data.AcrylicResinEX);
                            var dd = String(today.getDate()).padStart(2, '0');
                            var mm = String(today.getMonth() + 1).padStart(2, '0');
                            var yyyy = String(today.getFullYear());
                            $scope.EXAliner = dd + '' + mm + '' + yyyy[2] + '' + yyyy[3];
                            $scope.patientId = res.data.patientId;
                            $scope.alinerId = res.data.id;
                            $scope.$emit('changeSocketBarckode', $scope.barcodeId);
                            // $scope.showModelBarcode($scope.dataModelBar);
                        });
                    }
                })
            }
            else {
                HTTPs.POST(CONFIG.serverUrl + "/BR/GBB", {
                    patientId: $scope.idPatient,
                    PCSUN: $scope.numberAliner,
                    id: $scope.barcodeId.split('BOX')[1],
                    GS1: GS1,
                    numberOfAliner: $scope.numberOfAliner,
                    alignerProductionDate: $scope.FormalignerProductionDate
                }).then(res => {
                    res = JSON.parse(res);
                    if (res.error == 0) {
                        $scope.$apply(() => {
                            $scope.alignerName = res.data.barcodeId;
                            $scope.Formlink2d = res.data.link2d;
                            $scope.FormlinkQr = res.data.linkQr;
                            $scope.patientId = res.data.idPatient;
                            $scope.barcodeAliner = res.data.barCode;
                            $scope.alinerId = res.data.id;
                            $scope.$emit('changeSocketBarckodeBox', $scope.barcodeId);
                            $scope.renderIframeBox()
                        });
                    }
                })
            }
        }

        $scope.SVGDATA = '';
        $scope.downloadImage = () => {
            var svgData = $scope.SVGDATA;
            var svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
            var svgUrl = URL.createObjectURL(svgBlob);
            var downloadLink = document.createElement("a");
            downloadLink.href = svgUrl;
            downloadLink.download = "newesttree.svg";
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);
        }
        $scope.renderIframe = (namePatient, numberCases, doctorName, AttachmentTemplate, numberAlinerUpper, numberAlinerLower, numberOfAlinerUpper, numberOfAlinerLower, barCode, productionDate, showAlinerUpper, showAlinerLower, linkQR, link2d, numberAlignerPlus) => {
            getBase64FromUrl(linkQR).then(resultQR => {
                let h = `
                <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                viewBox="0 0 198.43 80.15" style="enable-background:new 0 0 198.43 80.15;" xml:space="preserve">
            <style type="text/css">
                .st0{fill:#FFFFFF;}
                .st1{fill:#6969AC;stroke:#010101;stroke-width:5;stroke-miterlimit:22.9256;}
                .st2{fill:#6969AC;}
                .st3{fill:#6969AC;stroke:url(#);stroke-miterlimit:22.9256;}
                .st4{opacity:0.58;}
                .st5{fill:#29282D;}
                .st6{fill:#7973B6;}
                .st7{fill-rule:evenodd;clip-rule:evenodd;fill:#6969AC;stroke:url(#);stroke-miterlimit:22.9256;}
                .st8{fill:#969696;stroke:url(#);stroke-miterlimit:22.9256;}
                .st9{fill:#D7517A;}
                .st10{fill:#E9445F;}
                .st11{fill:#ECC371;}
                .st12{opacity:0.65;}
                .st13{fill:#D2D2D1;}
                .st14{opacity:0.03;}
                .st15{fill:#FFFFFF;stroke:url(#);stroke-miterlimit:22.9256;}
                .st16{fill:#6869AC;}
                .st17{fill:#6969AC;stroke:#ED2224;stroke-width:5;stroke-miterlimit:22.9256;}
                .st18{opacity:0.3;fill:#2D2D2D;}
                .st19{fill:none;stroke:#000000;stroke-miterlimit:10;}
                .st20{fill:#010101;}
                .st21{stroke:#000000;stroke-width:0.5;stroke-miterlimit:10;}
                .st22{fill:none;stroke:#000000;stroke-linejoin:round;}
                .st23{fill:none;stroke:#010101;stroke-miterlimit:10;}
                .st24{fill:none;stroke:#000000;stroke-width:0.5;stroke-linejoin:round;}
                .st25{fill:none;stroke:#FFFFFF;stroke-miterlimit:10;}
                .st26{fill:#FFFFFF;stroke:#000000;stroke-miterlimit:10;}
                .st27{fill:#2D2D2D;}
                .st28{fill:#1F2325;}
                .st29{fill:#3D3D3D;}
                .st30{fill:#323537;}
                .st31{fill-rule:evenodd;clip-rule:evenodd;fill:#323537;}
                .st32{fill:#050606;}
                .st33{font-family:'ArialMT';}
                .st34{font-size:6.2788px;}
                .st35{font-family:'Arial-Black';}
                .st36{font-size: 5.7105px;}
                .st37{font-size:5.7483px;}
                .st38{font-family:'Arial-BoldMT';}
                .st39{font-size: 5.6703px;}
                .st40{font-size:4.9671px;}
                .st41{font-size:5.3245px;}
            </style>
            <rect y="0" class="st0" width="198.43" height="80.15"/>
            <text transform="matrix(1 0 0 1 19.361 48.1261)" class="st32 st33 st34">${doctorName}</text>
            <image href="${resultQR}" x="146.9" y="28.56" class="st32" width="34.76" height="34.76"></image>
            <text transform="matrix(1 0 0 1 9.7065 23.5278)" class="st32 st35 st36">${namePatient}</text>
            ${showAlinerUpper ? `
            <text transform="matrix(1 0 0 1 82.4128 32.6711)" class="st32 st33 st37">UPPER</text>
            <text transform="matrix(1 0 0 1 107.0358 32.6711)"><tspan x="0" y="0" class="st32 st38 st37">${numberAlinerUpper} </tspan><tspan x="8.61" y="0" class="st32 st33 st37">of</tspan><tspan x="13.82" y="0" class="st32 st38 st37"> ${(numberOfAlinerUpper - 1)}</tspan></text>
            `: ``}
            ${showAlinerLower ? `
            <text transform="matrix(1 0 0 1 82.4128 40.0016)" class="st32 st33 st37">LOWER</text>
            <text transform="matrix(1 0 0 1 107.0358 40.0015)"><tspan x="0" y="0" class="st32 st38 st37">${numberAlinerLower}  </tspan><tspan x="8.61" y="0" class="st32 st33 st37">of</tspan><tspan x="13.82" y="0" class="st32 st38 st37"> ${(numberOfAlinerLower - 1)}</tspan></text>
            `: ``}
            <text transform="matrix(1 0 0 1 19.2985 35.297)" class="st32 st33 st34">#</text>
            <text transform="matrix(1 0 0 1 83.9453 54.278)" class="st32 st33 st39">(01)${barCode}</text>
            <text transform="matrix(1 0 0 1 83.9453 61.1206)" class="st32 st33 st39">(11)${productionDate}</text>
            <text transform="matrix(1 0 0 1 83.9453 68.3817)" class="st32 st33 st39">(17)${numberCases}-A${numberAlinerLower}</text>
            <text transform="matrix(1 0 0 1 24.8747 35.3912)" class="st32 st33 st34">${numberCases}</text>
            <g>
                <g>
                    <path class="st32" d="M14.27,32.12c0,0.46-0.26,0.87-0.64,1.07c-0.17,0.09-0.37,0.15-0.58,0.15s-0.41-0.05-0.58-0.15
                        c-0.38-0.21-0.64-0.61-0.64-1.07c0-0.67,0.55-1.22,1.22-1.22C13.73,30.9,14.27,31.44,14.27,32.12z"/>
                    <path class="st32" d="M16.14,31.81c-0.17-0.4-0.41-0.76-0.72-1.06c-0.31-0.31-0.67-0.55-1.06-0.72c-0.41-0.17-0.85-0.26-1.3-0.26
                        s-0.89,0.09-1.3,0.26c-0.4,0.17-0.76,0.41-1.06,0.72c-0.31,0.31-0.55,0.67-0.72,1.06c-0.17,0.41-0.26,0.85-0.26,1.3
                        c0,0.45,0.09,0.89,0.26,1.3c0.17,0.4,0.41,0.75,0.72,1.06l0,0c0,0,0,0,0,0v0l0.01,0.01l0,0c0.31,0.3,0.66,0.54,1.06,0.71
                        c0.41,0.17,0.85,0.26,1.3,0.26s0.89-0.09,1.3-0.26c0.39-0.17,0.75-0.4,1.05-0.7l0,0l0.01-0.01c0,0,0,0,0,0l0,0h0
                        c0.3-0.31,0.54-0.66,0.71-1.06c0.17-0.41,0.26-0.85,0.26-1.3C16.4,32.66,16.31,32.23,16.14,31.81z M15.73,34.25
                        c-0.12,0.28-0.28,0.54-0.48,0.77c-0.1-0.7-0.53-1.3-1.12-1.63c-0.09,0.07-0.18,0.14-0.28,0.19c-0.24,0.13-0.51,0.2-0.79,0.2
                        c-0.28,0-0.55-0.07-0.79-0.2c-0.1-0.05-0.2-0.12-0.28-0.19c-0.6,0.33-1.02,0.93-1.12,1.63c-0.2-0.23-0.36-0.49-0.48-0.77
                        c-0.15-0.36-0.23-0.74-0.23-1.13s0.08-0.77,0.23-1.13c0.15-0.35,0.36-0.66,0.62-0.92c0.27-0.27,0.58-0.48,0.92-0.62
                        c0.36-0.15,0.74-0.23,1.13-0.23c0.39,0,0.77,0.08,1.13,0.23c0.35,0.15,0.66,0.36,0.92,0.62c0.27,0.27,0.48,0.58,0.62,0.92
                        c0.15,0.36,0.23,0.74,0.23,1.13S15.88,33.89,15.73,34.25z"/>
                </g>
            </g>
            ${numberAlinerUpper == 0 ? `<text transform="matrix(1 0 0 1 19.8454 57.9502)" class="st33 st40">Attachment Template</text>` : ``}
            <text transform="matrix(1 0 0 1 19.8454 65.2113)" class="st38 st41">${AttachmentTemplate}</text>
                </svg>
                `;
                var div = document.getElementById('barcodePrint');
                var pw = document.createElement("iframe");
                pw.style.width = "100%";
                pw.style.minHeight = "350px";
                pw.id = "printf";
                div.innerHTML = '';
                div.appendChild(pw);
                pw.contentWindow.document.open();
                pw.contentWindow.document.write(h);
                pw.contentWindow.document.close();
                $scope.SVGDATA = h;
            })


        }
        $scope.renderIframeBox = (namePatient, numberCases, AttachmentTemplate, minAlinger, maxAlinger, numberOfAliner, linkQR, link2d, key, alignerProductionDate) => {
            getBase64FromUrl(link2d).then(result2d => {
                getBase64FromUrl(linkQR).then(resultQR => {
                    let h = `
                    <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 181.67 80.15" style="enable-background:new 0 0 181.67 80.15;" xml:space="preserve">
                        <style type="text/css">
                            .st0{fill:#FFFFFF;}
                            .st1{fill:#6969AC;stroke:#010101;stroke-width:5;stroke-miterlimit:22.9256;}
                            .st2{fill:#6969AC;}
                            .st3{fill:#6969AC;stroke:url(#);stroke-miterlimit:22.9256;}
                            .st4{opacity:0.58;}
                            .st5{fill:#29282D;}
                            .st6{fill:#7973B6;}
                            .st7{fill-rule:evenodd;clip-rule:evenodd;fill:#6969AC;stroke:url(#);stroke-miterlimit:22.9256;}
                            .st8{fill:#969696;stroke:url(#);stroke-miterlimit:22.9256;}
                            .st9{fill:#D7517A;}
                            .st10{fill:#E9445F;}
                            .st11{fill:#ECC371;}
                            .st12{opacity:0.65;}
                            .st13{fill:#D2D2D1;}
                            .st14{opacity:0.03;}
                            .st15{fill:#FFFFFF;stroke:url(#);stroke-miterlimit:22.9256;}
                            .st16{fill:#6869AC;}
                            .st17{fill:#6969AC;stroke:#ED2224;stroke-width:5;stroke-miterlimit:22.9256;}
                            .st18{opacity:0.3;fill:#2D2D2D;}
                            .st19{fill:none;stroke:#000000;stroke-miterlimit:10;}
                            .st20{fill:#010101;}
                            .st21{stroke:#000000;stroke-width:0.5;stroke-miterlimit:10;}
                            .st22{fill:none;stroke:#000000;stroke-linejoin:round;}
                            .st23{fill:none;stroke:#010101;stroke-miterlimit:10;}
                            .st24{fill:none;stroke:#000000;stroke-width:0.5;stroke-linejoin:round;}
                            .st25{fill:none;stroke:#FFFFFF;stroke-miterlimit:10;}
                            .st26{fill:#FFFFFF;stroke:#000000;stroke-miterlimit:10;}
                            .st27{fill:#2D2D2D;}
                            .st28{fill:#1F2325;}
                            .st29{fill:#3D3D3D;}
                            .st30{fill:#323537;}
                            .st31{fill-rule:evenodd;clip-rule:evenodd;fill:#323537;}
                            .st32{fill:#050606;}
                            .st33{font-family:'Arial-Black';}
                            .st34{font-size: 5.7105px;}
                            .st35{font-family:'Arial-BoldMT';}
                            .st36{font-size:5.7483px;}
                            .st37{font-family:'ArialMT';}
                            .st38{font-size:5.8142px;}
                            .st39{font-size:5.2216px;}
                            .st40{fill:none;stroke:#050606;stroke-width:0.75;stroke-miterlimit:10;}
                        </style>
                        <rect y="0" class="st0" width="198.43" height="80.15"></rect>
                        <image href="${resultQR}"  x="144.59" y="45.24" class="st32" width="29.63" height="29.63"></image>
                        <image href="${result2d}"  x="121.78" y="22.87" class="st32" width="52.45" height="14.68" link2d=""></image>
                        <text transform="matrix(1 0 0 1 9.7065 20.7193)" class="st32 st33 st34" namepatient="">${namePatient}</text>
                        <text transform="matrix(1 0 0 1 117.7065 20.7193)" class="st32 st33 st34" namepatient="" style="font-size: 3px;">${alignerProductionDate ? alignerProductionDate : ''}</text>
                        <g>
                            <text transform="matrix(1 0 0 1 80.4425 43.0102)" class="st32 st35 st36">Box ${key}</text>
                        </g>
                        <g>
                            <text transform="matrix(1 0 0 1 10.4887 42.9357)" class="st32 st35 st36">Aligners</text>
                        </g>
                        <text transform="matrix(1 0 0 1 38.4167 42.9357)"><tspan x="0" y="0" class="st32 st35 st36" numberofaliner="">${minAlinger}-${maxAlinger} </tspan><tspan x="17.54" y="0" class="st32 st37 st36">of</tspan><tspan x="22.75" y="0" class="st32 st35 st36" numberofaliner=""> ${numberOfAliner}</tspan></text>
                        <text transform="matrix(1 0 0 1 19.0313 31.6607)" class="st32 st37 st38">#</text>
                        <text transform="matrix(1 0 0 1 24.1954 31.7478)" class="st32 st37 st38" numbercases="">${numberCases}</text>
                        <g>
                            <g>
                                <path class="st32" d="M14.72,28.72c0,0.43-0.24,0.8-0.59,0.99c-0.16,0.09-0.34,0.13-0.54,0.13c-0.19,0-0.38-0.05-0.54-0.13
                                    c-0.35-0.19-0.59-0.56-0.59-0.99c0-0.62,0.51-1.13,1.13-1.13C14.21,27.59,14.72,28.09,14.72,28.72z"></path>
                                <path class="st32" d="M16.45,28.43c-0.16-0.37-0.38-0.7-0.66-0.99c-0.28-0.28-0.62-0.51-0.99-0.66c-0.38-0.16-0.79-0.24-1.21-0.24
                                    c-0.42,0-0.82,0.08-1.21,0.24c-0.37,0.16-0.7,0.38-0.99,0.66c-0.28,0.28-0.51,0.62-0.66,0.99c-0.16,0.38-0.24,0.79-0.24,1.21
                                    c0,0.42,0.08,0.82,0.24,1.21c0.16,0.37,0.38,0.7,0.66,0.98l0,0c0,0,0,0,0,0v0l0.01,0.01l0,0c0.28,0.28,0.61,0.5,0.98,0.66
                                    c0.38,0.16,0.79,0.24,1.21,0.24c0.42,0,0.82-0.08,1.21-0.24c0.36-0.15,0.69-0.37,0.97-0.65l0,0l0.01-0.01c0,0,0,0,0,0l0,0h0
                                    c0.28-0.28,0.5-0.61,0.66-0.98c0.16-0.38,0.24-0.79,0.24-1.21C16.69,29.22,16.61,28.82,16.45,28.43z M16.07,30.69
                                    c-0.11,0.26-0.26,0.5-0.45,0.72c-0.09-0.65-0.49-1.2-1.04-1.51c-0.08,0.07-0.17,0.13-0.26,0.18c-0.22,0.12-0.48,0.18-0.73,0.18
                                    c-0.25,0-0.51-0.06-0.73-0.18c-0.09-0.05-0.18-0.11-0.26-0.18c-0.55,0.3-0.95,0.86-1.04,1.51c-0.19-0.21-0.34-0.45-0.45-0.72
                                    c-0.14-0.33-0.21-0.68-0.21-1.05s0.07-0.72,0.21-1.05c0.14-0.32,0.33-0.61,0.58-0.86c0.25-0.25,0.53-0.44,0.86-0.58
                                    c0.33-0.14,0.68-0.21,1.05-0.21s0.72,0.07,1.05,0.21c0.32,0.14,0.61,0.33,0.86,0.58c0.25,0.25,0.44,0.53,0.58,0.86
                                    c0.14,0.33,0.21,0.68,0.21,1.05S16.21,30.36,16.07,30.69z"></path>
                            </g>
                        </g>
                        <text transform="matrix(1 0 0 1 55.1384 31.3782)" class="st35 st39" typetretment="">${AttachmentTemplate}</text>
                        <rect x="9.71" y="45.94" class="st40" width="115.47" height="28.24"></rect>
                    </svg>
                    `;
                    var div = document.getElementById('barcodePrintBox');
                    var pw = document.createElement("iframe");
                    pw.style.width = "100%";
                    pw.style.minHeight = "350px";
                    pw.id = "printf";
                    div.innerHTML = '';
                    div.appendChild(pw);
                    pw.contentWindow.document.open();
                    pw.contentWindow.document.write(h);
                    pw.contentWindow.document.close();
                    $scope.SVGDATA = h;
                })
            })


        }
        $scope.renderBarcodeBox = () => {
            let h = `
             <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                viewBox="0 0 181.67 80.15" style="enable-background:new 0 0 181.67 80.15;" xml:space="preserve">
                    <style type="text/css">
                        .st0{fill:#FFFFFF;}
                        .st1{fill:#6969AC;stroke:#010101;stroke-width:5;stroke-miterlimit:22.9256;}
                        .st2{fill:#6969AC;}
                        .st3{fill:#6969AC;stroke:url(#);stroke-miterlimit:22.9256;}
                        .st4{opacity:0.58;}
                        .st5{fill:#29282D;}
                        .st6{fill:#7973B6;}
                        .st7{fill-rule:evenodd;clip-rule:evenodd;fill:#6969AC;stroke:url(#);stroke-miterlimit:22.9256;}
                        .st8{fill:#969696;stroke:url(#);stroke-miterlimit:22.9256;}
                        .st9{fill:#D7517A;}
                        .st10{fill:#E9445F;}
                        .st11{fill:#ECC371;}
                        .st12{opacity:0.65;}
                        .st13{fill:#D2D2D1;}
                        .st14{opacity:0.03;}
                        .st15{fill:#FFFFFF;stroke:url(#);stroke-miterlimit:22.9256;}
                        .st16{fill:#6869AC;}
                        .st17{fill:#6969AC;stroke:#ED2224;stroke-width:5;stroke-miterlimit:22.9256;}
                        .st18{opacity:0.3;fill:#2D2D2D;}
                        .st19{fill:none;stroke:#000000;stroke-miterlimit:10;}
                        .st20{fill:#010101;}
                        .st21{stroke:#000000;stroke-width:0.5;stroke-miterlimit:10;}
                        .st22{fill:none;stroke:#000000;stroke-linejoin:round;}
                        .st23{fill:none;stroke:#010101;stroke-miterlimit:10;}
                        .st24{fill:none;stroke:#000000;stroke-width:0.5;stroke-linejoin:round;}
                        .st25{fill:none;stroke:#FFFFFF;stroke-miterlimit:10;}
                        .st26{fill:#FFFFFF;stroke:#000000;stroke-miterlimit:10;}
                        .st27{fill:#2D2D2D;}
                        .st28{fill:#1F2325;}
                        .st29{fill:#3D3D3D;}
                        .st30{fill:#323537;}
                        .st31{fill-rule:evenodd;clip-rule:evenodd;fill:#323537;}
                        .st32{fill:#050606;}
                        .st33{font-family:'Arial-Black';}
                        .st34{font-size:10.7105px;}
                        .st35{font-family:'Arial-BoldMT';}
                        .st36{font-size:5.7483px;}
                        .st37{font-family:'ArialMT';}
                        .st38{font-size:5.8142px;}
                        .st39{font-size:5.2216px;}
                        .st40{fill:none;stroke:#050606;stroke-width:0.75;stroke-miterlimit:10;}
                    </style>
                    <rect y="0" class="st0" width="198.43" height="80.15"/>
                    <rect x="144.59" y="45.24" class="st32" width="29.63" height="29.63"/>
                    <rect x="121.78" y="22.87" class="st32" width="52.45" height="14.68"/>
                    <text transform="matrix(1 0 0 1 9.7065 20.7193)" class="st32 st33 st34">ESSAM, BADR</text>
                    <g>
                        <text transform="matrix(1 0 0 1 80.4425 43.0102)" class="st32 st35 st36">Box 2 of 2</text>
                    </g>
                    <g>
                        <text transform="matrix(1 0 0 1 10.4887 42.9357)" class="st32 st35 st36">Aligners</text>
                    </g>
                    <text transform="matrix(1 0 0 1 38.4167 42.9357)"><tspan x="0" y="0" class="st32 st35 st36">14-26 </tspan><tspan x="17.54" y="0" class="st32 st37 st36">of</tspan><tspan x="22.75" y="0" class="st32 st35 st36"> 26</tspan></text>
                    <text transform="matrix(1 0 0 1 19.0313 31.6607)" class="st32 st37 st38">#</text>
                    <text transform="matrix(1 0 0 1 24.1954 31.7478)" class="st32 st37 st38">0102929</text>
                    <g>
                        <g>
                            <path class="st32" d="M14.72,28.72c0,0.43-0.24,0.8-0.59,0.99c-0.16,0.09-0.34,0.13-0.54,0.13c-0.19,0-0.38-0.05-0.54-0.13
                                c-0.35-0.19-0.59-0.56-0.59-0.99c0-0.62,0.51-1.13,1.13-1.13C14.21,27.59,14.72,28.09,14.72,28.72z"/>
                            <path class="st32" d="M16.45,28.43c-0.16-0.37-0.38-0.7-0.66-0.99c-0.28-0.28-0.62-0.51-0.99-0.66c-0.38-0.16-0.79-0.24-1.21-0.24
                                c-0.42,0-0.82,0.08-1.21,0.24c-0.37,0.16-0.7,0.38-0.99,0.66c-0.28,0.28-0.51,0.62-0.66,0.99c-0.16,0.38-0.24,0.79-0.24,1.21
                                c0,0.42,0.08,0.82,0.24,1.21c0.16,0.37,0.38,0.7,0.66,0.98l0,0c0,0,0,0,0,0v0l0.01,0.01l0,0c0.28,0.28,0.61,0.5,0.98,0.66
                                c0.38,0.16,0.79,0.24,1.21,0.24c0.42,0,0.82-0.08,1.21-0.24c0.36-0.15,0.69-0.37,0.97-0.65l0,0l0.01-0.01c0,0,0,0,0,0l0,0h0
                                c0.28-0.28,0.5-0.61,0.66-0.98c0.16-0.38,0.24-0.79,0.24-1.21C16.69,29.22,16.61,28.82,16.45,28.43z M16.07,30.69
                                c-0.11,0.26-0.26,0.5-0.45,0.72c-0.09-0.65-0.49-1.2-1.04-1.51c-0.08,0.07-0.17,0.13-0.26,0.18c-0.22,0.12-0.48,0.18-0.73,0.18
                                c-0.25,0-0.51-0.06-0.73-0.18c-0.09-0.05-0.18-0.11-0.26-0.18c-0.55,0.3-0.95,0.86-1.04,1.51c-0.19-0.21-0.34-0.45-0.45-0.72
                                c-0.14-0.33-0.21-0.68-0.21-1.05s0.07-0.72,0.21-1.05c0.14-0.32,0.33-0.61,0.58-0.86c0.25-0.25,0.53-0.44,0.86-0.58
                                c0.33-0.14,0.68-0.21,1.05-0.21s0.72,0.07,1.05,0.21c0.32,0.14,0.61,0.33,0.86,0.58c0.25,0.25,0.44,0.53,0.58,0.86
                                c0.14,0.33,0.21,0.68,0.21,1.05S16.21,30.36,16.07,30.69z"/>
                        </g>
                    </g>
                    <text transform="matrix(1 0 0 1 55.1384 31.3782)" class="st35 st39">Comprehensive</text>
                    <rect x="9.71" y="45.94" class="st40" width="115.47" height="28.24"/>
                </svg>
                `;
            var div = document.getElementById('barcodePrint');
            var pw = document.createElement("iframe");
            pw.style.width = "100%";
            pw.style.minHeight = "350px";
            pw.id = "printf";
            div.innerHTML = '';
            div.appendChild(pw);
            pw.contentWindow.document.open();
            pw.contentWindow.document.write(h);
            pw.contentWindow.document.close();
        }
        $scope.printSVG = (nameElement) => {
            var pw = document.getElementById("printf");
            pw.contentWindow.print();
        }

    }],
    Router: {
        Url: "/Cases/:id",
        Templete: 'Views/Cases/Cases.html',
        Render: [
            { link: '//vjs.zencdn.net/7.10.2/video-js.min.css', type: "CSS" },
            { link: 'assets/libs/animate/animate.min.css', type: "CSS" },
            { link: 'assets/libs/flatpickr/flatpickr.min.css', type: "CSS" },
            { link: 'https://cdn.jsdelivr.net/npm/uikit@3.4.2/dist/css/uikit.min.css', type: "CSS" },
            { link: 'https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.1.1/crypto-js.min.js', type: "JS" },
            { link: 'assets/libs/flatpickr/flatpickr.min.js', type: "JS" },
            { link: 'assets/libs/tippy-js/tippy.all.min.js', type: "JS" },
            { link: '//vjs.zencdn.net/7.10.2/video.min.js', type: "JS" },
            { link: 'assets/libs/jquery-ui/jquery-ui.min.js', type: "JS" },
            { link: 'https://cdn.jsdelivr.net/npm/uikit@3.4.2/dist/js/uikit.min.js', type: "JS" },
            { link: 'https://cdn.jsdelivr.net/npm/uikit@3.4.2/dist/js/uikit-icons.min.js', type: "JS" },
            { link: 'assets/libs/custombox/custombox.min.css', type: "CSS" },
            { link: 'assets/libs/custombox/custombox.min.js', type: "JS" },
            { link: 'assets/libs/ladda/spin.js', type: "JS" },
            { link: 'assets/libs/ladda/ladda.js', type: "JS" },
        ],
        AUTH: true
    }
}