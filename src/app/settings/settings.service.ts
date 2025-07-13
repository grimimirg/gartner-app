import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  private baseUrl = 'http://192.168.178.42:80';
  private status: boolean = false;

  constructor(private http: HttpClient) {
  }

  toggleLedOnOff(): Observable<Object> {
    this.status = !this.status;
    return this.http.get(this.baseUrl + "/pin?number=4&status=" + (this.status ? "ON" : "OFF"));

  }
}
