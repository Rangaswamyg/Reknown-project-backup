import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { UserService } from '../services/user.service';
import { IndexService } from '../services/index.service';

declare var $: any;
declare var jQuery: any;


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  form: FormGroup;
  showDropdown = false;
  unishowDropdown = false;
  programshowDropdown = false;
  countrieslist: Array<any> = [];
  universitylist: Array<any> = [];
  universitysearchData: any;
  programlist = [];
  uniCount:any;
  constructor(private _router: Router, private formBuilder: FormBuilder, public _service: UserService, public _indexservice: IndexService) {
    this.form = this.formBuilder.group({
      search: [null],
      universitysearch: [null],
      programsearch: [null]
    });

  }


  ngOnInit() {
  //  country service
    this.getcountries();
    //  university service
    this.getuniversityname();
    // program service
    this.getprogramname();

    this.getCounterData();

    // allitems service
  }
  getCounterData(){
    this._indexservice.counterList().subscribe(data=>{
      this.uniCount = data;
      this._indexservice.universityCount=this.uniCount.unicount;
      this._indexservice.countryCount=this.uniCount.countrycount;
      this._indexservice.courseCount=this.uniCount.coursecount;
      this._indexservice.usersCount=this.uniCount.usercount;

      // console.log(";;;;;;",typeof this._indexservice.universityCount,this._indexservice.universityCount)
    })
  }

  // get country name in search box
  getcountries() {
    this._indexservice.countrynamefilter().subscribe(data => {
      this.countrieslist = data;
      // console.log(this.countrieslist);
    });
  }
  // get university name in search box
  getuniversityname() {
    this._indexservice.universitynamefilter().subscribe(data => {
      this.universitylist = data;
      // console.log(this.universitylist)
    });
  }
  getprogramname() {
    this.programlist = [];
    this._indexservice.courselist().subscribe(data => {
      for (var rec in data) {
        this.programlist = this.programlist.concat(new Array(data[rec].list)[0])
      }
      console.log("programmmmmmm", this.programlist);
    });
  }
  toggleDropdown() {
    //if(){
    this.showDropdown = !this.showDropdown;
    //this.showDropdown= true;
    //}else{
    // console.log("something wrong");
    //}
  }
  unitoggleDropdown() {
    this.unishowDropdown = !this.unishowDropdown;
  }
  programtoggleDropdown() {
    this.programshowDropdown = !this.programshowDropdown;
  }

  // select search box
  selectValue(details, value) {
    this.form.patchValue({ "search": value });
    this.showDropdown = false;
    var searchvalue = details;
    this.oncountryname();
    console.log(this._indexservice.countryselected_filter);
  }
  oncountryname() {
    this._indexservice.countrypageid = this.form.get('search').value + '_name';
    this._indexservice.countryselected_filter = this._indexservice.countrypageid;
  }
  universityselectValue(unidetails, value) {
    this.form.patchValue({ "universitysearch": value });
    this.unishowDropdown = false;
    var universitysearchvalue = unidetails;
    this.onuniname();
    console.log('globaluniversityvalue', this._indexservice.universitysearch_home_text);
  }
  onuniname() {
    this.universitysearchData = this.form.get('universitysearch').value;
    if (this.universitysearchData.indexOf('/') >= 0) {
      this._indexservice.universitysearch_home_text = this.universitysearchData.split('/')[0];
    } else {
      this._indexservice.universitysearch_home_text = this.universitysearchData
    }
    }
  programselectValue(value) {
    this.form.patchValue({ "programsearch": value });
    this.programshowDropdown = false;
    this.onprogramname();
    console.log('globalprogramvalue', this._indexservice.programsearchfilter);
  }
  onprogramname() {
    this._indexservice.programsearchfilter = this.form.get('programsearch').value;
  }

  // country search button
  onsearch() {
    this._indexservice.programsearchfilter = 0;
    this._indexservice.universitysearch_home_text = 0;
    this._indexservice.programlevel_checkid =0;
    this._indexservice.examscore_selected_filter = 0;
    this._router.navigate(['/filterpage/' + this._indexservice.current_page + '/' + this._indexservice.countryselected_filter + '/' + this._indexservice.programlevel_checkid + '/' + this._indexservice.programsearchfilter + '/' + this._indexservice.universitysearch_home_text + '/' + this._indexservice.examscore_selected_filter]);
  }
  onsearchprogram() {
    this._indexservice.countryselected_filter = 0;
    this._indexservice.universitysearch_home_text = 0;
    this._indexservice.programlevel_checkid =0;
    this._indexservice.examscore_selected_filter = 0;
    this._router.navigate(['/filterpage/' + this._indexservice.current_page + '/' + this._indexservice.countryselected_filter + '/' + this._indexservice.programlevel_checkid + '/' + this._indexservice.programsearchfilter + '/' + this._indexservice.universitysearch_home_text + '/' + this._indexservice.examscore_selected_filter]);

  }
  onsearchuniversity() {
    this._indexservice.countryselected_filter = 0;
    this._indexservice.programsearchfilter = 0;
    this._indexservice.programlevel_checkid =0;
    this._indexservice.examscore_selected_filter = 0;
    this._router.navigate(['/filterpage/' + this._indexservice.current_page + '/' + this._indexservice.countryselected_filter + '/' + this._indexservice.programlevel_checkid + '/' + this._indexservice.programsearchfilter + '/' + this._indexservice.universitysearch_home_text + '/' + this._indexservice.examscore_selected_filter]);
  }



  getSearchValue() {
    return this.form.value.search;
  }
  getuniversitySearchValue() {
    return this.form.value.universitysearch;
  }
  getprogramSearchValue() {
    return this.form.value.programsearch;
  }

}
