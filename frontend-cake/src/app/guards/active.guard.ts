import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const activeGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const user = authService.getCurrentUser();
  
  // Kiểm tra user có tồn tại và is_active = true
  if (user && user.is_active !== false) {
    return true;
  }
  
  // Nếu user bị deactivate
  if (user && user.is_active === false) {
    // Logout user và xóa data
    authService.logout().subscribe();
    router.navigate(['/auth'], { 
      queryParams: { message: 'Tài khoản của bạn đã bị vô hiệu hóa. Vui lòng liên hệ admin.' }
    });
    return false;
  }

  // Nếu không có user
  router.navigate(['/auth']);
  return false;
}; 