import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { FilterpageComponent } from './filterpage/filterpage.component';
import { FooterpageComponent } from './footerpage/footerpage.component';
import { SignupComponent } from './signup/signup.component';
import { CountrypageComponent } from './countrypage/countrypage.component';
import { UniversitypageComponent } from './universitypage/universitypage.component';
import { ProbabilitypageComponent } from './probabilitypage/probabilitypage.component';
import { LastpageComponent } from './probabilitypage/lastpage/lastpage.component'; 
import { FirstpageComponent } from './probabilitypage/firstpage/firstpage.component';
import { SecondpageComponent } from './probabilitypage/secondpage/secondpage.component';
import { EighthpageComponent } from './probabilitypage/eighthpage/eighthpage.component';
import {ComparisonpageComponent} from './comparisonpage/comparisonpage.component';
import { LoginComponent } from './login/login.component';
import {CountylistpageComponent} from './countylistpage/countylistpage.component';
import { FifthpageComponent } from './probabilitypage/fifthpage/fifthpage.component';
import { DashboardpagesComponent } from './dashboardpages/dashboardpages.component';
import { DashtimelinepageComponent } from './dashboardpages/dashtimelinepage/dashtimelinepage.component';
import { DashnavbarComponent } from './dashboardpages/dashnavbar/dashnavbar.component'
import { DashboardstartComponent } from './dashboardpages/dashboardstart/dashboardstart.component';
import { DashboardPb1Component } from './dashboardpages/dashboard-pb1/dashboard-pb1.component';
import { DashboardPb2Component } from './dashboardpages/dashboard-pb2/dashboard-pb2.component';
import { DashboardPb4Component } from './dashboardpages/dashboard-pb4/dashboard-pb4.component';
import { DashboardPb5Component } from './dashboardpages/dashboard-pb5/dashboard-pb5.component';
import { DashboardPb3Component } from './dashboardpages/dashboard-pb3/dashboard-pb3.component';
import { DashboardPb6Component } from './dashboardpages/dashboard-pb6/dashboard-pb6.component';
import { DashboardPbinfoComponent } from './dashboardpages/dashboard-pbinfo/dashboard-pbinfo.component';
import { DashboardShortlistingComponent } from './dashboardpages/dashboard-shortlisting/dashboard-shortlisting.component';
import { ProbabilityresultpageComponent } from './probabilitypage/probabilityresultpage/probabilityresultpage.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { AuthGuard } from './services/guards/auth.guard';
import { DashboardToolComponent } from './dashboardpages/dashboard-tool/dashboard-tool.component';
import { ShortlistingToolComponent } from './dashboardpages/shortlisting-tool/shortlisting-tool.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'filterpage/:this._indexservice.current_page/:this._indexservice.countryselected_filter/:this._indexservice.programlevel_checkid/:this._indexservice.programsearchfilter/:this._indexservice.universitysearch_home_text/:this._indexservice.examscore_selected_filter', component: FilterpageComponent},  // { path: 'filterpage/:id', component: FilterpageComponent},
  { path: 'footerpage', component: FooterpageComponent},
  { path: 'signup', component: SignupComponent},
  { path: 'countrypage/:cid', component: CountrypageComponent },
  { path: 'universitypage/:id/:lid/:cid', component: UniversitypageComponent},
  { path: 'probability', component: ProbabilitypageComponent },
  { path: 'lastpage', component: LastpageComponent },
  { path: 'firstpage', component: FirstpageComponent},
  { path: 'secondpage', component: SecondpageComponent },
  { path: 'fifthpage', component: FifthpageComponent },

  { path: 'footer', component: FooterComponent},
  { path: 'eighthpage', component: EighthpageComponent},
  { path: 'comparepage/:uid/:lid/:cid', component: ComparisonpageComponent },
  { path: 'login', component: LoginComponent  },
  { path: 'countrylistpage', component: CountylistpageComponent},
  { path: 'dashboard', component: DashboardpagesComponent },
  { path: 'dashboardstart', component: DashboardstartComponent },
  { path: 'dashboardtimeline', component: DashtimelinepageComponent },
  { path: 'dashboardPb1', component: DashboardPb1Component },
  { path: 'dashboardPb2', component: DashboardPb2Component },
  { path: 'dashboardPb3', component: DashboardPb3Component },
  { path: 'dashboardPb4', component: DashboardPb4Component },
  { path: 'dashboardPb5', component: DashboardPb5Component },
  { path: 'dashboardPb6', component: DashboardPb6Component },
  { path: 'dashboardshortlisting', component: DashboardShortlistingComponent },
  { path: 'dashboardpbinfo/:this._probabilityService.shortlist_cid/:this._probabilityService.shortlist_level/:this._probabilityService.shortlist_spe/:this._indexservice.examSelected/:this._indexservice.scoreValue', component: DashboardPbinfoComponent },
  { path: 'probabiltyresult/:unId/:conId', component: ProbabilityresultpageComponent  },
  { path: 'forgotpassword', component: ForgotpasswordComponent  },
  { path: 'resetpassword/:email', component: ResetpasswordComponent  },
  { path: 'dashboardtool', component: DashboardToolComponent },
  { path: 'shortlistuniversities/:this._probabilityService.shortlist_cid/:this._probabilityService.shortlist_level/:this._probabilityService.shortlist_spe/:this._indexservice.examSelected/:this._indexservice.scoreValue', component: ShortlistingToolComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
