import { Routes } from '@angular/router';
import { About } from './components/about/about';
import { Register } from './components/register/register';
import { Donate } from './components/donate/donate';
import { Volunteer } from './components/volunteer/volunteer';

export const routes: Routes = [
    
    { path: '', redirectTo: 'about', pathMatch: 'full' }, // default route
    { path: 'about', component: About },
    {
        path:'register',component:Register
    },
    {
        path:'donate',component:Donate
    },
    {
       path:'volunteer',component:Volunteer
    },
    {
        path:'**',redirectTo:'about'
    }
];
