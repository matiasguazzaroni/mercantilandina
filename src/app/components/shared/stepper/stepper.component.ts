import { NgComponentOutlet } from '@angular/common';
import { Component, Input, OnInit, ViewChild, ViewChildren, QueryList, ChangeDetectorRef } from '@angular/core';
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

  componentsInstance: Array<any> = new Array();
  currentIndex: number = 0;

  constructor(private sharedService: ShareService, private shareService: ShareService, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.loadedcomponents.toArray().forEach( (component) => {
      component._componentRef.instance.fireInit = false;
      component._componentRef.instance.onNext?.subscribe(this.handleNext);
      component._componentRef.instance.onBefore?.subscribe(this.handleBefore);
      this.componentsInstance.push(component._componentRef.instance);
    })
    this.stepper.selectedIndex = this.shareService.getKeyData("step") ? this.shareService.getKeyData("step") : 0;
    if (this.stepper.selectedIndex === -1) this.stepper.selectedIndex = 0;
    this.currentIndex = this.stepper.selectedIndex;
    if (this.stepper.selectedIndex !== 0) {
      for (let i = 0; i <= this.stepper.selectedIndex; i++) {
        this.steps[i].completed = true;
      }
    }

    this.initializeComponent();
    this.cdr.detectChanges();
  }

  handleNext = ($event: FormHandlerData) => {
    this.currentIndex++;
    for (let i = 0; i <= this.currentIndex; i++) {
      this.steps[i].completed = true;
    }
    if ($event != null) {
      this.sharedService.setData($event);
      this.shareService.setCurrentStep(this.currentIndex.toString());
    }
    this.initializeComponent().then( () => { 
      this.stepper.next()
    });
  }

  handleBefore = ($event: any) => {
    this.currentIndex--;
    for (let i = this.steps.length - 1; i >= this.currentIndex; i--) {
      this.steps[i].completed = false;
    } 
    this.shareService.setCurrentStep(this.currentIndex.toString());  
    this.initializeComponent().then( () => { 
      this.stepper.previous()
    });
  }

  async initializeComponent() {
    this.componentsInstance[this.currentIndex].fireInit = true; 
    this.componentsInstance[this.currentIndex].ngOnInit();
  }

  get getStepper(): MatStepper {
    return this.stepper;
  }
}
