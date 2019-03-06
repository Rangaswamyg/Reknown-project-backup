import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../services/user.service';
import { IndexService } from '../services/index.service';
import { ProbabilityService } from '../services/probability.service';

import { Router, ActivatedRoute } from '@angular/router';
import { PageScrollInstance, PageScrollService, EasingLogic } from 'ngx-page-scroll';
import {PageScrollConfig} from 'ngx-page-scroll';
declare var $:any;
declare var jQuery: any;
@Component({
  selector: 'app-countrypage',
  templateUrl: './countrypage.component.html',
  styleUrls: ['./countrypage.component.css']
})
export class CountrypageComponent implements OnInit {
    CountryList=[];
    countryInfo: any; 
    country_uni_length=0;
    LevelList=[];
    courseList:any;
    ExamList:any;
    ExamList_arr=[];
    //lifestyles:['education','food','hotels','university','shop','places']
     show=6;
  constructor(private _probabilityService: ProbabilityService,public _indexservice: IndexService,private _service: UserService,private _router:Router, private http: HttpClient,private route: ActivatedRoute) {
    
  }


  ngOnInit() {
  
    this.getcountrydetails(this.route.snapshot.params['cid']);
    this.getCountryList();
    this.getLevelList();
   this.getExamList();
//       Sticky navbar
// =========================
$(document).ready(function () {
  // Custom function which toggles between sticky class (is-sticky)
  var stickyToggle = function (sticky, stickyWrapper, scrollElement) {
      var stickyHeight = sticky.outerHeight();
      var stickyTop = stickyWrapper.offset().top;
      if (scrollElement.scrollTop() >= stickyTop) {
          stickyWrapper.height(stickyHeight);
          sticky.addClass("is-sticky");
      }
      else {
          sticky.removeClass("is-sticky");
          stickyWrapper.height('auto');
      }
  };

  // Find all data-toggle="sticky-onscroll" elements
  $('[data-toggle="sticky-onscroll"]').each(function () {
      var sticky = $(this);
      var stickyWrapper = $('<div>').addClass('sticky-wrapper'); // insert hidden element to maintain actual top offset on page
      sticky.before(stickyWrapper);
      sticky.addClass('sticky');

      // Scroll & resize events
      $(window).on('scroll.sticky-onscroll resize.sticky-onscroll', function () {
          stickyToggle(sticky, stickyWrapper, $(this));
      });

      // On page load
      stickyToggle(sticky, stickyWrapper, $(window));
  });
});

  }


 
getcountrydetails(cid){
   
    this.http.get('http://localhost:8000/test/top_universities/'+cid).subscribe(data =>{
       this.countryInfo= data;
       this.country_uni_length=1;
       console.log("countryInfo",this.countryInfo);
    });
  }
  increaseShow() {
    this.show += 5; 
  }
  getCountryList(){
      this._probabilityService.getCountry().subscribe(data=>{
          this.CountryList=data;
          console.log("dsgfhgdsf",this.CountryList);
      })
  }
  getExamList(){
      this._indexservice.getexamscore().subscribe(data=>{
          var arr_list=Object.keys(data);

            var c_arr=(new Array(arr_list))[0];
          c_arr.splice(0,1);

        this.ExamList_arr=c_arr;

          
      })
  }
  getLevelList(){
      this._probabilityService.getCourseListRegExp().subscribe(data=>{
          this.LevelList=data;
          console.log("bdxjfdjff",this.LevelList);
      })
  }
  onchangeDropdownCountry(conObj) {
    console.log(conObj);
    this._indexservice.countryPageSelected = conObj;
    for (var item of this.CountryList) {
      if (item._id.name == this._indexservice.countryPageSelected) {
        this._probabilityService.shortlist_cid = item._id.id;
        console.log("ItemLocdata", this._probabilityService.shortlist_cid);
      }
    }
    // console.log("getCountryId", this._indexservice.countryPageSelected);
   }
   doSomething(eventObj){
    console.log(eventObj) 
    this._indexservice.scoreValue=eventObj// input value is logged
 }
  onchangeDropdownExam(exmObj){
    this._indexservice.examSelected=exmObj;
  }
  onchangeDropdownLevel(levObj){
this._probabilityService.shortlist_level=levObj;
//  console.log("leveelllll",this._indexservice.levelPageSelected)
  for (var item of this.LevelList) {
      if (item._id == this._probabilityService.shortlist_level) {
        this.courseList = item.list;
        // console.log("ItemLocdata", item.records);
      }
    }
    console.log("countryData", this.courseList);
  }
  onchangeDropdownCourse(couObj){
    this._probabilityService.shortlist_spe=couObj;
    console.log("hdfsjgfdsj", this._indexservice.specPageSelected)
  }

  submit(){
    this._router.navigate(['/shortlistuniversities/'+this._probabilityService.shortlist_cid+ '/' 
    +this._probabilityService.shortlist_level+ '/' +this._probabilityService.shortlist_spe+ '/'
    +this._indexservice.examSelected+'/'+this._indexservice.scoreValue]);
  }

  myEasing: EasingLogic = {
    ease: (t: number, b: number, c: number, d: number): number => {
        // easeInOutExpo easing
        if (t === 0) return b;
        if (t === d) return b + c;
        if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
        return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
    }
};

doSmth(reachedTarget: boolean): void {
    if (reachedTarget) {
        console.log('Yeah, we reached our destination');
    } else {
        console.log('Ohoh, something interrupted us');
    }
}

myFunction() {
    var dots = document.getElementById("dots");
    var moreText = document.getElementById("more");
    var btnText = document.getElementById("myBtn");
  
    if (dots.style.display === "none") {
      dots.style.display = "inline";
      btnText.innerHTML = "Show More"; 
      moreText.style.display = "none";
    } else {
      dots.style.display = "none";
      btnText.innerHTML = "Show Less"; 
      moreText.style.display = "inline";
    }
  }
  myVisaguide() {
    var dot = document.getElementById("dot");
    var moreText1 = document.getElementById("more1");
    var btnText = document.getElementById("myBtn1");
  
    if (dot.style.display === "none") {
      dot.style.display = "inline";
      btnText.innerHTML = "Show More"; 
      moreText1.style.display = "none";
    } else {
      dot.style.display = "none";
      btnText.innerHTML = "Show Less"; 
      moreText1.style.display = "inline";
    }
  }
//   increaseShow() {
//     var btnText = document.getElementById("myBtn");
//     if(this.show != this.lifestyles.length){
//           this.show += 4;
//           btnText.innerHTML = "Show less";
//     }else{
//        this.show -= 4;
//        btnText.innerHTML = "Show More"; 
//     }
    
//   }
   
}
