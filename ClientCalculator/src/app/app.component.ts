import { Component, OnInit } from '@angular/core';
import { HelperService } from 'src/app/services/helper.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit  {

  title = 'examclient';
  showApp: boolean = false;
  operations: any[] = [];
  leftValue: string = '';
  rightValue: string = '';
  selectedOperation: string = '';
  calcResult: string = '';

  constructor(public helper: HelperService) { }

  ngOnInit(): void {       
    this.helper.GetOperations().then((responce: any) => {      
      this.operations = responce;
      this.showApp = true;
    });
  }

  calc(){    
    this.calcResult = '';
    if(this.leftValue === undefined || this.leftValue == '')
    {
      this.calcResult = "The left value is missing";
      return;
    }
    if(!this.isNumber(this.leftValue))
    {
      this.calcResult = "The left value is not number";
      return;
    }

    if(this.rightValue === undefined || this.rightValue == '')
    {
      this.calcResult = "The right value is missing";
      return;
    }
    if(!this.isNumber(this.rightValue))
    {
      this.calcResult = "The right value is not number";
      return;
    }

    this.helper.Calc(this.selectedOperation, parseInt(this.leftValue), parseInt(this.rightValue))
    .then((responce: any) => {
      this.calcResult = responce;
    });
  }

  isNumber(val: any) {
    return /^-?[\d.]+(?:e-?\d+)?$/.test(val);
  }

}
