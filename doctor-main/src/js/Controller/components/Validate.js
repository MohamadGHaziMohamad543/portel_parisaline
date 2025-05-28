
var Validate=(elemetForm)=>{
    let AllInput=elemetForm.querySelectorAll('[VFORM]');
    let numberError=0;
    let valueForm={};
    AllInput.forEach(res=>{
       if(res.getAttribute("required") != null)
       {
           if(getTybeElement(res)=="email")
           {
               if(ValidateEmail(res))
               {
                   VSucess(res);
                   valueForm[res.id]=res.value;
               }
               else{
                   numberError++;
                   VError(res);
               }
           }
           else if(getTybeElement(res)=="password")
           {
                if(ValidatePassword(res))
                {
                    VSucess(res);
                    valueForm[res.id]=res.value;
                }
                else{
                    numberError++;
                    VError(res);
                }
           }
           else if(getTybeElement(res)=="text" || getTybeElement(res)=="number"){
                if(ValidateText(res))
                {
                    VSucess(res);
                    valueForm[res.id]=res.value;
                }
                else{
                    numberError++;
                    VError(res);
                }
           }
           else if(getTybeElement(res)=="SELECT"){
                if(ValidateText(res))
                {
                    VSucess(res);
                    valueForm[res.id]=res.value;
                }
                else{
                    numberError++;
                    VError(res);
                }
            }
            else if(getTybeElement(res)=="tel"){
                if(ValidateText(res))
                {
                    VSucess(res);
                    valueForm[res.id]=res.value;
                }
                else{
                    numberError++;
                    VError(res);
                }
            }
            else if(getTybeElement(res)=="TEXTAREA"){
                if(ValidateText(res))
                {
                    VSucess(res);
                    valueForm[res.id]=res.value;
                }
                else{
                    numberError++;
                    VError(res);
                }
            }
       }
       else{
        valueForm[res.id]=res.value;
       }
    });
    if(numberError==0)
    {
        return valueForm;
    }
    return false;
}
function VSucess(res){
    res.classList.add(res.getAttribute('sclass'));//sclass sucess
    res.classList.remove(res.getAttribute('eclass'));//eclass Error Class
    let elementError=res.parentNode.querySelector('.ErrorMessage');
    if(elementError)
    {
        elementError.text="";
    }
}
function VError(res){
    res.classList.add(res.getAttribute('eclass'));//eclass Error Class
    res.classList.remove(res.getAttribute('sclass'));//sclass sucess
    let elementError=res.parentNode.querySelector('.ErrorMessage');
    if(elementError)
    {
        elementError.text=elementError.getAttribute('titleError');
    }
}

function ValidateEmail(res) 
{
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(res.value))
    {
        return (true)
    }
    return (false)
}

function ValidatePassword(res){
    let length=res.getAttribute('len')?res.getAttribute('len'):0 //len =lnegth;
    if(res.value.length >= length && res.value != "")
    {
        return true;
    }
    return false;
}
function ValidateText(res){
    let length=res.getAttribute('len')?res.getAttribute('len'):0 //len =lnegth;
    if(res.value.length >= length && res.value != "")
    {
        return true;
    }
    return false;
}


function getTybeElement(res){
    if(res.tagName=="INPUT"){
        return res.getAttribute("type");
    }
    else if(res.tagName=="SELECT"){
        return "SELECT";
    }
    else if(res.tagName=="TEXTAREA"){
        return "TEXTAREA";
    }
}