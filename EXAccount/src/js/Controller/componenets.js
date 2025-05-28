



//ajax



var HTTPs={
    Token:null,
    POST:function(Link,data,params={},funProgras=null){
        return new Promise(function(resolve, reject) {
            let url = new URL(Link);
            Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
            let Headers={};
            Headers['Authorization']="Bearer "+HTTPs.Token;
            if(!data.values)
            {
               Headers['content-type']="application/json";
               data=JSON.stringify(data);
            }
            fetch(url, {
               "headers": Headers,
               "body": data,
               "method": "POST",
               }).then(res=>{
                   if(funProgras)
                   {
                    PrograssK(res.body.getReader());
                   }
                   else{
                    resolve(res.text());
                   }
                 })
                 .catch(err=>{
                   reject(err.text());  
                });
                function PrograssK(reader) {
                    var total = 0
                    function pump() {
                        reader.read().then(({done, value}) => {
                          if (done) {
                            resolve(done);
                            return
                          }
                          total += value.byteLength
                          funProgras({NOW:value.byteLength,TOTAL:total});
                          pump()
                        }).catch(err=>reject(err));
                    }
                    pump()
                 }
       });
        
    },
    POSTFile:function(Link,data,params={},funProgras=null){
        return new Promise(function(resolve, reject) {
            let url = new URL(Link);
            Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
            var xhr = new XMLHttpRequest();
            xhr.upload.onload =function(){
                console.log('The upload is completed:'+xhr.status+xhr.response);
            }
            xhr.upload.onerror =function(){
                console.error('Upload failed.');
            }
            xhr.upload.onabort =function(){
                console.error('Upload cancelled.');
            }
            xhr.upload.onprogress = function(event){
                funProgras({loaded:event.loaded,total:event.total });
            }
            xhr.upload.addEventListener('progress', (e)=>{
                if(funProgras)
                {
                   // funProgras("C");
                }
            }, false)
            xhr.onreadystatechange = function(){ 
                if ( xhr.readyState == 4 ) { 
                  if ( xhr.status == 200 ) { 
                    resolve(xhr.responseText);
                  } else {
                    reject(xhr.responseText); 
                  } 
                } 
            };
            xhr.open("POST",url);
            xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
            if(!data.values)
            {
                xhr.setRequestHeader("content-type","application/json");
               data=JSON.stringify(data);
            }
            xhr.setRequestHeader("Authorization","Bearer "+HTTPs.Token); 
            xhr.send(data);   
        });
    }
}


//toster Messages
var Tost={
    Tost:function(title,text,timeStop,position,color){
        $.toast({
            text : '<h4 style="color:#fff">'+title+'</h4>\n<p>'+text+'</p>',
            hideAfter : timeStop?timeStop:3000,
            showHideTransition : 'slide',
            position : position?position:'top-right',
            stack : 100, 
            allowToastClose : true,  
            bgColor : color
          })
    },
    info:function(title,text,timeStop,position){
        this.Tost(title,text,timeStop,position,'#23B65D');
    },
    error:function(title,text,timeStop,position){
        this.Tost(title,text,timeStop,position,'#E01A31');
    },
    warning:function(title,text,timeStop,position){
        this.Tost(title,text,timeStop,position,'#ff9966');
    },
    help:function(title,text,timeStop,position){
        this.Tost(title,text,timeStop,position,'#6523d9');
    }
}

//reload 

var Reloader={
    Start:function($nameDiv){
        $(document.querySelector($nameDiv)).append('<div class="card-disabled"><div class="card-portlets-loader"></div></div>');
    },
    Stop:function($nameDiv){
        $(document.querySelector($nameDiv)).find('.card-disabled').fadeOut('slow',function(){
            $(document.querySelector($nameDiv)).find('.card-disabled').remove();
        });
    }
}

//get current User


