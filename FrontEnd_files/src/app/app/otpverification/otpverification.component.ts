import { Component, OnInit,TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray,FormControl } from '@angular/forms';
import { UserService } from '../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

declare var $: any;

@Component({
  selector: 'app-otpverification',
  templateUrl: './otpverification.component.html',
  styleUrls: ['./otpverification.component.css']
})
export class OtpverificationComponent implements OnInit {

  form: FormGroup;
  message;
  messageClass;
  modalRef: BsModalRef;
  constructor(private modalService: BsModalService,private formBuilder: FormBuilder,public _service:UserService,private _router:Router) {
    this.form = this.formBuilder.group({
      otp_first:[null, [Validators.required]],
      otp_second:[null, [Validators.required]],
      otp_third:[null, [Validators.required]],
      otp_fourth:[null, [Validators.required]],
      otp_fifth:[null, [Validators.required]],
      otp_sixth:[null, [Validators.required]],

    });
  }

  ngOnInit() {
    // otp js
    
    // this.resendotp();
   
  }
  resendotp(){
    this._service.resendOtp_signup({resend_otp:1}).subscribe(data=>{
      this._service.resenduserotp = data;
      console.log("resendotppppp", this._service.resenduserotp);
    });
  }
 
  Onverifyotp(templatelogin){
    const otp_info={
      otp_first:this.form.get('otp_first').value,
      otp_second:this.form.get('otp_second').value,
      otp_third:this.form.get('otp_third').value,
      otp_fourth:this.form.get('otp_fourth').value,
      otp_fifth:this.form.get('otp_fifth').value,
      otp_sixth:this.form.get('otp_sixth').value,
    }
    var entered_otp=otp_info.otp_first+""+otp_info.otp_second+""+otp_info.otp_third+""+otp_info.otp_fourth+""+otp_info.otp_fifth
    +""+otp_info.otp_sixth;
    console.log(":::::::::::::",entered_otp,"::::::",this._service.otpdata.otp,":::::::::::::::::::::::::::::::::::");
    if(this._service.otpdata.otp.toString() === entered_otp.toString() || this._service.resenduserotp.otp.toString() === entered_otp.toString() ){
      //this._service.otp_verified =true;
      this._service.status_otp="verified";
      this.messageClass = 'alert alert-success';
      this.message = this._service.status_otp; // Set a success message
      setTimeout(() => {
        console.log("open loginnnnnnnnnnnnnnnnnnnnnnnnnnn")
        //this._service.otp_verified =true;
        this._service.openModallogin(templatelogin);
        this._service.modalRef.hide();
      // this._router.navigate(['/home']);

   },1000);
    }else{
      this._service.status_otp="invalid otp";
      this.messageClass = 'alert alert-danger';
      this.message = this._service.status_otp; // Set a success message

    }

  }
  
  

  // openModal(template: TemplateRef<any>) {
  //   this.modalRef = this.modalService.hide(template);
  // }

  // timer(remaining) {
  //   var m = Math.floor(remaining / 60);
  //    var s = remaining % 60;
    
    
  //   m = m < 10 ? '0' + m : m;
  //   s = s < 10 ? '0' + s : s;
  //   document.getElementById('timer').innerHTML = m + ':' + s;
  //   remaining -= 1;
    
  //   if(remaining >= 0 && this.timerOn) {
  //     setTimeout(function() {
  //         timer(remaining);
  //         console.log("checkingggggggg")
  //     }, 1000);
  //     return;
  //   }
  
  //   if(!this.timerOn) {
  //     // Do validate stuff here
  //     return;
  //   }
    
  //   // Do timeout stuff here
  //   alert('Timeout for otp');
  // }
 
  


}
