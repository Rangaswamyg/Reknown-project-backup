import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { IndexService } from '../services/index.service';
import { PaginationService } from '../services/pagination.service';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
declare var $: any;
declare var jQuery: any;

@Component({
  selector: 'app-filterpage',
  templateUrl: './filterpage.component.html',
  styleUrls: ['./filterpage.component.css']
})
export class FilterpageComponent implements OnInit {

  compBox: boolean = false;
  form: FormGroup;
  filterdata_count = { count: 0 };
  // checkbox
  program_levels = [];
  //  dropdown
  country_dropdown = [];

  selectedcountry = this.country_dropdown['Change Country'];
  countrydropdown_filter: any;
  checkedList: boolean[] = [];

  //  pagination
  // private allItems:any[];
  exam = [];
  examscore = [];
  examscoreData: any;
  selectedexamscore = this.examscore[''];
  sort = ["name"];
  sortBy = this.sort[''];
  programlist = [];
  programshowDropdown = false;
  // pager object
  pager: any = {};
    urluni='0';
    urlloc='0';
    urlcon='0';
  // paged items
  pagedItems: any[];

  countarr = [];
  url_currentpage_id: any;
  url_universityData: any;
  constructor(private pagerService: PaginationService, private _http: Http, private _fb: FormBuilder, private route: ActivatedRoute, private _router: Router, private http: HttpClient, public _indexservice: IndexService) {


  }


  ngOnInit() {
    this.form = this._fb.group({
      program_levels: this._fb.array([]),
      programsearch: [null]
    });
    
    this.url_currentpage_id = this.route.snapshot.paramMap.get('this._indexservice.current_page');
    this.url_universityData = this.route.snapshot.paramMap.get('this._indexservice.universitysearch_home_text');


    //sort by
    $('.dropdown-menu a').on('click', function () {
      $('.dropdownfa').html($(this).html());
    });
    // filter Js
    $('.dropdown-menu span').on('click', function () {
      $('.dropdownfa1').html($(this).html());
    });
    //   //filter 2
    $('.dropdown-menu p').on('click', function () {
      $('.dropdownfa2').html($(this).html());
    });
    //filter 3
    $('.dropdown-menu div').on('click', function () {
      $('.dropdownfa3').html($(this).html());
    });
    //filter 4
    $('.dropdown-menu option').on('click', function () {
      $('.dropdownfa4').html($(this).html());
    });

    // getcountryname
    this.getcountrynames();
    // get programlevel
    this.getprogramlevel();
    //  get courses service
    this.getcourseslist();
      // get all api service
      this.route.params.subscribe(params=>{
        var cid = params['this._indexservice.current_page'];
       var coid = params['this._indexservice.countryselected_filter'];
       var plid = params['this._indexservice.programlevel_checkid'];
       var courseid = params['this._indexservice.programsearchfilter'];
       var uniid = params['this._indexservice.universitysearch_home_text'];
       var examid = params['this._indexservice.examscore_selected_filter'];
       this.getallapi(cid,coid,plid,courseid,uniid,examid);
        //this.getcount(cid,coid,plid);
     });
     // allapi count service
     this.route.params.subscribe(params=>{
       var cid = params['this._indexservice.current_page'];
      var coid = params['this._indexservice.countryselected_filter'];
      var plid = params['this._indexservice.programlevel_checkid'];
      var courseid = params['this._indexservice.programsearchfilter'];
      var uniid = params['this._indexservice.universitysearch_home_text'];
      var examid = params['this._indexservice.examscore_selected_filter'];
     // this.getallapi(cid,coid,plid);
       this.getcount(cid,coid,plid,courseid,uniid,examid);
    });
    //this.getallapi();
    this.getexamservice();
    this.getpaginationid();

  }

  // getall data
  getallapi(cid,coid,plid,courseid,uniid,examid){
    this.http.get('http://localhost:8000/test/array/'+cid+'/'+coid+'/'+plid+'/'+courseid+'/'+uniid+'/'+examid).subscribe(data =>{
        this._indexservice.allItems = data;
        console.log('allitemdataaaass',this._indexservice.allItems, this._indexservice.current_page)
    });
  }

