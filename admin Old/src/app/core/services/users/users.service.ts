import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders,HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../../models/user';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  Users = new BehaviorSubject<User[]>(null);
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

   getUsers():Observable<User[]>{
    return this.Users.asObservable();
  }
  getAll(){
    this.http.post<User[]>(environment.url+"/user/getall",{}).subscribe(res=>{
      this.Users.next(res);
    });
  }
  
  getUserById(id:number){
    return this.http.post<User>(environment.url+"/user/getbyid",{id:id});
  }

  addUser(param:[]){
   return this.http.post<any>(environment.url+"/user/create",param);
  }

  updateUser(param:[]){
    return this.http.post<any>(environment.url+"/user/update",param);
  }
  deleteUser(param:[]){
    return this.http.post<any>(environment.url+"/user/delete",{id:param['id']});
  }
}
