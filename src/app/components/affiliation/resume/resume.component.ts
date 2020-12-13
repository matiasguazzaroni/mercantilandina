import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ShareService } from 'src/app/services/shareService/share-service.service';

@Component({
  selector: 'app-resume',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.scss']
})
export class ResumeComponent implements OnInit {

  @Output('onNext') onNext = new EventEmitter();
  @Output('onBefore') onBefore = new EventEmitter();

  resume_info: any;

  constructor(private sharedService: ShareService) { }

  ngOnInit(): void {
    console.log(this.sharedService.getData());
    this.resume_info = this.sharedService.getData();
  }

  public onReturn(): void {
    this.onBefore.emit(true)
  }

  public onConfirm(): void {
    this.sharedService.clearData();
    this.onNext.emit(true)
  }

}
