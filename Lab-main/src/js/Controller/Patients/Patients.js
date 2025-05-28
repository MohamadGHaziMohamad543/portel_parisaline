
$ANContreoller.Patients={
    FUN:['$scope','$location','$cookies',function($scope,$location,$cookies) {
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
            },
            "createdRow":function(row, data, dataIndex){
                if($(row).find('.typeTask').attr('typedata')=="1")
                {
                    $(row).css({background:'#326c04',color:"#fff"});
                }
                else{
                    $(row).css({background:'#a60000',color:"#fff"});
                }
            }
        });
    
        //load All Cases
        HTTPs.POST(CONFIG.serverUrl+"/TASK/GTI",{}).then(res=>{
            res=JSON.parse(res);
            res.data.forEach(row => {
                tabel.row.add([
                    `<a style="width:100%;text-align:center;display: block;">${row.idPatient}</a>`,
                    `<a style="width:100%;text-align:center;display: block;">${getDate(row.startTask)}</a>`,
                    `<a style="width:100%;text-align:center;display: block;">${getDate(row.EndTask)}</a>`,
                    `<a class="typeTask" typedata="${row.TaskType}" style="width:100%;text-align:center;display: block;">${getTypeRask(row.TaskType)}</a>`,
                    `<p style="    display: block;
                    width: 200px;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    text-align: center;
                ">${row.CommentUser}</p>`,
                ]).draw(); 
                
            });
        });
    
       var getDate=(dateString)=>{
            let date=new Date(dateString);
            let ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(date);
            let mo = new Intl.DateTimeFormat('en', { month: 'short' }).format(date);
            let da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(date);
            return `${da}-${mo}-${ye} ${date.getHours()}:${date.getMinutes()}`;
        }

        var getTypeRask=(type)=>{
            if(type=="1"){
                return 'Approved';
            }
            else{
                return 'Rejected';
            }
        }
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
    
