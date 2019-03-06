import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dashboardpages',
  templateUrl: './dashboardpages.component.html',
  styleUrls: ['./dashboardpages.component.css']
})
export class DashboardpagesComponent implements OnInit {

  constructor(private _router:Router) { }

  ngOnInit() {
  }
  OnmoveDashstartpage(){
    this._router.navigate(['/dashboardstart']);
  }
}
