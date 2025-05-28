

class renderFileManager{
    $statusCreate=0;
    $URLGet='http://localhost/AN/api/api/FileManager/GetAll';
    $URLCreate='http://localhost/AN/api/api/FileManager/CF';
    $URLDelete='http://localhost/AN/api/api/FileManager/DF';
    $URLUpload='http://localhost/AN/api/api/FileManager/UF';
    $Direction='/';
    $StaticDirction="/"
    $nameElement='';
    $itemConTextMenu=[];
    ElementConTextMenuSlect=null;
    ConfigUpload="";
    FilesUpload=[];
    OnSlect={};
    setType=[];
    id=null;
    constructor(nameElement,staticSrc){
        this.StaticDirction=staticSrc;
        this.id=nameElement;
        dragElement(document.getElementById('KF'+this.id));
        $(document).on("click",'#KF'+this.id+' .card a[data-toggle="reload"]', (ev)=> {
            ev.preventDefault();
            this.LoadFile();
        });
        $(document).on("click",'#KF'+this.id+' #back',(ev)=> {
            ev.preventDefault();
            this.backFloder();
        });
        $(document).on("click",'#KF'+this.id+' #btnUpload',(ev)=> {
            ev.preventDefault();
            $('#KF'+this.id+' #inputUploadFile').click();
            
        });
        $('#KF'+this.id+' #inputUploadFile').on('change',(ev)=>{
            for(var o=0;o<ev.target.files.length;o++)
            {
                if(this.chekFileType(ev.target.files[o]))
                {
                    this.uploadFile(ev.target.files[o]);
                }
                else{
                    Tost.warning("not allowed","The file type is not allowed "+ev.target.files[o].name);
                }

            }
        });
        $(document).on("click",'#KF'+this.id+' a[file-hide="true"]', (ev)=> {
            $('#KF'+this.id).css('display','none');
        });

    }
    chekFileType=(file)=>{
        let typeFile=file.name.split(".")[file.name.split(".").length-1];
        let isHasFind=0;
        
        if(this.setType.length!=0)
        {
            this.setType.forEach(type => {
                if(typeFile.toLowerCase()==type.toLowerCase())
                {
                    isHasFind=1;
                }
            });
        }
        else{
            isHasFind=1;
        }
        if(isHasFind==1)
        {
            return true;
        }else{
            return false;
        }
    }
    uploadFile=(file)=>{
        let date=new Date();
        let numberFile=date.getMilliseconds().toString()+date.getSeconds().toString()+date.getMinutes().toString()+date.getHours().toString()+date.getDay().toString()+date.getMonth().toString()+date.getFullYear();
        let item=`
        <a id="KUP${numberFile}" href="javascript:void(0);" class="dropdown-item notify-item active" style="margin-top: 3px;">
            <div class="notify-icon">
                <img src="assets/images/icon/ZIP.File.png" class="img-fluid rounded-circle" alt="" />
            </div>
            <p class="notify-details">${file.name}</p>
            <p class="text-muted mb-0 user-msg">
                <div class="progress mb-0" style="position: relative;">
                    <div id="prograssDiv" class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style="width: 75%"></div>
                    <span id="prograssNumber" style="position: absolute;left: 50%;color: #fff;top: -2px;">75%</span>
                </div>
            </p>
        </a>
        `;
        $('#itemsUploadPrograss').append(item);
        this.FilesUpload.push(numberFile);
        $('#numberCountUploadFiles').css("display",'block');
        $('#loadStatusUploadFiles').css("display",'inline-block');
        $('#numberCountUploadFiles').html(this.FilesUpload.length);
        let dataF=new FormData();
        dataF.append("fileToUpload",file);
        dataF.append("Direction",this.$Direction);
        HTTPs.POST(this.$URLUpload,dataF,(e)=>{
           $('#KUP'+numberFile+' #prograssDiv').css('width',parseInt((e.loaded / e.total)*100)+"%");
           $('#KUP'+numberFile+' #prograssNumber').html(parseInt((e.loaded / e.total)*100));
        }).then(res=>{
            res=JSON.parse(res);  
            if(res.error==0){
                this.FilesUpload.splice(this.FilesUpload.indexOf(numberFile),1);
                $('#numberCountUploadFiles').html(this.FilesUpload.length);
                $('#KUP'+numberFile+' #prograssDiv').addClass('bg-success');
                $('#KUP'+numberFile).remove();
                if(this.FilesUpload.length==0)
                {
                    $('#numberCountUploadFiles').css("display",'none');
                    $('#loadStatusUploadFiles').css("display",'none');
                }
                this.LoadFile();
            }
            else{

            }
        });

    }
    LoadFile(){
        Reloader.Start('#KF'+this.id+' .card');
        var dataF=new FormData();
        $('#KF'+this.id+' #Link').val(this.$Direction);
        dataF.append("Direction",this.$Direction);
        HTTPs.POST(this.$URLGet,dataF).then((e)=>{
            e=JSON.parse(e);
            if(e.error==0)
            {
                $('#maxUploadStoring').html(e.config.uploadMax);
                var item="";
                e.data.forEach((e)=>{
                    if(e.File!=".DS_Store")
                    {
                        let isHasFind=0;
                        if(this.setType.length!=0)
                        {
                            this.setType.forEach(type => {
                                if(e.Type.toLowerCase()==type.toLowerCase() || e.isDirection)
                                {
                                    isHasFind=1;
                                }
                            });
                        }
                        else{
                            isHasFind=1;
                        }
                        if((isHasFind==1 && this.setType.length!=0) || (isHasFind==1 && this.setType.length==0))
                        {
                            if(e.Type.toLowerCase()=="jpg" || e.Type.toLowerCase()=="png" || e.Type.toLowerCase()=="jpeg" || e.Type.toLowerCase()=="gif")
                            {
                                item+='<div onerror="alert("asda")" class="fileBox fileContext" Ftype="e.Type" path="'+e.Path+'" style="background-image: url('+CONFIG.serverUrlFile+e.Path+');background-size: 50%;background-position: center;background-repeat: no-repeat;display: flex;justify-content: center;align-items: flex-end;">'+
                                (e.File.length > 12?e.File.substring(0,11)+'..':e.File)+
                             '</div>';
                            }
                            else{
                                item+='<div class="'+(e.isDirection?'FolderBox':'fileBox')+' fileContext" Ftype="'+(e.Type==""?'KNULL':e.Type)+'" path="'+e.Path+'" style="background-image: url(assets/images/icon/'+(e.isDirection?"FOLDER":e.Type)+'.File.png);background-size: 50%;background-position: center;background-repeat: no-repeat;display: flex;justify-content: center;align-items: flex-end;">'+
                                (e.File.length > 12?e.File.substring(0,11)+'..':e.File)+
                             '</div>';
                            }
                        }
                    }

                });
                document.querySelector('#KF'+this.id+' .boxFileManager').innerHTML=item;
                $("#KF"+this.id+" .FolderBox").dblclick((e)=> {
                    var div;
                    if(e.target.tagName=="A" || e.target.tagName=="IMG")
                    {
                        div=e.target.parentNode;
                    }
                    else{
                        div=e.target;
                    }

                    this.$Direction=$(div).attr('PATH').replaceAll('//', '/').replaceAll('//', '/');
                    this.LoadFile();
                  });

                  $("#KF"+this.id+" .fileBox").click((e)=>{
                      this.OnSlect(e.target.getAttribute('path').replaceAll("//",'/').replaceAll("//",'/'));
                  });
                this.renderConTextMenu();
                Reloader.Stop('#KF'+this.id+' .card');
            }
            else{
                Tost.error("Error File Manager",e.data);
            }
        },(error)=> {
            Tost.error("Error File Manager",error);
        });
    }
    renderConTextMenu(){
        $.contextMenu({
            selector: '#KF'+this.id+' .groupFilemanager', 
            idElement:"",
            build: (t, e)=> {
                this.ElementConTextMenuSlect=t.target;
                if(t.target.id=="boxFileManager"){
                    return{
                        items: {
                            CreateFolder: {name: "Create Folder", icon: "file"},
                        }
                    }
                }
                else if(t.target.getAttribute('Ftype')!="KNULL" && t.target.getAttribute('Ftype')!=null){
                    return{
                        items: {
                            edit: {name: "Edit", icon: "edit"},
                            cut: {name: "Cut", icon: "cut"},
                            copy: {name: "Copy", icon: "copy"},
                            paste: {name: "Paste", icon: "paste"},
                            delete: {name: "Delete", icon: "delete"}
                        }
                    }
                }
                else if(t.target.getAttribute('Ftype')=="KNULL"){
                    return{
                        items: {
                            delete: {name: "Delete", icon: "delete"}
                        }
                    }
                }
                else{
                    return false;
                }
            },
            callback: (key, options)=>{
                this.calBackContextMenu(key, options);
            },
        });
    }

