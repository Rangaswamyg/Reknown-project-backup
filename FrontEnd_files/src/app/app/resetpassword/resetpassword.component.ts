import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray,FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { MustMatch } from '../services/must-match.validator';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent implements OnInit {

  form: FormGroup;
  submitted = false;
  password: String;
  cnfpassword: String;
  url_eid: any;
  login_msg: any;
  messageClass;
  constructor(public _service: UserService,private formBuilder: FormBuilder, private _router: Router, private route:ActivatedRoute)
  {
    this.createForm();

   }

   createForm()
  {
    this.form = this.formBuilder.group({
     // Password Input
     password: [null, Validators.compose([
      Validators.required, // Field is required
      Validators.minLength(8), // Minimum length is 8 characters
      Validators.maxLength(35), // Maximum length is 35 characters
     // this.validatePassword // Custom validation
    ])],
    cnfpassword: [null,[Validators.required]],
    },{
      validator: MustMatch('password', 'cnfpassword')
    });
  }
  ngOnInit() {
    this.url_eid = this.route.snapshot.paramMap.get('email');

  }

  get f() { return this.form.controls; }
  onResetSubmit(templatelogin){
    const user = {
      password: this.form.get('password').value,
      cnfpassword: this.form.get('cnfpassword').value,

    }
    this.submitted = true;

   this._service.resetpassword(user,this.url_eid).subscribe(data=>{
     console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>",data);
     if(data.success==true){
       this.messageClass = 'alert alert-success'
       this.login_msg = data.message;
       this._service.openModallogin(templatelogin);
     }else{
       this.messageClass = 'alert alert-danger';
       this.login_msg = data.message;
     }
   });
  }
}
