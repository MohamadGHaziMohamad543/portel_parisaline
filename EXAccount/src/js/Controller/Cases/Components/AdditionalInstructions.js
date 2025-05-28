var CONT_AdditionalInstructions=function($scope,$location,$rootScope) {
    this.$onInit = function() {
        $scope.datatest=this.filters;
        $scope.buttonNext=this.buttonNext;
        $scope.nextTab=()=>{
            $scope.buttonNext();
        };
        var audio=new Audio('assets/sounds/send.wav');
        setTimeout(() => {
            $('.boxChat .boxItems').animate({ scrollTop: $(".boxChat .boxItems .box").height() }, 1000);
        }, 100);
        const inputMessage = document.querySelector('.boxChat .boxInput textarea');
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
            HTTPs.POST(CONFIG.serverUrl+"/GAAI",{patientId:this.idPatient}).then(res=>{
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
        $scope.inputMessage="";
        $scope.sendMessage=()=>{
            HTTPs.POST(CONFIG.serverUrl+"/CAAI",{patientId:this.idPatient,message:inputMessage.value}).then(res=>{
                res=JSON.parse(res);
                if(res.error==0)
                {
                    if(res.message==2000)
                    {
                        $scope.$apply(()=>{
                            $scope.GetAll();
                            inputMessage.value="";
                            inputMessage.style.height="25px";
                            audio.play();
                            $scope.inputMessage="";
                            setTimeout(() => {
                                $('.boxChat .boxItems').animate({ scrollTop: $(".boxChat .boxItems .box").height() }, 1000);
                            }, 100);
                        });
                    }
                }
            });
        }

        rootEvents.push('CHAT'+this.idPatient);
        $rootScope.$on('CHAT'+this.idPatient, (event, valueFile)=> {
            $scope.GetAll();
            audio.play();
            $scope.inputMessage="";
            setTimeout(() => {
                $('.boxChat .boxItems').animate({ scrollTop: $(".boxChat .boxItems .box").height() }, 1000);
            }, 100);
        });
        $scope.GetAll();
        $scope.$on('$destroy',()=> {
            rootEvents=rootEvents.filter(x=>x!='CHAT'+this.idPatient);
        });
    }
}

    //compnanent  for Cases
    adminApp.controller('AdditionalInstructions', ['$scope','$location','$rootScope',CONT_AdditionalInstructions]);

    adminApp.component('additionalInstructions', {
        bindings: { 
            filters: '@',
            buttonNext: '&',
            idPatient: '<',
        },
        templateUrl: 'Views/Cases/Components/AdditionalInstructions.html',
        controller: 'AdditionalInstructions'
    });