
import { Routes } from '@angular/router';
import { MonitorsPage } from './pages/monitors/monitors.page';
import { MonitorDetailsPage } from './pages/details/monitor-details.page';
import { MonitorCreatePage } from './pages/create/monitor-create.page';


export const routes: Routes = [
    {
        path: '',
        component: MonitorsPage,
        data: {
            breadcrumb: ''
        }
    },
    {
        path: 'details/:id',
        component: MonitorDetailsPage,
        data: {
            breadcrumb: 'DETAILS'
        }
    },
    {
        path: 'create',
        component: MonitorCreatePage,
        pathMatch: 'full',
        data: {
            breadcrumb: 'ADD'
        }
    }
];