    calBackContextMenu(key, options){
        if(options=="CreateFolder")
        {
           this.CreateFolder();
            //Write code here
        }
        else if(options=="edit")
        {
            //Write code here
        }
        else if(options=="cut")
        {
            //Write code here
        }
        else if(options=="copy")
        {
            //Write code here
        }
        else if(options=="paste")
        {
            //Write code here
        }
        else if(options=="delete")
        {
            this.deleteFolder(key);
            //Write code here
        }
    }


    //events For Api
    backFloder(){
        var oldDirection=this.$Direction.split('/');
        var newDirctory="";
        for(var i=0;i<oldDirection.length-1;i++)
        {
            newDirctory+="/"+oldDirection[i];
        }
        this.$Direction=newDirctory.replaceAll('//', '/').replaceAll('//', '/');
        if(this.$Direction=="" || this.$Direction=="/")
        {
            this.$Direction=this.StaticDirction+"/";
            if(this.$Direction=="//")
            {
                this.$Direction="/";
            }
        }
        this.LoadFile();
    }
    CreateFolder(){
        var nameFolder = prompt("Please enter Name new Folder", "");
        if(nameFolder != null)
        {
            if(nameFolder != "")
            {
                var dataf=new FormData();
                dataf.append("NewFolder",nameFolder);
                dataf.append("Direction",this.$Direction);
                HTTPs.POST(this.$URLCreate,dataf).then((e)=>{
                    e=JSON.parse(e);
                    if(e.error==0)
                    {
                        Tost.info("Success",'This Create Folder Successfluy');
                        this.LoadFile();
                    }
                    else{
                        if(e.data==1001)
                        {
                            Tost.error("Error make Folder","the Folder Is exsist");
                        }
                    }
                  
                });
            }
            else{
                Tost.warning("Warning","Please Write Name New Folder");
            }
        }

    }

