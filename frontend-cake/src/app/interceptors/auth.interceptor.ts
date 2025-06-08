import { HttpErrorResponse, HttpEvent, HttpHandler, HttpHandlerFn, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { catchError, Observable, throwError } from "rxjs";
import { AuthService } from "../services/auth.service";
import { Router } from "@angular/router";

export function authInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
    const authService = inject(AuthService);
    const router = inject(Router);

    const token = authService.getToken();
    
    // Clone request và thêm headers cần thiết
    let authReq = req;
    
    if (token) {
        authReq = req.clone({
            setHeaders: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }  
        });
    } else {
        // Thêm headers cho public requests
        authReq = req.clone({
            setHeaders: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }  
        });
    }
    
    return next(authReq).pipe(
        catchError((error: HttpErrorResponse) => {
            // Handle authentication errors
            if (error.status === 401) {
                // Token expired hoặc invalid
                authService.logout().subscribe();
                router.navigate(['/auth'], { 
                    queryParams: { message: 'Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.' }
                });
            } else if (error.status === 403) {
                // Access denied
                router.navigate(['/forbidden']);
            }
            
            return throwError(() => error);
        })
    );
}