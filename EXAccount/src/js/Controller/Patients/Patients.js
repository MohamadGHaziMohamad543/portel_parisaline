
$ANContreoller.Patients={
    FUN:['$scope','$location','$cookies',function($scope,$location,$cookies) {
        $scope.$emit('AuthChanged', true);
        var render=[];
        var actionRows=false;
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
            "drawCallback":function(){
                $('.dataTables_paginate > .pagination').addClass('pagination-rounded');
                if(actionRows)
                {
                    if(render.find(x=>x===this.api().rows( {page:'current'} ).page()) ==undefined)
                    {
                        $('.btnViewAddress').click(function(e){
                            let Process=[{end:Date().length,Start:Date()}];
                            
                            $scope.$apply(()=>{
                                $scope.openModelTask($(this).attr('data-id'));
                            });

                        });
                        render.push(this.api().rows( {page:'current'} ).page());
                    }
                }
                
            }
        });
    
        //load All Cases
        HTTPs.POST(CONFIG.serverUrl+"/GAP",{}).then(res=>{
            res=JSON.parse(res);
            for (let i = 0; i < res.length; i++) {
                if(i==res.length-1)
                {
                    actionRows=true;
                }
                tabel.row.add([
                    `<a style="width:100%;text-align:left;display: block;">${res[i].patientId}</a>`,
                    `<a style="width:100%;text-align:left;display: block;"><img src="${CONFIG.serverImageUrl+res[i].logo}">${res[i].nameDoctor}</a>`,
                    `<a style="width:100%;text-align:left;display: block;"><img src="${CONFIG.serverImageUrl+res[i].image}">${res[i].firstName}</a>`,
                    `<a style="width:100%;text-align:left;display: block;">${res[i].gender==2?'Fmale':'Male'}</a>`,
                    `<min style="width:100%;text-align:center;display: block;"><a class="btn btn-outline-info btnViewAddress" data-id="${res[i].patientId}"><strong>${res[i].NumberOfOperations}</strong> <i class="fa fa-eye"></i></a></min>`,
                ]).draw();
            }
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
            else if(status==4.5){
                return '<span class="Approval">Accountant Approval</span>';//Your Approval
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

        $scope.modelStatus=false;
        $scope.closeModelTask=()=>{
            $scope.modelStatus=false;
        }

        $scope.taskData=[];
        $scope.openModelTask=(id)=>{
            $scope.modelStatus=true;
            HTTPs.POST(CONFIG.serverUrl+"/GATFI",{idPatient:id}).then(res=>{
                res=JSON.parse(res);
                console.log(res);
                $scope.$apply(()=>{
                    $scope.taskData=res;
                });
            });

        }
        

    }],
    Router:{
        Url:"/Patients",
        Templete:'Views/Patients/Patients.html',
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
}
    