    deleteFolder(key){
        if(confirm("Are you sure you want to delete the folder?"))
        {
            if(this.ElementConTextMenuSlect)
            {
              let $pathDelete= this.ElementConTextMenuSlect.getAttribute("path").replaceAll("//","/").replaceAll("//","/").replaceAll("//","/");
              let dataF=new FormData();
              dataF.append("pathDelete", $pathDelete);
              HTTPs.POST(this.$URLDelete,dataF).then((e)=>{
                e=JSON.parse(e);
                if(e.error==0)
                {
                    if(e.data==2000)
                    {
                        Tost.info("Success",'This Delete File Successfluy');
                        this.LoadFile();
                    }
                    else if(e.data==2002)
                    {
                        Tost.info("Success",'This Delete Folder Successfluy');
                        this.LoadFile();
                    }
                    else{
                        let nameFolderNotEmpty=prompt("The file is not empty To confirm that the file has been deleted, please write the name of the file");
                        if($pathDelete.split('/')[$pathDelete.split('/').length-1]==nameFolderNotEmpty)
                        {
                            dataF.append('confirmFolder',10);
                            HTTPs.POST(this.$URLDelete,dataF).then((e)=>{
                                e=JSON.parse(e);
                                if(e.error==0)
                                {
                                    if(e.data==2002)
                                    {
                                        Tost.info("Success",'This Delete File Or Folder Successfluy');
                                        this.LoadFile();
                                    }
                                }
                                else{
                                    if(e.data==1016)
                                    {
                                        Tost.error("the file or folder Not fond");
                                    }
                
                                }
                            });
                        }
                    }
                }
                else if(e.error==1){
                    if(e.data==1016)
                    {
                        Tost.error("the file or folder Not fond");
                    }

                }
              
            });
             
            }
        }
    }