  // getcount
  getcount(cid,coid,plid,courseid,uniid,examid){
    console.log("get started countttttttttt");
    this._indexservice.universitysearch_home_text =this.url_universityData;
   if(this.countarr.length ==0 && (this._indexservice.countryselected_filter == 0 
    && this._indexservice.programlevel_checkid == 0 && this._indexservice.programsearchfilter == 0
     &&  this._indexservice.universitysearch_home_text == 0 && this._indexservice.examscore_selected_filter == 0)){
      console.log("still loadinggggggggg");

    this.http.get('http://localhost:8000/test/array/'+cid+'/'+coid+'/'+plid+'/'+courseid+'/'+uniid+'/'+examid+'/count').subscribe(data=>{
          this._indexservice.allItemscount =data[0]? data[0].count: 0;
          this._indexservice.current_page = this.url_currentpage_id;
          this.countarr.push(this._indexservice.allItemscount);
          console.log('allitemdataaaacount11111',this._indexservice.allItemscount,"countarr length",this.countarr.length)
      });
   }else {
     console.log("filter enteredddddddddddd")
   if(( this._indexservice.countryselected_filter !=0 || this.form.get('program_levels').value) ||
    this._indexservice.programsearchfilter != 0 || this._indexservice.universitysearch_home_text != 0 ||
    this._indexservice.examscore_selected_filter != 0 && this.countarr.length>=1 
    ){
    console.log("filter entereddddddddddddinsideee  ")
    let count =0;
         if(this.countarr["lev_arr"]){
          
          for(var i in this.form.get('program_levels').value){
               if(i.indexOf(this.countarr["lev_arr"])<0){
                 count++;
               }
          }
         }
       
         if(count >0 ||  (this.countarr["fil_arr"] && 
         this._indexservice.countryselected_filter != this.countarr["fil_arr"])||
         (this.countarr["course_arr"] && this._indexservice.programsearchfilter != this.countarr["course_arr"]) || 
         (this.countarr["uni_arr"] && this._indexservice.universitysearch_home_text != this.countarr["uni_arr"]) || 
         (this.countarr["exam_arr"] && this._indexservice.examscore_selected_filter != this.countarr["exam_arr"])){

          this.countarr["lev_arr"]=this.form.get('program_levels').value;
          this.countarr["fil_arr"]=this._indexservice.countryselected_filter;
          this.countarr["course_arr"]=this._indexservice.programsearchfilter;
          this.countarr["uni_arr"]= this._indexservice.universitysearch_home_text;
          this.countarr["exam_arr"]= this._indexservice.examscore_selected_filter;
          this.http.get('http://localhost:8000/test/array/'+cid+'/'+coid+'/'+plid+'/'+courseid+'/'+uniid+'/'+examid+'/count').subscribe(data =>{
            this._indexservice.allItemscount = data[0]? data[0].count: 0;
            this.countarr["count"]=this._indexservice.allItemscount;
            this._indexservice.current_page = this.url_currentpage_id;
          console.log('allitemdataaaacount1',this._indexservice.allItemscount,"countarr length",this.countarr.length)
        });
         }else if(!this.countarr["lev_arr"] || !this.countarr["fil_arr"] || !this.countarr["course_arr"] || !this.countarr["uni_arr"] || !this.countarr["exam_arr"]){
          this.countarr.push({"lev_arr":this.form.get('program_levels').value});
          this.countarr.push({"fil_arr":this._indexservice.countryselected_filter});
          this.countarr.push({"course_arr":this._indexservice.programsearchfilter});
          this.countarr.push({"uni_arr":this._indexservice.universitysearch_home_text});
          this.countarr.push({"exam_arr":this._indexservice.examscore_selected_filter});
          this.http.get('http://localhost:8000/test/array/'+cid+'/'+coid+'/'+plid+'/'+courseid+'/'+uniid+'/'+examid+'/count').subscribe(data =>{
            this._indexservice.allItemscount =data[0]? data[0].count: 0;
           this.countarr["count"]=this._indexservice.allItemscount;
           this._indexservice.current_page = this.url_currentpage_id;
                        console.log('allitemdataaaacount1',this._indexservice.allItemscount,"countarr length",this.countarr.length)
        });
         }
       }
     
     }
    }

