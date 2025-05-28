import { Component, OnInit, AfterViewInit, ElementRef, ViewChild, Input, OnChanges } from '@angular/core';
import MetisMenu from 'metismenujs/dist/metismenujs';
import {PermissionsService} from 'src/app/core/services/permissions/permissions.service'
import { AuthenticationService } from 'src/app/core/services/auth.service';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, AfterViewInit, OnChanges {

  @Input() isCondensed = false;

  menu: any;

  @ViewChild('sideMenu', { static: false }) sideMenu: ElementRef;


  permission:any[]=[];
  isAdmin:number=0;
  constructor(
    private permissionsService:PermissionsService,
    private auth:AuthenticationService,
    
  ) {
    this.isAdmin=auth.user.role;

   }

  ngOnInit() {
    this.permissionsService.get(1,this.auth.user.id).subscribe(res=>{
      this.permission=res;
      
      this.menu.dispose();
      setTimeout(() => {
        if (!this.isCondensed && this.sideMenu || this.isCondensed) {
          setTimeout(() => {
            this.menu = new MetisMenu(this.sideMenu.nativeElement);
          });
        } else if (this.menu) {
          this.menu.dispose();
        }
      });
    });
  }

  ngAfterViewInit() {
    this.LoadMenu();
  }

  LoadMenu(){
    this.menu = new MetisMenu(this.sideMenu.nativeElement);
    this._activateMenuDropdown();
  }
  ngOnChanges() {
    if (!this.isCondensed && this.sideMenu || this.isCondensed) {
      setTimeout(() => {
        this.menu = new MetisMenu(this.sideMenu.nativeElement);
      });
    } else if (this.menu) {
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


  checkPerm(Section,key){
    if(this.permission.length!=0)
    {
      let sec=null;
      if(Section==key)
      {
       sec=this.permission.filter(x=>x.section==Section );
       if(sec)
       {
         sec.forEach(e => {
          if(e.view)
          {
            return true;
          }
         });
        
       }
      }
      else{
        sec=this.permission.find(x=>x.section==Section && x.key==key);
        if(sec)
        {
          if(sec.view)
          {
            return true;
          }
         
        }
      }
 
    }
    else{
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

}
