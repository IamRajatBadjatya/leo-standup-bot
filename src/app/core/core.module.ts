import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreRoutingModule } from './core-routing.module';
import { DataService } from './services/data.service';
import { HttpClientModule } from '@angular/common/http';
import { EntryPageComponent } from './components/entry-page/entry-page.component';
import { SlackApiService } from './services/slack-api.service';

@NgModule({
  imports: [
    CommonModule,
    CoreRoutingModule,
    HttpClientModule
  ],
  declarations: [EntryPageComponent],
  providers: [SlackApiService]
})
export class CoreModule { }
