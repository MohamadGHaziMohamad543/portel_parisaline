$ANContreoller.MeetManager={
    FUN:['$scope','$location','$routeParams',function($scope,$location,$routeParams) {
    $scope.$emit('AuthChanged', true);

    idAccount=-1;
    //country and City
    $scope.Country="219";
    $scope.CountryItem=[];

    $scope.CitysItemFull=[];
    $scope.CitysItem=[];
    $scope.City="";
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
            new Switchery($(row).find('[data-plugin="switchery"]')[0], $(row).find('[data-plugin="switchery"]').data());
            
            counterMeet($(row).find('.timeMeetCounter').html(),$(row).find('.timeMeetCounter').attr('id'));
            $(row).find('[data-plugin="switchery"]').on("change",(e)=>{
                let status=false;
                if(e.target.checked)
                {
                    status=true;
                }
                DataBaseFire.Update(`Meet/${$(row).find('[data-plugin="switchery"]').attr("data-id")}/status`,status).then(res=>{
                    if(status)
                    {
                        Tost.info("activated","The account has been activated",3000);
                    }
                    else{
                        Tost.warning("disabled","The account has been disabled",3000);
                    }
                });
            })
            $(row).find('.btnEditUsersMeet').click((e)=>{
                $scope.$apply(()=>{
                    
                    $scope.openModelUsers($(e.currentTarget).attr('data-id'));
                })
            });
        }
    });

    $scope.infoAccount=null;
    $scope.getInfoAccount=()=>{
        HTTPs.POST(CONFIG.serverUrl+'/getInfoAccWithId',{}).then(res=>{
            res=JSON.parse(res);
            if(res.error==0)
            {
                $scope.$apply(()=>{
                    $scope.infoAccount=res.data[0];
                    console.log($scope.infoAccount);
                });
            }
        })
    }

    var counterMeet=(date,element)=>{
        // Set the date we're counting down to
      try{
        var countDownDate = new Date(date).getTime();

        // Update the count down every 1 second
        var x = setInterval(function() {

        // Get todays date and time
        var now = new Date().getTime();

        // Find the distance between now and the count down date
        var distance = countDownDate - now;

        // Time calculations for days, hours, minutes and seconds
        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Display the result in the element with id="demo"
        if(!document.getElementById(element))
        {
            clearInterval(x);
        }
        document.getElementById(element).innerHTML = "D:"+days +" H:"+ hours + " M:"
        + minutes + " S:" + seconds;

        // If the count down is finished, write some text 
        if (distance < 0) {
            clearInterval(x);
            document.getElementById(element).innerHTML = "Started";
        }
        }, 1000);
      }catch(e){

      }
    }
    $scope.getInfoAccount();
    $scope.MeetRow={};
    $scope.GetAll=()=>{
        DataBaseFire.ListingData("Meet/",false,(snapshot)=>{
            tabel.clear().draw();
            $scope.MeetRow=snapshot.val();
            snapshot.forEach((childSnapshot) => {
                const childKey = childSnapshot.key;
                const childData = childSnapshot.val();
                tabel.row.add([
                    `<a class="text-left" style="display: block;" href="/Meet/${childKey}"><i class="fe-video" style="    font-size: 21px;"></i> ${childKey}</a>`,
                    `<a class="text-center timeMeetCounter" style="display: block;color:green;" id="TIME${childKey}">${childData.StartTime}</a>`,
                    `<a class="text-center" style="display: block;">${childData.description}</a>`,
                    `<a class="text-center" style="display: block;"> <input type="checkbox" ${childData.status==1?'checked':''} data-plugin="switchery" data-id="${childKey}" data-color="#1bb99a" data-secondary-color="#ff5d48" data-size="small"/></a>`,
                    `<a class="btn btn-outline-info btnEditUsersMeet" data-id="${childKey}"><i class="fe-users"></i></a>`
                ]).draw(); 
            });
         });
    }
    $('#meetUserType').on("change",(e)=>{
        $scope.$apply(()=>{
            $scope.GetUsers(e.target.value);
        });
    });

    $scope.usertypeSelect='2';
    $scope.Users=[];
    $scope.GetUsers=(userType)=>{
        let linkSe="";
        if(userType==2)
        {
            linkSe='/TAS/GetD';
        }
        if(userType==3)
        {
            linkSe="/TAS/GetL";
        }
        else if(userType==4)
        {
            linkSe="/TAS/GetC";
        }
        else if(userType==5)
        {
            linkSe="/TAS/GetT";
        }
        else if(userType==7)
        {
            linkSe="/TAS/GetS";
        }
        else if(userType==9)
        {
            linkSe="/TAS/GetA";
        }
        HTTPs.POST(CONFIG.serverUrl+linkSe,{}).then(res=>{
            res=JSON.parse(res);
            if(res.error==0)
            {
                $scope.$apply(()=>{
                    $scope.Users=res.data;
                })
            }
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

    var modalUsers = new Custombox.modal({
        content: {
            target: "#FormModalUsers",
            effect: 'makeway',
            close: false,
        },
        overlay: {
            color: "#38414a",
            close: false,
        }
    });

    $scope.typeForm="Add";
    $scope.Add=()=>{
        $scope.typeForm="Add";
        idAccount=-1;
        $scope.TitleForm="Add a new Meeting";
        $('#FormModal input').val("");
        $('#FormModal textarea').val("");
        modal.open();
    }
    $scope.IdMeet=-1;
    $scope.openModelUsers=(idMeet)=>{
        $scope.TitleFormUsers="Users For Meet "+idMeet;
        $scope.IdMeet=idMeet;
        $scope.getUsersMeet(idMeet);
        $scope.GetUsers('2');
        modalUsers.open();
    }


    $scope.MeetUsers=[];
    $scope.getUsersMeet=(idMeet)=>{
        DataBaseFire.GET(`Meet/${idMeet}/Users/`).then(result=>{
            if(result)
            {
                $scope.$apply(()=>{
                    $scope.MeetUsers=result;
                });
            }
            else{
                $scope.MeetUsers=[];
            }
        });
    }
    var input = document.querySelector("#phone");
    var errorMap = ["Invalid number", "Invalid country code", "Too short", "Too long", "Invalid number"];


        var l = null;
        $scope.CreateMeet=()=>{
            l=Ladda.create(document.querySelector('.ladda-button'));
            var valueForm=Validate(document.getElementById('FormModal'));
            if(!valueForm)
            {
                return;
            }
            $scope.LoaderForm=true;
            var dataF=new FormData();
            Reloader.Start('#FormModal');
            l.start();
            valueForm['status']=0;
            valueForm['StartTime']=document.getElementById('createAt').value;
            DataBaseFire.AddNewData('Meet/',valueForm).then(key=>{
                DataBaseFire.AddNewData('Meet/'+key+"/Users/",{
                    isAdmin:true,
                    typeUser:$scope.infoAccount.id,
                    userName:$scope.infoAccount.userName,
                    City:$scope.infoAccount.City,
                    Country:$scope.infoAccount.Country,
                    status:false,
                    reject:false
                }).then(res=>{
                    l.remove();
                    Tost.info("Add successfully","Records have been Add",3000);
                    Reloader.Stop('#FormModal');
                    Custombox.modal.close();
                });
            });
        }
        $scope.AddUsers=()=>{
            
            $('#MeetUserId').val();
            for (const key in $scope.MeetUsers) {
                if($scope.MeetUsers[key].userId==$('#MeetUserId').val() &&  $scope.MeetUsers[key].typeUser==$('#meetUserType').val())
                {
                    console.log($scope.MeetUsers[key]);
                    Tost.warning("User already exists","Choose another user",3000);
                    return;
                }
            }
            l=Ladda.create(document.querySelector('.ladda-button-FormModalUsers'));
            let userName=$scope.Users.find(x=>x.id==$('#MeetUserId').val()).userName;
            let City=$scope.Users.find(x=>x.id==$('#MeetUserId').val()).City;
            let Country=$scope.Users.find(x=>x.id==$('#MeetUserId').val()).Country;
            Reloader.Start('#FormModalUsers');
            DataBaseFire.AddNewData('Meet/'+$scope.IdMeet+"/Users/",{
                isAdmin:false,
                typeUser:$('#meetUserType').val(),
                userId:$('#MeetUserId').val(),
                userName:userName,
                City:City,
                Country:Country,
                status:false,
                reject:false
            }).then(res=>{
                l.remove();
                Tost.info("Add successfully","Records have been Add",3000);
                Reloader.Stop('#FormModalUsers');
                DataBaseFire.AddNewData(`Users/T${$('#meetUserType').val()}/U${$('#MeetUserId').val()}`,{
                    idMeet:$scope.IdMeet,
                    idUserMeet:res,
                    infoMeet:$scope.MeetRow[$scope.IdMeet].description,
                    StartTime:$scope.MeetRow[$scope.IdMeet].StartTime,
                }).then(resultNot=>{
                    $scope.$apply(()=>{
                        $scope.getUsersMeet($scope.IdMeet);
                    });
                });
            });
        }
        $scope.DeleteUser=(user)=>{
            for (const key in $scope.MeetUsers) {
               if(user.typeUser==$scope.MeetUsers[key].typeUser && $scope.MeetUsers[key].userId==user.userId)
               {
                DataBaseFire.Delete(`Meet/${$scope.IdMeet}/Users/${key}`).then(res=>{
                    if(res)
                    {
                        Tost.warning("User deleted","User deleted",3000);
                        $scope.$apply(()=>{
                            $scope.getUsersMeet($scope.IdMeet);
                        });
                    }
                });
                
               }
            }
        }
        $scope.GetAll();
    }],
    Router:{
        Url:"/MeetManager",
        Templete:"Views/MeetManager/MeetManager.html",
        Render:[
            {link:'assets/libs/datatables/dataTables.bootstrap4.css',type:"CSS"},
            {link:'assets/libs/datatables/responsive.bootstrap4.css',type:"CSS"},
            {link:'assets/libs/datatables/buttons.bootstrap4.css',type:"CSS"},
            {link:'assets/libs/datatables/select.bootstrap4.css',type:"CSS"},
            {link:'assets/libs/switchery/switchery.min.css',type:"CSS"},
            {link:'assets/libs/custombox/custombox.min.css',type:"CSS"},
            {link:'assets/libs/datatables/jquery.dataTables.min.js',type:"JS"},
            {link:'assets/libs/datatables/dataTables.bootstrap4.js',type:"JS"},
            {link:'assets/libs/datatables/dataTables.responsive.min.js',type:"JS"},
            {link:'assets/libs/datatables/dataTables.select.min.js',type:"JS"},
            {link:'assets/libs/switchery/switchery.min.js',type:"JS"},
            {link:'assets/libs/custombox/custombox.min.js',type:"JS"},
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