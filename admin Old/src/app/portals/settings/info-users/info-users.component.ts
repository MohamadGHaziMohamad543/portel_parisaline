import { Component, OnInit } from '@angular/core';
import { UserAuth } from 'src/app/core/models/auth.models';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { UsersService } from 'src/app/core/services/users/users.service';

@Component({
  selector: 'app-info-users',
  templateUrl: './info-users.component.html',
  styleUrls: ['./info-users.component.scss']
})
export class InfoUsersComponent implements OnInit {

  userInforamtion=[];
  constructor(private usersService:UsersService,
    private auth:AuthenticationService) { }

  ngOnInit() {

    this.usersService.getUserById(this.auth.user.id).subscribe(res=>{
      alert(JSON.stringify(res));
    });
  }

}
