import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Marca } from 'src/app/models/marca/marca';
import { MercantilService } from 'src/app/services/mercantil/mercantil.service';
import { Validators } from '@angular/forms';
import { UtilsfunctionsService } from 'src/app/services/utils/utilsfunctions.service';
import { Version } from 'src/app/models/version/version';
import { FormHandlerData } from 'src/app/models/formHandler/formHandlerData';
import { ShareService } from 'src/app/services/shareService/share-service.service';

@Component({
  selector: 'app-vehicle-data',
  templateUrl: './vehicle-data.component.html',
  styleUrls: ['./vehicle-data.component.scss']
})
export class VehicleDataComponent implements OnInit {
  
  @Input('fireInit') fireInit: boolean;
  @Output('onNext') onNext = new EventEmitter(); 
  @Output('onBefore') onBefore = new EventEmitter(); 
  marcas: Array<Marca> = new Array();
  filteredMarcas: Array<Marca> = new Array();

  modelos: Array<string> = new Array();
  filteredModelos: Array<string> = new Array();

  versiones: Array<Version> = new Array();
  filteredVersiones: Array<Version> = new Array();

  years: Array<string> = this.getYearsList(2020 - 20);

  vehicleForm: FormGroup;
  selectedDropdown = {
    'marca': null,
    'modelo': null,
    'version': null
  }

  static keyformstorage = 'vehicledata';

  constructor(private mercantilApi: MercantilService, private fb: FormBuilder, private utils: UtilsfunctionsService, private shareService: ShareService) { }

  ngOnInit(): void {
    const form_info = this.shareService.getKeyData(VehicleDataComponent.keyformstorage);
    this.vehicleForm = this.fb.group({
      marca: [form_info?.marca, [Validators.required]],
      fecha: [{value: form_info?.fecha, disabled: true}, [Validators.required]],
      modelo: [{value: form_info?.modelo, disabled: true}, [Validators.required]],
      version: [{value: form_info?.version, disabled: true}]
    });

    if (form_info) {
      this.onMarcaSelection(form_info.marca, false);
      this.onModelSelection(form_info.modelo, false);
      this.onVersionSelection(form_info.version);
      this.utils.enableControl(this.vehicleForm.get('modelo'));
      this.utils.enableControl(this.vehicleForm.get('version'));
    }

    if (this.fireInit) {
      this.mercantilApi.getMarcas().subscribe( (data: Array<Marca>) => {
        this.marcas = data;
        this.filteredMarcas = this.utils.sortArray(data, 'desc');
      })
    }
  }

  public filterElement(element: string, key: string): void {
    if (key === 'marca') {
      this.filteredMarcas = this.utils.filterArray(this.marcas, element, 'desc');
    } 
    
    if (key === 'modelo') {
      this.filteredModelos = this.utils.filterArray(this.modelos, element);
    } 

    if (key === 'version') {
      this.filteredVersiones = this.utils.filterArray(this.versiones, element, 'desc');
    }
  }

  public onMarcaSelection(marca: Marca, reset?: boolean): void {
    this.utils.enableControl(this.vehicleForm.get('fecha'));
    if (reset) this.resetForm();
    this.selectedDropdown.marca = marca;
  }

  public onModelSelection(model: string, reset?: boolean): void {
    this.utils.enableControl(this.vehicleForm.get('version'));
    this.selectedDropdown.modelo = model;
    this.mercantilApi
    .getVersiones(this.selectedDropdown.marca.codigo, this.vehicleForm.get('fecha').value, model)
    .subscribe( (versiones: Array<Version>) => {
      if (versiones.length) {
        this.versiones = versiones;
        this.filteredVersiones = this.utils.sortArray(versiones, 'desc');
        if (reset) this.vehicleForm.get('version').setValue(null);
        this.utils.enableControl(this.vehicleForm.get('version'));
      }
    });
  }

  public onVersionSelection(version: Version): void {
    this.selectedDropdown.version = version;
  }

  public onYearSelection($event): void {
    if (this.selectedDropdown.marca && this.vehicleForm.get('fecha').valid) {
      this.vehicleForm.get('modelo').setValue(null);
      this.vehicleForm.get('version').setValue(null);
      this.getModelos(this.selectedDropdown.marca.codigo, this.vehicleForm.get('fecha').value);
    }
  }

  public onModelFreeSelection(value: string): void {
    if (value != '') {
      this.utils.enableControl(this.vehicleForm.get('version'));
      this.filteredVersiones = [];
    } else {
      this.utils.clearControl(this.vehicleForm.get('version'));
    }
  }

  public resetForm(): void {
    this.vehicleForm.get('fecha').setValue(null);
    this.utils.clearControl(this.vehicleForm.get('modelo'));
    this.utils.clearControl(this.vehicleForm.get('version'));
  }

  public getModelos(marca: number, fecha: string) {
    this.mercantilApi.getModelos(marca.toString(), fecha).subscribe( (data: Array<string>) => {
      this.modelos = data;
      this.filteredModelos = this.utils.sortArray(data);
      this.utils.enableControl(this.vehicleForm.get('modelo'));
    })
  }

  public getOptionText(marca: Marca): string | null {
    return (marca) ? marca.desc : null;
  }

  public getVersionText(version: Version): string | null {
    return (version) ? version.desc : null;
  }

  public getYearsList(startYear: number) {
    var currentYear = new Date().getFullYear();
    var years = [];
    while ( startYear <= currentYear ) {
      years.push(startYear++);
    }   
    return years.sort( (a, b) => {
      if (a < b) return 1;
      if (a > b) return -1;
      return 0;
    });
  }

  public checkSelection(value: string, variable: string): void {
    if (variable === 'marca') {
      if (!this.selectedDropdown.marca || this.selectedDropdown.marca !== this.vehicleForm.get('marca').value) {
        this.vehicleForm.get('marca').setValue(null);
        this.selectedDropdown.marca = null;
        this.filteredMarcas = this.marcas;
        this.utils.clearControl(this.vehicleForm.get('fecha'));
        this.resetForm();
      }
    } 

    if (variable === 'model') {
      if (!this.selectedDropdown.modelo || (this.selectedDropdown.modelo !== this.vehicleForm.get('modelo').value)) {
        this.vehicleForm.get('modelo').setValue(null);
        this.selectedDropdown.modelo = null;
        this.filteredModelos = this.modelos;
      }
    }
  }

  public onSubmit(form: FormGroup): void {
    if (form.valid) {
      const dataHandler: FormHandlerData = {
        key: VehicleDataComponent.keyformstorage,
        data: this.vehicleForm.value
      }
      this.onNext.emit(dataHandler)
    }
  }

  public onReturn(): void {
    this.onBefore.emit(true)
  }

}
