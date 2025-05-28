$ANContreoller.NotFondPage={
    FUN:['$scope','$location','$cookies',function($scope,$location,$cookies) {
        $scope.$emit('AuthChanged', true);
        var str = document.querySelector('.NotPeermstion1').innerHTML.toString();
        var i = 0;
        document.querySelector('.NotPeermstion1').innerHTML = "";

        setTimeout(function() {
            var se = setInterval(function() {
                i++;
                document.querySelector('.NotPeermstion1').innerHTML = str.slice(0, i) + "|";
                if (i == str.length) {
                    clearInterval(se);
                    document.querySelector('.NotPeermstion1').innerHTML = str;
                }
            }, 20);
        },0);
        
    }],
    Router:{
        Url:"/NotFondPage",
        Templete:'NotFondPage.html',
        Render:[],
        AUTH:true
    }
}