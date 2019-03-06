import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { FormBuilder, FormGroup, Validators, FormArray,FormControl } from '@angular/forms';
import { ProbabilityService } from '../../services/probability.service';
import { IndexService } from '../../services/index.service';
import { Http } from '@angular/http';
import { INTERNAL_BROWSER_PLATFORM_PROVIDERS } from '@angular/platform-browser/src/browser';

@Component({
  selector: 'app-dashboard-pb6',
  templateUrl: './dashboard-pb6.component.html',
  styleUrls: ['./dashboard-pb6.component.css']
})
export class DashboardPb6Component implements OnInit {
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
  submitted=false;
  plMsg:any;
  constructor(private http:Http,private _router:Router,public _indexService:IndexService,public _probabilityService: ProbabilityService,private formBuilder: FormBuilder) {
    //const controls = this.backlogs.map(c => new FormControl(false));
    
    this.form=this.formBuilder.group({
      // uni_f:[null],
      // uni_s:[null],
      start_at:['', [Validators.required]],
      pl:['', [Validators.required]],
      country:['', [Validators.required]],
      aoi:['', [Validators.required]],
     
    })
  }


  ngOnInit() {
    this.countryList();
    this.programsLevel();
  }
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
  // getUniversityList(cid,pl,sp){
  //   this._probabilityService.getUniversityListLevel(cid,pl,sp).subscribe(data=>{
  //    this.universitylist= data; 
  //   //  console.log("Uniiiiiiiiiiii",this.universitylist ,"uid",cid,"pl",pl,"sp",sp);
    
  //    for(var i in this.universitylist){
  //      var name_uni=this.universitylist[i]["university"][0]["name"];
  //     //  this.id_uni=this.universitylist[i]["university"][0]["id"]  
  //      if(this.unique_arr.indexOf(name_uni)==-1){
  //        this.unique_arr.push(this.universitylist[i]["university"][0]);
  //     //  console.log("Arrayyyyyyyy",this.unique_arr)
  //      }
  //    }
  //   //  for(var j in this.unique_arr){
  //   //   this.unique_arr_with_name.push(this.unique_arr[j])
  //   //   // console.log("ghghgjhj",this.unique_arr_with_name)
  //   //  }
  //   //  for(var jj in this.unique_arr){
  //   //   this.university_one.push(this.unique_arr[jj])
  //   //  }
  //    console.log("uniqueeeeee",this.unique_arr_with_name)
  //    })
  // }
  get f() { return this.form.controls; }

  onRegisterSubmit(){
    this.submitted=true;
    if (this.form.invalid) {
      return;
  }
     this._probabilityService.sixthinfo = {
       "future_education":{
      start_at: this.form.get('start_at').value,
      pl: this.form.get('pl').value,
      country: this.form.get('country').value,
      aoi: this.form.get('aoi').value,
      // uni_f: this.form.get('uni_f').value,
      // uni_s: this.form.get('uni_s').value,
      cid:this.conId,
      // uni_f_id:this.searchvalue ? this.searchvalue.id : '',
      // uni_s_id:this.val ? this.val.id : '',
      course_id:this.speId
    }
    }
    
     this._probabilityService.probability_input_data.push(this._probabilityService.sixthinfo)
    console.log("FIRSTPAGE",this._probabilityService.probability_input_data)
    // if(this._probabilityService.profile_building_progress_arr.length==0 || this._probabilityService.profile_building_progress_arr.indexOf("sixthpage")<0){
    //   this._probabilityService.profile_building_progress_arr.push("sixthpage");
    //   this._probabilityService.profile_building_progress+=16.6;
    // }

    this._probabilityService.shortlist_cid=this.conId;
    this._probabilityService.shortlist_level=this.levelSelect;
    this._probabilityService.shortlist_spe=this.aoi;
    this._indexService.specPageSelected=0
    this._indexService.scoreValue=0;
    this._router.navigate(['/dashboardpbinfo/'+ this.conId+'/'+this.levelSelect+'/'+this.aoi+'/'+0+ '/'+0]);

  }
      //changed_form={"university_name1":this.searchvalue.name,"university_name2":this.val.name2};


      getAoi(){
        if(!this.levelSelect){
          this.plMsg="select level 1st"
        }
      }

