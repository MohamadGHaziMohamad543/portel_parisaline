
$ANContreoller.TempleteTasksId = {
    FUN: ['$scope', '$location', '$routeParams', function ($scope, $location, $routeParams) {
        $scope.$emit('AuthChanged', true);
        $scope.Submit = false;
        $scope.Tasks = [];
        $scope.TasksTemp = [];
        $scope.serverImage = CONFIG.serverImageUrl;
        $scope.Loader = false;
        $scope.titleForm = "Add Task";
        $scope.numberIndex = -1;
        $scope.templeteId = $routeParams.id;

        $scope.Delete = false;
        if ($location.search().TS == "D" + $scope.templeteId) {
            $scope.Delete = true;
        }

        $scope.deleteTemp = () => {
            HTTPs.POST(CONFIG.serverUrl + "/TT/DTT", { templeteId: $scope.templeteId }).then(res => {
                res = JSON.parse(res);
                if (res.error == 0) {
                    $scope.$apply(() => {
                        $location.path("/TempleteTasks").search({});
                    });
                }
            });
        }
        $scope.nextTab = () => {
            $scope.buttonNext();
        };
        $scope.Submited = () => {
            HTTPs.POST(CONFIG.serverUrl + "/CS", { id: $scope.templeteId }).then(res => {
                res = JSON.parse(res);
                if (res.message == 2001) {
                    $scope.$apply(() => {
                        $scope.Submit = true;
                        this.btnHideNav();
                    });
                }
            });
        }

        var l = Ladda.create(document.querySelector('.ladda-button'));
        $scope.addTask = () => {
            l.start();
            let rejectStartPoint = 0;
            let index = $scope.numberIndex;
            let Tasks = [];
            let Start = new Date();
            for (var i = 0; i < $scope.Tasks.length; i++) {
                if ($scope.Tasks[i].Start == null || ($scope.Tasks.length - 1 == i && $scope.Tasks[i].End == null)) {
                    Start = null;
                }
                Tasks[i] = { templeteId: $scope.Tasks[i].templeteId, userId: $scope.Tasks[i].userId, usertype: $scope.Tasks[i].usertype, action: $scope.Tasks[i].action, Start: $scope.Tasks[i].Start, End: $scope.Tasks[i].End, endTask: $scope.Tasks[i].endTask, commentAdmin: $scope.Tasks[i].commentAdmin, commentUser: $scope.Tasks[i].commentUser, rejectStartPoint: $scope.Tasks[i].rejectStartPoint }
            }

            if ($("#rejectStartPoint").is(":checked")) {
                rejectStartPoint = 1;
            }

            Tasks.splice(index, 0, { templeteId: $scope.templeteId, userId: $('#UserId').val(), usertype: $("#usertype").val(), action: $("#action").val(), Start: Start, End: null, endTask: null, commentAdmin: $("#CommentInput").val(), commentUser: null, rejectStartPoint: rejectStartPoint });
            for (var i = 0; i < Tasks.length; i++) {
                Tasks[i].numberIndex = i;
            }
            $scope.Loader = true;
            HTTPs.POST(CONFIG.serverUrl + "/TT/BT", { Tasks: JSON.stringify(Tasks), templeteId: $scope.templeteId }).then(res => {
                $scope.$apply(() => {
                    $scope.numberIndex = -1;
                    $scope.GetTasks();
                    Custombox.modal.close();
                    l.remove();
                });
            });


        }
        $scope.GetTasks = () => {
            $scope.Loader = true;
            HTTPs.POST(CONFIG.serverUrl + "/TT/GT", { templeteId: $scope.templeteId }).then(res => {
                res = JSON.parse(res);
                if (res.error == 0) {
                    $scope.$apply(() => {
                        $scope.Tasks = res.data;
                        $scope.Loader = false;
                    });
                }
            });
        }

        $scope.usertypeSelect = 3;
        $scope.GetTasks();
        $scope.endTask = (numberIndex) => {
            $scope.Loader = true;
            HTTPs.POST(CONFIG.serverUrl + "/TT/ET", { numberIndex: numberIndex, patientId: this.idPatient }).then(res => {
                res = JSON.parse(res);
                if (res.error == 0) {
                    $scope.$apply(() => {
                        $scope.GetTasks();
                    });
                }
            });
        }

        $scope.StartTask = (numberIndex) => {
            $scope.Loader = true;
            HTTPs.POST(CONFIG.serverUrl + "/TT/ST", { numberIndex: numberIndex, patientId: this.idPatient }).then(res => {
                res = JSON.parse(res);
                if (res.error == 0) {
                    $scope.$apply(() => {
                        $scope.GetTasks();
                    });
                }
            });
        }
        $scope.rejectTask = (numberIndex) => {
            $scope.Loader = true;
            HTTPs.POST(CONFIG.serverUrl + "/TT/RT", { numberIndex: numberIndex, patientId: this.idPatient }).then(res => {
                res = JSON.parse(res);
                if (res.error == 0) {
                    $scope.$apply(() => {
                        $scope.GetTasks();
                    });
                }
            });
        }

        $scope.removeTask = (numberIndex) => {
            let Tasks = [];
            for (var i = 0; i < $scope.Tasks.length; i++) {
                if (numberIndex != $scope.Tasks[i].numberIndex) {
                    Tasks.push($scope.Tasks[i]);
                }

            }
            for (var i = 0; i < Tasks.length; i++) {
                Tasks[i].numberIndex = i;
            }
            $scope.Loader = true;
            HTTPs.POST(CONFIG.serverUrl + "/TT/BT", { Tasks: JSON.stringify(Tasks), templeteId: $scope.templeteId }).then(res => {
                $scope.$apply(() => {
                    $scope.GetTasks();
                });
            });
        }
        var modal = new Custombox.modal({
            content: {
                target: "#FormModal",
                effect: 'makeway',
                close: false,
            },
            overlay: {
                color: "#38414a",
                close: false,
            }
        });
        $scope.OpenModel = (index) => {
            $scope.numberIndex = index;
            $('#CommentInput').val("");
            $('#usertype').val("3");
            $scope.GetUsers("3");
            $scope.usertypeSelect = 3;
            modal.open();
        }

        $('#usertype').on("change", (e) => {
            $scope.$apply(() => {
                $scope.GetUsers(e.target.value);
            });
        });

        $scope.functionName = [];
        $scope.getFun = () => {
            HTTPs.POST(CONFIG.serverUrl + "/TAS/GetFun", {}).then(res => {
                res = JSON.parse(res);
                if (res.error == 0) {
                    $scope.$apply(() => {
                        $scope.functionName = res.data;
                    })
                }
            });
        }
        $scope.getFun();
        $scope.Users = [];
        $scope.GetUsers = (userType) => {
            let linkSe = "";
            if (userType == 2) {
                $scope.Users = [];
                $scope.Users.push({ id: 0, userName: 'Case Revision', Country: '', City: '' });
                $scope.Users.push({ id: 1, userName: 'Doctor Approval', Country: '', City: '' });
                $scope.Users.push({ id: 2, userName: 'Case Fabrication', Country: '', City: '' });
                $scope.Users.push({ id: 3, userName: 'Case Delivered', Country: '', City: '' });
                $scope.Users.push({ id: 4, userName: 'Completed', Country: '', City: '' });
                return;
            }
            if (userType == 20) {
                linkSe = "/TAS/GetFun"
            }
            if (userType == 3) {
                linkSe = "/TAS/GetL";
            }
            else if (userType == 4) {
                linkSe = "/TAS/GetC";
            }
            else if (userType == 5) {
                linkSe = "/TAS/GetT";
            }
            else if (userType == 7) {
                linkSe = "/TAS/GetS";
            }
            else if (userType == 9) {
                linkSe = "/TAS/GetA";
            }
            HTTPs.POST(CONFIG.serverUrl + linkSe, {}).then(res => {
                res = JSON.parse(res);
                if (res.error == 0) {
                    $scope.$apply(() => {
                        $scope.Users = res.data;
                    })
                }
            });
        }
        $scope.$on('$destroy', () => {

        });

        $scope.casesStatusElement = -1;

        $scope.getCasesStatus = () => {
            HTTPs.POST(CONFIG.serverUrl + "/GCS", { id: this.idPatient }).then(res => {
                res = JSON.parse(res);
                if (res.error == 0) {
                    $scope.$apply(() => {
                        $scope.casesStatusElement = res.data;
                    });
                }
            })
        }

        $scope.changeCaseStatus = () => {
            HTTPs.POST(CONFIG.serverUrl + "/CCS", { status: $('#casesStatusElementCases').val(), id: this.idPatient })
                .then(res => {
                    res = JSON.parse(res);
                    if (res.error == 0) {
                        Tost.info("Update Successfuly", "Status updated successfully", 3000);
                    }
                });
        }
        $scope.getCasesStatus();
    }],
    Router: {
        Url: "/TempleteTasks/:id",
        Templete: "Views/TempleteTasks/TempleteTasksId.html",
        Render: [
            { link: 'assets/libs/ladda/spin.js', type: "JS" },
            { link: 'assets/libs/ladda/ladda.js', type: "JS" },
            { link: 'assets/libs/custombox/custombox.min.js', type: "JS" },
            { link: 'assets/libs/custombox/custombox.min.css', type: "CSS" },
            { link: 'https://cdn.jsdelivr.net/npm/uikit@3.4.2/dist/css/uikit.min.css', type: "CSS" },
            { link: 'https://cdn.jsdelivr.net/npm/uikit@3.4.2/dist/js/uikit.min.js', type: "JS" },
            { link: 'https://cdn.jsdelivr.net/npm/uikit@3.4.2/dist/js/uikit-icons.min.js', type: "JS" },
        ],
        AUTH: true
    }
}