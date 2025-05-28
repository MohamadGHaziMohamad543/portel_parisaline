$ANContreoller.home={
    FUN:['$scope','$location','$cookies',function($scope,$location,$cookies){
        $scope.$emit('AuthChanged', true);
         
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
    
        //load All Cases
        HTTPs.POST(CONFIG.serverUrl+"/GAPWI",{}).then(res=>{
            res=JSON.parse(res);
            res.forEach(row => {
                let date=new Date(row.createdAt);
                let ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(date);
                let mo = new Intl.DateTimeFormat('en', { month: 'short' }).format(date);
                let da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(date);
                console.log(row);
                tabel.row.add([
                    `<a href="#" style="width:100%;text-align:center;display: block;">${row.id}</a>`,
                    `<min style="width:100%;text-align:center;display: block;">${da}-${mo}-${ye}  ${date.getHours()}:${date.getMinutes()}</min>`,
                    `<img src="${CONFIG.serverImageUrl+row.logo}">${row.nameDoctor}`,
                    `<img src="${CONFIG.serverImageUrl+row.image}">${row.firstName+' '+row.lastName}`,
                    `<a style="width:100%;text-align:center;display: block;" href="/Invoices/${$CRID.TO(row.id.toString())}">View Invoice </a>`,
                ]).draw(); 
            });
        });
    
        var getStatusCases=(status)=>{
            if(status==null)
            {
                return '<span class="Draft">Case Draft</span>';//Draft
            }
            else if(status==0){
                return '<span class="Draft">Case Draft</span>';//darft
            }
            else if(status==1){
                return '<span class="Processing">Records Processing</span>';//Records Processing
            }
            else if(status==2){
                return '<span class="TreatmentSetup">Treatment Setup</span>';//TreatmentSetup
            }
            else if(status==3){
                return '<span class="Revision">Case Revision</span>';//Case Revision
            }
            else if(status==4){
                return '<span class="Approval">Your Approval</span>';//Your Approval
            }
            else if(status==5){
                return '<span class="Fabrication">Case Fabrication</span>';//Case Fabrication
            }
            else if(status==6){
                return '<span class="Delivered">Case Delivered</span>';//Case Delivered
            }
            else if(status==7){
                return '<span class="Completed">Case Completed</span>';//Completed
            }
        }

        $scope.doctors=0;
        $scope.delivered=0;
        $scope.mediators=0;
        $scope.invoice=0;
        $scope.supervisors=0;
        $scope.treatmentplanners=0;
        $scope.getCountRecords=()=>{
            HTTPs.POST(CONFIG.serverUrl+"/GCR",{}).then(res=>{
                res=JSON.parse(res);
                if(res.error==0)
                {
                    $scope.$apply(()=>{
                        $scope.doctors=res.data[0].doctors;
                        $scope.invoice=res.data[0].invoice;
                        $scope.patients=res.data[0].patients;
                        $scope.delivered=res.data[0].delivered;
                    });
                    var delay = $(this).attr('data-delay')?$(this).attr('data-delay'):100; //default is 100
                    var time = $(this).attr('data-time')?$(this).attr('data-time'):1200; //default is 1200
                     $('[data-plugin="counterup"]').each(function(idx, obj) {
                        $(this).counterUp({
                            delay: 100,
                            time: 1200
                        });
                     });
                }
            });
        }

        $scope.getCountRecords();
    }
],
Router:{
    Url:"/",
    Templete:'Views/home.html',
    Render:[
        {link:'assets/libs/datatables/dataTables.bootstrap4.css',type:"CSS"},
        {link:'assets/libs/datatables/responsive.bootstrap4.css',type:"CSS"},
        {link:'assets/libs/datatables/buttons.bootstrap4.css',type:"CSS"},
        {link:'assets/libs/datatables/select.bootstrap4.css',type:"CSS"},
        {link:'assets/libs/datatables/jquery.dataTables.min.js',type:"JS"},
        {link:'assets/libs/datatables/dataTables.bootstrap4.js',type:"JS"},
        {link:'assets/libs/datatables/dataTables.responsive.min.js',type:"JS"},
        {link:'assets/libs/datatables/dataTables.select.min.js',type:"JS"},
    ],
    AUTH:true
}
};
