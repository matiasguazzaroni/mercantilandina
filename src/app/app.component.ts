import { Component, ChangeDetectorRef } from '@angular/core';
import { LoaderService } from './services/loader/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'mercantilandina';
  showSpinner: boolean = false;

  constructor(private loaderService: LoaderService, private cdr: ChangeDetectorRef) {}

  ngAfterViewInit(): void {
    this.loaderService.httpProgress().subscribe((status: boolean) => {
      this.showSpinner = status;
      this.cdr.detectChanges();
    });

  }
}
