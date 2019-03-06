import { Component, OnInit } from '@angular/core';
import {ProbabilityService} from "../../services/probability.service";
@Component({
  selector: 'app-dashboard-shortlisting',
  templateUrl: './dashboard-shortlisting.component.html',
  styleUrls: ['./dashboard-shortlisting.component.css']
})
export class DashboardShortlistingComponent implements OnInit {
  p: number = 1;
  constructor(public _probabilityService:ProbabilityService) { }

  ngOnInit() {
  }


}
