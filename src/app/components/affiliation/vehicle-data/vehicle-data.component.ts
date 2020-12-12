import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, AbstractControl } from '@angular/forms';
import { Marca } from 'src/app/models/marca/marca';
import { MercantilService } from 'src/app/services/mercantil/mercantil.service';
import { Validators } from '@angular/forms';
import { UtilsfunctionsService } from 'src/app/services/utils/utilsfunctions.service';

@Component({
  selector: 'app-vehicle-data',
  templateUrl: './vehicle-data.component.html',
  styleUrls: ['./vehicle-data.component.scss']
})
export class VehicleDataComponent implements OnInit {
  
  @Output('onNext') onNext = new EventEmitter(); 
  marcas: Array<Marca> = new Array();
  filteredMarcas: Array<Marca> = new Array();

  modelos: Array<string> = new Array();
  filteredModelos: Array<string> = new Array();

  versiones: Array<string> = new Array();
  filteredVersiones: Array<string> = new Array();

  vehicleForm: FormGroup;
  selectedDropdown = {
    'marca': null,
    'modelo': null,
    'version': null
  }

  constructor(private mercantilApi: MercantilService, private fb: FormBuilder, private utils: UtilsfunctionsService) { }

  ngOnInit(): void {
    this.vehicleForm = this.fb.group({
      marca: ['', [Validators.required]],
      fecha: ['', [Validators.required]],
      modelo: [{value: '', disabled: true}, [Validators.required]],
      version: [{value: '', disabled: true}]
    });

    this.mercantilApi.getMarcas().subscribe( (data: Array<Marca>) => {
      this.marcas = data;
      this.filteredMarcas = data;
    })
  }

  public filterElement(element: string, key: string): void {
    if (key === 'marca') {
      if (element === '')
        this.utils.clearControl(this.vehicleForm.get('marca'));
      this.filteredMarcas = this.utils.filterArray(this.marcas, element);
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
    this.selectedDropdown.marca = marca.codigo;
    if (this.vehicleForm.get('fecha') && this.vehicleForm.get('fecha').valid) {
      this.getModelos(marca, this.vehicleForm.get('fecha').value.getYear());
    }
  }

  public onModelSelection(model: string): void {
    this.utils.enableControl(this.vehicleForm.get('version'));
    this.selectedDropdown.modelo = model;
    this.mercantilApi
    .getVersiones(this.vehicleForm.get('marca').value, this.vehicleForm.get('fecha').value.getYear(), model)
    .subscribe( (versiones: Array<string>) => {
      this.versiones = versiones;
      this.filteredVersiones = versiones;
    });
  }

  public onVersionSelection(version: string): void {
    this.selectedDropdown.version = version;
  }

  public onDateChange($event): void {
    console.log("$event ", $event);
    if (this.selectedDropdown.marca && this.vehicleForm.get('fecha').valid) {
      this.getModelos(this.selectedDropdown.marca, this.vehicleForm.get('fecha').value.getYear());
    }
  }

  public getModelos(marca: Marca, fecha: string) {
    this.mercantilApi.getModelos(marca.codigo.toString(), fecha).subscribe( (data: Array<string>) => {
      this.modelos = data;
      this.filteredModelos = data;
    })
  }

  public getOptionText(marca: Marca) {
    return (marca) ? marca.desc : null;
  }

  public checkSelection(variable: string): void {
    if (variable === 'marca') {
      if (!this.selectedDropdown.marca || (this.vehicleForm.get('marca').value && this.selectedDropdown.marca !== this.vehicleForm.get('marca').value.codigo)) {
        this.vehicleForm.get('marca').setValue(null);
      }
    }

    if (variable === 'model') {
      if (!this.selectedDropdown.modelo || (this.vehicleForm.get('modelo').value && this.selectedDropdown.modelo !== this.vehicleForm.get('modelo').value)) {
        this.vehicleForm.get('modelo').setValue(null);
      }
    }

    if (variable === 'version') {
      if (!this.selectedDropdown.version || (this.vehicleForm.get('version').value && this.selectedDropdown.version !== this.vehicleForm.get('version').value)) {
        this.vehicleForm.get('version').setValue(null);
      }
    }
  }

  public onSubmit(form: FormGroup) : void {
    (form.valid) ? this.onNext.emit(true) : null;
  }

}
