$ANDirective.dragDrop={FUN:function ($rootScope) {
    return function (scope, element, attrs) {
        $rootScope.$on('updateUpload'+attrs.id+attrs.idpatient, (event, valueFile)=> {
            if(!tempFiles)
            {
                renderFileUpload(valueFile.file,valueFile.type);
            }
            else{
                UploadFile(valueFile.numberPrograss,'','',valueFile.newPath);
            }
        });
        var imageDefult=element[0].getAttribute("defultimage");
        element[0].addEventListener('dragover', fileDragHover, false);
        element[0].addEventListener('dragleave', fileDragHover, false);
        element[0].addEventListener('drop', fileSelectHandler, false);
        element[0].addEventListener('mouseover', hoverMouseFile, false);
        element[0].addEventListener('mouseout', enterMouseFile, false);
        element[0].addEventListener('click', clickSelectFile, false);
        renderFileDrop();
        function hoverMouseFile(e){
            if(!element[0].querySelector(".divProsess") && !element[0].querySelector(".SucsessFile") )
            {
                if(e.type === 'dragover')
                {
                    e.target.classList.add("dragdropHover");
                    e.target.classList.remove("dragdrop");
                    
                }
                else{
                    e.target.classList.remove("dragdropHover");
                    e.target.classList.add("dragdrop");
                }
            }
        }
        function enterMouseFile(e){
            if(!element[0].querySelector(".divProsess") && !element[0].querySelector(".SucsessFile") )
            {
                if(e.type === 'dragover')
                {
                    e.target.classList.add("dragdropHover");
                    e.target.classList.remove("dragdrop");
                    
                }
                else{
                    e.target.classList.remove("dragdropHover");
                    e.target.classList.add("dragdrop");
                }
            }
        }
        function renderFileDrop(){
            let Items=`
            <div class="imageIcon" style="display:none;">
                <i class="icon"></i>
                <span class="dragDrop-extension"></span>
            </div>
            <div class="image">
                <img src=""  class="${attrs.imgclass}">
            </div>                            
            <div class="dragdrop"></div>
            <input type="file" style="display: none;" />`;
            element[0].innerHTML=Items;
            element[0].querySelector("img").src=imageDefult;
            element[0].querySelector("input[type='file']").addEventListener("change",fileSelectHandler,false);
            if(attrs.filesrc && attrs.filesrc != "")
            {
               let typeFIle =attrs.filesrc.split(".");
                if(typeFIle.length !=0 || typeFIle.length !=1)
                {
                    typeFIle=typeFIle[typeFIle.length-1];
                    if(typeFIle=="png" || typeFIle =="jpeg" || typeFIle=="jpg")
                    {
                        element[0].querySelector('.imageIcon').style.display="none";
                        element[0].querySelector('img').src=CONFIG.serverImageUrl+attrs.filesrc;
                    }
                    else{
                        element[0].querySelector('img').remove();
                        element[0].querySelector('.imageIcon').style.display="block"
                        element[0].querySelector('.imageIcon span').innerHTML=typeFIle;
                    }
                    let item=`<div class="SucsessFile">
                                <div>
                                    <a class="btnSuccessfuly"><i class="fe-eye"></i></a>
                                    <a class="btnRemove"><i class="fe-delete"></i></a>
                                </div>
                            </div>`;
                    $(element[0]).append(item);
                    element[0].querySelector(".btnSuccessfuly").addEventListener("click",viewImage);
                    element[0].querySelector(".btnRemove").addEventListener("click",removeFile);

                }
            }
        }
        function clickSelectFile(){
            if(!element[0].querySelector(".divProsess") && !element[0].querySelector(".SucsessFile"))
            {
              element[0].querySelector("input[type='file']").click();
            }
        }
        function fileDragHover(e) {
            if(element[0].querySelector(".ErrorFile"))
            {
                element[0].querySelector(".ErrorFile").remove();
            }
            if(!element[0].querySelector(".divProsess") && !element[0].querySelector(".SucsessFile"))
            {
                e.stopPropagation();
                e.preventDefault();
                if(e.type === 'dragover')
                {
                    e.target.classList.add("dragdropHover");
                    e.target.classList.remove("dragdrop");
                    
                }
                else{
                    e.target.classList.remove("dragdropHover");
                    e.target.classList.add("dragdrop");
                }
            }
        }
        var tempFiles=null;
        function fileSelectHandler(e) {
            if(!element[0].querySelector(".divProsess") && !element[0].querySelector(".SucsessFile"))
            {
                fileDragHover(e);
                var files = e.target.files || e.dataTransfer.files;
                renderFileUpload(files[0]);
            }
        }
        function readFiles(tempFiles,img){
            var fr = new FileReader();
            fr.onload=()=> {
                img.src= fr.result;
            }
            fr.readAsDataURL(tempFiles);
        }

        function renderFileUpload(files,typeFileTemp=null){
            if(typeFileTemp)
            {
                if(typeFileTemp)
                {
                    if(typeFileTemp=="image")
                    {
                        StartLoaderImage();
                        let img=element[0].querySelector("img");
                        if(!img)
                        {
                            element[0].querySelector(".image").innerHTML=`<img src=""  class="imagePatient">`;
                        }
                        element[0].querySelector('.imageIcon').style.display="none";
                        element[0].querySelector("img").src=files;
                        tempFiles=files;
                    }
                    else{
                        if(element[0].querySelector("img"))
                        {
                            element[0].querySelector("img").remove();
                        }
                        StartLoaderImage();
                        element[0].querySelector('.imageIcon').style.display="block"
                        element[0].querySelector('.imageIcon span').innerHTML=typeFileTemp;
                    }
                }

            }
            else{
                let typeCheckFile=element[0].getAttribute('typefile');
                tempFiles=[];
                typeCheckFile=typeCheckFile.toLowerCase().split(" ");
                let type=files.name.split(".");
                if(type.length > 0)
                {
                    if(typeCheckFile.find(x=>x==type[type.length-1].toLowerCase()))
                    {
                        tempFiles.push(files);
                    }
                }
                // Cancel event and hover styling
                if(tempFiles.length !=0)
                {
                    let ty=tempFiles[0].name.split(".");
                        ty=ty[ty.length-1].toLowerCase();
                        ty=ty.toLowerCase();
                        if(ty.toLowerCase()=="png" || ty =="jpeg" || ty=="jpg")
                        {
                            if (FileReader && tempFiles && tempFiles.length) {
                                StartLoaderImage();
                                let img=element[0].querySelector("img");
                                if(!img)
                                {
                                    element[0].querySelector(".image").innerHTML=`<img src=""  class="imagePatient">`;
                                }
                                element[0].querySelector('.imageIcon').style.display="none";
                                readFiles(tempFiles[0],element[0].querySelector("img"));
                                if(scope.$root.$$phase)
                                {
                                    scope.$emit('uploadFiles', {id:attrs.id,fileName:tempFiles[0].name,filePrograss:0,file:tempFiles[0],event:UploadFile,type:"image",idPatient:attrs.idpatient});
                                }
                                else{
                                    scope.$apply(()=>{
                                        scope.$emit('uploadFiles', {id:attrs.id,fileName:tempFiles[0].name,filePrograss:0,file:tempFiles[0],event:UploadFile,type:"image",idPatient:attrs.idpatient});
                                    });
                                }
                            }
                        }
                        else{
                            if(element[0].querySelector("img"))
                            {
                                element[0].querySelector("img").remove();
                            }
                            StartLoaderImage();
                            element[0].querySelector('.imageIcon').style.display="block"
                            element[0].querySelector('.imageIcon span').innerHTML=ty;
                            if(scope.$root.$$phase)
                            {
                                scope.$emit('uploadFiles', {id:attrs.id,fileName:tempFiles[0].name,filePrograss:0,file:tempFiles[0],event:UploadFile,type:ty,idPatient:attrs.idpatient});
                            }
                            else{
                                scope.$apply(()=>{
                                    scope.$emit('uploadFiles', {id:attrs.id,fileName:tempFiles[0].name,filePrograss:0,file:tempFiles[0],event:UploadFile,type:ty,idPatient:attrs.idpatient});
                                });
                            }
                        }
                }
                else{
                    Tost.warning("Invalid file type","Allowed files "+element[0].getAttribute('typefile'),3000);
                }
            }
            
        }
        function StartLoaderImage(){
            let item=`<div class="divProsess">
                         <a class="textProsess">0%</a>
                           <div class="spinner-border avatar-lg text-primary m-2 loaderProsess" role="status"></div>
                      </div>`;
            $(element[0]).append(item);
        }
        function UploadFile(number,img,fileErorr,newPath=null){
            element[0].querySelector(".textProsess").innerHTML=number+"%"; 
            if(number=="C")
            {
                element[0].querySelector(".divProsess").remove();
                let item=`<div class="SucsessFile">
                        <div>
                            <a class="btnSuccessfuly"><i class="fe-eye"></i></a>
                            <a class="btnRemove"><i class="fe-delete"></i></a>
                        </div>
                    </div>`;
                attrs.filesrc=newPath;
                $(element[0]).append(item);
                element[0].querySelector(".btnSuccessfuly").addEventListener("click",viewImage);
                element[0].querySelector(".btnRemove").addEventListener("click",removeFile);
            }

            if(fileErorr)
            {
                element[0].querySelector(".divProsess").remove();
               let item=`<div class="ErrorFile">
                              <p class="textError" style="width: 100%;">${fileErorr}</p>
                         </div>`;
                $(element[0]).append(item);
            }
        }
        function viewImage(){
            let img=document.querySelector('#modelViewerImage #image');
           if(element[0].querySelector("img"))
           {
            img.src=element[0].querySelector("img").src;
            $viewer.view(0);
           }
           else{
               let typ=element[0].querySelector(".imageIcon span").innerHTML;
               scope.$apply(()=>{
                     scope.$emit('showModelStl', attrs.filesrc);
                });
           }
        }
        function removeFile(){
            StartLoaderImage();
            HTTPs.POST(CONFIG.serverUrl+"/DRP",{src:attrs.filesrc}).then(res=>{
                if(res)
                {
                    element[0].querySelector(".SucsessFile").style.opacity=0;
                    if(!element[0].querySelector("img"))
                    {
                        element[0].querySelector(".imageIcon").style.display="none";   
                        element[0].querySelector(".image").innerHTML=`<img src="${imageDefult}"  class="${attrs.imgclass}">`;
                    }
                    else{
                        element[0].querySelector("img").src=imageDefult;
                    }
                    element[0].querySelector(".SucsessFile").remove();
                    element[0].querySelector(".divProsess").remove();  
                }
            });
        }
    };
}
}