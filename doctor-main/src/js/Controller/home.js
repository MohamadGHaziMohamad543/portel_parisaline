var CONT_home = function ($scope, $location, $cookies) {
    $scope.$emit('AuthChanged', true);
    $scope.dreft = 0
    $scope.Revision = 0;
    $scope.PatientRecordsProcessing = 0;
    $scope.YourApproval = 0;
    $scope.TreatmentSetup = 0;
    $scope.ApplianceFabrication = 0;
    $scope.Completed = 0;
    var tabel = $('#scroll-vertical-datatable').DataTable({
        "scrollY": "300px",
        "min-height": "200px",
        "order": [[0, "desc"]],
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
        }
    });


    //load Count Cases with status 
    HTTPs.POST(CONFIG.serverUrl + "/P/Count", {}).then(res => {
        res = JSON.parse(res);
        if (res.message == 2001) {
            $scope.$apply(() => {
                $scope.dreft = res.data[0].dreft;
                $scope.countStage = res.data[0];
                $scope.StageNames = res.stage.sort((a, b) => a.sort - b.sort);
                $scope.Completed = res.data[0].Completed;
                $scope.Total = res.data[0].Total;
                setTimeout(() => {
                    $('.boxStatus').click(function (e) {
                        if ("Total Cases" != $(this).find("a").html()) {
                            $('input[type="search"]').val($(this).find("a").html());
                            tabel.search($(this).find("a").html()).draw();
                        }
                        else {
                            $('input[type="search"]').val("");
                            tabel.search("").draw();
                        }

                        activeSlectBox($(this).find("a").html());
                    });
                }, 300)
            })
        }
    });

    //load All Cases


    $scope.StageCases = [];
    $scope.getAllCasesStage = () => {
        HTTPs.POST(CONFIG.serverUrl + "/CA/ST", {}).then(res => {
            res = JSON.parse(res);
            if (res.error == 0) {
                $scope.$apply(() => {
                    $scope.StageCases = res.data;
                    HTTPs.POST(CONFIG.serverUrl + "/P/GetAll", {}).then(res => {
                        res = JSON.parse(res);
                        res.forEach(row => {
                            let date = new Date(row.createdAt);
                            let ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(date);
                            let mo = new Intl.DateTimeFormat('en', { month: 'short' }).format(date);
                            let da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(date);
                            tabel.row.add([
                                `<a href="/Cases/${$CRID.TO(row.id.toString())}">${row.id}</a>`,
                                `<a href="/Cases/${$CRID.TO(row.type == 0 ? row.id.toString() : row.refinementNumber.toString())}">${row.type == 0 ? 'New Patient' : row.type == 1 ? 'Refinement ' + row.refinementNumber : 'Retainer ' + row.refinementNumber}</a>`,
                                `${da}-${mo}-${ye}  ${date.getHours()}:${date.getMinutes()}`,
                                `<min style="    width: 100%;text-align: left;display: block;;"><img src="${CONFIG.serverImageUrl + row.image}">${row.firstName + ' ' + row.lastName} </min>`,
                                getStatusCases(row.caseStatus),
                                getButton(row.caseStatus, `/Cases/${$CRID.TO(row.id.toString())}`, row.TrackingNumber),
                            ]).draw();
                        });
                    });
                });

            }
        });
    };
    $scope.getAllCasesStage();
    var getStatusCases = (status) => {
        if (status == null) {
            return '<span class="Draft">Case Draft</span>';//Draft
        }
        else {
            let nameStage = "";
            let color = "";
            $scope.StageCases.forEach(res => {
                if (parseInt(res.numberStage) === parseInt(status)) {
                    nameStage = res.nameStage;
                    color = res.color;
                }
            });
            return '<span class="Draft" style="background: ' + color + ';text-shadow: 1px 1px 2px #000;color:#fff">' + nameStage + '</span>';//Draft
        }
    }

    var getButton = (status, link, trakingNumber) => {
        1111274872
        210221580030
        let item = `
                <div class="btn-group" style="width:100%">
                    <button type="button" class="btn dropdown-toggle float-right" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style="color: #6868ab;box-shadow: none;padding: 0px 0px;font-size: 29px;"><i class="mdi mdi-dots-horizontal"></i></button>
                    <div class="dropdown-menu dropdown-menu-right">
                        <a class="dropdown-item" href="${link}"><i class="fe-user"></i> View Patient</a>
                        `+ ((status >= 0 && status != null) ? `<a class="dropdown-item" href="${link}?TB=AdditionalInstructions"><i class="fe-message-square"></i> Additional Instructions</a>` : '') + `
                        `+ ((status > 3 && status != null) ? `<a class="dropdown-item" href="${link}?TB=tretmentPlan"><i class="fe-eye"></i> View Treatment Plan</a>` : '') + `
                        `+ ((status == 0 || status == null) ? `<a class="dropdown-item" href="${link}?D=T"><i class="fe-trash"></i> Delete</a>` : '') + `
                        `+ (trakingNumber ? `<a class="dropdown-item" href="${trakingNumber.length > 10 ? `https://www.smsaexpress.com/tr/trackingdetails?tracknumbers%5B0%5D=${trakingNumber}` : `https://www.dhl.com/us-en/home/tracking/tracking-express.html?submit=1&tracking-id=${trakingNumber}`}" target="_blank"><img src="https://iconape.com/wp-content/png_logo_vector/shipping-fast.png" style="    width: 20px;height: auto; margin-left: -4px; border: none; margin: 0;border-radius: 0; opacity: 0.40;"> Track your shipment</a>` : '') + `
                    </div>
                </div>
        `;
        return item;
    }



    var activeSlectBox = (title) => {
        document.querySelectorAll(".boxStatus").forEach(res => {
            if (res.querySelector("a").innerHTML == title) {
                if (res.querySelector("svg rect")) {
                    res.style.border = "1px solid " + res.querySelector("svg rect").getAttribute("fill");
                }
            }
            else {
                res.style.border = "none";
            }
        });
    }
}
