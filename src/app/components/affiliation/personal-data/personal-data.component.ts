import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { regexValidator } from '../../../directives/validators/regexValidator';
import { ageValidator } from '../../../directives/validators/ageValidator';
import { passwordValidator } from '../../../directives/validators/passwordValidator';
import { notExistsValidator } from '../../../directives/validators/notExistsValidator';
import { AbstractControl } from '@angular/forms'
import { GeorefService } from 'src/app/services/georef/georef.service';
import { Province } from 'src/app/models/province/province';
import { Municipio } from 'src/app/models/municipio/municipio';
import { MockmercantilService } from 'src/app/services/mockmercantil/mockmercantil.service';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { UtilsfunctionsService } from 'src/app/services/utils/utilsfunctions.service';

@Component({
  selector: 'app-personal-data',
  templateUrl: './personal-data.component.html',
  styleUrls: ['./personal-data.component.scss']
})
export class PersonalDataComponent implements OnInit {

  @Output('onNext') onNext = new EventEmitter(); 
  personalForm: FormGroup;
  lettersRegex: RegExp = /^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s ]*)$/;
  numbersRegex: RegExp = /^[0-9]*$/;
  noFirstBlankSpace: RegExp = /^\S.*$/;
  noWhiteSpace = /^\S*$/;

  score: number = 0;
  provincias: Array<Province> = new Array();
  filteredProvincias: Array<Province> = new Array();

  municipios: Array<Municipio> = new Array();
  filteredMunicipios: Array<Municipio> = new Array();

  usernameCheck = new Subject<string>();
  userExists: boolean = false;

  selectedDropdown = {
    'province': null,
    'city': null
  }

  constructor(private fb: FormBuilder, private georefService: GeorefService, private mocksService: MockmercantilService, private utils: UtilsfunctionsService) { }

  ngOnInit(): void {
    this.personalForm = this.fb.group({
      dni: ['', [Validators.required, Validators.minLength(7), Validators.maxLength(8), regexValidator(this.numbersRegex)]],
      nombre: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(15), regexValidator(this.lettersRegex), regexValidator(this.noFirstBlankSpace)]],
      apellido: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(15), regexValidator(this.lettersRegex), regexValidator(this.noFirstBlankSpace)]],
      email: ['', Validators.email],
      celular: [''],
      telefono: [''],
      usuario: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30), (control: AbstractControl) => notExistsValidator(this.userExists)(control), regexValidator(this.noWhiteSpace)]],
      password: ['', [Validators.required, (control: AbstractControl) => passwordValidator(this.score, 60)(control), regexValidator(this.noWhiteSpace)]],
      fechaNacimiento: ['', [Validators.required, ageValidator(18, 99)]],
      direccion: this.fb.group({
        provincia: ['', Validators.required],
        ciudad: [{value: '', disabled: true}, Validators.required],
        domicilio: [{value: '', disabled: true}, Validators.required]
      }),
    });

    this.georefService.getProvincias().subscribe( (data: any) => {
      this.provincias = data.provincias;
      this.filteredProvincias = this.provincias;
    })

    this.usernameCheck.pipe(
      debounceTime(400),
      distinctUntilChanged())
      .subscribe(value => {
        this.personalForm.disable();
        this.mocksService.checkUserAvailability(value).subscribe( (data: any) => {
          this.userExists = data;
          setTimeout(() => {
            this.personalForm.get('usuario').updateValueAndValidity();
          }, 0);
          this.personalForm.enable();
        })
      })
  }

  public setScore(score: number): void {
    this.score = score;
    setTimeout(() => {
      this.personalForm.get('password').updateValueAndValidity();
    }, 0);
  }

  public onSubmit(form: FormGroup) : void {
    (form.valid) ? this.onNext.emit(true) : null;
  }

  public filterElement(element: string, key: string): void {
    if (key === 'provincia') {
      if (element === '')
        this.utils.clearControl(this.personalForm.get('direccion').get('ciudad'));
      this.filteredProvincias = this.utils.filterArray(this.provincias, element, 'nombre');
    } 

    if (key === 'municipio') {
      if (element === '') 
        this.utils.clearControl(this.personalForm.get('direccion').get('domicilio'));
      this.filteredMunicipios = this.utils.filterArray(this.municipios, element, 'nombre');
    }
  }

  public getOptionText(provincia: Province) {
    return (provincia) ? provincia.nombre : null;
  }

  public getCityText(city: Municipio) {
    return (city) ? city.nombre : null;
  }

  public onProvinceSelection(provincia: Province): void {
    this.utils.enableControl(this.personalForm.get('direccion').get('ciudad'));
    this.selectedDropdown.province = provincia.id;
    this.georefService.geMunicipios(provincia.id).subscribe( (data: any) => {
      this.municipios = data.municipios;
      this.filteredMunicipios = this.municipios;
    })
  }

  public onCitySelection(city: Municipio): void {
    this.utils.enableControl(this.personalForm.get('direccion').get('domicilio'));
    this.selectedDropdown.city = city.id;
  }
  
  public checkSelection(variable: string): void {
    if (variable === 'province') {
      if (!this.selectedDropdown.province || (this.personalForm.get('direccion').get('provincia').value && this.selectedDropdown.province !== this.personalForm.get('direccion').get('provincia').value.id)) {
        this.personalForm.get('direccion').get('provincia').setValue(null);
      }
    } else {
      if (!this.selectedDropdown.city || this.selectedDropdown.city !== this.personalForm.get('direccion').get('provincia').value.id) {
        this.personalForm.get('direccion').get('ciudad').setValue(null);
      }
    }
  }

  public onCityFreeSelection(value: string): void {
    if (value != '') {
      this.utils.enableControl(this.personalForm.get('direccion').get('domicilio'));
    } else {
      this.utils.clearControl(this.personalForm.get('direccion').get('domicilio'));
    }
  }
}
