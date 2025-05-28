import { HttpClient, HttpEventType } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class UploadFilesService {
  //'UpSTL | kiven anonymous mohmad hasd'
  idNum=0;
  fileObservabel: BehaviorSubject<any[]> = new BehaviorSubject(null);
  filesList=[];
  constructor(private http:HttpClient) { }
  createFile(id,namePatint,value){
    if(this.filesList.find(x=>x.id==id))
    {
      this.filesList.find(x=>x.id==id).namePatint=namePatint;
      this.filesList.find(x=>x.id==id).value=value;
    }
    else{
      this.filesList.push({id:id,namePatint:namePatint,value:value});
    }
    this.fileObservabel.next(this.filesList);
  }
  deleteFile(id){
    if(this.filesList.find(x=>x.id==id))
    {
      this.filesList.splice(this.filesList.indexOf(this.filesList.find(x=>x.id==id)),1);
    }
    this.fileObservabel.next(this.filesList);
  }
  fileUpdate(){
    return this.fileObservabel.asObservable();
  }
  
  UploadStl(file,params:{},namePatient,id,fun){
    let formdata=new FormData();
    formdata.append('fileData',file);
    this.http.post<any>(environment.url+"/fileManager/uploadFile",formdata,{params:params,reportProgress: true,
      observe: 'events'}).subscribe(resp=>{
        if (resp.type === HttpEventType.Response) {
            this.deleteFile(id);
            fun(id);
          }
          if (resp.type === HttpEventType.UploadProgress) {
              const percentDone = Math.round(100 * resp.loaded / resp.total);
              this.createFile(id,namePatient,percentDone);
          } 
      });
  }


}
