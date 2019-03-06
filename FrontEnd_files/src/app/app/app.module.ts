import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { FilterpageComponent } from './filterpage/filterpage.component';
import { FooterpageComponent } from './footerpage/footerpage.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { OtpverificationComponent } from './otpverification/otpverification.component';
import { CountrypageComponent } from './countrypage/countrypage.component';
import { UniversitypageComponent } from './universitypage/universitypage.component';
import { ProbabilitypageComponent } from './probabilitypage/probabilitypage.component';
import { LastpageComponent } from './probabilitypage/lastpage/lastpage.component';
 import { FirstpageComponent } from './probabilitypage/firstpage/firstpage.component';
import { EighthpageComponent } from './probabilitypage/eighthpage/eighthpage.component';
import {NgxPageScrollModule} from 'ngx-page-scroll';
import { SecondpageComponent } from './probabilitypage/secondpage/secondpage.component';
import { UserService } from './services/user.service';
import { IndexService } from './services/index.service';
import { SearchFilterPipe, SearchFilterPipeProbUni,SearchFilterPipeProbCountry,SearchFilterPipeProbLoc,Sec_SearchFilterPipeUni,SearchFilterPipeUni } from './services/filter-pipe';
import { SearchFilterProgramPipe } from './services/filter-pipe';
import { SearchFilterPipeSecondpageUni } from './services/filter-pipe';
import { SearchFilterPipeCountry } from './services/filter-pipe';
import { FilterApiPipe } from './services/filterapi-pipe';
import { FilterApiPipeDropdown } from './services/filterapi-pipe';
import { FilterCoursesPipe } from './services/filterapi-pipe';
import { FilterProgramSearchPipe } from './services/filterapi-pipe';
import { FilterUniversitySearchPipe } from './services/filterapi-pipe';
import { FilterCountrySearchPipe } from './services/filterapi-pipe';
import { UniversitypagePipeDropdown } from './services/filterapi-pipe';
import { ExamScorePipe } from './services/filterapi-pipe';
import { UniversitypagecoursePipeSearch } from './services/filterapi-pipe';
import { SignupCountryApiPipe } from './services/userapi-pipe';
import { ClickOutsideDirective } from './services/dropdown.directive';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {NgxPaginationModule} from 'ngx-pagination';
import {ComparisonpageComponent} from './comparisonpage/comparisonpage.component';
import { OrderModule } from 'ngx-order-pipe';
import { ModalModule } from 'ngx-bootstrap';
import {CountylistpageComponent} from './countylistpage/countylistpage.component';
import { LimitToPipe } from './services/limit-to.pipe';
import { FifthpageComponent } from './probabilitypage/fifthpage/fifthpage.component';
import { DashboardpagesComponent } from './dashboardpages/dashboardpages.component'
import { DashtimelinepageComponent } from './dashboardpages/dashtimelinepage/dashtimelinepage.component'
import { DashnavbarComponent } from './dashboardpages/dashnavbar/dashnavbar.component'
import { DashboardstartComponent } from './dashboardpages/dashboardstart/dashboardstart.component'
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
import { Ng2OdometerModule } from 'ng2-odometer'; // <-- import the module
@NgModule({
  declarations: [
    ShortlistingToolComponent,
      DashboardToolComponent,
      ResetpasswordComponent,
      ForgotpasswordComponent,
      SearchFilterPipeSecondpageUni,
      ProbabilityresultpageComponent,
      DashboardShortlistingComponent,
      DashboardPbinfoComponent,
      DashboardPb2Component,
      DashboardPb4Component,
      DashboardPb5Component,
      DashboardPb3Component,
      DashboardPb6Component,
      DashboardPb1Component,
      DashboardstartComponent,
      DashnavbarComponent,
      DashboardpagesComponent,
      DashtimelinepageComponent,
      SearchFilterPipeCountry,
    AppComponent,
    SearchFilterPipeProbLoc,
    SearchFilterPipeProbUni,
    SearchFilterPipeProbCountry,
    FilterApiPipeDropdown,
    FilterCoursesPipe,
    Sec_SearchFilterPipeUni,
CountylistpageComponent,
      FifthpageComponent,
    FilterProgramSearchPipe,
    FilterUniversitySearchPipe,
    FilterCountrySearchPipe,
    UniversitypagePipeDropdown,
    UniversitypagecoursePipeSearch,
    ExamScorePipe,
    SearchFilterPipeUni,
    SearchFilterPipe,
    SearchFilterProgramPipe,
    FilterApiPipe,
    ClickOutsideDirective,
    HomeComponent,
    NavbarComponent,
    FooterComponent,
    FilterpageComponent,
    FooterpageComponent,
    SignupComponent,
    LoginComponent,
    OtpverificationComponent,
    CountrypageComponent,
    UniversitypageComponent,
    ProbabilitypageComponent,
    LastpageComponent,
     FirstpageComponent,
    SecondpageComponent,
    EighthpageComponent,
    ComparisonpageComponent,
    SignupCountryApiPipe,
    LimitToPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxPageScrollModule,
    HttpModule,
    HttpClientModule,
    FormsModule,
    OrderModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    ModalModule.forRoot(),
    Ng2OdometerModule.forRoot() // <-- include it in your app module
  ],
  providers: [UserService , IndexService,AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
