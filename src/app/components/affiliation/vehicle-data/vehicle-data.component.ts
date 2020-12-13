import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Marca } from 'src/app/models/marca/marca';
import { MercantilService } from 'src/app/services/mercantil/mercantil.service';
import { Validators } from '@angular/forms';
import { UtilsfunctionsService } from 'src/app/services/utils/utilsfunctions.service';
import { Version } from 'src/app/models/version/version';
import { FormHandlerData } from 'src/app/models/formHandler/formHandlerData';

@Component({
  selector: 'app-vehicle-data',
  templateUrl: './vehicle-data.component.html',
  styleUrls: ['./vehicle-data.component.scss']
})
export class VehicleDataComponent implements OnInit {
  
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

  constructor(private mercantilApi: MercantilService, private fb: FormBuilder, private utils: UtilsfunctionsService) { }

  ngOnInit(): void {
    this.vehicleForm = this.fb.group({
      marca: ['', [Validators.required]],
      fecha: [{value: '', disabled: true}, [Validators.required]],
      modelo: [{value: '', disabled: true}, [Validators.required]],
      version: [{value: '', disabled: true}]
    });

    this.mercantilApi.getMarcas().subscribe( (data: Array<Marca>) => {
      this.marcas = data;
      this.filteredMarcas = this.utils.sortArray(data, 'desc');
    })
  }

  public filterElement(element: string, key: string): void {
    if (key === 'marca') {
      this.filteredMarcas = this.utils.filterArray(this.marcas, element, 'desc');
    } 
    
    if (key === 'modelo') {
      if (element === '')
        this.utils.clearControl(this.vehicleForm.get('modelo'));
      this.filteredModelos = this.utils.filterArray(this.modelos, element);
    } 

    if (key === 'version') {
      if (element === '') 
        this.utils.clearControl(this.vehicleForm.get('direccion').get('domicilio'));
      this.filteredVersiones = this.utils.filterArray(this.versiones, element);
    }
  }

  public onMarcaSelection(marca: Marca): void {
    this.utils.enableControl(this.vehicleForm.get('fecha'));
    this.selectedDropdown.marca = marca;
    if (this.vehicleForm.get('fecha').value && this.vehicleForm.get('fecha').valid) {
      this.getModelos(marca, this.vehicleForm.get('fecha').value);
    }
  }

  public onModelSelection(model: string): void {
    this.utils.enableControl(this.vehicleForm.get('version'));
    this.selectedDropdown.modelo = model;
    this.mercantilApi
    .getVersiones(this.selectedDropdown.marca.codigo, this.vehicleForm.get('fecha').value, model)
    .subscribe( (versiones: Array<Version>) => {
      console.log(versiones);
      this.versiones = versiones;
      this.filteredVersiones = this.utils.sortArray(versiones, 'desc');
      this.utils.enableControl(this.vehicleForm.get('version'));
    });
  }

  public onVersionSelection(version: string): void {
    this.selectedDropdown.version = version;
  }

  public onYearSelection($event): void {
    if (this.selectedDropdown.marca && this.vehicleForm.get('fecha').valid) {
      this.getModelos(this.selectedDropdown.marca.codigo, this.vehicleForm.get('fecha').value);
    }
  }

  public getModelos(marca: Marca, fecha: string) {
    this.mercantilApi.getModelos(marca.toString(), fecha).subscribe( (data: Array<string>) => {
      this.modelos = data;
      this.filteredModelos = this.utils.sortArray(data);
      this.utils.enableControl(this.vehicleForm.get('modelo'));
    })
  }

  public getOptionText(marca: Marca): string | null{
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
      if (value === '') {
        if (this.selectedDropdown.marca) {
          this.vehicleForm.get('marca').setValue(this.selectedDropdown.marca);
        } else {
          this.vehicleForm.get('marca').setValue(null);
        }
      } else {
        if (this.vehicleForm.get('marca').value.codigo !== undefined) {
          if (this.selectedDropdown.marca) {
            this.vehicleForm.get('marca').setValue(this.selectedDropdown.marca);
          } else {
            this.vehicleForm.get('marca').setValue(null);
          }
        } else {
          this.vehicleForm.get('marca').setValue(null);
        }
      }
    } 

    if (variable === 'model') {
      if (!this.selectedDropdown.modelo || (this.selectedDropdown.modelo !== this.vehicleForm.get('modelo').value)) {
        this.vehicleForm.get('modelo').setValue(null);
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
