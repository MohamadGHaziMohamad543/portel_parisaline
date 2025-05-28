$ANContreoller.Layouts={FUN:['$scope','$rootScope','$location',function($scope,$rootScope,$location){
    $rootScope.$on('AuthChanged', (event, value)=> {
        $scope.IsAuth = value;
    });
    $scope.IsAuth=false;
}]};
//not.mp3
var audio2=new Audio('assets/sounds/not.mp3');
var RunAudio=false;
window.addEventListener('focus', function() {
    audio2.loop=false;
    RunAudio=false;
  });
  
  window.addEventListener('blur', function() {
    audio2.pause();
    audio2.currentTime = 0;
    audio2.loop=true;
    RunAudio=true;
  });
$ANContreoller.topbar={FUN:['$scope','$cookies','$rootScope','$location',function($scope,$cookies,$rootScope,$location) {
    $scope.user=JSON.parse($cookies.get('PUTERCL'));
    var audio=new Audio('assets/sounds/send.wav');
    audio2.loop = true;
    $scope.chatNotf=[];
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
        console.log(msg);
        if(msg.content)
        {
            if(msg.content[0].section=="Message")
            {
                $scope.$apply(()=>{
                    console.log(msg);
                    if(rootEvents.find(x=>x=='CHAT'+msg.content[0].patientId+"AD"+msg.content[0].typeUser))
                    {
                        $scope.$emit('CHAT'+msg.content[0].patientId+"AD"+msg.content[0].typeUser,true);
                        if(RunAudio)
                        {
                            audio2.play();
                        }
                    }
                    else{
                        audio.play();
                        if(RunAudio)
                        {
                            audio2.play();
                        }
                        $scope.getAllChatNotf();
                    }
                });
            }
            else if(msg.content[0].section=="TASK"){
                $scope.$apply(()=>{
                    if(rootEvents.find(x=>x=='TASK'+msg.content[0].numberId))
                    {
                        $scope.$emit('TASK'+msg.content[0].numberId,true);
                        if(RunAudio)
                        {
                            audio2.play();
                        }
                        $scope.getAllNot();
                    }
                    else{
                        audio.play();
                        if(RunAudio)
                        {
                            audio2.play();
                        }
                        $scope.getAllNot();
                    }
                });
            }
            else
            {
                audio.play();
                if(RunAudio)
                {
                    audio2.play();
                }
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
                console.log(res.data);
                res.data.forEach((notfi)=>{
                    notfi.content=JSON.parse(notfi.content);
                    notfi.content[0]['id']=notfi.id;
                    $scope.notfiArray.push(notfi.content);
                });
            });
        });
    }
    $scope.goToLinkNote=(id,link,type=null)=>{
        HTTPs.POST(CONFIG.serverUrl+"/UNOT",{id:id}).then(res=>{
            $scope.$apply(()=>{
                $scope.getAllNot();
                if(type=="TASK")
                {
                    $location.path("/Cases/"+$CRID.TO(link.toString())).search({TB: 'submitCase'});
                }
                else{
                    $location.path("/Cases/"+$CRID.TO(link.toString()));
                }
            });
        });
    }
    $scope.getAllNot();
    $scope.LogOut=()=>{
        $cookies.remove('PUTERCL');
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
    }


    //dataBaseFire
     let dataBase= DataBaseFire.getDatabase(DataBaseFire.app);
     DataBaseFire.ListingData("users/",false,(snapshot)=>{
        snapshot.forEach((childSnapshot) => {
            const childKey = childSnapshot.key;
            const childData = childSnapshot.val();
            console.log(childData);
        });
     });
     // DataBaseFire.AddEditData('users',{userName:"kiven"});
     $scope.notfiMeet={};
     $scope.notfiMeetLength=0;
    //  DataBaseFire.ListingData(`requestMeet/`,false,(res)=>{
    //     $scope.$apply(()=>{
    //         // $scope.notfiMeet=res.val();
    //         // $scope.notfiMeetLength=Object.keys(res.val()).length;
    //     });
    // });
      

    
}
]};

$ANContreoller.left_side={FUN:['$scope',function($scope) {
    $scope.init=()=>{
 
     var $this=this;
          // Left menu collapse
      $('.button-menu-mobile').on('click', function (event) {
         event.preventDefault();
         $('body').toggleClass('sidebar-enable');
         if ($(window).width() >= 768) {
             $('body').toggleClass('enlarged');
         } else {
             $('body').removeClass('enlarged');
         }
 
         // sidebar - scroll container
         $('.slimscroll-menu').slimscroll({
             height: 'auto',
             position: 'right',
             size: "8px",
             color: '#9ea5ab',
             wheelStep: 5,
             touchScrollStep: 20
         });
     });
 
     // sidebar - main menu
     $("#side-menu").metisMenu();
     // sidebar - scroll container
     $('.slimscroll-menu').slimscroll({
         height: 'auto',
         position: 'right',
         size: "8px",
         color: '#9ea5ab',
         wheelStep: 5,
         touchScrollStep: 20
     });
 
     // right side-bar toggle
     $('.right-bar-toggle').on('click', function (e) {
         $('body').toggleClass('right-bar-enabled');
     });
 
     $(document).on('click', 'body', function (e) {
         if ($(e.target).closest('.right-bar-toggle, .right-bar').length > 0) {
             return;
         }
 
         if ($(e.target).closest('.left-side-menu, .side-nav').length > 0 || $(e.target).hasClass('button-menu-mobile')
             || $(e.target).closest('.button-menu-mobile').length > 0) {
             return;
         }
 
         $('body').removeClass('right-bar-enabled');
         $('body').removeClass('sidebar-enable');
         return;
     });
 
     // activate the menu in left side bar based on url
     $("#side-menu a").each(function () {
         var pageUrl = window.location.href.split(/[?#]/)[0];
         if (this.href == pageUrl) {
             $(this).addClass("active");
             $(this).parent().addClass("active"); // add active to li of the current link
             $(this).parent().parent().addClass("in");
             $(this).parent().parent().prev().addClass("active"); // add active class to an anchor
             $(this).parent().parent().parent().addClass("active");
             $(this).parent().parent().parent().parent().addClass("in"); // add active to li of the current link
             $(this).parent().parent().parent().parent().parent().addClass("active");
         }
     });
 
    }
 }
 ]};
$ANContreoller.viewerStl={FUN:['$scope','$rootScope',function($scope,$rootScope) {
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
}]};


$ANDirective.format={FUN:function ($rootScope) {
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
}}