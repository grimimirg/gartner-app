import { Routes } from '@angular/router';
import { Dashboard } from './dashboard/dashboard';
import { Program } from './program/program';
import { Statistics } from './statistics/statistics';

export const routes: Routes = [
  {
    path: 'home',
    component: Dashboard
  },
  {
    path: 'statistics',
    component: Statistics
  },
  {
    path: 'program',
    component: Program
  }
];