    // with pagination hit api
  pageChanged(){
    console.log("pageChanged", this._indexservice.current_page);
    this._router.navigate(['/filterpage/'+this._indexservice.current_page+'/'+this._indexservice.countryselected_filter+'/'+this._indexservice.programlevel_checkid+'/'+this._indexservice.programsearchfilter+'/'+this._indexservice.universitysearch_home_text+'/'+this._indexservice.examscore_selected_filter]);
    
  }
  getpaginationid(){
    this._indexservice.current_page = this.url_currentpage_id;
}
// examscore api
getexamservice(){
  this._indexservice.getexamscore().subscribe(data =>{
    this.exam = data;
    var temp=(Object.keys(this.exam));
    temp.splice(0,1)
    this._indexservice.exam_Api= temp;
    console.log('exam',this._indexservice.exam_Api);
  });
}
 
  // get programlevel
  getprogramlevel(){
    this._indexservice.programlevel().subscribe(data=>{
      this.program_levels=data;
       console.log(this.program_levels);
    });
  }
  
  // get countryname
  getcountrynames(){
    this._indexservice.countrynamefilter().subscribe(data=>{
      this.country_dropdown = data;
    });
  }
  // get courses
  getcourseslist(){
    this.programlist=[];
    this._indexservice.courselist().subscribe(data=>{
    if(this.form.get('program_levels').value.length==0){
      for ( var rec in data){
        this.programlist= this.programlist.concat(new Array(data[rec].list)[0])
      }
    }else{
      let ar_t="";
      for(var i in this.form.get('program_levels').value){
        ar_t+=this.form.get('program_levels').value[i];
      }
      for ( var rec in data){
       console.log(data[rec]._id,typeof ar_t,"::::::",data[rec]._id.indexOf(ar_t),data[rec].list);

        if(ar_t.includes(data[rec]._id)){
          this.programlist= this.programlist.concat(new Array(data[rec].list)[0])
        //  console.log(this.programlist,"loissssssssssssssssss")
        }
      }
    }
   
    console.log("programlist",this.programlist);
    });
  }


  
onCheckboxChange(level: string, isChecked:boolean){
  
  const levelFormArray =<FormArray>this.form.controls.program_levels;
  if(isChecked){
    console.log("checkingggggggggggggggggg")
    var checkedvalue=levelFormArray.push(new FormControl(level));
    console.log("level",this.form.get('program_levels').value,this.form.get('program_levels').value.length);
    if(this.form.get('program_levels').value.length == 0){
      this._indexservice.programlevelcheckedvalue= false;
      this._indexservice.programlevel_checkid = 0;
      // this._indexservice.current_page = 1;
      this.getcourseslist();
      this._indexservice.universitysearch_home_text = this.url_universityData;
      this._router.navigate(['/filterpage/'+this._indexservice.current_page+'/'+this._indexservice.countryselected_filter+'/'+this._indexservice.programlevel_checkid+'/'+this._indexservice.programsearchfilter+'/'+this._indexservice.universitysearch_home_text+'/'+this._indexservice.examscore_selected_filter]);
    }else{
        this._indexservice.programlevelcheckedvalue = true;
        this._indexservice.programlevel_checkid = this.form.get('program_levels').value;
        this.getcourseslist();
        this._indexservice.universitysearch_home_text = this.url_universityData;
        this._router.navigate(['/filterpage/'+this._indexservice.current_page+'/'+this._indexservice.countryselected_filter+'/'+this._indexservice.programlevel_checkid+'/'+this._indexservice.programsearchfilter+'/'+this._indexservice.universitysearch_home_text+'/'+this._indexservice.examscore_selected_filter]);
      }
      
  }else{
    let index = levelFormArray.controls.findIndex(x=>x.value == level)
    levelFormArray.removeAt(index);
    if(this.form.get('program_levels').value.length == 0){
      this._indexservice.programlevelcheckedvalue= false;
      this._indexservice.programlevel_checkid = 0;
      // this._indexservice.current_page = 1;
      this.getcourseslist();
      this._indexservice.universitysearch_home_text = this.url_universityData;
      this._router.navigate(['/filterpage/'+this._indexservice.current_page+'/'+this._indexservice.countryselected_filter+'/'+this._indexservice.programlevel_checkid+'/'+this._indexservice.programsearchfilter+'/'+this._indexservice.universitysearch_home_text+'/'+this._indexservice.examscore_selected_filter]);
      console.log("level",this._indexservice.programlevel_checkid,"currentpage",this._indexservice.current_page,"country",this._indexservice.countryselected_filter);  
    }else{
        this._indexservice.programlevelcheckedvalue = true;
        this._indexservice.programlevel_checkid = this.form.get('program_levels').value;
        this.getcourseslist();
        this._indexservice.universitysearch_home_text = this.url_universityData;
        this._router.navigate(['/filterpage/'+this._indexservice.current_page+'/'+this._indexservice.countryselected_filter+'/'+this._indexservice.programlevel_checkid+'/'+this._indexservice.programsearchfilter+'/'+this._indexservice.universitysearch_home_text+'/'+this._indexservice.examscore_selected_filter]);
        console.log("level",this._indexservice.programlevel_checkid,"currentpage",this._indexservice.current_page,"country",this._indexservice.countryselected_filter);
      }
  }  
}
// chenge function dropdown
onchangeDropdown(newObj)
{
  console.log(newObj);
  this.selectedcountry = newObj;
  this.countrydropdown_filter = this.selectedcountry+'_id';
  //console.log("getfirst", this.selectedcountry);
  if(this.selectedcountry == undefined){
    this._indexservice.countryselected_filter = 0;
    this._indexservice.universitysearch_home_text = this.url_universityData;
    this._router.navigate(['/filterpage/'+this._indexservice.current_page+'/'+this._indexservice.countryselected_filter+'/'+this._indexservice.programlevel_checkid+'/'+this._indexservice.programsearchfilter+'/'+this._indexservice.universitysearch_home_text+'/'+this._indexservice.examscore_selected_filter]);
  }else{
  this._indexservice.countryselected_filter = this.countrydropdown_filter;
  this._indexservice.universitysearch_home_text = this.url_universityData;
  this._router.navigate(['/filterpage/'+this._indexservice.current_page+'/'+this._indexservice.countryselected_filter+'/'+this._indexservice.programlevel_checkid+'/'+this._indexservice.programsearchfilter+'/'+this._indexservice.universitysearch_home_text+'/'+this._indexservice.examscore_selected_filter]);
  //console.log("countrydropdown", this.form.get('selectedcountry').value);
  }
}
onsort(newdata){
  console.log(newdata);
  this.sortBy = newdata;
  console.log("getfirstsort", this.sortBy); 
}

// exam scores
onchangeExam(newExam)
{
  console.log(newExam);
  this.selectedexamscore = newExam;
  this.examscoreData = this._indexservice.exam_score+'_'+this.selectedexamscore;
  this._indexservice.examscore_selected_filter = this.examscoreData;
  this._router.navigate(['/filterpage/'+this._indexservice.current_page+'/'+this._indexservice.countryselected_filter+'/'+this._indexservice.programlevel_checkid+'/'+this._indexservice.programsearchfilter+'/'+this._indexservice.universitysearch_home_text+'/'+this._indexservice.examscore_selected_filter]);

}
// exam score
getScores_dropdown(min,max){
  var e_min=min,e_max=max;
  var diff=Math.ceil(e_max/5);
    var arr=[];
  for(var i=e_min;i<=e_max;i=i+diff){
    if(e_min==0 && e_max==0){
      arr.push(e_min+'-'+e_max)
    }else{
      if(e_max<=5 && (i+diff)<=e_max){
        arr.push(i+'-'+(i+diff))
      }else if(e_max>5){
      if((i+diff-1)>e_max){var a=(parseInt(e_max)+1);if(i==e_max)arr.push(i+'-'+a);else arr.push(i+'-'+e_max)}
      else arr.push(i+'-'+(i+diff-1))
      }
    }
    
    
  }
 console.log(arr);
  return arr;
  
}
scoredropdownchanged(score: any){
  //console.log("Exam Scoreeeeeeeeeeeeeeee")
  if(score == "Select Exam"){
    score = undefined;
    this._indexservice.exam_score = undefined;
    this.examscore =[];
  }else{
  //console.log(score);
  this._indexservice.exam_score = score;
  this.examscore=this.getScores_dropdown(parseInt(this.exam[this._indexservice.exam_score]["min"]),
  parseInt(this.exam[this._indexservice.exam_score]["max"]));
}
}

