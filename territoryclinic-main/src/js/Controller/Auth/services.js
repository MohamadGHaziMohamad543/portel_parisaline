var RUNAUTOTSTARTAPP=function(event, current, previous, rejection,$location){
    if(rejection === 'Not Authenticated'){
        $location.path('/Auth/Login');
    }
    else if(rejection==="Not Login")
    {
        $location.path('/');
    }
    else if(rejection==="Not Confirm")
    {
        $location.path('/Auth/Confirm');
    }
    else if(rejection==="rePassword")
    {
        $location.path('/Auth/RP');
    }
}
    
var FACT_Render=function(linkArray,auth,$q,$cookies,$location){
    var deferred = $q.defer();
    var isAuthenticated=$cookies.get('PUTERCL')?JSON.parse($cookies.get('PUTERCL')):false;
    
    var num=0;
    var add=()=>{
        if(linkArray.length!=0)
        {
            if(linkArray[num].type=="CSS")
            {
                if(!Styles.find(x=>x==linkArray[num].link))
                {
                  var newSS=document.createElement('link');
                  newSS.rel='stylesheet';
                  newSS.href=linkArray[num].link;
                  newSS.onload=()=>{
                    num++;
                    if(num<=linkArray.length-1)
                    {
                         add();
                    }
                    else{
                        onLoad(true);
                    }
                  }
                  document.getElementsByTagName("head")[0].appendChild(newSS);
                  Styles.push(linkArray[num].link);
                }
                else{
                    num++;
                    if(num<=linkArray.length-1)
                    {
                         add();
                    }
                    else{
                        onLoad(true);
                    }
                }
            }
            else if(linkArray[num].type=="JS"){
                if(!Scripts.find(x=>x==linkArray[num].link))
                {
                    Scripts.push(linkArray[num].link);
                    let script=document.createElement('script');
                    script.src=linkArray[num].link;
                    if(linkArray[num].typeScript)
                    {
                        script.type="module";
                    }
                    script.onload = ()=> {
                        num++;
                       if(num<=linkArray.length-1)
                       {
                            add();
                       }
                       else{
                           onLoad(true);
                       }
                    };
                    script.onerror=()=>{
                        num++;
                       if(num<=linkArray.length-1)
                       {
                           add();
                       }
                       else{
                           onLoad(true);
                       }
                    }
                    document.getElementsByTagName("body")[0].appendChild(script);
                }
                else{
                    num++;
                    if(num<=linkArray.length-1)
                    {
                        add();
                    }
                    else{
                        onLoad(true);
                    }
                }
            }

        }
        else{
            onLoad(true);
        }
    }

    var onLoad=(e)=>{
        if(auth)
        {
            if(isAuthenticated)
            {
                HTTPs.Token=isAuthenticated.token;
                CONFIG.Did=isAuthenticated.dentalCenterId;
                HTTPs.POST(CONFIG.serverUrl+"/TT",{}).then(res=>{
                    res=JSON.parse(res);
                    if(res.message==true)
                    {
                        if(isAuthenticated.phone)
                        {
                            if(($location.$$path=="/Auth/Confirm" || $location.$$path=="/Auth/Confirm"))
                            {
                                deferred.reject('Not Login');
                            }
                            else{
                                deferred.resolve(true);
                            }
                        }
                        else{
                            if(($location.$$path=="/Auth/Confirm" || $location.$$path=="/Auth/Confirm"))
                            {
                                deferred.resolve(true);
                            }
                            else{
                                deferred.reject('Not Confirm');
                            }
                        }
                        
                    }
                    else{
                        deferred.reject('Not Authenticated');
                        $cookies.remove("PUTERCL");
                    }
                })
            }
            else{
                deferred.reject('Not Authenticated');
                $cookies.remove("PUTERCL");
            }
        }
        else{
            if(isAuthenticated && ($location.$$path=="/Auth/Login" || $location.$$path=="/Auth/Signup" ||$location.$$path=="/Auth/RP"))
            {
                deferred.reject('Not Login');
            }
            else{
                if($cookies.get('PS'))
                {
                    if($location.$$path=="/Auth/RP")
                    {
                        deferred.resolve(true);
                    }
                    else{
                        deferred.reject('rePassword');
                    }
                    
                    
                }
                else{
                    deferred.resolve(true);
                }
            }

        }
    }
    add();
    return deferred.promise;
}


$ANFilter.nl2p={FUN:function () {
    return function(text){
        text = String(text).trim();
        return (text.length > 0 ? '<p>' + text.replace(/[\r\n]+/g, '</p><p>') + '</p>' : null);
    }
}}

$ANFilter.time={FUN:function () {
    return function(date){
        date=new Date(date);
        return date.getHours()+':'+date.getMinutes();
    }
}}


$ANFilter.imageUser={
    FUN:function () {
        return function(image){
            if(image)
            {
                let img="";
                if(image.split('googleusercontent').length == 1)
                {
                    img=CONFIG.serverImageUrl+image;
                }
                else{
                    img=image;
                }
                return img;
            }
            else{
                return "";
            }
        }
    }
    
}
