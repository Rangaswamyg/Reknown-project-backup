import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray,FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProbabilityService } from '../../services/probability.service';

@Component({
  selector: 'app-dashboard-pb4',
  templateUrl: './dashboard-pb4.component.html',
  styleUrls: ['./dashboard-pb4.component.css']
})
export class DashboardPb4Component implements OnInit {

  form: FormGroup;
  internshipBox=false;
  added_p_b=[];

  currentWorks = [
    { id: '1', name: 'Yes' },
    { id: '2', name: 'No' }
   ]
   intern = [
    { id: '1', name: 'Yes' },
    { id: '2', name: 'No' }
   ]
   employmenttypes=['Contract','Permanent','Temporary']
   year=["1y","2y","3y","4y","5y","6y"]
   emp:String;
   title:String;
   type:String;
   exp:String;
   buttonSel:String;
   current_com:String;
   internstatus: String;
   intership: String;
   test=[];
  constructor(public _probabilityService:ProbabilityService,private formBuilder: FormBuilder, private _router: Router) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      internship_and_work:this.formBuilder.array([ this.initworkinformation()])
    });


  }
  onSubmit(){
    this.test = this.form.value.internship_and_work;


    console.log(this.test,"arpitttttttttttttttttttttttt")
    this._probabilityService.sixthinfo = {
      internship_and_work: this.form.get('internship_and_work').value,

    }
    this._probabilityService.probability_input_data.push(this._probabilityService.sixthinfo)
    console.log("Sixthpage",this._probabilityService.probability_input_data)
    // if(this._probabilityService.profile_building_progress_arr.length==0 ||this._probabilityService.profile_building_progress_arr.indexOf("fourthpage")<0){
    //   this._probabilityService.profile_building_progress_arr.push("fourthpage");
    //   this._probabilityService.profile_building_progress+=16.6;

    // }

    this._router.navigate(['/dashboardPb5']);


  }
  getValue(buttonObj){
    if(this._probabilityService.profile_building_progress_arr.length==0 ||this._probabilityService.profile_building_progress_arr.indexOf("fourthObj1")<0){
      this._probabilityService.progress_percent+=3.5;
      this._probabilityService.profile_building_progress+=1.5;
      this._probabilityService.profile_building_progress_arr.push("fourthObj1");
    }
    // console.log("selllllllll",buttonObj)
    this.buttonSel=buttonObj;
    // console.log("Selected value",this.buttonSel)
  }
  getEmplyoe(empObj){
    if(this._probabilityService.profile_building_progress_arr.length==0 ||this._probabilityService.profile_building_progress_arr.indexOf("fourthObj2")<0){
      this._probabilityService.progress_percent+=3.5;
      this._probabilityService.profile_building_progress+=1.5;
      this._probabilityService.profile_building_progress_arr.push("fourthObj2");
    }
  }
  getTitle(titleObj){
    if(this._probabilityService.profile_building_progress_arr.length==0 ||this._probabilityService.profile_building_progress_arr.indexOf("fourthObj3")<0){
      this._probabilityService.progress_percent+=3.5;
      this._probabilityService.profile_building_progress+=1.5;
      this._probabilityService.profile_building_progress_arr.push("fourthObj3");
    }
  }
  onchangedropdownExp(expObj){
    if(this._probabilityService.profile_building_progress_arr.length==0 ||this._probabilityService.profile_building_progress_arr.indexOf("fourthObj4")<0){
      this._probabilityService.progress_percent+=3.5;
      this._probabilityService.profile_building_progress+=1.5;
      this._probabilityService.profile_building_progress_arr.push("fourthObj4");
    }
    this.exp=expObj;
    // console.log("hsdafjs",this.exp);
  }
  onchangedropdownEvent(eventObj){
    if(this._probabilityService.profile_building_progress_arr.length==0 ||this._probabilityService.profile_building_progress_arr.indexOf("fourthObj5")<0){
      this._probabilityService.progress_percent+=3.5;
      this._probabilityService.profile_building_progress+=1.5;
      this._probabilityService.profile_building_progress_arr.push("fourthObj5");
    }
    this.type=eventObj;
    // console.log("Emp",this.type);
  }
  initworkinformation(){
    return this.formBuilder.group({
      emp:[null,[Validators.required]],
      title:[null,[Validators.required]],
      type:[null,[Validators.required]],
      exp:[null,[Validators.required]],
      current_com:[null,[Validators.required]],
      internstatus:[null,[Validators.required]],
      intership:[null,[Validators.required]]
    });
  }
get f()
{
  return this.form.controls
}
  addworkinfo(){
    const control = <FormArray>this.form.controls['internship_and_work'];

    control.push(this.initworkinformation());

  }
  removeworkinfo(i : number){
    const control = <FormArray>this.form.controls['internship_and_work'];
    control.removeAt(i);
  }
  // onMovenextPage(){
  //   this._router.navigate(['/seventhpage']);
  // }
  onBackprePage(){
    this._router.navigate(['/dashboardPb3']);

  }

}
