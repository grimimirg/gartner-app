import { Routes } from '@angular/router';
import {Dashboard} from './dashboard/dashboard';
import {Settings} from './settings/settings';

export const routes: Routes = [
  {
    path: 'home',
    component: Dashboard
  },
  {
    path: 'settings',
    component: Settings
  }
];
