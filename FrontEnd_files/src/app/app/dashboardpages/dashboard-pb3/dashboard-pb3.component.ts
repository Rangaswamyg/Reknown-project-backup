import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray,FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProbabilityService } from '../../services/probability.service';
@Component({
  selector: 'app-dashboard-pb3',
  templateUrl: './dashboard-pb3.component.html',
  styleUrls: ['./dashboard-pb3.component.css']
})
export class DashboardPb3Component implements OnInit {
  form: FormGroup;
  submitted=false;
  buttonSel:any;
  duration=['1month','2months','3months','6months','1year','2years']
  coursespecialization:String;
  duration_of_study:String;
  certifiedcourse: String;
  duration_of_study_other: String;
  certifications:String;
  added_p_b=[];
  spcMsg:any;
  event = [
    { id: '1', name: 'Yes' },
    { id: '2', name: 'No' }
   ]
  constructor(public _probabilityService:ProbabilityService,private formBuilder: FormBuilder, private _router: Router) {
    this.form = this.formBuilder.group({
      diplomacertification: this.formBuilder.array([ this.initdiplomacertification()]),
      othercertification: this.formBuilder.array([this.initothercertification()]),
      certifications:['',[Validators.required]]
    });
   }

  ngOnInit() {
   
  }
  get f() { return this.form.controls; }

  onRegisterSubmit(){
    this.submitted=true;
    if (this.form.invalid) {
      return;
  }
    this._probabilityService.fourthinfo = {
      "certificates":{
      diplomacertification: this.form.get('diplomacertification').value,
      othercertification: this.form.get('othercertification').value,
      certifications:this.form.get('certifications').value
    }
    }
    this._probabilityService.probability_input_data.push(this._probabilityService.fourthinfo);
   console.log("fourthObj",this._probabilityService.probability_input_data);
  //  if(this._probabilityService.profile_building_progress_arr.length==0 || this._probabilityService.profile_building_progress_arr.indexOf("thirdpage")<0){
  //   this._probabilityService.profile_building_progress_arr.push("thirdpage");
  //   this._probabilityService.profile_building_progress+=16.6;

  // }
  
  // console.log("progressbar %%%%%%%%%%%%%%%%%%%%%%%%%%%%",  this._probabilityService.profile_building_progress_arr);

     this._router.navigate(['/dashboardPb4']);

  }
  getValue(buttonObj){
    if(this._probabilityService.profile_building_progress_arr.length==0 || this._probabilityService.profile_building_progress_arr.indexOf("thirdObj1")<0){
      this._probabilityService.progress_percent+=3.5;
      this._probabilityService.profile_building_progress+=1.5;
      this._probabilityService.profile_building_progress_arr.push("thirdObj1");
    }
    this.buttonSel=buttonObj;
    // console.log("Selected value",this.buttonSel)
  }
  getDur(){
    if(!this.coursespecialization){
      this.spcMsg="enter course name"
    }
  }
  onchangeDropdownDuration(durObj){
    if(this._probabilityService.profile_building_progress_arr.length==0 || this._probabilityService.profile_building_progress_arr.indexOf("thirdObj5")<0){
      this._probabilityService.progress_percent+=3.5;
      this._probabilityService.profile_building_progress+=1.5;
      this._probabilityService.profile_building_progress_arr.push("thirdObj5");
    }
    this.duration_of_study=durObj;
    // console.log("dbshfds",this.duration_of_study)
  }
  onchangeDropdownDuration1(durObj){
    if(this._probabilityService.profile_building_progress_arr.length==0 || this._probabilityService.profile_building_progress_arr.indexOf("thirdObj4")<0){
      this._probabilityService.progress_percent+=3.5;
      this._probabilityService.profile_building_progress+=1.5;
      this._probabilityService.profile_building_progress_arr.push("thirdObj4");
    }
      this.duration_of_study_other=durObj;
    // console.log("dbshfds",this.duration_of_study_other)
  }
  getCourspec(certObj){
    if(this._probabilityService.profile_building_progress_arr.length==0 || this._probabilityService.profile_building_progress_arr.indexOf("thirdObj3")<0){
      this._probabilityService.progress_percent+=3.5;
      this._probabilityService.profile_building_progress+=1.5;
      this._probabilityService.profile_building_progress_arr.push("thirdObj3");
    }
    if(this.form.get('coursespecialization').value){
      this.spcMsg=''  
    }
  }

  getCertified(certObj1){
    if(this._probabilityService.profile_building_progress_arr.length==0 || this._probabilityService.profile_building_progress_arr.indexOf("thirdObj2")<0){
      this._probabilityService.progress_percent+=3.5;
      this._probabilityService.profile_building_progress+=1.5;
      this._probabilityService.profile_building_progress_arr.push("thirdObj2");
    }  
  }
  initdiplomacertification(){
   return this.formBuilder.group({
    coursespecialization:'',
    duration_of_study:''
   });
  }
  initothercertification(){
    return this.formBuilder.group({
      certifiedcourse:'',
      duration_of_study_other:''
    });
  }
  addDiplomacertification(){
    const control =<FormArray>this.form.controls['diplomacertification'];
    control.push(this.initdiplomacertification());
  }
  removeDiplomacertification(i : number){
   const control = <FormArray>this.form.controls['diplomacertification'];
   control.removeAt(i);

  }
  addOthercertification(){
    const control =<FormArray>this.form.controls['othercertification'];
    control.push(this.initothercertification());
  }
  removeOthercertification(i : number){
    const control = <FormArray>this.form.controls['othercertification'];
    control.removeAt(i);
 
   }
  //  onMovenextPage(){
  //   this._router.navigate(['/fifthpage']);
  // }
  onBackprePage(){
    this._router.navigate(['/dashboardPb2']);

  }
}
