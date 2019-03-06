import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IndexService } from '../services/index.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormArray,FormControl } from '@angular/forms';

@Component({
  selector: 'app-countylistpage',
  templateUrl: './countylistpage.component.html',
  styleUrls: ['./countylistpage.component.css']
})
export class CountylistpageComponent implements OnInit {
  show = 12;
  countryList=[];
  showDropdown=false;
  form: FormGroup;
  btn=true;
  btn1=true;
  constructor(public _indexservice: IndexService,private _router:Router, private http: HttpClient,private route: ActivatedRoute,private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      search:[null]
      // universitysearch:[null]
    });
  }

  ngOnInit() {
    this.listOfCountry();
  }
  listOfCountry(){
    this._indexservice.countryList().subscribe(data=>{
      this.countryList=data;
      console.log("CountryList",this.countryList);
    })
  }

  increaseShow() {
    this.show += 10;
  }
  increaseShowAll(){
    this.show += 60;
  }
  onAddData(counObj){
    this._indexservice.singleCountry.push(counObj);
    console.log(this._indexservice.singleCountry);
  }
  contoggleDropdown(){
    this.showDropdown=!this.showDropdown;
  }
  countryselectValu(details,value){
    this.form.patchValue({"search":value});
    this.showDropdown = false;
    var searchvalue = details;
    console.log(searchvalue._id);
    this.btn=false;
    this.btn1=false;
    //  this._indexservice.countrypageid = searchvalue.id;
    //  this._router.navigate(['/country/'+searchvalue._id]);
  }
  getSearchValue(){
    return this.form.value.search;
  }
}


