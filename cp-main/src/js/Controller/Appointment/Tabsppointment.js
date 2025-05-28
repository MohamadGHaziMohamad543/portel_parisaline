$ANContreoller.Tabsppointment = {
    FUN: ['$scope', '$location', '$routeParams', function ($scope, $location, $routeParams) {
        $scope.$emit('AuthChanged', true);
        $scope.PartnerDoctor = 0;
        // HTTPs.POST(CONFIG.serverUrl + "/Appoentment/GETAll", {dateFilter: new Date().toISOString().split("T")[0]}).then(res => {
        //     res = JSON.parse(res);
        //     $scope.$apply(() => {
        //         if (res.data[0].Partner == 1) {
        //             $scope.PartnerDoctor = res.data[0].Partner;
        //             console.log(res);
        //             if(res.Count[0]['COUNT(*)']==0){
        //                 $scope.selectTabs('Upcoming');
        //             }
        //         }
        //         else{
        //             $location.path('/NotFondPage');
        //         }
        //     });
        // });
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
    
    }],
    Router: {
        Url: "/Appointment",
        Templete: "Views/Appointment/tabsappintment.html",
        Render: [
            { link: 'assets/libs/animate/animate.min.css', type: "CSS" },
            { link: 'assets/libs/datatables/jquery.dataTables.min.js', type: "JS" },
            { link: 'assets/libs/datatables/dataTables.bootstrap4.css', type: "CSS" },
            { link: 'assets/libs/datatables/dataTables.bootstrap4.js', type: "JS" },
            { link: 'assets/libs/ladda/ladda-themeless.min.css', type: "CSS" },
            { link: 'assets/libs/tellPhone/intlTelInput.min.css', type: "CSS" },
            { link: 'https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js', type: "JS" },
            { link: 'https://www.gstatic.com/firebasejs/8.0.0/firebase-auth.js', type: "JS" },
            { link: 'assets/libs/tellPhone/intlTelInput.min.js', type: "JS" },
            { link: 'assets/libs/jquery-mask-plugin/jquery.mask.min.js', type: "JS" },
            { link: 'assets/libs/autonumeric/autoNumeric-min.js', type: "JS" },
            { link: 'assets/libs/ladda/spin.js', type: "JS" },
            { link: 'assets/libs/ladda/ladda.js', type: "JS" },
            { link: 'assets/libs/parsleyjs/parsley.min.js', type: "JS" },
        ],
        AUTH: true
    }
}