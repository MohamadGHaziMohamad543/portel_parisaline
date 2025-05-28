var CONT_tretmentPlan = function ($scope, $location, $sce) {
    this.$onInit = function () {
        $scope.datatest = this.filters;
        $scope.buttonNext = this.buttonNext;
        $scope.Submit = false;
        $scope.idPatient = this.idPatient;

        $scope.serverUrlStatic = CONFIG.serverUrlStatic;
        $scope.ShowImage = false;
        $scope.toggleImages = () => {
            $scope.ShowImage = !$scope.ShowImage;
        }
        //Start Tabs Add Instractions 
        $scope.TabsAddsSelected = "Internal";
        $scope.SelectTabsAdd = (nameTab) => {
            $scope.TabsAddsSelected = nameTab;
        }
        //End Tabs 
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

        $scope.GenrateViewr = (e, nLevel) => {
            if (document.getElementById('linkOurthub' + nLevel).value.split("https://downloads-default.nemocloud-services.com").length === 2) {
                e.target.style.display = "none";
                let params = new URLSearchParams(document.getElementById('linkOurthub' + nLevel).value);
                if (params.size === 3) {
                    let linkNemo = document.getElementById('linkOurthub' + nLevel).value.split("?")[1];
                    $scope.NemoLink = true;
                    HTTPs.POST(CONFIG.serverUrl + "/VE/G3d", { linkNemo: linkNemo, patientId: this.idPatient, nLevel: nLevel }).then(res => {
                        res = JSON.parse(res);
                        if (res.error == 0) {
                            $scope.$apply(() => {
                                $scope.getAll();
                            });

                        }
                        else {
                            alert("Error Server Call to MR Yaseen");
                        }
                    });
                }
                else {
                    alert("Error Link Url ");
                }
            }
            else {
                e.target.style.display = "none";
                let link = document.getElementById('linkOurthub' + nLevel).value;
                let numberProject = null;
                if (link.split('?p=').length == 2) {
                    numberProject = window.atob(link.split('?p=')[1]).split('-');
                    if (numberProject.length == 2) {
                        numberProject = numberProject[1];
                    }
                    else {
                        numberProject = null;
                    }
                }
                if (numberProject) {
                    HTTPs.POST(CONFIG.serverUrl + "/VE/G3d", { numberProject: numberProject, patientId: this.idPatient, nLevel: nLevel }).then(res => {
                        res = JSON.parse(res);
                        if (res.error == 0) {
                            $scope.$apply(() => {
                                console.log(res.data);
                                $scope.Tabs.find(x => x.nLevel == nLevel)['V3dV'] = [];
                                $scope.Tabs.find(x => x.nLevel == nLevel)['V3dV'].push({ path: res.data + '/data.json' });
                                $scope.Tabs.find(x => x.nLevel == nLevel)['V3dV'].push({ path: res.data + '/kivenView' });
                                if ($scope.Tabs.find(x => x.nLevel == nLevel).V3dV.length == 2) {
                                    let script = document.createElement('script');
                                    script.onload = () => {
                                        renderVideo('kiven' + nLevel, CONFIG.serverImageUrl + $scope.Tabs.find(x => x.nLevel == nLevel).V3dV[0].path, CONFIG.serverImageUrl + $scope.Tabs.find(x => x.nLevel == nLevel).V3dV[1].path, $scope.Tabs.find(x => x.nLevel == nLevel).V3dV[1].size);
                                    }
                                    script.src = '/assets/data/3d/js/main.js?' + Date.now();
                                    document.body.appendChild(script);
                                }

                            });
                        }
                        else {
                            alert("Error Server Call to MR Yaseen");
                        }
                    });
                }
            }

        }

        $scope.removeView = (link, nLevel, index) => {
            HTTPs.POST(CONFIG.serverUrl + "/DRP", { src: link }).then(res => {
                if (res) {
                    $scope.$apply(() => {
                        $scope.Tabs.find(x => x.nLevel == nLevel)[index] = null;
                        $scope.Tabs.find(x => x.nLevel == nLevel)[index + "Bisec"] = null;
                        $scope.NemoLink = false;
                    })
                }
            });
        }
        $scope.TremtentLevel = [];
        $scope.getAll = () => {
            HTTPs.POST(CONFIG.serverUrl + "/GTP", { patientId: this.idPatient }).then(res => {
                res = JSON.parse(res);
                if (res.error == 0) {
                    $scope.$apply(() => {
                        $scope.Tabs = [];
                        for (var i = 0; i < res.data.length; i++) {
                            //TPUNA
                            $scope.Tabs.push({
                                id: res.data[i].id, link: URLStatICBAS + "/CV/" + $CRID.TO(res.data[i].id.toString())
                                , nLevel: res.data[i].nLevel,
                                UpperAligners: res.data[i].UpperAligners,
                                UpperAlignersInput: res.data[i].UpperAligners,
                                LowerAligners: res.data[i].LowerAligners,
                                LowerAlignersInput: res.data[i].LowerAligners,
                                salary: res.data[i].salary,
                                set: (i == res.data.length - 1 ? true : false), select: 'Setup'
                                , Setup: res.data[i].pdfLink.Setup.length == 0 ? null : $sce.trustAsResourceUrl(CONFIG.serverImageUrl + res.data[i].pdfLink.Setup[0].path),
                                V3dV: res.data[i].pdfLink.V3dV.length == 0 ? null : res.data[i].pdfLink.V3dV,
                                Simulation: res.data[i].pdfLink.Simulation.length == 0 ? null : $sce.trustAsResourceUrl(CONFIG.serverImageUrl + res.data[i].pdfLink.Simulation[0].path),
                                Right: res.data[i].pdfLink.Right.length == 0 ? null : $sce.trustAsResourceUrl(CONFIG.serverImageUrl + res.data[i].pdfLink.Right[0].path),
                                Left: res.data[i].pdfLink.Left.length == 0 ? null : $sce.trustAsResourceUrl(CONFIG.serverImageUrl + res.data[i].pdfLink.Left[0].path),
                                Frontal: res.data[i].pdfLink.Frontal.length == 0 ? null : $sce.trustAsResourceUrl(CONFIG.serverImageUrl + res.data[i].pdfLink.Frontal[0].path),
                                ModelOPN: res.data[i].pdfLink.ModelOPN.length == 0 ? null : $sce.trustAsResourceUrl(CONFIG.serverImageUrl + res.data[i].pdfLink.ModelOPN[0].path),
                                treatmentPlanOPN: res.data[i].pdfLink.treatmentPlanOPN.length == 0 ? null : $sce.trustAsResourceUrl(CONFIG.serverImageUrl + res.data[i].pdfLink.treatmentPlanOPN[0].path),
                                SetupBisec: res.data[i].pdfLink.Setup.length == 0 ? null : res.data[i].pdfLink.Setup[0].path,
                                SimulationBisec: res.data[i].pdfLink.Simulation.length == 0 ? null : res.data[i].pdfLink.Simulation[0].path,
                                RightBisec: res.data[i].pdfLink.Right.length == 0 ? null : res.data[i].pdfLink.Right[0].path,
                                LeftBisec: res.data[i].pdfLink.Left.length == 0 ? null : res.data[i].pdfLink.Left[0].path,
                                FrontalBisec: res.data[i].pdfLink.Frontal.length == 0 ? null : res.data[i].pdfLink.Frontal[0].path,
                                ModelOPNBisec: res.data[i].pdfLink.ModelOPN.length == 0 ? null : res.data[i].pdfLink.ModelOPN[0].path,
                                treatmentPlanOPNBisec: res.data[i].pdfLink.treatmentPlanOPN.length == 0 ? null : res.data[i].pdfLink.treatmentPlanOPN[0].path,
                                additionalInstructions: true
                            });

                        }
                        $scope.nLevel = $scope.Tabs[$scope.Tabs.length - 1].nLevel;
                        $scope.setSelect('V3dV', $scope.Tabs[$scope.Tabs.length - 1].nLevel);
                    });
                }
            });
        }
        $scope.getAll();

        $scope.Tabs = []
        $scope.TabsLevel = []
        $scope.nLevel = -1;
        $scope.setTabs = (id) => {
            $scope.Tabs.forEach(res => {
                if (res.id == id) {
                    $scope.nLevel = res.nLevel;
                    res.set = true;
                }
                else {
                    res.set = false;
                }
            });
        }
        $scope.approval = () => {
            HTTPs.POST(CONFIG.serverUrl + "/CAP", { patientId: this.idPatient }).then(res => {
                res = JSON.parse(res);
                if (res.error == 0) {
                    $scope.$apply(() => {
                        $location.path('/');
                    });
                }
            });
        }
        $scope.NemoLink = false;
        $scope.setSelect = (select, nLevel) => {
            $scope.Tabs.find(x => x.nLevel == nLevel).select = select;
            if (select === "V3dV") {
                if ($scope.Tabs.find(x => x.nLevel == nLevel).V3dV) {
                    if ($scope.Tabs.find(x => x.nLevel == nLevel).V3dV.length == 2) {
                        let script = document.createElement('script');
                        script.src = '/assets/data/3d/js/main.js';
                        script.onload = () => {
                            renderVideo('kiven' + nLevel, CONFIG.serverImageUrl + $scope.Tabs.find(x => x.nLevel == nLevel).V3dV[0].path, CONFIG.serverImageUrl + $scope.Tabs.find(x => x.nLevel == nLevel).V3dV[1].path, $scope.Tabs.find(x => x.nLevel == nLevel).V3dV[1].size);
                        }
                        document.body.appendChild(script);
                    }
                    else if ($scope.Tabs.find(x => x.nLevel == nLevel).V3dV.length == 1) {
                        if ($scope.Tabs.find(x => x.nLevel == nLevel).V3dV[0].name == "NemoData") {
                            $scope.NemoLink = true;
                            $.get(CONFIG.serverImageUrl + $scope.Tabs.find(x => x.nLevel == nLevel).V3dV[0].path + `?${Date.now()}`, function (data) {
                                let iframe = document.createElement("iframe");
                                iframe.style.width = "100%";
                                iframe.style.height = "53vh";
                                iframe.style.border = "none";
                                iframe.src = data;
                                document.querySelector(`#kiven${nLevel}`).appendChild(iframe);
                            }).fail(function () {
                                console.log("An error has occurred.");
                            });
                        }
                    }
                } else {
                    $scope.NemoLink = false;
                }
            } else {
                $scope.NemoLink = false;
            }
        }
        $scope.CopyLink = () => {
            var copyText = document.getElementById("linkShereyStringsUrl");
            copyText.select();
            document.execCommand("copy");
            Tost.info("Link copied", "", 3000);
        }


        $scope.updateLowerAligner = (number, nLevel) => {
            HTTPs.POST(CONFIG.serverUrl + "/TPULA", { patientId: this.idPatient, nLevel, LowerAligners: number }).then(res => {
                if (res == "true") {
                    $scope.$apply(() => {
                        $scope.Tabs.find(x => x.nLevel == nLevel).LowerAligners = number;
                    });
                }
            });
        }

        $scope.updateUpperAligner = (number, nLevel) => {
            HTTPs.POST(CONFIG.serverUrl + "/TPUUA", { patientId: this.idPatient, nLevel, UpperAligners: number }).then(res => {
                if (res == "true") {
                    $scope.$apply(() => {
                        $scope.Tabs.find(x => x.nLevel == nLevel).UpperAligners = number;
                    });
                }
            });
        }
        $scope.taskStatus = 0;
        $scope.dataBackTask = [];
        $scope.dataNextTask = [];
        $scope.numberIndex = null;
        $scope.taskStartDate = null;
        $scope.IsYouCanReject = false;

        HTTPs.POST(CONFIG.serverUrl + "/TAS/CTS", { id: this.idPatient }).then(res => {
            res = JSON.parse(res);
            if (res.error == 0) {
                $scope.$apply(() => {
                    if (res.data.Count == 0) {
                        $scope.taskStatus = 0;

                    }
                    else {
                        $scope.taskStatus = 1;
                        $scope.numberIndex = res.data.numberIndex;
                        $scope.taskStartDate = res.data.Start;
                        $scope.dataBackTask = res.dataBackTask;
                        $scope.dataNextTask = res.dataNextTask;
                        $scope.IsYouCanReject = res.IsYouCanReject;
                    }
                });
            }
        })
        $scope.AddLevel = () => {

            HTTPs.POST(CONFIG.serverUrl + "/TPCL", { patientId: this.idPatient }).then(res => {
                res = JSON.parse(res);
                if (res.message == 2000) {
                    $scope.$apply(() => {
                        $scope.getAll();
                    });
                }
            });
        }
        $scope.removeFile = (link, nLevel, index) => {
            HTTPs.POST(CONFIG.serverUrl + "/DRP", { src: link }).then(res => {
                if (res) {
                    $scope.$apply(() => {
                        $scope.Tabs.find(x => x.nLevel == nLevel)[index] = null;
                        $scope.Tabs.find(x => x.nLevel == nLevel)[index + "Bisec"] = null;
                    })
                }
            });
        }

        $scope.FinshTask = (Commnet) => {
            HTTPs.POST(CONFIG.serverUrl + "/TAS/FT", { id: this.idPatient, Commnet: Commnet, numberIndex: $scope.numberIndex, GoNext: $('#GoNext').val(), taskStartDate: $scope.taskStartDate }).then(res => {
                res = JSON.parse(res);
                if (res.message == 2000) {
                    $scope.$apply(() => {
                        $scope.taskStatus = 0;
                    });
                }
            });
        }
        $scope.RejectTash = (Commnet) => {
            HTTPs.POST(CONFIG.serverUrl + "/TAS/RT", { id: this.idPatient, Commnet: Commnet, numberIndex: $scope.numberIndex, GoBack: $('#GoBack').val(), taskStartDate: $scope.taskStartDate }).then(res => {
                res = JSON.parse(res);
                if (res.message == 2000) {
                    $scope.$apply(() => {
                        $scope.taskStatus = 0;
                    });
                }
            });
        }
        $scope.eventDonUpload = (PATH, nLevel, index) => {
            $scope.Tabs.find(x => x.nLevel == nLevel)[index] = $sce.trustAsResourceUrl(CONFIG.serverImageUrl + PATH);
            $scope.Tabs.find(x => x.nLevel == nLevel)[index + "Bisec"] = PATH;
            // $scope.getAll();
        }

    }
}

adminApp.controller('tretmentPlan', ['$scope', '$location', '$sce', CONT_tretmentPlan]);

adminApp.component('tretmentPlan', {
    bindings: {
        filters: '@',
        buttonNext: '&',
        idPatient: '<',
        status: '<',
        tg: '=',
    },
    templateUrl: 'Views/Cases/Components/tretmentPlan.html?' + Date.now(),
    controller: 'tretmentPlan'
});

