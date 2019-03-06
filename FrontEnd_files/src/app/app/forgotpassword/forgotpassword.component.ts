import { Component, OnInit } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup, Validators, FormArray,FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent implements OnInit {

  form: FormGroup;
  modalRef: BsModalRef;
  submitted = false;
  email:String;
  login_msg: any;
  messageClass;
  constructor(private modalService: BsModalService,private route: ActivatedRoute,public _service: UserService,private formBuilder: FormBuilder, private _router: Router)
  {
    this.createForm();
   }

   createForm()
  {
    this.form = this.formBuilder.group({
      email: [null, [Validators.required,Validators.email]],
    });
  }
  ngOnInit() {
  }

  get f() { return this.form.controls; }
  onForgotSubmit(){
    const user = {
      email: this.form.get('email').value,
    }
    this.submitted = true; 

    if (this.form.invalid) {
       console.log("please fill correct email");
      return;
  }

  this._service.forgotpassword(user).subscribe(data=>{
   if(data.success){
    this.messageClass = 'alert alert-success'
    this.login_msg =data['res'];
   }else{
    this.messageClass = 'alert alert-danger'
    console.log("cannot login");
    this.login_msg = data['res'];
   }
  });
  }

  Onmovetosignup(){
    this._router.navigate(['/signup']);
    this._service.modalRefforgotpwd.hide();
  }
}
