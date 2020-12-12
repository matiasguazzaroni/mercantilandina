import { Component, OnInit, Input, SimpleChange, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-password-strength-meter',
  templateUrl: './password-strength-meter.component.html',
  styleUrls: ['./password-strength-meter.component.scss']
})
export class PasswordStrengthMeterComponent implements OnInit {
  
  @Input() password: string;  
  @Output() onScoreChange: EventEmitter<number> = new EventEmitter<number>();
  step0: string;  
  step1: string;  
  step2: string;  
  step3: string;  
  step4: string;  
  
  private colors = ['#F00', '#F90', '#FF0', '#9F0', '#0F0'];

  constructor() { }

  ngOnInit(): void {
  }

  private static measureStrength(pass: string) {  
    const unit = 100 / 5;

    const hasNumber = /\d/.test(pass);
    const hasUpper = /[A-Z]/.test(pass);
    const hasLower = /[a-z]/.test(pass);
    const has8characters = pass.length >= 8;
    const hasSpecialChar =  /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(pass);

    const valid = hasNumber && hasUpper && hasLower && has8characters && hasSpecialChar;

    if (valid) {
      return 100;
    } else {
      const cantSuccess = [hasNumber, hasUpper, hasLower, has8characters, hasSpecialChar].filter( value => value === true).length;
      const maxScore = 39;
      if (pass.length <= 4) {
        if (cantSuccess >= 3) {
          return maxScore;
        }
        return 19;
      }
      if ((pass.length === 6 || pass.length === 7) && cantSuccess >= 4) {
        return 70;
      }
      const score = cantSuccess * unit;
      if (score === 40 && cantSuccess <= 2) {
        return maxScore;
      }
      if (Number.isFinite(score)) {
        return score;
      }
      return 0;
    }
  }  

  private getColor(score: number) {  
    let idx = 0;  
    if (score > 90) {  
      idx = 4;  
    } else if (score >= 60) {  
      idx = 3;  
    } else if (score >= 40) {  
      idx = 2;  
    } else if (score >= 20) {  
      idx = 1;  
    }  
    return {  
      idx: idx + 1,  
      col: this.colors[idx]  
    };  
  }  

  ngOnChanges(changes: {[propName: string]: SimpleChange}): void {  
    var password = changes['password'].currentValue;  
    this.setBarColors(5, '#DDD');
    var score = 0;
    if (password) {  
      score = PasswordStrengthMeterComponent.measureStrength(password);
      let c = this.getColor(score);  
      this.setBarColors(c.idx, c.col); 
    } 
    this.onScoreChange.emit(score) 
  }

  private setBarColors(count, col) {  
    for (let _n = 0; _n < count; _n++) {  
      this['step' + _n] = col;  
    }  
  }  
}
