import { Component, OnInit } from '@angular/core';
import { ProbabilityService } from '../../services/probability.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lastpage',
  templateUrl: './lastpage.component.html',
  styleUrls: ['./lastpage.component.css']
})
export class LastpageComponent implements OnInit {
  
  constructor(public _probabilityService:ProbabilityService,private _router: Router) { }

  ngOnInit() {
    console.log(this._probabilityService.probability_input_data_prob);
  }

  // OnmovetoResultpage(){
  //   this._router.navigate(['/probabiltyresult']);

  // }

  OnsubmitProbData(){
    this._probabilityService.getProbabilityShowResult(this._probabilityService.prob_uniId,this._probabilityService.prob_countryId,this._probabilityService.probability_input_data_prob).subscribe(data=>{
      this._probabilityService.prob_toolresult=data;
      if(data){
        console.log("success");
        this._router.navigate(['/probabiltyresult/'+this._probabilityService.prob_uniId+'/'+this._probabilityService.prob_countryId]);
      }
      console.log(this._probabilityService.prob_toolresult);
    }); 
  }
}

