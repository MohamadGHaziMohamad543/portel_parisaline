var CONT_PatientInformation = function ($scope, $location) {
    this.$onInit = function () {
        $scope.datatest = this.filters;

        $scope.resizeImage = (fileImage, fileName) => {
            return new Promise((resulve, reject) => {
                let MAX_WIDTH = 320;
                let MAX_HEIGHT = 180;
                let MIME_TYPE = "image/jpeg";
                let QUALITY = 0.7;

                let file = fileImage; // get the file
                let blobURL = URL.createObjectURL(file);
                let img = new Image();
                img.src = blobURL;
                img.onerror = function () {
                    // Handle the failure properly
                    Tost.warning("Error File ", "Corrupted image file", 3000);
                };
                img.onload = function () {
                    const [newWidth, newHeight] = calculateSize(img, MAX_WIDTH, MAX_HEIGHT);
                    const canvas = document.createElement("canvas");
                    canvas.width = newWidth;
                    canvas.height = newHeight;
                    const ctx = canvas.getContext("2d");
                    ctx.drawImage(img, 0, 0, newWidth, newHeight);
                    canvas.toBlob(
                        (blob) => {
                            var file = new File([blob], fileName);
                            resulve(file);
                        },
                        MIME_TYPE,
                        QUALITY
                    );

                };

                function calculateSize(img, maxWidth, maxHeight) {
                    let width = img.width;
                    let height = img.height;

                    // calculate the width and height, constraining the proportions
                    if (width > height) {
                        if (width > maxWidth) {
                            height = Math.round((height * maxWidth) / width);
                            width = maxWidth;
                        }
                    } else {
                        if (height > maxHeight) {
                            width = Math.round((width * maxHeight) / height);
                            height = maxHeight;
                        }
                    }
                    return [width, height];
                }

                // Utility functions for demo purpose
            });
        }
        $scope.Create = () => {
            let Vform = Validate(document.getElementById('formInformationPatient'));
            if (!Vform) {
                return;
            }
            if ($('#BirthDate').val() == "" || $('#BirthDate').val() == null) {
                document.getElementById('DateBirthda').classList.add("errorInput");
                $('#BirthDate').removeClass("sucssInput");
                $('#ErrorMessageDate').html($('#ErrorMessageDate').attr("titleError"));
                return;
            }
            else {
                $('#ErrorMessageDate').html("");
                $('#BirthDate').removeClass("errorInput");
                $('#BirthDate').addClass("sucssInput");
            }
            if (!$('#type').val()) {
                $('#type').addClass("errorInput");
                return;
            }

            if (Vform['parisalinePartner'] != undefined) {
                if (Vform['parisalinePartner'] == 1) {
                    if (Vform['parisalineId'].length < 5) {
                        document.getElementById("parisalineId").style.border = "1px dashed red";
                        return;
                    }
                    else {
                        document.getElementById("parisalineId").style.border = "1px dashed green";
                    }
                }
            }
            else {
                Vform['parisalinePartner'] = 0;
            }
            if (Vform['refinementNumber'] == "") {
                document.getElementById("refinementNumber").parentNode.querySelector(".select2").style.border = "1px dashed red";
                return;
            }
            if (Vform['refinementNumber']) {
                let nameCase = $scope.DataPatients.find(x => x.id == Vform['refinementNumber']);
                if (!confirm(`Are you sure you want to create a refinement for case:  #${nameCase.text}?`)) {
                    return;
                }
            }
            var dataF = new FormData();
            dataF.append("fileData", FileUpload);
            let dateTemp = $('#BirthDate').val();
            const [day, month, year] = dateTemp.split('-');
            Vform['BirthDate'] = `${year}-${month}-${day}`;
            Reloader.Start('#formInformationPatient');
            HTTPs.POST(CONFIG.serverUrl + "/P/Create", dataF, Vform).then(res => {
                res = JSON.parse(res);
                if (res.message == 2000) {
                    Reloader.Stop('#formInformationPatient');
                    $scope.$apply(() => {
                        $location.path("/Cases/" + $CRID.TO(res.id.toString())).search({ TB: 'patientRecords', TA: "patientInformation" });
                        this.buttonNext();
                    });
                }
            });
        };
        $scope.nextTab = () => {
            this.buttonNext();
        }
        $scope.update = () => {
            let Vform = Validate(document.getElementById('formInformationPatient'));
            if (!Vform) {
                return;
            }
            Vform['id'] = this.idPatient;
            if (Vform['parisalinePartner'] == 1) {
                if (Vform['parisalineId'].length < 5) {
                    document.getElementById("parisalineId").style.border = "1px dashed red";
                    return;
                }
                else {
                    document.getElementById("parisalineId").style.border = "1px dashed green";
                }
            }
            var dataF = new FormData();
            dataF.append("fileData", FileUpload);
            let dateTemp = $('#BirthDate').val();
            const [day, month, year] = dateTemp.split('-');
            Vform['BirthDate'] = `${year}-${month}-${day}`;
            HTTPs.POST(CONFIG.serverUrl + "/P/Update", dataF, Vform).then(res => {
                $scope.$apply(() => {
                    $scope.EditForm = false;
                });

            });
        }
        $scope.openFIle = (e) => {
            ImageELement = e.target;
            $('#imagePatientFile').click();
        }
        var FileUpload = null;
        $('#imagePatientFile').on('change', (evt) => {
            var tgt = evt.target || window.event.srcElement,
                files = tgt.files;
            // FileReader support
            if (FileReader && files && files.length) {
                let typeFile = files[0].name;
                typeFile = typeFile.split(".");
                if (typeFile.length > 1) {
                    typeFile = typeFile[typeFile.length - 1].toUpperCase();

                }
                else {
                    return;
                }
                if (typeFile == "PNG" || typeFile == "JPG" || typeFile == "JPEG" || typeFile == "GIF") {
                    $scope.resizeImage(files[0], files[0].name).then(res => {
                        var fr = new FileReader();
                        fr.onload = () => {
                            ImageELement.src = fr.result;
                        }
                        fr.readAsDataURL(res);
                        FileUpload = res;

                    });
                }
                else {
                    Tost.warning("Invalid file type", "Allowed files .png .jpeg .jpg", 3000);
                }

            }
            else {
                // fallback -- perhaps submit the input to an iframe and temporarily store
                // them on the server until the user's session ends.
            }
        });

        const dt = flatpickr("#BirthDate", {
            maxDate: "2009-12-31",
            dateFormat: "d-m-Y",
            onChange: function (selectedDates, dateStr, instance) {
                var dateN = new Date(selectedDates[0]).getFullYear();
                if (dateN > 2009) {
                    $('#BirthDate').val("31-12-2009");
                }
            }
        });

        $scope.casesStatusD = -1;
        $scope.EditForm = false;
        //get Information Patient
        $scope.parisalineId = "";
        $scope.getAll = () => {
            if (this.idPatient != -1) {
                HTTPs.POST(CONFIG.serverUrl + "/P/GetId", { id: this.idPatient }).then(res => {
                    res = JSON.parse(res);
                    if (res.message == 2000) {
                        $('#formInformationPatient #firstName').val(res.data[0].firstName);
                        $('#formInformationPatient #lastName').val(res.data[0].lastName);
                        dt.setDate(new Date(res.data[0].birthDate), true);
                        $('#formInformationPatient #gender').val(res.data[0].gender);
                        $('#formInformationPatient #imagePatient').attr("src", CONFIG.serverImageUrl + res.data[0].image);
                        $scope.$apply(() => {
                            if (res.data[0].type !== 0) {
                                $scope.PateitnRefimentDefult = res.data[0].refinementNumber;
                            }
                            $scope.casesStatusD = res.data[0].caseStatus;
                            $scope.TypeCase = res.data[0].type;
                            document.getElementById("type").value = res.data[0].type;
                            $scope.parisalinePartner = res.data[0].parisalinePartner;
                            $scope.parisalineId = res.data[0].parisalineId == -1 ? '' : res.data[0].parisalineId;
                        });
                    }
                });
            }
            else {
                $scope.EditForm = true;
            }
        }

        $scope.getAll();

        $scope.TypeCase = 0;
        $scope.initTypeCases = () => {
            document.querySelector("#type").addEventListener("change", (e) => {
                $scope.$apply(() => {
                    if (e.target.value == 0) {
                        this.eventCaseRefinementAndRetainer({ $event: false });
                    }
                    else {
                        this.eventCaseRefinementAndRetainer({ $event: true });
                    }
                    $scope.TypeCase = e.target.value;
                });
            })
        }

        $scope.parisalinePartner = 0;
        $scope.InitparisalinePartner = () => {
            document.querySelector("#parisalinePartner").addEventListener("change", (e) => {
                $scope.$apply(() => {
                    $scope.parisalinePartner = e.target.value;
                });
            })
        }

        function formatState(state) {
            if (!state.id) {
                return state.text;
            }
            var $state = $(
                `<span><img src="${CONFIG.serverImageUrl}${state.image}" style="    width: 30px; height: 30px; border-radius: 20px;" /> ${state.text} </span>`
            );
            return $state;
        };
        $scope.PateitnRefimentDefult = -1;
        $scope.DataPatients = [];
        $scope.getAllPateitnRefiment = () => {
            ///P/GAPP
            HTTPs.POST(CONFIG.serverUrl + "/P/GAPP", { patientId: this.idPatient }).then(res => {
                res = JSON.parse(res);
                if (res.message == 2000) {
                    $scope.$apply(() => {
                        let data = [];
                        for (let i = 0; i < res.data.length; i++) {
                            data.push({ id: res.data[i].id, text: res.data[i].id + ' ' + res.data[i].firstName, image: res.data[i].image });
                        }
                        $scope.DataPatients = data;
                        $("#refinementNumber").select2({
                            data: data,
                            templateResult: formatState,
                            templateSelection: formatState,
                        });
                        if ($scope.PateitnRefimentDefult !== -1) {
                            $("#refinementNumber").val($scope.PateitnRefimentDefult).trigger('change');
                        }
                        else {
                            $("#refinementNumber").val("").trigger('change');
                        }
                    })
                }
            });
        }
        $scope.editForm = () => {
            $scope.EditForm = true;
        }

        $scope.DeleteCases = () => {
            HTTPs.POST(CONFIG.serverUrl + "/P/Delete", { idPatient: this.idPatient }).then(res => {
                res = JSON.parse(res);
                if (res.message == 2003) {
                    Tost.warning("Deleted successfully", "The patient has been removed successfully ", 3000);
                    $scope.$apply(() => {
                        $location.path("/");
                    });
                }
            });
        }

        $scope.doctorPartner = 0;
        $scope.getDoctorIdPartner = () => {
            //getDoctorIdPartner
            HTTPs.POST(CONFIG.serverUrl + "/P/getDoctorIdPartner", {}).then(res => {
                res = JSON.parse(res);
                $scope.$apply(() => {
                    $scope.doctorPartner = res.data[0].Partner
                });
            });
        }

        $scope.getDoctorIdPartner();
    }
}
