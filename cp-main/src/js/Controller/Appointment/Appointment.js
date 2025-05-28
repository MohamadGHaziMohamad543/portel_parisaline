var CONT_Appoentment=function($scope,$location,$sce,$rootScope,$cookies) {
    this.$onInit = function () {
        $scope.AppointmentZohoId = '-1';
        $scope.AppointmentStatus = 0;
        $scope.SoldTreatment = -1;
        var tabel = $('#AppointmentTable').DataTable({
            "scrollY": "300px",
            "min-height": "200px",
            "lengthMenu": [100],
            "order": [[0, "desc"]],
            "pagingType": "full_numbers",
            "language": {
                "paginate": {
                    "previous": "<i class='mdi mdi-chevron-left'>",
                    "next": "<i class='mdi mdi-chevron-right'>"
                }
            },
            "drawCallback": function () {
                $('.dataTables_paginate > .pagination').addClass('pagination-rounded');
            },
            "createdRow": function (row, data, dataIndex) {
                row.querySelector('.btnEdit').addEventListener("click", (e) => {
                    $scope.$apply(() => {
                        $scope.Edit(e.currentTarget.getAttribute("zid"));
                    })
                });
            }
        });

        function calculateAge(birthDate) {
            // تحويل تاريخ الميلاد إلى كائن تاريخ
            const birthDateObj = new Date(birthDate);
            // تاريخ اليوم
            const today = new Date();

            // حساب الفارق بالسنوات
            let age = today.getFullYear() - birthDateObj.getFullYear();

            // التحقق إذا كانت تاريخ الميلاد لم يمر بعد هذا العام
            const monthDiff = today.getMonth() - birthDateObj.getMonth();
            if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDateObj.getDate())) {
                age--;
            }

            return age;
        }
        function getStatusAppentment(status) {
            //0:New Appointment ;1:Arrived ;2:Sold;3:No Show
            let st = "";
            let color = "";
            if (status == 0) {
                st = 'New Appointment';
                color = "#057005";
            }
            else if (status == 1) {
                st = 'Arrived';
                color = "#6d6dd3";
            }
            else if (status == 2) {
                st = 'Sold';
                color = "#e5098e";
            }
            else if (status == 3) {
                st = 'No Show';
                color = "#808080";
            }
            else if (status == 4) {
                st = 'Cancelled';
                color = "#808080";
            }
            return `<span class="Draft" style="background: ${color};text-align: center;text-shadow: 1px 1px 2px #000;color:#fff;width: 100%;display: block;padding: 6px 6px;">${st}</span>`
        }

        $scope.dataCurrancy = [];
        $scope.GetAllCurancy = () => {
            HTTPs.POST(CONFIG.serverUrl + "/CURR/GET", {}).then(res => {
                res = JSON.parse(res);
                $scope.$apply(() => {
                    $scope.dataCurrancy = res.data;
                })
            });
        }

        $scope.GetAllCurancy();
        
        $scope.data = [];
        $scope.CuurancyDefault = -1;
        $scope.GetAll = () => {
            tabel.clear().draw();
            HTTPs.POST(CONFIG.serverUrl + "/Appoentment/GETAll", { filters: this.filters, dateFilter: new Date().toISOString().split("T")[0] })
                .then(res => {
                    res = JSON.parse(res);
                    $scope.$apply(() => {
                        $scope.data = res.data;
                        if (res.data.length !== 0) {
                            $scope.CuurancyDefault = res.data[0].currencyId
                        }
                    })
                    for (let i = 0; i < res.data.length; i++) {
                        let dateTime = res.data[i].AppointmentDate.split('T');
                        let date = dateTime[0];
                        let Time = dateTime[1].split('.0')[0];
                        tabel.row.add([
                            `<main>${res.data[i].ReferenceZohoId}</main>`,
                            `<min style="    width: 100%;text-align: left;display: block;;"><img src="${CONFIG.serverImageUrl + res.data[i].logo}">${res.data[i].nameDoctor} </min>`,
                            `<min style="    width: 100%;text-align: left;display: block;;"><img src="${CONFIG.serverImageUrl + res.data[i].PatientImage}">${res.data[i].PatientName} </min>`,
                            `${calculateAge(res.data[i].PateintDateofBirth)}`,
                            `<main>${res.data[i].PateintGeneder == '1' ? 'Male' : 'Female'}</main>`,
                            `<main>${new Date(date).toDateString() + ' ' + Time}</main>`,
                            `<main>${getStatusAppentment(res.data[i].AppointmentStatus)}</main>`,
                            `<main><button zid="${res.data[i].AppointmentZohoId}" class="btn btnContinue float-left btnEdit"  style="
                            padding: 5px 14px;
                            font-size: 13px;
                            background: #960c7f;
                            border: 1px solid #960c7f;
                        "><i class="mdi mdi-eye-outline"></i>View</button></main>`,
                        ]).draw();
                    }
                });
        }
        $scope.dataEdit = {};
        $scope.UServer = CONFIG.serverImageUrl;
        $scope.Edit = (zohoid) => {
            $scope.AppointmentZohoId = zohoid;
            let dataEdit = $scope.data.find(x => x.AppointmentZohoId == zohoid);
            $scope.dataEdit = dataEdit;
            try {
                let dateTime = dataEdit.AppointmentDate.split('T');
                let date = dateTime[0];
                let Time = dateTime[1].split('.0')[0];
                dataEdit.AppointmentDate = new Date(date).toDateString() + ' ' + Time;
            } catch (e) {

            }
            $scope.AppointmentStatus = dataEdit.AppointmentStatus;
            $('#AppointmentStatus').val(dataEdit.AppointmentStatus);
            $('#NotesByClinic').val(dataEdit.NotesByClinic);
            if ($scope.AppointmentStatus == 2) {
                setTimeout(() => {
                    $('#SoldPrice').val(dataEdit.SoldPrice);
                    $('#AmountPaid').val(dataEdit.AmountPaid);
                    $('#SoldTreatment').val(dataEdit.SoldTreatment);
                    $('#SoldPriceCurrencycode').val(dataEdit.SoldPriceCurrencycode);
                    $('#AmountPaidCurrencycode').val(dataEdit.AmountPaidCurrencycode);
                }, 500);
            }
            $('#modelAppoentment').modal('show');
        }

        $scope.GetAll();
        $('#AppointmentStatus').change((e) => {
            $scope.$apply(() => {
                $scope.AppointmentStatus = e.currentTarget.value;
            })
        });
        $scope.RenderSoldTreatment = () => {
            $('#SoldTreatment').change((e) => {
                $scope.$apply(() => {
                    $scope.SoldTreatment = e.currentTarget.value;
                })
            });
        }

        $scope.RenderspanTogel = () => {
            $('[data-toggle="popover"]').popover();
        }

        $scope.UpdateStatus = () => {
            var valueForm = Validate(document.getElementById('modelAppoentment'));
            if (!valueForm) {
                return;
            }
            valueForm['AppointmentZohoId'] = $scope.AppointmentZohoId;
            HTTPs.POST(CONFIG.serverUrl + "/Appointment/UpdateStausAppointment", valueForm).then(res => {
                res = JSON.parse(res);
                if (res.message == 2000) {
                    $('#modelAppoentment').modal('hide');
                    if (res.id != -1) {
                        $scope.$apply(() => {
                            $location.path("/Cases/" + $CRID.TO(res.id.toString()));
                        });
                    }
                    else {
                        $scope.$apply(() => {
                            $scope.GetAll();
                        });
                    }
                }
            });
        }

        $scope.GenrateDateAndTime = (dateANdTime) => {
            return dateANdTime.split("T")[0] + ' ' + dateANdTime.split("T")[1];
        }

    }
}

adminApp.controller('comappointment', ['$scope','$location','$sce','$rootScope','$cookies',CONT_Appoentment]);

adminApp.component('comappointment', {
    bindings: { 
        filters: '@'
    },
    templateUrl: 'Views/Appointment/Appointment.html',
    controller: 'comappointment'
});