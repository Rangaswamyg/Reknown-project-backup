import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormArray,FormControl } from '@angular/forms';
import { ProbabilityService } from '../../services/probability.service';
// import {  FileUploader, FileSelectDirective } from 'ng2-file-upload/ng2-file-upload';
@Component({
  selector: 'app-dashboard-pb2',
  templateUrl: './dashboard-pb2.component.html',
  styleUrls: ['./dashboard-pb2.component.css']
})
export class DashboardPb2Component implements OnInit {
  syllabus=['CBSE','ICSE','State Board']
  Year=[1990,1991,1992,1993,1994,1995,1996,1997,1998,1999,
       2000,2001,2002,2003,2004,2005,2006,2007,2008,2009,2010,
       2011,2012,2013,2014,2015,2016,2017,2018];
gradings=[5,10,100];

form: FormGroup;
syllabus_name_12th: String;
syllabus_name_10th: String;
year_of_grad_12th: Number;
year_of_grad_10th: Number;
grading_12th: Number;
grading_10th: Number;
academic_score_12th: Number;
academic_score_10th: Number;
certifications: String;
added_p_b=[];
urls = new Array<string>();
certificate:File;
submitted = false;
gradeMsg12th:any;
gradeMsg10th:any;
//uploader:FileUploader = new FileUploader({url:'uri'});
attachmentList:any = [];

public formData = null;
 constructor(private _router: Router,private formBuilder: FormBuilder,public _probabilityService:ProbabilityService) {
   this.form=this.formBuilder.group({
     syllabus_name_12th:['', [Validators.required]],
     syllabus_name_10th:['', [Validators.required]],
     year_of_grad_12th: ['', [Validators.required]],
     year_of_grad_10th:['', [Validators.required]],
     grading_12th:['', [Validators.required]],
     grading_10th:['', [Validators.required]],
     academic_score_12th:['', [Validators.required]],
     academic_score_10th:['', [Validators.required]],
   })
  }


 ngOnInit() {
//   this.uploader.onCompleteItem = (item:any, response:any , status:any, headers:any) => {
//     this.attachmentList.push(JSON.parse(response));
// }
  
 }
 get f() { return this.form.controls; }


 
 onRegisterSubmit(){
  this.submitted=true;
  if (this.form.invalid) {
    return;
}
   const thirdObj = {
     syllabus_name_12th: this.form.get('syllabus_name_12th').value,
     syllabus_name_10th: this.form.get('syllabus_name_10th').value,
     year_of_grad_12th: this.form.get('year_of_grad_12th').value,
     year_of_grad_10th: this.form.get('year_of_grad_10th').value,
     grading_12th: this.form.get('grading_12th').value,
     grading_10th: this.form.get('grading_10th').value,
     academic_score_12th: this.form.get('academic_score_12th').value,
     academic_score_10th: this.form.get('academic_score_10th').value,
   }
  // var thirdObj={
  // "high_school": {
  //    "tenth": {
  //        "edu_board":this._probabilityService.thirdinfo.syllabus_name_10th,
  //        "yog":this._probabilityService.thirdinfo.year_of_grad_10th,
  //        "grade":this._probabilityService.thirdinfo.grading_10th,
  //        "score": this._probabilityService.thirdinfo.academic_score_10th
  //    },
  //    "puc": {
  //        "edu_board": this._probabilityService.thirdinfo.syllabus_name_12th,
  //        "yog": this._probabilityService.thirdinfo.year_of_grad_12th,
  //        "grade": this._probabilityService.thirdinfo.grading_12th,
  //        "score": this._probabilityService.thirdinfo.academic_score_12th,
  //        "certificate":this._probabilityService.thirdinfo.certificate

  //    }
  //  }

//  }
   this._probabilityService.probability_input_data.push(thirdObj)
 console.log("hjdfhgjdshgsjdfnhjdhdjhdjh",this._probabilityService.probability_input_data);
//  if(this._probabilityService.profile_building_progress_arr.length ==0 || 
//   this._probabilityService.profile_building_progress_arr.indexOf("secondpage")<0){

//   this._probabilityService.profile_building_progress_arr.push("secondpage");
//   this._probabilityService.profile_building_progress+=16.6;

// }

// console.log("progressbar %%%%%%%%%%%%%%%%%%%%%%%%%%%%",  this._probabilityService.profile_building_progress_arr)
// this._probabilityService.probabilityInfoSubmit(this._probabilityService.probability_input_data).subscribe(data=>{
//   this._probabilityService.result=data
//   if(data){
//     console.log("succes");
//   }
//   console.log(this._probabilityService.result);
// });
   this._router.navigate(['/dashboardPb3']);

 }
 
