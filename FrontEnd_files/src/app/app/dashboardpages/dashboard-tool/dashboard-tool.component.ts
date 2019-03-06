import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-dashboard-tool',
  templateUrl: './dashboard-tool.component.html',
  styleUrls: ['./dashboard-tool.component.css']
})
export class DashboardToolComponent implements OnInit {
  probabilty_details: any;
  constructor(private _router:Router,public _service:UserService) { }

  ngOnInit() {
    // this.getprobability();
  }
  getprobability(){
    this._service.getprobabilitydetails().subscribe(data=>{
      console.log(data);
    // console.log("res_prob", this.probabilty_details);
    if(data.complete == true){
        ////// ask future education page
       this._router.navigate(['/secondpage']);
    }else if(data.complete == false && data.profile_build==true){
        // threee pages (future education +2 pages)
        this._router.navigate(['/firstpage']);
    }else if(data.complete == false && data.profile_build==false){
        // threee pages (future education +2 pages)
      this._router.navigate(['/dashboardPb1']);
        // navigate to profile building page..................
    }
    });
  }
  onMovetoprobabilityFifthpage(){
    this._router.navigate(['/fifthpage']);
  }
  onMovetocomparisionpage(){
    this._router.navigate(['/comparepage/0/0/0']);
  }
  onMovetoshortlistingpage(){
    this._router.navigate(['/dashboardPb6']);
  }
}
