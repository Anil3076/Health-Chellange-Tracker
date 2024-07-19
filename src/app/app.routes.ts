import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ShowWorkoutsComponent } from './components/show-workouts/show-workouts.component';
import { HomeComponent } from './components/home/home.component';
import { ShowChartsComponent } from './components/show-charts/show-charts.component';

export const routes: Routes = [
    {
        path:"",
        component:HomeComponent
    },

    {
        path:"workouts",
        component:ShowWorkoutsComponent
    },

    {
        path:"showchart",
        component:ShowChartsComponent
    }
];
