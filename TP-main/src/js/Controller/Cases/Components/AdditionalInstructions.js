var CONT_AdditionalInstructions = function ($scope, $location, $rootScope, $cookies) {
    this.$onInit = function () {
        $scope.datatest = this.filters;
        $scope.buttonNext = this.buttonNext;
        $scope.serverImage = CONFIG.serverImageUrl;
        $scope.elemBoxChat = null;
        //Modal History
        $scope.ModalHistory = false;
        $scope.ListTempleteMenu = false;
        $scope.btnshistory = this.btnshistory;
        $scope.ShowListTempleteMenu = () => {
            $scope.ListTempleteMenu = true;
        }
        $scope.CloseListTempleteMenu = () => {
            $scope.ListTempleteMenu = false;
        }
        $scope.messageHistory = [];
        $scope.ShowModalHostory = () => {
            $scope.ModalHistory = true;
        }
        $scope.CloseModalHostory = () => {
            $scope.ModalHistory = false;
        }

        $scope.InsertTempleteText = (Message) => {
            let event = new KeyboardEvent('keyup', {
                bubbles: true,
                cancelable: true,
                key: 'Enter', // المفتاح الذي تريد محاكاته
                code: 'Enter',
                charCode: 13,
                keyCode: 13,
                which: 13
            });
            inputMessage.dispatchEvent(event);
            inputMessage.value = inputMessage.value + Message;
            $scope.CloseListTempleteMenu();

            // إرسال الحدث
            inputMessage.dispatchEvent(event);
        }

        $scope.GetAllMessageTemplete = () => {
            HTTPs.POST(CONFIG.serverUrl + "/MST/GAMT", {}).then(res => {
                res = JSON.parse(res);
                if (res.error == 0) {
                    $scope.$apply(() => {
                        console.log(res.data);
                        $scope.messageHistory = res.data;
                    });
                }
            });
        }

        $scope.CreateMessageTemplete = () => {
            HTTPs.POST(CONFIG.serverUrl + "/MST/CMT", { Subject: document.querySelector("#modalSubject").value, Message: inputMessage.value }).then(res => {
                res = JSON.parse(res);
                if (res.error == 0) {
                    $scope.$apply(() => {
                        $scope.GetAllMessageTemplete();
                        $scope.CloseModalHostory();
                    });
                }
            });
        }


        $scope.DeleteMessageTemple = (id) => {
            HTTPs.POST(CONFIG.serverUrl + "/MST/DMT", { id: id }).then(res => {
                res = JSON.parse(res);
                if (res.error == 0) {
                    $scope.$apply(() => {
                        $scope.GetAllMessageTemplete();
                    });
                }
            });
        }
        $scope.GetAllMessageTemplete();
        //this function is for editing operations

        //The process of transferring from one tab to another
        $scope.nextTab = () => {
            $scope.buttonNext();
        };
        if (this.optionId === undefined) {
            $scope.optionId = -1;
        }
        else {
            $scope.optionId = this.optionId;
        }

        setTimeout(() => {
            $($scope.elemBoxChat).animate({ scrollTop: $($scope.elemBoxChat).find(".box").height() }, 1000);
        }, 500);

        $scope.ShowModalEdit = (value) => {
            console.log(value);
        }
        const inputMessage = document.querySelector('.boxChat .boxInput textarea');
        if (inputMessage) {
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
        }



        $scope.idMe = -1;
        $scope.dataChat = [];
        $scope.GetAll = () => {
            HTTPs.POST(CONFIG.serverUrl + "/GAAI", { patientId: this.idPatient, optionId: $scope.optionId }).then(res => {
                res = JSON.parse(res);
                if (res.error == 0) {
                    $scope.$apply(() => {
                        $scope.idMe = res.numMessage;
                        $scope.dataChat = res.data;
                        $scope.$emit("updateChatNotifi", true);
                    });
                }
            });
        }
        $scope.inputMessage = "";
        $scope.sendMessage = (e, video = null) => {
            var dataF = new FormData();
            var typeMessageSend = null;
            let textarea = '';
            if (video != null) {
                $scope.$apply(() => {
                    $scope.uploadAudio = true;
                });
                dataF.append("fileDataVideo", video);
                typeMessageSend = 4;
            }
            else {
                textarea = e.currentTarget.parentNode.querySelector('textarea').value;
            }
            HTTPs.POST(CONFIG.serverUrl + "/CAAI", dataF, { patientId: this.idPatient, message: textarea, optionId: this.optionId == undefined ? -1 : this.optionId, IsTemp: this.optionId == undefined ? 0 : 1, typeMessageSend: typeMessageSend }).then(res => {
                res = JSON.parse(res);
                if (res.error == 0) {
                    if (res.message == 2000) {
                        $scope.$apply(() => {
                            $scope.GetAll();
                            $scope.inputMessage = "";
                            if (e.currentTarget.parentNode.querySelector('textarea')) {
                                e.currentTarget.parentNode.querySelector('textarea').value = "";
                                e.currentTarget.parentNode.querySelector('textarea').style.height = "25px";
                            }
                            setTimeout(() => {
                                $($scope.elemBoxChat).animate({ scrollTop: $($scope.elemBoxChat).find(".box").height() }, 1000);
                            }, 100);
                        });
                    }
                }
            });
        }

        $scope.SendMessageNowTemp = (id) => {
            HTTPs.POST(CONFIG.serverUrl + "/SMNT", { idMessage: id }).then(res => {
                res = JSON.parse(res);
                if (res.error == 0) {
                    $scope.$apply(() => {
                        $scope.GetAll();
                    });
                }
            });
        }

        $scope.UndoMessageNowTemp = (id) => {
            HTTPs.POST(CONFIG.serverUrl + "/UMNT", { idMessage: id }).then(res => {
                res = JSON.parse(res);
                if (res.error == 0) {
                    $scope.$apply(() => {
                        $scope.GetAll();
                    });
                }
            });
        }

        $scope.showSTL = (src) => {
            $scope.$emit('showModelStl', src);
        }
        $scope.showImage = (src) => {
            let img = document.querySelector('#modelViewerImage #image');
            img.src = src;
            $viewer.view(0);
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
                        $scope.sendMessage(null, file);
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
                $($scope.elemBoxChat).animate({ scrollTop: $(".boxChat .boxItems .box").height() }, 1000);
            }, 100);
        });
        $scope.GetAll();
        $scope.$on('$destroy', () => {
            rootEvents = rootEvents.filter(x => x != 'CHAT' + this.idPatient);
        });
    }
}

//compnanent  for Cases
adminApp.controller('AdditionalInstructions', ['$scope', '$location', '$rootScope', '$cookies', CONT_AdditionalInstructions]);

adminApp.component('additionalInstructions', {
    bindings: {
        filters: '@',
        buttonNext: '&',
        idPatient: '<',
        optionId: '=',
        btnshistory: '@',
        title: '@',
        TempMessage: '@',
    },
    templateUrl: 'Views/Cases/Components/AdditionalInstructions.html',
    controller: 'AdditionalInstructions'
});

