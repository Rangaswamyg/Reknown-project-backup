import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dashboardstart',
  templateUrl: './dashboardstart.component.html',
  styleUrls: ['./dashboardstart.component.css']
})
export class DashboardstartComponent implements OnInit {

  constructor(private _router:Router) { }

  ngOnInit() {
  }
  OnmoveDashprogress(){
    this._router.navigate(['/dashboardtimeline']);
  }
}
