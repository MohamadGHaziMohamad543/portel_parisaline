import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders,HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Language } from '../../models/Language';
import { language_classifier } from '../../models/language_classifier';
@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  Language = new BehaviorSubject<Language[]>(null);
  constructor(private http:HttpClient) { }

  getlanguage():Observable<Language[]>{
    return this.Language.asObservable();
  }
  //get transulet language
  getlanguage_classifierById(id:number){
    return this.http.post<language_classifier[]>(environment.url+"/lang/get_all_language_classifier",{langId:id});
  }

  getLanguageAll(){
    return this.http.post<Language[]>(environment.url+"/lang/getalllang",{}).subscribe(res=>{
      this.Language.next(res);
    });
  }
  create(param:[]){
   return this.http.post<any>(environment.url+"/lang/create",param);
  }
  delete(param:[]){
    return this.http.post<any>(environment.url+"/lang/delete",param);
   }
   deactivate_or_activate(id:number,statu:number){
    return this.http.post<any>(environment.url+"/lang/deactivate_or_activate",{id:id,status:statu});
   }
   language_classifierCreate(param:[]){
    return this.http.post<any>(environment.url+"/lang/create_language_classifier",param);
  }
  language_classifierDelete(param:[]){
    return this.http.post<any>(environment.url+"/lang/delete_language_classifier",{id:param['id']});
  }
  language_classifierUpdate(param:[]){
    return this.http.post<any>(environment.url+"/lang/update_language_classifier",{id:param['id']});
  }

  //
  getAllLanguageAndClassfier(){
    
    return this.http.post<any>(environment.url+"/lang/getAllLanguageAndClassfier",{langCode:environment.langCode});
  }
  
}
