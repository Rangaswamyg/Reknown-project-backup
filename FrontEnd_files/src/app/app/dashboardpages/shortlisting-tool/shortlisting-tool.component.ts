import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProbabilityService } from '../../services/probability.service';


@Component({
  selector: 'app-shortlisting-tool',
  templateUrl: './shortlisting-tool.component.html',
  styleUrls: ['./shortlisting-tool.component.css']
})
export class ShortlistingToolComponent implements OnInit {

  constructor(private route: ActivatedRoute,public _probabilityService:ProbabilityService) { }

  ngOnInit() {
    this.route.params.subscribe(params=>{
      var cid = params['this._probabilityService.shortlist_cid'];
      var lev = params['this._probabilityService.shortlist_level'];
      var pgm = params['this._probabilityService.shortlist_spe'];
      var exm = params['this._indexservice.examSelected'];
      var scr = params['this._indexservice.scoreValue'];
      this.getShortlistUni(cid,lev,pgm,exm,scr)
    });
  }
  getShortlistUni(cid,lev,pgm,exm,scr){
    this._probabilityService.getDreamUniversity(cid,lev,pgm,exm,scr).subscribe(data=>{
      this._probabilityService.shortListingUni=data
      console.log("shortttttttttttt",this._probabilityService.shortListingUni)
    })
  }


}
