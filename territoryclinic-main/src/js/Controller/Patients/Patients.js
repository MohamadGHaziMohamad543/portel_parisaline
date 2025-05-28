
$ANContreoller.Patients={
    FUN:['$scope','$location','$cookies',function($scope,$location,$cookies) {
        $scope.$emit('AuthChanged', true);

        var tabel= $('#scroll-vertical-datatable').DataTable({
            "scrollX": true,
            "scrollCollapse": true,
            "ordering": true,
            "order": [[0, 'desc']],
            "pagingType": "full_numbers",
            'processing': true,
            "responsive": true,
            'serverSide': true,
            'serverMethod': 'post',
            "searching": false,
            'ajax': {
                'url':CONFIG.serverUrl+"/GAPS",
                'beforeSend': function (request,body) {
                    request.setRequestHeader("Authorization", "Bearer "+HTTPs.Token);
                },
                data:function(d){
                    d['CSerach']={
                        Case_Number:$("#Case_Number").val(),
                        Case_Date:[$("#Case_Date").val(),$("#Case_Date_TO").val()],
                        Doctor_Name:$("#Doctor_Name").val(),
                        Patient_Name:$("#Patient_Name").val(),
                        Country:$("#Country").val(),
                        City:$("#City").val(),
                        Territory_Manager:$("#Territory_Manager").val(),
                        User_Type:$("#User_Type").val(),
                        Task_Name:$("#Task_Name").val(),
                        Task_Since:$("#Task_Since").val(),
                        Case_Status:$("#Case_Status").val(),
                    };
                }

            },
            'columns': [
               { data: 'id' ,render:(data, type, row)=>{
                 return `<a href="/Cases/${$CRID.TO(row.id.toString())}" style="width:100%;text-align:center;display: block;">${row.id}</a>`;
               }},
               { data: 'type' ,render:(data, type, row)=>{
                 return `<a href="/Cases/${$CRID.TO(row.type==0?row.id.toString():row.refinementNumber.toString())}" style="width:100%;text-align:center;display: block;">${row.type==0?'New Patient':row.type==1?'Refinement '+row.refinementNumber:'Retainer '+row.refinementNumber}</a>`;
               }},
               { data: 'createdAt' ,render:(data, type, row)=>{
                    let date=new Date(row.createdAt);
                    let ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(date);
                    let mo = new Intl.DateTimeFormat('en', { month: 'short' }).format(date);
                    let da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(date);
                return  `<min style="width:100%;text-align:center;display: block;">${da}-${mo}-${ye}  ${date.getHours()}:${date.getMinutes()}</min>`;
              }},
               { data: 'logo' ,render:(data, type, row)=>{
                return `<img src="${row.logo?row.logo.split('https://').length==2?row.logo:CONFIG.serverImageUrl+row.logo:''}">${row.nameDoctor}`;
              }},
               { data: 'image' ,render:(data, type, row)=>{
                return  `<img src="${CONFIG.serverImageUrl+row.image}">${row.firstName+' '+row.lastName}`;
               }},
               {data:"countryName"},
               {data:"cityName"},
               {data:"nameTerritoryManagers"},
               {data:"TaskUserType"},
               {data:"TaskUserName"},
               {data:"Start",render:(data, type, row)=>{
                if(row.Start != null)
                {
                    let date=new Date(row.Start);
                    let ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(date);
                    let mo = new Intl.DateTimeFormat('en', { month: 'short' }).format(date);
                    let da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(date);
                    return  `<min style="width:100%;text-align:center;display: block;">${da}-${mo}-${ye}  ${date.getHours()}:${date.getMinutes()}</min>`;
                }
                else{
                    return "Stop";
                }

                }},
                {data:"ViewDate",render:(data, type, row)=>{
                    if(row.ViewDate != null)
                    {
                        let date=new Date(row.ViewDate);
                        let ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(date);
                        let mo = new Intl.DateTimeFormat('en', { month: 'short' }).format(date);
                        let da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(date);
                        return  `<min style="width:100%;text-align:center;display: block;">${da}-${mo}-${ye}  ${date.getHours()}:${date.getMinutes()}</min>`;
                    }
                    else{
                        return "-";
                    }
    
                    }},
               { data: 'caseStatus',render:(data, type, row)=>{
                return `<a style="width:100%;text-align:center;display: block;">${getStatusCases(data)}</a>`;
               } },
               {data:"casesSubmitedDate",render:(data, type, row)=>{
                if(row.casesSubmitedDate!==null){
                    let date=new Date(row.casesSubmitedDate);
                    let ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(date);
                    let mo = new Intl.DateTimeFormat('en', { month: 'short' }).format(date);
                    let da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(date);
                    return  `<min style="width:100%;text-align:center;display: block;">${da}-${mo}-${ye}  ${date.getHours()}:${date.getMinutes()}</min>`;
                }
                else{
                    return  `<min style="width:100%;text-align:center;display: block;">Not Date</min>`;
                }

                }},
                { data: 'parisalinePartner' ,render:(data, type, row)=>{
                    return `<a style="width:100%;text-align:center;display: block;">${row.parisalinePartner==0?'NO':'YES'}</a>`;
                  }},
                { data: 'dentalCenterName' ,render:(data, type, row)=>{
                    return `<a style="width:100%;text-align:center;display: block;">${row.dentalCenterName}</a>`;
                }},
                { data: 'doctorId' ,render:(data, type, row)=>{
                    return `<a style="width:100%;text-align:center;display: block;">#${row.doctorId}</a>`;
                }},
               { data: 'id',render:(data, type, row)=>{
                     return `<a class="btn btn-outline-primary btn-sm btnInfo" style="padding: 3px 20px;" infoid='${data}'">
                                 <i class="fa fa-info"></i>
                             </a>
                            ${row.TrackingNumber?` <a class="btn btn-outline-primary btn-sm btnShipping" style="padding: 0px 0px;" infocountry='${row.countryName}' infoid='${row.TrackingNumber}'">
                            <img src="https://cdn-icons-png.flaticon.com/512/4564/4564420.png" style="width: 32px;height: 32px; ">
                             </a>`:''}
                             `;
               } },
            ],
            "language": {
                "paginate": {
                    "previous": "<i class='mdi mdi-chevron-left'>",
                    "next": "<i class='mdi mdi-chevron-right'>"
                }
            },
            "drawCallback": function (e) {
                $(`.btnInfo`).click((e)=>{
                    getAllInnformationTask($(e.target).attr('infoid'));
                 });
                 
                $(`.btnShipping`).click((e)=>{
                    getAllShipping($(e.currentTarget).attr('infoid'),$(e.currentTarget).attr('infocountry'));
                 });
                $('.dataTables_paginate > .pagination').addClass('pagination-rounded');
            }
        });
    
        //load All Cases
        // HTTPs.POST(CONFIG.serverUrl+"/GAP",{}).then(res=>{
        //     res=JSON.parse(res);
        //     res.forEach(row => {
        //         console.log(row);
        //         let date=new Date(row.createdAt);
        //         let ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(date);
        //         let mo = new Intl.DateTimeFormat('en', { month: 'short' }).format(date);
        //         let da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(date);
        //         tabel.row.add([
        //             `<a href="/Cases/${$CRID.TO(row.id.toString())}" style="width:100%;text-align:center;display: block;">${row.id}</a>`,
        //             `<min style="width:100%;text-align:center;display: block;">${da}-${mo}-${ye}  ${date.getHours()}:${date.getMinutes()}</min>`,
        //             `<img src="${row.logo?row.logo.split('https://').length==2?row.logo:CONFIG.serverImageUrl+row.logo:''}">${row.nameDoctor}`,
        //             `<img src="${CONFIG.serverImageUrl+row.image}">${row.firstName+' '+row.lastName}`,
        //             `<a style="width:100%;text-align:center;display: block;">${getStatusCases(row.caseStatus)}</a>`,
        //         ]).draw(); 
        //     });
        // });

        $scope.reloadTable=()=>{
            tabel.ajax.reload();
        }

        $scope.StageCases=[];
        $scope.getAllCasesStage=()=>{
            HTTPs.POST(CONFIG.serverUrl+"/CS/GASS",{}).then(res=>{
                res=JSON.parse(res);
                if(res.error==0)
                {
                    $scope.$apply(()=>{
                        $scope.StageCases=res.data;
                        let Item=`<option value="">All</option>`;
                        $scope.StageCases.forEach(result=>{
                            Item+=`
                            <option value="${result.numberStage}">${result.nameStage}</option>
                            `;
                        });
                        document.getElementById('Case_Status').innerHTML=Item;
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


        $scope.modelStatus=false;
        $scope.modeLoading=false;
        $scope.closeModelTask=()=>{
            $scope.modelStatus=false;
        }
        $scope.taskData=[];
        $scope.NumberPatient=-1;
        var getAllInnformationTask=(id)=>{
            $scope.modelStatus=true;
            $scope.modeLoading=true;
            HTTPs.POST(CONFIG.serverUrl+"/TSk/GATI",{id:id}).then(res=>{
                res=JSON.parse(res);
                $scope.$apply(()=>{
                    $scope.NumberPatient=id;
                    $scope.taskData=res.data;
                    $scope.modeLoading=false;
                });
            });

        }

        $scope.modelShipping=false;
        $scope.dataTraking=null;
        $scope.loadingModelShipping=false;
        var getAllShipping=(numberTrack,Country)=>{
            $scope.$apply(()=>{
                $scope.loadingModelShipping=true;
                $scope.modelShipping=true;
            })
            HTTPs.POST(CONFIG.serverUrl+"/sh/GSA",{numberTrack:numberTrack,Country:Country}).then(res=>{
                res=JSON.parse(res);
                $scope.$apply(()=>{
                    $scope.dataTraking=JSON.parse(res.data);
                    console.log($scope.dataTraking);
                    $scope.loadingModelShipping=false;
                    
                })
            });
        }

        $scope.closeModelShipping=()=>{
            $scope.modelShipping=false;
        }
        
    }],
    Router:{
        Url:"/Patients",
        Templete:'Views/Patients/Patients.html',
        Render:[
            {link:'assets/libs/datatables/dataTables.bootstrap4.css',type:"CSS"},
            {link:'assets/libs/datatables/buttons.bootstrap4.css',type:"CSS"},
            {link:'assets/libs/datatables/select.bootstrap4.css',type:"CSS"},
            {link:'assets/libs/datatables/jquery.dataTables.min.js',type:"JS"},
            {link:'assets/libs/datatables/dataTables.bootstrap4.js',type:"JS"},
            {link:'assets/libs/datatables/dataTables.select.min.js',type:"JS"},
        ],
        AUTH:true
    }
}
    
