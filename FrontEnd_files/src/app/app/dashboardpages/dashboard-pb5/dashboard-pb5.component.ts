import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray,FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProbabilityService } from '../../services/probability.service';
@Component({
  selector: 'app-dashboard-pb5',
  templateUrl: './dashboard-pb5.component.html',
  styleUrls: ['./dashboard-pb5.component.css']
})
export class DashboardPb5Component implements OnInit {
  form: FormGroup;
  exams=[{id:'1',name:'GRE',scores:120},{id:'2',name:'GMAT',scores:18},{id:'3',name:'SAT',scores:300}
  ,{id:'4',name:'TOEFL',scores:12},{id:'5', name:'IELTS',scores:8}]
  num_attempt=[1,2,3,4]
  Ref_info=['Email','Letter','Call']
  exam:String;
  score:String;
  noa:String;
  name:String;
  designation:String;
  via:String;
  added_p_b=[];

  constructor(public _probabilityService:ProbabilityService,private formBuilder: FormBuilder, private _router: Router) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      exam_score: this.formBuilder.array([ this.initexamscores()]),
      referees: this.formBuilder.array([this.initrefereesinfo()])
    });
  }

  onRegisterSubmit(){
    this._probabilityService.fifthinfo = {
      "exam_scores_and_recommondation":{
      exam_score: this.form.get('exam_score').value,
      referees: this.form.get('referees').value,
      // number_of_attempts: this.form.get('number_of_attempts').value,
      // name: this.form.get('name').value,
      // designation: this.form.get('designation').value,
      // referredvia: this.form.get('referredvia').value
    }
    }
    this._probabilityService.probability_input_data.push(this._probabilityService.fifthinfo)
    console.log("Seventhpage",this._probabilityService.probability_input_data)
    // if(this._probabilityService.profile_building_progress_arr.length==0 ||this._probabilityService.profile_building_progress_arr.indexOf("fifthpage")<0){
    //   this._probabilityService.profile_building_progress_arr.push("fifthpage");
    //   this._probabilityService.profile_building_progress+=16.6;

    // }
  
    this._router.navigate(['/dashboardPb6']);

  }

  onchangeDropdownScore(scoreObj){
    if(this._probabilityService.profile_building_progress_arr.length==0 ||this._probabilityService.profile_building_progress_arr.indexOf("fifthObj1")<0){
      this._probabilityService.progress_percent+=6;
      this._probabilityService.profile_building_progress+=2;
      this._probabilityService.profile_building_progress_arr.push("fifthObj1");
    } 
    this.score=scoreObj
  }
  onchangeDropdownExam(examObj){
    if(this._probabilityService.profile_building_progress_arr.length==0 ||this._probabilityService.profile_building_progress_arr.indexOf("fifthObj2")<0){
      this._probabilityService.progress_percent+=6;
      this._probabilityService.profile_building_progress+=2;
      this._probabilityService.profile_building_progress_arr.push("fifthObj2");
    } 
    this.exam=examObj;
  }
  onchangeDropdownAttempt(attemptObj){
    // if(this.added_p_b.indexOf("Obj3")<0){
    //   this._probabilityService.progress_percent+=4.2;

    //   this.added_p_b.push("Obj3");
    // } 
    this.noa=attemptObj
  }
  onchangeDropdownRef(refObj){
    if(this._probabilityService.profile_building_progress_arr.length==0 ||this._probabilityService.profile_building_progress_arr.indexOf("fifthObj3")<0){
      this._probabilityService.progress_percent+=6;
      this._probabilityService.profile_building_progress+=2;
      this._probabilityService.profile_building_progress_arr.push("fifthObj3");
    } 
    this.via=refObj
  }
  initexamscores(){
    return this.formBuilder.group({
      exam:[null,[Validators.required]],
      score:[null,[Validators.required]],
      noa:[null,[Validators.required]]
     });
  }
  initrefereesinfo(){
    return this.formBuilder.group({
      name:[null,[Validators.required]],
      designation:[null,[Validators.required]],
      via:[null,[Validators.required]]
     });
  }

  addexamscoresinfo(){
    const control =<FormArray>this.form.controls['exam_score'];
    control.push(this.initexamscores());
  }
  removeexamscoresinfo(i : number){
   const control = <FormArray>this.form.controls['exam_score'];
   control.removeAt(i);

  }
  addrefereesinfo(){
    const control =<FormArray>this.form.controls['referees'];
    control.push(this.initrefereesinfo());
  }
  removerefereesinfo(i : number){
    const control = <FormArray>this.form.controls['referees'];
    control.removeAt(i);
   }
  //  onMovenextPage(){
  //   this._router.navigate(['/eighthpage']);
  // }
onBackprePage(){
  this._router.navigate(['/dashboardPb4']);
}

}
