import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MockmercantilService } from 'src/app/services/mockmercantil/mockmercantil.service';
import { Cobertura } from '../../../models/cobertura/cobertura';
import { FormHandlerData } from 'src/app/models/formHandler/formHandlerData';
import { UtilsfunctionsService } from 'src/app/services/utils/utilsfunctions.service';

@Component({
  selector: 'app-coverage-data',
  templateUrl: './coverage-data.component.html',
  styleUrls: ['./coverage-data.component.scss']
})
export class CoverageDataComponent implements OnInit {

  @Output('onNext') onNext = new EventEmitter(); 
  @Output('onBefore') onBefore = new EventEmitter(); 

  coberturas: Array<Cobertura> = new Array();
  previousSelectionIndex: number;
  coberturaSeleccionada: Cobertura;

  static keyformstorage = 'coveragedata';

  constructor(private mocksService: MockmercantilService, private utils: UtilsfunctionsService) { }

  ngOnInit(): void {
    this.mocksService.getCoberturas().subscribe( (data: Array<Cobertura>) => {
      this.coberturas = this.utils.sortArray(data, 'puntaje', true);
      console.log("coberturas:: ", data);
    })
  }

  selectCoverage(cobertura: Cobertura, index: number) {
    this.coberturaSeleccionada = cobertura;
    cobertura.selected = true;
    if (this.previousSelectionIndex != null) {
      this.coberturas[this.previousSelectionIndex].selected = false;
      this.previousSelectionIndex = index;
    } else {
      this.previousSelectionIndex = index;
    }
  }
  
  public onReturn(): void {
    this.onBefore.emit(true);
  }

  public onSubmit(): void {
    if (this.coberturaSeleccionada) {
      const dataHandler: FormHandlerData = {
        key: CoverageDataComponent.keyformstorage,
        data: this.coberturaSeleccionada
      }
      this.onNext.emit(dataHandler)
    } else { //show error

    }
  }

}
