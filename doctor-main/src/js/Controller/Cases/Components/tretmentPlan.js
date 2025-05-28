var CONT_tretmentPlan = function ($scope, $location, $sce, $rootScope) {
    this.$onInit = function () {
        $scope.datatest = this.filters;
        $scope.buttonNext = this.buttonNext;
        $scope.Submit = false;
        $scope.nextTab = () => {
            $scope.buttonNext();
        };
        $scope.Submited = () => {
            HTTPs.POST(CONFIG.serverUrl + "/CS", { id: this.idPatient }).then(res => {
                res = JSON.parse(res);
                if (res.message == 2001) {
                    $scope.$apply(() => {
                        $scope.Submit = true;
                        this.btnHideNav();
                    });
                }
            });
        }




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


        $scope.typeNumber = '';
        $scope.UpperNumber = '';
        $scope.LowersNumber = '';
        $scope.TremtentLevel = [];
        $scope.numberAlignersIN = '0';
        $scope.nLevelNumberAliner = 0;
        $scope.refinementNumber;
        $scope.getAll = () => {
            HTTPs.POST(CONFIG.serverUrl + "/GTP", { patientId: this.idPatient }).then(res => {
                res = JSON.parse(res);
                if (res.error == 0) {
                    $scope.$apply(() => {
                        console.log(res);
                        for (var i = 0; i < res.data.length; i++) {
                            $scope.Tabs.push({
                                id: res.data[i].id, link: URLStatICBAS + "/CV/" + $CRID.TO(res.data[i].id.toString()), nLevel: res.data[i].nLevel, salary: res.data[i].salary, set: (i == res.data.length - 1 ? true : false), select: ''
                                , Setup: res.data[i].pdfLink.Setup.length == 0 ? null : $sce.trustAsResourceUrl(CONFIG.serverImageUrl + res.data[i].pdfLink.Setup[0].path),
                                Simulation: res.data[i].pdfLink.Simulation.length == 0 ? null : $sce.trustAsResourceUrl(CONFIG.serverImageUrl + res.data[i].pdfLink.Simulation[0].path),
                                V3dV: res.data[i].pdfLink.V3dV.length === 0 ? null : res.data[i].pdfLink.V3dV,
                                Right: res.data[i].pdfLink.Right.length == 0 ? null : $sce.trustAsResourceUrl(CONFIG.serverImageUrl + res.data[i].pdfLink.Right[0].path),
                                Left: res.data[i].pdfLink.Left.length == 0 ? null : $sce.trustAsResourceUrl(CONFIG.serverImageUrl + res.data[i].pdfLink.Left[0].path),
                                Frontal: res.data[i].pdfLink.Frontal.length == 0 ? null : $sce.trustAsResourceUrl(CONFIG.serverImageUrl + res.data[i].pdfLink.Frontal[0].path),
                                additionalInstructions: true,
                                LowerAligners: res.data[i].LowerAligners,
                                UpperAligners: res.data[i].UpperAligners,
                                PakageOption: res.data[i].pdfLink.PakageOption
                            });
                            if (res.data[i].pdfLink.PakageOption[0].OptionNumber == res.data[i].nLevel) {
                                $scope.ApprovedOption = res.data[i].pdfLink.PakageOption[0].OptionNumber;
                            }
                        }
                        $scope.refinementNumber = res.data[res.data.length - 1].refinementNumber;
                        $scope.UpperNumber = res.data[res.data.length - 1].UpperAligners;
                        $scope.LowersNumber = res.data[res.data.length - 1].LowerAligners;
                        $scope.nLevelNumberAliner = res.data[res.data.length - 1].nLevel;
                        $scope.nLevelSelected = res.data[res.data.length - 1].nLevel;
                        if (res.data[res.data.length - 1].UpperAligners == res.data[res.data.length - 1].LowerAligners) {

                        }
                        else {
                            if (res.data[res.data.length - 1].UpperAligners > res.data[res.data.length - 1].LowerAligners) {
                                $scope.typeNumber = 'U';
                            }
                            else {
                                $scope.typeNumber = 'L';
                            }
                        }
                        if (res.data[res.data.length - 1].nLevel > 0) {
                            if ($scope.Tabs[res.data.length - 1].V3dV) {
                                $scope.setSelect('V3dV', res.data[res.data.length - 1].nLevel);
                            }
                        }

                        $scope.PakageOption = res.data[res.data.length - 1].pdfLink.PakageOption;
                        let to = res.data[res.data.length - 1].LowerAligners;
                        if (res.data[res.data.length - 1].LowerAligners < res.data[res.data.length - 1].UpperAligners) {
                            to = res.data[res.data.length - 1].UpperAligners;
                        }
                        console.log(to <= $scope.PakageOption[0].to, to, $scope.PakageOption[0].to);
                        if ($scope.PakageOption && $scope.PakageOption.length !== 0 && $scope.PakageOption[0].PIdSelected !== $scope.PakageOption[0].PIdTrue && to >= $scope.PakageOption[0].toSlected) {
                            $scope.PakageOptionCuurect = true;
                        }
                        else {
                            $scope.PakageOptionCuurect = false;
                        }
                    });
                }
            });
        }
        $scope.getAll();

        $scope.Tabs = []
        $scope.TabsLevel = []
        $scope.nLevelSelected = -1;
        $scope.PakageOptionCuurect = false;
        $scope.PakageOption;
        $scope.ApprovedOption;
        $scope.setTabs = (id) => {
            $scope.Tabs.forEach(res => {
                if (res.id == id) {
                    $scope.UpperNumber = res.UpperAligners;
                    $scope.LowersNumber = res.LowerAligners;
                    $scope.nLevelSelected = res.nLevel;
                    $scope.PakageOption = res.PakageOption;
                    let to = res.LowerAligners;
                    if (res.LowerAligners < res.UpperAligners) {
                        to = res.UpperAligners;
                    }
                    console.log(to <= $scope.PakageOption[0].to, to, $scope.PakageOption[0].toSlected);
                    if ($scope.PakageOption.length !== 0 && $scope.PakageOption[0].PIdSelected !== $scope.PakageOption[0].PIdTrue && to >= $scope.PakageOption[0].toSlected) {
                        $scope.PakageOptionCuurect = true;
                    }
                    else {
                        $scope.PakageOptionCuurect = false;
                    }
                    res.set = true;
                    $scope.setSelect('V3dV', res.nLevel);
                }
                else {
                    res.set = false;
                }
            });
        }

        $scope.shippingAddrss;
        $scope.SetShippingAddrss = (id) => {
            $scope.shippingAddrss = id;
        }
        $scope.approval = (UpperNumber, LowersNumber, type, PakageUpdateId = null) => {
            let inputIn = 0;
            if (document.getElementById('numberAlignersIN')) {
                let inputIn = parseInt(document.getElementById('numberAlignersIN').value);
            }
            let shiipid = $scope.shippingAddrss;
            if (type == "U") {
                LowersNumber = (LowersNumber + inputIn);
            }
            else {
                UpperNumber = (UpperNumber + inputIn);
            }
            if (!shiipid || shiipid == null || shiipid == "" || shiipid == '? undefined:undefined ?') {
                alert("Please select a shipping address.");
                return;
            }
            if (!confirm(`Are you sure to accept Option ${$scope.nLevelSelected} case?`)) {
                return;
            }
            $scope.UpdateNumberAliner();
            HTTPs.POST(CONFIG.serverUrl + "/CAP", { patientId: this.idPatient, LowerAligners: LowersNumber, UpperAligners: UpperNumber, shippingDoctorId: shiipid, nLevel: $scope.nLevelSelected, PakageUpdateId: PakageUpdateId }).then(res => {
                res = JSON.parse(res);
                if (res.error == 0) {
                    $scope.$apply(() => {
                        $location.path('/');
                    });
                }
            });
        }

        $scope.DataAdress = [];
        $scope.getAllShipping = () => {
            HTTPs.POST(CONFIG.serverUrl + "/GASH", {}).then(res => {
                res = JSON.parse(res);
                if (res.error == 0) {
                    $scope.$apply(() => {
                        $scope.DataAdress = res.data;
                        if (res.data.length != 0) {
                            $scope.shippingId = res.data[0].id.toString();
                        }
                    });
                }
            });
        }
        $rootScope.$on("updateShippings", (event, valueFile) => {
            $scope.getAllShipping();
        });
        $scope.getAllShipping();
        $scope.UpdateNumberAliner = () => {
            if (document.getElementById('numberAlignersIN')) {
                HTTPs.POST(CONFIG.serverUrl + "/UNA", { patientId: this.idPatient, numberAligner: document.getElementById('numberAlignersIN').value, nLevel: $scope.nLevelSelected }).then(res => {

                });
            }
        }
        $scope.NemoLink = false;
        $scope.setSelect = (select, nLevel) => {
            $scope.Tabs.find(x => x.nLevel == nLevel).select = select;
            if (select === "V3dV") {
                if ($scope.Tabs.find(x => x.nLevel == nLevel).V3dV && $scope.Tabs.find(x => x.nLevel == nLevel).V3dV.length == 2) {
                    let script = document.createElement('script');
                    script.src = '/assets/data/3d/js/main.js?' + Date.now();
                    script.onload = () => {
                        renderVideo('kiven' + nLevel, CONFIG.serverImageUrl + $scope.Tabs.find(x => x.nLevel == nLevel).V3dV[0].path, CONFIG.serverImageUrl + $scope.Tabs.find(x => x.nLevel == nLevel).V3dV[1].path, $scope.Tabs.find(x => x.nLevel == nLevel).V3dV[1].size);
                    }
                    document.body.appendChild(script);
                }
                else if ($scope.Tabs.find(x => x.nLevel == nLevel).V3dV && $scope.Tabs.find(x => x.nLevel == nLevel).V3dV.length == 1) {
                    if ($scope.Tabs.find(x => x.nLevel == nLevel).V3dV[0].name == "NemoData") {
                        $scope.NemoLink = true;
                        $.get(CONFIG.serverImageUrl + $scope.Tabs.find(x => x.nLevel == nLevel).V3dV[0].path + `?${Date.now()}`, function (data) {
                            let iframe = document.createElement("iframe");
                            iframe.style.width = "100%";
                            iframe.style.height = "100%";
                            iframe.style.border = "none";
                            iframe.src = data;
                            document.querySelector(`#kiven${nLevel}`).appendChild(iframe);
                        }).fail(function () {
                            console.log("An error has occurred.");
                        });
                    }
                }
            }
        }
        $scope.CopyLink = () => {
            var copyText = document.getElementById("linkShereyStringsUrl");
            console.log(copyText);
            copyText.select();
            document.execCommand("copy");
            Tost.info("Link copied", "", 3000);
        }

        $scope.commentAndRefusal = () => {
            $scope.nextTab();
        }




        $scope.priceStratige = {};
        $scope.getMemeberDoctorWithPatientId = (id, numberAligner) => {
            HTTPs.POST(CONFIG.serverImageUrl + "/PAcc/GMSWPI", {}, { id: id, numberAligner: numberAligner }).then(res => {
                res = JSON.parse(res);
                if (res.error == 0) {
                    $scope.$apply(() => {
                        $scope.priceStratige = res.data[0];
                        console.log($scope.priceStratige);
                    });
                }
            });
        }
        $scope.notAliner = -1;
        $scope.numberLowerAligners = 0;
        $scope.numberUpperAligners = 0;
        $scope.getCasesInformation = (id) => {
            HTTPs.POST(CONFIG.serverImageUrl + "PAcc/GCI", { id: id }).then(res => {
                res = JSON.parse(res);
                if (res.error == 0) {
                    if (res.data[0].LowerAligners != null) {
                        let numberAligner = 0;

                        if (res.data[0].LowerAligners < res.data[0].UpperAligners) {
                            numberAligner = res.data[0].UpperAligners;
                        }
                        else {
                            numberAligner = res.data[0].LowerAligners;
                        }
                        $scope.$apply(() => {
                            $scope.numberLowerAligners = res.data[0].LowerAligners;
                            $scope.numberUpperAligners = res.data[0].UpperAligners;
                            $scope.notAliner = 0;
                            $scope.getMemeberDoctorWithPatientId(this.idPatient, numberAligner);
                        });
                    } else {
                        $scope.$apply(() => {
                            $scope.notAliner = "There are no Number Aligner";
                        });

                    }
                }
            });
        }
        $scope.getCasesInformation(this.idPatient);

        $scope.showModelShippingEdit = (id) => {
            this.showModelShippingEdit({ $event: id });
        }
    }
}
