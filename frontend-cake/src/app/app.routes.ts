import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ForbiddenComponent } from './pages/forbidden/forbidden.component';
import { authGuard } from './guards/auth.guard';
import { adminGuard } from './guards/admin.guard';
import { patientGuard } from './guards/patient.guard';
import { doctorGuard } from './guards/doctor.guard';
import { activeGuard } from './guards/active.guard';
import { ForgotComponent } from './pages/forgot/forgot.component';
import { SendEmailComponent } from './pages/send-email/send-email.component';
import { HomepageComponent } from './public/homepage/homepage.component';
import { UserFormComponent } from './pages/user-form/user-form.component';
import { UserComponent } from './pages/user/user.component';
import { PatientDashboardComponent } from './pages/patient-dashboard/patient-dashboard.component';
import { BookAppointmentComponent } from './pages/book-appointment/book-appointment.component';
import { DoctorDashboardComponent } from './pages/doctor-dashboard/doctor-dashboard.component';
import { PatientProfileComponent } from './pages/patient-profile/patient-profile.component';
import { DoctorProfileComponent } from './pages/doctor-profile/doctor-profile.component';

export const routes: Routes = [
    // Public Routes
    {
        path: '',
        component: HomepageComponent
    },
    {
        path: 'auth',
        component: LoginComponent
    },
    {
        path: 'reset-password',
        component: ForgotComponent
    },
    {
        path: 'send-email',
        component: SendEmailComponent
    },
    {
        path: 'forbidden',
        component: ForbiddenComponent
    },

    // Admin Routes
    {
        path: 'admin',
        redirectTo: 'dashboard',
        pathMatch: 'full'
    },
    {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [authGuard, activeGuard, adminGuard],
        children: [
            {
                path: '',
                redirectTo: 'users',
                pathMatch: 'full'
            },
            {
                path: 'users',
                component: UserComponent
            },
            {
                path: 'users/add',
                component: UserFormComponent,
            },
            {
                path: 'users/edit/:id',
                component: UserFormComponent,
            }
        ]
    },

    // Patient Routes
    {
        path: 'patient',
        redirectTo: 'patient-dashboard',
        pathMatch: 'full'
    },
    {
        path: 'patient-dashboard',
        component: PatientDashboardComponent,
        canActivate: [authGuard, activeGuard, patientGuard]
    },
    {
        path: 'patient-profile',
        component: PatientProfileComponent,
        canActivate: [authGuard, activeGuard, patientGuard]
    },
    {
        path: 'book-appointment',
        component: BookAppointmentComponent,
        canActivate: [authGuard, activeGuard, patientGuard]
    },
    {
        path: 'my-appointments',
        component: PatientDashboardComponent,
        canActivate: [authGuard, activeGuard, patientGuard]
    },

    // Doctor Routes  
    {
        path: 'doctor',
        redirectTo: 'doctor-dashboard',
        pathMatch: 'full'
    },
    {
        path: 'doctor-dashboard',
        component: DoctorDashboardComponent,
        canActivate: [authGuard, activeGuard, doctorGuard]
    },
    {
        path: 'doctor-profile',
        component: DoctorProfileComponent,
        canActivate: [authGuard, activeGuard, doctorGuard]
    },
    {
        path: 'doctor-appointments',
        component: DoctorDashboardComponent,
        canActivate: [authGuard, activeGuard, doctorGuard]
    },
    {
        path: 'my-patients',
        component: DoctorDashboardComponent,
        canActivate: [authGuard, activeGuard, doctorGuard]
    },

    // Legacy Routes (keep for backward compatibility)
    {
        path: 'dashboard/user',
        component: UserFormComponent,
        canActivate: [authGuard, activeGuard, adminGuard]
    },

    // Catch-all redirect
    {
        path: '**',
        redirectTo: ''
    }
];