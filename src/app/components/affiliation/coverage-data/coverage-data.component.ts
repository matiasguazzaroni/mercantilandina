import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { MockmercantilService } from 'src/app/services/mockmercantil/mockmercantil.service';
import { Cobertura } from '../../../models/cobertura/cobertura';
import { FormHandlerData } from 'src/app/models/formHandler/formHandlerData';
import { UtilsfunctionsService } from 'src/app/services/utils/utilsfunctions.service';
import { ShareService } from 'src/app/services/shareService/share-service.service';

@Component({
  selector: 'app-coverage-data',
  templateUrl: './coverage-data.component.html',
  styleUrls: ['./coverage-data.component.scss']
})
export class CoverageDataComponent implements OnInit {

  @Input('fireInit') fireInit: boolean;
  @Output('onNext') onNext = new EventEmitter(); 
  @Output('onBefore') onBefore = new EventEmitter(); 

  coberturas: Array<Cobertura> = new Array();
  previousSelectionIndex: number;
  coberturaSeleccionada: Cobertura;

  static keyformstorage = 'coveragedata';

  constructor(private mocksService: MockmercantilService, private utils: UtilsfunctionsService, private shareService: ShareService) { }

  ngOnInit(): void {
    const form_info = this.shareService.getKeyData(CoverageDataComponent.keyformstorage);

    if (this.fireInit) {
      this.mocksService.getCoberturas().subscribe( (data: Array<Cobertura>) => {
        this.coberturas = this.utils.sortArray(data, 'puntaje', true);
        console.log("coberturas:: ", data);
        if (form_info) {
          this.coberturaSeleccionada = form_info;
          const index = this.coberturas.findIndex( (cobertura) => { return cobertura.numero === this.coberturaSeleccionada.numero })
          this.previousSelectionIndex = index;
          this.coberturas[index].selected = true;
        }
      })
    }
  }

  selectCoverage(cobertura: Cobertura, index: number) {
    if (!this.coberturaSeleccionada || cobertura.numero !== this.coberturaSeleccionada.numero) {
      this.coberturaSeleccionada = cobertura;
      cobertura.selected = true;
      if (this.previousSelectionIndex != null) {
        this.coberturas[this.previousSelectionIndex].selected = false;
        this.previousSelectionIndex = index;
      } else {
        this.previousSelectionIndex = index;
      }
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
