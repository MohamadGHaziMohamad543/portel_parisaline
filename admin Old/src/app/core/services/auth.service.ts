import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { CookieService } from '../services/cookie.service';
import { UserAuth } from '../models/auth.models';
import { environment } from 'src/environments/environment.prod';
import {SocketService} from './socket/socket.service';
@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    user: UserAuth;

    
    constructor(private http: HttpClient, private cookieService: CookieService,private sock:SocketService) {
        
    }

    /**
     * Returns the current user
     */
    public currentUser(): UserAuth {

        if (!this.user) {
            this.user = JSON.parse(this.cookieService.getCookie('adminUsers'));
            if(this.user)
            {
                console.log(this.user);
                environment.langId=this.user.langId;
                environment.langCode=this.user.langCode;
                environment.id=this.user.id;
                this.sock.connction(1,this.user);
            }
        }
        else{
                environment.langId=this.user.langId;
                environment.langCode=this.user.langCode;
                environment.id=this.user.id;
        }
        return this.user;
    }

    public setCookis(langId:number,langCode:string){
        this.cookieService.setCookie('adminUsers', JSON.stringify({role:this.user.role,token:this.user.token,id:this.user.id,langId:langId,langCode:langCode,imageUser:this.user.imageUser,nameUser:this.user.nameUser}), 1);
        environment.langId=langId;
        environment.langCode=langCode;
        this.user.langCode=langCode;
        this.user.langId=langId;
    }
    /**
     * Performs the auth
     * @param email email of user
     * @param password password of user
     * 	
     */
    login(email: string, password: string) {
        return this.http.post<any>(environment.url+'/user/login', { email:email, password:password })
            .pipe(map(user => {
                // login successful if there's a jwt token in the response
                if (user && user.token) {
                    this.user = {role:user.user.role,token:user.token,id:user.user.id,langId:user.user.langId,langCode:user.user.langCode,imageUser:user.user.photo,nameUser:"A "+user.user.first_name};
                    environment.langId=this.user.langId;
                    environment.langCode=this.user.langCode;
                    environment.id=this.user.id;
                    // store user details and jwt in cookie
                    environment.token=user.token;
                    this.cookieService.setCookie('adminUsers', JSON.stringify({role:user.user.role,token:user.token,id:user.user.id,langId:user.user.langId,langCode:user.user.langCode,imageUser:user.user.photo,nameUser:"A "+user.user.first_name}), 1);
                    this.sock.connction(1,this.user);
                }
                return user;
            }));
    }

    /**
     * Logout the user
     */
    logout() {
        // remove user from local storage to log user out
        this.cookieService.deleteCookie('adminUsers');
        this.user = null;
        this.sock.disConncted();
    }
}

