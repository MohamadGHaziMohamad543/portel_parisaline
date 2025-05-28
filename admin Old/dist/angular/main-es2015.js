(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/app.component.html":
/*!**************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/app.component.html ***!
  \**************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<router-outlet></router-outlet>\n<div id=\"modelDivStlViewr\" style=\"width: 100%;height: 100%;position: fixed;top: 0;left: 0;z-index: 99999;background: #0000008f;display: none;padding: 6%;\">\n    <div style=\"width: 100%;text-align: right;\">\n      <a class=\"btn btn-danger\" (click)=\"closeStlViewr()\" style=\"cursor: pointer;\"><i class=\"fe-x\"></i></a>\n    </div>\n  \n   <progress id=\"pbtotal\" class=\"p-total\" value=\"0\" max=\"1\" style=\"width: 100%; position: relative;top: 16px;\"></progress>\n     <div id=\"divAppendHtml\" style=\"position: relative;\">\n        <div id=\"loadingStl\" class=\"spinner-grow\" role=\"status\" style=\"position: absolute;\n        top: 35%;\n        left: 43%;\n        width: 12rem;\n        height: 12rem;\">\n            <span class=\"sr-only\">Loading...</span>\n        </div>\n      <div id=\"stl_cont\" style=\"width: 100%;height: 400px;margin: 0 auto;text-align: center; background: #ccc; background-image: url(assets/uiuxicon1.png);background-size: 100% 100%;box-shadow: 1px 1px 8px #fff;\"></div>\n     </div>\n     <div style=\"width: 100%;text-align: right;\">\n      <a class=\"btn btn-success\" (click)=\"StopAnmtion()\" style=\"cursor: pointer;\"><i class=\"fe-play-circle\"></i></a>\n    </div>\n  </div>\n  <app-upload-files></app-upload-files>\n\n  <div class=\"logs\" id=\"logServer\" style=\"    position: fixed;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  background: #3c0756e8;\n  z-index: 999999999;\n  color: #fff;\n  display: none;\n  padding: 22px;\">\n    <div id=\"txtLogs\" style=\"    overflow-y: scroll;\n    height: 100%;\n    border: 1px dashed;\n    padding: 4px;\">\n      \n    </div>\n  </div>");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/layouts/footer/footer.component.html":
/*!********************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/layouts/footer/footer.component.html ***!
  \********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<footer class=\"footer\">\n  <div class=\"container-fluid\">\n    <div class=\"row\">\n      <div class=\"col-md-6\">\n        2019 - 2020 © <a href=\"\">ParisAline</a>\n      </div>\n      <div class=\"col-md-6\">\n      </div>\n    </div>\n  </div>\n</footer>");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/layouts/layout.component.html":
/*!*************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/layouts/layout.component.html ***!
  \*************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div id=\"wrapper\">\n\n    <app-topbar (settingsButtonClicked)=\"onSettingsButtonClicked()\"\n    (mobileMenuButtonClicked)=\"onToggleMobileMenu()\"></app-topbar>\n\n    <app-sidebar [isCondensed]=\"isCondensed\"></app-sidebar>\n\n    <div class=\"content-page\">\n        <div class=\"content\">\n            <!-- content -->\n            <router-outlet></router-outlet>\n        </div>\n\n        <!-- footer -->\n        <app-footer></app-footer>\n    </div>\n</div>\n\n<app-rightsidebar></app-rightsidebar>");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/layouts/rightsidebar/rightsidebar.component.html":
/*!********************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/layouts/rightsidebar/rightsidebar.component.html ***!
  \********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<!-- Right Sidebar -->\n<div class=\"right-bar\" (clickOutside)=\"hide()\" [exclude]=\"'.right-bar-toggle'\">\n  <div class=\"rightbar-title\">\n    <a href=\"javascript:void(0);\" class=\"right-bar-toggle float-right\" (click)=\"hide();\">\n      <i class=\"fe-x noti-icon\"></i>\n    </a>\n    <h4 class=\"m-0 text-white\">Settings</h4>\n  </div>\n  <div class=\"slimscroll-menu\" appSlimScroll>\n    <!-- User box -->\n    <div class=\"user-box\">\n      <div class=\"user-img\">\n        <img src=\"assets/images/users/user-1.jpg\" alt=\"user-img\" title=\"Mat Helme\" class=\"rounded-circle img-fluid\">\n        <a href=\"javascript:void(0);\" class=\"user-edit\"><i class=\"mdi mdi-pencil\"></i></a>\n      </div>\n\n      <h5><a href=\"javascript: void(0);\">Nik G. Patel</a> </h5>\n      <p class=\"text-muted mb-0\"><small>Admin Head</small></p>\n    </div>\n\n    <div class=\"inbox-widget pl-3 pr-3\">\n      <h5 class=\"mt-0\">Recent</h5>\n      <div class=\"inbox-item\" *ngFor=\"let inbox of inboxData\">\n        <div class=\"inbox-item-img\"><img src=\"{{ inbox.image }}\" class=\"rounded-circle\" alt=\"\"> <i\n            class=\"online user-status\"></i></div>\n        <p class=\"inbox-item-author\"><a href=\"javascript: void(0);\" class=\"text-dark\">{{ inbox.name }}</a></p>\n        <p class=\"inbox-item-text\">{{ inbox.message }}</p>\n      </div>\n    </div>\n  </div> <!-- end slimscroll-menu-->\n</div>\n<!-- /Right-bar -->\n\n<!-- Right bar overlay-->\n<div class=\"rightbar-overlay\"></div>");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/layouts/sidebar/sidebar.component.html":
/*!**********************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/layouts/sidebar/sidebar.component.html ***!
  \**********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<!-- ========== Left Sidebar Start ========== -->\n<ng-template #contentTemplate>\n    <!--- Sidemenu -->\n    <div id=\"sidebar-menu\">\n        <ul class=\"metismenu\" id=\"side-menu\" #sideMenu>\n\n            <li class=\"menu-title\">MENU</li>\n            <li *ngIf=\"checkPerm('Dental Center','Dental Center')\">\n                <a href=\"javascript: void(0);\" routerLinkActive=\"active\" routerLink=\"/\" class=\"side-nav-link-ref\" aria-expanded=\"false\">\n                    <i class=\"mdi mdi-home\"></i>\n                    <span> DASHBOARD  </span>\n                </a>\n            </li>\n            <li *ngIf=\"checkPerm('Dental Center','Dental Center')\">\n                <a href=\"javascript: void(0);\" routerLinkActive=\"active\" routerLink=\"/DentalCenter\" class=\"side-nav-link-ref\" aria-expanded=\"false\">\n                    <i class=\" fas fa-layer-group\"></i>\n                    <span> Dental Center  </span>\n                </a>\n            </li>\n            <li>\n                <a href=\"javascript: void(0);\" routerLinkActive=\"active\" routerLink=\"/Doctor\" class=\"side-nav-link-ref\" aria-expanded=\"false\">\n                    <i class=\"mdi mdi-doctor\"></i>\n                    <span> Doctor Dashboard </span>\n                </a>\n            </li>\n            <li>\n                <a href=\"javascript: void(0);\" routerLinkActive=\"active\" routerLink=\"/DP\" class=\"side-nav-link-ref\" aria-expanded=\"false\">\n                    <img src=\"assets/dpr.png\" style=\"    width: 22px;\">\n                    <span> Supervisors Dashboard </span>\n                </a>\n               \n            </li>\n            <li>\n                <a href=\"javascript: void(0);\" routerLinkActive=\"active\" routerLink=\"/patient\" class=\"side-nav-link-ref\"   aria-expanded=\"false\">\n                    <i class=\"ti-face-smile\"></i>\n                    <span> Patients Dashboard </span>\n                </a>\n               \n            </li>\n            <li>\n                <a href=\"javascript: void(0);\" routerLink=\"/Laboratorys\" routerLinkActive=\"active\"\n                class=\"side-nav-link-ref\" >\n                    <img src=\"assets/Labs.png\" style=\"width: 25px;\">\n                    <span style=\"margin-left: 10px;\"> Lab Dashboard </span>\n                </a>\n            </li>\n            <li>\n                <a href=\"javascript: void(0);\" routerLinkActive=\"active\" routerLink=\"/Mediator\" class=\"side-nav-link-ref\" aria-expanded=\"false\">\n                    <i class=\"mdi mdi-perspective-more\"></i>\n                    <span> Distributor </span>\n                </a>\n            </li>\n            <li>\n                <a href=\"javascript: void(0);\" class=\"waves-effect\" aria-expanded=\"false\">\n                    <i class=\"fe-credit-card\"></i>\n                    <span> Payment </span>\n                </a>\n                <ul class=\"nav-second-level collapse\" aria-expanded=\"false\">\n                    <li>\n                        <a routerLink=\"/balanceAccivted\" routerLinkActive=\"active\" class=\"side-nav-link-ref\">Payments accepted</a>\n                    </li>\n                    <li >\n                        <a routerLink=\"/balance\" routerLinkActive=\"active\" class=\"side-nav-link-ref\">Payments not accepted</a>\n                    </li>\n                \n                    \n                </ul>\n\n            </li>\n            <li *ngIf=\"isAdmin==1\">\n                <a href=\"javascript: void(0);\" class=\"waves-effect\" aria-expanded=\"false\">\n                    <i class=\"fe-settings\"></i>\n                    <span> Settings </span>\n                </a>\n                <ul class=\"nav-second-level collapse\" aria-expanded=\"false\">\n                    <li *ngIf=\"checkPerm('Setting','General')\">\n                        <a routerLink=\"/Settings/General\" routerLinkActive=\"active\" class=\"side-nav-link-ref\">System Settings</a>\n                    </li>\n                    <li *ngIf=\"checkPerm('Setting','Users')\">\n                        <a routerLink=\"/Settings/Users\" routerLinkActive=\"active\"\n                            class=\"side-nav-link-ref\">Users</a>\n                    </li>\n                    <li *ngIf=\"checkPerm('Setting','LANGUAGES')\">\n                        <a routerLink=\"/Settings/Languages\" routerLinkActive=\"active\"\n                            class=\"side-nav-link-ref\">Languages</a>\n                    </li>\n                    <li *ngIf=\"checkPerm('Setting','EmailModel')\">\n                        <a routerLink=\"/Settings/EmailModel\" routerLinkActive=\"active\"\n                            class=\"side-nav-link-ref\">Email Forms</a>\n                    </li>\n                    <li *ngIf=\"checkPerm('Setting','SmsModel')\">\n                        <a routerLink=\"/Settings/SmsModel\" routerLinkActive=\"active\"\n                            class=\"side-nav-link-ref\">SMS Forms</a>\n                    </li>\n                    <li *ngIf=\"checkPerm('Setting','SmsModel')\">\n                        <a routerLink=\"/Settings/Memberships\" routerLinkActive=\"active\"\n                            class=\"side-nav-link-ref\">Memberships</a>\n                    </li>\n                    <li *ngIf=\"checkPerm('Setting','SmsModel')\">\n                        <a routerLink=\"/Settings/barcodes\" routerLinkActive=\"active\"\n                            class=\"side-nav-link-ref\">barcodes</a>\n                    </li>\n                    <li *ngIf=\"checkPerm('Setting','SmsModel')\">\n                        <a routerLink=\"/Settings/caseStage\" routerLinkActive=\"active\"\n                            class=\"side-nav-link-ref\">Case Stage</a>\n                    </li>\n                    <li *ngIf=\"checkPerm('Setting','SmsModel')\">\n                        <a routerLink=\"/Settings/function\" routerLinkActive=\"active\"\n                            class=\"side-nav-link-ref\">Function</a>\n                    </li>\n                    <li *ngIf=\"checkPerm('Setting','SmsModel')\">\n                        <a routerLink=\"/Settings/PricingStrategies\" routerLinkActive=\"active\"\n                            class=\"side-nav-link-ref\">PricingStrategies</a>\n                    </li>                    \n                    <li *ngIf=\"checkPerm('Setting','SmsModel')\">\n                        <a routerLink=\"/Settings/SubmtionText\" routerLinkActive=\"active\"\n                            class=\"side-nav-link-ref\">Submtion Text</a>\n                    </li>\n                    <li *ngIf=\"checkPerm('Setting','SmsModel')\">\n                        <a routerLink=\"/Settings/WP\" routerLinkActive=\"active\"\n                            class=\"side-nav-link-ref\">whatsapp</a>\n                    </li>\n                    <li *ngIf=\"checkPerm('Setting','Country')\">\n                        <a routerLink=\"/Settings/Country\" routerLinkActive=\"active\"\n                            class=\"side-nav-link-ref\">Country Dashboard</a>\n                    </li>\n                    <li *ngIf=\"checkPerm('Setting','City')\">\n                        <a routerLink=\"/Settings/City\" routerLinkActive=\"active\"\n                            class=\"side-nav-link-ref\">City Dashboard</a>\n                    </li>\n                    <li *ngIf=\"checkPerm('Setting','Currency')\">\n                        <a routerLink=\"/Settings/Currency\" routerLinkActive=\"active\"\n                            class=\"side-nav-link-ref\">Currencies</a>\n                    </li>\n                    <li *ngIf=\"checkPerm('Setting','ShippingCompany')\">\n                        <a routerLink=\"/Settings/ShippingCompany\" routerLinkActive=\"active\"\n                            class=\"side-nav-link-ref\">Shipping Settings</a>\n                    </li>\n                    <li *ngIf=\"checkPerm('Setting','notification')\">\n                        <a routerLink=\"/Settings/notification\" routerLinkActive=\"active\"\n                            class=\"side-nav-link-ref\">Notification Dashboard</a>\n                    </li>\n                    <li>\n                        <a routerLink=\"/Settings/BrandSetting\" routerLinkActive=\"active\" class=\"side-nav-link-ref\">global variables</a>\n                    </li>\n                    \n                </ul>\n\n            </li>\n\n        </ul>\n\n    </div>\n    <!-- End Sidebar -->\n\n    <div class=\"clearfix\"></div>\n</ng-template>\n\n\n<div class=\"left-side-menu\">\n    <div class=\"slimscroll-menu\" appSlimScroll *ngIf=\"!isCondensed\">\n        <ng-container *ngTemplateOutlet=\"contentTemplate\"></ng-container>\n    </div>\n\n    <div class=\"slimscroll-menu\" *ngIf=\"isCondensed\">\n        <ng-container *ngTemplateOutlet=\"contentTemplate\"></ng-container>\n    </div>\n</div>\n<!-- Left Sidebar End -->");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/layouts/topbar/topbar.component.html":
/*!********************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/layouts/topbar/topbar.component.html ***!
  \********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<!-- Topbar Start -->\n<div class=\"navbar-custom\">\n  <ul class=\"list-unstyled topnav-menu float-right mb-0\">\n\n    <li class=\"d-none d-sm-block\">\n      <form class=\"app-search\">\n        <div class=\"app-search-box\">\n          <div class=\"input-group\">\n            <input type=\"text\" class=\"form-control\" placeholder=\"Search...\">\n            <div class=\"input-group-append\">\n              <button class=\"btn\" type=\"submit\">\n                <i class=\"fe-search\"></i>\n              </button>\n            </div>\n          </div>\n        </div>\n      </form>\n    </li>\n\n    <li class=\"dropdown notification-list\" ngbDropdown>\n      <a class=\"nav-link dropdown-toggle  waves-effect waves-light\" href=\"javascript: void(0);\" role=\"button\"\n        aria-haspopup=\"false\" aria-expanded=\"false\" ngbDropdownToggle id=\"notificationDropdown\">\n        <i class=\"fe-bell noti-icon\"></i>\n        <span class=\"badge badge-danger rounded-circle noti-icon-badge\" *ngIf=\"notices!=0\">{{notices}}</span>\n      </a>\n      <div class=\"dropdown-menu dropdown-menu-right dropdown-menu-animated dropdown-lg\"\n        aria-labelledby=\"notificationDropdown\" ngbDropdownMenu>\n\n        <!-- item-->\n        <div class=\"dropdown-item noti-title\" ngbDropdownItem>\n          <h5 class=\"m-0\">\n            <span class=\"float-right\">\n              <a href=\"javascript: void(0);\" class=\"text-dark\">\n                <small>Clear All</small>\n              </a>\n            </span>Notification\n          </h5>\n        </div>\n\n        <div id=\"notification-items\" class=\"slimscroll noti-scroll\" appSlimScroll>\n          <!-- item-->\n          <a *ngFor=\"let notification of notificationItems;\" \n            class=\"dropdown-item notify-item\" routerLink=\"{{notification.redirectTo}}\" (click)=changeView(notification.id) ngbDropdownItem>\n            <div  class=\"notify-icon bg-soft-{{ notification.bgColor }} text-{{ notification.bgColor }}\">\n              <i class=\"{{ notification.icon }}\"></i>\n            </div>\n            <p class=\"notify-details\">{{ notification.text }}\n              <small class=\"text-muted\">{{ notification.subText }}</small>\n            </p>\n          </a>\n        </div>\n\n        <!-- All-->\n        <a href=\"javascript:void(0);\" class=\"dropdown-item text-center text-primary notify-item notify-all\">\n          View All\n        </a>\n      </div>\n    </li>\n\n\n    <li class=\"dropdown notification-list\" ngbDropdown>\n      <a class=\"nav-link dropdown-toggle nav-user mr-0 waves-effect waves-light\" ngbDropdownToggle id=\"profileDropdown\"\n        href=\"javascript: void(0);\" role=\"button\" aria-haspopup=\"false\" aria-expanded=\"false\">\n        <img src=\"{{imageUser}}\" alt=\"user-image\" class=\"rounded-circle\">\n        <span class=\"pro-user-name ml-1\">\n          {{getName(nameUser)}} <i class=\"mdi mdi-chevron-down\"></i>\n        </span>\n      </a>\n      <div class=\"dropdown-menu dropdown-menu-right profile-dropdown\" aria-labelledby=\"profileDropdown\" ngbDropdownMenu>\n        <div class=\"dropdown-header noti-title\">\n          <h6 class=\"text-overflow m-0\">Welcome !</h6>\n        </div>\n\n        <!-- item-->\n        <a href=\"javascript:void(0);\" class=\"dropdown-item notify-item\">\n          <i class=\"fe-user\"></i>\n          <span>My Account</span>\n        </a>\n\n        <!-- item-->\n        <a href=\"javascript:void(0);\" class=\"dropdown-item notify-item\">\n          <i class=\"fe-settings\"></i>\n          <span>Settings</span>\n        </a>\n\n\n        <div class=\"dropdown-divider\"></div>\n\n        <!-- item-->\n        <a href=\"javascript:void(0);\" class=\"dropdown-item notify-item\" (click)=\"logout()\">\n          <i class=\"fe-log-out\"></i>\n          <span>Logout</span>\n        </a>\n\n      </div>\n    </li>\n\n\n\n\n  </ul>\n\n  <!-- LOGO -->\n  <div class=\"logo-box\">\n    <a href=\"/\" class=\"logo text-center\">\n      <span class=\"logo-lg\">\n        <img src=\"assets/uiuxicon1.png\" alt=\"\" style=\"width: 135px;height: auto;\" >\n        <!-- <span class=\"logo-lg-text-light\">Xeria</span> -->\n      </span>\n      <span class=\"logo-sm\">\n        <!-- <span class=\"logo-sm-text-dark\">X</span> -->\n        <img src=\"assets/uiuxicon1.png\" alt=\"\" style=\"width: 135px; height: auto;\" >\n      </span>\n    </a>\n  </div>\n\n  <ul class=\"list-unstyled topnav-menu topnav-menu-left m-0\">\n    <li>\n      <button class=\"button-menu-mobile waves-effect waves-light\" (click)=\"toggleMobileMenu($event)\">\n        <i class=\"fe-menu\"></i>\n      </button>\n    </li>\n\n  </ul>\n</div>\n<!-- end Topbar -->\n\n<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n  <meta charset=\"UTF-8\">\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n  <title>Document</title>\n</head>\n<body>\n  <script src=\"\"></script>\n</body>\n</html>");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/shared/common/bills-balance/bills-balance.component.html":
/*!****************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/shared/common/bills-balance/bills-balance.component.html ***!
  \****************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<p>\n  bills-balance works!\n</p>\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/shared/common/cases-doctor/cases-doctor.component.html":
/*!**************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/shared/common/cases-doctor/cases-doctor.component.html ***!
  \**************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"col-lg-12 col-xl-12\" >\n  <div class=\"card-box\">\n    <h5 class=\"\" style=\"width: 100%;text-align: left;\">\n      List of Patients</h5> \n      <div style=\"width: 100%;display: flow-root;padding: 16px;\">\n      </div> \n      <div class=\"table-responsive\">\n        <table class=\"table table-borderless mb-0\">\n          <thead class=\"thead-light\">\n              <tr>\n                  <th>Photo</th>\n                  <th>Serial Number</th>\n                  <th *ngIf=\"USERTYPE\">Doctor Name</th>\n                  <th>Patient Name</th>\n                  <th>Status</th>\n                  <th>#</th>\n              </tr>\n          </thead>\n          <tbody>\n              <tr *ngFor=\"let pt of patient\">\n                  <td><img src=\"{{URLStatic+pt.image}}\" style=\" width: 70px; height: 70px;border-radius: 50%;border: 1px solid; padding: 1px;\"></td>\n                  <td>{{pt.id}}</td>\n                  <td *ngIf=\"USERTYPE\">{{pt.nameDoctor}}</td>\n                  <td>{{pt.firstName+' '+pt.lastName}}</td>\n                  <td>\n                    <div *ngIf=\"pt.caseStatus==null\" style=\"background: #20a9f1;text-align: center;color: #fff;\">\n                      <div  class=\"\">\n                        <a>Draft</a>\n                      </div>\n                    </div>\n                    <div *ngIf=\"pt.caseStatus==0\" style=\"background: #20a9f1;text-align: center;color: #fff;\">\n                      <div  class=\"\">\n                        <a>Draft</a>\n                      </div>\n                    </div>\n                    <div *ngIf=\"pt.caseStatus==1\" style=\"background: #0075c2;text-align: center;color: #fff;\">\n                      <div  class=\"\">\n                        <a>Patient records processing</a>\n                      </div>\n                    </div>\n                    <div  *ngIf=\"pt.caseStatus==2\" style=\"background: #fb7e00;text-align: center;color: #fff;\">\n                      <div  class=\"\">\n                        <a>Digital Setup</a>\n                      </div>\n                    </div>\n                    <div *ngIf=\"pt.caseStatus==3\"  style=\"background: #d2691e;text-align: center;color: #fff;\">\n                      <div  class=\"\">\n                        <a>Revision</a>\n                      </div>\n                    </div>\n                    <div  *ngIf=\"pt.caseStatus==4\" style=\"background: #696969;text-align: center;color: #fff;\">\n                      <div  class=\"\">\n                        <a>Dr. Review</a>\n                      </div>\n                    </div>\n                    <div *ngIf=\"pt.caseStatus==6\" style=\"background: #7ecd00;text-align: center;color: #fff;\">\n                      <div  class=\"\">\n                        <a>Appliance Fabrication</a>\n                      </div>\n                    </div>\n                    <div  *ngIf=\"pt.caseStatus==7\" style=\"background: #a19703;text-align: center;color: #fff;\">\n                      <div  class=\"\">\n                        <a>Shipping</a>\n                      </div>\n                    </div>\n                    <div *ngIf=\"pt.caseStatus==8\"  style=\"background: #009688;text-align: center;color: #fff;\">\n                      <div  class=\"\">\n                        <a>Completed</a>\n                      </div>\n                    </div>\n                  </td>\n                  <td></td>\n              </tr>\n          </tbody>\n      </table>\n  </div>\n  </div>\n</div>\n\n<ng-template #patientModel role=\"document\" let-modal=\"close\">\n  <form class=\"needs-validation\" name=\"formPatient\" [formGroup]=\"formPatient\" (ngSubmit)=\"onSubmit()\"\n  novalidate>\n  <app-ui-preloader [display]=\"loading\"></app-ui-preloader>\n  <div class=\"modal-header\">\n      <h4 class=\"modal-title\">{{titleFormName}}</h4>\n      <button type=\"button\" class=\"close\" aria-hidden=\"true\" (click)=\"modal('Cross click')\">×</button>\n  </div>\n  <div class=\"modal-body\">\n    <div class=\"row\">\n      <div class=\"form-group col-lg-6\">\n        <label for=\"name\">Name Patient</label>\n  \n        <input type=\"namePatient\" formControlName=\"namePatient\"   class=\"form-control\" [ngClass]=\"{ 'is-invalid': submitted && fn.namePatient.errors }\" id=\"namePatient\"  />\n        <div *ngIf=\"submitted && fn.namePatient.errors\" class=\"invalid-feedback\">\n          <div *ngIf=\"fn.namePatient.errors.required\">Name Patient</div>\n        </div>\n      </div>\n      <div class=\"form-group col-lg-6\">\n        <label for=\"name\">Phone Number</label>\n  \n        <input type=\"phoneNumber\" formControlName=\"phoneNumber\"   class=\"form-control\" [ngClass]=\"{ 'is-invalid': submitted && fn.phoneNumber.errors }\" id=\"phoneNumber\"  />\n        <div *ngIf=\"submitted && fn.phoneNumber.errors\" class=\"invalid-feedback\">\n          <div *ngIf=\"fn.phoneNumber.errors.required\">Phone Number</div>\n        </div>\n      </div>\n      <div class=\"form-group col-lg-6\">\n        <label for=\"name\">Email</label>\n  \n        <input type=\"email\" formControlName=\"email\"   class=\"form-control\" [ngClass]=\"{ 'is-invalid': submitted && fn.email.errors }\" id=\"email\"  />\n        <div *ngIf=\"submitted && fn.email.errors\" class=\"invalid-feedback\">\n          <div *ngIf=\"fn.email.errors.required\">Email</div>\n        </div>\n      </div>\n      <div class=\"form-group col-lg-6\">\n        <label for=\"name\">Country</label>\n        <ng-select   formControlName=\"countryId\" (ngModelChange)=\"onChangeCountry()\"  bindLabel=\"countryName\" bindValue=\"id\" [items]=\"Country\" >\n          <ng-template ng-label-tmp let-item=\"item\">\n            <flag-icon country=\"{{item.code}}\" ></flag-icon>\n            <b>{{item.countryName}}</b>\n         </ng-template>\n         <ng-template ng-option-tmp let-item=\"item\" let-index=\"index\">\n          <flag-icon country=\"{{item.code}}\" ></flag-icon>\n          <b>{{item.countryName}}</b>\n      </ng-template>\n        </ng-select>\n  \n        <div *ngIf=\"submitted && fn.countryId.errors\" class=\"invalid-feedback\">\n          <div *ngIf=\"fn.countryId.errors.required\">Country</div>\n        </div>\n      </div>\n      \n      <div class=\"form-group col-lg-6\">\n        <label for=\"name\">City</label>\n  \n         <ng-select   formControlName=\"cityId\"  bindLabel=\"cityName\" (ngModelChange)=\"onChangeCountry()\" bindValue=\"id\" [items]=\"city\" ></ng-select>\n        <div *ngIf=\"submitted && fn.cityId.errors\" class=\"invalid-feedback\">\n          <div *ngIf=\"fn.cityId.errors.required\">City</div>\n        </div>\n      </div>\n      <div class=\"form-group col-lg-12\">\n        <label for=\"name\">Address</label>\n  \n        <textarea type=\"address\" formControlName=\"address\"   class=\"form-control\" [ngClass]=\"{ 'is-invalid': submitted && fn.address.errors }\" id=\"address\"  >\n\n        </textarea>\n        <div *ngIf=\"submitted && fn.address.errors\" class=\"invalid-feedback\">\n          <div *ngIf=\"fn.address.errors.required\">Address</div>\n        </div>\n      </div>\n    </div>\n  </div>\n  <div class=\"modal-footer\">\n      <button type=\"button\" class=\"btn btn-light waves-effect\" (click)=\"modal('Cross click')\" >{{trans.users.btn_modal_close}}</button>\n      <button type=\"button\" class=\"btn btn-primary\" type=\"submit\">{{trans.users.btn_modal_save}}</button>\n  </div>\n</form>\n</ng-template>\n\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/shared/common/codeeditor/codeeditor.component.html":
/*!**********************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/shared/common/codeeditor/codeeditor.component.html ***!
  \**********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div #editorContainer class=\"editor-container\" style=\"min-height: 300px;\"></div>");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/shared/common/keditor/keditor.component.html":
/*!****************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/shared/common/keditor/keditor.component.html ***!
  \****************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"card-disabled\" *ngIf=\"isLoading\">\n    <div class=\"spinner-border avatar-lg text-primary m-2 refreshLoadd\" role=\"status\"></div>\n</div>");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/shared/common/list-dental-center/list-dental-center.component.html":
/*!**************************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/shared/common/list-dental-center/list-dental-center.component.html ***!
  \**************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"table-responsive\">\n  <table class=\"table table-borderless mb-0\">\n      <thead class=\"thead-light\">\n          <tr>\n              <th>Logo</th>\n              <th>Serial Number</th>\n              <th>Center Name</th>\n              <th>Admin Name</th>\n              <th>Phone</th>\n          </tr>\n      </thead>\n      <tbody>\n          <tr *ngFor=\"let dtc of dentalCenter\">\n              <td><img src=\"{{url+'/'+dtc.logo}}\" style=\"width: 39px\" class=\"img-fluid rounded-circle\"></td>\n              <td>{{dtc.id}}</td>\n              <td><a href=\"javascript: void(0);\" (click)=\"getLink(dtc.id,1)\">{{dtc.dentalCenterName}}</a></td>\n              <td><a href=\"javascript: void(0);\" (click)=\"getLink(dtc.doctorId)\">{{dtc.nameDoctor}}</a></td>\n              <td>{{dtc.phoneNumber}}</td>\n          </tr>\n      </tbody>\n  </table>\n</div>\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/shared/common/list-doctors/list-doctors.component.html":
/*!**************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/shared/common/list-doctors/list-doctors.component.html ***!
  \**************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"row\">\n  <!-- Table -->\n  <div class=\"col-xl-12\">\n    <div class=\"\">\n      <h4 class=\"header-title mb-4\">List of Doctors</h4>\n      <div class=\"row\">\n        <!-- Table -->\n        <div class=\"col-xl-12\">\n          <div class=\"card-body pt-0\">\n            <div class=\"table-responsive\">\n              <table class=\"table table-hover table-centered mb-0\" style=\"text-align: center;\">\n                <thead>\n                  <tr>\n                    <th>Photo</th>\n                    <th>Doctor Number</th>\n                    <th>Doctor Name</th>\n                    <th>Join Date</th>\n                    <th>#</th>\n                  </tr>\n                </thead>\n    \n                <tbody>\n                  <tr *ngFor=\"let doctor of dctorClaint\">\n                    <td><img src=\"{{ urlStatic+doctor.logo }}\" style=\"    width: 60px;  height: 60px; border: 1px dashed; border-radius: 50%; padding: 2px; \" ></td>\n                    <td>{{ doctor.doctorId }}</td>\n                    <td>{{ doctor.nameDoctor }}</td>\n                    <td>{{ doctor.createdAt | date}}</td>\n                    <td>\n                      <button  class=\"btn btn-success  \" type=\"button\" *ngIf=\"doctor.status==0\"  (click)=\"Accept(doctor.id)\"><span _ngcontent-lyw-c57=\"\" class=\"btn-label\"><i _ngcontent-lyw-c57=\"\" class=\"mdi mdi-check-all\"></i></span>Accept </button>\n                      <button  class=\"btn btn-danger  \" type=\"button\"  (click)=\"Join(doctor.id)\"><span _ngcontent-lyw-c57=\"\" class=\"btn-label\"><i _ngcontent-lyw-c57=\"\" class=\"mdi mdi-close-circle-outline\"></i></span>Reject </button>\n                    </td>\n                  </tr>\n                </tbody>\n              </table>\n            </div>\n          </div>\n        </div>\n      </div>\n      \n    </div>\n  </div>\n</div>\n\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/shared/common/listbalace/listbalace.component.html":
/*!**********************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/shared/common/listbalace/listbalace.component.html ***!
  \**********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"card-box mb-2\" *ngFor=\"let bal of balances | filter:term\" style=\"text-align: center;\">\n  <div class=\"row align-items-center\">\n    <div class=\"col-sm-4\">\n      <div class=\"media\">\n        <img class=\"d-flex align-self-center mr-3 rounded-circle\" src=\"{{ urlStatic+ bal.logo }}\"\n          alt=\"Generic placeholder image\" height=\"64\">\n        <div class=\"media-body\">\n          <h4 class=\"mt-0 mb-2 font-16\"><b style=\"float: left;\">Dental Center : </b><a  >{{ bal.dentalCenterName }}</a></h4>\n          <p class=\"mb-1\"><b style=\"float: left;\">Invoice Number:</b> {{ bal.id}}</p>\n          <p class=\"mb-0\"><b style=\"float: left;\">Payment Method:</b> {{ bal.billType==0?'Transfer':'Online Payment' }}</p>\n        </div>\n      </div>\n    </div>\n    <div class=\"col-sm-4\">\n      <div class=\"media-body\">\n        <h4 class=\"mt-0 mb-2 font-16\"><b style=\"float: left;\">Doctor : </b><a >{{ bal.nameDoctor }}</a></h4>\n        <p class=\"mb-1\"><b style=\"float: left;\">Date:</b> {{ bal.createdAt | date}}</p>\n        <p class=\"mb-0\"><b style=\"float: left;\">Comment:</b> {{ bal.comment }}</p>\n      </div>\n    </div>\n    <div class=\"col-sm-4\">\n      <h4 class=\"mb-1\" style=\"color: teal;\">{{ bal.price}} $</h4>\n      <div class=\"badge font-14 p-1\" [ngClass]=\"{\n        'bg-soft-info text-info': bal.status === 0, \n        'bg-soft-danger text-danger': bal.status === 2,\n        'bg-soft-success text-success': bal.status === 1\n      }\">{{ bal.status==0?'Processing':bal.status==1?'Accepted':'reject' }}</div>\n    </div>\n  </div> <!-- end row -->\n</div> \n<div class=\"text-center my-4\" *ngIf=\"LodingMore\">\n  <a href=\"javascript:void(0);\" class=\"text-danger\"><i class=\"mdi mdi-spin mdi-loading mr-1\"></i> Load more </a>\n</div>");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/shared/common/payment-address/payment-address.component.html":
/*!********************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/shared/common/payment-address/payment-address.component.html ***!
  \********************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<form class=\"needs-validation\" name=\"formpaymentAddress\" [formGroup]=\"formpaymentAddress\" (ngSubmit)=\"onSubmit()\"\nnovalidate>\n\n<app-ui-preloader [display]=\"loading\"></app-ui-preloader>\n<div class=\"modal-body\">\n \n  <ngb-alert type=\"danger\" *ngIf=\"error\" [dismissible]=\"false\">{{ error }}</ngb-alert>\n  <div class=\"form-group mb-3\">\n    <label for=\"name\">FULL NAME</label>\n\n    <input type=\"fullName\" formControlName=\"fullName\"   class=\"form-control\"  id=\"fullName\"  />\n\n    <div *ngIf=\"submitted && f.fullName.errors\" class=\"invalid-feedback\">\n      <div *ngIf=\"f.fullName.errors.required\">FULL NAME</div>\n    </div>\n  </div>\n  <div class=\"form-group mb-3\">\n    <label for=\"name\">ADDRESS 1</label>\n\n    <input type=\"address1\" formControlName=\"address1\"   class=\"form-control\" [ngClass]=\"{ 'is-invalid': submitted && f.nameModel.errors }\" id=\"nameModel\"  />\n\n    <div *ngIf=\"submitted && f.address1.errors\" class=\"invalid-feedback\">\n      <div *ngIf=\"f.address1.errors.required\">ADDRESS 1</div>\n    </div>\n  </div>\n  <div class=\"form-group mb-3\">\n    <label for=\"name\">ADDRESS 2</label>\n\n    <input type=\"address2\" formControlName=\"address2\"   class=\"form-control\"  id=\"address2\"  />\n\n    <div *ngIf=\"submitted && f.address2.errors\" class=\"invalid-feedback\">\n      <div *ngIf=\"f.address2.errors.required\">{{trans.paymentAddress.address2}}</div>\n    </div>\n  </div>\n  <div class=\"form-group mb-3\">\n    <label for=\"name\">COUNTRY</label>\n    <ng-select   formControlName=\"countryId\" (ngModelChange)=\"onChange()\"  bindLabel=\"countryName\" bindValue=\"id\" [items]=\"country\" >\n      <ng-template ng-label-tmp let-item=\"item\">\n        <flag-icon country=\"{{item.code}}\" ></flag-icon>\n        <b>{{item.countryName}}</b>\n     </ng-template>\n     <ng-template ng-option-tmp let-item=\"item\" let-index=\"index\">\n      <flag-icon country=\"{{item.code}}\" ></flag-icon>\n      <b>{{item.countryName}}</b>\n  </ng-template>\n    </ng-select>\n\n    <div *ngIf=\"submitted && f.countryId.errors\" class=\"invalid-feedback\">\n      <div *ngIf=\"f.countryId.errors.required\">COUNTRY</div>\n    </div>\n  </div>\n  <div class=\"form-group mb-3\">\n    <label for=\"name\">CITY</label>\n    <ng-select  formControlName=\"cityId\"  bindLabel=\"cityName\" bindValue=\"id\" [items]=\"city\" ></ng-select>\n    <div *ngIf=\"submitted && f.cityId.errors\" class=\"invalid-feedback\">\n      <div *ngIf=\"f.cityId.errors.required\">CITY</div>\n    </div>\n  </div>\n  <div class=\"form-group mb-3\">\n    <label for=\"name\">PHONE</label>\n    <input type=\"phone\" formControlName=\"phone\"   class=\"form-control\" [ngClass]=\"{ 'is-invalid': submitted && f.phone.errors }\" id=\"phone\"  />\n\n    <div *ngIf=\"submitted && f.nameModel.errors\" class=\"invalid-feedback\">\n      <div *ngIf=\"f.phone.errors.required\">PHONE</div>\n    </div>\n  </div>\n  <div class=\"form-group mb-3\">\n    <label for=\"name\">POSTAL CODE</label>\n\n    <input type=\"postalCode\" formControlName=\"postalCode\"   class=\"form-control\" [ngClass]=\"{ 'is-invalid': submitted && f.postalCode.errors }\" id=\"postalCode\"  />\n\n    <div *ngIf=\"submitted && f.postalCode.errors\" class=\"invalid-feedback\">\n      <div *ngIf=\"f.postalCode.errors.required\">POSTAL CODE</div>\n    </div>\n  </div>\n</div>\n<div class=\"modal-footer\">\n    <button type=\"button\" *ngIf=\"btn\" class=\"btn btn-light waves-effect\" (click)=\"edit()\" >{{trans.paymentAddress.btnedit}}</button>\n    <button type=\"submit\" *ngIf=\"!btn\" class=\"btn btn-light waves-effect\" >{{trans.paymentAddress.btnsave}}</button>\n</div>\n</form>\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/shared/common/permissions/permissions.component.html":
/*!************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/shared/common/permissions/permissions.component.html ***!
  \************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"row\">\n\n  <div class=\"col-lg-12\">\n    <div class=\"\">\n      <button _ngcontent-ogl-c10=\"\" (click)=\"AddPermissions(permissionModal)\" class=\"btn btn-success btn-rounded mb-3\" type=\"button\"><i _ngcontent-ogl-c10=\"\" class=\"mdi mdi-plus\"></i> ADD </button>\n      <div class=\"table-responsive\">\n        <table class=\"table mb-0\">\n          <thead>\n            <tr>\n              <th>Section</th>\n              <th>Read</th>\n              <th>Insert</th>\n              <th>Update</th>\n              <th>Delete</th>\n              <th>View</th>\n            </tr>\n          </thead>\n          <tbody>\n            <tr *ngFor=\"let per of permissions\">\n              <th>{{per.section}}</th>\n              <td><input type=\"checkbox\" [checked]=\"per.read\" (change)=\"updateRead(per.read?false:true,per.id)\" ></td>\n              <td><input type=\"checkbox\" [checked]=\"per.insert\" (change)=\"updateInsert(per.insert?false:true,per.id)\"></td>\n              <td><input type=\"checkbox\" [checked]=\"per.update\" (change)=\"updateUpdate(per.update?false:true,per.id)\"></td>\n              <td><input type=\"checkbox\" [checked]=\"per.delete\" (change)=\"updateDelete(per.delete?false:true,per.id)\"></td>\n              <td><input type=\"checkbox\" [checked]=\"per.view\" (change)=\"updateView(per.view?false:true,per.id)\"></td>\n            </tr>\n          </tbody>\n        </table>\n      </div> <!-- end table-responsive-->\n\n    </div> <!-- end card-box -->\n  </div> <!-- end col -->\n</div>\n\n<ng-template #permissionModal role=\"document\" let-modal=\"close\">\n  <form class=\"needs-validation\" name=\"formPermission\" [formGroup]=\"formPermission\" (ngSubmit)=\"createPermissions()\"\n  novalidate>\n  <app-ui-preloader [display]=\"loading\"></app-ui-preloader>\n  <div class=\"modal-header\">\n      <h4 class=\"modal-title\">{{titleFormName}}</h4>\n      <button type=\"button\" class=\"close\" aria-hidden=\"true\" (click)=\"modal('Cross click')\">×</button>\n  </div>\n  <div class=\"modal-body\">\n   \n    <ngb-alert type=\"danger\" *ngIf=\"errors\" [dismissible]=\"false\">{{ errors }}</ngb-alert>\n    <div class=\"row\">\n      <div class=\"form-group col-lg-12\">\n        <label for=\"name\">Section</label>\n        <select class=\"form-control\">\n          <option value=\"/DentalCenter\">DENTAL CENTERS</option>\n        </select>\n      </div>\n    </div>\n  </div>\n  <div class=\"modal-footer\">\n      <button type=\"button\" class=\"btn btn-light waves-effect\" (click)=\"modal('Cross click')\" >cancel</button>\n      <button type=\"button\" class=\"btn btn-primary\" type=\"submit\">save</button>\n  </div>\n</form>\n</ng-template>");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/shared/common/pricing-strategy/pricing-strategy.component.html":
/*!**********************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/shared/common/pricing-strategy/pricing-strategy.component.html ***!
  \**********************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n\n<div>\n  <div >\n    <div class=\"row\">\n      <div class=\"col-md-2\">\n        <h5>$Cases</h5>\n      </div>\n      <div class=\"col-md-2\">\n        <ng-select   bindLabel=\"name\" bindValue=\"name\" [items]=\"Condation\" class=\"kiven\" style=\"text-align: center;\" ></ng-select>\n      </div>\n      <div class=\"col-md-4\">\n        <input class=\"form-control\" type=\"number\" style=\"border: none !important ; border-bottom: 1px dashed #b3b3b3 !important;\">\n      </div>\n    </div>\n    <div class=\"row\">\n      <div class=\"col-md-2\">\n        <ng-select   bindLabel=\"name\" bindValue=\"name\" [items]=\"OrAnd\" style=\"text-align: center;\"></ng-select>\n      </div>\n      <div class=\"col-md-2\">\n        <ng-select   bindLabel=\"name\" bindValue=\"name\" [items]=\"Condation\" class=\"kiven\"  style=\"text-align: center;\" ></ng-select>\n      </div>\n      <div class=\"col-md-4\">\n        <input class=\"form-control\" type=\"number\" style=\"border: none !important ; border-bottom: 1px dashed #b3b3b3 !important;\">\n      </div>\n    </div>\n  </div>\n</div>");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/shared/common/responsible/responsible.component.html":
/*!************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/shared/common/responsible/responsible.component.html ***!
  \************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<button _ngcontent-eot-c23=\"\" type=\"button\" class=\"btn btn-outline-warning\" (click)=\"Add(responsibleModal)\" style=\"float: right;margin-top: 10px;margin-bottom: 10px;\">Add <i class=\"fas fa-minus-circle\"></i> </button>\n<h5 style=\"float: left;margin-top: 10px;\">Assistants</h5>\n<hr>\n<div class=\"table-responsive\">\n    <table class=\"table table-borderless mb-0\">\n        <thead class=\"thead-light\">\n            <tr>\n                <th>Full Name</th>\n                <th>Email</th>\n                <th>Job Title</th>\n                <th>Phone Number</th>\n                <th>#</th>\n            </tr>\n        </thead>\n        <tbody>\n            <tr *ngFor=\"let res of responsible\">\n                <td>{{res.fullName}}</td>\n                <td>{{res.email}}</td>\n                <td>{{res.jobTitle}}</td>\n                <td>{{res.phone}}</td>\n                <td>\n                    <button _ngcontent-eot-c23=\"\" type=\"button\" class=\"btn btn-outline-warning\" (click)=\"Edit(responsibleModal,res.id)\">Edit <i class=\"fas fa-minus-circle\"></i> </button>\n                    <button _ngcontent-eot-c23=\"\" type=\"button\" class=\"btn btn-outline-danger\" (click)=\"Delete(responsibleModal,res.id)\">Delete <i class=\"fe-trash-2\"></i>  </button>\n                </td>\n            </tr>\n        </tbody>\n    </table>\n</div>\n\n<ng-template #responsibleModal role=\"document\" let-modal=\"close\">\n    <form class=\"needs-validation\" name=\"formResponsible\" [formGroup]=\"formResponsible\" (ngSubmit)=\"onSubmit()\"\n    novalidate>\n    <app-ui-preloader [display]=\"loading\"></app-ui-preloader>\n    <div class=\"modal-header\">\n        <h4 class=\"modal-title\">{{titelForm}}</h4>\n        <button type=\"button\" class=\"close\" aria-hidden=\"true\" (click)=\"modal('Cross click')\">×</button>\n    </div>\n    <div class=\"modal-body\">\n     \n      <ngb-alert type=\"danger\" *ngIf=\"errors\" [dismissible]=\"false\">{{ errors }}</ngb-alert>\n      <div class=\"form-group mb-3\">\n        <label for=\"name\">Full Name</label>\n        <input type=\"fullName\" formControlName=\"fullName\"   class=\"form-control\" [ngClass]=\"{ 'is-invalid': submitted && fn.fullName.errors }\" id=\"fullName\"  />\n        <div *ngIf=\"submitted && fn.fullName.errors\" class=\"invalid-feedback\">\n          <div *ngIf=\"fn.fullName.errors.required\">Full Name</div>\n        </div>\n      </div>\n      <div class=\"form-group mb-3\">\n        <label for=\"name\">Email</label>\n        <input type=\"email\" formControlName=\"email\"   class=\"form-control\" [ngClass]=\"{ 'is-invalid': submitted && fn.email.errors }\" id=\"email\"  />\n        <div *ngIf=\"submitted && fn.email.errors\" class=\"invalid-feedback\">\n          <div *ngIf=\"fn.email.errors.required\">Email</div>\n        </div>\n      </div>\n      <div class=\"form-group mb-3\">\n          <label for=\"name\">Job Title</label>\n    \n          <input type=\"jobTitle\" formControlName=\"jobTitle\"   class=\"form-control\" [ngClass]=\"{ 'is-invalid': submitted && fn.jobTitle.errors }\" id=\"jobTitle\"  />\n          <div *ngIf=\"submitted && fn.jobTitle.errors\" class=\"invalid-feedback\">\n            <div *ngIf=\"fn.jobTitle.errors.required\">Job Title</div>\n          </div>  \n        </div>\n      <div class=\"form-group mb-3\">\n        <label for=\"name\">Phone Number</label>\n  \n        <input type=\"phone\" formControlName=\"phone\"   class=\"form-control\" [ngClass]=\"{ 'is-invalid': submitted && fn.phone.errors }\" id=\"phone\"  />\n        <div *ngIf=\"submitted && fn.phone.errors\" class=\"invalid-feedback\">\n          <div *ngIf=\"fn.phone.errors.required\">Phone Number</div>\n        </div> \n      </div>\n    </div>\n    <div class=\"modal-footer\">\n        <button type=\"button\" class=\"btn btn-light waves-effect\" (click)=\"modal('Cross click')\" >Close</button>\n        <button type=\"button\" class=\"btn btn-primary\" type=\"submit\">Save</button>\n    </div>\n  </form>\n  </ng-template>");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/shared/common/shipping-address/shipping-address.component.html":
/*!**********************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/shared/common/shipping-address/shipping-address.component.html ***!
  \**********************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<form class=\"needs-validation\" name=\"formshippingAddress\" [formGroup]=\"formshippingAddress\" (ngSubmit)=\"onSubmit()\"\nnovalidate>\n\n<app-ui-preloader [display]=\"loading\"></app-ui-preloader>\n<div class=\"modal-body\">\n \n  <ngb-alert type=\"danger\" *ngIf=\"error\" [dismissible]=\"false\">{{ error }}</ngb-alert>\n  <div class=\"form-group mb-3\">\n    <label for=\"name\">FULL NAME</label>\n\n    <input type=\"fullName\" formControlName=\"fullName\"   class=\"form-control\" [ngClass]=\"{ 'is-invalid': submitted && f.fullName.errors }\" id=\"fullName\"  />\n\n    <div *ngIf=\"submitted && f.fullName.errors\" class=\"invalid-feedback\">\n      <div *ngIf=\"f.fullName.errors.required\">FULL NAME</div>\n    </div>\n  </div>\n  <div class=\"form-group mb-3\">\n    <label for=\"name\">ADDRESS 1</label>\n\n    <input type=\"address1\" formControlName=\"address1\"   class=\"form-control\" [ngClass]=\"{ 'is-invalid': submitted && f.nameModel.errors }\" id=\"nameModel\"  />\n\n    <div *ngIf=\"submitted && f.address1.errors\" class=\"invalid-feedback\">\n      <div *ngIf=\"f.address1.errors.required\">ADDRESS 1</div>\n    </div>\n  </div>\n  <div class=\"form-group mb-3\">\n    <label for=\"name\">ADDRESS 2</label>\n\n    <input type=\"address2\" formControlName=\"address2\"   class=\"form-control\" [ngClass]=\"{ 'is-invalid': submitted && f.address2.errors }\" id=\"address2\"  />\n\n    <div *ngIf=\"submitted && f.address2.errors\" class=\"invalid-feedback\">\n      <div *ngIf=\"f.address2.errors.required\">ADDRESS 2</div>\n    </div>\n  </div>\n  <div class=\"form-group mb-3\">\n    <label for=\"name\">COUNTRY</label>\n    <ng-select   formControlName=\"countryId\" (ngModelChange)=\"onChange()\"  bindLabel=\"countryName\" bindValue=\"id\" [items]=\"country\" >\n      <ng-template ng-label-tmp let-item=\"item\">\n        <flag-icon country=\"{{item.code}}\" ></flag-icon>\n        <b>{{item.countryName}}</b>\n     </ng-template>\n     <ng-template ng-option-tmp let-item=\"item\" let-index=\"index\">\n      <flag-icon country=\"{{item.code}}\" ></flag-icon>\n      <b>{{item.countryName}}</b>\n  </ng-template>\n    </ng-select>\n\n    <div *ngIf=\"submitted && f.countryId.errors\" class=\"invalid-feedback\">\n      <div *ngIf=\"f.countryId.errors.required\">COUNTRY</div>\n    </div>\n  </div>\n  <div class=\"form-group mb-3\">\n    <label for=\"name\">CITY</label>\n    <ng-select  formControlName=\"cityId\"  bindLabel=\"cityName\" bindValue=\"id\" [items]=\"city\" ></ng-select>\n    <div *ngIf=\"submitted && f.cityId.errors\" class=\"invalid-feedback\">\n      <div *ngIf=\"f.cityId.errors.required\">CITY</div>\n    </div>\n  </div>\n  <div class=\"form-group mb-3\">\n    <label for=\"name\">PHONE</label>\n    <input type=\"phone\" formControlName=\"phone\"   class=\"form-control\" [ngClass]=\"{ 'is-invalid': submitted && f.phone.errors }\" id=\"phone\"  />\n\n    <div *ngIf=\"submitted && f.nameModel.errors\" class=\"invalid-feedback\">\n      <div *ngIf=\"f.phone.errors.required\">PHONE</div>\n    </div>\n  </div>\n  <div class=\"form-group mb-3\">\n    <label for=\"name\">POSTAL CODE</label>\n\n    <input type=\"postalCode\" formControlName=\"postalCode\"   class=\"form-control\" [ngClass]=\"{ 'is-invalid': submitted && f.postalCode.errors }\" id=\"postalCode\"  />\n\n    <div *ngIf=\"submitted && f.postalCode.errors\" class=\"invalid-feedback\">\n      <div *ngIf=\"f.postalCode.errors.required\">POSTAL CODE</div>\n    </div>\n  </div>\n</div>\n<div class=\"modal-footer\">\n    <button type=\"button\" *ngIf=\"btn\" class=\"btn btn-light waves-effect\" (click)=\"edit()\" >{{trans.shippingAddress.btnedit}}</button>\n    <button type=\"submit\" *ngIf=\"!btn\" class=\"btn btn-light waves-effect\" >{{trans.shippingAddress.btnsave}}</button>\n</div>\n</form>\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/shared/common/upload-files/upload-files.component.html":
/*!**************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/shared/common/upload-files/upload-files.component.html ***!
  \**************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"uploadBox\" [ngClass]=\"{'boxHeaden':fileUpload.length == 0}\" id=\"uploadBox\">\n  <div class=\"header\" id=\"header\">\n    <a class=\"btn btnDown\" (click)=\"btnDown()\">\n      <svg style=\"width: 17px;\" id=\"arrowUp\" aria-hidden=\"true\" focusable=\"false\" data-prefix=\"fad\" data-icon=\"angle-down\" role=\"img\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 320 512\" class=\"svg-inline--fa fa-angle-down fa-w-10 fa-fw fa-2x\"><g class=\"fa-group\"><path fill=\"currentColor\" d=\"M160 256.14l-56.51 56.47-96.44-96.15a23.77 23.77 0 0 1-.18-33.61l.18-.18 22.59-22.51a23.94 23.94 0 0 1 33.85 0z\" class=\"fa-secondary\"></path><path fill=\"currentColor\" d=\"M313 182.57L290.21 160a23.94 23.94 0 0 0-33.85 0L103.47 312.61 143 352l.06.06a24 24 0 0 0 33.93-.16L313 216.36l.18-.17a23.78 23.78 0 0 0-.18-33.62z\" class=\"fa-primary\"></path></g></svg>\n      <svg style=\"width: 17px;display:none;\" id=\"arrowDown\" aria-hidden=\"true\" focusable=\"false\" data-prefix=\"fad\" data-icon=\"angle-up\" role=\"img\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 320 512\" class=\"svg-inline--fa fa-angle-up fa-w-10 fa-fw fa-2x\"><g class=\"fa-group\"><path fill=\"currentColor\" d=\"M63.52 351.84a23.94 23.94 0 0 1-33.85 0L7.05 329.33l-.18-.18a23.77 23.77 0 0 1 .18-33.61l96.42-96.15L160 255.86z\" class=\"fa-secondary\"></path><path fill=\"currentColor\" d=\"M313.13 295.81l-.18-.17L177 160.11a24 24 0 0 0-34-.11l-39.51 39.39L256.33 352a23.94 23.94 0 0 0 33.85 0L313 329.43a23.78 23.78 0 0 0 .13-33.62z\" class=\"fa-primary\"></path></g></svg>\n    </a>\n    <a>Files being downloaded now <strong style=\"float:right;\">{{fileUpload.length}}</strong></a>\n  </div>\n  <div class=\"body\">\n    <div class=\"item\" *ngFor=\"let file of fileUpload\">\n      <div style=\"margin-bottom: 7px;\">       \n        <img src=\"assets/stl.png\" style=\"width: 32px;\">\n        <a>{{(file.namePatint.length>26)? (file.namePatint | slice:0:26)+'..':(file.namePatint)}}</a>\n        <a style=\"float: right;\">{{file.value}}%</a>\n      </div>\n      <ngb-progressbar type=\"success\" [value]=\"file.value\" [striped]=\"true\" [animated]=\"true\"  height=\"4px\"></ngb-progressbar>\n    </div>\n  </div>\n</div>");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/shared/common/video-trement/video-trement.component.html":
/*!****************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/shared/common/video-trement/video-trement.component.html ***!
  \****************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div id=\"instructions\" class=\"contianer\">\n\n  <video id=\"my_video_1\" class=\"video-js vjs-default-skin\" style=\"width: 100%;height: auto;\"\n      controls preload=\"none\" poster='http://video-js.zencoder.com/oceans-clip.jpg'\n      data-setup='{ \"aspectRatio\":\"640:267\", \"playbackRates\": [1, 1.5, 2] }'>\n    <source src=\"{{srcVideo}}\" type='video/mp4' />\n  </video>\n</div>\n  ");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/shared/ui/emaillist/emaillist.component.html":
/*!****************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/shared/ui/emaillist/emaillist.component.html ***!
  \****************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<!-- List  -->\n<div class=\"mail-list\" *ngFor=\"let list of emailList\">\n  <a href=\"javascript: void(0);\" class=\"list-group-item border-0\"\n    [ngClass]=\"{'text-danger font-weight-bold': list.text === 'danger'}\">\n    <i class=\"{{list.icon}} font-18 align-middle mr-2\"></i>{{list.name}} \n    <span class=\"badge bagde-danger float-right ml-2 mt-1\" [ngClass]=\"\n                  {\n                    'badge-danger': list.text === 'danger',\n                    'badge-info': list.text === 'info'\n                  }\">\n    {{list.value}}</span>\n  </a>\n</div>\n<!-- End list -->\n\n<!-- Label -->\n<h6 class=\"mt-4\">Labels</h6>\n<div class=\"list-group b-0 mail-list\" *ngFor=\"let label of emailLabel\">\n  <a href=\"javascript: void(0);\" class=\"list-group-item border-0\"><span\n      class=\"mdi mdi-circle text-{{label.text}} mr-2\"></span>{{label.name}}</a>\n</div>\n<!-- End label -->\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/shared/ui/pagetitle/pagetitle.component.html":
/*!****************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/shared/ui/pagetitle/pagetitle.component.html ***!
  \****************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"row\">\n  <div class=\"col-12\">\n    <div class=\"page-title-box\">\n      <div class=\"page-title-right\">\n        <ol class=\"breadcrumb m-0\">\n          <li class=\"breadcrumb-item\" [ngClass]=\"{'active': item.active}\" *ngFor=\"let item of breadcrumbItems\">\n            <a href=\"{{item.path}}\" *ngIf=\"!item.active\">{{ item.label }}</a>\n            <span *ngIf=\"item.active\">{{ item.label }}</span>\n          </li>\n        </ol>\n      </div>\n      <h4 class=\"page-title\">{{ title }}</h4>\n    </div>\n  </div>\n</div>");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/shared/ui/portlet/portlet.component.html":
/*!************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/shared/ui/portlet/portlet.component.html ***!
  \************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"card\" *ngIf=\"isVisible\">\n  <!-- card header -->\n\n  <div class=\"card-header bg-{{ color }} text-{{ text }} {{headerClass}}\">\n    {{ title }}\n\n    <div class=\"card-widgets\">\n      <a href=\"javascript: void(0);\" (click)=\"refreshContent()\"><i class=\"mdi mdi-refresh\"></i></a>\n      <a href=\"javascript: void(0);\" (click)=\"isCollapsed = !isCollapsed\" [attr.aria-expanded]=\"!isCollapsed\"\n        aria-expanded=\"false\" aria-controls=\"cardCollpase5\" class=\"mdi mdi-minus\" [ngClass]=\"\n           {\n             'mdi-minus': isCollapsed == false,\n             'mdi-plus': isCollapsed == true\n           }\">\n      </a>\n    </div>\n\n  </div>\n\n  <!-- End card header -->\n\n  <div id=\"cardCollpase5\" [ngbCollapse]=\"isCollapsed\">\n    <ng-content></ng-content>\n  </div>\n\n  <div class=\"card-disabled\" *ngIf=\"isLoading\">\n    <div class=\"card-portlets-loader\"></div>\n  </div>\n\n</div>");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/shared/ui/preloader/preloader.component.html":
/*!****************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/shared/ui/preloader/preloader.component.html ***!
  \****************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"preloader\" [hidden]='!display'>\n  <div class=\"status\">\n      <div class=\"spinner-border avatar-sm text-primary m-2\" role=\"status\"></div>\n  </div>\n</div>");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/shared/ui/widget/widget.component.html":
/*!**********************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/shared/ui/widget/widget.component.html ***!
  \**********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"btn-group\">\n  <button type=\"button\" class=\"btn btn-sm btn-light waves-effect\"><i class=\"mdi mdi-archive font-18\"></i></button>\n  <button type=\"button\" class=\"btn btn-sm btn-light waves-effect\"><i class=\"mdi mdi-alert-octagon font-18\"></i></button>\n  <button type=\"button\" class=\"btn btn-sm btn-light waves-effect\"><i\n      class=\"mdi mdi-delete-variant font-18\"></i></button>\n</div>\n<div class=\"btn-group ml-1\" ngbDropdown>\n  <button type=\"button\" class=\"btn btn-sm btn-light dropdown-toggle waves-effect\" data-toggle=\"dropdown\"\n    ngbDropdownToggle aria-expanded=\"false\">\n    <i class=\"mdi mdi-folder font-18\"></i>\n    <i class=\"mdi mdi-chevron-down\"></i>\n  </button>\n  <div class=\"dropdown-menu\" ngbDropdownMenu>\n    <span class=\"dropdown-header\">Move to</span>\n    <a class=\"dropdown-item\" href=\"javascript: void(0);\">Social</a>\n    <a class=\"dropdown-item\" href=\"javascript: void(0);\">Promotions</a>\n    <a class=\"dropdown-item\" href=\"javascript: void(0);\">Updates</a>\n    <a class=\"dropdown-item\" href=\"javascript: void(0);\">Forums</a>\n  </div>\n</div>\n<div class=\"btn-group ml-1\" ngbDropdown>\n  <button type=\"button\" class=\"btn btn-sm btn-light dropdown-toggle waves-effect\" data-toggle=\"dropdown\"\n    ngbDropdownToggle aria-expanded=\"false\">\n    <i class=\"mdi mdi-label font-18\"></i>\n    <i class=\"mdi mdi-chevron-down\"></i>\n  </button>\n  <div class=\"dropdown-menu\" ngbDropdownMenu>\n    <span class=\"dropdown-header\">Label as:</span>\n    <a class=\"dropdown-item\" href=\"javascript: void(0);\">Updates</a>\n    <a class=\"dropdown-item\" href=\"javascript: void(0);\">Social</a>\n    <a class=\"dropdown-item\" href=\"javascript: void(0);\">Promotions</a>\n    <a class=\"dropdown-item\" href=\"javascript: void(0);\">Forums</a>\n  </div>\n</div>\n\n<div class=\"btn-group ml-1\" ngbDropdown>\n  <button type=\"button\" class=\"btn btn-sm btn-light dropdown-toggle waves-effect\" data-toggle=\"dropdown\"\n    ngbDropdownToggle aria-expanded=\"false\">\n    <i class=\"mdi mdi-dots-horizontal font-18\"></i> More\n    <i class=\"mdi mdi-chevron-down\"></i>\n  </button>\n  <div class=\"dropdown-menu\" ngbDropdownMenu>\n    <span class=\"dropdown-header\">More Option :</span>\n    <a class=\"dropdown-item\" href=\"javascript: void(0);\">Mark as Unread</a>\n    <a class=\"dropdown-item\" href=\"javascript: void(0);\">Add to Tasks</a>\n    <a class=\"dropdown-item\" href=\"javascript: void(0);\">Add Star</a>\n    <a class=\"dropdown-item\" href=\"javascript: void(0);\">Mute</a>\n  </div>\n</div>");

/***/ }),

