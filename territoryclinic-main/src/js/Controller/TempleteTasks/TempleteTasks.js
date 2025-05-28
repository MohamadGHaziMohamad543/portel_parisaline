$ANContreoller.TempleteTasks={
    FUN:['$scope','$location','$routeParams',function($scope,$location,$routeParams) {
    $scope.$emit('AuthChanged', true);

    idAccount=-1;
    //country and City
    $scope.Country="214";
    $scope.CountryItem=[];

    $scope.CitysItemFull=[];
    $scope.CitysItem=[];
    $scope.City="-1";
    $scope.TitleForm="Edit Form";

    var FileUpload=null;

    var delay = $(this).attr('data-delay')?$(this).attr('data-delay'):100; //default is 100
    var time = $(this).attr('data-time')?$(this).attr('data-time'):1200; //default is 1200
        $('[data-plugin="counterup"]').each(function(idx, obj) {
        $(this).counterUp({
            delay: 100,
            time: 1200
        });
        });
        
        var tabel= $('#scroll-vertical-datatable').DataTable({
        "scrollY":"300px",
        "min-height":"200px",
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
        "createdRow": function( row, data, dataIndex ) {

        }
    });
    $scope.GetAll=()=>{
        HTTPs.POST(CONFIG.serverUrl+"/TT/GATT",{}).then(res=>{
            console.log(res);
            res=JSON.parse(res).data;
            tabel.clear().draw();
            res.forEach(row => {
                tabel.row.add([
                    `<a href="/TempleteTasks/${row.id}" class="text-left" style="display: block;">${row.nameTemplete}</a>`,
                    `<a class="text-left" style="display: block;">${row.countryName}</a>`,
                    `<a class="text-left" style="display: block;">${row.cityName}</a>`,
                    `<a class="text-left" style="display: block;"><a class="btn btn-outline-danger" href="TempleteTasks/${row.id}?TS=D${row.id}"><i class="fe-trash"></i></a></a>`,
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
    $scope.Edit=(id)=>{
        $scope.typeForm="Edit";
        HTTPs.POST(CONFIG.serverUrl+"/C/GCI",{id:id})
        .then(res=>{
            res=JSON.parse(res);
            idAccount=id;
            if(res.error==0)
            {
                $scope.$apply(()=>{
                    document.getElementById("nameMediator").value=res.data[0].nameMediator;
                    document.getElementById("email").value=res.data[0].email;
                    document.getElementById("address").value=res.data[0].address;
                    $('#imageUser').attr("src",CONFIG.serverImageUrl+res.data[0].logo);
                    $scope.Country=res.data[0].countryId.toString();
                    iti.setNumber(res.data[0].phoneNumber);
                    $scope.changeCountry(res.data[0].cityId.toString());
                    modal.open();
                });
            }
        });
    }

    $scope.typeForm="Add";
    $scope.Add=()=>{
        $scope.typeForm="Add";
        idAccount=-1;
        $scope.TitleForm="Add a new Templet";
        $('#FormModal input').val("");
        modal.open();
    }


        $scope.getCountrys=()=>{
            $.get("/assets/data/countrys.json", function( data ) {
                $scope.$apply(()=>{
                    $scope.CountryItem=data;
                });
            });
        }
        $scope.getCitys=()=>{
            $.get( "/assets/data/citys.json", function( data ) {
                $scope.$apply(()=>{
                    $scope.CitysItemFull=data;
                    $scope.CitysItem=$scope.CitysItemFull.filter(x=>x.countryId==$scope.Country);
                });
            });
        }
        $scope.getCountrys();
        $scope.getCitys();
        $scope.changeCountry=(id=null)=>{
            $scope.CitysItem=$scope.CitysItemFull.filter(x=>x.countryId==$scope.Country);
            if(id)
            {
                $scope.City=id;
            }
            else{
                $scope.City=$scope.CitysItem[0].id;
            }
        }
        var l = null;
        $scope.CreateAccount=()=>{
            l=Ladda.create(document.querySelector('.ladda-button'));
            var valueForm=Validate(document.getElementById('FormModal'));
            if(!valueForm)
            {
                return false;
            }
            $scope.LoaderForm=true;
            l.start();
            HTTPs.POST(CONFIG.serverUrl+"/TT/CTT",valueForm).then(res=>{
                res=JSON.parse(res);
                if(res.message==2000)
                {
                    Tost.info("Created successfully","Record added successfully",3000);
                    Custombox.modal.close();
                    l.remove();
                    $scope.$apply(()=>{
                        $scope.GetAll();
                    });
                }
                else if(res.message==1001)
                {
                    Tost.warning("Creation Error","Record Already Exists",3000);
                    l.remove();
                }
            });
        }
        var getButton=(id)=>{
            let status=1;
            let item=`
            <div class="btn-group" style="width:100%">
                <button type="button" class="btn dropdown-toggle float-right" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style="color: #6868ab;box-shadow: none;padding: 0px 0px;font-size: 29px;"><i class="mdi mdi-dots-horizontal"></i></button>
                <div class="dropdown-menu dropdown-menu-right">
                <a class="dropdown-item btnEditAccount" data-id="${id}" href="#"><i class="fe-edit"></i> Edit </a>
                </div>
            </div>
                `;
                return item;
        }
        $scope.GetAll();
    }],
    Router:{
        Url:"/TempleteTasks",
        Templete:"Views/TempleteTasks/TempleteTasks.html",
        Render:[
            {link:'assets/libs/datatables/dataTables.bootstrap4.css',type:"CSS"},
            {link:'assets/libs/datatables/responsive.bootstrap4.css',type:"CSS"},
            {link:'assets/libs/datatables/buttons.bootstrap4.css',type:"CSS"},
            {link:'assets/libs/datatables/select.bootstrap4.css',type:"CSS"},
            {link:'assets/libs/switchery/switchery.min.css',type:"CSS"},
            {link:'assets/libs/custombox/custombox.min.js',type:"JS"},
            {link:'assets/libs/custombox/custombox.min.css',type:"CSS"},
            {link:'assets/libs/datatables/jquery.dataTables.min.js',type:"JS"},
            {link:'assets/libs/datatables/dataTables.bootstrap4.js',type:"JS"},
            {link:'assets/libs/datatables/dataTables.responsive.min.js',type:"JS"},
            {link:'assets/libs/datatables/dataTables.select.min.js',type:"JS"},
            {link:'assets/libs/switchery/switchery.min.js',type:"JS"},
            {link:'assets/libs/ladda/ladda-themeless.min.css',type:"CSS"},
            {link:'assets/libs/tellPhone/intlTelInput.min.css',type:"CSS"},
            {link:'assets/libs/tellPhone/intlTelInput.min.js',type:"JS"},
            {link:'assets/libs/jquery-mask-plugin/jquery.mask.min.js',type:"JS"},
            {link:'assets/libs/autonumeric/autoNumeric-min.js',type:"JS"},
            {link:'assets/libs/ladda/spin.js',type:"JS"},
            {link:'assets/libs/ladda/ladda.js',type:"JS"},
            {link:'assets/libs/parsleyjs/parsley.min.js',type:"JS"},
        ],
        AUTH:true
    }
}