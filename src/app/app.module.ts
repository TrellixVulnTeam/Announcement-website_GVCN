import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { announceComponent } from './components/announce/announce.component';
import { announceFormComponent } from './components/announce-form/announce-form.component';
import { announceListComponent } from './components/announce-list/announce-list.component';

import { announceListService } from './services/announce-list.service';
import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from './components/header/header.component';
import { AllannounceListComponent } from './components/all-announce-list/all-announce-list.component';
import { announceDetailComponent } from './components/announce-detail/announce-detail.component';
import { EditannounceComponent } from './components/edit-announce/edit-announce.component';
import { DateComponent } from './components/date/date.component';

@NgModule({
  declarations: [
    AppComponent,
    announceComponent,
    announceFormComponent,
    announceListComponent,
    HeaderComponent,
    AllannounceListComponent,
    announceDetailComponent,
    EditannounceComponent,
    DateComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    AppRoutingModule
  ],
  providers: [announceListService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
