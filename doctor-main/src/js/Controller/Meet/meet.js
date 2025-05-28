var CONT_Meet=function($scope,$location,$routeParams){
    $scope.$emit('AuthChanged', false);

    var api=null;
    $scope.Users={};
    HTTPs.POST(CONFIG.serverUrl+"/GPD",{}).then(res=>{
        res=JSON.parse(res);
        console.log(res);
        if(res.error==0)
        {
            DataBaseFire.GET(`Users/T2/U${res.data.id}/${$routeParams.id}`).then((resultNot)=>{
                DataBaseFire.ListingData(`Meet/${resultNot.idMeet}/Users/${resultNot.idUserMeet}`,false,(resUltMeet)=>{
                    if(resUltMeet.val().status==true)
                    {
                     if(api==null)
                     {
                        document.querySelector('#meet').innerHTML=``;
                         var domain = "meet.kb-turk.com";
                         var options = {
                             roomName: resultNot.idMeet,
                             userInfo: {
                                 displayName: resUltMeet.val().userName
                             },
                             configOverwrite: {startWithVideoMuted:true },
                             interfaceConfigOverwrite: { TILE_VIEW_MAX_COLUMNS: 2 },
                             parentNode: document.querySelector('#meet')
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
                     }
                     else{
                        
                     }
                    }
                    else{
                        api=null;
                         document.querySelector('#meet').innerHTML=`
                         <div>
                            <div class="spinner-border avatar-lg text-primary m-2" role="status"></div>
                            <h1>Wait while the request is accepted</h1>
                         </div>
                         `;
                     }
                });
            })
        }
    });
}