/***/ "./node_modules/tslib/tslib.es6.js":
/*!*****************************************!*\
  !*** ./node_modules/tslib/tslib.es6.js ***!
  \*****************************************/
/*! exports provided: __extends, __assign, __rest, __decorate, __param, __metadata, __awaiter, __generator, __exportStar, __values, __read, __spread, __await, __asyncGenerator, __asyncDelegator, __asyncValues, __makeTemplateObject, __importStar, __importDefault */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__extends", function() { return __extends; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__assign", function() { return __assign; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__rest", function() { return __rest; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__decorate", function() { return __decorate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__param", function() { return __param; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__metadata", function() { return __metadata; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__awaiter", function() { return __awaiter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__generator", function() { return __generator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__exportStar", function() { return __exportStar; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__values", function() { return __values; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__read", function() { return __read; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__spread", function() { return __spread; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__await", function() { return __await; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__asyncGenerator", function() { return __asyncGenerator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__asyncDelegator", function() { return __asyncDelegator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__asyncValues", function() { return __asyncValues; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__makeTemplateObject", function() { return __makeTemplateObject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__importStar", function() { return __importStar; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__importDefault", function() { return __importDefault; });
/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    }
    return __assign.apply(this, arguments);
}

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
}

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __param(paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
}

function __metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}

function __awaiter(thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

function __exportStar(m, exports) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}

function __values(o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
}

function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
}

function __spread() {
    for (var ar = [], i = 0; i < arguments.length; i++)
        ar = ar.concat(__read(arguments[i]));
    return ar;
}

function __await(v) {
    return this instanceof __await ? (this.v = v, this) : new __await(v);
}

function __asyncGenerator(thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
}

function __asyncDelegator(o) {
    var i, p;
    return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
    function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
}

function __asyncValues(o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
}

function __makeTemplateObject(cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};

function __importStar(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result.default = mod;
    return result;
}

function __importDefault(mod) {
    return (mod && mod.__esModule) ? mod : { default: mod };
}


/***/ }),

/***/ "./src/$$_lazy_route_resource lazy recursive":
/*!**********************************************************!*\
  !*** ./src/$$_lazy_route_resource lazy namespace object ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/app-routing.module.ts":
/*!***************************************!*\
  !*** ./src/app/app-routing.module.ts ***!
  \***************************************/
/*! exports provided: AppRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppRoutingModule", function() { return AppRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _core_guards_auth_guard__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./core/guards/auth.guard */ "./src/app/core/guards/auth.guard.ts");
/* harmony import */ var _layouts_layout_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./layouts/layout.component */ "./src/app/layouts/layout.component.ts");





