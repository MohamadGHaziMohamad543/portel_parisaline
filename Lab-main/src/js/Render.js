var firebaseApp1=null;
var provider=null;

var Styles=[];
var Scripts=[];


class $Render{
    num=0;
    onLoad={};
    linkArray=[];
    constructor(fun,linkArray=null){
        this.linkArray=linkArray;
        this.onLoad=fun;
    }
    addScript(link){
        this.linkArray.push(link);
        return this;
    }
    addStyle(link){
        if(!Styles.find(x=>x==link))
        {
          var newSS=document.createElement('link');
          newSS.rel='stylesheet';
          newSS.href=link;
          document.getElementsByTagName("head")[0].appendChild(newSS);
          Styles.push(link);
        }
        return this;
    }
    Start()
    {
        if(this.linkArray.length!=0)
        {
            if(!Scripts.find(x=>x==this.linkArray[this.num]))
            {
                Scripts.push(this.linkArray[this.num]);
                let script=document.createElement('script');
                script.src=this.linkArray[this.num];
                script.onload = ()=> {
                    this.num++;
                   if(this.num<=this.linkArray.length-1)
                   {
                       this.Start();
                   }
                   else{
                       this.onLoad(true);
                   }
                };
                script.onerror=()=>{
                    this.num++;
                   if(this.num<=this.linkArray.length-1)
                   {
                       this.Start();
                   }
                   else{
                       this.onLoad(true);
                   }
                }
                document.getElementsByTagName("body")[0].appendChild(script);
            }
            else{
                this.num++;
                if(this.num<=this.linkArray.length-1)
                {
                    this.Start();
                }
                else{
                    this.onLoad(true);
                }
            }
        }
        else{
            if(this.onLoad)
            {
                setTimeout(() => {
                    this.onLoad(true);
                }, 1);
            }
        }
    }
}



let dragElement=(elmnt)=> {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    if (elmnt.querySelector('#kiven-header')) {
      /* if present, the header is where you move the DIV from:*/
      elmnt.querySelector('#kiven-header').onmousedown = dragMouseDown;
    } else {
      /* otherwise, move the DIV from anywhere inside the DIV:*/
      elmnt.onmousedown = dragMouseDown;
    }

    function dragMouseDown(e) {
      elmnt.style.zIndex=9999999;
      document.querySelectorAll('.KFileManager').forEach(res=>{
          if(res.id != elmnt.id)
          {
            res.style.zIndex--;
          }
      })
      e = e || window.event;
      // get the mouse cursor position at startup:
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = closeDragElement;
      // call a function whenever the cursor moves:
      document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
      e = e || window.event;
      // calculate the new cursor position:
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
      // set the element's new position:
      elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
      elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
      document.onmouseup = null;
      document.onmousemove = null;
    }
  }




  const getBase64FromUrl = async (url) => {
    const data = await fetch(url);
    const blob = await data.blob();
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(blob); 
      reader.onloadend = () => {
        const base64data = reader.result;   
        resolve(base64data);
      }
    });
  }


  var CONFIG={
    PORTAL:"PLAB",
    serverUrl:`https://${DomianStatic}/`,
    serverImageUrl:`https://${DomianStatic}/`,
    serverSocket:`https://${DomianStatic}/`,
    };

    CONFIG.serverUrl=CONFIG.serverUrl+CONFIG.PORTAL;

  var rootEvents=[];


// if ("serviceWorker" in navigator) {
//     window.addEventListener("load", function() {
//       navigator.serviceWorker
//         .register("/servicesWorker.js")
//         .then(res => console.log("service worker registered"))
//         .catch(err => console.log("service worker not registered", err))
//     })
//   }

  const crypt = (salt, text) => {
    const textToChars = (text) => text.split("").map((c) => c.charCodeAt(0));
    const byteHex = (n) => ("0" + Number(n).toString(16)).substr(-2);
    const applySaltToChar = (code) => textToChars(salt).reduce((a, b) => a ^ b, code);
  
    return text
      .split("")
      .map(textToChars)
      .map(applySaltToChar)
      .map(byteHex)
      .join("");
  };
  
  const decrypt = (salt, encoded) => {
    const textToChars = (text) => text.split("").map((c) => c.charCodeAt(0));
    const applySaltToChar = (code) => textToChars(salt).reduce((a, b) => a ^ b, code);
    return encoded
      .match(/.{1,2}/g)
      .map((hex) => parseInt(hex, 16))
      .map(applySaltToChar)
      .map((charCode) => String.fromCharCode(charCode))
      .join("");
  };

 var $CRID={};

 $CRID.TO=(id)=>{
     return crypt("kiveanonymous",CryptoJS.AES.encrypt(id, "kivenanonymous").toString());
 }
 $CRID.END=(id)=>{
   let DEC= CryptoJS.AES.decrypt(decrypt("kiveanonymous",id), "kivenanonymous");
   DEC=DEC.toString(CryptoJS.enc.Utf8);
    if(!DEC && DEC=="")
    {
        return false;
    }
    return DEC;
 }
 
 var $ANContreoller={};
 var $ANComponent={};   
 var $ANFilter={};
 var $ANDirective={};