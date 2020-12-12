import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PersonalDataComponent } from './components/affiliation/personal-data/personal-data.component';
import { VehicleDataComponent } from './components/affiliation/vehicle-data/vehicle-data.component';
import { CoverageDataComponent } from './components/affiliation/coverage-data/coverage-data.component';
import { ResumeComponent } from './components/affiliation/resume/resume.component';
import { AffiliationMainComponent } from './components/affiliation/affiliation-main/affiliation-main.component';
import { StepperComponent } from './components/shared/stepper/stepper.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PasswordStrengthMeterComponent } from './components/shared/password-strength-meter/password-strength-meter.component';
import { HttpClientModule } from '@angular/common/http';


/*Angular Material Components */
import { MatStepperModule } from '@angular/material/stepper';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    PersonalDataComponent,
    VehicleDataComponent,
    CoverageDataComponent,
    ResumeComponent,
    AffiliationMainComponent,
    StepperComponent,
    FooterComponent,
    PasswordStrengthMeterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatStepperModule,
    MatInputModule,
    MatAutocompleteModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatButtonModule,
    HttpClientModule
  ],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'es-AR'}, 
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
    {provide: 'API_MA_URL', useValue: environment.base_mercantilandina_url},
    {provide: 'API_MOCK_URL', useValue: environment.base_apimock_url},
    {provide: 'API_GEO_URL', useValue: environment.base_georef_url}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
