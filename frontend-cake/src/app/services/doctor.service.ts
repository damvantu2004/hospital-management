import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../constants/global.constants';
import { DoctorDTO } from '../dto/doctor.dto';

@Injectable({
    providedIn: 'root'
})
export class DoctorService {
    private url = `${API_CONFIG.BASE_URL}`;

    constructor(
        private http: HttpClient
    ) {}

    getDoctors(): Observable<any> {
        return this.http.get<any>(`${this.url}${API_CONFIG.ENDPOINTS.DOCTORS.BASE}`);
    }

    getDoctorById(id: number): Observable<any> {
        return this.http.get<any>(`${this.url}${API_CONFIG.ENDPOINTS.DOCTORS.BASE}/${id}`);
    }

    getAvailableDoctors(): Observable<any> {
        return this.http.get<any>(`${this.url}${API_CONFIG.ENDPOINTS.DOCTORS.BASE}`);
    }

    getDoctorsBySpecialty(specialty: string): Observable<any> {
        return this.http.get<any>(`${this.url}${API_CONFIG.ENDPOINTS.DOCTORS.BASE}?specialty=${specialty}`);
    }

    getMyProfile(): Observable<any> {
        return this.http.get<any>(`${this.url}/api/doctors/me`);
    }

    updateMyProfile(doctorData: DoctorDTO): Observable<any> {
        return this.http.put<any>(`${this.url}/api/doctors/me`, doctorData);
    }

    getSpecialties(): Observable<any> {
        return this.http.get<any>(`${this.url}/api/specialties`);
    }

    updateProfile(doctorData: any): Observable<any> {
        return this.updateMyProfile(doctorData);
    }

    updateSchedule(scheduleData: any): Observable<any> {
        return this.http.put<any>(
            `${this.url}/api/doctors/schedule`,
            scheduleData
        );
    }

    changePassword(passwordData: any): Observable<any> {
        return this.http.post<any>(
            `${this.url}/api/doctors/change-password`,
            passwordData
        );
    }
}
