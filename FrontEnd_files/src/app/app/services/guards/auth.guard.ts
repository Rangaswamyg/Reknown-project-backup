import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { UserService } from '../../services/user.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor (private router:Router,private _service:UserService){

  }

  canActivate() {
    if(!this._service.loggedIn()) {
      return true;
    } else {
      console.log("login path need")
      this.router.navigate(['/home']);
      return false;
    }
  }

  
}
