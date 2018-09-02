import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreRoutingModule } from './core-routing.module';
import { DataService } from './services/data.service';
import { HttpClientModule } from '@angular/common/http';
import { EntryPageComponent } from './components/entry-page/entry-page.component';
import { SlackApiService } from './services/slack-api.service';
import { CreateStandupComponent } from './components/create-standup/create-standup.component';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  imports: [
    CommonModule,
    CoreRoutingModule,
    HttpClientModule,
    MaterialModule,
    ReactiveFormsModule,
    FlexLayoutModule
  ],
  declarations: [EntryPageComponent, CreateStandupComponent],
  providers: [SlackApiService]
})
export class CoreModule { }
