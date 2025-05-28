var CONT_AdditionalInstructions=function($scope,$location,$rootScope) {
    this.$onInit = function() {
        $scope.init=()=>{
            navigator.mediaDevices.getUserMedia({video: false, audio: true}).then((stream) => {
                    
            }).catch((err) => {
                console.error(`you got an error: ${err}`)
            });
            $scope.datatest=this.filters;
            $scope.buttonNext=this.buttonNext;
            $scope.serverImage=CONFIG.serverImageUrl;
            $scope.typeUser=this.typeUser;
            $scope.UserId=-1;
            $scope.nextTab=()=>{
                $scope.buttonNext();
            };
            var audio=new Audio('assets/sounds/send.wav');
            $scope.serverLink=CONFIG.serverImageUrl;
            $scope.setUserId=(id)=>{
                let Comment=$scope.dataChat.find(x=>x.id==id);
               if(Comment.typeSend==3){
                    $scope.UserId=Comment.laboratoryId;
                 }
                 else if(Comment.typeSend==4)
                 {
                    $scope.UserId=Comment.mediatorId;
                 }
                 else if(Comment.typeSend==5)
                 {
                    $scope.UserId=Comment.tretmentId;
                 }
                 else if(Comment.typeSend==7)
                 {
                    $scope.UserId=Comment.supervisorId;
                 }
            }
            $scope.UserType="Doctor";
            if(this.typeUser==2)
            {
                $scope.UserType="Doctor";
            }
            else if(this.typeUser==3)
            {
                $scope.UserType="LAB";
            }
            else if(this.typeUser==4)
            {
                $scope.UserType="Coordinator";
            }
            else if(this.typeUser==5)
            {
                $scope.UserType="TreatmentPlanners";
            }
            else if(this.typeUser==7)
            {
                $scope.UserType="Supervisor";
            }
            var nodeParent=document.querySelector("additional-instructions[type-user='"+this.typeUser+"']");
            setTimeout(() => {
                $("#AD"+this.typeUser+' .boxChat .boxItems').animate({ scrollTop: $("#AD"+this.typeUser+" .boxChat .boxItems .box").height() }, 1000);
            }, 100);
            const inputMessage = nodeParent.querySelector('.boxChat .boxInput textarea');
            function setNewSize() {
                if(this.scrollHeight <= 130)
                {
                    this.style.height="25px";
                    this.style.height = this.scrollHeight + "px";
                    this.style.overflowY="hidden";
                }
                else{
                    this.style.height="130px";
                    this.style.overflowY="auto";
                }
            }
            inputMessage.addEventListener('keyup', setNewSize);
        
            $scope.dataChat=[];
            $scope.GetAll=()=>{
                HTTPs.POST(CONFIG.serverUrl+"/GAAI",{patientId:this.idPatient,type:this.typeUser}).then(res=>{
                    res=JSON.parse(res);
                    if(res.error==0)
                    {
                        $scope.$apply(()=>{
                            $scope.dataChat=res.data;
                            $scope.$emit("updateChatNotifi",true);
                        });
                    }
                });
            }
            $scope.isRecord=false;
            $scope.inputMessage="";
            $scope.uploadAudio=false;
            // class VoiceRecorder {
            //     constructor() {
            //         if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    
            //         } else {
            //             alert("getUserMedia is not supported on your browser!");
            //         }
            
            //         this.mediaRecorder
            //         this.stream;
            //         this.chunks = []
            //         this.isRecording = false
            
            //         this.recorderRef = document.querySelector("#recorder")
            //         this.playerRef = document.querySelector("#player");
            //         this.btnRecord = document.querySelector("#btnRecord")
                    
            //         this.btnRecord.onmousedown = this.startRecording.bind(this)
            //         this.btnRecord.onmouseup = this.stopRecording.bind(this)
            
            //         this.constraints = {
            //             audio: true,
            //             video: false
            //         }
    
            //         this.wavesurfer = WaveSurfer.create({
            //             container     : '#chartAudio',
            //             waveColor     : '#6969ab',
            //             interact      : true,
            //             cursorWidth   : 0,
            //             height:60,
            //             plugins: [
            //                 WaveSurfer.microphone.create()
            //             ]
            //             });
                
            //             this.wavesurfer.microphone.on('deviceReady', function(stream) {
            //                 console.log('Device ready!', stream);
            //             });
            //             this.wavesurfer.microphone.on('deviceError', function(code) {
            //                 console.warn('Device error: ' + code);
            //             });
            //     }
            
            //     handleSuccess(stream) {
            //         this.stream = stream
            //         this.stream.oninactive = () => {
            //             console.log("Stream ended!")
            //         };
            //         this.recorderRef.srcObject = this.stream
            //         this.mediaRecorder = new MediaRecorder(this.stream)
            //         this.mediaRecorder.ondataavailable = this.onMediaRecorderDataAvailable.bind(this)
            //         this.mediaRecorder.onstop = this.onMediaRecorderStop.bind(this)
            //         this.recorderRef.play()
            //         this.mediaRecorder.start();
            //     }
            
            //     handleError(error) {
            //         console.log("navigator.getUserMedia error: ", error)
            //     }
                
            //     onMediaRecorderDataAvailable(e) { this.chunks.push(e.data) }
                
            //     onMediaRecorderStop(e) { 
            //             const blob = new Blob(this.chunks, { 'type': 'audio/ogg; codecs=opus' })
            //             $scope.sendMessage(blob);
            //             this.chunks = []
            //             this.stream.getAudioTracks().forEach(track => track.stop())
            //             this.stream = null
            //     }
            
            //     startRecording() {
            //         if ($scope.isRecord) return
            //         $scope.$apply(()=>{
            //             $scope.isRecord = true;
            //         });
            //         // this.startRef.innerHTML = 'Recording...'
            //         this.playerRef.src = '';
            //         navigator.mediaDevices
            //             .getUserMedia(this.constraints)
            //             .then(this.handleSuccess.bind(this))
            //             .catch(this.handleError.bind(this));
            //             this.wavesurfer.microphone.start();
            //     }
                
            //     stopRecording() {
                   
            //         if (!$scope.isRecord) return
            //         $scope.isRecord = false
            //         // this.startRef.innerHTML = 'Record'
            //         this.recorderRef.pause()
            //         this.mediaRecorder.stop();
    
            //         setTimeout(() => {
            //             this.wavesurfer.microphone.stop();
            //         }, 100);
            //     }
                
            // }
            
            // $scope.renderAudio=()=>{
            //     window.voiceRecorder = new VoiceRecorder();
            // }
            $scope.inputMessage="";

            document.getElementById('inputSendFile').addEventListener('change',(e)=>{
                let typeFile=e.target.files[0].name.split('.');
                if($scope.typeFileSend=="image")
                {
                    if(typeFile[typeFile.length-1].toLocaleLowerCase()=="png" || typeFile[typeFile.length-1].toLocaleLowerCase()=="jpg" || typeFile[typeFile.length-1].toLocaleLowerCase()=="jpeg" || typeFile[typeFile.length-1].toLocaleLowerCase()=="gif")
                    {
                        $scope.sendMessage(null,e.target.files[0]);
                    }
                    else{
                        Tost.error("Error Type","Please choose a file of image type",3000);
                    }
                }
                else if($scope.typeFileSend=="stl"){
                    if(typeFile[typeFile.length-1].toLocaleLowerCase()=="stl")
                    {
                        $scope.sendMessage(null,null,e.target.files[0]);
                    }
                    else{
                        Tost.error("Error Type","Please choose a file of STL type",3000);
                    }
                }

            });
            $scope.typeFileSend="";
            $scope.btnSendImage=(type)=>{
                $scope.typeFileSend=type;
                document.getElementById('inputSendFile').click();
            }
            $scope.showSTL=(src)=>{
                $scope.$emit('showModelStl', src);
            }
            $scope.showImage=(src)=>{
                let img=document.querySelector('#modelViewerImage #image');
                img.src=src;
                $viewer.view(0);
            }
            $scope.sendMessage=(audioo=null,image=null,stl=null)=>{
                var dataF=new FormData();
                var typeMessageSend=null;
                if(audioo != null)
                {
                    $scope.$apply(()=>{
                        $scope.uploadAudio=true;
                    });
                    dataF.append("fileDataAudio",audioo,'audio.ogg');
                    typeMessageSend=1;
                }
                if(image !=null)
                {
                    $scope.$apply(()=>{
                        $scope.uploadAudio=true;
                    });
                    dataF.append("fileDataImage",image);
                    typeMessageSend=2;
                }
                if(stl !=null)
                {
                    $scope.$apply(()=>{
                        $scope.uploadAudio=true;
                    });
                    dataF.append("fileDataSTL",stl);
                    typeMessageSend=3;
                }
                HTTPs.POST(CONFIG.serverUrl+"/CAAI",dataF,{patientId:this.idPatient,message:inputMessage.value,type:this.typeUser,userId:$scope.UserId,typeMessageSend:typeMessageSend}).then(res=>{
                    res=JSON.parse(res);
                    if(res.error==0)
                    {
                        if(res.message==2000)
                        {
                            $scope.$apply(()=>{
                                $scope.GetAll();
                                inputMessage.value="";
                                inputMessage.style.height="25px";
                                $scope.uploadAudio=false;
                                $scope.inputMessage="";
                                setTimeout(() => {
                                    $("#AD"+this.typeUser+' .boxChat .boxItems').animate({ scrollTop: $("#AD"+this.typeUser+" .boxChat .boxItems .box").height() }, 1000);
                                }, 100);
                            });
                        }
                    }
                });
            }

            rootEvents.push('CHAT'+this.idPatient+"AD"+this.typeUser);
            $rootScope.$on('CHAT'+this.idPatient+"AD"+this.typeUser, (event, valueFile)=> {
                $scope.GetAll();
                audio.play();
                $scope.inputMessage="";
                setTimeout(() => {
                    $("#AD"+this.typeUser+' .boxChat .boxItems').animate({ scrollTop: $("#AD"+this.typeUser+" .boxChat .boxItems .box").height() }, 1000);
                }, 100);
            });
            $scope.GetAll();
            $scope.$on('$destroy',()=> {
                rootEvents=rootEvents.filter(x=>x!='CHAT'+this.idPatient+"AD"+this.typeUser);
            });
        }

        // setTimeout(() => {
        //     $scope.$apply(()=>{
        //         $scope.init();
        //     });
        // }, 50);
    }
}

    //compnanent  for Cases
    adminApp.controller('AdditionalInstructions', ['$scope','$location','$rootScope',CONT_AdditionalInstructions]);

    adminApp.component('additionalInstructions', {
        bindings: { 
            filters: '@',
            buttonNext: '&',
            idPatient: '<',
            typeUser: '@',
        },
        templateUrl: 'Views/Cases/Components/AdditionalInstructions.html?v=123123',
        controller: 'AdditionalInstructions'
    });