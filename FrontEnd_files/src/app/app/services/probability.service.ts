import { Injectable } from '@angular/core';
import {Http , Headers , RequestOptions} from '@angular/http';
import 'rxjs/Rx';
import {Observable} from 'rxjs/Rx';
import { UserService } from '../services/user.service'
@Injectable({
  providedIn: 'root'
})
export class ProbabilityService {
  probability_input_data=[];
  result:any;
  secondinfo:any;
  firstinfo:any;
  thirdinfo:any;
  fourthinfo:any;
  fifthinfo:any;
  sixthinfo:any;
  seventhinfo:any;
  eigthInfo:any;
  profile_building_progress_arr=[];
  profile_building_progress=0;
  progress_percent=0;
  shortListingUni=[];
  // secondpageData:any;
  // thirdpageData:any;
  // fourthpageData:any;
  // fifthpageData:any;
  // sixthpageData:any;
  // seventhpageData:any;
  generalCourseList=[];

  shortlist_cid:any;
  shortlist_level:any;
  shortlist_spe:any;
  probability_input_data_prob = [];
  prob_toolresult: any;
  prob_countryId: any;
  prob_uniId: any;

  constructor(private http: Http,public _service:UserService) { }
  generalCourse() {
    return this.http.get('http://localhost:8000/test/course_specialization')
       .map(res => res.json());
  }
  getCountry(){
    return this.http.get('http://localhost:8000/test/country_list_db')
    .map(res => res.json());
  }
  getSpecializationList(cid,pl){
    return this.http.get('http://localhost:8000/test/specialization/' +cid+ '/'+pl)
    .map(res => res.json());
  }
  getUniversityListLevel(cid,pl,sp){
    return this.http.get('http://localhost:8000/test/universities_cid_pl/' +cid+ '/'+pl+ '/' +sp)
    .map(res => res.json());
  }
  probabilityInfoSubmit(probability_input_data){
    this._service.createAuthenticationHeaders();
    // let headers = new Headers();
    // headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:8000/test/shortlisting_universities',probability_input_data,this._service.options)
        .map(res=>res);
  }
    getIndianUniversity(){
        return this.http.get('http://localhost:8000/test/india_universities')
            .map(res => res.json());
    }
    getUserEducationDetails(){
      return this.http.get('http://localhost:8000/test/shortlisting_user_details')
          .map(res => res.json());
    }
  getCourseListRegExp(){
    return this.http.get('http://localhost:8000/test/reg_exp_courses')
        .map(res => res.json());
  }
  getDreamUniversity(cid,lev,pgm,exm,scr){
    return this.http.get('http://localhost:8000/test/dream_university/' +cid+ '/'+lev+ '/' +pgm+ '/' +exm+ '/' +scr)
        .map(res => res.json());
  }

  getProbabilityShowResult(uniId,conId,probability_input_data_prob){
    this._service.createAuthenticationHeaders();
    // let headers = new Headers();
    // headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:8000/test/prob_percentage/' +uniId+'/'+conId,probability_input_data_prob,this._service.options)
        .map(res=>res.json());
  }
}
