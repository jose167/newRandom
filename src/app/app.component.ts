import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { dashCaseToCamelCase } from '@angular/compiler/src/util';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  apiValues: string[] = [];
  myInterval;
  errorMessage: string;
  lError: boolean = false;
  result1: string;

  @ViewChild('min', {static: false}) inputMin;
  @ViewChild('max', {static: false}) inputMax;

  constructor(private _service: HttpClient) {
  }

  ngOnInit() {
  }

  Start(): void {
    let valueMin: number;
    let valueMax: number;

    valueMin = this.inputMin.nativeElement.value;
    valueMax = this.inputMax.nativeElement.value;

    if (valueMin == 0 || valueMax == 0)
    {
      this.lError = true;
      this.errorMessage = "Values can't be blank";
    }
    else if (valueMin < 0 || valueMax < 0)
    {
      this.lError = true;
      this.errorMessage = "Values Max and Min must be Positive";
    }
    else {
      this.lError = false;
      this.myInterval = setInterval(() => { this.callServer(valueMin, valueMax); }, 1000);
    }
  }

  Stop(): void {
    clearInterval (this.myInterval);
  }

  callServer(valueMin, valueMax): void {
    console.log(valueMin, " ", valueMax);
    this._service.get("/api/Values/" + valueMin + "/" + valueMax)
      .subscribe(result => {
        let oneValue; 

        oneValue = JSON.parse(result);
        //this.result1 = result.toString();
        this.apiValues.push(oneValue);
        console.log(typeof result);
       // console.log(result.tipeOf());
        
      }),
      error => {
        this.errorMessage = error;
        this.lError = true;
      }
  }
}
