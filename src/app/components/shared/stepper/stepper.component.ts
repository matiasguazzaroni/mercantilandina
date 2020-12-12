import { NgComponentOutlet } from '@angular/common';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatStepper } from '@angular/material/stepper';
import { Step } from 'src/app/models/step/step';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss']
})
export class StepperComponent implements OnInit {

  @Input() steps: Array<Step>;
  @ViewChild('stepper') stepper: MatStepper;
  @ViewChild(NgComponentOutlet) currentcomponent;
  
  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.currentcomponent._componentRef.instance.onNext.subscribe(this.handleNext)
  }

  handleNext = ($event: any) => {
    console.log("MI EVENTO LLEGO ", $event);
    this.getStepper.next();
  }

  get getStepper(): MatStepper {
    return this.stepper;
  }

}