const routes = [
    { path: 'account', loadChildren: () => __webpack_require__.e(/*! import() | account-account-module */ "account-account-module").then(__webpack_require__.bind(null, /*! ./account/account.module */ "./src/app/account/account.module.ts")).then(m => m.AccountModule) },
    { path: '', component: _layouts_layout_component__WEBPACK_IMPORTED_MODULE_4__["LayoutComponent"], loadChildren: () => __webpack_require__.e(/*! import() | portals-portal-module */ "portals-portal-module").then(__webpack_require__.bind(null, /*! ./portals/portal.module */ "./src/app/portals/portal.module.ts")).then(m => m.PortalModule), canActivate: [_core_guards_auth_guard__WEBPACK_IMPORTED_MODULE_3__["AuthGuard"]] }
];
let AppRoutingModule = class AppRoutingModule {
};
AppRoutingModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forRoot(routes, { scrollPositionRestoration: 'top' })],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]]
    })
], AppRoutingModule);



/***/ }),

/***/ "./src/app/app.component.scss":
/*!************************************!*\
  !*** ./src/app/app.component.scss ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".intl-tel-input {\n  width: 100%;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9hbWVyZ2hqamV5L0RvY3VtZW50cy9Qcm9qZWN0cy9QYXJpc2FsaW5lT2xkL2FkbWluL3NyYy9hcHAvYXBwLmNvbXBvbmVudC5zY3NzIiwic3JjL2FwcC9hcHAuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDSSxXQUFBO0FDQ0oiLCJmaWxlIjoic3JjL2FwcC9hcHAuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuaW50bC10ZWwtaW5wdXQge1xuICAgIHdpZHRoOiAxMDAlO1xufVxuXG4iLCIuaW50bC10ZWwtaW5wdXQge1xuICB3aWR0aDogMTAwJTtcbn0iXX0= */");

/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _core_services_socket_socket_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./core/services/socket/socket.service */ "./src/app/core/services/socket/socket.service.ts");
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ngx-toastr */ "./node_modules/ngx-toastr/fesm2015/ngx-toastr.js");
/* harmony import */ var _core_services_stlView_stl_view_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./core/services/stlView/stl-view.service */ "./src/app/core/services/stlView/stl-view.service.ts");
/* harmony import */ var _core_services_auth_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./core/services/auth.service */ "./src/app/core/services/auth.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");







let AppComponent = class AppComponent {
    constructor(router, auth, sok, toastr, stlView) {
        this.router = router;
        this.auth = auth;
        this.sok = sok;
        this.toastr = toastr;
        this.stlView = stlView;
        this.permssion = [];
        this.sok.getStatusConnction().subscribe(res => {
            if (res) {
                if (this.sok.chekevent('NOTF')) {
                    this.sok.addevent('NOTF').subscribe((data) => {
                        if (data.content[0].section == "Cases") {
                            if (data.typeNotices == 1)
                                this.toastr.success(data.content[0].information, "Add");
                        }
                    });
                }
                if (this.sok.chekevent('SERVERLOGS')) {
                    this.sok.addevent('SERVERLOGS').subscribe((data) => {
                        let Logs = document.createElement('p');
                        if (data.type === "MESSAGE") {
                            Logs.style.background = '#8203b6';
                            Logs.innerText = data.data.toString();
                        }
                        else if (data.type === "ERRORSERVER") {
                            Logs.style.background = 'rgb(230 0 0)';
                            Logs.innerText = data.data.toString();
                        }
                        else if (data.type === "ERRORMESSAGE") {
                            Logs.style.background = 'rgb(230 0 142)';
                            Logs.innerText = data.data.toString();
                        }
                        document.getElementById('logServer').querySelector('#txtLogs').appendChild(Logs);
                        document.getElementById('logServer').querySelector('#txtLogs').scrollTop = document.getElementById('logServer').querySelector('#txtLogs').scrollHeight;
                    });
                }
            }
            else {
            }
        });
        // this.router.events.subscribe((event:Event) => {
        //   if (event instanceof NavigationStart) {
        //       // Show loading indicator
        //      let num=0
        //       this.permssion.forEach(element => {
        //         if(element==event.url)
        //         {
        //           num++;
        //         }
        //       });
        //       if(num==0 && this.auth.user.role==2)
        //       {
        //         this.router.navigateByUrl("/notFondPage");
        //       }
        //   }
        // });
    }
    StopAnmtion() {
        this.stlView.StopAnmtion();
    }
    closeStlViewr() {
        this.stlView.StopAnmtion();
        this.stlView.clearStl();
        document.getElementById("modelDivStlViewr").style.display = "none";
    }
};
AppComponent.ctorParameters = () => [
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_6__["Router"] },
    { type: _core_services_auth_service__WEBPACK_IMPORTED_MODULE_5__["AuthenticationService"] },
    { type: _core_services_socket_socket_service__WEBPACK_IMPORTED_MODULE_2__["SocketService"] },
    { type: ngx_toastr__WEBPACK_IMPORTED_MODULE_3__["ToastrService"] },
    { type: _core_services_stlView_stl_view_service__WEBPACK_IMPORTED_MODULE_4__["StlViewService"] }
];
AppComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-ubold',
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./app.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/app.component.html")).default,
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./app.component.scss */ "./src/app/app.component.scss")).default]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_6__["Router"], _core_services_auth_service__WEBPACK_IMPORTED_MODULE_5__["AuthenticationService"], _core_services_socket_socket_service__WEBPACK_IMPORTED_MODULE_2__["SocketService"], ngx_toastr__WEBPACK_IMPORTED_MODULE_3__["ToastrService"], _core_services_stlView_stl_view_service__WEBPACK_IMPORTED_MODULE_4__["StlViewService"]])
], AppComponent);



/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm2015/platform-browser.js");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/platform-browser/animations */ "./node_modules/@angular/platform-browser/fesm2015/animations.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm2015/http.js");
/* harmony import */ var _core_helpers_error_interceptor__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./core/helpers/error.interceptor */ "./src/app/core/helpers/error.interceptor.ts");
/* harmony import */ var _core_helpers_jwt_interceptor__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./core/helpers/jwt.interceptor */ "./src/app/core/helpers/jwt.interceptor.ts");
/* harmony import */ var _layouts_layouts_module__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./layouts/layouts.module */ "./src/app/layouts/layouts.module.ts");
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./app-routing.module */ "./src/app/app-routing.module.ts");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ngx-toastr */ "./node_modules/ngx-toastr/fesm2015/ngx-toastr.js");
/* harmony import */ var _shared_common_common_module__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./shared/common/common.module */ "./src/app/shared/common/common.module.ts");












let AppModule = class AppModule {
};
AppModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["NgModule"])({
        declarations: [
            _app_component__WEBPACK_IMPORTED_MODULE_9__["AppComponent"]
        ],
        imports: [
            _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__["BrowserModule"],
            _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_2__["BrowserAnimationsModule"],
            _angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpClientModule"],
            _layouts_layouts_module__WEBPACK_IMPORTED_MODULE_7__["LayoutsModule"],
            _app_routing_module__WEBPACK_IMPORTED_MODULE_8__["AppRoutingModule"],
            ngx_toastr__WEBPACK_IMPORTED_MODULE_10__["ToastrModule"].forRoot(),
            _shared_common_common_module__WEBPACK_IMPORTED_MODULE_11__["CommonsModule"],
        ],
        providers: [
            { provide: _angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HTTP_INTERCEPTORS"], useClass: _core_helpers_jwt_interceptor__WEBPACK_IMPORTED_MODULE_6__["JwtInterceptor"], multi: true },
            { provide: _angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HTTP_INTERCEPTORS"], useClass: _core_helpers_error_interceptor__WEBPACK_IMPORTED_MODULE_5__["ErrorInterceptor"], multi: true }
        ],
        bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_9__["AppComponent"]]
    })
], AppModule);



/***/ }),

/***/ "./src/app/core/guards/auth.guard.ts":
/*!*******************************************!*\
  !*** ./src/app/core/guards/auth.guard.ts ***!
  \*******************************************/
/*! exports provided: AuthGuard */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthGuard", function() { return AuthGuard; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _services_auth_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../services/auth.service */ "./src/app/core/services/auth.service.ts");




let AuthGuard = class AuthGuard {
    constructor(router, authenticationService) {
        this.router = router;
        this.authenticationService = authenticationService;
    }
    canActivate(route, state) {
        const currentUser = this.authenticationService.currentUser();
        if (currentUser) {
            // logged in so return true
            return true;
        }
        // not logged in so redirect to login page with the return url
        this.router.navigate(['/account/login'], { queryParams: { returnUrl: state.url } });
        return false;
    }
};
AuthGuard.ctorParameters = () => [
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"] },
    { type: _services_auth_service__WEBPACK_IMPORTED_MODULE_3__["AuthenticationService"] }
];
AuthGuard = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({ providedIn: 'root' }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"],
        _services_auth_service__WEBPACK_IMPORTED_MODULE_3__["AuthenticationService"]])
], AuthGuard);



/***/ }),

/***/ "./src/app/core/helpers/error.interceptor.ts":
/*!***************************************************!*\
  !*** ./src/app/core/helpers/error.interceptor.ts ***!
  \***************************************************/
/*! exports provided: ErrorInterceptor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ErrorInterceptor", function() { return ErrorInterceptor; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm2015/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm2015/operators/index.js");
/* harmony import */ var _services_auth_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../services/auth.service */ "./src/app/core/services/auth.service.ts");





let ErrorInterceptor = class ErrorInterceptor {
    constructor(authenticationService) {
        this.authenticationService = authenticationService;
    }
    intercept(request, next) {
        return next.handle(request).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(err => {
            if (err.status === 401) {
                // auto logout if 401 response returned from api
                // this.authenticationService.logout();
                // location.reload();
            }
            const error = err.error.message || err.statusText;
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["throwError"])(error);
        }));
    }
};
ErrorInterceptor.ctorParameters = () => [
    { type: _services_auth_service__WEBPACK_IMPORTED_MODULE_4__["AuthenticationService"] }
];
ErrorInterceptor = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])(),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_services_auth_service__WEBPACK_IMPORTED_MODULE_4__["AuthenticationService"]])
], ErrorInterceptor);



/***/ }),

/***/ "./src/app/core/helpers/jwt.interceptor.ts":
/*!*************************************************!*\
  !*** ./src/app/core/helpers/jwt.interceptor.ts ***!
  \*************************************************/
/*! exports provided: JwtInterceptor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "JwtInterceptor", function() { return JwtInterceptor; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _services_auth_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../services/auth.service */ "./src/app/core/services/auth.service.ts");
/* harmony import */ var src_environments_environment_prod__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/environments/environment.prod */ "./src/environments/environment.prod.ts");




