import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders,HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../../models/user';
import { environment } from 'src/environments/environment.prod';
@Injectable({
  providedIn: 'root'
})
export class DpService {
  Users = new BehaviorSubject<any[]>(null);
  constructor(private http:HttpClient) { 

  }

  toFormData<T>( formValue: T ) {
  const formData = new FormData();

  for ( const key of Object.keys(formValue) ) {
    const value = formValue[key];
    formData.append(key, value);
  }
  return formData;
 }

   getUsers():Observable<any[]>{
    return this.Users.asObservable();
  }
  getAll(){
    this.http.post<User[]>(environment.url+"/doctorProvider/getall",{}).subscribe(res=>{
      this.Users.next(res);
    });
  }
  
  getUserById(id:number){
    return this.http.post<any>(environment.url+"/doctorProvider/getbyid",{id:id});
  }

  addUser(param:[]){
   return this.http.post<any>(environment.url+"/doctorProvider/create",param);
  }

  updateUser(param:[]){
    return this.http.post<any>(environment.url+"/doctorProvider/update",param);
  }
  deleteUser(param:[]){
    return this.http.post<any>(environment.url+"/doctorProvider/delete",{id:param['id']});
  }

}
