import { Component, OnInit } from '@angular/core';
import {UploadFilesService} from './upload-files.service';
declare var dragElement:any
declare var notReload:any
@Component({
  selector: 'app-upload-files',
  templateUrl: './upload-files.component.html',
  styleUrls: ['./upload-files.component.scss']
})
export class UploadFilesComponent implements OnInit {

 
  constructor(private uploadFilesServ:UploadFilesService) { }

  ngOnInit() {
    
    this.uploadFilesServ.fileUpdate().subscribe(res=>{
      if(res)
      {
        if(res.length==0)
        {
          notReload=false;
        }
        else{
          notReload=true;
        }
        this.fileUpload=res;
      }
    });
    
    dragElement(document.getElementById("uploadBox"));
  }

  fileUpload=[];
  btnDown(){
    document.getElementById("uploadBox").classList.forEach(x=>{
      if(x!="bodyHeaden")
      {
        document.getElementById("uploadBox").classList.add('bodyHeaden');
        document.getElementById("arrowUp").style.display="none";
        document.getElementById("arrowDown").style.display="block";
      }
      else{
        document.getElementById("uploadBox").classList.remove('bodyHeaden');
        document.getElementById("arrowUp").style.display="block";
        document.getElementById("arrowDown").style.display="none";
      }
    })
  }

}