    //end events
    Close(){
        $('#KF'+this.id).css('display','none');
    }
    
    Open(src){
        if(src==null)
        {
            this.$Direction="/";
        }
        else{
            this.$Direction=src;
        }
        this.LoadFile();
        $('#KF'+this.id).css('display','block');
    }
}

class FileManager{
   fileM={};
   OnSlect={};
   constructor(srcStatic){
    let date=new Date();
    let idRunDome=date.getMilliseconds().toString()+date.getSeconds().toString()+date.getMinutes().toString()+date.getHours().toString()+date.getDay().toString()+date.getMonth().toString()+date.getFullYear();
    renderAddHtml(idRunDome);
    this.fileM=new renderFileManager(idRunDome,srcStatic);
    this.fileM.OnSlect=(e)=>{
        this.OnSlect(e);
    }
   }
   open(src){
    this.fileM.Open(src);
   }
   Close(){
    this.fileM.Close();
   }
   OnSlect(callback){
    callback(e);
   }
   setType(Types=[]){
       this.fileM.setType=Types;
   }
}

renderAddHtml=(id)=>{

    var item=`
    <style>
    .KFileManager .boxFileManager {
        width: 100%;
        min-height: 300px;
        border: 1px dashed #7d57c2;
        max-height: 300px;
        padding: 15px;
        flex-wrap: wrap;
        display: flex;
        overflow-y: auto;
    }

    .KFileManager .boxFileManager .FolderBox {
        width: 150px;
        height: 150px;
        padding: 6px 16px;
        border: 1px solid #71747a;
        text-align: center;
        margin-left: 9px;
        margin-top: 9px;
    }

    .KFileManager .boxFileManager .fileBox {
        width: 150px;
        height: 150px;
        padding: 6px 16px;
        border: 1px solid #71747a;
        text-align: center;
        margin-left: 9px;
        margin-top: 9px;
    }

    .KFileManager .boxFileManager .FolderBox:hover {
        background-color: #71747a;
        color: #fff;
    }

    .KFileManager .boxFileManager .fileBox:hover {
        background-color: #71747a;
        color: #fff;
    }

    #startRun {
        background-color: #fff;
        width: 100%;
        border: 1px dashed rgb(6, 75, 107);
        padding: 10px;
        margin-left: 1px;

    }

</style>
    <div id="KF${id}" class="KFileManager" style="width: 700px;position:fixed;top: 18%;left: 16%;height: fit-content;    z-index: 999;display:none;">
    <div class="row">
        <div class="col-md-12">
            <div class="card" style="box-shadow: 1px 1px 6px #180240;">
                <div class="card-header bg-primary py-3 text-white" id="kiven-header">
                    <div class="card-widgets">
                        <a href="javascript:;" data-toggle="reload"><i class="mdi mdi-refresh"></i></a>
                        <a data-toggle="collapse" href="javascript:;" role="button" aria-expanded="false"
                            aria-controls="cardCollpase2"><i class="mdi mdi-minus"></i></a>
                        <a href="javascript:;" file-hide="true"><i class="mdi mdi-close"></i></a>
                    </div>
                    <h5 class="card-title mb-0 text-white">File Manager</h5>
                </div>
                <div id="cardCollpase4" class="collapse show">
                    <div class="card-body">
                         <a style="position: relative;top: -11px;">Maximum File Upload Size = <storng style="color: #7d57c2;font-weight: 900;" id="maxUploadStoring"> 0M </storng></a>
                        <div class="row groupFilemanager">
                            <div class="col-md-12">
                                <div class="form-group">
                                    <div style="display: flex;">
                                        <input type="text" class="form-control" readonly value="/" id="Link" required=""
                                            style="border-radius: 0px;">
                                        <button class="btn btn-outline-primary ml-1" id="back"><i
                                                class="fe-arrow-left"></i></button>
                                        <button class="btn btn-outline-primary ml-1" id="btnUpload"><i class="fe-upload-cloud"></i></button>
                                        <input type="file" id="inputUploadFile" style="display: none;" multiple>
                                    </div>
                                </div>
                            </div>
                            <div class="boxFileManager" id="boxFileManager">
                                <div></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div> <!-- end card-->
        </div>
    </div>
</div>
    `;
    $('body').append(item);
}