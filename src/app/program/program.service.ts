import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ProgramParserService } from './program-parser.service';

@Injectable({
  providedIn: 'root'
})
export class ProgramService {

  constructor(
    private programParserService: ProgramParserService,
    private httpClient: HttpClient) { }

  sendDSL(dsl: string): Observable<any> {
    return this.httpClient.post<any>(environment.masterNodeBaseUrl + "/saveProgram", this.programParserService.parse(dsl));
  }
}