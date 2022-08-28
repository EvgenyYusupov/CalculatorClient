import { Injectable } from '@angular/core';
import { HttpAction } from '../models/enums';
import { CommunicationService } from './communication.service';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor(public communicationService: CommunicationService, ) {}

  async Calc(operation: string, left: number, right: number){
    let param = { operation: operation, left: left, right: right };
    return await new Promise((resolve, reject) => {
      this.communicationService.sendWebAPIRequest("/GetOperationResult", JSON.stringify(param), undefined, undefined, HttpAction.POST)
        .then((data: string) => {          
          let responce = JSON.parse(data);
           if(responce.Status == "OK" && responce.result != undefined){
            resolve(responce.result);
           } else {
            console.log("Error on call to request: " + data);
            resolve(responce.result);
           }
        }
        ).catch(err => {
          return `Error in communucation service: ${err}`;
        });
    }
    );
	}

  async GetOperations(){    
    return await new Promise((resolve, reject) => {
      this.communicationService.sendWebAPIRequest("/GetCalculatorOperations", [], undefined, undefined, HttpAction.POST)
        .then((data: string) => {         
          let responce = JSON.parse(data);
           if(responce.Status == "OK" && responce.result != undefined){
            resolve(responce.result);
           } else {
            console.log("Error on call to request: " + data);
            resolve(responce.result);
           }
        }
        ).catch(err => {
          return `Error in communucation service: ${err}`;
        });
    }
    );
	}
}
