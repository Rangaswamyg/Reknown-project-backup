import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-dashnavbar',
  templateUrl: './dashnavbar.component.html',
  styleUrls: ['./dashnavbar.component.css']
})
export class DashnavbarComponent implements OnInit {

  user:Object;
  constructor(public _service: UserService) { }

  ngOnInit() {
   this.getuser_info();
  }
  getuser_info(){
    this._service.getProfile().subscribe(profile=>{
      this._service.userinfo = profile.user;
      console.log('userinfoooooo', this._service.userinfo);
    });
  }
}
