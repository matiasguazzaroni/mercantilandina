import { NgComponentOutlet } from '@angular/common';
import { Component, Input, OnInit, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { MatStepper } from '@angular/material/stepper';
import { Step } from 'src/app/models/step/step';
import { FormHandlerData } from 'src/app/models/formHandler/formHandlerData';
import { ShareService } from 'src/app/services/shareService/share-service.service';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss']
})
export class StepperComponent implements OnInit {

  @Input() steps: Array<Step>;
  @ViewChild('stepper') stepper: MatStepper;
  @ViewChildren(NgComponentOutlet) loadedcomponents: QueryList<any>;

  currentIndex: number = 0;

  constructor(private sharedService: ShareService) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    console.log(this.loadedcomponents.toArray())
    this.loadedcomponents.toArray().forEach( (component) => {
      component._componentRef.instance.onNext.subscribe(this.handleNext);
      component._componentRef.instance.onBefore?.subscribe(this.handleBefore)
    })
  }

  handleNext = ($event: FormHandlerData) => {
    console.log("MI EVENTO LLEGO ", $event);
    this.sharedService.setData($event);
    this.currentIndex++;    
    //this.currentcomponent = this.steps[this.currentIndex];
    this.getStepper.next();
  }

  handleBefore = ($event: any) => {
    console.log("MI EVENTO LLEGO ATRAS ", $event);
    this.currentIndex--;    
    //this.currentcomponent = this.steps[this.currentIndex];
    this.getStepper.previous();
  }

  get getStepper(): MatStepper {
    return this.stepper;
  }
}
