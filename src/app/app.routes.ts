import { Routes } from '@angular/router';
import { About } from './components/about/about';
import { Register } from './components/register/register';
import { Donate } from './components/donate/donate';
import { Volunteer } from './components/volunteer/volunteer';
import { Promote } from './components/promote/promote';
import { Createprofile } from './components/createprofile/createprofile';
import { Searchprofiles } from './components/searchprofiles/searchprofiles';
import { Hostinglist } from './components/hostinglist/hostinglist';
import { SignIn } from './components/sign-in/sign-in';
import { Dashboard } from './components/AdminDashboard/dashboard/dashboard';
import { RegistrationsList } from './components/AdminDashboard/registrations-list/registrations-list';
import { VolunteersList } from './components/AdminDashboard/volunteers-list/volunteers-list';
import { AdminDashbaord } from './components/AdminDashboard/admin-dashbaord/admin-dashbaord';
import { BulkEmailSender } from './components/AdminDashboard/bulk-email-sender/bulk-email-sender';
import { Flyer } from './components/flyer/flyer';

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
       path:'sign-in',component:SignIn
    },
     {
       path:'create-profile',component:Createprofile
    },
     {
       path:'search-profiles',component:Searchprofiles
    },
    {
       path:'dashboard',component:Dashboard,
       children:[{
         path:'',redirectTo:'admin-dashboard',pathMatch:'full'
       },
      {
         path:'registrations-list',component:RegistrationsList,
      },
      {
         path:'volunteers-list',component:VolunteersList,
      },
      {
         path:'admin-dashboard',component:AdminDashbaord,
      },
      {
         path:'bulk-email-sender',component:BulkEmailSender,
      },
     
      
      {
         path:'**',redirectTo:'admin-dashboard'
      }
   ]
    },
    {
     path:'hostinglist',component:Hostinglist
    }, {
         path:'flyer',component:Flyer
   },

    {
        path:'**',redirectTo:'about'
    }
];
