import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashtimelinepage',
  templateUrl: './dashtimelinepage.component.html',
  styleUrls: ['./dashtimelinepage.component.css']
})
export class DashtimelinepageComponent implements OnInit {

  constructor(private _router: Router) { }

  ngOnInit() {
  }

  onMovepbPage() {
    this._router.navigate(['/dashboardPb1']);
  }

  onmovetotool(){
    this._router.navigate(['/dashboardtool']);
  }
}
