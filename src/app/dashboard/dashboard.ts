import { Component } from '@angular/core';
import {Meteo} from './meteo/meteo';
import {Statistics} from './statistics/statistics';

@Component({
  selector: 'app-dashboard',
  imports: [
    Meteo,
    Statistics
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class Dashboard {

}
