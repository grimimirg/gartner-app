import {Component} from '@angular/core';
import {SettingsService} from './settings.service';

@Component({
  selector: 'app-settings',
  imports: [],
  templateUrl: './settings.html',
  styleUrl: './settings.scss'
})
export class Settings {
  constructor(private settingsService: SettingsService) {
  }

  turnOnLed() {
    this.settingsService.toggleLedOnOff().subscribe(value => console.log(value));
  }
}
