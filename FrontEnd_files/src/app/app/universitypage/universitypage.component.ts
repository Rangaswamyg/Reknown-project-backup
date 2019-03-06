import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../services/user.service';
import { IndexService } from '../services/index.service';
import { Router, ActivatedRoute } from '@angular/router';
import { PageScrollInstance, PageScrollService, EasingLogic } from 'ngx-page-scroll';
import {PageScrollConfig} from 'ngx-page-scroll';
declare var $:any;
declare var $target: any;
@Component({
  selector: 'app-universitypage',
  templateUrl: './universitypage.component.html',
  styleUrls: ['./universitypage.component.css']
})
export class UniversitypageComponent implements OnInit {
    universitypagedata : any=[];
    universitydescription: any=[];
    universitycourseinfo=[];

    program_levels=[];
    selectedprogramlevel = this.program_levels[''];
    //courses=[{id:1,level:"UG",course_name:"Account"},{id:1,level:"PG",course_name:"Maths"},{id:1,level:"PHD",course_name:"Science"}];
    selectedcourses = this.universitycourseinfo[''];
    constructor(public _indexservice: IndexService,public _service: UserService,private _router:Router, private http: HttpClient,private route: ActivatedRoute) { }

  ngOnInit() {
    
//  nav scroll
$(document).ready(function(){
    $(window).bind('scroll', function() {
    var navHeight = $( window ).height() - 5;
          if ($(window).scrollTop() > navHeight) {
              $('nav').addClass('fixed');
          }
          else {
              $('nav').removeClass('fixed');
          }
     });
 });


    // dropdown
    $('.dropdown-menu span').on('click', function(){    
      $('.dropdownfa1').html($(this).html());    
  });
  $('.dropdown-menu p').on('click', function(){    
      $('.dropdownfa2').html($(this).html());    
  });
  $('.dropdown-menu div').on('click', function(){    
      $('.dropdownfa3').html($(this).html());    
    });
    //filter 4
    $('.dropdown-menu option').on('click', function(){    
      $('.dropdownfa4').html($(this).html());    
    });

    // sticky navbar
    

// Sticky navbar
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
// universitydescription service
//this.getuniversitydescription(this.route.snapshot.params['id']);
  this.route.params.subscribe(params=>{
    var lid = params['lid'];
    var cid = params['cid'];
    var id = params['id'];
    this.getuniversitydescription(id,lid,cid);
  });

//   program level service
this.getprogramlevel();
  }

  // service
getuniversitydescription(id,lid,cid){
    this._service.createAuthenticationHeaders();
    this.http.get('http://localhost:8000/test/university_details/'+id+'/'+lid+'/'+cid).subscribe(data =>{
        this.universitypagedata = data;
       this.universitydescription= data["university_details"];
       this.universitycourseinfo = data["course_info"];
       console.log('unipagedata', this.universitypagedata);
       console.log('unidetail',this.universitydescription);
       console.log('uniotherdetail',this.universitycourseinfo);
    });
  }

//   get programlevel dropdown
getprogramlevel(){
    this._indexservice.programlevel().subscribe(data=>{
      this.program_levels=data;
       console.log(this.program_levels);
    });
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

// chenge function dropdown
onchangeDropdown(newObj)
{
  console.log(newObj);
  this.selectedprogramlevel = newObj;
  console.log("getfirst", this.selectedprogramlevel);
  //console.log("countrydropdown", this.form.get('selectedcountry').value);

}
onchangecoursesDropdown(newcourse)
{
  console.log(newcourse);
  this.selectedcourses = newcourse;
  console.log("getfirst", this.selectedcourses);
  //console.log("countrydropdown", this.form.get('selectedcountry').value);

}
viewallcourse(){
    this.selectedcourses= undefined;
    this.selectedprogramlevel = undefined;
}
// ngIf statement function
filtername(){
    if(this._indexservice.countrypageid != undefined && this._indexservice.countrypageid != 0)
    {
     // console.log("its true");
      return true;
    }else{
      //console.log("its false");
      return false;
    }
  }
  filteruniname(){
    if(this._indexservice.universitysearch_home != undefined && this._indexservice.universitysearch_home != 0)
    {
      //console.log("its true uni");
      return true;
    }else{
     // console.log("its false uni");
      return false;
    }
  }
  filterprogramname(){
    if(this._indexservice.programsearch_home != undefined && this._indexservice.programsearch_home != 0)
    {
     // console.log("its true pro");
      return true;
    }else{
      //console.log("its false pro");
      return false;
    }
  }
}

