import { Component, OnInit,TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray,FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { MustMatch } from '../services/must-match.validator';
import { ProbabilityService } from '../services/probability.service';

declare var $: any;
declare var $scope: any;
declare var angular: any;

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'] 
})
export class SignupComponent implements OnInit {

  //dropdown array
  countrydetails_signup: Array<any> =[];
  city_signup=[];
  currenteducation: Array<any> = [];
  //  checkbox array
  future_years =[{id:11,year:'2019'},{id:12,year:'2020'},{id:13,year:'Later'}]
  program_levels =[{id:1,level:'Bachelors'},{id:2,level:'Masters'},{id:3,level:'Phd'}]
    options=['Email','Facebook','Tweeter','Advertisement','Youtube','Blogs','Person','Others']
  form: FormGroup;
  otpform: FormGroup;
  submitted = false;
  message;
  messageClass;
    reach_website:String;
  firstname: String;
  lastname: String;
  email: String;
  password: String;
  cnfpassword: String;
  current_country : String;
  current_city: String;
  country_code: String;
  mobilenumber: Number;
  qualification: String;
  specialization: String;
  future_year: String;
  preferred_country: String;
  program_level: String;
  area_interest: String;
  future_specialization: String;
  privacypolicy_termscondition: Boolean;
  agreement_info: Boolean;
  modalRef: BsModalRef;
  specMsg:any;
  specializations = [];
  constructor(public _probabilityService: ProbabilityService,private route: ActivatedRoute,private modalService: BsModalService,public _service: UserService,private formBuilder: FormBuilder, private _router: Router) {

    this.form = this.formBuilder.group({
      program_level: [null, [Validators.required]],
      future_year: [null, [Validators.required]],
      firstname: [null, [Validators.required]],
      lastname: [null, [Validators.required]],
      email: [null, [Validators.required,Validators.email]],
      // Password Input
      password: [null, Validators.compose([
        Validators.required, // Field is required
        Validators.minLength(8), // Minimum length is 8 characters
        Validators.maxLength(35), // Maximum length is 35 characters
       // this.validatePassword // Custom validation
      ])],
      cnfpassword: [null,[Validators.required]],
      current_country:[null,[Validators.required]],
      current_city: [null, [Validators.required]],
      country_code: [null, [Validators.required]],
      mobilenumber: ['', Validators.compose([
        Validators.required, // Field is required
        Validators.minLength(10),
        Validators.maxLength(10),
      ])],
      qualification: [null, [Validators.required]],
      specialization: [null, [Validators.required]],
      preferred_country: [null, [Validators.required]],
      area_interest: [null, [Validators.required]],
      future_specialization: [null, [Validators.required]],
      privacypolicy_termscondition: [null, [Validators.required]],
      agreement_info: [null, [Validators.required]],
        reach_website:[null,[Validators.required]]
    },{
      validator: MustMatch('password', 'cnfpassword')
    });


    
  }
 
  ngOnInit() {
  //  get service
     // this.getcity();
      this.geteducationdetail();
      this.getcountrydetails();

  }

  get f() { return this.form.controls; }

    // qualification
    geteducationdetail(){
      this._probabilityService.generalCourse().subscribe(data=>{
        this.currenteducation=data;
        console.log("eduuuuuuu",this.currenteducation);
      });
    }
  

  //  countrycode,country name, city name
    getcountrydetails(){
     this._service.getcountrydata().subscribe(data=>{
     this.countrydetails_signup = data;
    // this.city_signup = data[0]['cities']
    console.log('countrydetails', this.city_signup)
     });
    }

// qualification
OnchangeQualification(newlevelObj){
  this.qualification = newlevelObj;
  if(this.qualification){
    this.specMsg=''
  }
  console.log('selected quali',this.qualification);
  for (var item of this.currenteducation) {
    if (item._id == this.qualification) {
      this.specializations = Object.keys(item);
      this.specializations.splice(0, 1);
      console.log("specialization", this.specializations);
    }
    // else if(item._id != this.qualification){
    //   this.specializations = [];
    // }
  }

}

    onchangeselectedcountry(newcountry){
      console.log(newcountry);
      this.current_country = newcountry;
      console.log('selected country', this.current_country);
      for(var i in this.countrydetails_signup){
       // console.log(i, this.current_country,this.countrydetails_signup[i]['name']);
        if(this.countrydetails_signup[i]['name'] == this.current_country){
         this.city_signup = this.countrydetails_signup[i]['cities']
         console.log(this.city_signup);
         break;
        }
      }
    }
   
  onRegisterSubmit(template)
  {
    
     const user ={
      firstname: this.form.get('firstname').value,
      lastname: this.form.get('lastname').value,
      email: this.form.get('email').value,
      password: this.form.get('password').value,
      cnfpassword: this.form.get('cnfpassword').value,
      current_country:this.form.get('current_country').value,
      current_city: this.form.get('current_city').value,
      country_code: this.form.get('country_code').value,
      mobilenumber: this.form.get('mobilenumber').value,
      qualification: this.form.get('qualification').value,
      specialization: this.form.get('specialization').value,
      future_year:this.form.get('future_year').value,
     // future_year: this.form.value.future_year.map((v, i) => v ? this.future_years[i].year : null).filter(v => v !== null),
      preferred_country: this.form.get('preferred_country').value,
      program_level: this.form.get('program_level').value,
      //program_level: this.form.value.program_level.map((v, i) => v ? this.program_levels[i].level : null).filter(v => v !== null),
      area_interest: this.form.get('area_interest').value,
      future_specialization: this.form.get('future_specialization').value,
      privacypolicy_termscondition: this.form.get('privacypolicy_termscondition').value,
      agreement_info: this.form.get('agreement_info').value,
         reach_website: this.form.get('reach_website').value
    }
     //Register User
    this.submitted = true; 

    if (this.form.invalid) {
       console.log("please fill all fields");
      return;
  }
     this._service.signupUser(user).subscribe(data =>{
      this._service.otpdata  = data;
      console.log("success",this._service.otpdata);
      this._service.openModal(template);
     // this.modalRef = this.modalService.show(template);
    });
  }
  
  
// mobile number validation
keyPress(event: any) {
  const pattern = /[0-9\+\-\ ]/;

  let inputChar = String.fromCharCode(event.charCode);
  if (event.keyCode != 8 && !pattern.test(inputChar)) {
    event.preventDefault();
  }
}


}
