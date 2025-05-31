import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { TrainingComponent } from './training/training.component';
import { NewTrainingComponent } from './new-training/new-training.component';
import { CurrentTrainingComponent } from './current-training/current-training.component';
import { PastTrainingComponent } from './past-training/past-training.component';
import { HomeComponent } from './home/home.component';
import { FormsModule } from '@angular/forms';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';
import {
  MaterialPersianDateAdapter,
  PERSIAN_DATE_FORMATS,
} from './persian-dateadapter';
import { HeaderComponent } from './navigation/header/header.component';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';
import { StopTrainingModalComponent } from './current-training/stop-training-modal/stop-training-modal.component';
import { AuthService } from './auth/auth.service';
import { ReactiveFormsModule } from '@angular/forms';
import { TrainingService } from './training/training.service';
import { TranslationPipe } from './translation.pipe';
import { PersianDatePipe } from './persian-date.pipe';
import { MatPaginatorIntl } from '@angular/material/paginator';
import {PersianPaginatorIntl}from './pagination.translate';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    TrainingComponent,
    NewTrainingComponent,
    CurrentTrainingComponent,
    PastTrainingComponent,
    HomeComponent,
    HeaderComponent,
    SidenavListComponent,
    StopTrainingModalComponent,
    TranslationPipe,
    PersianDatePipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: DateAdapter,
      useClass: MaterialPersianDateAdapter,
      deps: [MAT_DATE_LOCALE],
    },
    {
      provide: MAT_DATE_FORMATS,
      useValue: PERSIAN_DATE_FORMATS,
    },
    {provide:MatPaginatorIntl,useClass:PersianPaginatorIntl},
    AuthService,
    TrainingService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
