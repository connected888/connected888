import { Routes } from '@angular/router';
import { About } from './components/about/about';
import { Register } from './components/register/register';
import { Donate } from './components/donate/donate';
import { Volunteer } from './components/volunteer/volunteer';
import { Promote } from './components/promote/promote';
import { Createprofile } from './components/createprofile/createprofile';
import { Searchprofiles } from './components/searchprofiles/searchprofiles';

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
       path:'promote',component:Promote
    },
     {
       path:'create-profile',component:Createprofile
    },
     {
       path:'search-profiles',component:Searchprofiles
    },
    {
        path:'**',redirectTo:'about'
    }
];
