import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { FormBuilder, FormGroup, Validators, FormArray,FormControl } from '@angular/forms';
import { ProbabilityService } from '../../services/probability.service';
import { IndexService } from '../../services/index.service';
import { Http } from '@angular/http';
import { INTERNAL_BROWSER_PLATFORM_PROVIDERS } from '@angular/platform-browser/src/browser';

@Component({
  selector: 'app-firstpage',
  templateUrl: './firstpage.component.html',
  styleUrls: ['./firstpage.component.css']
})
export class FirstpageComponent implements OnInit {
  unique_arr=[];
  id_uni:any;
  firstinfo:any;
  changed_form:{};
  university_one=[];
   unique_arr_with_name=[];
  searchvalue:any;
  val:any;
  showDropdown=false;
  showDropdown1=false;
  levelSelect:any;
  conId:any;
  speId:any;
  universitylist=[];
  specializationlist=[];
  countrylist=[];
  programlist=[];
  future_years =[{id:11,year:'2019'},{id:12,year:'2020'},{id:13,year:'Later'}]
  program_levels =[{id:1,level:'Bachelors'},{id:2,level:'Masters'},{id:3,level:'Phd'}]
  form: FormGroup;
  // form1: FormGroup;
  start_at: String;
  pl: String;
  country: String;
  aoi: String;
  msg:any;
  added_p_b=[];
  submitted= false;
  constructor(private http:Http,private _router:Router,public _indexService:IndexService,public _probabilityService: ProbabilityService,private formBuilder: FormBuilder) {
    //const controls = this.backlogs.map(c => new FormControl(false));
    
    this.form=this.formBuilder.group({
      uni_f:[null,[Validators.required]],
      // uni_s:[null,[Validators.required]],
     // start_at:['', [Validators.required]],
      pl:['', [Validators.required]],
      country:['', [Validators.required]],
      aoi:['', [Validators.required]],
     
    })
  }


  ngOnInit() {
    this.countryList();
    this.programsLevel();
  }
  get f() { return this.form.controls; }

  programsLevel(){
    this._indexService.programlevel().subscribe(data=>{
      this.programlist=data;
      console.log("dhsajdhsjhdfj",this.programlist);
    })
  }
  countryList(){
    this._probabilityService.getCountry().subscribe(data=>{
      this.countrylist=data;
      // console.log("CountryList",this.countrylist)
    })
  }
  getSpecialization(cid,pl){
   this._probabilityService.getSpecializationList(cid,pl).subscribe(data =>{
      this.specializationlist = data;
      console.log("Specialllllllllllllllll",this.specializationlist ,"uid",cid,"pl",pl);
    });
  }
  getUniversityList(cid,pl,sp){
    this._probabilityService.getUniversityListLevel(cid,pl,sp).subscribe(data=>{
     this.universitylist= data; 
    //  console.log("Uniiiiiiiiiiii",this.universitylist ,"uid",cid,"pl",pl,"sp",sp);
    
     for(var i in this.universitylist){
       var name_uni=this.universitylist[i]["university"][0]["name"];
      //  this.id_uni=this.universitylist[i]["university"][0]["id"]  
       if(this.unique_arr.indexOf(name_uni)==-1){
         this.unique_arr.push(this.universitylist[i]["university"][0]);
      //  console.log("Arrayyyyyyyy",this.unique_arr)
       }
     }
    //  for(var j in this.unique_arr){
    //   this.unique_arr_with_name.push(this.unique_arr[j])
    //   // console.log("ghghgjhj",this.unique_arr_with_name)
    //  }
    //  for(var jj in this.unique_arr){
    //   this.university_one.push(this.unique_arr[jj])
    //  }
     console.log("uniqueeeeee",this.unique_arr_with_name)
     })
  }
  onRegisterSubmit(){
     this._probabilityService.firstinfo = {
       "future_education":{
     // start_at: this.form.get('start_at').value,
      pl: this.form.get('pl').value,
      country: this.form.get('country').value,
      aoi: this.form.get('aoi').value,
      uni_f: this.form.get('uni_f').value,
      // uni_s: this.form.get('uni_s').value,
      cid:this.country,
      uni_f_id:this.searchvalue ? this.searchvalue.id : '',
      uni_s_id:this.val ? this.val.id : '',
      course_id:this.speId
    }
    }
    this.submitted = true; 

    if (this.form.invalid) {
       console.log("please fill all fields");
      return;
  }

     this._probabilityService.probability_input_data_prob.push(this._probabilityService.firstinfo);
    console.log("FIRSTPAGE",this._probabilityService.probability_input_data_prob);
    this._router.navigate(['/fifthpage']);

  }
  //changed_form={"university_name1":this.searchvalue.name,"university_name2":this.val.name2};




