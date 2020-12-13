import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.scss']
})
export class SuccessComponent implements OnInit {

  @Input() fireInit: boolean;
  constructor() { }

  ngOnInit(): void {
  }

  onVerProducto(): void {
    alert("REDIRECCIÓN A DETALLE DE PRODUCTO");
  }

}
