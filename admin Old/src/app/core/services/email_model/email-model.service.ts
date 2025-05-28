import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders,HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { email_model } from '../../models/email_mode';
import { content_email_model } from '../../models/content_email_model';
@Injectable({
  providedIn: 'root'
})
export class EmailModelService {
  email_model = new BehaviorSubject<email_model[]>(null);
  constructor(private http:HttpClient) { }

  getll_email_model():Observable<email_model[]>{
    return this.email_model.asObservable();
  }
  getllContentById(id:number){
    return this.http.post<content_email_model[]>(environment.url+"/email_model/getAllContent",{email_model_id:id});
  }

  getAll(){
    return this.http.post<email_model[]>(environment.url+"/email_model/getall",{}).subscribe(res=>{
      this.email_model.next(res);
    });
  }
  
  create(param:[]){
   return this.http.post<any>(environment.url+"/email_model/create",param);
  }
  delete(param:[]){
    return this.http.post<any>(environment.url+"/email_model/delete",param);
   }
   deactivate_or_activate(id:number,statu:number){
    return this.http.post<any>(environment.url+"/email_model/deactivate_or_activate",{id:id,status:statu});
   }
   createContent(param:[]){
    return this.http.post<any>(environment.url+"/email_model/createContent",param);
  }
  deleteConent(param:[]){
    return this.http.post<any>(environment.url+"/email_model/deleteContent",{id:param['id']});
  }
  updateContent(param:[]){
    return this.http.post<any>(environment.url+"/email_model/updateContent",param);
  }
}
