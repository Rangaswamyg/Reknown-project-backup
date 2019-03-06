import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardpagesRoutingModule } from './dashboardpages-routing.module';
import { ShortlistingToolComponent } from './shortlisting-tool/shortlisting-tool.component';

@NgModule({
  imports: [
    CommonModule,
    DashboardpagesRoutingModule
  ],
  declarations: [ShortlistingToolComponent]
})
export class DashboardpagesModule { }
