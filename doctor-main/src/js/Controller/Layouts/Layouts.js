var CONT_Layouts=function($scope,$rootScope,$location){
    $rootScope.$on('AuthChanged', (event, value)=> {
        $scope.IsAuth = value;
    });
    $scope.IsAuth=false;
}

var CONT_topbar=function($scope,$cookies,$rootScope,$location) {


    $scope.ContentPortFileo="";
    $scope.getAllProtFlioe=()=>{
        HTTPs.POST(CONFIG.serverUrl+"/GAG",{}).then(res=>{
            res=JSON.parse(res);
            $scope.$apply(()=>{
                $scope.ContentPortFileo=res.PortFileo;
               // document.getElementById('ContentPortFileo').innerHTML=res.PortFileo;
            });
        });
    }
    
    $scope.doctorPartner = 0;
    $scope.getDoctorIdPartner = () => {
        //getDoctorIdPartner
        HTTPs.POST(CONFIG.serverUrl + "/P/getDoctorIdPartner", {}).then(res => {
            res = JSON.parse(res);
            $scope.$apply(() => {
                if(res.data[0].Partner==1){
                    $('.partnerLogo').addClass("pactive");
                    $('#doctorPartner').css({display:'block'})
                    $('.linkNavAppoentment').css({display:'block'})
                }
                $('.logo-box').css({display:'block'});
            });
        });
    }

    $scope.getDoctorIdPartner();
    $scope.getAllProtFlioe();
    $scope.user=JSON.parse($cookies.get('PUD'));
    $scope.chatNotf=[];
    $scope.changeColor=()=>{
        var links=document.querySelectorAll('[changed="style"]');
        if(links[0].getAttribute('color')=="D")
        {
             links[0].href="assets/cssR/bootstrap.min.css";
             links[1].href="assets/cssR/icons.min.css";
             links[2].href="assets/cssR/app.min.css";

             links[0].setAttribute("color",'W');
             links[1].setAttribute("color",'W');
             links[2].setAttribute("color",'W');
        }
        else{
             links[0].href="assets/css/bootstrap.min.css";
             links[1].href="assets/css/icons.min.css";
             links[2].href="assets/css/app.min.css";
             links[0].setAttribute("color",'D');
             links[1].setAttribute("color",'D');
             links[2].setAttribute("color",'D');
        }
     }
    $scope.getAllChatNotf=()=>{
        HTTPs.POST(CONFIG.serverUrl+"/GACF",{}).then(res=>{
            res=JSON.parse(res);
            if(res.error==0)
            {
                $scope.$apply(()=>{
                    for(var o=0;o<res.data.length;o++)
                    {
                        res.data[o].patientId=$CRID.TO(res.data[o].patientId.toString());
                    }
                    $scope.chatNotf=res.data;
                });
               
            }
        });
    }
    $scope.getAllChatNotf();
    $rootScope.$on('updateChatNotifi', (event, valueFile)=> {
        $scope.getAllChatNotf();
    });
    const socket = io(CONFIG.serverSocket,{reconnect: true,query:{token:$scope.user.token}});
    socket.on('NOTF',(msg)=> {
        if(msg.content)
        {
            if(msg.content[0].section=="Message")
            {
                $scope.$apply(()=>{
                    if(rootEvents.find(x=>x=='CHAT'+msg.content[0].patientId))
                    {
                        $scope.$emit('CHAT'+msg.content[0].patientId,true);
                    }
                    else{
                        $scope.getAllChatNotf();
                    }
                });
            }
            else
            {
                $scope.getAllNot();
            }
        }
    });

    $scope.notfiArray=[];
    $scope.getAllNot=()=>{
        HTTPs.POST(CONFIG.serverUrl+"/GALN",{}).then(res=>{
            res=JSON.parse(res);
            $scope.$apply(()=>{
                $scope.notfiArray=[];
                res.data.forEach((notfi)=>{
                    notfi.content=JSON.parse(notfi.content);
                    notfi.content[0]['id']=notfi.id;
                    $scope.notfiArray.push(notfi.content);
                });
            });
        });
    }
    $scope.goToLinkNote=(id,link)=>{
        HTTPs.POST(CONFIG.serverUrl+"/UNOT",{id:id}).then(res=>{
            $scope.$apply(()=>{
                $scope.getAllNot();
                $location.path("/Cases/"+$CRID.TO(link.toString()));
            });
        });
    }
    $scope.getAllNot();
    $scope.LogOut=()=>{
        $cookies.remove('PUD');
        location.reload();
    }
    $scope.files=[];
    $rootScope.$on('uploadFiles', (event, valueFile)=> {
        let file=$scope.files.find(x=>x.fileName==valueFile.fileName);
        if(!file)
        {
            var fr = new FileReader();
            fr.onload=()=> {
                $scope.$apply(()=>{
                    valueFile['image']=fr.result;
                    $scope.uploadFiles(valueFile);
                })
            }
            fr.readAsDataURL(valueFile.file);
        }
        
    });
    $scope.uploadFiles=(file,idPatient=null,fileName=null)=>{
        let num=0;
        idPatient=file.idPatient;
        fileName=file.fileName;
        $scope.files.push(file);
        let dataF=new FormData();
        dataF.append("fileData",file.file);
        HTTPs.POSTFile(CONFIG.serverUrl+"/uploadFile",dataF,{directionName:"K"+idPatient+"/"+file.id},(e)=>{
            if(e != "C")
            {
                e=(e.loaded/e.total*100).toFixed(2);
            }
            if(e==100.00)
            {
                e=100;
            }
            $scope.$apply(()=>{
                let file=$scope.files.find(x=>x.fileName==fileName);
                if(file)
                {
                    file.filePrograss=e;
                    $scope.$emit('updateUpload'+file.id+idPatient,{numberPrograss:file.filePrograss,file:file.image,type:file.type});
                    
                }
            })
        }).then(res=>{
            if(res)
            {
                res=JSON.parse(res);
                $scope.$apply(()=>{
                    $scope.$emit('updateUpload'+file.id+idPatient,{numberPrograss:"C",file:file.image,type:file.type,newPath:res.path});
                    $scope.files.splice($scope.files.indexOf(file),1);
                });
            }
        });
        // var myinterV=setInterval(()=>{
        //     if(num==100)
        //     {
        //         clearInterval(myinterV);

        //         return;
        //     }
        //     num++;
        //     $scope.$apply(()=>{
        //         let file=$scope.files.find(x=>x.fileName==fileName);
        //         if(file)
        //         {
        //             file.filePrograss=num;
        //             $scope.$emit('updateUpload'+file.id+idPatient,{numberPrograss:file.filePrograss,file:file.file});
        //         }
        //     })
        // },100);
    }

    $scope.notfiMeet={};
    $scope.notfiMeetLength=0;
    $scope.informationAccounts={};
    HTTPs.POST(CONFIG.serverUrl+"/GPD",{}).then(res=>{
        res=JSON.parse(res);
        if(res.error==0)
        {
            // $scope.informationAccounts=res.data;
            // DataBaseFire.ListingData(`Users/T2/U${res.data.id}/`,false,(res)=>{
            //     $scope.$apply(()=>{
            //         $scope.notfiMeet=res.val();
            //         res.val().forEach(resulte=>{
            //           console.log(resulte); 
            //         })
            //         //$scope.listinMeet()
            //         $scope.notfiMeetLength=Object.keys(res.val()).length;

            //     });
            // });
        }
    });

    $scope.listinMeet=(idMeet)=>{
        DataBaseFire.ListingData(`Meet/${idMeet}/`,false,(res)=>{
            $scope.$apply(()=>{
                console.log(res);
            });
        });
    }
    $scope.Requestmeeting=()=>{
        DataBaseFire.AddNewData('requestMeet/',{
            id:$scope.informationAccounts.nameDoctor,
            nameUser:$scope.informationAccounts.nameDoctor,
        })
    }



}

