$ANContreoller.home={
    FUN:['$scope','$location','$cookies',function($scope,$location,$cookies){
        $scope.$emit('AuthChanged', true);
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
            }
        });
    
        $scope.dataCount=null;
        HTTPs.POST(CONFIG.serverUrl+"/Count",{}).then(res=>{
            res=JSON.parse(res);
            if(res.error==0)
            {
                $scope.$apply(()=>{
                    $scope.dataCount=res.data[0];
                });
            }
        });
        //load All Cases
        HTTPs.POST(CONFIG.serverUrl+"/GAPWBC",{}).then(res=>{
            res=JSON.parse(res);
            res.forEach(row => {
                let date=new Date(row.createdAt);
                let ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(date);
                let mo = new Intl.DateTimeFormat('en', { month: 'short' }).format(date);
                let da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(date);
                tabel.row.add([
                    `<a href="/Cases/${$CRID.TO(row.id.toString())}" style="width:100%;text-align:center;display: block;">${row.id}</a>`,
                    `<min style="width:100%;text-align:center;display: block;">${da}-${mo}-${ye}  ${date.getHours()}:${date.getMinutes()}</min>`,
                    `<img src="${row.logo.split("https://").length==2?row.logo:CONFIG.serverImageUrl+row.logo}">${row.nameDoctor}`,
                    `<img src="${CONFIG.serverImageUrl+row.image}">${row.firstName+' '+row.lastName}`,
                    `<a style="width:100%;text-align:center;display: block;" href="/Cases/${$CRID.TO(row.id.toString())}">Case View</a>`,
                ]).draw(); 
            });
        });
    
        $scope.StageCases=[];
        $scope.getAllCasesStage=()=>{
            HTTPs.POST(CONFIG.serverUrl+"/CS/GASS",{}).then(res=>{
                res=JSON.parse(res);
                if(res.error==0)
                {
                    $scope.$apply(()=>{
                        $scope.StageCases=res.data;
                    });
                   
                }
            });
        };

        $scope.getAllCasesStage();
        var getStatusCases=(status)=>{
            if(status==null)
            {
                return '<span class="Draft">Case Draft</span>';//Draft
            }
            else{
                let nameStage="";
                let color="";
                $scope.StageCases.forEach(res=>{
                    if(parseInt(res.numberStage)===parseInt(status)){
                        nameStage=res.nameStage;
                        color=res.color;
                    }
                });
                return '<span class="Draft" style="background: '+color+';text-shadow: 1px 1px 2px #000;color:#fff">'+nameStage+'</span>';//Draft
            }
        }
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
        {link:'assets/libs/datatables/dataTables.select.min.js',type:"JS"},
    ],
    AUTH:true
}
};
