import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders,HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { socialMedia } from '../../models/socialMedia';
import { environment } from 'src/environments/environment.prod';
@Injectable({
  providedIn: 'root'
})
export class SocialMediaService {

  socialMedia = new BehaviorSubject<socialMedia[]>(null);
  constructor(private http:HttpClient) { 

  }
   setSocialMedia():Observable<socialMedia[]>{
    return this.socialMedia.asObservable();
   }
   getAll(){
    this.http.post<socialMedia[]>(environment.url+"/socialMedia/getAll",{}).subscribe(res=>{
      this.socialMedia.next(res);
    })
  }
  
  create(param:[]){
    return this.http.post<any>(environment.url+"/socialMedia/create",param);
  }
  update(param:[]){
    return this.http.post<any>(environment.url+"/socialMedia/update",param);
  }

  delete(id:number){
    return this.http.post<any>(environment.url+"/socialMedia/delete",{id:id});
  }
}
