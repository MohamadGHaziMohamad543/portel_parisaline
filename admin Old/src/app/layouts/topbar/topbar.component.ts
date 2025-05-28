import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';


import { AuthenticationService } from '../../core/services/auth.service';
import { environment } from 'src/environments/environment.prod';
import { NoticesService } from '../../core/services/notices/notices.service';
import { SocketService } from '../../core/services/socket/socket.service'
import { ToastrService } from 'ngx-toastr';
import { EncryptService } from 'src/app/core/services/encrypt/encrypt.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit {

  notificationItems: Array<{}>;
  languages: Array<{
    id: number,
    flag?: string,
    name: string
  }>;
  selectedLanguage: {
    id: number,
    flag?: string,
    name: string
  };
  imageUser: string;
  openMobileMenu: boolean;
  nameUser: string;
  notices: number = 0;
  @Output() settingsButtonClicked = new EventEmitter();
  @Output() mobileMenuButtonClicked = new EventEmitter();

  audioNut = new Audio("assets/971.mp3");
  constructor(private router: Router, private authService: AuthenticationService,
    private encryptService: EncryptService,
    private noti: NoticesService, private socke: SocketService, private tostr: ToastrService) {
    this.imageUser = environment.url + '/' + this.authService.user.imageUser;
    this.nameUser = this.authService.user.nameUser;
    // this.notificationItems = [];
    // if (this.socke.chekevent("NOTF")) {
    //   this.socke.addevent('NOTF').subscribe(res => {
    //     if (res.typeNotices == 11) {
    //       this.tostr.success(res.content[0].information + " " + res.content[0].name, "NotFi");
    //       this.socke.observabelChat();
    //     }
    //     else {
    //       this.tostr.success(res.content[0].information, "NotFi");
    //       this.getAllNotices();
    //     }
    //     this.audioNut.play();

    //   });
    // }
  }

  getAllNotices() {
    this.notificationItems = [];
    this.noti.getAllView().subscribe(res => {
      for (let i = res.length - 1; i >= 0; i--) {
        if (typeof res[i].content == "string") {
          res[i].content=JSON.parse(res[i].content);
          let url: string = res[i].content[0].section;
          if (url.toLowerCase() == "doctor") {
            url = "/doctor";
          }
          else if (url.toLowerCase() == "dentelcenter") {
            url = "/DentalCenter";
          }
          else if (url.toLowerCase() == "patient") {
            url = this.getLink(res[i].content[0].numberId);
          }
          else if (url.toLowerCase() == "balance") {
            url = "/balance";
          }
          else if (url.toLowerCase() == "cases") {
            url = this.getLink(res[i].content[0].numberId);
          }
          this._fetchNotifications(res[i].id, res[i].content[0].section + " " + res[i].content[0].information, this.getDate(res[i].createdAt), res[i].typeNotices, url);
        }
      }
      this.notices = res.length;
    });
  }
  getLink(id: number) {
    if (id != undefined) {
      return "/status/" + this.encryptService.Encrypt(id);
    }
    else {
      return "/";
    }

  }
  getDate(date) {
    let event = new Date(date);
    // return event.getFullYear()+"/"+event.getMonth()+"/"+event.getUTCDay()+" "+event.getHours()+":"+event.getMinutes()+":"+event.getSeconds();
    return event.toDateString() + " | " + event.getHours() + ":" + event.getMinutes() + ":" + event.getSeconds();
  }
  getName(name: string) {
    return name.substr(0, 6) + "..";
  }
  ngOnInit() {
    // this.getAllNotices();
    // get the notifications
    this.openMobileMenu = false;
  }


  /**
   * Change the language
   * @param language language
   */
  changeLanguage(language) {
    this.selectedLanguage = language;
  }

  /**
   * Toggles the right sidebar
   */
  toggleRightSidebar() {
    this.settingsButtonClicked.emit();
  }

  /**
   * Toggle the menu bar when having mobile screen
   */
  toggleMobileMenu(event: any) {
    event.preventDefault();
    this.mobileMenuButtonClicked.emit();
  }

  /**
   * Logout the user
   */
  logout() {
    this.authService.logout();
    this.router.navigate(['/account/login']);
  }

  /**
   * Fetches the notification
   * Note: For now returns the hard coded notifications
   */
  _fetchNotifications(id, text, subText, typeNOTI, redirectTo) {
    let BgColorValue = "primary";
    if (typeNOTI == 1) {
      BgColorValue = "primary";
    }
    else if (typeNOTI == 3 || typeNOTI == 4) {
      BgColorValue = "danger";
    }
    else if (typeNOTI == 2 || typeNOTI == 5) {
      BgColorValue = "success";
    }
    this.notificationItems.push({
      text: text,
      subText: subText,
      icon: 'fe-alert-circle',
      bgColor: BgColorValue,//info,danger,success
      redirectTo: redirectTo,
      id: id,
    })
  }
  
  changeView(id: number) {
    this.noti.changeView(id).subscribe(res => {
      this.getAllNotices();
    });
  }
}