let JwtInterceptor = class JwtInterceptor {
    constructor(authenticationService) {
        this.authenticationService = authenticationService;
    }
    intercept(request, next) {
        // add authorization header with jwt token if available
        const currentUser = this.authenticationService.currentUser();
        let langidenv = "-1";
        if (src_environments_environment_prod__WEBPACK_IMPORTED_MODULE_3__["environment"].langId != null) {
            langidenv = src_environments_environment_prod__WEBPACK_IMPORTED_MODULE_3__["environment"].langId.toString();
        }
        if (currentUser && currentUser.token) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${currentUser.token}`
                },
                setParams: {
                    langIdStatic: langidenv,
                    typeS: src_environments_environment_prod__WEBPACK_IMPORTED_MODULE_3__["environment"].typeUser,
                    idStatic: currentUser.id.toString()
                }
            });
        }
        return next.handle(request);
    }
};
JwtInterceptor.ctorParameters = () => [
    { type: _services_auth_service__WEBPACK_IMPORTED_MODULE_2__["AuthenticationService"] }
];
JwtInterceptor = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])(),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_services_auth_service__WEBPACK_IMPORTED_MODULE_2__["AuthenticationService"]])
], JwtInterceptor);



/***/ }),

/***/ "./src/app/core/services/auth.service.ts":
/*!***********************************************!*\
  !*** ./src/app/core/services/auth.service.ts ***!
  \***********************************************/
/*! exports provided: AuthenticationService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthenticationService", function() { return AuthenticationService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm2015/http.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm2015/operators/index.js");
/* harmony import */ var _services_cookie_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../services/cookie.service */ "./src/app/core/services/cookie.service.ts");
/* harmony import */ var src_environments_environment_prod__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/environments/environment.prod */ "./src/environments/environment.prod.ts");
/* harmony import */ var _socket_socket_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./socket/socket.service */ "./src/app/core/services/socket/socket.service.ts");







let AuthenticationService = class AuthenticationService {
    constructor(http, cookieService, sock) {
        this.http = http;
        this.cookieService = cookieService;
        this.sock = sock;
    }
    /**
     * Returns the current user
     */
    currentUser() {
        if (!this.user) {
            this.user = JSON.parse(this.cookieService.getCookie('adminUsers'));
            if (this.user) {
                console.log(this.user);
                src_environments_environment_prod__WEBPACK_IMPORTED_MODULE_5__["environment"].langId = this.user.langId;
                src_environments_environment_prod__WEBPACK_IMPORTED_MODULE_5__["environment"].langCode = this.user.langCode;
                src_environments_environment_prod__WEBPACK_IMPORTED_MODULE_5__["environment"].id = this.user.id;
                this.sock.connction(1, this.user);
            }
        }
        else {
            src_environments_environment_prod__WEBPACK_IMPORTED_MODULE_5__["environment"].langId = this.user.langId;
            src_environments_environment_prod__WEBPACK_IMPORTED_MODULE_5__["environment"].langCode = this.user.langCode;
            src_environments_environment_prod__WEBPACK_IMPORTED_MODULE_5__["environment"].id = this.user.id;
        }
        return this.user;
    }
    setCookis(langId, langCode) {
        this.cookieService.setCookie('adminUsers', JSON.stringify({ role: this.user.role, token: this.user.token, id: this.user.id, langId: langId, langCode: langCode, imageUser: this.user.imageUser, nameUser: this.user.nameUser }), 1);
        src_environments_environment_prod__WEBPACK_IMPORTED_MODULE_5__["environment"].langId = langId;
        src_environments_environment_prod__WEBPACK_IMPORTED_MODULE_5__["environment"].langCode = langCode;
        this.user.langCode = langCode;
        this.user.langId = langId;
    }
    /**
     * Performs the auth
     * @param email email of user
     * @param password password of user
     *
     */
    login(email, password) {
        return this.http.post(src_environments_environment_prod__WEBPACK_IMPORTED_MODULE_5__["environment"].url + '/user/login', { email: email, password: password })
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(user => {
            // login successful if there's a jwt token in the response
            if (user && user.token) {
                this.user = { role: user.user.role, token: user.token, id: user.user.id, langId: user.user.langId, langCode: user.user.langCode, imageUser: user.user.photo, nameUser: "A " + user.user.first_name };
                src_environments_environment_prod__WEBPACK_IMPORTED_MODULE_5__["environment"].langId = this.user.langId;
                src_environments_environment_prod__WEBPACK_IMPORTED_MODULE_5__["environment"].langCode = this.user.langCode;
                src_environments_environment_prod__WEBPACK_IMPORTED_MODULE_5__["environment"].id = this.user.id;
                // store user details and jwt in cookie
                src_environments_environment_prod__WEBPACK_IMPORTED_MODULE_5__["environment"].token = user.token;
                this.cookieService.setCookie('adminUsers', JSON.stringify({ role: user.user.role, token: user.token, id: user.user.id, langId: user.user.langId, langCode: user.user.langCode, imageUser: user.user.photo, nameUser: "A " + user.user.first_name }), 1);
                this.sock.connction(1, this.user);
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
};
AuthenticationService.ctorParameters = () => [
    { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"] },
    { type: _services_cookie_service__WEBPACK_IMPORTED_MODULE_4__["CookieService"] },
    { type: _socket_socket_service__WEBPACK_IMPORTED_MODULE_6__["SocketService"] }
];
AuthenticationService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({ providedIn: 'root' }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"], _services_cookie_service__WEBPACK_IMPORTED_MODULE_4__["CookieService"], _socket_socket_service__WEBPACK_IMPORTED_MODULE_6__["SocketService"]])
], AuthenticationService);



/***/ }),

/***/ "./src/app/core/services/balance/balance.service.ts":
/*!**********************************************************!*\
  !*** ./src/app/core/services/balance/balance.service.ts ***!
  \**********************************************************/
/*! exports provided: BalanceService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BalanceService", function() { return BalanceService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm2015/http.js");
/* harmony import */ var src_environments_environment_prod__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/environments/environment.prod */ "./src/environments/environment.prod.ts");




let BalanceService = class BalanceService {
    constructor(http) {
        this.http = http;
    }
    getAllById(dentalCenterId) {
        return this.http.post(src_environments_environment_prod__WEBPACK_IMPORTED_MODULE_3__["environment"].url + "/balance/getAllById", { dentalCenterId: dentalCenterId });
    }
    getAllBy() {
        return this.http.post(src_environments_environment_prod__WEBPACK_IMPORTED_MODULE_3__["environment"].url + "/balance/getAllNotAccepted", {});
    }
    getAllAccepted() {
        return this.http.post(src_environments_environment_prod__WEBPACK_IMPORTED_MODULE_3__["environment"].url + "/balance/getAllAccepted", {});
    }
    accepted(id, userId, pass) {
        return this.http.post(src_environments_environment_prod__WEBPACK_IMPORTED_MODULE_3__["environment"].url + "/balance/accepted", { id: id, userId: userId, pass: pass });
    }
};
BalanceService.ctorParameters = () => [
    { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"] }
];
BalanceService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
        providedIn: 'root'
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"]])
], BalanceService);



/***/ }),

/***/ "./src/app/core/services/city/city.service.ts":
/*!****************************************************!*\
  !*** ./src/app/core/services/city/city.service.ts ***!
  \****************************************************/
/*! exports provided: CityService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CityService", function() { return CityService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm2015/http.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm2015/index.js");
/* harmony import */ var src_environments_environment_prod__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/environments/environment.prod */ "./src/environments/environment.prod.ts");





let CityService = class CityService {
    constructor(http) {
        this.http = http;
        this.currency = new rxjs__WEBPACK_IMPORTED_MODULE_3__["BehaviorSubject"](null);
    }
    set() {
        return this.currency.asObservable();
    }
    getAll() {
        return this.http.post(src_environments_environment_prod__WEBPACK_IMPORTED_MODULE_4__["environment"].url + "/city/getAll", {}).subscribe(res => {
            this.currency.next(res);
        });
    }
    create(param) {
        return this.http.post(src_environments_environment_prod__WEBPACK_IMPORTED_MODULE_4__["environment"].url + "/city/create", param);
    }
    delete(id) {
        return this.http.post(src_environments_environment_prod__WEBPACK_IMPORTED_MODULE_4__["environment"].url + "/city/delete", { id: id });
    }
    deactivate_or_activate(id, statu) {
        return this.http.post(src_environments_environment_prod__WEBPACK_IMPORTED_MODULE_4__["environment"].url + "/city/deactivate_or_activate", { id: id, status: statu });
    }
    getAllName(cityId) {
        return this.http.post(src_environments_environment_prod__WEBPACK_IMPORTED_MODULE_4__["environment"].url + "/city/getAllName", { cityId: cityId });
    }
    createName(param) {
        return this.http.post(src_environments_environment_prod__WEBPACK_IMPORTED_MODULE_4__["environment"].url + "/city/createName", param);
    }
    deleteName(id) {
        return this.http.post(src_environments_environment_prod__WEBPACK_IMPORTED_MODULE_4__["environment"].url + "/city/deleteName", { id: id });
    }
    getAllAndName() {
        return this.http.post(src_environments_environment_prod__WEBPACK_IMPORTED_MODULE_4__["environment"].url + "/city/getAllAndName", { langId: src_environments_environment_prod__WEBPACK_IMPORTED_MODULE_4__["environment"].langId });
    }
    getAllAndNameById(countryId) {
        return this.http.post(src_environments_environment_prod__WEBPACK_IMPORTED_MODULE_4__["environment"].url + "/city/getAllAndNameById", { langId: src_environments_environment_prod__WEBPACK_IMPORTED_MODULE_4__["environment"].langId, countryId: countryId });
    }
    getNameById(cityId) {
        return this.http.post(src_environments_environment_prod__WEBPACK_IMPORTED_MODULE_4__["environment"].url + "/city/getNameById", { langId: src_environments_environment_prod__WEBPACK_IMPORTED_MODULE_4__["environment"].langId, cityId: cityId });
    }
};
CityService.ctorParameters = () => [
    { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"] }
];
CityService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
        providedIn: 'root'
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"]])
], CityService);



/***/ }),

/***/ "./src/app/core/services/cookie.service.ts":
/*!*************************************************!*\
  !*** ./src/app/core/services/cookie.service.ts ***!
  \*************************************************/
/*! exports provided: CookieService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CookieService", function() { return CookieService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");


let CookieService = class CookieService {
    constructor() { }
    /**
     * Returns the cookie value by name
     * @param name cookie name
     */
    getCookie(name) {
        if (!name) {
            return null;
        }
        const nameEQ = name + '=';
        const ca = document.cookie.split(';');
        // tslint:disable-next-line: prefer-for-of
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') {
                c = c.substring(1, c.length);
            }
            if (c.indexOf(nameEQ) === 0) {
                return c.substring(nameEQ.length, c.length);
            }
        }
        return null;
    }
    /**
     * Deletes the cookie with given name
     * @param name cookie name
     * @param path path of the domain
     */
    deleteCookie(name) {
        this.setCookie(name, '', -1);
    }
    /**
     * Creates/sets the cookie
     * @param name name of cookie
     * @param value cookie value
     * @param days validity in days
     */
    setCookie(name, value, days) {
        let expires = '';
        if (days) {
            const date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = '; expires=' + date.toUTCString();
        }
        document.cookie = name + '=' + value + expires + '; path=/';
    }
};
CookieService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
        providedIn: 'root'
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
], CookieService);



/***/ }),

/***/ "./src/app/core/services/country/country.service.ts":
/*!**********************************************************!*\
  !*** ./src/app/core/services/country/country.service.ts ***!
  \**********************************************************/
/*! exports provided: CountryService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CountryService", function() { return CountryService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm2015/http.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm2015/index.js");
/* harmony import */ var src_environments_environment_prod__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/environments/environment.prod */ "./src/environments/environment.prod.ts");





let CountryService = class CountryService {
    constructor(http) {
        this.http = http;
        this.currency = new rxjs__WEBPACK_IMPORTED_MODULE_3__["BehaviorSubject"](null);
    }
    set() {
        return this.currency.asObservable();
    }
    getAll() {
        return this.http.post(src_environments_environment_prod__WEBPACK_IMPORTED_MODULE_4__["environment"].url + "/country/getAll", {}).subscribe(res => {
            this.currency.next(res);
        });
    }
    create(param) {
        return this.http.post(src_environments_environment_prod__WEBPACK_IMPORTED_MODULE_4__["environment"].url + "/country/create", param);
    }
    delete(id) {
        return this.http.post(src_environments_environment_prod__WEBPACK_IMPORTED_MODULE_4__["environment"].url + "/country/delete", { id: id });
    }
    deactivate_or_activate(id, statu) {
        return this.http.post(src_environments_environment_prod__WEBPACK_IMPORTED_MODULE_4__["environment"].url + "/country/deactivate_or_activate", { id: id, status: statu });
    }
    getAllName(currencyId) {
        return this.http.post(src_environments_environment_prod__WEBPACK_IMPORTED_MODULE_4__["environment"].url + "/country/getAllName", { countryId: currencyId });
    }
    createName(param) {
        return this.http.post(src_environments_environment_prod__WEBPACK_IMPORTED_MODULE_4__["environment"].url + "/country/createName", param);
    }
    deleteName(id) {
        return this.http.post(src_environments_environment_prod__WEBPACK_IMPORTED_MODULE_4__["environment"].url + "/country/deleteName", { id: id });
    }
    getAllAndName() {
        return this.http.post(src_environments_environment_prod__WEBPACK_IMPORTED_MODULE_4__["environment"].url + "/country/getAllAndName", { langId: src_environments_environment_prod__WEBPACK_IMPORTED_MODULE_4__["environment"].langId });
    }
    getNameById(countryId) {
        return this.http.post(src_environments_environment_prod__WEBPACK_IMPORTED_MODULE_4__["environment"].url + "/country/getNameById", { countryId: countryId, langId: src_environments_environment_prod__WEBPACK_IMPORTED_MODULE_4__["environment"].langId });
    }
};
CountryService.ctorParameters = () => [
    { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"] }
];
CountryService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
        providedIn: 'root'
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"]])
], CountryService);



/***/ }),

/***/ "./src/app/core/services/dentalCenter/dental-center.service.ts":
/*!*********************************************************************!*\
  !*** ./src/app/core/services/dentalCenter/dental-center.service.ts ***!
  \*********************************************************************/
/*! exports provided: DentalCenterService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DentalCenterService", function() { return DentalCenterService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm2015/http.js");
/* harmony import */ var src_environments_environment_prod__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/environments/environment.prod */ "./src/environments/environment.prod.ts");




let DentalCenterService = class DentalCenterService {
    constructor(http) {
        this.http = http;
    }
    getAll() {
        return this.http.post(src_environments_environment_prod__WEBPACK_IMPORTED_MODULE_3__["environment"].url + "/dentalCenter/getAll", {});
    }
    getById(id) {
        return this.http.post(src_environments_environment_prod__WEBPACK_IMPORTED_MODULE_3__["environment"].url + "/dentalCenter/getById", { id: id });
    }
    getAllBylaboratorysId(laboratorysId) {
        return this.http.post(src_environments_environment_prod__WEBPACK_IMPORTED_MODULE_3__["environment"].url + "/dentalCenter/getAllBylaboratorysId", { laboratorysId: laboratorysId });
    }
    getAllByMediatorId(mediatorId) {
        return this.http.post(src_environments_environment_prod__WEBPACK_IMPORTED_MODULE_3__["environment"].url + "/dentalCenter/getAllByMediatorId", { mediatorId: mediatorId });
    }
    create(param) {
        return this.http.post(src_environments_environment_prod__WEBPACK_IMPORTED_MODULE_3__["environment"].url + "/dentalCenter/create", param);
    }
    update(param) {
        return this.http.post(src_environments_environment_prod__WEBPACK_IMPORTED_MODULE_3__["environment"].url + "/dentalCenter/update", param);
    }
    delete(param) {
        return this.http.post(src_environments_environment_prod__WEBPACK_IMPORTED_MODULE_3__["environment"].url + "/dentalCenter/delete", param);
    }
    deactivate_or_activate(id, status) {
        return this.http.post(src_environments_environment_prod__WEBPACK_IMPORTED_MODULE_3__["environment"].url + "/dentalCenter/deactivate_or_activate", { id: id, status: status });
    }
};
DentalCenterService.ctorParameters = () => [
    { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"] }
];
DentalCenterService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
        providedIn: 'root'
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"]])
], DentalCenterService);



/***/ }),

/***/ "./src/app/core/services/dentelCenterClint/dentel-center-clint.service.ts":
/*!********************************************************************************!*\
  !*** ./src/app/core/services/dentelCenterClint/dentel-center-clint.service.ts ***!
  \********************************************************************************/
/*! exports provided: DentelCenterClintService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DentelCenterClintService", function() { return DentelCenterClintService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm2015/http.js");
/* harmony import */ var src_environments_environment_prod__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/environments/environment.prod */ "./src/environments/environment.prod.ts");




let DentelCenterClintService = class DentelCenterClintService {
    constructor(http) {
        this.http = http;
    }
    getAllDoctor(dentalCenterId) {
        return this.http.post(src_environments_environment_prod__WEBPACK_IMPORTED_MODULE_3__["environment"].url + "/dentelCenterClint/getAllDoctor", { dentalCenterId: dentalCenterId });
    }
    getAllDentelCenter(doctorId) {
        return this.http.post(src_environments_environment_prod__WEBPACK_IMPORTED_MODULE_3__["environment"].url + "/dentelCenterClint/getAllDentelCenter", { doctorId: doctorId });
    }
    Join(param) {
        return this.http.post(src_environments_environment_prod__WEBPACK_IMPORTED_MODULE_3__["environment"].url + "/dentelCenterClint/Join", param);
    }
    deactivate_or_activate(id, status) {
        return this.http.post(src_environments_environment_prod__WEBPACK_IMPORTED_MODULE_3__["environment"].url + "/dentelCenterClint/deactivate_or_activate", { id: id, status: status });
    }
    delete(param) {
        return this.http.post(src_environments_environment_prod__WEBPACK_IMPORTED_MODULE_3__["environment"].url + "/dentelCenterClint/delete", param);
    }
};
DentelCenterClintService.ctorParameters = () => [
    { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"] }
];
DentelCenterClintService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
        providedIn: 'root'
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"]])
], DentelCenterClintService);



/***/ }),

/***/ "./src/app/core/services/encrypt/encrypt.service.ts":
/*!**********************************************************!*\
  !*** ./src/app/core/services/encrypt/encrypt.service.ts ***!
  \**********************************************************/
/*! exports provided: EncryptService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EncryptService", function() { return EncryptService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var crypto_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! crypto-js */ "./node_modules/crypto-js/index.js");
/* harmony import */ var crypto_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(crypto_js__WEBPACK_IMPORTED_MODULE_2__);



let EncryptService = class EncryptService {
    constructor() {
        this.key = '123456$#@$^@1ERF';
    }
    Encrypt(value) {
        var key = crypto_js__WEBPACK_IMPORTED_MODULE_2__["enc"].Utf8.parse(this.key);
        var iv = crypto_js__WEBPACK_IMPORTED_MODULE_2__["enc"].Utf8.parse(this.key);
        var encrypted = crypto_js__WEBPACK_IMPORTED_MODULE_2__["AES"].encrypt(crypto_js__WEBPACK_IMPORTED_MODULE_2__["enc"].Utf8.parse(value.toString()), key, {
            keySize: 128,
            iv: iv,
            mode: crypto_js__WEBPACK_IMPORTED_MODULE_2__["mode"].CBC,
            padding: crypto_js__WEBPACK_IMPORTED_MODULE_2__["pad"].Pkcs7
        });
        var ss = encrypted.toString();
        return ss.split('/').join('KaaeerrttK').split('=').join('KwwqqppiinnK');
    }
    //The Decode method is use for decrypt the value.
    Decode(value) {
        value = value.split('KaaeerrttK').join('/').split('KwwqqppiinnK').join('=');
        var key = crypto_js__WEBPACK_IMPORTED_MODULE_2__["enc"].Utf8.parse(this.key);
        var iv = crypto_js__WEBPACK_IMPORTED_MODULE_2__["enc"].Utf8.parse(this.key);
        var decrypted = crypto_js__WEBPACK_IMPORTED_MODULE_2__["AES"].decrypt(value, key, {
            keySize: 128,
            iv: iv,
            mode: crypto_js__WEBPACK_IMPORTED_MODULE_2__["mode"].CBC,
            padding: crypto_js__WEBPACK_IMPORTED_MODULE_2__["pad"].Pkcs7
        });
        return decrypted.toString(crypto_js__WEBPACK_IMPORTED_MODULE_2__["enc"].Utf8);
    }
};
EncryptService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
        providedIn: 'root'
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
], EncryptService);



/***/ }),

/***/ "./src/app/core/services/notices/notices.service.ts":
/*!**********************************************************!*\
  !*** ./src/app/core/services/notices/notices.service.ts ***!
  \**********************************************************/
/*! exports provided: NoticesService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NoticesService", function() { return NoticesService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm2015/http.js");
/* harmony import */ var src_environments_environment_prod__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/environments/environment.prod */ "./src/environments/environment.prod.ts");




let NoticesService = class NoticesService {
    constructor(http) {
        this.http = http;
    }
    getAll() {
        return this.http.post(src_environments_environment_prod__WEBPACK_IMPORTED_MODULE_3__["environment"].url + "/notices/getAll", {});
    }
    getAllView() {
        return this.http.post(src_environments_environment_prod__WEBPACK_IMPORTED_MODULE_3__["environment"].url + "/notices/getAllView", {});
    }
    changeView(id) {
        return this.http.post(src_environments_environment_prod__WEBPACK_IMPORTED_MODULE_3__["environment"].url + "/notices/changeView", { id: id });
    }
};
NoticesService.ctorParameters = () => [
    { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"] }
];
NoticesService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
        providedIn: 'root'
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"]])
], NoticesService);



/***/ }),

/***/ "./src/app/core/services/patient/patient.service.ts":
/*!**********************************************************!*\
  !*** ./src/app/core/services/patient/patient.service.ts ***!
  \**********************************************************/
/*! exports provided: PatientService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PatientService", function() { return PatientService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm2015/http.js");
/* harmony import */ var src_environments_environment_prod__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/environments/environment.prod */ "./src/environments/environment.prod.ts");




let PatientService = class PatientService {
    constructor(http) {
        this.http = http;
    }
    getAll(caseStatus) {
        return this.http.post(src_environments_environment_prod__WEBPACK_IMPORTED_MODULE_3__["environment"].url + "/patient/getAll", { caseStatus: caseStatus });
    }
    getCount() {
        return this.http.post(src_environments_environment_prod__WEBPACK_IMPORTED_MODULE_3__["environment"].url + "/patient/getCount", {});
    }
    create(param) {
        return this.http.post(src_environments_environment_prod__WEBPACK_IMPORTED_MODULE_3__["environment"].url + "/patient/create", param);
    }
    update(param) {
        return this.http.post(src_environments_environment_prod__WEBPACK_IMPORTED_MODULE_3__["environment"].url + "/patient/update", param);
    }
    getById(id) {
        return this.http.post(src_environments_environment_prod__WEBPACK_IMPORTED_MODULE_3__["environment"].url + "/patient/getById", { id: id });
    }
    getAllByDoctorId(id) {
        return this.http.post(src_environments_environment_prod__WEBPACK_IMPORTED_MODULE_3__["environment"].url + "/patient/getAllByDoctorId", { id: id });
    }
    getAllByDentelCenterId(id) {
        return this.http.post(src_environments_environment_prod__WEBPACK_IMPORTED_MODULE_3__["environment"].url + "/patient/getAllByDentelCenterId", { dentalCenterId: id });
    }
};
PatientService.ctorParameters = () => [
    { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"] }
];
PatientService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
        providedIn: 'root'
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"]])
], PatientService);



/***/ }),

/***/ "./src/app/core/services/paymentAddress/payment-address.service.ts":
/*!*************************************************************************!*\
  !*** ./src/app/core/services/paymentAddress/payment-address.service.ts ***!
  \*************************************************************************/
/*! exports provided: PaymentAddressService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PaymentAddressService", function() { return PaymentAddressService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm2015/http.js");
/* harmony import */ var src_environments_environment_prod__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/environments/environment.prod */ "./src/environments/environment.prod.ts");




let PaymentAddressService = class PaymentAddressService {
    constructor(http) {
        this.http = http;
    }
    get(userType, userId) {
        return this.http.post(src_environments_environment_prod__WEBPACK_IMPORTED_MODULE_3__["environment"].url + "/paymentAddress/get", { userType: userType, userId: userId });
    }
    createAndUpdate(param) {
        return this.http.post(src_environments_environment_prod__WEBPACK_IMPORTED_MODULE_3__["environment"].url + "/paymentAddress/createAndUpdate", param);
    }
};
PaymentAddressService.ctorParameters = () => [
    { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"] }
];
PaymentAddressService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
        providedIn: 'root'
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"]])
], PaymentAddressService);



/***/ }),

/***/ "./src/app/core/services/permissions/permissions.service.ts":
/*!******************************************************************!*\
  !*** ./src/app/core/services/permissions/permissions.service.ts ***!
  \******************************************************************/
/*! exports provided: PermissionsService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PermissionsService", function() { return PermissionsService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm2015/http.js");
/* harmony import */ var src_environments_environment_prod__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/environments/environment.prod */ "./src/environments/environment.prod.ts");




let PermissionsService = class PermissionsService {
    constructor(http) {
        this.http = http;
    }
    get(userType, userId) {
        return this.http.post(src_environments_environment_prod__WEBPACK_IMPORTED_MODULE_3__["environment"].url + "/permissions/get", { userType: userType, userId: userId });
    }
    create(param) {
        return this.http.post(src_environments_environment_prod__WEBPACK_IMPORTED_MODULE_3__["environment"].url + "/permissions/create", param);
    }
    uRead(param) {
        return this.http.post(src_environments_environment_prod__WEBPACK_IMPORTED_MODULE_3__["environment"].url + "/permissions/uRead", param);
    }
    uInsert(param) {
        return this.http.post(src_environments_environment_prod__WEBPACK_IMPORTED_MODULE_3__["environment"].url + "/permissions/uInsert", param);
    }
    uUpdate(param) {
        return this.http.post(src_environments_environment_prod__WEBPACK_IMPORTED_MODULE_3__["environment"].url + "/permissions/uUpdate", param);
    }
    uDelete(param) {
        return this.http.post(src_environments_environment_prod__WEBPACK_IMPORTED_MODULE_3__["environment"].url + "/permissions/uDelete", param);
    }
    uView(param) {
        return this.http.post(src_environments_environment_prod__WEBPACK_IMPORTED_MODULE_3__["environment"].url + "/permissions/uView", param);
    }
};
PermissionsService.ctorParameters = () => [
    { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"] }
];
PermissionsService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
        providedIn: 'root'
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"]])
], PermissionsService);



/***/ }),

/***/ "./src/app/core/services/responsible/responsible.service.ts":
/*!******************************************************************!*\
  !*** ./src/app/core/services/responsible/responsible.service.ts ***!
  \******************************************************************/
/*! exports provided: ResponsibleService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ResponsibleService", function() { return ResponsibleService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm2015/http.js");
/* harmony import */ var src_environments_environment_prod__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/environments/environment.prod */ "./src/environments/environment.prod.ts");




let ResponsibleService = class ResponsibleService {
    constructor(http) {
        this.http = http;
    }
    getAllById(id, userType) {
        return this.http.post(src_environments_environment_prod__WEBPACK_IMPORTED_MODULE_3__["environment"].url + "/responsible/getAllById", { userId: id, userType: userType });
    }
    create(param) {
        return this.http.post(src_environments_environment_prod__WEBPACK_IMPORTED_MODULE_3__["environment"].url + "/responsible/create", param);
    }
    update(param) {
        return this.http.post(src_environments_environment_prod__WEBPACK_IMPORTED_MODULE_3__["environment"].url + "/responsible/update", param);
    }
    delete(param) {
        return this.http.post(src_environments_environment_prod__WEBPACK_IMPORTED_MODULE_3__["environment"].url + "/responsible/delete", { id: param['id'] });
    }
};
ResponsibleService.ctorParameters = () => [
    { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"] }
];
ResponsibleService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
        providedIn: 'root'
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"]])
], ResponsibleService);



/***/ }),

/***/ "./src/app/core/services/shippingAddress/shipping-address.service.ts":
/*!***************************************************************************!*\
  !*** ./src/app/core/services/shippingAddress/shipping-address.service.ts ***!
  \***************************************************************************/
/*! exports provided: ShippingAddressService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ShippingAddressService", function() { return ShippingAddressService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm2015/http.js");
/* harmony import */ var src_environments_environment_prod__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/environments/environment.prod */ "./src/environments/environment.prod.ts");




let ShippingAddressService = class ShippingAddressService {
    constructor(http) {
        this.http = http;
    }
    get(userType, userId) {
        return this.http.post(src_environments_environment_prod__WEBPACK_IMPORTED_MODULE_3__["environment"].url + "/shippingAddress/get", { userType: userType, userId: userId });
    }
    createAndUpdate(param) {
        return this.http.post(src_environments_environment_prod__WEBPACK_IMPORTED_MODULE_3__["environment"].url + "/shippingAddress/createAndUpdate", param);
    }
};
ShippingAddressService.ctorParameters = () => [
    { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"] }
];
ShippingAddressService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
        providedIn: 'root'
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"]])
], ShippingAddressService);



/***/ }),

/***/ "./src/app/core/services/socket/socket.service.ts":
/*!********************************************************!*\
  !*** ./src/app/core/services/socket/socket.service.ts ***!
  \********************************************************/
/*! exports provided: SocketService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SocketService", function() { return SocketService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var socket_io_client__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! socket.io-client */ "./node_modules/socket.io-client/lib/index.js");
/* harmony import */ var socket_io_client__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(socket_io_client__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var src_environments_environment_prod__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/environments/environment.prod */ "./src/environments/environment.prod.ts");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm2015/index.js");





let SocketService = class SocketService {
    constructor() {
        this.connstatus = new rxjs__WEBPACK_IMPORTED_MODULE_4__["BehaviorSubject"](false);
        this.connctionStatus = false;
        this.events = [];
        this.observabelChatOP = new rxjs__WEBPACK_IMPORTED_MODULE_4__["BehaviorSubject"](false);
    }
    connction(type, user) {
        if (this.socket == undefined) {
            //type : 1 =ADMIN ,2=DOCTOR ,3=LABRETOR,4=MEDIARETOR,5=DENTELCENTER,6=users
            this.socket = socket_io_client__WEBPACK_IMPORTED_MODULE_2___default()(src_environments_environment_prod__WEBPACK_IMPORTED_MODULE_3__["environment"].url, { reconnect: true, query: { id: user.id, type: type, name: user.nameUser } });
            this.socket.on("connect", (data) => {
                this.connctionStatus = true;
                this.connstatus.next(true);
            });
            this.socket.on("disconnect", (data) => {
                this.connctionStatus = false;
                this.connstatus.next(false);
            });
        }
        else {
            if (!this.connctionStatus) {
                this.socket.connect();
            }
        }
    }
    disConncted() {
        if (this.connctionStatus) {
            this.socket.disconnect();
        }
    }
    getStatusConnction() {
        return this.connstatus.asObservable();
    }
    emit(nameEvent, param) {
        this.socket.emit(nameEvent, param);
    }
    addevent(nameEvent) {
        this.events.push({ name: nameEvent });
        return new rxjs__WEBPACK_IMPORTED_MODULE_4__["Observable"](observer => {
            this.socket.on(nameEvent, (data) => observer.next(data));
        });
    }
    chekevent(nameevent) {
        for (let i = 0; i < this.events.length; i++) {
            if (this.events[i].name == nameevent) {
                return false;
            }
        }
        return true;
    }
    getObservabelChat() {
        return this.observabelChatOP.asObservable();
    }
    observabelChat() {
        this.observabelChatOP.next(true);
    }
};
SocketService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
        providedIn: 'root'
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
], SocketService);



/***/ }),

/***/ "./src/app/core/services/stlView/stl-view.service.ts":
/*!***********************************************************!*\
  !*** ./src/app/core/services/stlView/stl-view.service.ts ***!
  \***********************************************************/
/*! exports provided: StlViewService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StlViewService", function() { return StlViewService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm2015/index.js");



let StlViewService = class StlViewService {
    constructor() {
        this.fileExsite = false;
        this.animated = false;
        this.stlReady = false;
        this.status = new rxjs__WEBPACK_IMPORTED_MODULE_2__["BehaviorSubject"](false);
    }
    setStlView(elementDiv, prgrass) {
        if (this.stlReady) {
        }
        else {
            this.prgrass = prgrass;
            this.stlView = new StlViewer(elementDiv, {
                loading_progress_callback: this.load_prog,
                all_loaded_callback: () => {
                    this.status.next(true);
                },
                models: []
            });
            this.stlReady = true;
        }
    }
    setFileView(URL) {
        this.stlView.add_model({ id: 1, filename: URL, pacity: 0.2, z: 20, color: "#7a7a7a" });
        this.fileExsite = true;
        this.status.next(false);
        return this.status;
    }
    load_prog(load_status, load_session) {
        var loaded = 0;
        var total = 0;
        //go over all models that are/were loaded
        Object.keys(load_status).forEach(function (model_id) {
            if (load_status[model_id].load_session == load_session) //need to make sure we're on the last loading session (not counting previous loaded models)
             {
                loaded += load_status[model_id].loaded;
                total += load_status[model_id].total;
                //set the relevant model's progress bar
                console.log(load_status[model_id].loaded / load_status[model_id].total);
                document.getElementById("pbtotal").value = load_status[model_id].loaded / load_status[model_id].total;
            }
        });
        //set total progress bar
        // (<HTMLProgressElement>document.getElementById("pbtotal")).value=loaded/total;
    }
    StopAnmtion() {
        if (this.animated) {
            this.stlView.animate_model(1, { delta: null });
            this.animated = false;
        }
        else {
            this.stlView.animate_model(1, { delta: { rotationx: 1, msec: 1000, loop: true } });
            this.animated = true;
        }
    }
    clearStl() {
        this.stlView.remove_model(1);
    }
};
StlViewService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
        providedIn: 'root'
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
], StlViewService);



/***/ }),

/***/ "./src/app/core/services/translation/trans.service.ts":
/*!************************************************************!*\
  !*** ./src/app/core/services/translation/trans.service.ts ***!
  \************************************************************/
/*! exports provided: TransService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TransService", function() { return TransService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm2015/index.js");



let TransService = class TransService {
    constructor() {
        this.trans = new rxjs__WEBPACK_IMPORTED_MODULE_2__["BehaviorSubject"](null);
        this.trans.next({ id: 1, name: "en", key: {
                public: {
                    "this_format_is_not_currently_supported": "This format is not currently supported ",
                    "error_55555": "Unknown error"
                },
                general: {
                    "title": "General",
                    "paymentAddress": "Payment Address",
                    "card1_title": "Language",
                    "card1_title1": "Difult Language",
                    "card2_title": "Currency",
                    "card2_title1": "Currency",
                    "card3_title": "Email",
                    "card3_title1": "Email",
                    "card4_title": "social links",
                    "card4_title1": "social links",
                    "card4_btn_add": "Add",
                    "card4_sl_name": "Name",
                    "card4_sl_link": "Link",
                    "card4_edit": "Edit",
                    "modalsocial_title_Add_link": "Add Link",
                    "modalsocial_title_edit_link": "Edit Link",
                    "modalsocial_title_remove_link": "Remove Link",
                    "modalsocial_btn_save": "Save",
                    "modalsocial_btn_cancel": "Cancel",
                    "card5_title": "SEO key words",
                    "card5_title1": "SEO key words",
                    "card5_btn_add": "Add",
                    "card5_seo_name": "Name",
                    "card5_seo_description": "description",
                    "card5_seo_key_words": "key words",
                    "card5_edit": "Edit",
                    "modalseo_title_Add_key_words": "Add key words",
                    "modalseo_title_edit_key_words": "Edit key words",
                    "modalseo_title_remove_key_words": "Remove key words",
                    "modalseo_btn_save": "Save",
                    "modalseo_btn_cancel": "Cancel",
                    "addSuccessfull": "Key words added successfully",
                    "updatedSuccessfully": "Key words updated successfully",
                    "deletedSuccessfully": "Key words deleted successfully",
                    "shippingAddress": "shipping Address"
                },
                users: {
                    "error_1001": "Email exists",
                    "User_added_successfully": "User added successfully",
                    "User_updated_successfully": "User updated successfully",
                    "User_deleted_successfully": "User deleted successfully",
                    "name": "Name",
                    "first_name": "First Name",
                    "last_name": "Last Name",
                    "email": "Email",
                    "role": "User Role",
                    "telephone_number": "Telephone Number",
                    "photo": "Photo",
                    "created_at": "Created At",
                    "updated_at": "Updated At",
                    "deleted_at": "Deleted At",
                    "choose_photo": "Choose Photo",
                    "Email_is_required": "Email is required",
                    "Email_must_be_a_valid_email_address": "Email must be a valid email address",
                    "last_name_is_required": "last name is required",
                    "first_name_is_required": "first name is required",
                    "Password_is_required": "Password is required",
                    "btn_modal_close": "Close",
                    "btn_modal_save": "Save changes",
                    "TitleForm_add_Users": "Add Users",
                    "TitleForm_edit_Users": "Edit Users",
                    "TitleForm_remove_Users": "Remove Users",
                    "role_Admin": 'Admin',
                    "role_limited": "Limited"
                },
                Language: {
                    "card1_title": "Language",
                    "error_1001": "Language exists",
                    "lang_added_successfully": "Language added successfully",
                    "lang_updated_successfully": "Language updated successfully",
                    "lang_deleted_successfully": "Language deleted successfully",
                    "langCode": "Language Code",
                    "direction": "Direction",
                    "active": "Active",
                    "TitleForm_add_Language": "add Language",
                    "TitleForm_delete_Language": "Delete Language ",
                    "The_language_has_been_activated": "The language has been activated ",
                    "The_language_has_been_deactivated": "The language has been deactivated "
                },
                language_classifier: {
                    "card1_title": "language classifier ",
                    "langName": "Name",
                    "name_exists": "Name Exists",
                    "error_1001": "Language exists",
                    "lang_added_successfully": "Language Classifie added successfully",
                    "lang_updated_successfully": "Language Classifie updated successfully",
                    "lang_deleted_successfully": "Language Classifie deleted successfully",
                    "langClangName": "Language Name",
                    "TitleForm_add_Language": "add Language Classifie",
                    "TitleForm_delete_Language": "Delete Language Classifie",
                },
                currency: {
                    "card1_title": "Currency ",
                    "currencyCode": "currency Code",
                    "status": "Status",
                    "symbol": "Symbol",
                    "exchangeRate": "Exchange Rate",
                    "lastUpdated": "Last Updated",
                    "titleFormCurrency_add": "Add Currency",
                    "TitleForm_add": "add Currency",
                    "TitleForm_update": "Update Currency",
                    "TitleForm_delete": "Delete Currency",
                    "addSuccessfull": "Add Successfull",
                    "updatedSuccessfully": "Updated Successfully Currency",
                    "deletedSuccessfully": "Deleted Successfully Currency",
                    "SimilarRecordsCannotbeAdded": "Similar records cannot be added",
                    "UnknownError": "Unknown error",
                    "TheCodeIsInvalid": "The code is invalid",
                    "YouMustHaveAtLeastOneName": "You must have at least one name"
                },
                currencyName: {
                    "card1_title": "Currency Name ",
                    "currencyName": "currency Name",
                    "langId": "langId",
                    "langCode": "Language Code",
                    "currencyId": "currencyId",
                    "titleFormCurrencyName_add": "Add Currency Name",
                    "titleFormCurrency_add": "add Currency Name",
                    "titleFormCurrency_update": "Delete Currency",
                    "titleFormCurrency_delete": "Delete Currency",
                    "addSuccessfull": "Add Successfull",
                    "updatedSuccessfully": "Updated Successfully Currency",
                    "deletedSuccessfully": "Deleted Successfully Currency",
                    "SimilarRecordsCannotbeAdded": "Similar records cannot be added",
                    "UnknownError": "Unknown error",
                },
                country: {
                    "card1_title": "Country ",
                    "Code": "Country Code",
                    "status": "Status",
                    "flag": "flag",
                    "titleFormCountry_add": "Add Country",
                    "TitleForm_add": "add Country",
                    "TitleForm_update": "Update Country",
                    "TitleForm_delete": "Delete Country",
                    "addSuccessfull": "Add Successfull",
                    "updatedSuccessfully": "Updated Successfully Country",
                    "deletedSuccessfully": "Deleted Successfully Country",
                    "SimilarRecordsCannotbeAdded": "Similar records cannot be added",
                    "UnknownError": "Unknown error",
                    "TheCodeIsInvalid": "The code is invalid",
                },
                countryName: {
                    "card1_title": "Country Name ",
                    "countryName": "Country Name",
                    "langId": "langId",
                    "langCode": "Language Code",
                    "countryId": "countryId",
                    "titleFormCurrencyName_add": "Add Country Name",
                    "titleFormCurrency_add": "add Country Name",
                    "titleFormCurrency_update": "Delete Country",
                    "titleFormCurrency_delete": "Delete Country",
                    "addSuccessfull": "Add Successfull",
                    "updatedSuccessfully": "Updated Successfully Country",
                    "deletedSuccessfully": "Deleted Successfully Country",
                    "SimilarRecordsCannotbeAdded": "Similar records cannot be added",
                    "UnknownError": "Unknown error",
                    "thislanguageitisstop": "Stop",
                },
                city: {
                    "card1_title": "City ",
                    "cityName": "City Name",
                    "status": "Status",
                    "countryId": "Country Name",
                    "flag": "flag",
                    "titleFormCity_add": "Add City",
                    "TitleForm_add": "add City",
                    "TitleForm_update": "Update City",
                    "TitleForm_delete": "Delete City",
                    "addSuccessfull": "Add Successfull",
                    "updatedSuccessfully": "Updated Successfully City",
                    "deletedSuccessfully": "Deleted Successfully City",
                    "SimilarRecordsCannotbeAdded": "Similar records cannot be added",
                    "UnknownError": "Unknown error",
                    "TheCodeIsInvalid": "The code is invalid",
                    "TheCityHasBeenActivated": "The record has been activated",
                    "CityHasBeenDeactivated": "The record has been deactivated",
                    "YouMustHaveAtLeastOneName": "You Must Have At Least One Name"
                },
                cityName: {
                    "card1_title": "City Name ",
                    "cityName": "City Name",
                    "langId": "langId",
                    "langCode": "Language Code",
                    "countryId": "Country",
                    "Flag": "Flag",
                    "cityId": "cityId",
                    "titleFormCurrencyName_add": "Add City Name",
                    "titleFormCurrency_add": "add City Name",
                    "titleFormCurrency_update": "Delete City",
                    "titleFormCurrency_delete": "Delete City",
                    "addSuccessfull": "Add Successfull",
                    "updatedSuccessfully": "Updated Successfully Country",
                    "deletedSuccessfully": "Deleted Successfully Country",
                    "SimilarRecordsCannotbeAdded": "Similar records cannot be added",
                    "UnknownError": "Unknown error",
                    "thislanguageitisstop": "Stop",
                },
                emailModel: {
                    "title": "Email Model",
                    "card1_title": "Email Model ",
                    "nameModel": "Mode Name",
                    "status": "Status",
                    "langId": "Language",
                    "countryId": "Country Name",
                    "flag": "flag",
                    "titleFormCity_add": "Add Email Model",
                    "TitleForm_add": "add Email Model",
                    "TitleForm_update": "Edit Email Content",
                    "TitleForm_delete": "Delete Email Model",
                    "addSuccessfull": "Add Successfull",
                    "updatedSuccessfully": "Updated Successfully City",
                    "deletedSuccessfully": "Deleted Successfully City",
                    "SimilarRecordsCannotbeAdded": "Similar records cannot be added",
                    "UnknownError": "Unknown error",
                    "TheCodeIsInvalid": "The code is invalid",
                    "TheEmail_modelHasBeenActivated": "The Email Model has been activated",
                    "Email_modelHasBeenDeactivated": "the Email Model has been deactivated",
                    "YouMustHaveAtLeastOneName": "You Must Have At Least One Name"
                },
                contentEmailModel: {
                    "title": "Email Model",
                    "card1_title": "Contetn Email Model ",
                    "content_model": "Content_model",
                    "langId": "Language",
                    "subject": "subject",
                    "titleFormCurrencyName_add": "Add Contetn Email",
                    "titleFormCurrency_add": "add Contetn Email",
                    "titleFormCurrency_update": "Delete Contetn Email",
                    "titleFormCurrency_delete": "Delete Contetn Email",
                    "addSuccessfull": "Add Successfull",
                    "updatedSuccessfully": "Updated Successfully Country",
                    "deletedSuccessfully": "Deleted Successfully Country",
                    "SimilarRecordsCannotbeAdded": "Similar records cannot be added",
                    "UnknownError": "Unknown error",
                    "thislanguageitisstop": "Stop",
                },
                smsModel: {
                    "title": "SMS Model",
                    "card1_title": "SMS Model ",
                    "nameModel": "SMS Name",
                    "status": "Status",
                    "langId": "Language",
                    "flag": "flag",
                    "titleFormCity_add": "Add SMS Model",
                    "TitleForm_add": "add SMS Model",
                    "TitleForm_update": "Edit SMS Content",
                    "TitleForm_delete": "Delete SMS Model",
                    "addSuccessfull": "Add Successfull",
                    "updatedSuccessfully": "Updated Successfully SMS",
                    "deletedSuccessfully": "Deleted Successfully SMS",
                    "SimilarRecordsCannotbeAdded": "Similar records cannot be added",
                    "UnknownError": "Unknown error",
                    "TheCodeIsInvalid": "The code is invalid",
                    "TheEmail_modelHasBeenActivated": "The Email Model has been activated",
                    "Email_modelHasBeenDeactivated": "the Email Model has been deactivated",
                    "YouMustHaveAtLeastOneName": "You Must Have At Least One Name"
                },
                contentSmsModel: {
                    "title": "SMS Model",
                    "card1_title": "Contetn SMS Model ",
                    "content_model": "Content_model",
                    "langId": "Language",
                    "subject": "subject",
                    "titleFormCurrencyName_add": "Add SMS Content",
                    "titleFormCurrency_add": "add SMS Content",
                    "titleFormCurrency_update": "Delete City",
                    "titleFormCurrency_delete": "Delete City",
                    "addSuccessfull": "Add Successfull",
                    "updatedSuccessfully": "Updated Successfully SMS Content",
                    "deletedSuccessfully": "Deleted Successfully SMS Content",
                    "SimilarRecordsCannotbeAdded": "Similar records cannot be added",
                    "UnknownError": "Unknown error",
                    "thislanguageitisstop": "Stop",
                },
                shippingAddress: {
                    "title": "shippingAddress",
                    "fullName": "Full Name ",
                    "address1": "Address1",
                    "address2": "Address2",
                    "countryId": "Country",
                    "cityId": "City",
                    "phone": "Phone",
                    "postalCode": "PostalCode",
                    "titleFormCurrencyName_add": "Add SMS Content",
                    "titleFormCurrency_add": "add SMS Content",
                    "titleFormCurrency_update": "Delete City",
                    "titleFormCurrency_delete": "Delete City",
                    "addSuccessfull": "Add Successfull",
                    "updatedSuccessfully": "Updated Successfully shippingAddress",
                    "deletedSuccessfully": "Deleted Successfully shippingAddress",
                    "SimilarRecordsCannotbeAdded": "Similar records cannot be added",
                    "UnknownError": "Unknown error",
                    "thislanguageitisstop": "Stop",
                    "btnedit": "Edit",
                    "btnsave": "Save"
                },
                paymentAddress: {
                    "title": "paymentAddress",
                    "fullName": "Full Name ",
                    "address1": "Address1",
                    "address2": "Address2",
                    "countryId": "Country",
                    "cityId": "City",
                    "phone": "Phone",
                    "postalCode": "PostalCode",
                    "titleFormCurrencyName_add": "Add SMS Content",
                    "titleFormCurrency_add": "add SMS Content",
                    "titleFormCurrency_update": "Delete City",
                    "titleFormCurrency_delete": "Delete City",
                    "addSuccessfull": "Add Successfull",
                    "updatedSuccessfully": "Updated Successfully paymentAddress",
                    "deletedSuccessfully": "Deleted Successfully paymentAddress",
                    "SimilarRecordsCannotbeAdded": "Similar records cannot be added",
                    "UnknownError": "Unknown error",
                    "thislanguageitisstop": "Stop",
                    "btnedit": "Edit",
                    "btnsave": "Save"
                },
            } });
    }
    changelang(id) {
        //this translation change post or file 
        this.trans.next({ id: 1, name: "en", key: {
                public: {
                    "this_format_is_not_currently_supported": "This format is not currently supported ",
                    "error_55555": "Unknown error"
                },
                general: {
                    "card1_title": "Language",
                    "card1_title1": "Difult Language",
                    "card2_title": "Currency",
                    "card2_title1": "Currency",
                    "card3_title": "Email",
                    "card3_title1": "Email",
                    "card4_title": "social links",
                    "card4_title1": "social links",
                    "card4_btn_add": "Add",
                    "card4_sl_name": "Name",
                    "card4_sl_link": "Link",
                    "card4_edit": "Edit",
                    "modalsocial_title_Add_link": "Add Link",
                    "modalsocial_title_edit_link": "Edit Link",
                    "modalsocial_title_remove_link": "Remove Link",
                    "modalsocial_btn_save": "Save",
                    "modalsocial_btn_cancel": "Cancel",
                    "card5_title": "SEO key words",
                    "card5_title1": "SEO key words",
                    "card5_btn_add": "Add",
                    "card5_seo_name": "Name",
                    "card5_seo_description": "description",
                    "card5_seo_key_words": "key words",
                    "card5_edit": "Edit",
                    "modalseo_title_Add_key_words": "Add key words",
                    "modalseo_title_edit_key_words": "Edit key words",
                    "modalseo_title_remove_key_words": "Remove key words",
                    "modalseo_btn_save": "Save",
                    "modalseo_btn_cancel": "Cancel",
                },
                users: {
                    "error_1001": "Email exists",
                    "User_added_successfully": "User added successfully",
                    "User_updated_successfully": "User updated successfully",
                    "User_deleted_successfully": "User deleted successfully",
                    "name": "Name",
                    "first_name": "First Name",
                    "last_name": "Last Name",
                    "email": "Email",
                    "role": "User Role",
                    "telephone_number": "Telephone Number",
                    "photo": "Photo",
                    "created_at": "Created At",
                    "updated_at": "Updated At",
                    "deleted_at": "Deleted At",
                    "choose_photo": "Choose Photo",
                    "Email_is_required": "Email is required",
                    "Email_must_be_a_valid_email_address": "Email must be a valid email address",
                    "last_name_is_required": "last name is required",
                    "first_name_is_required": "first name is required",
                    "Password_is_required": "Password is required",
                    "btn_modal_close": "Close",
                    "btn_modal_save": "Save changes",
                    "TitleForm_add_Users": "Add Users",
                    "TitleForm_edit_Users": "Edit Users",
                    "TitleForm_remove_Users": "Remove Users",
                    "role_Admin": 'Admin',
                    "role_limited": "Limited"
                },
                Language: {
                    "card1_title": "Language",
                    "error_1001": "Language exists",
                    "lang_added_successfully": "Language added successfully",
                    "lang_updated_successfully": "Language updated successfully",
                    "lang_deleted_successfully": "Language deleted successfully",
                    "langCode": "Language Code",
                    "direction": "Direction",
                    "active": "Active",
                    "TitleForm_add_Language": "add Language",
                    "TitleForm_delete_Language": "Delete Language ",
                    "The_language_has_been_activated": "The language has been activated ",
                    "The_language_has_been_deactivated": "The language has been deactivated "
                },
                language_classifier: {
                    "card1_title": "language classifier ",
                    "langName": "Name",
                    "name_exists": "Name Exists",
                    "error_1001": "Language exists",
                    "lang_added_successfully": "Language Classifie added successfully",
                    "lang_updated_successfully": "Language Classifie updated successfully",
                    "lang_deleted_successfully": "Language Classifie deleted successfully",
                    "langClangName": "Language Name",
                    "TitleForm_add_Language": "add Language Classifie",
                    "TitleForm_delete_Language": "Delete Language Classifie",
                },
                email_models: {
                    "title": "Email Model ",
                    "card1_title": "Email Model ",
                    "active": "Active",
                    "nameModel": "Name Model",
                    "name_exists": "Name Exists",
                    "error_1001": "Language exists",
                    "lang_added_successfully": "Language Classifie added successfully",
                    "lang_updated_successfully": "Language Classifie updated successfully",
                    "lang_deleted_successfully": "Language Classifie deleted successfully",
                    "langClangName": "Language Name",
                    "TitleForm_add_Language": "add Language Classifie",
                    "TitleForm_delete_Language": "Delete Language Classifie",
                },
                content_email_models: {
                    "card1_title": "Content Email Model ",
                    "nameModel": "Name Model",
                    "name_exists": "Name Exists",
                    "error_1001": "Language exists",
                    "lang_added_successfully": "Language Classifie added successfully",
                    "lang_updated_successfully": "Language Classifie updated successfully",
                    "lang_deleted_successfully": "Language Classifie deleted successfully",
                    "langClangName": "Language Name",
                    "TitleForm_add_Language": "add Language Classifie",
                    "TitleForm_delete_Language": "Delete Language Classifie",
                }
            } });
    }
};
TransService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
        providedIn: 'root'
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
], TransService);



/***/ }),

/***/ "./src/app/layouts/footer/footer.component.scss":
/*!******************************************************!*\
  !*** ./src/app/layouts/footer/footer.component.scss ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2xheW91dHMvZm9vdGVyL2Zvb3Rlci5jb21wb25lbnQuc2NzcyJ9 */");

/***/ }),

/***/ "./src/app/layouts/footer/footer.component.ts":
/*!****************************************************!*\
  !*** ./src/app/layouts/footer/footer.component.ts ***!
  \****************************************************/
/*! exports provided: FooterComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FooterComponent", function() { return FooterComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");


let FooterComponent = class FooterComponent {
    constructor() { }
    ngOnInit() {
    }
};
FooterComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-footer',
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./footer.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/layouts/footer/footer.component.html")).default,
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./footer.component.scss */ "./src/app/layouts/footer/footer.component.scss")).default]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
], FooterComponent);



/***/ }),

/***/ "./src/app/layouts/layout.component.scss":
/*!***********************************************!*\
  !*** ./src/app/layouts/layout.component.scss ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2xheW91dHMvbGF5b3V0LmNvbXBvbmVudC5zY3NzIn0= */");

/***/ }),

/***/ "./src/app/layouts/layout.component.ts":
/*!*********************************************!*\
  !*** ./src/app/layouts/layout.component.ts ***!
  \*********************************************/
/*! exports provided: LayoutComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LayoutComponent", function() { return LayoutComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");


let LayoutComponent = class LayoutComponent {
    constructor() {
        this.isCondensed = false;
    }
    ngOnInit() {
    }
    isMobile() {
        const ua = navigator.userAgent;
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i.test(ua);
    }
    ngAfterViewInit() {
        document.body.classList.remove('authentication-bg');
        document.body.classList.remove('authentication-bg-pattern');
        if (!this.isMobile()) {
            document.body.classList.add('sidebar-enable');
        }
    }
    /**
     * on settings button clicked from topbar
     */
    onSettingsButtonClicked() {
        document.body.classList.toggle('right-bar-enabled');
    }
    /**
     * On mobile toggle button clicked
     */
    onToggleMobileMenu() {
        document.body.classList.toggle('sidebar-enable');
        if (!this.isMobile()) {
            document.body.classList.toggle('enlarged');
            this.isCondensed = !this.isCondensed;
        }
    }
};
LayoutComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-layout',
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./layout.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/layouts/layout.component.html")).default,
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./layout.component.scss */ "./src/app/layouts/layout.component.scss")).default]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
], LayoutComponent);



/***/ }),

/***/ "./src/app/layouts/layouts.module.ts":
/*!*******************************************!*\
  !*** ./src/app/layouts/layouts.module.ts ***!
  \*******************************************/
/*! exports provided: LayoutsModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LayoutsModule", function() { return LayoutsModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ "./node_modules/@ng-bootstrap/ng-bootstrap/fesm2015/ng-bootstrap.js");
/* harmony import */ var ng_click_outside__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ng-click-outside */ "./node_modules/ng-click-outside/lib/index.js");
/* harmony import */ var ng_click_outside__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(ng_click_outside__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _shared_ui_ui_module__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../shared/ui/ui.module */ "./src/app/shared/ui/ui.module.ts");
/* harmony import */ var _layout_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./layout.component */ "./src/app/layouts/layout.component.ts");
/* harmony import */ var _sidebar_sidebar_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./sidebar/sidebar.component */ "./src/app/layouts/sidebar/sidebar.component.ts");
/* harmony import */ var _topbar_topbar_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./topbar/topbar.component */ "./src/app/layouts/topbar/topbar.component.ts");
/* harmony import */ var _footer_footer_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./footer/footer.component */ "./src/app/layouts/footer/footer.component.ts");
/* harmony import */ var _rightsidebar_rightsidebar_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./rightsidebar/rightsidebar.component */ "./src/app/layouts/rightsidebar/rightsidebar.component.ts");












let LayoutsModule = class LayoutsModule {
};
LayoutsModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        declarations: [_layout_component__WEBPACK_IMPORTED_MODULE_7__["LayoutComponent"], _sidebar_sidebar_component__WEBPACK_IMPORTED_MODULE_8__["SidebarComponent"], _topbar_topbar_component__WEBPACK_IMPORTED_MODULE_9__["TopbarComponent"], _footer_footer_component__WEBPACK_IMPORTED_MODULE_10__["FooterComponent"], _rightsidebar_rightsidebar_component__WEBPACK_IMPORTED_MODULE_11__["RightsidebarComponent"]],
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _angular_router__WEBPACK_IMPORTED_MODULE_3__["RouterModule"],
            _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_4__["NgbDropdownModule"],
            ng_click_outside__WEBPACK_IMPORTED_MODULE_5__["ClickOutsideModule"],
            _shared_ui_ui_module__WEBPACK_IMPORTED_MODULE_6__["UIModule"]
        ]
    })
], LayoutsModule);



/***/ }),

/***/ "./src/app/layouts/rightsidebar/data.ts":
/*!**********************************************!*\
  !*** ./src/app/layouts/rightsidebar/data.ts ***!
  \**********************************************/
/*! exports provided: inboxData */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "inboxData", function() { return inboxData; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");

const inboxData = [
    {
        image: 'assets/images/users/user-2.jpg',
        name: 'Tomaslau',
        message: 'I\'ve finished it! See you so...'
    },
    {
        image: 'assets/images/users/user-3.jpg',
        name: 'Stillnotdavid',
        message: 'This theme is awesome!'
    },
    {
        image: 'assets/images/users/user-4.jpg',
        name: 'Kurafire',
        message: 'Nice to meet you'
    },
    {
        image: 'assets/images/users/user-5.jpg',
        name: 'Shahedk',
        message: 'Hey! there I\'m available...'
    },
    {
        image: 'assets/images/users/user-6.jpg',
        name: 'Adhamdannaway',
        message: 'This theme is awesome!'
    },
    {
        image: 'assets/images/users/user-8.jpg',
        name: 'Arashasghari',
        message: 'Hey! there I\'m available...'
    },
    {
        image: 'assets/images/users/user-9.jpg',
        name: 'Joshaustin',
        message: 'I\'ve finished it! See you so...'
    }
];



/***/ }),

/***/ "./src/app/layouts/rightsidebar/rightsidebar.component.scss":
/*!******************************************************************!*\
  !*** ./src/app/layouts/rightsidebar/rightsidebar.component.scss ***!
  \******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2xheW91dHMvcmlnaHRzaWRlYmFyL3JpZ2h0c2lkZWJhci5jb21wb25lbnQuc2NzcyJ9 */");

/***/ }),

/***/ "./src/app/layouts/rightsidebar/rightsidebar.component.ts":
/*!****************************************************************!*\
  !*** ./src/app/layouts/rightsidebar/rightsidebar.component.ts ***!
  \****************************************************************/
/*! exports provided: RightsidebarComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RightsidebarComponent", function() { return RightsidebarComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _data__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./data */ "./src/app/layouts/rightsidebar/data.ts");



let RightsidebarComponent = class RightsidebarComponent {
    constructor() { }
    ngOnInit() {
        // Right sidebar inbox data
        this.inboxData = _data__WEBPACK_IMPORTED_MODULE_2__["inboxData"];
    }
    /**
     * Hide the sidebar
     */
    hide() {
        document.body.classList.remove('right-bar-enabled');
    }
};
RightsidebarComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-rightsidebar',
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./rightsidebar.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/layouts/rightsidebar/rightsidebar.component.html")).default,
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./rightsidebar.component.scss */ "./src/app/layouts/rightsidebar/rightsidebar.component.scss")).default]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
], RightsidebarComponent);



/***/ }),

/***/ "./src/app/layouts/sidebar/sidebar.component.scss":
/*!********************************************************!*\
  !*** ./src/app/layouts/sidebar/sidebar.component.scss ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2xheW91dHMvc2lkZWJhci9zaWRlYmFyLmNvbXBvbmVudC5zY3NzIn0= */");

/***/ }),

/***/ "./src/app/layouts/sidebar/sidebar.component.ts":
/*!******************************************************!*\
  !*** ./src/app/layouts/sidebar/sidebar.component.ts ***!
  \******************************************************/
/*! exports provided: SidebarComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SidebarComponent", function() { return SidebarComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var metismenujs_dist_metismenujs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! metismenujs/dist/metismenujs */ "./node_modules/metismenujs/dist/metismenujs.js");
/* harmony import */ var metismenujs_dist_metismenujs__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(metismenujs_dist_metismenujs__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var src_app_core_services_permissions_permissions_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/core/services/permissions/permissions.service */ "./src/app/core/services/permissions/permissions.service.ts");
/* harmony import */ var src_app_core_services_auth_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/core/services/auth.service */ "./src/app/core/services/auth.service.ts");





let SidebarComponent = class SidebarComponent {
    constructor(permissionsService, auth) {
        this.permissionsService = permissionsService;
        this.auth = auth;
        this.isCondensed = false;
        this.permission = [];
        this.isAdmin = 0;
        this.isAdmin = auth.user.role;
    }
    ngOnInit() {
        this.permissionsService.get(1, this.auth.user.id).subscribe(res => {
            this.permission = res;
            this.menu.dispose();
            setTimeout(() => {
                if (!this.isCondensed && this.sideMenu || this.isCondensed) {
                    setTimeout(() => {
                        this.menu = new metismenujs_dist_metismenujs__WEBPACK_IMPORTED_MODULE_2___default.a(this.sideMenu.nativeElement);
                    });
                }
                else if (this.menu) {
                    this.menu.dispose();
                }
            });
        });
    }
    ngAfterViewInit() {
        this.LoadMenu();
    }
    LoadMenu() {
        this.menu = new metismenujs_dist_metismenujs__WEBPACK_IMPORTED_MODULE_2___default.a(this.sideMenu.nativeElement);
        this._activateMenuDropdown();
    }
    ngOnChanges() {
        if (!this.isCondensed && this.sideMenu || this.isCondensed) {
            setTimeout(() => {
                this.menu = new metismenujs_dist_metismenujs__WEBPACK_IMPORTED_MODULE_2___default.a(this.sideMenu.nativeElement);
            });
        }
        else if (this.menu) {
            this.menu.dispose();
        }
    }
    /**
     * small sidebar
     */
    smallSidebar() {
        document.body.classList.add('left-side-menu-sm');
        document.body.classList.remove('left-side-menu-dark');
        document.body.classList.remove('topbar-light');
        document.body.classList.remove('boxed-layout');
        document.body.classList.remove('enlarged');
    }
    /**
     * Dark sidebar
     */
    darkSidebar() {
        document.body.classList.remove('left-side-menu-sm');
        document.body.classList.add('left-side-menu-dark');
        document.body.classList.remove('topbar-light');
        document.body.classList.remove('boxed-layout');
    }
    /**
     * Light Topbar
     */
    lightTopbar() {
        document.body.classList.add('topbar-light');
        document.body.classList.remove('left-side-menu-dark');
        document.body.classList.remove('left-side-menu-sm');
        document.body.classList.remove('boxed-layout');
    }
    /**
     * Sidebar collapsed
     */
    sidebarCollapsed() {
        document.body.classList.remove('left-side-menu-dark');
        document.body.classList.remove('left-side-menu-sm');
        document.body.classList.toggle('enlarged');
        document.body.classList.remove('boxed-layout');
        document.body.classList.remove('topbar-light');
    }
    /**
     * Boxed Layout
     */
    boxedLayout() {
        document.body.classList.add('boxed-layout');
        document.body.classList.remove('left-side-menu-dark');
        document.body.classList.add('enlarged');
        document.body.classList.remove('left-side-menu-sm');
    }
    checkPerm(Section, key) {
        if (this.permission.length != 0) {
            let sec = null;
            if (Section == key) {
                sec = this.permission.filter(x => x.section == Section);
                if (sec) {
                    sec.forEach(e => {
                        if (e.view) {
                            return true;
                        }
                    });
                }
            }
            else {
                sec = this.permission.find(x => x.section == Section && x.key == key);
                if (sec) {
                    if (sec.view) {
                        return true;
                    }
                }
            }
        }
        else {
            return true;
        }
    }
    /**
     * Activates the menu dropdown
     */
    _activateMenuDropdown() {
        const links = document.getElementsByClassName('side-nav-link-ref');
        let menuItemEl = null;
        // tslint:disable-next-line: prefer-for-of
        for (let i = 0; i < links.length; i++) {
            // tslint:disable-next-line: no-string-literal
            if (window.location.pathname === links[i]['pathname']) {
                menuItemEl = links[i];
                break;
            }
        }
        if (menuItemEl) {
            menuItemEl.classList.add('active');
            const parentEl = menuItemEl.parentElement;
            if (parentEl) {
                parentEl.classList.add('active');
                const parent2El = parentEl.parentElement;
                if (parent2El) {
                    parent2El.classList.add('in');
                }
                const parent3El = parent2El.parentElement;
                if (parent3El) {
                    parent3El.classList.add('active');
                    parent3El.firstChild.classList.add('active');
                }
            }
        }
    }
};
SidebarComponent.ctorParameters = () => [
    { type: src_app_core_services_permissions_permissions_service__WEBPACK_IMPORTED_MODULE_3__["PermissionsService"] },
    { type: src_app_core_services_auth_service__WEBPACK_IMPORTED_MODULE_4__["AuthenticationService"] }
];
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
], SidebarComponent.prototype, "isCondensed", void 0);
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])('sideMenu', { static: false }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"])
], SidebarComponent.prototype, "sideMenu", void 0);
SidebarComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-sidebar',
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./sidebar.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/layouts/sidebar/sidebar.component.html")).default,
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./sidebar.component.scss */ "./src/app/layouts/sidebar/sidebar.component.scss")).default]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [src_app_core_services_permissions_permissions_service__WEBPACK_IMPORTED_MODULE_3__["PermissionsService"],
        src_app_core_services_auth_service__WEBPACK_IMPORTED_MODULE_4__["AuthenticationService"]])
], SidebarComponent);



/***/ }),

/***/ "./src/app/layouts/topbar/topbar.component.scss":
/*!******************************************************!*\
  !*** ./src/app/layouts/topbar/topbar.component.scss ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2xheW91dHMvdG9wYmFyL3RvcGJhci5jb21wb25lbnQuc2NzcyJ9 */");

/***/ }),

/***/ "./src/app/layouts/topbar/topbar.component.ts":
/*!****************************************************!*\
  !*** ./src/app/layouts/topbar/topbar.component.ts ***!
  \****************************************************/
/*! exports provided: TopbarComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TopbarComponent", function() { return TopbarComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _core_services_auth_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../core/services/auth.service */ "./src/app/core/services/auth.service.ts");
/* harmony import */ var src_environments_environment_prod__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/environments/environment.prod */ "./src/environments/environment.prod.ts");
/* harmony import */ var _core_services_notices_notices_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../core/services/notices/notices.service */ "./src/app/core/services/notices/notices.service.ts");
/* harmony import */ var _core_services_socket_socket_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../core/services/socket/socket.service */ "./src/app/core/services/socket/socket.service.ts");
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ngx-toastr */ "./node_modules/ngx-toastr/fesm2015/ngx-toastr.js");
/* harmony import */ var src_app_core_services_encrypt_encrypt_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/core/services/encrypt/encrypt.service */ "./src/app/core/services/encrypt/encrypt.service.ts");









let TopbarComponent = class TopbarComponent {
    constructor(router, authService, encryptService, noti, socke, tostr) {
        this.router = router;
        this.authService = authService;
        this.encryptService = encryptService;
        this.noti = noti;
        this.socke = socke;
        this.tostr = tostr;
        this.notices = 0;
        this.settingsButtonClicked = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.mobileMenuButtonClicked = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.audioNut = new Audio("assets/971.mp3");
        this.imageUser = src_environments_environment_prod__WEBPACK_IMPORTED_MODULE_4__["environment"].url + '/' + this.authService.user.imageUser;
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
                    res[i].content = JSON.parse(res[i].content);
                    let url = res[i].content[0].section;
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
    getLink(id) {
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
    getName(name) {
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
    toggleMobileMenu(event) {
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
            bgColor: BgColorValue,
            redirectTo: redirectTo,
            id: id,
        });
    }
    changeView(id) {
        this.noti.changeView(id).subscribe(res => {
            this.getAllNotices();
        });
    }
};
TopbarComponent.ctorParameters = () => [
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"] },
    { type: _core_services_auth_service__WEBPACK_IMPORTED_MODULE_3__["AuthenticationService"] },
    { type: src_app_core_services_encrypt_encrypt_service__WEBPACK_IMPORTED_MODULE_8__["EncryptService"] },
    { type: _core_services_notices_notices_service__WEBPACK_IMPORTED_MODULE_5__["NoticesService"] },
    { type: _core_services_socket_socket_service__WEBPACK_IMPORTED_MODULE_6__["SocketService"] },
    { type: ngx_toastr__WEBPACK_IMPORTED_MODULE_7__["ToastrService"] }
];
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])(),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
], TopbarComponent.prototype, "settingsButtonClicked", void 0);
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])(),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
], TopbarComponent.prototype, "mobileMenuButtonClicked", void 0);
TopbarComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-topbar',
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./topbar.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/layouts/topbar/topbar.component.html")).default,
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./topbar.component.scss */ "./src/app/layouts/topbar/topbar.component.scss")).default]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"], _core_services_auth_service__WEBPACK_IMPORTED_MODULE_3__["AuthenticationService"],
        src_app_core_services_encrypt_encrypt_service__WEBPACK_IMPORTED_MODULE_8__["EncryptService"],
        _core_services_notices_notices_service__WEBPACK_IMPORTED_MODULE_5__["NoticesService"], _core_services_socket_socket_service__WEBPACK_IMPORTED_MODULE_6__["SocketService"], ngx_toastr__WEBPACK_IMPORTED_MODULE_7__["ToastrService"]])
], TopbarComponent);



/***/ }),

/***/ "./src/app/shared/common/bills-balance/bills-balance.component.scss":
/*!**************************************************************************!*\
  !*** ./src/app/shared/common/bills-balance/bills-balance.component.scss ***!
  \**************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3NoYXJlZC9jb21tb24vYmlsbHMtYmFsYW5jZS9iaWxscy1iYWxhbmNlLmNvbXBvbmVudC5zY3NzIn0= */");

/***/ }),

/***/ "./src/app/shared/common/bills-balance/bills-balance.component.ts":
/*!************************************************************************!*\
  !*** ./src/app/shared/common/bills-balance/bills-balance.component.ts ***!
  \************************************************************************/
/*! exports provided: BillsBalanceComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BillsBalanceComponent", function() { return BillsBalanceComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");


let BillsBalanceComponent = class BillsBalanceComponent {
    constructor() { }
    ngOnInit() {
    }
};
BillsBalanceComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-bills-balance',
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./bills-balance.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/shared/common/bills-balance/bills-balance.component.html")).default,
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./bills-balance.component.scss */ "./src/app/shared/common/bills-balance/bills-balance.component.scss")).default]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
], BillsBalanceComponent);



/***/ }),

/***/ "./src/app/shared/common/cases-doctor/cases-doctor.component.scss":
/*!************************************************************************!*\
  !*** ./src/app/shared/common/cases-doctor/cases-doctor.component.scss ***!
  \************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3NoYXJlZC9jb21tb24vY2FzZXMtZG9jdG9yL2Nhc2VzLWRvY3Rvci5jb21wb25lbnQuc2NzcyJ9 */");

/***/ }),

/***/ "./src/app/shared/common/cases-doctor/cases-doctor.component.ts":
/*!**********************************************************************!*\
  !*** ./src/app/shared/common/cases-doctor/cases-doctor.component.ts ***!
  \**********************************************************************/
/*! exports provided: CasesDoctorComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CasesDoctorComponent", function() { return CasesDoctorComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ "./node_modules/@ng-bootstrap/ng-bootstrap/fesm2015/ng-bootstrap.js");
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ngx-toastr */ "./node_modules/ngx-toastr/fesm2015/ngx-toastr.js");
/* harmony import */ var src_app_core_services_translation_trans_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/core/services/translation/trans.service */ "./src/app/core/services/translation/trans.service.ts");
/* harmony import */ var src_app_core_services_country_country_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/core/services/country/country.service */ "./src/app/core/services/country/country.service.ts");
/* harmony import */ var src_app_core_services_city_city_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/core/services/city/city.service */ "./src/app/core/services/city/city.service.ts");
/* harmony import */ var src_environments_environment_prod__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/environments/environment.prod */ "./src/environments/environment.prod.ts");
/* harmony import */ var _core_services_patient_patient_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../core/services/patient/patient.service */ "./src/app/core/services/patient/patient.service.ts");
/* harmony import */ var src_app_core_services_encrypt_encrypt_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! src/app/core/services/encrypt/encrypt.service */ "./src/app/core/services/encrypt/encrypt.service.ts");











let CasesDoctorComponent = class CasesDoctorComponent {
    constructor(transs, formBuilder, modalService, toastr, CountryService, CityService, patientService, encryptService) {
        this.transs = transs;
        this.formBuilder = formBuilder;
        this.modalService = modalService;
        this.toastr = toastr;
        this.CountryService = CountryService;
        this.CityService = CityService;
        this.patientService = patientService;
        this.encryptService = encryptService;
        this.URLStatic = "";
        this.submitted = false;
        this.errors = '';
        this.loading = false;
        this.titleForm = "Add Patient";
        this.typeForm = 0;
        this.doctorId = -1;
        this.URLStatic = src_environments_environment_prod__WEBPACK_IMPORTED_MODULE_8__["environment"].url + '/';
    }
    get fn() { return this.formPatient.controls; }
    ngOnInit() {
        this.Trans = this.transs.trans.subscribe(res => {
            this.trans = res.key;
            this.breadCrumbItems = [{ label: 'Patient', path: '/' }, { label: "Patient", path: '/', active: true }];
        });
        this.url = src_environments_environment_prod__WEBPACK_IMPORTED_MODULE_8__["environment"].url;
        this.formPatient = this.formBuilder.group({
            namePatient: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required],
            countryId: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required],
            email: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required],
            cityId: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required],
            address: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required],
            phoneNumber: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required]
        });
        this.formPatient.addControl('id', new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](""));
        this.formPatient.addControl('doctorId', new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](src_environments_environment_prod__WEBPACK_IMPORTED_MODULE_8__["environment"].id));
        this.formPatient.addControl('dentalCenterId', new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](-1));
        this.getAll();
        this.getCountry();
    }
    getLink(id) {
        return "/status/" + this.encryptService.Encrypt(id);
    }
    getAll() {
        if (this.USERTYPE == 1) {
            this.patientService.getAllByDentelCenterId(this.ID).subscribe(res => {
                this.patient = res;
            });
        }
        else {
            this.patientService.getAllByDoctorId(this.ID).subscribe(res => {
                this.patient = res;
            });
        }
    }
    getCountry() {
        this.CountryService.getAllAndName().subscribe(res => {
            this.Country = res;
        });
    }
    onChangeCountry() {
        this.CityService.getAllAndNameById(this.formPatient.get('countryId').value).subscribe(res => {
            this.city = res;
        });
    }
    ngOnDestroy() {
        this.Trans.unsubscribe();
    }
    putValueController(id) {
        this.formPatient.get('id').setValue(this.patient.find(x => x.id == id).id);
        this.formPatient.get('namePatient').setValue(this.patient.find(x => x.id == id).namePatient);
        this.formPatient.get('countryId').setValue(this.patient.find(x => x.id == id).countryId);
        this.formPatient.get('cityId').setValue(this.patient.find(x => x.id == id).cityId);
        this.formPatient.get('address').setValue(this.patient.find(x => x.id == id).address);
        this.formPatient.get('phoneNumber').setValue(this.patient.find(x => x.id == id).phoneNumber);
        this.formPatient.get('email').setValue(this.patient.find(x => x.id == id).email);
        this.onChangeCountry();
        this.loading = false;
    }
    add(content) {
        this.formPatient.reset();
        this.formPatient.enable({ onlySelf: true });
        this.typeForm = 0;
        this.modalService.open(content, { backdrop: 'static', size: 'lg' });
    }
    submit(param) {
        if (this.typeForm == 0) {
            return this.patientService.create(param);
        }
        else if (this.typeForm == 1) {
            return this.patientService.update(param);
        }
        else if (this.typeForm == 2) {
        }
    }
    onSubmit() {
        this.submitted = true;
        if (this.formPatient.invalid) {
            return;
        }
        this.loading = true;
        this.formPatient.get('doctorId').setValue(src_environments_environment_prod__WEBPACK_IMPORTED_MODULE_8__["environment"].id);
        this.formPatient.get('dentalCenterId').setValue(-1);
        this.submit(this.formPatient.value).subscribe(res => {
            if (res.message == 2000) //2000 it means this number is added successfully
             {
                this.toastr.success("Patient Added Successfully", "successfull", {
                    timeOut: 3000
                });
            }
            else if (res.message == 2001) //2001 it means this number is updated successfully
             {
                this.toastr.success("Patient Updated Successfully", "successfull", {
                    timeOut: 3000
                });
            }
            else if (res.message == 2002) //2001 it means this number is deleted successfully
             {
                this.toastr.success("Patient Deleted Successfully", "successfull", {
                    timeOut: 3000
                });
            }
            this.loading = false;
            this.getAll();
            this.submitted = false;
            this.formPatient.reset();
            this.modalService.dismissAll();
        }, (err) => {
            if (err.message == 1001) {
                this.toastr.error(this.trans.users.error_1001, "error", {
                    timeOut: 3000
                });
                this.submitted = false;
            }
            else if (err.message == 55555) {
                this.submitted = false;
                this.toastr.error(this.trans.public.error_55555, "error", {
                    timeOut: 3000
                });
                //this.s_Error.sendErorr(err.message,err.error);
            }
            this.loading = false;
            this.submitted = false;
        });
    }
    edit(content, id) {
        this.loading = true;
        this.typeForm = 1;
        this.formPatient.reset();
        this.modalService.open(content, { backdrop: 'static', size: 'lg' });
        this.formPatient.enable({ onlySelf: true });
        this.putValueController(id);
    }
    delete(content, id) {
        this.loading = true;
        this.typeForm = 2;
        this.formPatient.reset();
        this.modalService.open(content, { backdrop: 'static', size: 'lg' });
        this.putValueController(id);
        this.formPatient.disable({ onlySelf: true });
    }
};
CasesDoctorComponent.ctorParameters = () => [
    { type: src_app_core_services_translation_trans_service__WEBPACK_IMPORTED_MODULE_5__["TransService"] },
    { type: _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"] },
    { type: _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_3__["NgbModal"] },
    { type: ngx_toastr__WEBPACK_IMPORTED_MODULE_4__["ToastrService"] },
    { type: src_app_core_services_country_country_service__WEBPACK_IMPORTED_MODULE_6__["CountryService"] },
    { type: src_app_core_services_city_city_service__WEBPACK_IMPORTED_MODULE_7__["CityService"] },
    { type: _core_services_patient_patient_service__WEBPACK_IMPORTED_MODULE_9__["PatientService"] },
    { type: src_app_core_services_encrypt_encrypt_service__WEBPACK_IMPORTED_MODULE_10__["EncryptService"] }
];
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])('ID'),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Number)
], CasesDoctorComponent.prototype, "ID", void 0);
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])('USERTYPE'),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Number)
], CasesDoctorComponent.prototype, "USERTYPE", void 0);
CasesDoctorComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-cases-doctor',
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./cases-doctor.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/shared/common/cases-doctor/cases-doctor.component.html")).default,
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./cases-doctor.component.scss */ "./src/app/shared/common/cases-doctor/cases-doctor.component.scss")).default]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [src_app_core_services_translation_trans_service__WEBPACK_IMPORTED_MODULE_5__["TransService"],
        _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"],
        _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_3__["NgbModal"],
        ngx_toastr__WEBPACK_IMPORTED_MODULE_4__["ToastrService"],
        src_app_core_services_country_country_service__WEBPACK_IMPORTED_MODULE_6__["CountryService"],
        src_app_core_services_city_city_service__WEBPACK_IMPORTED_MODULE_7__["CityService"],
        _core_services_patient_patient_service__WEBPACK_IMPORTED_MODULE_9__["PatientService"],
        src_app_core_services_encrypt_encrypt_service__WEBPACK_IMPORTED_MODULE_10__["EncryptService"]])
], CasesDoctorComponent);



/***/ }),

/***/ "./src/app/shared/common/codeeditor/codeeditor.component.scss":
/*!********************************************************************!*\
  !*** ./src/app/shared/common/codeeditor/codeeditor.component.scss ***!
  \********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3NoYXJlZC9jb21tb24vY29kZWVkaXRvci9jb2RlZWRpdG9yLmNvbXBvbmVudC5zY3NzIn0= */");

/***/ }),

/***/ "./src/app/shared/common/codeeditor/codeeditor.component.ts":
/*!******************************************************************!*\
  !*** ./src/app/shared/common/codeeditor/codeeditor.component.ts ***!
  \******************************************************************/
/*! exports provided: CodeeditorComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CodeeditorComponent", function() { return CodeeditorComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var monaco_editor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! monaco-editor */ "./node_modules/monaco-editor/esm/vs/editor/editor.main.js");



let CodeeditorComponent = class CodeeditorComponent {
    constructor() {
        this.codeChanged = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.initialCode = '';
        this.typeCode = '';
    }
    ngOnInit() {
    }
    ngAfterViewInit() {
        this.editor = monaco_editor__WEBPACK_IMPORTED_MODULE_2__["editor"].create(this.editorContainer.nativeElement, {
            value: this.initialCode,
            language: this.typeCode,
            theme: 'vs-dark'
        });
        this.editor.onDidChangeModelContent(() => {
            const value = this.editor.getValue();
            this.codeChanged.emit(value);
        });
    }
};
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])('editorContainer', { static: true }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"])
], CodeeditorComponent.prototype, "editorContainer", void 0);
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])(),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
], CodeeditorComponent.prototype, "codeChanged", void 0);
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", String)
], CodeeditorComponent.prototype, "initialCode", void 0);
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", String)
], CodeeditorComponent.prototype, "typeCode", void 0);
CodeeditorComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-codeeditor',
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./codeeditor.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/shared/common/codeeditor/codeeditor.component.html")).default,
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./codeeditor.component.scss */ "./src/app/shared/common/codeeditor/codeeditor.component.scss")).default]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
], CodeeditorComponent);



/***/ }),

/***/ "./src/app/shared/common/common.module.ts":
/*!************************************************!*\
  !*** ./src/app/shared/common/common.module.ts ***!
  \************************************************/
/*! exports provided: CommonsModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CommonsModule", function() { return CommonsModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var _shipping_address_shipping_address_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./shipping-address/shipping-address.component */ "./src/app/shared/common/shipping-address/shipping-address.component.ts");
/* harmony import */ var _payment_address_payment_address_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./payment-address/payment-address.component */ "./src/app/shared/common/payment-address/payment-address.component.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");
/* harmony import */ var _ui_ui_module__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../ui/ui.module */ "./src/app/shared/ui/ui.module.ts");
/* harmony import */ var ngx_flag_icon_css__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ngx-flag-icon-css */ "./node_modules/ngx-flag-icon-css/fesm2015/ngx-flag-icon-css.js");
/* harmony import */ var _ng_select_ng_select__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @ng-select/ng-select */ "./node_modules/@ng-select/ng-select/fesm2015/ng-select-ng-select.js");
/* harmony import */ var _responsible_responsible_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./responsible/responsible.component */ "./src/app/shared/common/responsible/responsible.component.ts");
/* harmony import */ var _pricing_strategy_pricing_strategy_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./pricing-strategy/pricing-strategy.component */ "./src/app/shared/common/pricing-strategy/pricing-strategy.component.ts");
/* harmony import */ var ngx_image_cropper__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ngx-image-cropper */ "./node_modules/ngx-image-cropper/fesm2015/ngx-image-cropper.js");
/* harmony import */ var angular2_text_mask__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! angular2-text-mask */ "./node_modules/angular2-text-mask/dist/angular2TextMask.js");
/* harmony import */ var angular2_text_mask__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(angular2_text_mask__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ "./node_modules/@ng-bootstrap/ng-bootstrap/fesm2015/ng-bootstrap.js");
/* harmony import */ var _bills_balance_bills_balance_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./bills-balance/bills-balance.component */ "./src/app/shared/common/bills-balance/bills-balance.component.ts");
/* harmony import */ var _cases_doctor_cases_doctor_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./cases-doctor/cases-doctor.component */ "./src/app/shared/common/cases-doctor/cases-doctor.component.ts");
/* harmony import */ var _list_doctors_list_doctors_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./list-doctors/list-doctors.component */ "./src/app/shared/common/list-doctors/list-doctors.component.ts");
/* harmony import */ var _listbalace_listbalace_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./listbalace/listbalace.component */ "./src/app/shared/common/listbalace/listbalace.component.ts");
/* harmony import */ var ng2_search_filter__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ng2-search-filter */ "./node_modules/ng2-search-filter/ng2-search-filter.js");
/* harmony import */ var _permissions_permissions_component__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./permissions/permissions.component */ "./src/app/shared/common/permissions/permissions.component.ts");
/* harmony import */ var _list_dental_center_list_dental_center_component__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./list-dental-center/list-dental-center.component */ "./src/app/shared/common/list-dental-center/list-dental-center.component.ts");
/* harmony import */ var _keditor_keditor_component__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./keditor/keditor.component */ "./src/app/shared/common/keditor/keditor.component.ts");
/* harmony import */ var _video_trement_video_trement_component__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./video-trement/video-trement.component */ "./src/app/shared/common/video-trement/video-trement.component.ts");
/* harmony import */ var _upload_files_upload_files_component__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./upload-files/upload-files.component */ "./src/app/shared/common/upload-files/upload-files.component.ts");
/* harmony import */ var _codeeditor_codeeditor_component__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./codeeditor/codeeditor.component */ "./src/app/shared/common/codeeditor/codeeditor.component.ts");

























let CommonsModule = class CommonsModule {
};
CommonsModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        declarations: [_shipping_address_shipping_address_component__WEBPACK_IMPORTED_MODULE_3__["ShippingAddressComponent"], _keditor_keditor_component__WEBPACK_IMPORTED_MODULE_21__["KeditorComponent"], _payment_address_payment_address_component__WEBPACK_IMPORTED_MODULE_4__["PaymentAddressComponent"], _responsible_responsible_component__WEBPACK_IMPORTED_MODULE_9__["ResponsibleComponent"], _pricing_strategy_pricing_strategy_component__WEBPACK_IMPORTED_MODULE_10__["PricingStrategyComponent"], _bills_balance_bills_balance_component__WEBPACK_IMPORTED_MODULE_14__["BillsBalanceComponent"], _cases_doctor_cases_doctor_component__WEBPACK_IMPORTED_MODULE_15__["CasesDoctorComponent"], _list_doctors_list_doctors_component__WEBPACK_IMPORTED_MODULE_16__["ListDoctorsComponent"], _listbalace_listbalace_component__WEBPACK_IMPORTED_MODULE_17__["ListbalaceComponent"], _permissions_permissions_component__WEBPACK_IMPORTED_MODULE_19__["PermissionsComponent"], _list_dental_center_list_dental_center_component__WEBPACK_IMPORTED_MODULE_20__["ListDentalCenterComponent"], _video_trement_video_trement_component__WEBPACK_IMPORTED_MODULE_22__["VideoTrementComponent"], _upload_files_upload_files_component__WEBPACK_IMPORTED_MODULE_23__["UploadFilesComponent"], _codeeditor_codeeditor_component__WEBPACK_IMPORTED_MODULE_24__["CodeeditorComponent"]],
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormsModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_5__["ReactiveFormsModule"],
            _ui_ui_module__WEBPACK_IMPORTED_MODULE_6__["UIModule"],
            _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_13__["NgbDropdownModule"],
            _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_13__["NgbTabsetModule"],
            _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_13__["NgbAccordionModule"],
            _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_13__["NgbCollapseModule"],
            _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_13__["NgbModalModule"],
            _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_13__["NgbProgressbarModule"],
            _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_13__["NgbAlertModule"],
            _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_13__["NgbToastModule"],
            _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_13__["NgbPopoverModule"],
            _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_13__["NgbTooltipModule"],
            _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_13__["NgbPaginationModule"],
            _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_13__["NgbCarouselModule"],
            ngx_flag_icon_css__WEBPACK_IMPORTED_MODULE_7__["NgxFlagIconCssModule"],
            ng2_search_filter__WEBPACK_IMPORTED_MODULE_18__["Ng2SearchPipeModule"],
            _ng_select_ng_select__WEBPACK_IMPORTED_MODULE_8__["NgSelectModule"],
            angular2_text_mask__WEBPACK_IMPORTED_MODULE_12__["TextMaskModule"],
            ngx_image_cropper__WEBPACK_IMPORTED_MODULE_11__["ImageCropperModule"]
        ],
        exports: [_shipping_address_shipping_address_component__WEBPACK_IMPORTED_MODULE_3__["ShippingAddressComponent"], _keditor_keditor_component__WEBPACK_IMPORTED_MODULE_21__["KeditorComponent"], _payment_address_payment_address_component__WEBPACK_IMPORTED_MODULE_4__["PaymentAddressComponent"], _cases_doctor_cases_doctor_component__WEBPACK_IMPORTED_MODULE_15__["CasesDoctorComponent"], _responsible_responsible_component__WEBPACK_IMPORTED_MODULE_9__["ResponsibleComponent"], _pricing_strategy_pricing_strategy_component__WEBPACK_IMPORTED_MODULE_10__["PricingStrategyComponent"], _list_doctors_list_doctors_component__WEBPACK_IMPORTED_MODULE_16__["ListDoctorsComponent"], _listbalace_listbalace_component__WEBPACK_IMPORTED_MODULE_17__["ListbalaceComponent"], _permissions_permissions_component__WEBPACK_IMPORTED_MODULE_19__["PermissionsComponent"], _list_dental_center_list_dental_center_component__WEBPACK_IMPORTED_MODULE_20__["ListDentalCenterComponent"], _video_trement_video_trement_component__WEBPACK_IMPORTED_MODULE_22__["VideoTrementComponent"], _upload_files_upload_files_component__WEBPACK_IMPORTED_MODULE_23__["UploadFilesComponent"], _codeeditor_codeeditor_component__WEBPACK_IMPORTED_MODULE_24__["CodeeditorComponent"]]
    })
], CommonsModule);



/***/ }),

/***/ "./src/app/shared/common/keditor/keditor.component.scss":
/*!**************************************************************!*\
  !*** ./src/app/shared/common/keditor/keditor.component.scss ***!
  \**************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".refreshLoadd {\n  position: absolute;\n  left: 50%;\n  top: 50%;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9hbWVyZ2hqamV5L0RvY3VtZW50cy9Qcm9qZWN0cy9QYXJpc2FsaW5lT2xkL2FkbWluL3NyYy9hcHAvc2hhcmVkL2NvbW1vbi9rZWRpdG9yL2tlZGl0b3IuY29tcG9uZW50LnNjc3MiLCJzcmMvYXBwL3NoYXJlZC9jb21tb24va2VkaXRvci9rZWRpdG9yLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0ksa0JBQUE7RUFDQSxTQUFBO0VBQ0EsUUFBQTtBQ0NKIiwiZmlsZSI6InNyYy9hcHAvc2hhcmVkL2NvbW1vbi9rZWRpdG9yL2tlZGl0b3IuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIucmVmcmVzaExvYWRke1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICBsZWZ0OiA1MCU7XG4gICAgdG9wOiA1MCU7XG59XG4iLCIucmVmcmVzaExvYWRkIHtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICBsZWZ0OiA1MCU7XG4gIHRvcDogNTAlO1xufSJdfQ== */");

/***/ }),

/***/ "./src/app/shared/common/keditor/keditor.component.ts":
/*!************************************************************!*\
  !*** ./src/app/shared/common/keditor/keditor.component.ts ***!
  \************************************************************/
/*! exports provided: KeditorComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "KeditorComponent", function() { return KeditorComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");


let KeditorComponent = class KeditorComponent {
    constructor() {
        this.isLoading = true;
        this.selectImage = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.changeValue = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.getEditor = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
    }
    ngOnInit() {
        var div = document.createElement('div');
        div.style.width = "100%";
        div.id = this.IDEDIT;
        setTimeout(() => {
            let element = document.querySelectorAll("app-keditor");
            for (var i = 0; i < element.length; i++) {
                if (element[i].id == this.IDEDIT) {
                    element[i].appendChild(div);
                    var eddit = CKEDITOR.replace(div, {
                        language: 'en',
                        toolbar: [
                            { name: 'document', items: ['Source', '-', 'Save', 'ExportPdf', 'Preview', 'Print', '-', 'Templates'] },
                            { name: 'clipboard', items: ['Cut', 'Copy', 'Paste', 'PasteText', 'PasteFromWord', '-', 'Undo', 'Redo'] },
                            { name: 'editing', items: ['Find', 'Replace', '-', 'SelectAll', '-', 'Scayt'] },
                            { name: 'forms', items: ['Form', 'Checkbox', 'Radio', 'TextField', 'Textarea', 'Select', 'Button', 'ImageButton', 'HiddenField'] },
                            '/',
                            { name: 'basicstyles', items: ['Bold', 'Italic', 'Underline', 'Strike', 'Subscript', 'Superscript', '-', 'CopyFormatting', 'RemoveFormat'] },
                            { name: 'paragraph', items: ['NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', '-', 'Blockquote', 'CreateDiv', '-', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock', '-', 'BidiLtr', 'BidiRtl', 'Language'] },
                            { name: 'links', items: ['Link', 'Unlink', 'Anchor'] },
                            { name: 'insert', items: ['Image', 'Flash', 'Table', 'HorizontalRule', 'Smiley', 'SpecialChar', 'PageBreak', 'Iframe'] },
                            '/',
                            { name: 'styles', items: ['Styles', 'Format', 'Font', 'FontSize'] },
                            { name: 'colors', items: ['TextColor', 'BGColor'] },
                            { name: 'tools', items: ['Maximize', 'ShowBlocks', 'imageKiven'] }
                        ],
                        on: {
                            instanceReady: (evt) => {
                                this.isLoading = false;
                            },
                            blur: (evt) => {
                                this.changeValue.emit({ id: this.IDEDIT, value: evt.editor.getData() });
                            },
                        }
                    });
                    eddit.ui.addButton('imageKiven', {
                        icon: 'image',
                        command: 'selectImage'
                    });
                    eddit.addCommand('selectImage', {
                        exec: (editor) => {
                            this.selectImage.emit(editor);
                        }
                    });
                    eddit.setData(this.VALUEEDIT);
                    this.getEditor.emit(eddit);
                }
            }
        }, 1000);
    }
    uploadFile(editor) {
        alert("asdas");
    }
};
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])("IDEDIT"),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", String)
], KeditorComponent.prototype, "IDEDIT", void 0);
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])("VALUEEDIT"),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", String)
], KeditorComponent.prototype, "VALUEEDIT", void 0);
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])(),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"])
], KeditorComponent.prototype, "selectImage", void 0);
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])(),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"])
], KeditorComponent.prototype, "changeValue", void 0);
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])(),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"])
], KeditorComponent.prototype, "getEditor", void 0);
KeditorComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-keditor',
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./keditor.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/shared/common/keditor/keditor.component.html")).default,
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./keditor.component.scss */ "./src/app/shared/common/keditor/keditor.component.scss")).default]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
], KeditorComponent);



/***/ }),

/***/ "./src/app/shared/common/list-dental-center/list-dental-center.component.scss":
/*!************************************************************************************!*\
  !*** ./src/app/shared/common/list-dental-center/list-dental-center.component.scss ***!
  \************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3NoYXJlZC9jb21tb24vbGlzdC1kZW50YWwtY2VudGVyL2xpc3QtZGVudGFsLWNlbnRlci5jb21wb25lbnQuc2NzcyJ9 */");

/***/ }),

/***/ "./src/app/shared/common/list-dental-center/list-dental-center.component.ts":
/*!**********************************************************************************!*\
  !*** ./src/app/shared/common/list-dental-center/list-dental-center.component.ts ***!
  \**********************************************************************************/
/*! exports provided: ListDentalCenterComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ListDentalCenterComponent", function() { return ListDentalCenterComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var src_app_core_services_dentalCenter_dental_center_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/core/services/dentalCenter/dental-center.service */ "./src/app/core/services/dentalCenter/dental-center.service.ts");
/* harmony import */ var src_app_core_services_translation_trans_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/core/services/translation/trans.service */ "./src/app/core/services/translation/trans.service.ts");
/* harmony import */ var src_app_core_services_encrypt_encrypt_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/core/services/encrypt/encrypt.service */ "./src/app/core/services/encrypt/encrypt.service.ts");
/* harmony import */ var src_environments_environment_prod__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/environments/environment.prod */ "./src/environments/environment.prod.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");







let ListDentalCenterComponent = class ListDentalCenterComponent {
    constructor(DC, transs, EncryptService, router) {
        this.DC = DC;
        this.transs = transs;
        this.EncryptService = EncryptService;
        this.router = router;
        this.imageChangedEvent = '';
        this.croppedImage = "";
        this.url = src_environments_environment_prod__WEBPACK_IMPORTED_MODULE_5__["environment"].url;
    }
    ngOnInit() {
        this.Trans = this.transs.trans.subscribe(res => {
            this.trans = res.key;
        });
        this.getAll();
    }
    imageCropped(event) {
        this.croppedImage = event.base64;
    }
    getLink(id, type = null) {
        if (type) {
            this.router.navigate(["/DentalCenter/Profile/" + this.EncryptService.Encrypt(id)]).then((e) => {
                if (e) {
                    console.log("Navigation is successful!");
                }
                else {
                    console.log("Navigation has failed!");
                }
            });
        }
        else {
            this.router.navigate(["/Doctor/Profile/" + this.EncryptService.Encrypt(id)]).then((e) => {
                if (e) {
                }
                else {
                }
            });
        }
    }
    getAll() {
        if (this.USERTYPE == 3) {
            this.DC.getAllBylaboratorysId(this.ID).subscribe(res => {
                this.dentalCenter = res;
            });
        }
        else if (this.USERTYPE == 4) {
            this.DC.getAllByMediatorId(this.ID).subscribe(res => {
                this.dentalCenter = res;
            });
        }
    }
    ngOnDestroy() {
        this.Trans.unsubscribe();
    }
};
ListDentalCenterComponent.ctorParameters = () => [
    { type: src_app_core_services_dentalCenter_dental_center_service__WEBPACK_IMPORTED_MODULE_2__["DentalCenterService"] },
    { type: src_app_core_services_translation_trans_service__WEBPACK_IMPORTED_MODULE_3__["TransService"] },
    { type: src_app_core_services_encrypt_encrypt_service__WEBPACK_IMPORTED_MODULE_4__["EncryptService"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_6__["Router"] }
];
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])('ID'),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Number)
], ListDentalCenterComponent.prototype, "ID", void 0);
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])('USERTYPE'),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Number)
], ListDentalCenterComponent.prototype, "USERTYPE", void 0);
ListDentalCenterComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-list-dental-center',
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./list-dental-center.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/shared/common/list-dental-center/list-dental-center.component.html")).default,
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./list-dental-center.component.scss */ "./src/app/shared/common/list-dental-center/list-dental-center.component.scss")).default]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [src_app_core_services_dentalCenter_dental_center_service__WEBPACK_IMPORTED_MODULE_2__["DentalCenterService"],
        src_app_core_services_translation_trans_service__WEBPACK_IMPORTED_MODULE_3__["TransService"],
        src_app_core_services_encrypt_encrypt_service__WEBPACK_IMPORTED_MODULE_4__["EncryptService"],
        _angular_router__WEBPACK_IMPORTED_MODULE_6__["Router"]])
], ListDentalCenterComponent);



/***/ }),

/***/ "./src/app/shared/common/list-doctors/list-doctors.component.scss":
/*!************************************************************************!*\
  !*** ./src/app/shared/common/list-doctors/list-doctors.component.scss ***!
  \************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3NoYXJlZC9jb21tb24vbGlzdC1kb2N0b3JzL2xpc3QtZG9jdG9ycy5jb21wb25lbnQuc2NzcyJ9 */");

/***/ }),

/***/ "./src/app/shared/common/list-doctors/list-doctors.component.ts":
/*!**********************************************************************!*\
  !*** ./src/app/shared/common/list-doctors/list-doctors.component.ts ***!
  \**********************************************************************/
/*! exports provided: ListDoctorsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ListDoctorsComponent", function() { return ListDoctorsComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var src_app_core_services_dentelCenterClint_dentel_center_clint_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/core/services/dentelCenterClint/dentel-center-clint.service */ "./src/app/core/services/dentelCenterClint/dentel-center-clint.service.ts");
/* harmony import */ var src_app_core_services_auth_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/core/services/auth.service */ "./src/app/core/services/auth.service.ts");
/* harmony import */ var src_environments_environment_prod__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/environments/environment.prod */ "./src/environments/environment.prod.ts");
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ngx-toastr */ "./node_modules/ngx-toastr/fesm2015/ngx-toastr.js");






let ListDoctorsComponent = class ListDoctorsComponent {
    constructor(Dclint, auth, toastr) {
        this.Dclint = Dclint;
        this.auth = auth;
        this.toastr = toastr;
        this.dctorClaint = [];
        this.urlStatic = "";
        this.urlStatic = src_environments_environment_prod__WEBPACK_IMPORTED_MODULE_4__["environment"].url + "/";
    }
    getAllDoctor() {
        this.Dclint.getAllDoctor(this.ID).subscribe(res => {
            this.dctorClaint = res;
        });
    }
    Accept(id) {
        this.Dclint.deactivate_or_activate(id, 1).subscribe(res => {
            if (res.message == 2001) {
                this.toastr.success("تم قبول الطلب", "successfull", {
                    timeOut: 3000
                });
            }
        });
    }
    ngOnInit() {
        this.getAllDoctor();
    }
};
ListDoctorsComponent.ctorParameters = () => [
    { type: src_app_core_services_dentelCenterClint_dentel_center_clint_service__WEBPACK_IMPORTED_MODULE_2__["DentelCenterClintService"] },
    { type: src_app_core_services_auth_service__WEBPACK_IMPORTED_MODULE_3__["AuthenticationService"] },
    { type: ngx_toastr__WEBPACK_IMPORTED_MODULE_5__["ToastrService"] }
];
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])('ID'),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Number)
], ListDoctorsComponent.prototype, "ID", void 0);
ListDoctorsComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-list-doctors',
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./list-doctors.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/shared/common/list-doctors/list-doctors.component.html")).default,
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./list-doctors.component.scss */ "./src/app/shared/common/list-doctors/list-doctors.component.scss")).default]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [src_app_core_services_dentelCenterClint_dentel_center_clint_service__WEBPACK_IMPORTED_MODULE_2__["DentelCenterClintService"],
        src_app_core_services_auth_service__WEBPACK_IMPORTED_MODULE_3__["AuthenticationService"],
        ngx_toastr__WEBPACK_IMPORTED_MODULE_5__["ToastrService"]])
], ListDoctorsComponent);



/***/ }),

/***/ "./src/app/shared/common/listbalace/listbalace.component.scss":
/*!********************************************************************!*\
  !*** ./src/app/shared/common/listbalace/listbalace.component.scss ***!
  \********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3NoYXJlZC9jb21tb24vbGlzdGJhbGFjZS9saXN0YmFsYWNlLmNvbXBvbmVudC5zY3NzIn0= */");

/***/ }),

/***/ "./src/app/shared/common/listbalace/listbalace.component.ts":
/*!******************************************************************!*\
  !*** ./src/app/shared/common/listbalace/listbalace.component.ts ***!
  \******************************************************************/
/*! exports provided: ListbalaceComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ListbalaceComponent", function() { return ListbalaceComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var src_app_core_services_balance_balance_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/core/services/balance/balance.service */ "./src/app/core/services/balance/balance.service.ts");
/* harmony import */ var src_environments_environment_prod__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/environments/environment.prod */ "./src/environments/environment.prod.ts");
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ngx-toastr */ "./node_modules/ngx-toastr/fesm2015/ngx-toastr.js");
/* harmony import */ var src_app_core_services_auth_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/core/services/auth.service */ "./src/app/core/services/auth.service.ts");
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ "./node_modules/@ng-bootstrap/ng-bootstrap/fesm2015/ng-bootstrap.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");
/* harmony import */ var src_app_core_services_encrypt_encrypt_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/core/services/encrypt/encrypt.service */ "./src/app/core/services/encrypt/encrypt.service.ts");









let ListbalaceComponent = class ListbalaceComponent {
    constructor(balance, tostr, auth, modalService, formBuilder, EncryptService) {
        this.balance = balance;
        this.tostr = tostr;
        this.auth = auth;
        this.modalService = modalService;
        this.formBuilder = formBuilder;
        this.EncryptService = EncryptService;
        this.balances = [];
        this.balanceItem = null;
        this.isbnMask1 = [/\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, '-', /\d/];
        this.isbnMask2 = [/\d/, /\d/, /\d/, ' ', /\d/, /\d/, ' ', /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, ' ', /\d/];
        this.datacard = [/\d/, /\d/, '/', /\d/, /\d/];
        this.phoneMask = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
        this.cardMask = [/\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/];
        this.securitycode = [/\d/, /\d/, /\d/, /\d/];
        this.LodingMore = false;
        this.Tpassword = false;
        this.billTypeItems = [
            { id: 0, label: "bankTransFer" },
            { id: 1, label: "Credit card" },
        ];
        this.billTypeModel = 0;
        this.urlStatic = src_environments_environment_prod__WEBPACK_IMPORTED_MODULE_3__["environment"].url + "/";
    }
    ngOnInit() {
        this.getAllbalance();
        this.billTypeModel = 0;
        this.validationform = this.formBuilder.group({
            price: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_7__["Validators"].required]],
            comment: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_7__["Validators"].required]],
            billType: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_7__["Validators"].required]],
            pass: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_7__["Validators"].required]],
        });
        this.validationform.addControl("dentalCenterId", new _angular_forms__WEBPACK_IMPORTED_MODULE_7__["FormControl"]());
        this.validationform.addControl("doctorId", new _angular_forms__WEBPACK_IMPORTED_MODULE_7__["FormControl"]());
        this.validationform.get('price').setValue("100");
    }
    getAllbalance() {
        this.LodingMore = true;
        this.balance.getAllById(this.ID).subscribe(res => {
            this.balances = res;
            this.LodingMore = false;
        });
    }
    get form() {
        return this.validationform.controls;
    }
    //create balnce on claint
    acceptedBalnce() {
        if (!this.Tpassword) {
            this.Tpassword = true;
            return;
        }
        this.balance.accepted(this.balanceItem.id, this.auth.user.id, this.pass).subscribe(res => {
            if (res.message == 2000) {
                this.tostr.success("تم إضافة الرصيد للمركز  " + this.balanceItem.dentalCenterName, "Add Price");
                this.Tpassword = false;
                this.getAllbalance();
                this.modalService.dismissAll();
            }
            else if (res.message == 2001) {
                this.tostr.warning("خطاء في كلمة المرور", "Add Price");
            }
            else if (res.message == 2003) {
                this.tostr.warning("يوجد خطاء في حسابك", "Add Price");
                this.auth.logout();
            }
            else if (res.message == 55555) {
                this.tostr.warning("خطاء في إضافة الرصيد ", "Add Price");
            }
        });
    }
    getLink(id) {
        return "/Doctor/Profile/" + this.EncryptService.Encrypt(id);
    }
    openModal(content, id) {
        if (id != -1) {
            this.balanceItem = this.balances.find(x => x.id == id);
        }
        this.modalService.open(content, { size: 'lg' });
    }
    getBalances() {
    }
};
ListbalaceComponent.ctorParameters = () => [
    { type: src_app_core_services_balance_balance_service__WEBPACK_IMPORTED_MODULE_2__["BalanceService"] },
    { type: ngx_toastr__WEBPACK_IMPORTED_MODULE_4__["ToastrService"] },
    { type: src_app_core_services_auth_service__WEBPACK_IMPORTED_MODULE_5__["AuthenticationService"] },
    { type: _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_6__["NgbModal"] },
    { type: _angular_forms__WEBPACK_IMPORTED_MODULE_7__["FormBuilder"] },
    { type: src_app_core_services_encrypt_encrypt_service__WEBPACK_IMPORTED_MODULE_8__["EncryptService"] }
];
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])('ID'),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Number)
], ListbalaceComponent.prototype, "ID", void 0);
ListbalaceComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-listbalace',
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./listbalace.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/shared/common/listbalace/listbalace.component.html")).default,
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./listbalace.component.scss */ "./src/app/shared/common/listbalace/listbalace.component.scss")).default]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [src_app_core_services_balance_balance_service__WEBPACK_IMPORTED_MODULE_2__["BalanceService"],
        ngx_toastr__WEBPACK_IMPORTED_MODULE_4__["ToastrService"],
        src_app_core_services_auth_service__WEBPACK_IMPORTED_MODULE_5__["AuthenticationService"],
        _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_6__["NgbModal"],
        _angular_forms__WEBPACK_IMPORTED_MODULE_7__["FormBuilder"],
        src_app_core_services_encrypt_encrypt_service__WEBPACK_IMPORTED_MODULE_8__["EncryptService"]])
], ListbalaceComponent);



/***/ }),

/***/ "./src/app/shared/common/payment-address/payment-address.component.scss":
/*!******************************************************************************!*\
  !*** ./src/app/shared/common/payment-address/payment-address.component.scss ***!
  \******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3NoYXJlZC9jb21tb24vcGF5bWVudC1hZGRyZXNzL3BheW1lbnQtYWRkcmVzcy5jb21wb25lbnQuc2NzcyJ9 */");

/***/ }),

/***/ "./src/app/shared/common/payment-address/payment-address.component.ts":
/*!****************************************************************************!*\
  !*** ./src/app/shared/common/payment-address/payment-address.component.ts ***!
  \****************************************************************************/
/*! exports provided: PaymentAddressComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PaymentAddressComponent", function() { return PaymentAddressComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var src_app_core_services_translation_trans_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/core/services/translation/trans.service */ "./src/app/core/services/translation/trans.service.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ngx-toastr */ "./node_modules/ngx-toastr/fesm2015/ngx-toastr.js");
/* harmony import */ var src_app_core_services_city_city_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/core/services/city/city.service */ "./src/app/core/services/city/city.service.ts");
/* harmony import */ var src_app_core_services_paymentAddress_payment_address_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/core/services/paymentAddress/payment-address.service */ "./src/app/core/services/paymentAddress/payment-address.service.ts");
/* harmony import */ var src_app_core_services_country_country_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/core/services/country/country.service */ "./src/app/core/services/country/country.service.ts");








let PaymentAddressComponent = class PaymentAddressComponent {
    constructor(transs, PaymentAddressService, formBuilder, toastr, CountryService, CityService) {
        this.transs = transs;
        this.PaymentAddressService = PaymentAddressService;
        this.formBuilder = formBuilder;
        this.toastr = toastr;
        this.CountryService = CountryService;
        this.CityService = CityService;
        this.submitted = false;
        this.error = '';
        this.loading = false;
        this.titleForm = "Add sms Mode";
        this.typeForm = 0;
        this.smsModelId = -1;
    }
    ngOnInit() {
        this.loading = true;
        this.Trans = this.transs.trans.subscribe(res => {
            this.trans = res.key;
            this.breadCrumbItems = [{ label: 'Setting', path: '/' }, { label: this.trans.card1_title, path: '/', active: true }];
        });
        this.btn = true;
        this.formpaymentAddress = this.formBuilder.group({
            fullName: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required],
            address1: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required],
            address2: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required],
            countryId: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required],
            cityId: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required],
            phone: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required],
            postalCode: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required]
        });
        this.formpaymentAddress.addControl('id', new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControl"](-1));
        this.formpaymentAddress.addControl('userId', new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControl"](this.ID));
        this.formpaymentAddress.addControl('userType', new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControl"](this.USERTYPE));
        this.getCountry();
        this.get();
    }
    get f() {
        return this.formpaymentAddress.controls;
    }
    getCountry() {
        this.CountryService.getAllAndName().subscribe(res => {
            this.country = res;
        });
    }
    getCity(countryId) {
        this.CityService.getAllAndNameById(countryId).subscribe(res => {
            this.city = res;
        });
    }
    onChange() {
        if (this.formpaymentAddress.get("countryId").value != undefined && this.formpaymentAddress.get('countryId').value != "") {
            this.getCity(this.formpaymentAddress.get("countryId").value);
        }
    }
    get() {
        this.PaymentAddressService.get(this.USERTYPE, this.ID).subscribe(res => {
            this.paymentAddress = res;
            this.putValueController();
            this.loading = false;
            this.btn = true;
        });
    }
    putValueController() {
        if (this.paymentAddress != null) {
            this.formpaymentAddress.get('id').setValue(this.paymentAddress.id);
            this.formpaymentAddress.get('fullName').setValue(this.paymentAddress.fullName);
            this.formpaymentAddress.get('address1').setValue(this.paymentAddress.address1);
            this.formpaymentAddress.get('address2').setValue(this.paymentAddress.address2);
            this.formpaymentAddress.get('countryId').setValue(this.paymentAddress.countryId);
            this.formpaymentAddress.get('cityId').setValue(this.paymentAddress.cityId);
            this.formpaymentAddress.get('phone').setValue(this.paymentAddress.phone);
            this.formpaymentAddress.get('postalCode').setValue(this.paymentAddress.postalCode);
            this.formpaymentAddress.disable({ onlySelf: true });
        }
    }
    edit() {
        this.btn = false;
        this.formpaymentAddress.enable({ onlySelf: true });
    }
    onSubmit() {
        this.PaymentAddressService.createAndUpdate(this.formpaymentAddress.value).subscribe(res => {
            this.toastr.success(this.trans.paymentAddress.updatedSuccessfully, "Success", {
                timeOut: 3000
            });
            this.get();
        });
    }
};
PaymentAddressComponent.ctorParameters = () => [
    { type: src_app_core_services_translation_trans_service__WEBPACK_IMPORTED_MODULE_2__["TransService"] },
    { type: src_app_core_services_paymentAddress_payment_address_service__WEBPACK_IMPORTED_MODULE_6__["PaymentAddressService"] },
    { type: _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormBuilder"] },
    { type: ngx_toastr__WEBPACK_IMPORTED_MODULE_4__["ToastrService"] },
    { type: src_app_core_services_country_country_service__WEBPACK_IMPORTED_MODULE_7__["CountryService"] },
    { type: src_app_core_services_city_city_service__WEBPACK_IMPORTED_MODULE_5__["CityService"] }
];
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])('ID'),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Number)
], PaymentAddressComponent.prototype, "ID", void 0);
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])('USERTYPE'),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Number)
], PaymentAddressComponent.prototype, "USERTYPE", void 0);
PaymentAddressComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-payment-address',
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./payment-address.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/shared/common/payment-address/payment-address.component.html")).default,
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./payment-address.component.scss */ "./src/app/shared/common/payment-address/payment-address.component.scss")).default]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [src_app_core_services_translation_trans_service__WEBPACK_IMPORTED_MODULE_2__["TransService"],
        src_app_core_services_paymentAddress_payment_address_service__WEBPACK_IMPORTED_MODULE_6__["PaymentAddressService"],
        _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormBuilder"],
        ngx_toastr__WEBPACK_IMPORTED_MODULE_4__["ToastrService"],
        src_app_core_services_country_country_service__WEBPACK_IMPORTED_MODULE_7__["CountryService"],
        src_app_core_services_city_city_service__WEBPACK_IMPORTED_MODULE_5__["CityService"]])
], PaymentAddressComponent);



/***/ }),

/***/ "./src/app/shared/common/permissions/permissions.component.scss":
/*!**********************************************************************!*\
  !*** ./src/app/shared/common/permissions/permissions.component.scss ***!
  \**********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3NoYXJlZC9jb21tb24vcGVybWlzc2lvbnMvcGVybWlzc2lvbnMuY29tcG9uZW50LnNjc3MifQ== */");

/***/ }),

/***/ "./src/app/shared/common/permissions/permissions.component.ts":
/*!********************************************************************!*\
  !*** ./src/app/shared/common/permissions/permissions.component.ts ***!
  \********************************************************************/
/*! exports provided: PermissionsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PermissionsComponent", function() { return PermissionsComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var src_app_core_services_permissions_permissions_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/core/services/permissions/permissions.service */ "./src/app/core/services/permissions/permissions.service.ts");
/* harmony import */ var src_app_core_services_auth_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/core/services/auth.service */ "./src/app/core/services/auth.service.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ "./node_modules/@ng-bootstrap/ng-bootstrap/fesm2015/ng-bootstrap.js");
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ngx-toastr */ "./node_modules/ngx-toastr/fesm2015/ngx-toastr.js");







let PermissionsComponent = class PermissionsComponent {
    constructor(prem, auth, formBuilder, modalService, toastr) {
        this.prem = prem;
        this.auth = auth;
        this.formBuilder = formBuilder;
        this.modalService = modalService;
        this.toastr = toastr;
        this.permissions = [];
        this.submitted = false;
        this.errors = '';
        this.loading = false;
        this.titleForm = "Add Doctor";
        this.typeForm = 0;
        this.permissionId = -1;
    }
    get fn() { return this.formPermission.controls; }
    ngOnInit() {
        this.formPermission = this.formBuilder.group({
            section: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required],
        });
        this.formPermission.addControl("userType", new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"](this.USERTYPE));
        this.formPermission.addControl("userId", new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"](this.ID));
        this.LoadAll();
    }
    LoadAll() {
        this.prem.get(this.USERTYPE, this.ID).subscribe(res => {
            this.permissions = res;
        });
    }
    AddPermissions(content) {
        this.formPermission.reset();
        this.modalService.open(content, { backdrop: 'static', size: 'lg' });
    }
    createPermissions() {
        this.submitted = true;
        if (this.formPermission.invalid) {
            return;
        }
        this.formPermission.get("userType").setValue(this.USERTYPE);
        this.formPermission.get("userId").setValue(this.ID);
        this.prem.create(this.formPermission.value).subscribe(res => {
            if (res.message == 1001) {
                this.toastr.warning("this scetion exists");
            }
            else if (res.message == 2000) {
                this.toastr.success("Create seccsufly");
                this.LoadAll();
            }
        }, err => {
            this.toastr.warning("Error System");
        });
    }
    updateRead(event, id) {
        this.prem.uRead({ read: event, id: id }).subscribe(res => {
            if (res.message == 2001) {
                this.toastr.success("Update seccsufly");
                this.LoadAll();
            }
        });
    }
    updateInsert(event, id) {
        this.prem.uInsert({ insert: event, id: id }).subscribe(res => {
            if (res.message == 2001) {
                this.toastr.success("Update seccsufly");
            }
        });
    }
    updateDelete(event, id) {
        this.prem.uDelete({ delete: event, id: id }).subscribe(res => {
            if (res.message == 2001) {
                this.toastr.success("Update seccsufly");
                this.LoadAll();
            }
        });
    }
    updateUpdate(event, id) {
        this.prem.uUpdate({ update: event, id: id }).subscribe(res => {
            if (res.message == 2001) {
                this.toastr.success("Update seccsufly");
                this.LoadAll();
            }
        });
    }
    updateView(event, id) {
        this.prem.uView({ view: event, id: id }).subscribe(res => {
            if (res.message == 2001) {
                this.toastr.success("Update seccsufly");
                this.LoadAll();
            }
        });
    }
};
PermissionsComponent.ctorParameters = () => [
    { type: src_app_core_services_permissions_permissions_service__WEBPACK_IMPORTED_MODULE_2__["PermissionsService"] },
    { type: src_app_core_services_auth_service__WEBPACK_IMPORTED_MODULE_3__["AuthenticationService"] },
    { type: _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormBuilder"] },
    { type: _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_5__["NgbModal"] },
    { type: ngx_toastr__WEBPACK_IMPORTED_MODULE_6__["ToastrService"] }
];
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])('ID'),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Number)
], PermissionsComponent.prototype, "ID", void 0);
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])('USERTYPE'),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Number)
], PermissionsComponent.prototype, "USERTYPE", void 0);
PermissionsComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-permissions',
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./permissions.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/shared/common/permissions/permissions.component.html")).default,
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./permissions.component.scss */ "./src/app/shared/common/permissions/permissions.component.scss")).default]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [src_app_core_services_permissions_permissions_service__WEBPACK_IMPORTED_MODULE_2__["PermissionsService"],
        src_app_core_services_auth_service__WEBPACK_IMPORTED_MODULE_3__["AuthenticationService"],
        _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormBuilder"],
        _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_5__["NgbModal"],
        ngx_toastr__WEBPACK_IMPORTED_MODULE_6__["ToastrService"]])
], PermissionsComponent);



/***/ }),

/***/ "./src/app/shared/common/pricing-strategy/pricing-strategy.component.scss":
/*!********************************************************************************!*\
  !*** ./src/app/shared/common/pricing-strategy/pricing-strategy.component.scss ***!
  \********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3NoYXJlZC9jb21tb24vcHJpY2luZy1zdHJhdGVneS9wcmljaW5nLXN0cmF0ZWd5LmNvbXBvbmVudC5zY3NzIn0= */");

/***/ }),

/***/ "./src/app/shared/common/pricing-strategy/pricing-strategy.component.ts":
/*!******************************************************************************!*\
  !*** ./src/app/shared/common/pricing-strategy/pricing-strategy.component.ts ***!
  \******************************************************************************/
/*! exports provided: PricingStrategyComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PricingStrategyComponent", function() { return PricingStrategyComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");


let PricingStrategyComponent = class PricingStrategyComponent {
    constructor() {
        this.Condation = [];
        this.OrAnd = [];
        this.Condation.push({ name: "==" });
        this.Condation.push({ name: "!=" });
        this.Condation.push({ name: "<=" });
        this.Condation.push({ name: ">=" });
        this.Condation.push({ name: ">" });
        this.Condation.push({ name: "<" });
        this.OrAnd.push({ name: "OR" });
        this.OrAnd.push({ name: "AND" });
    }
    ngOnInit() {
    }
};
PricingStrategyComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-pricing-strategy',
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./pricing-strategy.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/shared/common/pricing-strategy/pricing-strategy.component.html")).default,
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./pricing-strategy.component.scss */ "./src/app/shared/common/pricing-strategy/pricing-strategy.component.scss")).default]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
], PricingStrategyComponent);



/***/ }),

/***/ "./src/app/shared/common/responsible/responsible.component.scss":
/*!**********************************************************************!*\
  !*** ./src/app/shared/common/responsible/responsible.component.scss ***!
  \**********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3NoYXJlZC9jb21tb24vcmVzcG9uc2libGUvcmVzcG9uc2libGUuY29tcG9uZW50LnNjc3MifQ== */");

/***/ }),

/***/ "./src/app/shared/common/responsible/responsible.component.ts":
/*!********************************************************************!*\
  !*** ./src/app/shared/common/responsible/responsible.component.ts ***!
  \********************************************************************/
/*! exports provided: ResponsibleComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ResponsibleComponent", function() { return ResponsibleComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var src_app_core_services_responsible_responsible_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/core/services/responsible/responsible.service */ "./src/app/core/services/responsible/responsible.service.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ "./node_modules/@ng-bootstrap/ng-bootstrap/fesm2015/ng-bootstrap.js");
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ngx-toastr */ "./node_modules/ngx-toastr/fesm2015/ngx-toastr.js");






let ResponsibleComponent = class ResponsibleComponent {
    constructor(responsibleService, formBuilder, modalService, toastr) {
        this.responsibleService = responsibleService;
        this.formBuilder = formBuilder;
        this.modalService = modalService;
        this.toastr = toastr;
    }
    ngOnInit() {
        this.getAll();
        this.formResponsible = this.formBuilder.group({
            fullName: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required],
            jobTitle: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required],
            email: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required],
            phone: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required]
        });
        //create controller form bulder 
        this.formResponsible.addControl('id', new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControl"](''));
        this.formResponsible.addControl('userType', new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControl"](this.USERTYPE));
        this.formResponsible.addControl('userId', new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControl"](this.ID));
    }
    get fn() { return this.formResponsible.controls; }
    getAll() {
        this.responsibleService.getAllById(this.ID, this.USERTYPE).subscribe(res => {
            this.responsible = res;
        });
    }
    putValueController(id) {
        this.formResponsible.get('id').setValue(this.responsible.find(x => x.id == id).id);
        this.formResponsible.get('email').setValue(this.responsible.find(x => x.id == id).email);
        this.formResponsible.get('fullName').setValue(this.responsible.find(x => x.id == id).fullName);
        this.formResponsible.get('jobTitle').setValue(this.responsible.find(x => x.id == id).jobTitle);
        this.formResponsible.get('phone').setValue(this.responsible.find(x => x.id == id).phone);
        this.formResponsible.get('userType').setValue(this.USERTYPE);
        this.formResponsible.get('userId').setValue(this.ID);
    }
    Add(content) {
        this.titelForm = "Add Responsible";
        this.formResponsible.reset();
        this.formResponsible.get('userType').setValue(this.USERTYPE);
        this.formResponsible.get('userId').setValue(this.ID);
        this.formResponsible.enable({ onlySelf: true });
        this.typeForm = 0;
        this.modalService.open(content, { backdrop: 'static' });
    }
    Edit(content, id) {
        this.titelForm = "Edit Responsible";
        this.formResponsible.reset();
        this.putValueController(id);
        this.formResponsible.enable({ onlySelf: true });
        this.typeForm = 1;
        this.modalService.open(content, { backdrop: 'static' });
    }
    Delete(content, id) {
        this.titelForm = "Delete Responsible";
        this.formResponsible.reset();
        this.formResponsible.disable({ onlySelf: true });
        this.putValueController(id);
        this.typeForm = 2;
        this.modalService.open(content, { backdrop: 'static' });
    }
    submit(param) {
        if (this.typeForm == 0) {
            return this.responsibleService.create(param);
        }
        else if (this.typeForm == 1) {
            return this.responsibleService.update(param);
        }
        else if (this.typeForm == 2) {
            return this.responsibleService.delete(param);
        }
    }
    onSubmit() {
        this.submitted = true;
        if (this.formResponsible.invalid) {
            return;
        }
        this.submit(this.formResponsible.value).subscribe(res => {
            if (res.message == 2000) {
                this.toastr.success("The administrator has been created successfully", "successful");
            }
            else if (res.message == 2001) {
                this.toastr.success("The data was successfully updated", "updated");
            }
            else if (res.message == 2002) {
                this.toastr.warning("The data has been deleted", "deleted");
            }
            this.submitted = false;
            this.modalService.dismissAll();
            this.getAll();
        }, err => {
            if (err == 55555) {
                this.toastr.error("Unknown error", "Error");
            }
            else if (err == 1001) {
                this.toastr.warning("this email exssites", "exsistes");
            }
        });
    }
};
ResponsibleComponent.ctorParameters = () => [
    { type: src_app_core_services_responsible_responsible_service__WEBPACK_IMPORTED_MODULE_2__["ResponsibleService"] },
    { type: _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormBuilder"] },
    { type: _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_4__["NgbModal"] },
    { type: ngx_toastr__WEBPACK_IMPORTED_MODULE_5__["ToastrService"] }
];
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])('ID'),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Number)
], ResponsibleComponent.prototype, "ID", void 0);
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])('USERTYPE'),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", String)
], ResponsibleComponent.prototype, "USERTYPE", void 0);
ResponsibleComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-responsible',
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./responsible.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/shared/common/responsible/responsible.component.html")).default,
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./responsible.component.scss */ "./src/app/shared/common/responsible/responsible.component.scss")).default]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [src_app_core_services_responsible_responsible_service__WEBPACK_IMPORTED_MODULE_2__["ResponsibleService"],
        _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormBuilder"],
        _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_4__["NgbModal"],
        ngx_toastr__WEBPACK_IMPORTED_MODULE_5__["ToastrService"]])
], ResponsibleComponent);



/***/ }),

/***/ "./src/app/shared/common/shipping-address/shipping-address.component.scss":
/*!********************************************************************************!*\
  !*** ./src/app/shared/common/shipping-address/shipping-address.component.scss ***!
  \********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3NoYXJlZC9jb21tb24vc2hpcHBpbmctYWRkcmVzcy9zaGlwcGluZy1hZGRyZXNzLmNvbXBvbmVudC5zY3NzIn0= */");

/***/ }),

/***/ "./src/app/shared/common/shipping-address/shipping-address.component.ts":
/*!******************************************************************************!*\
  !*** ./src/app/shared/common/shipping-address/shipping-address.component.ts ***!
  \******************************************************************************/
/*! exports provided: ShippingAddressComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ShippingAddressComponent", function() { return ShippingAddressComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var src_app_core_services_translation_trans_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/core/services/translation/trans.service */ "./src/app/core/services/translation/trans.service.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ "./node_modules/@ng-bootstrap/ng-bootstrap/fesm2015/ng-bootstrap.js");
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ngx-toastr */ "./node_modules/ngx-toastr/fesm2015/ngx-toastr.js");
/* harmony import */ var src_app_core_services_shippingAddress_shipping_address_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/core/services/shippingAddress/shipping-address.service */ "./src/app/core/services/shippingAddress/shipping-address.service.ts");
/* harmony import */ var src_app_core_services_country_country_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/core/services/country/country.service */ "./src/app/core/services/country/country.service.ts");
/* harmony import */ var src_app_core_services_city_city_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/core/services/city/city.service */ "./src/app/core/services/city/city.service.ts");









let ShippingAddressComponent = class ShippingAddressComponent {
    constructor(transs, ShippingAddressService, formBuilder, modalService, toastr, CountryService, CityService) {
        this.transs = transs;
        this.ShippingAddressService = ShippingAddressService;
        this.formBuilder = formBuilder;
        this.modalService = modalService;
        this.toastr = toastr;
        this.CountryService = CountryService;
        this.CityService = CityService;
        this.submitted = false;
        this.error = '';
        this.loading = false;
        this.titleForm = "Add sms Mode";
        this.typeForm = 0;
        this.smsModelId = -1;
    }
    ngOnInit() {
        this.loading = true;
        this.Trans = this.transs.trans.subscribe(res => {
            this.trans = res.key;
            this.breadCrumbItems = [{ label: 'Setting', path: '/' }, { label: this.trans.card1_title, path: '/', active: true }];
        });
        this.btn = true;
        this.formshippingAddress = this.formBuilder.group({
            fullName: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required],
            address1: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required],
            address2: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required],
            countryId: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required],
            cityId: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required],
            phone: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required],
            postalCode: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required]
        });
        this.formshippingAddress.addControl('id', new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControl"](-1));
        this.formshippingAddress.addControl('userId', new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControl"](this.ID));
        this.formshippingAddress.addControl('userType', new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControl"](this.USERTYPE));
        this.getCountry();
        this.get();
    }
    get f() {
        return this.formshippingAddress.controls;
    }
    getCountry() {
        this.CountryService.getAllAndName().subscribe(res => {
            this.country = res;
        });
    }
    getCity(countryId) {
        this.CityService.getAllAndNameById(countryId).subscribe(res => {
            this.city = res;
        });
    }
    onChange() {
        if (this.formshippingAddress.get("countryId").value != undefined && this.formshippingAddress.get('countryId').value != "") {
            this.getCity(this.formshippingAddress.get("countryId").value);
        }
    }
    get() {
        this.ShippingAddressService.get(this.USERTYPE, this.ID).subscribe(res => {
            this.shippingAddress = res;
            this.putValueController();
            this.loading = false;
            this.btn = true;
        });
    }
    putValueController() {
        if (this.shippingAddress != null) {
            this.formshippingAddress.get('id').setValue(this.shippingAddress.id);
            this.formshippingAddress.get('fullName').setValue(this.shippingAddress.fullName);
            this.formshippingAddress.get('address1').setValue(this.shippingAddress.address1);
            this.formshippingAddress.get('address2').setValue(this.shippingAddress.address2);
            this.formshippingAddress.get('countryId').setValue(this.shippingAddress.countryId);
            this.formshippingAddress.get('cityId').setValue(this.shippingAddress.cityId);
            this.formshippingAddress.get('phone').setValue(this.shippingAddress.phone);
            this.formshippingAddress.get('postalCode').setValue(this.shippingAddress.postalCode);
            this.formshippingAddress.disable({ onlySelf: true });
        }
    }
    edit() {
        this.btn = false;
        this.formshippingAddress.enable({ onlySelf: true });
    }
    onSubmit() {
        this.ShippingAddressService.createAndUpdate(this.formshippingAddress.value).subscribe(res => {
            this.toastr.success(this.trans.shippingAddress.updatedSuccessfully, "Success", {
                timeOut: 3000
            });
            this.get();
        });
    }
};
ShippingAddressComponent.ctorParameters = () => [
    { type: src_app_core_services_translation_trans_service__WEBPACK_IMPORTED_MODULE_2__["TransService"] },
    { type: src_app_core_services_shippingAddress_shipping_address_service__WEBPACK_IMPORTED_MODULE_6__["ShippingAddressService"] },
    { type: _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormBuilder"] },
    { type: _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_4__["NgbModal"] },
    { type: ngx_toastr__WEBPACK_IMPORTED_MODULE_5__["ToastrService"] },
    { type: src_app_core_services_country_country_service__WEBPACK_IMPORTED_MODULE_7__["CountryService"] },
    { type: src_app_core_services_city_city_service__WEBPACK_IMPORTED_MODULE_8__["CityService"] }
];
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])('ID'),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", String)
], ShippingAddressComponent.prototype, "ID", void 0);
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])('USERTYPE'),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", String)
], ShippingAddressComponent.prototype, "USERTYPE", void 0);
ShippingAddressComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-shipping-address',
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./shipping-address.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/shared/common/shipping-address/shipping-address.component.html")).default,
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./shipping-address.component.scss */ "./src/app/shared/common/shipping-address/shipping-address.component.scss")).default]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [src_app_core_services_translation_trans_service__WEBPACK_IMPORTED_MODULE_2__["TransService"],
        src_app_core_services_shippingAddress_shipping_address_service__WEBPACK_IMPORTED_MODULE_6__["ShippingAddressService"],
        _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormBuilder"],
        _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_4__["NgbModal"],
        ngx_toastr__WEBPACK_IMPORTED_MODULE_5__["ToastrService"],
        src_app_core_services_country_country_service__WEBPACK_IMPORTED_MODULE_7__["CountryService"],
        src_app_core_services_city_city_service__WEBPACK_IMPORTED_MODULE_8__["CityService"]])
], ShippingAddressComponent);



/***/ }),

/***/ "./src/app/shared/common/upload-files/upload-files.component.scss":
/*!************************************************************************!*\
  !*** ./src/app/shared/common/upload-files/upload-files.component.scss ***!
  \************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".boxHeaden {\n  display: none;\n}\n\n.uploadBox {\n  position: fixed;\n  left: 1px;\n  bottom: 5px;\n  width: 338px;\n  border: 1px solid #373b94;\n  color: #000;\n  background: #373b9496;\n  max-height: 300px;\n  height: 300px;\n  box-shadow: 1px 1px 8px #4c4a4a;\n}\n\n.uploadBox .header {\n  background: #373b94;\n  padding: 10px 2px;\n  color: #fff;\n}\n\n.uploadBox .body {\n  height: 245px;\n  overflow: auto;\n}\n\n.uploadBox .body img {\n  width: 32px;\n  margin-right: 5px;\n}\n\n.uploadBox .body .item {\n  border: 1px dashed #ffffff;\n  padding: 6px;\n  margin: 6px;\n  color: #fff;\n}\n\n.uploadBox .btnDown {\n  float: right;\n  margin-left: 5px;\n  position: relative;\n  margin-top: -9px;\n  border: none;\n}\n\n.bodyHeaden {\n  height: 46px !important;\n  overflow: hidden;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9hbWVyZ2hqamV5L0RvY3VtZW50cy9Qcm9qZWN0cy9QYXJpc2FsaW5lT2xkL2FkbWluL3NyYy9hcHAvc2hhcmVkL2NvbW1vbi91cGxvYWQtZmlsZXMvdXBsb2FkLWZpbGVzLmNvbXBvbmVudC5zY3NzIiwic3JjL2FwcC9zaGFyZWQvY29tbW9uL3VwbG9hZC1maWxlcy91cGxvYWQtZmlsZXMuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDSSxhQUFBO0FDQ0o7O0FEQ0E7RUFDSSxlQUFBO0VBQ0EsU0FBQTtFQUNBLFdBQUE7RUFDQSxZQUFBO0VBQ0EseUJBQUE7RUFDQSxXQUFBO0VBQ0EscUJBQUE7RUFDQSxpQkFBQTtFQUNBLGFBQUE7RUFDQSwrQkFBQTtBQ0VKOztBRERJO0VBQ0ksbUJBQUE7RUFDQSxpQkFBQTtFQUNBLFdBQUE7QUNHUjs7QURESTtFQUNJLGFBQUE7RUFDQSxjQUFBO0FDR1I7O0FERlE7RUFDSSxXQUFBO0VBQ0EsaUJBQUE7QUNJWjs7QURGUTtFQUNJLDBCQUFBO0VBQ0EsWUFBQTtFQUNBLFdBQUE7RUFDQSxXQUFBO0FDSVo7O0FEREk7RUFDQSxZQUFBO0VBQ0EsZ0JBQUE7RUFDQSxrQkFBQTtFQUNBLGdCQUFBO0VBQ0EsWUFBQTtBQ0dKOztBRENBO0VBQ0ksdUJBQUE7RUFDQSxnQkFBQTtBQ0VKIiwiZmlsZSI6InNyYy9hcHAvc2hhcmVkL2NvbW1vbi91cGxvYWQtZmlsZXMvdXBsb2FkLWZpbGVzLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmJveEhlYWRlbntcbiAgICBkaXNwbGF5OiBub25lO1xufVxuLnVwbG9hZEJveHtcbiAgICBwb3NpdGlvbjogZml4ZWQ7XG4gICAgbGVmdDogMXB4O1xuICAgIGJvdHRvbTogNXB4O1xuICAgIHdpZHRoOiAzMzhweDtcbiAgICBib3JkZXI6IDFweCBzb2xpZCAjMzczYjk0O1xuICAgIGNvbG9yOiAjMDAwO1xuICAgIGJhY2tncm91bmQ6ICMzNzNiOTQ5NjtcbiAgICBtYXgtaGVpZ2h0OiAzMDBweDtcbiAgICBoZWlnaHQ6IDMwMHB4O1xuICAgIGJveC1zaGFkb3c6IDFweCAxcHggOHB4ICM0YzRhNGE7XG4gICAgLmhlYWRlcntcbiAgICAgICAgYmFja2dyb3VuZDogIzM3M2I5NDtcbiAgICAgICAgcGFkZGluZzogMTBweCAycHg7XG4gICAgICAgIGNvbG9yOiAjZmZmO1xuICAgIH1cbiAgICAuYm9keXtcbiAgICAgICAgaGVpZ2h0OiAyNDVweDtcbiAgICAgICAgb3ZlcmZsb3c6IGF1dG87XG4gICAgICAgIGltZ3tcbiAgICAgICAgICAgIHdpZHRoOiAzMnB4O1xuICAgICAgICAgICAgbWFyZ2luLXJpZ2h0OiA1cHg7XG4gICAgICAgIH1cbiAgICAgICAgLml0ZW17XG4gICAgICAgICAgICBib3JkZXI6IDFweCBkYXNoZWQgI2ZmZmZmZjtcbiAgICAgICAgICAgIHBhZGRpbmc6IDZweDtcbiAgICAgICAgICAgIG1hcmdpbjogNnB4O1xuICAgICAgICAgICAgY29sb3I6ICNmZmY7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLmJ0bkRvd257XG4gICAgZmxvYXQ6IHJpZ2h0O1xuICAgIG1hcmdpbi1sZWZ0OiA1cHg7XG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgIG1hcmdpbi10b3A6IC05cHg7XG4gICAgYm9yZGVyOiBub25lO1xuICAgIH1cblxufVxuLmJvZHlIZWFkZW57XG4gICAgaGVpZ2h0OiA0NnB4ICFpbXBvcnRhbnQ7XG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcbn0iLCIuYm94SGVhZGVuIHtcbiAgZGlzcGxheTogbm9uZTtcbn1cblxuLnVwbG9hZEJveCB7XG4gIHBvc2l0aW9uOiBmaXhlZDtcbiAgbGVmdDogMXB4O1xuICBib3R0b206IDVweDtcbiAgd2lkdGg6IDMzOHB4O1xuICBib3JkZXI6IDFweCBzb2xpZCAjMzczYjk0O1xuICBjb2xvcjogIzAwMDtcbiAgYmFja2dyb3VuZDogIzM3M2I5NDk2O1xuICBtYXgtaGVpZ2h0OiAzMDBweDtcbiAgaGVpZ2h0OiAzMDBweDtcbiAgYm94LXNoYWRvdzogMXB4IDFweCA4cHggIzRjNGE0YTtcbn1cbi51cGxvYWRCb3ggLmhlYWRlciB7XG4gIGJhY2tncm91bmQ6ICMzNzNiOTQ7XG4gIHBhZGRpbmc6IDEwcHggMnB4O1xuICBjb2xvcjogI2ZmZjtcbn1cbi51cGxvYWRCb3ggLmJvZHkge1xuICBoZWlnaHQ6IDI0NXB4O1xuICBvdmVyZmxvdzogYXV0bztcbn1cbi51cGxvYWRCb3ggLmJvZHkgaW1nIHtcbiAgd2lkdGg6IDMycHg7XG4gIG1hcmdpbi1yaWdodDogNXB4O1xufVxuLnVwbG9hZEJveCAuYm9keSAuaXRlbSB7XG4gIGJvcmRlcjogMXB4IGRhc2hlZCAjZmZmZmZmO1xuICBwYWRkaW5nOiA2cHg7XG4gIG1hcmdpbjogNnB4O1xuICBjb2xvcjogI2ZmZjtcbn1cbi51cGxvYWRCb3ggLmJ0bkRvd24ge1xuICBmbG9hdDogcmlnaHQ7XG4gIG1hcmdpbi1sZWZ0OiA1cHg7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgbWFyZ2luLXRvcDogLTlweDtcbiAgYm9yZGVyOiBub25lO1xufVxuXG4uYm9keUhlYWRlbiB7XG4gIGhlaWdodDogNDZweCAhaW1wb3J0YW50O1xuICBvdmVyZmxvdzogaGlkZGVuO1xufSJdfQ== */");

/***/ }),

/***/ "./src/app/shared/common/upload-files/upload-files.component.ts":
/*!**********************************************************************!*\
  !*** ./src/app/shared/common/upload-files/upload-files.component.ts ***!
  \**********************************************************************/
/*! exports provided: UploadFilesComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UploadFilesComponent", function() { return UploadFilesComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _upload_files_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./upload-files.service */ "./src/app/shared/common/upload-files/upload-files.service.ts");



let UploadFilesComponent = class UploadFilesComponent {
    constructor(uploadFilesServ) {
        this.uploadFilesServ = uploadFilesServ;
        this.fileUpload = [];
    }
    ngOnInit() {
        this.uploadFilesServ.fileUpdate().subscribe(res => {
            if (res) {
                if (res.length == 0) {
                    notReload = false;
                }
                else {
                    notReload = true;
                }
                this.fileUpload = res;
            }
        });
        dragElement(document.getElementById("uploadBox"));
    }
    btnDown() {
        document.getElementById("uploadBox").classList.forEach(x => {
            if (x != "bodyHeaden") {
                document.getElementById("uploadBox").classList.add('bodyHeaden');
                document.getElementById("arrowUp").style.display = "none";
                document.getElementById("arrowDown").style.display = "block";
            }
            else {
                document.getElementById("uploadBox").classList.remove('bodyHeaden');
                document.getElementById("arrowUp").style.display = "block";
                document.getElementById("arrowDown").style.display = "none";
            }
        });
    }
};
UploadFilesComponent.ctorParameters = () => [
    { type: _upload_files_service__WEBPACK_IMPORTED_MODULE_2__["UploadFilesService"] }
];
UploadFilesComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-upload-files',
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./upload-files.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/shared/common/upload-files/upload-files.component.html")).default,
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./upload-files.component.scss */ "./src/app/shared/common/upload-files/upload-files.component.scss")).default]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_upload_files_service__WEBPACK_IMPORTED_MODULE_2__["UploadFilesService"]])
], UploadFilesComponent);



/***/ }),

/***/ "./src/app/shared/common/upload-files/upload-files.service.ts":
/*!********************************************************************!*\
  !*** ./src/app/shared/common/upload-files/upload-files.service.ts ***!
  \********************************************************************/
/*! exports provided: UploadFilesService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UploadFilesService", function() { return UploadFilesService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm2015/http.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm2015/index.js");
/* harmony import */ var src_environments_environment_prod__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/environments/environment.prod */ "./src/environments/environment.prod.ts");





let UploadFilesService = class UploadFilesService {
    constructor(http) {
        this.http = http;
        //'UpSTL | kiven anonymous mohmad hasd'
        this.idNum = 0;
        this.fileObservabel = new rxjs__WEBPACK_IMPORTED_MODULE_3__["BehaviorSubject"](null);
        this.filesList = [];
    }
    createFile(id, namePatint, value) {
        if (this.filesList.find(x => x.id == id)) {
            this.filesList.find(x => x.id == id).namePatint = namePatint;
            this.filesList.find(x => x.id == id).value = value;
        }
        else {
            this.filesList.push({ id: id, namePatint: namePatint, value: value });
        }
        this.fileObservabel.next(this.filesList);
    }
    deleteFile(id) {
        if (this.filesList.find(x => x.id == id)) {
            this.filesList.splice(this.filesList.indexOf(this.filesList.find(x => x.id == id)), 1);
        }
        this.fileObservabel.next(this.filesList);
    }
    fileUpdate() {
        return this.fileObservabel.asObservable();
    }
    UploadStl(file, params, namePatient, id, fun) {
        let formdata = new FormData();
        formdata.append('fileData', file);
        this.http.post(src_environments_environment_prod__WEBPACK_IMPORTED_MODULE_4__["environment"].url + "/fileManager/uploadFile", formdata, { params: params, reportProgress: true,
            observe: 'events' }).subscribe(resp => {
            if (resp.type === _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpEventType"].Response) {
                this.deleteFile(id);
                fun(id);
            }
            if (resp.type === _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpEventType"].UploadProgress) {
                const percentDone = Math.round(100 * resp.loaded / resp.total);
                this.createFile(id, namePatient, percentDone);
            }
        });
    }
};
UploadFilesService.ctorParameters = () => [
    { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"] }
];
UploadFilesService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Injectable"])({
        providedIn: 'root'
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]])
], UploadFilesService);



/***/ }),

/***/ "./src/app/shared/common/video-trement/video-trement.component.scss":
/*!**************************************************************************!*\
  !*** ./src/app/shared/common/video-trement/video-trement.component.scss ***!
  \**************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("#instructions {\n  max-width: 100%;\n  text-align: left;\n  margin: 30px auto;\n}\n\n#instructions textarea {\n  width: 100%;\n  height: 100px;\n}\n\n/* Show the controls (hidden at the start by default) */\n\n.video-js .vjs-control-bar {\n  display: -webkit-box;\n  display: flex;\n}\n\n/* Make the demo a little prettier */\n\na, a:hover, a:visited {\n  color: #76DAFF;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9hbWVyZ2hqamV5L0RvY3VtZW50cy9Qcm9qZWN0cy9QYXJpc2FsaW5lT2xkL2FkbWluL3NyYy9hcHAvc2hhcmVkL2NvbW1vbi92aWRlby10cmVtZW50L3ZpZGVvLXRyZW1lbnQuY29tcG9uZW50LnNjc3MiLCJzcmMvYXBwL3NoYXJlZC9jb21tb24vdmlkZW8tdHJlbWVudC92aWRlby10cmVtZW50LmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQWdCLGVBQUE7RUFBaUIsZ0JBQUE7RUFBa0IsaUJBQUE7QUNJbkQ7O0FESEE7RUFBeUIsV0FBQTtFQUFhLGFBQUE7QUNRdEM7O0FETkEsdURBQUE7O0FBQ0E7RUFDRSxvQkFBQTtFQUdBLGFBQUE7QUNTRjs7QUROQSxvQ0FBQTs7QUFFQTtFQUF3QixjQUFBO0FDU3hCIiwiZmlsZSI6InNyYy9hcHAvc2hhcmVkL2NvbW1vbi92aWRlby10cmVtZW50L3ZpZGVvLXRyZW1lbnQuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIjaW5zdHJ1Y3Rpb25zIHsgbWF4LXdpZHRoOiAxMDAlOyB0ZXh0LWFsaWduOiBsZWZ0OyBtYXJnaW46IDMwcHggYXV0bzsgfVxuI2luc3RydWN0aW9ucyB0ZXh0YXJlYSB7IHdpZHRoOiAxMDAlOyBoZWlnaHQ6IDEwMHB4OyB9XG5cbi8qIFNob3cgdGhlIGNvbnRyb2xzIChoaWRkZW4gYXQgdGhlIHN0YXJ0IGJ5IGRlZmF1bHQpICovXG4udmlkZW8tanMgLnZqcy1jb250cm9sLWJhciB7IFxuICBkaXNwbGF5OiAtd2Via2l0LWJveDtcbiAgZGlzcGxheTogLXdlYmtpdC1mbGV4O1xuICBkaXNwbGF5OiAtbXMtZmxleGJveDtcbiAgZGlzcGxheTogZmxleDtcbn1cblxuLyogTWFrZSB0aGUgZGVtbyBhIGxpdHRsZSBwcmV0dGllciAqL1xuXG5hLCBhOmhvdmVyLCBhOnZpc2l0ZWQgeyBjb2xvcjogIzc2REFGRjsgfSIsIiNpbnN0cnVjdGlvbnMge1xuICBtYXgtd2lkdGg6IDEwMCU7XG4gIHRleHQtYWxpZ246IGxlZnQ7XG4gIG1hcmdpbjogMzBweCBhdXRvO1xufVxuXG4jaW5zdHJ1Y3Rpb25zIHRleHRhcmVhIHtcbiAgd2lkdGg6IDEwMCU7XG4gIGhlaWdodDogMTAwcHg7XG59XG5cbi8qIFNob3cgdGhlIGNvbnRyb2xzIChoaWRkZW4gYXQgdGhlIHN0YXJ0IGJ5IGRlZmF1bHQpICovXG4udmlkZW8tanMgLnZqcy1jb250cm9sLWJhciB7XG4gIGRpc3BsYXk6IC13ZWJraXQtYm94O1xuICBkaXNwbGF5OiAtd2Via2l0LWZsZXg7XG4gIGRpc3BsYXk6IC1tcy1mbGV4Ym94O1xuICBkaXNwbGF5OiBmbGV4O1xufVxuXG4vKiBNYWtlIHRoZSBkZW1vIGEgbGl0dGxlIHByZXR0aWVyICovXG5hLCBhOmhvdmVyLCBhOnZpc2l0ZWQge1xuICBjb2xvcjogIzc2REFGRjtcbn0iXX0= */");

/***/ }),

/***/ "./src/app/shared/common/video-trement/video-trement.component.ts":
/*!************************************************************************!*\
  !*** ./src/app/shared/common/video-trement/video-trement.component.ts ***!
  \************************************************************************/
/*! exports provided: VideoTrementComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VideoTrementComponent", function() { return VideoTrementComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");


let VideoTrementComponent = class VideoTrementComponent {
    constructor() { }
    ngOnInit() {
        $(function () {
            var $refreshButton = $('#refresh');
            var $results = $('#css_result');
            function refresh() {
                var css = $('style.cp-pen-styles').text();
                $results.html(css);
            }
            refresh();
            $refreshButton.click(refresh);
            // Select all the contents when clicked
            $results.click(function () {
                $(this).select();
            });
        });
    }
};
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", String)
], VideoTrementComponent.prototype, "srcVideo", void 0);
VideoTrementComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-video-trement',
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./video-trement.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/shared/common/video-trement/video-trement.component.html")).default,
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./video-trement.component.scss */ "./src/app/shared/common/video-trement/video-trement.component.scss")).default]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
], VideoTrementComponent);



/***/ }),

/***/ "./src/app/shared/ui/count-to.directive.ts":
/*!*************************************************!*\
  !*** ./src/app/shared/ui/count-to.directive.ts ***!
  \*************************************************/
/*! exports provided: CountToDirective */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CountToDirective", function() { return CountToDirective; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");


let CountToDirective = class CountToDirective {
    constructor(el) {
        this.el = el;
        this.from = 0;
        this.duration = 4;
        this.e = this.el.nativeElement;
        this.refreshInterval = 30;
        this.step = 0;
    }
    ngOnInit() {
    }
    ngOnChanges() {
        if (this.CountTo) {
            this.start();
        }
    }
    calculate() {
        this.duration = this.duration * 1000;
        this.steps = Math.ceil(this.duration / this.refreshInterval);
        this.increment = ((this.CountTo - this.from) / this.steps);
        this.num = this.from;
    }
    tick() {
        setTimeout(() => {
            this.num += this.increment;
            this.step++;
            if (this.step >= this.steps) {
                this.num = this.CountTo;
                this.e.textContent = this.CountTo.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
            }
            else {
                this.e.textContent = Math.round(this.num).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','); // Math.round(this.num);
                this.tick();
            }
        }, this.refreshInterval);
    }
    start() {
        this.calculate();
        this.tick();
    }
};
CountToDirective.ctorParameters = () => [
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"] }
];
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Number)
], CountToDirective.prototype, "CountTo", void 0);
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
], CountToDirective.prototype, "from", void 0);
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
], CountToDirective.prototype, "duration", void 0);
CountToDirective = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Directive"])({
        // tslint:disable-next-line: directive-selector
        selector: '[CountTo]'
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"]])
], CountToDirective);



/***/ }),

/***/ "./src/app/shared/ui/emaillist/data.ts":
/*!*********************************************!*\
  !*** ./src/app/shared/ui/emaillist/data.ts ***!
  \*********************************************/
/*! exports provided: emailList, emailLabel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "emailList", function() { return emailList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "emailLabel", function() { return emailLabel; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");

const emailList = [
    {
        icon: 'mdi mdi-inbox',
        name: 'Inbox',
        value: 8,
        text: 'danger'
    },
    {
        icon: 'mdi mdi-star',
        name: 'Starred'
    },
    {
        icon: 'mdi mdi-file-document-box',
        name: 'Draft',
        value: 32,
        text: 'info'
    },
    {
        icon: 'mdi mdi-send ',
        name: 'Sent Mail'
    },
    {
        icon: 'mdi mdi-delete',
        name: 'Trash'
    }
];
const emailLabel = [
    {
        text: 'info',
        name: 'Web App'
    },
    {
        text: 'warning',
        name: 'Recharge'
    },
    {
        text: 'dark',
        name: 'Wallet Balance'
    },
    {
        text: 'primary',
        name: 'Friends'
    },
    {
        text: 'success',
        name: 'Family'
    }
];



/***/ }),

/***/ "./src/app/shared/ui/emaillist/emaillist.component.scss":
/*!**************************************************************!*\
  !*** ./src/app/shared/ui/emaillist/emaillist.component.scss ***!
  \**************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3NoYXJlZC91aS9lbWFpbGxpc3QvZW1haWxsaXN0LmNvbXBvbmVudC5zY3NzIn0= */");

/***/ }),

/***/ "./src/app/shared/ui/emaillist/emaillist.component.ts":
/*!************************************************************!*\
  !*** ./src/app/shared/ui/emaillist/emaillist.component.ts ***!
  \************************************************************/
/*! exports provided: EmaillistComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EmaillistComponent", function() { return EmaillistComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _data__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./data */ "./src/app/shared/ui/emaillist/data.ts");



let EmaillistComponent = class EmaillistComponent {
    constructor() { }
    ngOnInit() {
        /**
         * Fetches data
         */
        this._fetchData();
    }
    /**
     * fetches the list and label value
     */
    _fetchData() {
        // leftbar list
        this.emailList = _data__WEBPACK_IMPORTED_MODULE_2__["emailList"];
        // leftbar label
        this.emailLabel = _data__WEBPACK_IMPORTED_MODULE_2__["emailLabel"];
    }
};
EmaillistComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-emaillist',
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./emaillist.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/shared/ui/emaillist/emaillist.component.html")).default,
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./emaillist.component.scss */ "./src/app/shared/ui/emaillist/emaillist.component.scss")).default]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
], EmaillistComponent);



/***/ }),

/***/ "./src/app/shared/ui/pagetitle/pagetitle.component.scss":
/*!**************************************************************!*\
  !*** ./src/app/shared/ui/pagetitle/pagetitle.component.scss ***!
  \**************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3NoYXJlZC91aS9wYWdldGl0bGUvcGFnZXRpdGxlLmNvbXBvbmVudC5zY3NzIn0= */");

/***/ }),

/***/ "./src/app/shared/ui/pagetitle/pagetitle.component.ts":
/*!************************************************************!*\
  !*** ./src/app/shared/ui/pagetitle/pagetitle.component.ts ***!
  \************************************************************/
/*! exports provided: PagetitleComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PagetitleComponent", function() { return PagetitleComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");


let PagetitleComponent = class PagetitleComponent {
    constructor() { }
    ngOnInit() {
    }
};
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Array)
], PagetitleComponent.prototype, "breadcrumbItems", void 0);
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", String)
], PagetitleComponent.prototype, "title", void 0);
PagetitleComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-page-title',
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./pagetitle.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/shared/ui/pagetitle/pagetitle.component.html")).default,
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./pagetitle.component.scss */ "./src/app/shared/ui/pagetitle/pagetitle.component.scss")).default]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
], PagetitleComponent);



/***/ }),

/***/ "./src/app/shared/ui/portlet/portlet.component.scss":
/*!**********************************************************!*\
  !*** ./src/app/shared/ui/portlet/portlet.component.scss ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3NoYXJlZC91aS9wb3J0bGV0L3BvcnRsZXQuY29tcG9uZW50LnNjc3MifQ== */");

/***/ }),

/***/ "./src/app/shared/ui/portlet/portlet.component.ts":
/*!********************************************************!*\
  !*** ./src/app/shared/ui/portlet/portlet.component.ts ***!
  \********************************************************/
/*! exports provided: PortletComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PortletComponent", function() { return PortletComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");


let PortletComponent = class PortletComponent {
    constructor() {
        // tslint:disable-next-line: no-output-on-prefix
        this.onContentRefresh = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
    }
    ngOnInit() {
        // set the value
        this.isCollapsed = false;
        this.isLoading = false;
        this.isVisible = true;
    }
    /**
     * Refreshes the content
     */
    refreshContent() {
        this.isLoading = true;
        // event emit to let parent know about data refresh
        this.onContentRefresh.emit();
        setTimeout(() => {
            this.isLoading = false;
        }, 2000);
    }
    /**
     * Removes self from dom
     */
    remove() {
        this.isVisible = false;
    }
};
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", String)
], PortletComponent.prototype, "title", void 0);
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", String)
], PortletComponent.prototype, "color", void 0);
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", String)
], PortletComponent.prototype, "text", void 0);
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", String)
], PortletComponent.prototype, "headerClass", void 0);
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])(),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"])
], PortletComponent.prototype, "onContentRefresh", void 0);
PortletComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-portlet',
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./portlet.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/shared/ui/portlet/portlet.component.html")).default,
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./portlet.component.scss */ "./src/app/shared/ui/portlet/portlet.component.scss")).default]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
], PortletComponent);



/***/ }),

/***/ "./src/app/shared/ui/preloader/preloader.component.scss":
/*!**************************************************************!*\
  !*** ./src/app/shared/ui/preloader/preloader.component.scss ***!
  \**************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3NoYXJlZC91aS9wcmVsb2FkZXIvcHJlbG9hZGVyLmNvbXBvbmVudC5zY3NzIn0= */");

/***/ }),

/***/ "./src/app/shared/ui/preloader/preloader.component.ts":
/*!************************************************************!*\
  !*** ./src/app/shared/ui/preloader/preloader.component.ts ***!
  \************************************************************/
/*! exports provided: PreloaderComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PreloaderComponent", function() { return PreloaderComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");


let PreloaderComponent = class PreloaderComponent {
    constructor() {
        this.display = false;
    }
    ngOnInit() {
    }
    /**
     * Shows the loader
     */
    show() {
        this.display = true;
    }
    /**
     * Hides the loader
     */
    hide() {
        this.display = false;
    }
};
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
], PreloaderComponent.prototype, "display", void 0);
PreloaderComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-ui-preloader',
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./preloader.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/shared/ui/preloader/preloader.component.html")).default,
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./preloader.component.scss */ "./src/app/shared/ui/preloader/preloader.component.scss")).default]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
], PreloaderComponent);



/***/ }),

/***/ "./src/app/shared/ui/slimscroll.directive.ts":
/*!***************************************************!*\
  !*** ./src/app/shared/ui/slimscroll.directive.ts ***!
  \***************************************************/
/*! exports provided: SlimscrollDirective */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SlimscrollDirective", function() { return SlimscrollDirective; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var smooth_scrollbar__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! smooth-scrollbar */ "./node_modules/smooth-scrollbar/index.js");



let SlimscrollDirective = class SlimscrollDirective {
    constructor(el, renderer) {
        this.el = el;
        this.renderer = renderer;
    }
    ngAfterViewInit() {
        // smooth scroll
        smooth_scrollbar__WEBPACK_IMPORTED_MODULE_2__["default"].init(this.el.nativeElement);
    }
};
SlimscrollDirective.ctorParameters = () => [
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"] },
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Renderer2"] }
];
SlimscrollDirective = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Directive"])({
        selector: '[appSlimScroll]'
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["Renderer2"]])
], SlimscrollDirective);



/***/ }),

/***/ "./src/app/shared/ui/ui.module.ts":
/*!****************************************!*\
  !*** ./src/app/shared/ui/ui.module.ts ***!
  \****************************************/
/*! exports provided: UIModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UIModule", function() { return UIModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ "./node_modules/@ng-bootstrap/ng-bootstrap/fesm2015/ng-bootstrap.js");
/* harmony import */ var ng_click_outside__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ng-click-outside */ "./node_modules/ng-click-outside/lib/index.js");
/* harmony import */ var ng_click_outside__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(ng_click_outside__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _slimscroll_directive__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./slimscroll.directive */ "./src/app/shared/ui/slimscroll.directive.ts");
/* harmony import */ var _count_to_directive__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./count-to.directive */ "./src/app/shared/ui/count-to.directive.ts");
/* harmony import */ var _preloader_preloader_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./preloader/preloader.component */ "./src/app/shared/ui/preloader/preloader.component.ts");
/* harmony import */ var _pagetitle_pagetitle_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./pagetitle/pagetitle.component */ "./src/app/shared/ui/pagetitle/pagetitle.component.ts");
/* harmony import */ var _portlet_portlet_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./portlet/portlet.component */ "./src/app/shared/ui/portlet/portlet.component.ts");
/* harmony import */ var _emaillist_emaillist_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./emaillist/emaillist.component */ "./src/app/shared/ui/emaillist/emaillist.component.ts");
/* harmony import */ var _widget_widget_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./widget/widget.component */ "./src/app/shared/ui/widget/widget.component.ts");













let UIModule = class UIModule {
};
UIModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        // tslint:disable-next-line: max-line-length
        declarations: [_slimscroll_directive__WEBPACK_IMPORTED_MODULE_6__["SlimscrollDirective"], _preloader_preloader_component__WEBPACK_IMPORTED_MODULE_8__["PreloaderComponent"], _pagetitle_pagetitle_component__WEBPACK_IMPORTED_MODULE_9__["PagetitleComponent"], _portlet_portlet_component__WEBPACK_IMPORTED_MODULE_10__["PortletComponent"], _widget_widget_component__WEBPACK_IMPORTED_MODULE_12__["WidgetComponent"], _emaillist_emaillist_component__WEBPACK_IMPORTED_MODULE_11__["EmaillistComponent"], _count_to_directive__WEBPACK_IMPORTED_MODULE_7__["CountToDirective"]],
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
            ng_click_outside__WEBPACK_IMPORTED_MODULE_5__["ClickOutsideModule"],
            _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_4__["NgbCollapseModule"],
            _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_4__["NgbDatepickerModule"],
            _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_4__["NgbTimepickerModule"],
            _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_4__["NgbDropdownModule"]
        ],
        // tslint:disable-next-line: max-line-length
        exports: [_slimscroll_directive__WEBPACK_IMPORTED_MODULE_6__["SlimscrollDirective"], _preloader_preloader_component__WEBPACK_IMPORTED_MODULE_8__["PreloaderComponent"], _pagetitle_pagetitle_component__WEBPACK_IMPORTED_MODULE_9__["PagetitleComponent"], _portlet_portlet_component__WEBPACK_IMPORTED_MODULE_10__["PortletComponent"], _widget_widget_component__WEBPACK_IMPORTED_MODULE_12__["WidgetComponent"], _emaillist_emaillist_component__WEBPACK_IMPORTED_MODULE_11__["EmaillistComponent"], _count_to_directive__WEBPACK_IMPORTED_MODULE_7__["CountToDirective"]]
    })
], UIModule);



/***/ }),

/***/ "./src/app/shared/ui/widget/widget.component.scss":
/*!********************************************************!*\
  !*** ./src/app/shared/ui/widget/widget.component.scss ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3NoYXJlZC91aS93aWRnZXQvd2lkZ2V0LmNvbXBvbmVudC5zY3NzIn0= */");

/***/ }),

/***/ "./src/app/shared/ui/widget/widget.component.ts":
/*!******************************************************!*\
  !*** ./src/app/shared/ui/widget/widget.component.ts ***!
  \******************************************************/
/*! exports provided: WidgetComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WidgetComponent", function() { return WidgetComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");


let WidgetComponent = class WidgetComponent {
    constructor() { }
    ngOnInit() {
    }
};
WidgetComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-widget',
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./widget.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/shared/ui/widget/widget.component.html")).default,
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./widget.component.scss */ "./src/app/shared/ui/widget/widget.component.scss")).default]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
], WidgetComponent);



/***/ }),

/***/ "./src/environments/environment.prod.ts":
/*!**********************************************!*\
  !*** ./src/environments/environment.prod.ts ***!
  \**********************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");

const environment = {
    production: false,
    trans: null,
    token: String,
    url: 'https://api.setupaligners.com',
    langId: 1,
    id: 2,
    langCode: 'EN',
    typeUser: '6'
};


/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");

// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const environment = {
    production: false,
    trans: null,
    token: String,
    url: 'https://api.setupaligners.com',
    langId: 1,
    id: 2,
    langCode: 'EN',
    typeUser: '1'
};
/*
 * For easier debugging in 'https://api.parisaline.com/',can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "./node_modules/@angular/platform-browser-dynamic/fesm2015/platform-browser-dynamic.js");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");





if (_environments_environment__WEBPACK_IMPORTED_MODULE_4__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_2__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_3__["AppModule"])
    .catch(err => console.error(err));


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /Users/amerghjjey/Documents/Projects/ParisalineOld/admin/src/main.ts */"./src/main.ts");


/***/ }),

/***/ 1:
/*!********************!*\
  !*** ws (ignored) ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main-es2015.js.map