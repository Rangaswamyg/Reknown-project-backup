import { Component, OnInit } from '@angular/core';
import { ProbabilityService } from '../../services/probability.service';
import { IndexService } from '../../services/index.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-dashboard-pbinfo',
  templateUrl: './dashboard-pbinfo.component.html',
  styleUrls: ['./dashboard-pbinfo.component.css']
})
export class DashboardPbinfoComponent implements OnInit {
  url:any;
  education_info:any;
  dreamUni:any;
  url_Examid: any;
  constructor(public _service: UserService,private route: ActivatedRoute,public _indexservice:IndexService,private _router: Router,public _probabilityService:ProbabilityService) { }

  ngOnInit() {
   this.url_Examid = this.route.snapshot.paramMap.get('this._indexservice.examSelected');
    this._probabilityService.probabilityInfoSubmit({profile_info:this._probabilityService.probability_input_data}).subscribe(data=>{
     

      if(data){
        console.log("succes",data);
      }
      console.log(this._probabilityService.result);
      
  });
  this.route.params.subscribe(params=>{
    var cid = params['this._probabilityService.shortlist_cid'];
    var lev = params['this._probabilityService.shortlist_level'];
    var pgm = params['this._probabilityService.shortlist_spe'];
    var exm = params['this._indexservice.examSelected'];
    var scr = params['this._indexservice.scoreValue'];
    this.getShortlistUni(cid,lev,pgm,exm,scr)
  });
  // this.route.snapshot.paramMap.get()

  //  this.getDreamUni(this._indexservice.countryId,this._indexservice.levelPageSelected,this._indexservice.specPageSelected)
  this.getUserEducationCurrentFuture()
  }
    getUserEducationCurrentFuture() {
      this._probabilityService.getUserEducationDetails().subscribe(data => {
          this.education_info = data;
          console.log("EducationInfo",this.education_info);
        console.log("Globallllllllllllllllllllllll",this._indexservice.examSelected);
    })
    }
    getShortlistUni(cid,lev,pgm,exm,scr){
      this._probabilityService.getDreamUniversity(cid,lev,pgm,exm,scr).subscribe(data=>{
        this._probabilityService.shortListingUni=data
        console.log("shortttttttttttt",this._probabilityService.shortListingUni)
      })
    }

    // getDreamUni(cid,l,p,pgm,s){
    //   this._probabilityService.getDreamUniversity(cid,l,p,pgm,s).subscribe(data=>{
    //     this.dreamUni=data
    //   })
    // }

    hiddenTopnav(){
      if(this.url_Examid != 0)return true;
      else return false;
    }

}
