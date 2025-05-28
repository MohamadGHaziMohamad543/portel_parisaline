import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders,HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
@Injectable({
  providedIn: 'root'
})
export class FilemanagerService {

  constructor(private http:HttpClient) { }
  
  getAlLFilePlan(id,typePlan){
    return this.http.post<any>(environment.url+"/fileManager/GetAllFile",{id:id,typePlan:typePlan},);
  }
  uploadFile(file,params:{}){
    let formdata=new FormData();
    formdata.append('fileData',file);
    return this.http.post<any>(environment.url+"/fileManager/uploadFile",formdata,{params:params});
  }
  deleteFile(directionName:string){
   return this.http.post<any>(environment.url+"/fileManager/deletefie",{directionName:directionName});
  }
}
