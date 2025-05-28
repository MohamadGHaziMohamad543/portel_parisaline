$ANContreoller.Doctors = {
    FUN: ['$scope', '$location', '$cookies', '$routeParams', function ($scope, $location, $cookies, $routeParams) {
        $scope.$emit('AuthChanged', true);

        idAccount = -1;
        //country and City
        $scope.Country = "219";
        $scope.CountryItem = [];

        $scope.CitysItemFull = [];
        $scope.CitysItem = [];
        $scope.City = "";
        $scope.TitleForm = "Edit Form";

        var FileUpload = null;


        $scope.dataCurrancy = [];
        $scope.GetAllCurancy = () => {
            HTTPs.POST(CONFIG.serverUrl + "/CURR/GET", {}).then(res => {
                res = JSON.parse(res);
                $scope.$apply(()=>{
                    $scope.dataCurrancy = res.data;
                    console.log( $scope.dataCurrancy);
                })
            });
        }

        $scope.GetAllCurancy();

        var delay = $(this).attr('data-delay') ? $(this).attr('data-delay') : 100; //default is 100
        var time = $(this).attr('data-time') ? $(this).attr('data-time') : 1200; //default is 1200
        $('[data-plugin="counterup"]').each(function (idx, obj) {
            $(this).counterUp({
                delay: 100,
                time: 1200
            });
        });

        var tabel = $('#scroll-vertical-datatable').DataTable({
            "scrollY": "300px",
            "min-height": "200px",
            "scrollCollapse": true,
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
                new Switchery($(row).find('[data-plugin="switchery"]')[0], $(row).find('[data-plugin="switchery"]').data());
                $(row).find('[data-plugin="switchery"]').on("change", (e) => {
                    let status = false;
                    if (e.target.checked) {
                        status = true;
                    }
                    HTTPs.POST(CONFIG.serverUrl + "/D/USD", { id: $(row).find('[data-plugin="switchery"]').attr("data-id"), status: status }).then(res => {
                        res = JSON.parse(res);
                        if (res.data == $(row).find('[data-plugin="switchery"]').attr("data-id")) {
                            if (status) {
                                Tost.info("activated", "The account has been activated", 3000);
                            }
                            else {
                                Tost.warning("disabled", "The account has been disabled", 3000);
                            }
                        }
                    });
                })
                $(row).find('.btnEditAccount').click((e) => {
                    $scope.$apply(() => {
                        $scope.Edit($(e.target).attr('data-id'));
                    })
                });
            }
        });
        $scope.GetAll = () => {
            HTTPs.POST(CONFIG.serverUrl + "/D/GAD", {}).then(res => {
                res = JSON.parse(res).data;
                tabel.clear().draw();

                res.forEach(row => {
                    tabel.row.add([
                        `<a class="text-left" style="display: block;"><img src="${row.logo.split("https://").length == 2 ? row.logo : CONFIG.serverImageUrl + row.logo}">${row.nameDoctor}</a>`,
                        `<a class="text-center" style="display: block;">${row.email}</a>`,
                        `<a class="text-center" style="display: block;">${row.countryName}</a>`,
                        `<a class="text-center" style="display: block;">${row.cityName}</a>`,
                        `<a class="text-center" style="display: block;"> <input type="checkbox" ${row.status == 1 ? 'checked' : ''} data-plugin="switchery" data-id="${row.id}" data-color="#1bb99a" data-secondary-color="#ff5d48" data-size="small"/></a>`,
                        `${getButton(row.id)}`
                    ]).draw();
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
        $scope.Edit = (id) => {
            Reloader.Start('#FormModal');
            $scope.typeForm = "Edit";
            HTTPs.POST(CONFIG.serverUrl + "/D/GDI", { id: id })
                .then(res => {
                    res = JSON.parse(res);
                    idAccount = id;
                    if (res.error == 0) {
                        $scope.$apply(() => {
                            document.getElementById("nameDoctor").value = res.data[0].nameDoctor;
                            document.getElementById("email").value = res.data[0].email;
                            document.getElementById("address").value = res.data[0].address;
                            document.getElementById("Membership").value = res.data[0].Membership;
                            document.getElementById("currencyId").value = res.data[0].currencyId;
                            document.getElementById("Partner").checked = res.data[0].Partner == 0 ? false : true;
                            document.getElementById("ShowAddressToLap").checked = res.data[0].ShowAddressToLap == 0 ? false : true;
                            $('#imageUser').attr("src", (res.data[0].logo.split("https://").length == 2 ? res.data[0].logo : CONFIG.serverImageUrl + res.data[0].logo));
                            $scope.Country = res.data[0].countryId.toString();
                            $scope.changeCountry(res.data[0].cityId.toString());
                            setTimeout(() => {
                                iti.setNumber(res.data[0].phoneNumber);
                                iti.setNumber(res.data[0].phoneNumber);
                                Reloader.Stop('#FormModal');
                            }, 1000);
                            $('#byTerritoryId').val(res.data[0].byTerritoryId);
                            modal.open();
                        });
                    }
                });
        }

        $scope.typeForm = "Add";
        $scope.Add = () => {
            $scope.typeForm = "Add";
            idAccount = -1;
            $scope.TitleForm = "Add a new Account";
            $('#FormModal input').val("");
            $('#FormModal textarea').val("");
            $('#FormModal img').attr("src", "assets/images/attached-files/avatarImage.jpeg");
            var ev = {};
            ev.target = document.getElementById("phone");
            placHolder(ev);
            iti.setNumber("");
            modal.open();
        }



        var input = document.querySelector("#phone");
        var errorMap = ["Invalid number", "Invalid country code", "Too short", "Too long", "Invalid number"];

        // initialise plugin
        var iti = window.intlTelInput(input, {
            initialCountry: "auto",
            geoIpLookup: function (callback) {

                $.get('https://ipinfo.io/json?token=185e80a0d228c6', function () { }, "json").always(function (resp) {
                    var countryCode = (resp && resp.country) ? resp.country : "us";
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
           // $(input).mask("000000000000000000000");
        });
        input.addEventListener("countrychange", function (e) {
            e.target.value = "";
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
               // $(input).mask(mask);
            }
        }


        $scope.getCountrys = () => {

            HTTPs.POST(CONFIG.serverUrl + "/CC/GCU", {})
                .then(res => {
                    res = JSON.parse(res);
                    if (res.error == 0) {
                        $scope.$apply(() => {
                            $scope.CountryItem = res.data;
                            console.log($scope.CountryItem);
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
                        });
                    }
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

        $scope.saveAccount = () => {
            l = Ladda.create(document.querySelector('.ladda-button'));
            var valueForm = Validate(document.getElementById('FormModal'));
            if (!valueForm) {
                return false;
            }
            if (!iti.isValidNumber()) {
                $('#phone').addClass("errorInput");
                $('#phone').removeClass("sucssInput");
                $('.ErrorMessagePhone').text($('.ErrorMessagePhone').attr("titleError"));
                return;
            }
            else {
                $('#phone').removeClass("errorInput");
                $('#phone').addClass("sucssInput");
            }
            valueForm['phoneNumber'] = iti.getNumber();
            valueForm['Partner'] = document.getElementById('Partner').checked;
            valueForm['ShowAddressToLap'] = document.getElementById('ShowAddressToLap').checked;
            valueForm['id'] = idAccount;
            $scope.LoaderForm = true;
            var dataF = new FormData();
            dataF.append("fileData", FileUpload);
            Reloader.Start('#FormModal');
            l.start();
            HTTPs.POST(CONFIG.serverUrl + "/D/UPD", dataF, valueForm).then(res => {
                res = JSON.parse(res);
                if (res.error == 0) {
                    Tost.info("Updated successfully", "Records have been updated", 3000);
                    Reloader.Stop('#FormModal');
                    Custombox.modal.close();
                    l.remove();
                    $scope.$apply(() => {
                        $scope.GetAll();
                    });
                }
            });
        }
        var l = null;
        $scope.CreateAccount = () => {
            l = Ladda.create(document.querySelector('.ladda-button'));
            var valueForm = Validate(document.getElementById('FormModal'));
            if (!valueForm) {
                return false;
            }
            if (!iti.isValidNumber()) {
                $('#phone').addClass("errorInput");
                $('#phone').removeClass("sucssInput");
                $('.ErrorMessagePhone').text($('.ErrorMessagePhone').attr("titleError"));
                return;
            }
            else {
                $('#phone').removeClass("errorInput");
                $('#phone').addClass("sucssInput");
            }
            valueForm['phoneNumber'] = iti.getNumber();
            valueForm['Partner'] = document.getElementById('Partner').checked;
            $scope.LoaderForm = true;
            var dataF = new FormData();
            dataF.append("fileData", FileUpload);
            l.start();
            HTTPs.POST(CONFIG.serverUrl + "/D/CD", dataF, valueForm).then(res => {
                res = JSON.parse(res);
                if (res.message == 2000) {
                    Tost.info("Created successfully", "Record added successfully", 3000);
                    Custombox.modal.close();
                    l.remove();
                    $scope.$apply(() => {
                        $scope.GetAll();
                    });
                }
                else if (res.message == 1001) {
                    Tost.warning("Creation Error", "Email Already Exists", 3000);
                    l.remove();
                }
            });
        }
        document.getElementById('fileImageUser').addEventListener("change", (file) => {
            var input = file.target;

            var reader = new FileReader();
            reader.onload = function () {
                $('#imageUser').attr("src", reader.result);
            };
            FileUpload = input.files[0];
            reader.readAsDataURL(input.files[0]);
        });
        var getButton = (id) => {
            let status = 1;
            let item = `
                <div class="btn-group" style="width:100%">
                    <button type="button" class="btn dropdown-toggle float-right" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style="color: #6868ab;box-shadow: none;padding: 0px 0px;font-size: 29px;"><i class="mdi mdi-dots-horizontal"></i></button>
                    <div class="dropdown-menu dropdown-menu-right">
                    <a class="dropdown-item btnEditAccount" data-id="${id}" href="#"><i class="fe-edit"></i> Edit </a>
                    </div>
                </div>
                    `;
            return item;
        }

        $scope.TerritoryUsers = [];
        $scope.getAllTerritory = () => {
            HTTPs.POST(CONFIG.serverUrl + "/TEM/GATM", {}).then(res => {
                res = JSON.parse(res).data;
                $scope.$apply(() => {
                    $scope.TerritoryUsers = res;
                });
            });
        }

        $scope.Memberships = [];
        $scope.getAllMembership = () => {
            HTTPs.POST(CONFIG.serverUrl + "/MM/GAM", {}).then(res => {
                res = JSON.parse(res);
                console.log(res);
                $scope.$apply(() => {
                    $scope.Memberships = res;
                });
            });
        }
        $scope.getAllMembership();
        $scope.getAllTerritory();
        $scope.GetAll();
    }],
    Router: {
        Url: "/Doctors",
        Templete: "Views/Doctors/Doctors.html",
        Render: [
            { link: 'assets/libs/datatables/dataTables.bootstrap4.css', type: "CSS" },
            { link: 'assets/libs/datatables/responsive.bootstrap4.css', type: "CSS" },
            { link: 'assets/libs/datatables/buttons.bootstrap4.css', type: "CSS" },
            { link: 'assets/libs/datatables/select.bootstrap4.css', type: "CSS" },
            { link: 'assets/libs/switchery/switchery.min.css', type: "CSS" },
            { link: 'assets/libs/custombox/custombox.min.css', type: "CSS" },
            { link: 'assets/libs/datatables/jquery.dataTables.min.js', type: "JS" },
            { link: 'assets/libs/datatables/dataTables.bootstrap4.js', type: "JS" },
            { link: 'assets/libs/datatables/dataTables.select.min.js', type: "JS" },
            { link: 'assets/libs/switchery/switchery.min.js', type: "JS" },
            { link: 'assets/libs/custombox/custombox.min.js', type: "JS" },
            { link: 'assets/libs/ladda/ladda-themeless.min.css', type: "CSS" },
            { link: 'assets/libs/tellPhone/intlTelInput.min.css', type: "CSS" },
            { link: 'assets/libs/tellPhone/intlTelInput.min.js', type: "JS" },
            { link: 'assets/libs/jquery-mask-plugin/jquery.mask.min.js', type: "JS" },
            { link: 'assets/libs/autonumeric/autoNumeric-min.js', type: "JS" },
            { link: 'assets/libs/ladda/spin.js', type: "JS" },
            { link: 'assets/libs/ladda/ladda.js', type: "JS" },
            { link: 'assets/libs/parsleyjs/parsley.min.js', type: "JS" },
        ],
        AUTH: true
    }
}