var CONT_left_side=function($scope) {
    setTimeout(() => {
        var ren=new $Render((e)=>{

        });
        ren
        .addScript("assets/js/app.min.js")
        .Start();
    }, 10);
}


var CONT_viewerStl=function($scope,$rootScope) {
    $scope.display=false;
    var stl_viewer=null;
    $scope.srcFile="";
    $scope.animated=false;
    $scope.amited=()=>{
        if($scope.animated)
        {
            stl_viewer.animate_model(1, {delta:null} );
            $scope.animated=false;
        }
        else{
            stl_viewer.animate_model(1, {delta:{rotationx:1, msec:1000, loop:true}} );
            $scope.animated=true;
          
        }
    }
    $scope.init = function(pageTitle) {
      stl_viewer=new StlViewer(document.getElementById("sstl"), 
        { 
            loading_progress_callback:(load_status, load_session)=>{
                var loaded=0;
                var total=0;
                console.log("adasdasd");
                console.log(load_status);
                //go over all models that are/were loaded
                Object.keys(load_status).forEach(function(model_id)
                {
                    if (load_status[model_id].load_session==load_session) //need to make sure we're on the last loading session (not counting previous loaded models)
                    {
                        let prograss=(load_status[model_id].loaded/load_status[model_id].total*100).toFixed(0);
                        document.getElementById('textProssessSpanStl').innerHTML=prograss;
                    }
                });
            },
            all_loaded_callback:()=>{
                document.getElementById('loaderStlPrograss').remove();
            },
                models: [] 
            }
        );
        stl_viewer.add_model({id:1,filename:CONFIG.serverImageUrl+$scope.srcFile,pacity:0.2, z:-10, color:"#7a7a7a"});
    }

    $rootScope.$on('showModelStl', (event, valueFile)=> {
        $scope.display=true;
        $scope.srcFile=valueFile;
    });
    $scope.close=()=>{
        stl_viewer.remove_model(1);
        $scope.display=false;

    }
}

var DIR_format=function ($rootScope) {
    return function (scope, element, attrs) {
        var type=attrs.typeInput;
        element[0].addEventListener('keypress',(evt)=>{
            evt = (evt) ? evt : window.event;
            var charCode = (evt.which) ? evt.which : evt.keyCode;
            if (charCode > 31 && (charCode < 48 || charCode > 57)&& evt.key!='+') {
                evt.preventDefault();
                return false;
            }
            return true;
        })
    };
}

var DIR_Counter=function ($rootScope) {
    return function (scope, element, attrs) {
       // Counter
       var countDownDate = new Date(attrs.starttime).getTime();

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
        element[0].innerHTML = "D:"+days +" H:"+ hours + " M:"
        + minutes + " S:" + seconds;
        element[0].style.color="green";
        // If the count down is finished, write some text 
        if (distance < 0) {
            clearInterval(x);
            element[0].innerHTML = "Started";
        }
        }, 1000);
    };
}
