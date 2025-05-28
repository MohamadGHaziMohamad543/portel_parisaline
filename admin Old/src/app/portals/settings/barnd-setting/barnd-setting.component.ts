import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-barnd-setting',
  templateUrl: './barnd-setting.component.html',
  styleUrls: ['./barnd-setting.component.scss']
})
export class BarndSettingComponent implements OnInit {
  PathStatic = environment.url;
  constructor(private http: HttpClient, private modalService: NgbModal) { }
  BrandSetting: any = [];

  onFileSelected($element, key) {
    let formdata = new FormData();
    formdata.append('fileData', $element.target.files[0]);
    this.http.post<any>(environment.url + "/fileManager/uploadFileToTemp", formdata, {
      reportProgress: true,
      observe: 'events'
    }).subscribe(resp => {
      if (resp.type === HttpEventType.Response) {
        console.log('Finshed Uploadded');
        this.BrandSetting.find(x => x.key == key).uploading = -1;
        this.BrandSetting.find(x => x.key == key).temp = resp.body.path;
      }
      if (resp.type === HttpEventType.UploadProgress) {
        const percentDone = Math.round(100 * resp.loaded / resp.total);
        this.BrandSetting.find(x => x.key == key).uploading = percentDone;
      }
    });
  }


  RemoveFile(key) {
    this.BrandSetting.find(x => x.key == key).temp = undefined;
  }

  RemoveFileStatic(key) {
    this.BrandSetting.find(x => x.key == key).value = undefined;
  }


  ChangeValue(Code, key) {
    this.BrandSetting.find(x => x.key == key).temp = Code;
  }

  oninitInput = (element) => {

  }

  chnageText(element, key) {
    this.BrandSetting.find(x => x.key == key).temp = element.target.value;
  }

  ngOnInit() {
    this.http.post<any>(environment.url + "/brandSettings/GetAll", {}).subscribe((result: any) => {
      if (result.error == 0) {
        this.BrandSetting = result.data;
      }
    });
  }

  showModalAdd(content) {
    this.modalService.open(content, { backdrop: 'static' })
  }


  addNewComp(type, key) {
    this.http.post<any>(environment.url + "/brandSettings/Create", { key: key, type: type }).subscribe((result: any) => {
      if (result.error == 0) {
        this.BrandSetting.push({ id: result.data.id, key: result.data.key, type: result.data.type });
        this.modalService.dismissAll();
      }
      else {
        alert(result.data);
      }
    });
  }


  save(key) {
    let comp = this.BrandSetting.find(x => x.key == key);
    this.http.post<any>(environment.url + "/brandSettings/Update", { id: comp.id, value: comp.temp }).subscribe((result: any) => {
      if (result.error == 0) {
        comp.value=comp.temp;
        comp.temp = undefined;
        comp.uploading=undefined;
      }
      else {
        alert(result.data);
      }
    });
  }
}
