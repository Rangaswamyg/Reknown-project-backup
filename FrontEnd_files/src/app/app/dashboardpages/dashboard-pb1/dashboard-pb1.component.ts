import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormArray,FormControl } from '@angular/forms';
import { ProbabilityService } from '../../services/probability.service';


@Component({
  selector: 'app-dashboard-pb1',
  templateUrl: './dashboard-pb1.component.html',
  styleUrls: ['./dashboard-pb1.component.css']
})
export class DashboardPb1Component implements OnInit {
  submitted = false;
  backlog_status = [
    { id: '1', name: 'Yes' },
    { id: '2', name: 'No' }
  ]
  university_reputations = ['Exemplary', 'Amazing', 'Superb', 'Good', 'Nice', 'Mediocre', 'Regular']
  number_of_Backlogs = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  form: FormGroup;
  button:any;
  showDropdown=false;
  indiaList = [];
  level: String;
  specialization: String;
  year_of_graduation: Number;
  grade: Number;
  academic_score: Number;
  status_backlog: String;
  backlogs: Number;
  university: String;
  specializations = [];
  added_p_b=[];
  backlogMsg:any;
  specMsg:any;
  gradeMsg:any;
  Year = [1990, 1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999, 2000,
    2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010,
    2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018];
  gradings = [5, 10, 100];
  constructor(private _router: Router, public _probabilityService: ProbabilityService, private formBuilder: FormBuilder) {
    //const controls = this.backlogs.map(c => new FormControl(false));
    this.form = this.formBuilder.group({
      level: ['', [Validators.required]],
      specialization: ['', [Validators.required]],
      year_of_graduation: ['', [Validators.required]],
      grade: ['', [Validators.required]],
      academic_score: ['', [Validators.required]],
      status_backlog: ['', [Validators.required]],
      backlogs: '',
      university: ['', [Validators.required]],
    })
  }
  ngOnInit() {
    this.getIndiaUniList();
    this.getGeneralCourse()
  }
  get f() { return this.form.controls; }

  getIndiaUniList() {
    this._probabilityService.getIndianUniversity().subscribe(data => {
      this.indiaList = data
      console.log("IndiaUniveersities", this.indiaList)
    })
  }


  onRegisterSubmit() {
    //  this._probabilityService.secondinfo = {
    //   level: this.form.get('level').value,
    //   specialization: this.form.get('specialization').value,
    //   year_of_graduation: this.form.get('year_of_graduation').value,
    //   grade: this.form.get('grade').value,
    //   academic_score: this.form.get('academic_score').value,
    //     backlog: this.form.get('backlog').value,
    //     backlogs: this.form.get('backlogs').value,
    //     university: this.form.get('university').value,

    //   }
    this.submitted=true;
    if (this.form.invalid) {
      return;
  }
    this._probabilityService.secondinfo = {
      "current_education_details": {
        level: this.form.get('level').value,
        specialization: this.form.get('specialization').value,
        year_of_graduation: this.form.get('year_of_graduation').value,
        grade: this.form.get('grade').value,
        academic_score: this.form.get('academic_score').value,
        status_backlog: this.form.get('status_backlog').value,
        backlogs: this.form.get('backlogs').value,
        university: this.form.get('university').value,

      }
    }
    this._probabilityService.probability_input_data.push(this._probabilityService.secondinfo)
    console.log("SecondPageObject", this._probabilityService.probability_input_data);
    // if(this._probabilityService.profile_building_progress_arr.length==0 || this._probabilityService.profile_building_progress_arr.indexOf("firstpage")<0){
    //   this._probabilityService.profile_building_progress_arr.push("firstpage");

    //   this._probabilityService.profile_building_progress+=16.6;

    // }
   
    this._router.navigate(['/dashboardPb2']);

  }

  getGeneralCourse() {
    this._probabilityService.generalCourse().subscribe(data => {
      this._probabilityService.generalCourseList = data;
      console.log("list of course", this._probabilityService.generalCourseList);
    })
  }
 
