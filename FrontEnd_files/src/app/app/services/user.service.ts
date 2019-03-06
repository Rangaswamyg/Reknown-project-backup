import { Injectable ,TemplateRef} from '@angular/core';
import {Http,Headers,RequestOptions} from '@angular/http';
import 'rxjs/Rx';
import {Observable} from 'rxjs/Rx';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import {JwtHelperService} from '@auth0/angular-jwt';
declare var $: any;
const helper = new JwtHelperService();

/*
const decodedToken = helper.decodeToken(myRawToken);
const expirationDate = helper.getTokenExpirationDate(myRawToken);
const isExpired = helper.isTokenExpired(myRawToken);
*/

@Injectable({
  providedIn: 'root'
})
export class UserService {
  otpdata:any;
  otp_verified:boolean;
  status_otp:any;
  modalRef: BsModalRef;
  modalReflogin: BsModalRef;
  modalRefforgotpwd: BsModalRef;
  resenduserotp: any;
  // user tokens
  authToken: any;
  user: any;
  user_resendotp: any;
  token:any;
  options;
  userinfo:any;
  //signup_success: boolean;
  constructor(private http:Http,private modalService: BsModalService) { }
  //  get profile with token
  createAuthenticationHeaders(){
    this.loadToken();
    this.options = new RequestOptions({
      headers : new Headers({
        'Content-Type':'application/json',
        'Access-Control-Allow-Origin': '*',
        'authorization':this.authToken
      })
    });
  }
  // city and country code service
  city(){
    return this.http.get('http://localhost:8000/user/cities')
        .map(res=>res.json());
  }
  countrycode(){
    return this.http.get('http://localhost:8000/user/countrycode')
        .map(res=>res.json());
  }

  // qualification ad specialization service
  education()
  {
    return this.http.get('http://localhost:8000/user/test')
        .map(res=>res.json());
  }
  // Register service
  registerUser(user){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:8000/user/signup',user,{headers: headers})
        .map(res=>res.json());
  }

  // signup posting
  signupUser(user){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:8000/user/register',user,{headers: headers})
        .map(res=>res.json());
  }
  // login
  loginUser(user){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:8000/user/login',user,{headers: headers})
        .map(res=>res.json());
  }
  getcountrydata(){
    return this.http.get('http://localhost:8000/test/common_country_data')
        .map(res=>res.json());
  }

  // get profile
  getProfile()
  {
    this.createAuthenticationHeaders();
    return this.http.get('http://localhost:8000/user/profile',this.options)
        .map(res=>res.json());
  }

  storeUserData(token, user)
  {
    localStorage.setItem('id_token',token);
    localStorage.setItem('user',JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }
  loadToken()
  {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }
  loggedIn()
  {
    //  console.log("tokennnnnnnnnnnnnnnnnnnnn sattus ",helper.isTokenExpired(localStorage.getItem('id_token')))
    return helper.isTokenExpired(localStorage.getItem('id_token'));
  }

  logout()
  {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }
  resendOtp_signup(user_resendotp){
    let headers = new Headers();
    headers.append('Content-Type','application/json');

    return this.http.post('http://localhost:8000/user/resend_otp',user_resendotp,{headers: headers})
        .map(res=>res.json());
  }
  //  forgotpassword
  forgotpassword(user){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:8000/test/forgotPassword/',user,{headers: headers})
        .map(res=>res.json());
  }
  //resetoassword
  resetpassword(user,email){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:8000/test/resetPassword/'+email,user,{headers: headers})
        .map(res=>res.json());
  }
  getprobabilitydetails(){
     this.createAuthenticationHeaders();
    return this.http.get('http://localhost:8000/test/profile_building_status',this.options)
        .map(res=>res.json());
  }

  // openModal(template: TemplateRef<any>) {
  //   if(this.otpdata){
  //   this.modalRef = this.modalService.show(template);
  //   }
  //   else{
  //     console.log("its not posting");
  //   }
  // }
  // otp component
  openModal(template) {
    // if(this._service.otpdata){
    this.modalRef = this.modalService.show(template);
    // }
    // else{
    //   console.log("its not posting");
    // }
    $(function() {
      $(".otp").keyup(function(e) {
        if ((e.which >= 48 && e.which <= 57) || (e.which >= 96 && e.which <= 105)) {
          $(e.target).next('.otp').focus();
        } else if (e.which == 8) {
          $(e.target).prev('.otp').focus();
        }
      });
    });
  }

  // login component
  openModallogin(templatelogin) {
    //  if(this._service.otp_verified == true){
    this.modalReflogin = this.modalService.show(templatelogin);
    // }else{
    // console.log("otp not verified");
    //}
  }
  // forgotpassword
  openModalfp(templatefp) {
    //  if(this._service.otp_verified == true){
    this.modalRefforgotpwd = this.modalService.show(templatefp);
    // }else{
    // console.log("otp not verified");
    //}
  }
}
