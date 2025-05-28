$ANContreoller.Meet={
    FUN:['$scope','$location','$routeParams','$cookies',function($scope,$location,$routeParams,$cookies) {
    $scope.$emit('AuthChanged', false);

    var api;
    $scope.Users={};
    $scope.infoAccount=null;
    $scope.getInfoAccount=()=>{
        HTTPs.POST(CONFIG.serverUrl+'/getInfoAccWithId',{}).then(resultData=>{
            resultData=JSON.parse(resultData);
            if(resultData.error==0)
            {
                DataBaseFire.ListingData(`Meet/${$routeParams.id}/`,false,(res)=>{
                    if(res.val().status==true)
                    {
                     if(!api)
                     {
                         var domain = "meet.kb-turk.com";
                         var options = {
                             roomName: $routeParams.id,
                             userInfo: {
                                 displayName:  resultData.data[0].userName
                             },
                             configOverwrite: {startWithVideoMuted:true },
                             interfaceConfigOverwrite: { TILE_VIEW_MAX_COLUMNS: 2 },
                             parentNode: document.querySelector('#meet'),
                         }
                         api = new KivenMeetExternalAPI(domain, options);
                         api.on('passwordRequired',()=>{
                            api.executeCommand('password', "a514286_+");
                         });
                         api.addEventListener('participantRoleChanged', function(event) {
                            if (event.role === "moderator") {
                                api.executeCommand('password', "a514286_+");
                            }
                        });
                        if($scope.$root.$$phase){
                            $scope.Users=res.val().Users;
                        }
                        else{
                            $scope.$apply(()=>{
                                $scope.Users=res.val().Users;
                            });
                        }
                     }
                     else{
                        if($scope.$root.$$phase){
                            $scope.Users=res.val().Users;
                        }
                        else{
                            $scope.$apply(()=>{
                                $scope.Users=res.val().Users;
                            });
                        }
                     }
                    }
                    else{
                        api=null;
                         document.querySelector('#meet').innerHTML='';
                     }
                 });
            }
        })
    }


    $scope.getInfoAccount();

     $scope.AcceptedUser=(key)=>{
        DataBaseFire.Update(`Meet/${$routeParams.id}/Users/${key}/status`,true).then(res=>{
            
        });
     }
     $scope.StopUser=(key)=>{
        DataBaseFire.Update(`Meet/${$routeParams.id}/Users/${key}/status`,false).then(res=>{
            
        });
     }
    }],
    Router:{
        Url:"/Meet/:id",
        Templete:"Views/MeetManager/Meet.html",
        Render:[
            {link:'assets/libs/switchery/switchery.min.css',type:"CSS"},
            {link:'assets/libs/custombox/custombox.min.css',type:"CSS"},
            {link:'assets/libs/switchery/switchery.min.js',type:"JS"},
            {link:'assets/libs/custombox/custombox.min.js',type:"JS"},
            {link:'assets/libs/ladda/ladda-themeless.min.css',type:"CSS"},
            {link:'assets/libs/jquery-mask-plugin/jquery.mask.min.js',type:"JS"},
            {link:'assets/libs/autonumeric/autoNumeric-min.js',type:"JS"},
            {link:'assets/libs/ladda/spin.js',type:"JS"},
            {link:'assets/libs/ladda/ladda.js',type:"JS"},
            {link:'assets/libs/parsleyjs/parsley.min.js',type:"JS"},
            {link:'https://meet.kb-turk.com/external_api.js',type:"JS"},
        ],
        AUTH:true
    }
}