  getselectedprogramlevel(){
      return  this.form.get('program_levels').value.reduce((levels,level)=>{
         if(level){
          levels.push(level)
         }
         return levels;
      },[]);    
}
//  program search
programtoggleDropdown(){
  this.programshowDropdown =! this.programshowDropdown;
}

programselectValue(value){
 this.form.patchValue({"programsearch":value});
   this.programshowDropdown = false;
   this._indexservice.programsearchfilter = this.form.get('programsearch').value;
   console.log("formvalue_selected",this._indexservice.programsearchfilter );
   this.Onprogramchange();
  }
  Onprogramchange(){
    this._indexservice.programsearchfilter = this.form.get('programsearch').value;
    console.log("formvalue",!this._indexservice.programsearchfilter,this._indexservice.programsearchfilter )
    if(!this._indexservice.programsearchfilter==true){
      this._indexservice.programsearchfilter = 0;
      this._indexservice.universitysearch_home_text = this.url_universityData;
      this._router.navigate(['/filterpage/'+this._indexservice.current_page+'/'+this._indexservice.countryselected_filter+'/'+this._indexservice.programlevel_checkid+'/'+this._indexservice.programsearchfilter+'/'+this._indexservice.universitysearch_home_text+'/'+this._indexservice.examscore_selected_filter]);
    }else{
      this._indexservice.universitysearch_home_text = this.url_universityData;
      this._router.navigate(['/filterpage/'+this._indexservice.current_page+'/'+this._indexservice.countryselected_filter+'/'+this._indexservice.programlevel_checkid+'/'+this._indexservice.programsearchfilter+'/'+this._indexservice.universitysearch_home_text+'/'+this._indexservice.examscore_selected_filter]);
    }

  } 

