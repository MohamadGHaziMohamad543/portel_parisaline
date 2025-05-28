$ANContreoller.Dcotors={
    FUN:['$scope','$location',function($scope,$location){
        $scope.$emit('AuthChanged', true);

        //GAD
        $scope.titletest="WELCOME TO KIVEN";
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
            }
        });
    
        //load All Doctors
        $scope.getAllDoctors=()=>{
            HTTPs.POST(CONFIG.serverUrl+"/GAD",{}).then(res=>{
                tabel.clear().draw();
                res=JSON.parse(res);
                res.forEach(row => {
                    tabel.row.add([
                        `<a href="#" style="width:100%;text-align:center;display: block;">${row.id}</a>`,
                        `<img src="${CONFIG.serverImageUrl+row.logo}">${row.nameDoctor}`,
                        `<a style="text-align:center;display: block;">${row.CountPatients}</a>`,
                        `<a style="text-align:center;display: block;">${row.CountInvoices}</a>`,
                        `<a style="text-align:center;display: block;">${row.DelverdCases}</a>`,
                        `<a style="text-align:center;display: block;">${getStatusDoctors(row.status)}</a>`,
                        `${getButton(row.status,row.id)}`,
                    ]).draw(); 
                    
                });
                RenderEventButton();
            });
        }
    
        var getStatusDoctors=(status)=>{
            if(status==0)
            {
                return '<span class="DoctorStopped">Doctor Stopped</span>';//Draft
            }
            else if(status==1){
                return '<span class="DoctorActivted">Doctor Activated</span>';//darft
            }
        }
        var getButton=(status,id)=>{
            let item=`
                    <div class="btn-group" style="width:100%">
                        <button type="button" class="btn dropdown-toggle float-right" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style="color: #6868ab;box-shadow: none;padding: 0px 0px;font-size: 29px;"><i class="mdi mdi-dots-horizontal"></i></button>
                        <div class="dropdown-menu dropdown-menu-right">
                            `+((status == 1)?`<a class="dropdown-item btnClickStoped" data-id="${id}" href="#">
                            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 65.518 65.518" style="width:11px;fill: red; " xml:space="preserve">
                                    <g>
                                        <path d="M32.759,0C14.696,0,0,14.695,0,32.759s14.695,32.759,32.759,32.759s32.759-14.695,32.759-32.759S50.822,0,32.759,0z    M6,32.759C6,18.004,18.004,6,32.759,6c6.648,0,12.734,2.443,17.419,6.472L12.472,50.178C8.443,45.493,6,39.407,6,32.759z    M32.759,59.518c-5.948,0-11.447-1.953-15.895-5.248l37.405-37.405c3.295,4.448,5.248,9.947,5.248,15.895   C59.518,47.514,47.514,59.518,32.759,59.518z"/>

                                    </svg>
                            
                            Stop </a>`:'')+`
                            `+((status == 0)?`<a class="dropdown-item btnClickActive" data-id="${id}" href="#">
                            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 117.72 117.72" style="width:11px;fill: green; " xml:space="preserve">
                            <g><path class="st0" d="M58.86,0c9.13,0,17.77,2.08,25.49,5.79c-3.16,2.5-6.09,4.9-8.82,7.21c-5.2-1.89-10.81-2.92-16.66-2.92 c-13.47,0-25.67,5.46-34.49,14.29c-8.83,8.83-14.29,21.02-14.29,34.49c0,13.47,5.46,25.66,14.29,34.49 c8.83,8.83,21.02,14.29,34.49,14.29s25.67-5.46,34.49-14.29c8.83-8.83,14.29-21.02,14.29-34.49c0-3.2-0.31-6.34-0.9-9.37 c2.53-3.3,5.12-6.59,7.77-9.85c2.08,6.02,3.21,12.49,3.21,19.22c0,16.25-6.59,30.97-17.24,41.62 c-10.65,10.65-25.37,17.24-41.62,17.24c-16.25,0-30.97-6.59-41.62-17.24C6.59,89.83,0,75.11,0,58.86 c0-16.25,6.59-30.97,17.24-41.62S42.61,0,58.86,0L58.86,0z M31.44,49.19L45.8,49l1.07,0.28c2.9,1.67,5.63,3.58,8.18,5.74 c1.84,1.56,3.6,3.26,5.27,5.1c5.15-8.29,10.64-15.9,16.44-22.9c6.35-7.67,13.09-14.63,20.17-20.98l1.4-0.54H114l-3.16,3.51 C101.13,30,92.32,41.15,84.36,52.65C76.4,64.16,69.28,76.04,62.95,88.27l-1.97,3.8l-1.81-3.87c-3.34-7.17-7.34-13.75-12.11-19.63 c-4.77-5.88-10.32-11.1-16.79-15.54L31.44,49.19L31.44,49.19z"/></g></svg>
                            
                            Active </a>`:'')+`
                        </div>
                    </div>
            `;
            return item;
        }
        var RenderEventButton=()=>{
            $('.btnClickStoped').click((e)=>{
                stopDoctor($(e.target).attr("data-id"));
            });
            $('.btnClickActive').click((e)=>{
                ActiveDoctor($(e.target).attr("data-id"));
            });
        }
        var stopDoctor=(id)=>{
            HTTPs.POST(CONFIG.serverUrl+"/STD",{id:id,staus:0}).then(res=>{
                res=JSON.parse(res);
                if(res.data==id)
                {
                    $scope.$apply(()=>{
                        $scope.getAllDoctors();
                    });
                }
            });
        }
        var ActiveDoctor=(id)=>{
            HTTPs.POST(CONFIG.serverUrl+"/ACD",{id:id,staus:0}).then(res=>{
                res=JSON.parse(res);
                if(res.data==id)
                {
                    $scope.$apply(()=>{
                        $scope.getAllDoctors();
                    });
                }
            });
        }

        $scope.getAllDoctors();
    }],
    Router:{
        Url:"/Doctors",
        Templete:"Views/Doctors/Doctors.html",
        Render:[            
        {link:'assets/libs/datatables/dataTables.bootstrap4.css',type:"CSS"},
        {link:'assets/libs/datatables/responsive.bootstrap4.css',type:"CSS"},
        {link:'assets/libs/datatables/buttons.bootstrap4.css',type:"CSS"},
        {link:'assets/libs/datatables/select.bootstrap4.css',type:"CSS"},
        {link:'assets/libs/datatables/jquery.dataTables.min.js',type:"JS"},
        {link:'assets/libs/datatables/dataTables.bootstrap4.js',type:"JS"},
        {link:'assets/libs/datatables/dataTables.responsive.min.js',type:"JS"},
        {link:'assets/libs/datatables/dataTables.select.min.js',type:"JS"}
    ],
        AUTH:true
    }
}