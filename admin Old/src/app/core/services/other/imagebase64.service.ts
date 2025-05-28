import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class Imagebase64Service {

  constructor() { }

 convertImageUrlToBase64(Url:string): Observable<any> {
     return new Observable<any>(observer => {
      var xhr = new XMLHttpRequest();
      xhr.onload = function() {
        var reader = new FileReader();
        reader.onloadend = function() {
          observer.next(reader.result);
        }
        reader.readAsDataURL(xhr.response);
      };
      xhr.open('GET', Url);
      xhr.responseType = 'blob';
      xhr.send();

     });
  }
  convertImageToBase64(file:File): Observable<any> {
    return new Observable<any>(observer => {
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function () {
        observer.next(reader.result);
      };
      reader.onerror = function (error) {
        console.log('Error: ', error);
      };

    });
  }
  
}
