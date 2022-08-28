import { Inject, Injectable } from '@angular/core';
import { HttpAction } from '../models/enums';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {
    
	private _baseUrl: string = '';
  constructor( private http: HttpClient, @Inject('BASE_URL') baseUrl: string,) { this._baseUrl = baseUrl; }

  sendWebAPIRequest(urlRelativePath: string, dataObject: any, requestHeaders?: any, baseUrl?: string, action?: HttpAction) {
      
	let headers :HttpHeaders = new HttpHeaders();      
	headers = headers.set('Access-Control-Allow-Origin' , '*');
	headers = headers.set('Content-Type', 'application/json');
	headers = headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
   
	if(requestHeaders !== undefined ){   
	  headers = requestHeaders;
	}
	if(action==null || action== undefined)
	  action = HttpAction.GET;

	switch(action.toUpperCase()) { 

	  case HttpAction.GET: { 
		return this.http
		.get(this._baseUrl + urlRelativePath,{ headers: headers})
		.pipe(map((data: any) => data,
        catchError(err => {
          console.log(err);
          return err;
        })
      )).toPromise();
		 break; 
	  }

    case HttpAction.POST: {
    return this.http
      .post(this._baseUrl + urlRelativePath, dataObject,{ headers: headers})
      .pipe(map((data: any) => data,
        catchError(err => {
          console.log(err);
          return err;
        })
      )).toPromise();
      break;
    }

	  case HttpAction.PUT: { 
		return this.http
		.put(this._baseUrl + urlRelativePath, dataObject,{ headers: headers})
		.pipe(map((data: any) => data,
        catchError(err => {
          console.log(err);
          return err;
        })
      )).toPromise();
		 break; 
	  }

	  case HttpAction.DELETE: { 
		return this.http
		.delete(this._baseUrl + urlRelativePath,{ headers: headers})
		.pipe(map((data: any) => data,
        catchError(err => {
          console.log(err);
          return err;
        })
      )).toPromise();
		 break; 
	  } 

	  default: { 
      return this.http
      .post(this._baseUrl + urlRelativePath, dataObject,{ headers: headers})
      .pipe(map((data: any) => data,
        catchError(err => {
          console.log(err);
          return err;
        })
      )).toPromise();
		 break; 
	  } 
   }    
  }
}

