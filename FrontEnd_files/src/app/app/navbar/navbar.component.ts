import { Component, OnInit,TemplateRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { IndexService } from '../services/index.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup, Validators, FormArray,FormControl } from '@angular/forms';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  modalReflogin: BsModalRef;
  user: Object;
  constructor(private _router:Router,public _indexservice: IndexService,private modalService: BsModalService,private route: ActivatedRoute,public _service: UserService,private formBuilder: FormBuilder)
  {
  }


  ngOnInit() {
    this.getuser_info();
  }
// get user detail in home page
  getuser_info(){
    this._service.getProfile().subscribe(profile=>{
      this.user = profile.user;
      console.log('userinfoooooo', this.user);
    });
  }
  onLogoutClick()
  {
    this._service.logout();
    this._router.navigate(['home']);
    return false;
  }

  onMovetoSignup(){
    this._router.navigate(['/signup']);
  }
  onMovetoDashboard(){
    this._router.navigate(['/dashboard']);
  }
  onMovetoProbability(){
    this._router.navigate(['/probabiltyresult']);
  }
  onMovetohome(){
    this._router.navigate(['/home']);
  }
  onMovetofilter(templatelogin){
    // if(!this._service.loggedIn()){
      this._router.navigate(['/filterpage/'+this._indexservice.current_page+'/'+this._indexservice.countryselected_filter+'/'+this._indexservice.programlevel_checkid+'/'+this._indexservice.programsearchfilter+'/'+this._indexservice.universitysearch_home_text+'/'+this._indexservice.examscore_selected_filter]);
    // }else{
    //   this._service.openModallogin(templatelogin);
    // }

  }
}