  onchangeDropdownCountry(conObj){
    this.country=conObj;
    if(this.added_p_b.indexOf("country")<0){
      this._probabilityService.progress_percent+=8.3;

      this.added_p_b.push("country");
    }
    if(this.country){
      this.msg=''
    }
    console.log("contry",this.country);
    for(var item of this.countrylist){
      if(this.country==item._id.name)
      this.conId=item._id.id;
      this._probabilityService.prob_countryId = this.conId;
      console.log("countryID",this._probabilityService.prob_countryId);

    }
   }
  //  add(obj){
  //    console.log("dsjfhjksdskfjfds",obj);
  //  }
  onchangeDropdownSpec(spcObj){
    if(this.added_p_b.indexOf("spec")<0){
      this._probabilityService.progress_percent+=8.3;

      this.added_p_b.push("spec");
    }
    // console.log("fdskjafd",spcObj)
    this.aoi=spcObj;
    console.log("contry",this.aoi);
    for(var itemSpe of this.specializationlist){
     
      if(this.aoi==itemSpe['records'][0].name)       
      this.speId=itemSpe["records"][0]["id"];
      console.log("specccccccccIdddddd",this.speId);
    }
    this.getUniversityList(this.conId,this.levelSelect,this.aoi);
  }
  // selectOption(uni1){
  //   this.university_name1=uni1;
  //   console.log("selectedUniversity",this.university_name1);
  // }
  // selectOption1(uni2){
  //   this.university_name2=uni2;
  //   console.log("selectedUniversity",this.university_name2);
  // }
  checkPlan(planObj){
    if(this.added_p_b.indexOf("plan")<0){
      this._probabilityService.progress_percent+=2.09;

      this.added_p_b.push("plan");
    }

  }
  checkLevel(levelObj){
    if(this.added_p_b.indexOf("pl")<0){
      this._probabilityService.progress_percent+=8.3 ;

      this.added_p_b.push("pl");
    }
    // console.log("PROBAaaaaaaa", this._probabilityService.progress_percent)
    this.levelSelect=levelObj;
    if(!this.country ){
      // document.getElementById("checkBoxId")=false
      this.msg="Select the country First"
    }
    
    // console.log("LevelSelected",this.levelSelect);
  //   const a=this.form.get('program_level').value
  //  console.log("levelllllllllll",a);
    this.getSpecialization(this.conId,this.levelSelect);
  }

  contoggleDropdown(){
    this.showDropdown=!this.showDropdown;
  }
  universityselectValue(det,value){
    if(this.added_p_b.indexOf("uni1")<0){
      this._probabilityService.progress_percent+=8.3;

      this.added_p_b.push("uni1");
    }

    this.form.patchValue({"uni_f":value});
    this.showDropdown = false;
    this.searchvalue = det;
    this._probabilityService.prob_uniId = this.searchvalue.id
    
    console.log("Uni_ID",this._probabilityService.prob_uniId);
 
  }
  unitoggleDropdown()
  {
    this.showDropdown1=!this.showDropdown1;
  }
  second_universityselectValue(det,value){
    if(this.added_p_b.indexOf("uni2")<0){
      this._probabilityService.progress_percent+=8.3;

      this.added_p_b.push("uni2");
    }
    this.form.patchValue({"uni_s":value});
   this.val = det;
    console.log("gfdsjfhjs",this.val.id);
  }
  getSearchValue(){
    return this.form.value.uni_f;
  }
  getSearchUniversityValue(){
   
    return this.form.value.uni_s;
  }
  
  // onMovenextPage(){
  //   this._router.navigate(['/secondpage']);
  // }
  onBackprePage(){
    this._router.navigate(['/dashboardtool']);
  }
}
