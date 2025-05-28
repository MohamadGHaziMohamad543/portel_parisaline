var CONT_Tabsppointment = function ($scope, $location, $routeParams) {
    $scope.$emit('AuthChanged', true);
    $scope.PartnerDoctor = 0;
    HTTPs.POST(CONFIG.serverUrl + "/Appointment/getCountAppointment", {dateFilter: new Date().toISOString().split("T")[0]}).then(res => {
        res = JSON.parse(res);
        $scope.$apply(() => {
            if (res.data[0].Partner == 1) {
                $scope.PartnerDoctor = res.data[0].Partner;
                console.log(res);
                if(res.Count[0]['COUNT(*)']==0){
                    $scope.selectTabs('Upcoming');
                }
            }
            else{
                $location.path('/NotFondPage');
            }
        });
    });
    $scope.Tabs = [
        { name: `Previous`, status: 0 },
        { name: `Today's`, status: 1 },
        { name: 'Upcoming', status: 0 }
    ];

    $scope.selectTabs = (tab) => {
        for (let i = 0; i < $scope.Tabs.length; i++) {
            if ($scope.Tabs[i].name == tab) {
                $scope.Tabs[i].status = 1;
            }
            else {
                $scope.Tabs[i].status = 0;
            }
        }
    }


}   