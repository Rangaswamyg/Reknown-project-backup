import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray,FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProbabilityService } from '../../services/probability.service';

@Component({
  selector: 'app-fifthpage',
  templateUrl: './fifthpage.component.html',
  styleUrls: ['./fifthpage.component.css']
})
export class FifthpageComponent implements OnInit {
  succ: String;
  buttonSel:any;
  PatentSel:any;
  form: FormGroup;
  title:String;
  purpose:String;
  projectDescription:String;
  conf_proj_status:String;
  event_status: String
  ev_name:String;
  type:String;
  event_level: String;
  eventDescription: String;
  patents_status: String;
  added_p_b=[];

  event = [
    { id: '1', name: 'Yes' },
    { id: '2', name: 'No' }
   ]
   patents = [
    { id: '1', name: 'Yes' },
    { id: '2', name: 'No' }
   ]
   event1 = [
    { id: '1', name: 'Attended this event' },
    { id: '2', name: 'Presented this event' }
   ]
   event_types=['ComputerScience','Embedded Sytem','Finance','Marketing']
   event_levels=['super','good','average','normal']
  project_purpose=['Education','ecommerce','power conservation','Retail']
 public enableInput=false;
    constructor(public _probabilityService:ProbabilityService,private formBuilder: FormBuilder, private _router: Router) { }
  
    ngOnInit() {
      this.form = this.formBuilder.group({
        patents_status: '',
        succ: '',
        conf_proj_status: '',
        projects: this.formBuilder.array([ this.initprojectdetails()]),
        conference: this.formBuilder.array([this.initeventInformation()])
      });
      
    }
    // onClick(eventInfo){
    //   console.log("hfdskjhf",eventInfo)
    //    if(eventInfo.name=='yes'){
    //   this.enableInput=!this.enableInput;
    // }else{
    //   this.enableInput=this.enableInput;
    // }
    // }
    onSubmit(){
      this._probabilityService.fifthinfo = {
        "projects_and_info":{
        "patents":{
        patents_status: this.form.get('patents_status').value,
        succ: this.form.get('succ').value
        },
        conference: this.form.get('conference').value,
        conf_proj_status: this.form.get('conf_proj_status').value,
        projects: this.form.get('projects').value,
       
      }
      }
       this._probabilityService.probability_input_data_prob.push(this._probabilityService.fifthinfo);
       console.log("INFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF", this._probabilityService.probability_input_data_prob)
      //  this._probabilityService.probabilityInfoSubmit(this._probabilityService.probability_input_data).subscribe(data=>{
      //    this._probabilityService.result=data
      //    if(data){
      //      console.log("succes");
      //    }
      //    console.log(this._probabilityService.result);
      //  })
       this._router.navigate(['/eighthpage']);
      
    }
    getValue(buttonObj){
     
      // console.log("selllllllll",buttonObj)
      this.buttonSel=buttonObj;
      // console.log("Selected value",this.buttonSel)
    }
    getPurpose(purObj){
      if(this.added_p_b.indexOf("Obj5")<0){
        this._probabilityService.progress_percent+=8.3;
  
        this.added_p_b.push("Obj5");
      } 
    }
    getEventname(eventObj){
      if(this.added_p_b.indexOf("Obj6")<0){
        this._probabilityService.progress_percent+=8.3;
  
        this.added_p_b.push("Obj6");
      } 
    }
    getPatentValue(patentObj){
      if(this.added_p_b.indexOf("Obj1")<0){
        this._probabilityService.progress_percent+=8.3;
  
        this.added_p_b.push("Obj1");
      }  
    this.PatentSel=patentObj;
  }
    onchangeDropdownPurpose(projObj){
      if(this.added_p_b.indexOf("Obj2")<0){
        this._probabilityService.progress_percent+=8.3;
  
        this.added_p_b.push("Obj2");
      } 
      this.purpose=projObj;
    }
    onchangeDropdownLevel(levelObj){
      if(this.added_p_b.indexOf("Obj3")<0){
        this._probabilityService.progress_percent+=8.3;
  
        this.added_p_b.push("Obj3");
      } 
      this.event_level=levelObj;
    }
    onchangeDropdownEvent(eventObj){
      if(this.added_p_b.indexOf("Obj4")<0){
        this._probabilityService.progress_percent+=8.3;
  
        this.added_p_b.push("Obj4");
      } 
      this.type=eventObj;
    }
    initprojectdetails(){
     return this.formBuilder.group({
      title:'',
      purpose:'',
      projectDescription:''

     });
    }
    initeventInformation(){
      return this.formBuilder.group({
        ev_name:'',
        type:'',
        event_level:'',
        eventDescription:'',
        event_status: '',
      });
    }
    addProjectdetails(){
      const control =<FormArray>this.form.controls['projects'];
      control.push(this.initprojectdetails());
    }
    removeProjectdetails(i : number){
     const control = <FormArray>this.form.controls['projects'];
     control.removeAt(i);

    }
    addeventInformation(){
      const control =<FormArray>this.form.controls['conference'];
      control.push(this.initeventInformation());
    }
    removeeventInformation(i : number){
      const control = <FormArray>this.form.controls['conference'];
      control.removeAt(i);
   
     }
    //  onMovenextPage(){
    //   this._router.navigate(['/sixthpage']);
    // }
    onBackprePage(){
      this._router.navigate(['/firstpage']);
    }
    
}