 detectFiles(files: FileList) {
  this.urls = [];
  let formData = new FormData();
  for (let i = 0; i < files.length; i++) {
    console.log(files.item(i));

    let _files = files.item(i);
    console.log(_files);
 /*   this._probabilityService.postFile(_files).subscribe(res => {
        console.log(res); 
    });*/

    // formData.append('uploadedFiles', file, file.name);
  }

  // this._probabilityService.uploadRequiredFiles(formData).subscribe(res => {
  //   console.log(res); 
  // });
  // if (files) {
  //   for (let file of files) {
  //     let reader = new FileReader();
  //     reader.onload = (e: any) => {
  //       this.urls.push(e.target.result);
  //     }
  //     reader.readAsDataURL(file);
  //   }
  // }
}

 onchangeDropdownYear12th(yrObj){
  if(this._probabilityService.profile_building_progress_arr.length ==0 || 
     this._probabilityService.profile_building_progress_arr.indexOf("secondObj1")<0)
     {
    this._probabilityService.progress_percent+=3;
    this._probabilityService.profile_building_progress+=1
    this._probabilityService.profile_building_progress_arr.push("secondObj1");
     }
   this.year_of_grad_12th=yrObj;
   console.log("selected yrrrrrrrr",this.year_of_grad_12th);
     }
     getAcademic12th(){
       if(!this.grading_12th){
         this.gradeMsg12th="Select 12th grade 1st"
       }
     }
     getAcademic10th(){
      if(!this.grading_10th){
        this.gradeMsg10th="Select 10th grade 1st"
      }
     }
     onchangeDropdownGrade12th(gradObj){
      if(this._probabilityService.profile_building_progress_arr.length ==0 || 
        this._probabilityService.profile_building_progress_arr.indexOf("secondObj2")<0)
        {
       this._probabilityService.progress_percent+=3;
       this._probabilityService.profile_building_progress+=1
       this._probabilityService.profile_building_progress_arr.push("secondObj2");
        }
       this.grading_12th=gradObj;
       if(this.grading_12th){
        this.gradeMsg12th=""
      }
       console.log("selected grdddddddd",this.grading_12th);
     }
     onchangeDropdownSyllabus12th(sylObj){
      if(this._probabilityService.profile_building_progress_arr.length ==0 || 
        this._probabilityService.profile_building_progress_arr.indexOf("secondObj3")<0)
        {
       this._probabilityService.progress_percent+=3;
       this._probabilityService.profile_building_progress+=1
       this._probabilityService.profile_building_progress_arr.push("secondObj3");
        }
       this.syllabus_name_12th=sylObj;
       console.log("selected grdddddddd",this.syllabus_name_12th);
     }
     onchangeDropdownYear10th(yrObj){
      if(this._probabilityService.profile_building_progress_arr.length ==0 || 
        this._probabilityService.profile_building_progress_arr.indexOf("secondObj4")<0)
        {
       this._probabilityService.progress_percent+=3;
       this._probabilityService.profile_building_progress+=1
       this._probabilityService.profile_building_progress_arr.push("secondObj4");
        }

       this.year_of_grad_10th=yrObj;
       console.log("selected yrrrrrrrr",this.year_of_grad_10th);
         }
         onchangeDropdownGrade10th(gradObj){
          if(this._probabilityService.profile_building_progress_arr.length ==0 || 
            this._probabilityService.profile_building_progress_arr.indexOf("secondObj5")<0)
            {
           this._probabilityService.progress_percent+=3;
           this._probabilityService.profile_building_progress+=1
           this._probabilityService.profile_building_progress_arr.push("secondObj5");
            }
           this.grading_10th=gradObj;
           if(this.grading_10th){
            this.gradeMsg10th=" "
          }
           console.log("selected grdddddddd",this.grading_10th);
         }
         onchangeDropdownSyllabus10th(sylObj){
          if(this._probabilityService.profile_building_progress_arr.length ==0 || 
            this._probabilityService.profile_building_progress_arr.indexOf("secondObj6")<0)
            {
           this._probabilityService.progress_percent+=3;
           this._probabilityService.profile_building_progress+=1
           this._probabilityService.profile_building_progress_arr.push("secondObj6");
            }
           this.syllabus_name_10th=sylObj;
           console.log("selected grdddddddd",this.syllabus_name_10th);
         }

 // onMovenextPage(){
 //   this._router.navigate(['/fourthpage']);
 // }
onBackprePage(){
 this._router.navigate(['/dashboardPb1']);
}
}
