import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ProgramService {
    private baseUrl = environment.apiBaseUrl;

    constructor(private http: HttpClient) { }

    sendDSL(instructions: any): void {
        this.http.post(this.baseUrl + "/sendDSL", { instructions });
    }
}