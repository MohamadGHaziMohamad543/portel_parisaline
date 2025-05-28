$ANContreoller.home = {
    FUN: ['$scope', '$location', '$cookies', function ($scope, $location, $cookies) {
        $scope.$emit('AuthChanged', true);
        var delay = $(this).attr('data-delay') ? $(this).attr('data-delay') : 100; //default is 100
        var time = $(this).attr('data-time') ? $(this).attr('data-time') : 1200; //default is 1200
        $('[data-plugin="counterup"]').each(function (idx, obj) {
            $(this).counterUp({
                delay: 100,
                time: 1200
            });
        });

        var isAuthenticated = $cookies.get('PULAB') ? JSON.parse($cookies.get('PULAB')) : false;
        var visibleClome = false;
        var shortNameDoctor = false;
        $scope.showPation = true;
        if (isAuthenticated.email == "info@parisaline.com" || isAuthenticated.email == "demosaudilab@yopmail.com") {
            visibleClome = true;
        }

        if (isAuthenticated.email == "demosaudilab@yopmail.com") {
            shortNameDoctor = true;
        }
        if (isAuthenticated.email == "demouaelab@yopmail.com") {
            $scope.showPation = false;
        }
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
            "columnDefs": [
                {
                    "targets": [2],
                    "visible": $scope.showPation,
                    "searchable": $scope.showPation
                },
                {
                    "targets": [3],
                    "visible": visibleClome,
                    "searchable": visibleClome
                }
            ],
            "drawCallback": function () {
                $('.dataTables_paginate > .pagination').addClass('pagination-rounded');
            },
        });
        $scope.dataCount = null;
        HTTPs.POST(CONFIG.serverUrl + "/Count", {}).then(res => {
            res = JSON.parse(res);
            if (res.error == 0) {
                $scope.$apply(() => {
                    $scope.dataCount = res.data[0];
                });
            }
        });
        //load All Cases

        HTTPs.POST(CONFIG.serverUrl + "/GAPWI", {}).then(res => {
            res = JSON.parse(res);
            res.forEach(row => {
                let date = new Date(row.createdAt);
                let ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(date);
                let mo = new Intl.DateTimeFormat('en', { month: 'short' }).format(date);
                let da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(date);
                tabel.row.add([
                    `<a href="/Cases/${$CRID.TO(row.id.toString())}" style="width:100%;text-align:center;display: block;"><min style="background:${row.CountPatientByDoctor === 1 ? '#5b0404' : '#0000'}; color: #fff;    width: 50px; padding: 5px; transform: rotateZ(270deg); display: inline-block;font-size: 10px;height: 25px;">${row.CountPatientByDoctor === 1 ? '1st Case' : ''}</min> ${row.id}</a>`,
                    `<min style="width:100%;text-align:center;display: block;">${da}-${mo}-${ye}  ${date.getHours()}:${date.getMinutes()}</min>`,
                    `<img src="${CONFIG.serverImageUrl + row.image}">${row.firstName + ' ' + row.lastName}`,
                    `<img src="${imageUser(row.logo)}">${shortNameDoctor ? renderDoctor(row.nameDoctor) : row.nameDoctor}`,
                    `<storage style="background: ${row.color};color: #fff;text-shadow: 1px 1px 8px #000;padding: 9px;border-radius: 10px;">${row.nameStage}</storage>`,
                    `<a style="width:100%;text-align:center;display: block;">${row.View == 1 ? 'Opened' : 'Not Started'}</a>`,
                    `<a style="width:100%;text-align:center;display: block;" href="/Cases/${$CRID.TO(row.id.toString())}">View Case</a>`,
                ]).draw();
            });
        });

        function renderDoctor(nameDoctor) {
            let firstName = nameDoctor.replace("DR ", '').
                replace("DR.", '').
                replace("dr ", '').
                replace("dr.", '').
                replace("Dr ", '').
                replace("Dr.", '');
            return firstName.split(' ', 2)[0][0] + "**** " + (firstName.split(' ').length > 1 ? firstName.split(' ')[firstName.split(' ').length - 1] : '');
        }
        function imageUser(image) {
            if (image) {
                let img = "";
                if (image.split('googleusercontent').length == 1) {
                    img = CONFIG.serverImageUrl + image;
                }
                else {
                    img = image;
                }
                return img;
            }
            else {
                return "";
            }
        }

        var getStatusCases = (status) => {
            if (status == null) {
                return '<span class="Draft">Case Draft</span>';//Draft
            }
            else if (status == 0) {
                return '<span class="Draft">Case Draft</span>';//darft
            }
            else if (status == 1) {
                return '<span class="Processing">Records Processing</span>';//Records Processing
            }
            else if (status == 2) {
                return '<span class="TreatmentSetup">Treatment Setup</span>';//TreatmentSetup
            }
            else if (status == 3) {
                return '<span class="Revision">Case Revision</span>';//Case Revision
            }
            else if (status == 4) {
                return '<span class="Approval">Your Approval</span>';//Your Approval
            }
            else if (status == 5) {
                return '<span class="Fabrication">Case Fabrication</span>';//Case Fabrication
            }
            else if (status == 6) {
                return '<span class="Delivered">Case Delivered</span>';//Case Delivered
            }
            else if (status == 7) {
                return '<span class="Completed">Case Completed</span>';//Completed
            }
        }


    }
    ],
    Router: {
        Url: "/",
        Templete: 'Views/home.html',
        Render: [
            { link: 'assets/libs/datatables/dataTables.bootstrap4.css', type: "CSS" },
            { link: 'assets/libs/datatables/responsive.bootstrap4.css', type: "CSS" },
            { link: 'assets/libs/datatables/buttons.bootstrap4.css', type: "CSS" },
            { link: 'assets/libs/datatables/select.bootstrap4.css', type: "CSS" },
            { link: 'assets/libs/datatables/jquery.dataTables.min.js', type: "JS" },
            { link: 'assets/libs/datatables/dataTables.bootstrap4.js', type: "JS" },
            { link: 'assets/libs/datatables/dataTables.responsive.min.js', type: "JS" },
            { link: 'assets/libs/datatables/dataTables.select.min.js', type: "JS" },
        ],
        AUTH: true
    }
};
