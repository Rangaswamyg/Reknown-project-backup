import { Component, OnInit,TemplateRef  } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup, Validators, FormArray,FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../services/user.service';

declare var $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  modalRef: BsModalRef;
  submitted = false;
  login_msg: any;
  messageClass;
  email:String;
  password:String;
  constructor(private modalService: BsModalService,private route: ActivatedRoute,public _service: UserService,private formBuilder: FormBuilder, private _router: Router)
  {
    this.createForm();
   }
  
   createForm()
  {
    this.form = this.formBuilder.group({
      email: [null, [Validators.required,Validators.email]],
      password: [null, Validators.compose([
        Validators.required, // Field is required
        Validators.minLength(8), // Minimum length is 8 characters
        Validators.maxLength(35), // Maximum length is 35 characters
       // this.validatePassword // Custom validation
      ])]
    });
  }
  ngOnInit() {
     // otp js
     
  }
  get f() { return this.form.controls; }

  onLoginSubmit(){
    const user = {
      email: this.form.get('email').value,
      password:this.form.get('password').value
    }
    this.submitted = true; 

    if (this.form.invalid) {
       console.log("please fill all fields");
      return;
  }
   // console.log(user);
    this._service.loginUser(user).subscribe(data=>{
      if(data.success){
        this.messageClass = 'alert alert-success'
        this.login_msg = data.message;
        this._service.storeUserData(data.token, data.user);
        setTimeout(() => {
          this._service.modalReflogin.hide();
          this._router.navigate(['/dashboard']);
        },1000);
      }else{
        this.messageClass = 'alert alert-danger'
        console.log("cannot login");
        this.login_msg = data.message;
      }
  //     this.login_msg = data.message;
  //     if(data){
  //     console.log("success:",this.login_msg);
  //     this._service.storeUserData(data.token, data.user);
  //    // console.log('user loggedIn')
  //     setTimeout(() => {
  //       this._service.modalReflogin.hide();
  //      this._router.navigate(['/home']);
  //  },5000);
  //     }
    });

  }

  // openModal(templatelogin: TemplateRef<any>) {
  //   if(this._service.otp_verified == true){
  //   this.modalRef = this.modalService.show(templatelogin);
  //   }else{
  //     console.log("otp not verified");
  //   }
    
  // }
  Onmovetosignup(){
    this._router.navigate(['/signup']);
    this._service.modalReflogin.hide();
  }
  Onmovetoforgotpassword(templatefp){
    this._service.modalReflogin.hide();
    // this._router.navigate(['/forgotpassword']);
    this._service.openModalfp(templatefp);
  }
}
