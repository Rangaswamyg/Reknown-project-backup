import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray,FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProbabilityService } from '../../services/probability.service';

@Component({
  selector: 'app-eighthpage',
  templateUrl: './eighthpage.component.html',
  styleUrls: ['./eighthpage.component.css']
})
export class EighthpageComponent implements OnInit {
  form: FormGroup;
  constructor(public _probabilityService:ProbabilityService,private formBuilder: FormBuilder, private _router: Router) { }
categories=[{id:1,name:'Sports'},
            {id:2,name:'Seminars'}]
level=['college','dirstic','state','national','international']
category:String;
activity:String;
des_activity:String;
added_p_b=[];

  ngOnInit() {
    this.form = this.formBuilder.group({
      extracurricularactivities:this.formBuilder.array([ this.initextracurricularactivities()])
    });
  }
  onSubmit(){
    this._probabilityService.eigthInfo={
      extracurricularactivities:this.form.get('extracurricularactivities').value,
      // activity:this.form.get('activity').value,
      // des_activity:this.form.get('des_activity').value
    }
    var u_one={extra_curr_activiteies:{sports:[],seminar:[]}}
    var oo=this._probabilityService.eigthInfo.extracurricularactivities;
    for (var i in oo){
      console.log('SELECTEDDDDDD',oo[i]);
      if(oo[i] && oo[i].category=="Sports"){
        u_one.extra_curr_activiteies["sports"].push({ac_level:oo[i].activity,desc:oo[i].des_activity});
      }else{
        u_one.extra_curr_activiteies["seminar"].push({ac_level:oo[i].activity,desc:oo[i].des_activity});

      }
    }
    this._probabilityService.probability_input_data_prob.push(u_one);
    console.log("INFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF", this._probabilityService.probability_input_data_prob)
    // this._probabilityService.probabilityInfoSubmit({profile_info:this._probabilityService.probability_input_data}).subscribe(data=>{
    //   this._probabilityService.result=data
    //   if(data){
    //     console.log("succes");
    //   }
    //   console.log(this._probabilityService.result);
    // })
    this._router.navigate(['/lastpage']);

    
  }
  onchangedropdownActivity(levelObj){
    if(this.added_p_b.indexOf("Obj1")<0){
      this._probabilityService.progress_percent+=8.3;

      this.added_p_b.push("Obj1");
    } 
    this.activity=levelObj;
  }
  onchangedropdownCategory(catObj){
    if(this.added_p_b.indexOf("Obj2")<0){
      this._probabilityService.progress_percent+=8.3;

      this.added_p_b.push("Obj2");
    } 
    this.category=catObj;
  }
  initextracurricularactivities(){
    return this.formBuilder.group({
      category:[null,[Validators.required]],
      activity:[null,[Validators.required]],
      des_activity:[null,[Validators.required]],
    });
  }
  addextracurricularinfo(){
    const control = <FormArray>this.form.controls['extracurricularactivities'];
    control.push(this.initextracurricularactivities());
}
  removeextracurricularinfo(i : number){
    const control = <FormArray>this.form.controls['extracurricularactivities'];
    control.removeAt(i);
  }
  // onMovenextPage(){
  //   this._router.navigate(['/lastpage']);
  // }
  onBackprePage(){
    this._router.navigate(['/fifthpage']);
  }
}
