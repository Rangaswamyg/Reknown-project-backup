import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { IndexService } from '../../services/index.service';
import { ProbabilityService } from '../../services/probability.service';



@Component({
  selector: 'app-probabilityresultpage',
  templateUrl: './probabilityresultpage.component.html',
  styleUrls: ['./probabilityresultpage.component.css']
})
export class ProbabilityresultpageComponent implements OnInit {
  p: Number=1;
  prob_result: any;
  prob_result_uni: any;
  constructor(public _indexservice: IndexService,public _probabilityService:ProbabilityService) { }

  ngOnInit() {
    // service
     this.getprobabilityResult();
  }
  // get probability result
  getprobabilityResult(){
    this._probabilityService.getProbabilityShowResult(this._probabilityService.prob_uniId,this._probabilityService.prob_countryId,this._probabilityService.probability_input_data_prob).subscribe(data=>{
      this._probabilityService.prob_toolresult = data;
      console.log(this._probabilityService.prob_toolresult);
    });
  }

}
