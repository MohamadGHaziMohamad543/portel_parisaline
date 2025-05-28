var CONT_AdditionalInstructions = function ($scope, $location, $rootScope) {
    this.$onInit = function () {
        $scope.datatest = this.filters;
        $scope.buttonNext = this.buttonNext;
        $scope.nextTab = () => {
            $scope.buttonNext();
        };
        if (this.optionId === undefined) {
            $scope.optionId = -1;
        }
        else {
            $scope.optionId = this.optionId;
        }
        var audio = new Audio('assets/sounds/send.wav');
        setTimeout(() => {
            $('.boxChat .boxItems').animate({ scrollTop: $(".boxChat .boxItems .box").height() }, 1000);
        }, 100);
        const inputMessage = document.querySelector('.boxChat .boxInput textarea');
        function setNewSize() {
            if (this.scrollHeight <= 130) {
                this.style.height = "25px";
                this.style.height = this.scrollHeight + "px";
                this.style.overflowY = "hidden";
            }
            else {
                this.style.height = "130px";
                this.style.overflowY = "auto";
            }
        }
        inputMessage.addEventListener('keyup', setNewSize);
        $scope.serverLink = CONFIG.serverImageUrl;
        $scope.dataChat = [];
        $scope.GetAll = () => {
            HTTPs.POST(CONFIG.serverUrl + "/GAAI", { patientId: this.idPatient, optionId: $scope.optionId }).then(res => {
                res = JSON.parse(res);
                if (res.error == 0) {
                    $scope.$apply(() => {
                        $scope.dataChat = res.data;
                        $scope.$emit("updateChatNotifi", true);
                    });
                }
            });
        }
        $scope.isRecord = false;
        $scope.inputMessage = "";
        $scope.uploadAudio = false;
        var audioR;
        class VoiceRecorder {
            constructor() {
                if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {

                } else {
                    alert("getUserMedia is not supported on your browser!");
                }

                this.mediaRecorder
                this.stream;
                this.chunks = []
                this.isRecording = false

                this.recorderRef = document.querySelector("#recorder")
                this.playerRef = document.querySelector("#player");
                this.btnRecord = document.querySelector("#btnRecord")

                // this.btnRecord.onclick = this.startRecording.bind(this)
                // this.btnRecord.onmouseup = this.stopRecording.bind(this)

                this.constraints = {
                    audio: true,
                    video: false
                }

            }

            handleSuccess(stream) {
                this.stream = stream
                this.stream.oninactive = () => {
                    console.log("Stream ended!")
                };
                this.recorderRef.srcObject = this.stream
                this.mediaRecorder = new MediaRecorder(this.stream)
                this.mediaRecorder.ondataavailable = this.onMediaRecorderDataAvailable.bind(this)
                this.mediaRecorder.onstop = this.onMediaRecorderStop.bind(this)
                this.recorderRef.play()
                this.mediaRecorder.start();
            }

            handleError(error) {
                console.log("navigator.getUserMedia error: ", error)
            }

            onMediaRecorderDataAvailable(e) { this.chunks.push(e.data) }

            onMediaRecorderStop(e) {
                const blob = new Blob(this.chunks, { 'type': 'audio/ogg; codecs=opus' })
                $scope.sendMessage(blob);
                this.chunks = []
                this.stream.getAudioTracks().forEach(track => track.stop())
                this.stream = null
            }

            startRecording() {
                if ($scope.isRecord) return
                $scope.isRecord = true;
                // this.startRef.innerHTML = 'Recording...'
                this.playerRef.src = '';
                navigator.mediaDevices
                    .getUserMedia(this.constraints)
                    .then(this.handleSuccess.bind(this))
                    .catch(this.handleError.bind(this));

            }

            stopRecording() {

                if (!$scope.isRecord) return
                $scope.isRecord = false
                // this.startRef.innerHTML = 'Record'
                this.recorderRef.pause()
                this.mediaRecorder.stop();

            }

        }
        $('body').tooltip({
            selector: '[data-toggle="tooltip"]',
            container: 'body'
        });

        audioR = new VoiceRecorder();
        $scope.StartRecordAudio = () => {
            audioR.startRecording();
        }

        $scope.StopRecordAudio = () => {
            audioR.stopRecording();
        }

        document.getElementById('inputSendFile').addEventListener('change', (e) => {
            let typeFile = e.target.files[0].name.split('.');
            if ($scope.typeFileSend == "image") {
                if (typeFile[typeFile.length - 1].toLocaleLowerCase() == "png" || typeFile[typeFile.length - 1].toLocaleLowerCase() == "jpg" || typeFile[typeFile.length - 1].toLocaleLowerCase() == "jpeg" || typeFile[typeFile.length - 1].toLocaleLowerCase() == "gif") {
                    $scope.sendMessage(null, e.target.files[0]);
                }
                else {
                    Tost.error("Error Type", "Please choose a file of image type", 3000);
                }
            }
            else if ($scope.typeFileSend == "stl") {
                if (typeFile[typeFile.length - 1].toLocaleLowerCase() == "stl") {
                    $scope.sendMessage(null, null, e.target.files[0]);
                }
                else {
                    Tost.error("Error Type", "Please choose a file of STL type", 3000);
                }
            }

        });
        $scope.typeFileSend = "";
        $scope.btnSendImage = (type) => {
            $scope.typeFileSend = type;
            document.getElementById('inputSendFile').click();
        }
        $scope.showSTL = (src) => {
            $scope.$emit('showModelStl', src);
        }
        $scope.showImage = (src) => {
            let img = document.querySelector('#modelViewerImage #image');
            img.src = src;
            $viewer.view(0);
        }
        $scope.sendMessage = (audioo = null, image = null, stl = null, video = null) => {
            var dataF = new FormData();
            var typeMessageSend = null;
            if (audioo != null) {
                $scope.$apply(() => {
                    $scope.uploadAudio = true;
                });
                dataF.append("fileDataAudio", audioo, 'audio.ogg');
                typeMessageSend = 1;
            }
            if (image != null) {
                $scope.$apply(() => {
                    $scope.uploadAudio = true;
                });
                dataF.append("fileDataImage", image);
                typeMessageSend = 2;
            }
            if (stl != null) {
                $scope.$apply(() => {
                    $scope.uploadAudio = true;
                });
                dataF.append("fileDataSTL", stl);
                typeMessageSend = 3;
            }
            if (video != null) {
                $scope.$apply(() => {
                    $scope.uploadAudio = true;
                });
                dataF.append("fileDataVideo", video);
                typeMessageSend = 4;
            }
            HTTPs.POST(CONFIG.serverUrl + "/CAAI", dataF, { patientId: this.idPatient, message: inputMessage.value, typeMessage: 2, typeMessageSend: typeMessageSend, optionId: $scope.optionId }).then(res => {
                res = JSON.parse(res);
                if (res.error == 0) {
                    if (res.message == 2000) {
                        $scope.$apply(() => {
                            $scope.uploadAudio = false;
                            $scope.GetAll();
                            inputMessage.value = "";
                            inputMessage.style.height = "25px";
                            audio.play();
                            $scope.inputMessage = "";
                            if (this.status == 4 || this.status == 4.5) {
                                location.reload();
                                $scope.LoadingSendMessages = false;
                            }
                            setTimeout(() => {
                                $('.boxChat .boxItems').animate({ scrollTop: $(".boxChat .boxItems .box").height() }, 1000);
                            }, 100);

                        });
                    }
                }
            });
        }

        $scope.LoadingSendMessages = false;
        $scope.sendMessageAndModifications = () => {
            $scope.LoadingSendMessages = true;
            HTTPs.POST(CONFIG.serverUrl + "/RAC", { patientId: this.idPatient }).then(res => {
                $scope.$apply(() => {
                    $scope.sendMessage();
                });
            });
        }
        let mediaRecorder;
        let recordedChunks = [];
        async function startCapture() {
            try {
                // طلب دفق الفيديو من الشاشة
                const screenStream = await navigator.mediaDevices.getDisplayMedia({
                    video: true,
                    audio: false
                });

                const audioStream = await navigator.mediaDevices.getUserMedia({
                    audio: true,
                    video: false
                });

                const combinedStream = new MediaStream([
                    ...screenStream.getVideoTracks(),
                    ...audioStream.getAudioTracks()
                ]);

                screenStream.getVideoTracks()[0].onended = () => {
                    if (mediaRecorder && mediaRecorder.state !== "inactive") {
                        mediaRecorder.stop(); // إيقاف التسجيل
                    }
                };
                return combinedStream;
            } catch (err) {
                console.error("Error: " + err);
                return null;
            }
        }

        function blobToFile(blob, fileName) {
            return new File([blob], fileName, {
                type: blob.type,
                lastModified: Date.now()
            });
        }

        $scope.IsRecordSCreen = false;
        $scope.StartRecordScreen = () => {
            recordedChunks = [];
            $scope.IsRecordSCreen = true;
            startCapture().then(stream => {
                if (!stream) {
                    $scope.$apply(() => {
                        $scope.IsRecordSCreen = false;
                    })
                    return;
                }
                console.log("Create mediaRecord ..");
                mediaRecorder = new MediaRecorder(stream);
                $scope.IsRecordSCreen = true;
                mediaRecorder.ondataavailable = function (event) {
                    if (event.data.size > 0) {
                        recordedChunks.push(event.data);
                    }
                };

                mediaRecorder.onstop = function () {
                    console.log("test Stop record");
                    const blob = new Blob(recordedChunks, {
                        type: 'video/webm'
                    });
                    const file = blobToFile(blob, 'video.webm');
                    $scope.IsRecordSCreen = false;
                    if (confirm("When you click OK, the recorded video will be sent automatically")) {
                        $scope.sendMessage(null, null, null, file);
                    }
                };

                mediaRecorder.start();
            });
        };



        rootEvents.push('CHAT' + this.idPatient);
        $rootScope.$on('CHAT' + this.idPatient, (event, valueFile) => {
            $scope.GetAll();
            audio.play();
            $scope.inputMessage = "";
            setTimeout(() => {
                $('.boxChat .boxItems').animate({ scrollTop: $(".boxChat .boxItems .box").height() }, 1000);
            }, 100);
        });
        $scope.GetAll();
        $scope.$on('$destroy', () => {
            rootEvents = rootEvents.filter(x => x != 'CHAT' + this.idPatient);
        });
    }
}