  onchangeDropdownCountry(conObj){
    this.country=conObj;
    if(this._probabilityService.profile_building_progress_arr.length==0 || this._probabilityService.profile_building_progress_arr.indexOf("sixthObj1")<0){
      this._probabilityService.progress_percent+=3;
      this._probabilityService.profile_building_progress+=1;
      this._probabilityService.profile_building_progress_arr.push("sixthObj1");
    }
    if(this.country){
      this.msg=''
    }
    console.log("contry",this.country);
    for(var item of this.countrylist){
      if(this.country==item._id.name)
      this.conId=item._id.id;
   
      console.log("hfdsjfhdjhfjfs",this.conId);
    }
   }
  //  add(obj){
  //    console.log("dsjfhjksdskfjfds",obj);
  //  }
  onchangeDropdownSpec(spcObj){
    if(this._probabilityService.profile_building_progress_arr.length==0 || this._probabilityService.profile_building_progress_arr.indexOf("sixthObj2")<0){
      this._probabilityService.progress_percent+=3;
      this._probabilityService.profile_building_progress+=1;
      this._probabilityService.profile_building_progress_arr.push("sixthObj2");
    }
    // console.log("fdskjafd",spcObj)

    var specialization=spcObj.split("/");
    this.aoi=specialization[0];
    console.log("contry",this.aoi);
    for(var itemSpe of this.specializationlist){
     
      if(this.aoi==itemSpe['records'][0].name)       
      this.speId=itemSpe["records"][0]["id"];
      console.log("specccccccccIdddddd",this.speId);
    }
    // this.getUniversityList(this.conId,this.levelSelect,this.speId);
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
    if(this._probabilityService.profile_building_progress_arr.length==0 || this._probabilityService.profile_building_progress_arr.indexOf("sixthObj3")<0){
      this._probabilityService.progress_percent+=3;
      this._probabilityService.profile_building_progress+=1;
      this._probabilityService.profile_building_progress_arr.push("sixthObj3");
    }

  }
  checkLevel(levelObj){
    if(this._probabilityService.profile_building_progress_arr.length==0 || this._probabilityService.profile_building_progress_arr.indexOf("sixthObj4")<0){
      this._probabilityService.progress_percent+=3;
      this._probabilityService.profile_building_progress+=1;
      this._probabilityService.profile_building_progress_arr.push("sixthObj4");
    }
    // console.log("PROBAaaaaaaa", this._probabilityService.progress_percent)
    this.levelSelect=levelObj;
    if(!this.country ){
      // document.getElementById("checkBoxId")=false
      this.msg="Select the country First"
    }
    if(this.levelSelect){
      this.plMsg=" "
    }
    // console.log("LevelSelected",this.levelSelect);
  //   const a=this.form.get('program_level').value
  //  console.log("levelllllllllll",a);
    this.getSpecialization(this.conId,this.levelSelect);
  }

  // contoggleDropdown(){
  //   this.showDropdown=!this.showDropdown;
  // }
  // universityselectValue(det,value){
  //   // if(this.added_p_b.indexOf("uni1")<0){
  //   //   this._probabilityService.progress_percent+=6;
  //   //   this._probabilityService.profile_building_progress+=2;

  //   //   this.added_p_b.push("uni1");
  //   // }

  //   this.form.patchValue({"uni_f":value});
  //   //this.showDropdown = false;
  //   this.searchvalue = det;
    
    
  //   console.log("Serach VAlueeeeeeeee",this.searchvalue.id);
 
  // }
  // unitoggleDropdown()
  // {
  //   this.showDropdown1=!this.showDropdown1;
  // }
  // second_universityselectValue(det,value){
  //   // if(this.added_p_b.indexOf("uni2")<0){
  //   //   this._probabilityService.progress_percent+=6;
  //   //   this._probabilityService.profile_building_progress+=2;

  //   //   this.added_p_b.push("uni2");
  //   // }
  //   this.form.patchValue({"uni_s":value});
  //  this.val = det;
  //   console.log("gfdsjfhjs",this.val.id);
  // }
  // getSearchValue(){
  //   return this.form.value.uni_f;
  // }
  // getSearchUniversityValue(){
   
  //   return this.form.value.uni_s;
  // }
  
  // onMovenextPage(){
  //   this._router.navigate(['/secondpage']);
  // }
  onBackprePage(){
    this._router.navigate(['/dashboardPb5']);
  }

}
