import { Component, OnInit, ViewChild } from '@angular/core';
import { Step } from 'src/app/models/step/step';
import { CoverageDataComponent } from '../coverage-data/coverage-data.component';
import { PersonalDataComponent } from '../personal-data/personal-data.component';
import { ResumeComponent } from '../resume/resume.component';
import { VehicleDataComponent } from '../vehicle-data/vehicle-data.component';
import { StepperComponent } from '../../shared/stepper/stepper.component';

@Component({
  selector: 'app-affiliation-main',
  templateUrl: './affiliation-main.component.html',
  styleUrls: ['./affiliation-main.component.scss']
})
export class AffiliationMainComponent implements OnInit {

  steps: Array<Step> = [{
    component: PersonalDataComponent,
    title: 'Personal'
  }, {
    component: VehicleDataComponent,
    title: 'Vehículo'
  }, {
    component: CoverageDataComponent,
    title: 'Seguro'
  }, {
    component: ResumeComponent,
    title: 'Resumen'
  }]

  @ViewChild('stepperwizard') stepperComponent: StepperComponent;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    console.log("stepperwizard ", this.stepperComponent.getStepper.steps)
  }
}