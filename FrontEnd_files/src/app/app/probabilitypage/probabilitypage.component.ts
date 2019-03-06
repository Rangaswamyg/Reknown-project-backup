import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-probabilitypage',
  templateUrl: './probabilitypage.component.html',
  styleUrls: ['./probabilitypage.component.css']
})
export class ProbabilitypageComponent implements OnInit {

  constructor(private _router:Router) {}

  ngOnInit() {

  }
  onMoveLastPage(){
    this._router.navigate(['/firstpage']);
  }

}