  getprogramSearchValue(){
    return this.form.value.programsearch;
  }

  
  // comparision
    onAddData(name, l, c) {
        this.compBox = true;
        console.log("ccccccccccccccc",c,"lllllllll",l);
        this._indexservice.universitySelected=name.id;
        this._indexservice.locSelected=l.id;
        this._indexservice.countrySelected=c.id;
        console.log("uniiiiiiiiiiiiiiii",this._indexservice.universitySelected,"countryyyyyyyyyyyyyyyyyyyyyy", this._indexservice.countrySelected,"loccccccccccccccccccccccccc",this._indexservice.locSelected);


        if(this.urluni!='0'){
            if(this.urluni.indexOf((this._indexservice.universitySelected).toString())<0){
                this.urluni=  this.urluni+'-'+this._indexservice.universitySelected
                this.urlloc= this.urlloc+'-'+this._indexservice.locSelected
                this.urlcon= this.urlcon+'-'+this._indexservice.countrySelected
                // this.getUniversityCompare(this.urluni,this.urlloc,this.urlcon);


            }else{
                // this.msg="already added.....try to add new one"
            }

        }else{
            this.urluni=(this._indexservice.universitySelected).toString()
            this.urlloc=this._indexservice.locSelected
            this.urlcon=this._indexservice.countrySelected
            // this.getUniversityCompare(this.urluni,this.urlloc,this.urlcon);

        }
        if (this._indexservice.comparableList.length == 3) {
            this._router.navigate(['/comparepage/'+this.urluni+ '/'+this.urlloc+ '/' +this.urlcon])

            return;
        } else {
            var count = 0;

            for (var item of this._indexservice.comparableList) {
                console.log("item", name, "........................", this._indexservice.comparableList);
                if (name.id == item.id) {
                    count++;
                }

            } console.log("Counttttttt", count);
            if (count == 0) {
                name["con_name"] = c.name;
                name["loc_name"] = l.name;
                this._indexservice.comparableList.push(name);
                console.log("pushed object", this._indexservice.comparableList);

            }
        }



    }
  removeAll() {
    this._indexservice.comparableList.splice(0, this._indexservice.comparableList.length);
    this.compBox = false;
  }

  remove(index) {
    //console.log('Index',index);
    this._indexservice.comparableList.splice(index, 1);
    if (this._indexservice.comparableList.length == 0) {
      this.compBox = false;
    }
  }
  comparePage() {
    console.log(".................................................",this.urlcon,this.urlloc,this.urlcon);
    this._router.navigate(['/comparepage/'+this.urluni+ '/'+this.urlloc+ '/' +this.urlcon])
  }

  probabilityPage() {

    this._router.navigate(['/probability']);
  }
}