  getValue(Obj){
    if(this._probabilityService.profile_building_progress_arr.length==0 || this._probabilityService.profile_building_progress_arr.indexOf("obj1")<0){
      this._probabilityService.progress_percent+=3;
      this._probabilityService.profile_building_progress+=1

      this._probabilityService.profile_building_progress_arr.push("obj1");
    }
    this.button=Obj;
    if(this.button=='Yes'){
      this.backlogMsg= "select number of backlogs"
    }
    // console.log("selectedValue",Obj)
  }
  onchangeDropdownLevel(levelObj) {
    if(this._probabilityService.profile_building_progress_arr.length==0 || this._probabilityService.profile_building_progress_arr.indexOf("obj2")<0){
      this._probabilityService.progress_percent+=3;
      this._probabilityService.profile_building_progress+=1

      this._probabilityService.profile_building_progress_arr.push("obj2");
    }
    
    this.level = levelObj;
    if(this.level){
      this.specMsg=''
    }
    console.log("selecetd name", this.level);
    for (var item of this._probabilityService.generalCourseList) {
      if (item._id == this.level) {
        this.specializations = Object.keys(item);
        this.specializations.splice(0, 1);
        console.log("specialization", this.specializations);
      }
    }

  }
  getAcademic_score(){
  
    if(!this.grade){
      this.gradeMsg="select first grading"
    }
    
   
  }
  getSpcial(){
    console.log(this.level,"::::::::::::::::::::::");
    if(!this.level){
      this.specMsg="select the Level 1st"
    }
  }
  onchangeDropdownNumBacklog(numObj) {
    

    this.backlogs = numObj;
    if(this.backlogs){
      this.backlogMsg=' '
    }
  }
 
  onchangeDropdownSpec(specObj) {
    
    if(this._probabilityService.profile_building_progress_arr.length==0 || this._probabilityService.profile_building_progress_arr.indexOf("obj3")<0){
      this._probabilityService.progress_percent+=3;
      this._probabilityService.profile_building_progress+=1

      this._probabilityService.profile_building_progress_arr.push("obj3");
    }

    console.log(specObj);
    this.specialization = specObj;
    console.log("selecetd name", this.specialization);
  }
  onchangeDropdownYear(yrObj) {
    if(this._probabilityService.profile_building_progress_arr.length==0 || this._probabilityService.profile_building_progress_arr.indexOf("obj4")<0){
      this._probabilityService.progress_percent+=3;
      this._probabilityService.profile_building_progress+=1

      this._probabilityService.profile_building_progress_arr.push("obj4");
    }

    this.year_of_graduation = yrObj;
    console.log("selected yrrrrrrrr", this.year_of_graduation);
  }
  onchangeDropdownGrade(gradObj) {
    if(this._probabilityService.profile_building_progress_arr.length==0 || this._probabilityService.profile_building_progress_arr.indexOf("obj5")<0){
      this._probabilityService.progress_percent+=3;
      this._probabilityService.profile_building_progress+=1

      this._probabilityService.profile_building_progress_arr.push("obj5");
    }

    this.grade = gradObj;
    if(this.grade){
      this.gradeMsg=''
    }
    console.log("selected grdddddddd", this.grade);
  }
  unitoggleDropdown(){

    this.showDropdown=!this.showDropdown;
  }
  universityselectValue(uniObj,value){
    if(this._probabilityService.profile_building_progress_arr.length==0 || this._probabilityService.profile_building_progress_arr.indexOf("obj6")<0){
      this._probabilityService.progress_percent+=3;
      this._probabilityService.profile_building_progress+=1

      this._probabilityService.profile_building_progress_arr.push("obj6");
    }

    this.form.patchValue({"university":value});
   var val = uniObj;
    console.log("gfdsjfhjs",val.id);
  }
  getSearchValue(){
    return this.form.value.university;
  }
  // onMovenextPage(){
  //   this._router.navigate(['/thirdpage']);
  // }
  // onBackprePage() {
  //   this._router.navigate(['/dashboardPb1']);
  // }
}
