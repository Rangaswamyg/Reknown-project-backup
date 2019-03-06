import { Injectable } from '@angular/core';
import {Http , Headers , RequestOptions} from '@angular/http';
import 'rxjs/Rx';
import {Observable} from 'rxjs/Rx';
import { UserService } from '../services/user.service';
import { DecimalPipe } from '@angular/common';

@Injectable({
    providedIn: 'root'
})
export class IndexService {
    levelPageSelected:any;
    probCon:any;
    probLoc:any;
    probUni:any;
    value=10;
    countrySelected: any;
    locSelected: any;
    universitySelected: any;
    singleCountry = [];
    comparableList: any[] = [];
    countrypageid: any;
    lifestyle: any;
    programlevelIds: any = 0;
    programsearch_home: any;
    universitysearch_home: any;
    testOne = 0;
    count = 0;
    allItems: any;
    examscore_data: any;
    exam_score: any;
    exam_Api: any;
    // pipe global data
    countrydata: any;
    universitydata: any;
    programdata: any;
    status_test: any;
    exam_scoredata_after_filtering: any;
    coursedata_after_filtering: any;
    countrydata_after_filtering: any;
    programleveluniversities: any;
    programlevelcheckedvalue: any;

    countryPageSelected:any;
    scoreValue: any;
    examSelected: any;
    specPageSelected: any;
// filter
    current_page: number = 1;
    programlevel_checkid = 0;
    countryselected_filter = 0;
    programsearchfilter = 0;
    universitysearch_home_text = 0;
    examscore_selected_filter= 0;
    allItemscount: any;
    universityCount: number;
    countryCount: number;
    courseCount: number;
    usersCount: number;
    constructor(private http: Http,public _service: UserService) { }
    // get country api
    // countryname(){
    //   return this.http.get('http://localhost:8000/api/countryname')
    //      .map(res=>res.json());
    // }
    universitynamefilter() {
        return this.http.get('http://localhost:8000/test/university_names')
            .map(res => res.json());
    }
    programlevel() {
        return this.http.get('http://localhost:8000/test/program_levels')
            .map(res => res.json());
    }
    countrynamefilter() {
        this._service.createAuthenticationHeaders();
        let headers = new Headers();
        headers.append( 'Access-Control-Allow-Origin','*');
        return this.http.get('http://localhost:8000/test/country_names',{headers: headers})
            .map(res => res.json());
    }
    courselist() {
        return this.http.get('http://localhost:8000/test/reg_exp_courses')
            .map(res => res.json());
    }
    // probabilty result
    probabilityresult(probinfo_data){
        return this.http.post('http://localhost:8000/test/probability_check2',probinfo_data)
            .map(res => res.json());
    }
    getalldata() {
        return this.http.get('http://localhost:8000/test/array')
            .map(res => res.json());
    }
    getexamscore() {
        return this.http.get('http://localhost:8000/test/exams_list_with_scores')
            .map(res => res.json());
    }
    countryComparision(){
        return this.http.get('http://localhost:8000/test/comparision_page_dropdown')
            .map(res => res.json());
    }
    countryList(){
        return this.http.get('http://localhost:8000/test/country_list_data')
            .map(res => res.json());
    }
    counterList(){
        return this.http.get('http://localhost:8000/test/uni_count')
        .map(res => res.json());
    }
    // onchangeuniversityfound() {
    // this.testOne = 0;this.count = 0;
    //     if(this.programlevelcheckedvalue === true){
    //       this.testOne = + this.programleveluniversities.length
    //       this.count = +1;
    //     } else {
    //       console.log(this.count);
    //     }
    //     if (this.countryselected_filter && this.countrydata_after_filtering){

    //       this.testOne = + this.countrydata_after_filtering.length
    //       this.count = + 1;
    //     } else {
    //       console.log(this.count, 2);
    //     }
    //     if (this.programsearchfilter){
    //       this.testOne = + this.coursedata_after_filtering.length
    //       this.count  = + 1;
    //     } else {
    //       console.log(this.count, 3);
    //     }
    //     if (this.examscore_selected_filter){
    //       this.testOne = + this.exam_scoredata_after_filtering.length
    //       this.count = + 1;
    //     } else {
    //       console.log(this.count, 4);
    //     }
    //   }
}
