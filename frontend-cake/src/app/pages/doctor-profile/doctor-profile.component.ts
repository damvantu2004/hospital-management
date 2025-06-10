import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DoctorService } from '../../services/doctor.service';
import { AuthService } from '../../services/auth.service';
import { LoadingComponent } from '../../components/loading/loading.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-doctor-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, LoadingComponent],
  templateUrl: './doctor-profile.component.html',
  styleUrl: './doctor-profile.component.css'
})
export class DoctorProfileComponent implements OnInit {
  profileForm: FormGroup;
  scheduleForm: FormGroup;
  passwordForm: FormGroup;
  currentUser: any = null;
  doctorProfile: any = null;
  loading: boolean = false;
  saving: boolean = false;
  message: string = '';
  messageType: 'success' | 'error' = 'success';
  activeTab: 'profile' | 'schedule' | 'password' = 'profile';

  specialties = [
    'Nội khoa', 'Ngoại khoa', 'Tim mạch', 'Thần kinh',
    'Nhi khoa', 'Sản phụ khoa', 'Mắt', 'Tai mũi họng',
    'Da liễu', 'Tâm thần', 'Xương khớp', 'Ung bướu',
    'Răng hàm mặt', 'Phục hồi chức năng', 'Gây mê hồi sức'
  ];

  degrees = [
    'Bác sĩ', 'Thạc sĩ', 'Tiến sĩ', 'Phó Giáo sư', 'Giáo sư'
  ];

  workingDays = [
    { value: 'monday', label: 'Thứ 2' },
    { value: 'tuesday', label: 'Thứ 3' },
    { value: 'wednesday', label: 'Thứ 4' },
    { value: 'thursday', label: 'Thứ 5' },
    { value: 'friday', label: 'Thứ 6' },
    { value: 'saturday', label: 'Thứ 7' },
    { value: 'sunday', label: 'Chủ nhật' }
  ];

  timeSlots = [
    '08:00', '08:30', '09:00', '09:30', '10:00', '10:30',
    '11:00', '11:30', '13:00', '13:30', '14:00', '14:30',
    '15:00', '15:30', '16:00', '16:30', '17:00', '17:30'
  ];

  constructor(
    private fb: FormBuilder,
    private doctorService: DoctorService,
    private authService: AuthService,
    private http: HttpClient
  ) {
    this.profileForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10,11}$/)]],
      specialty: ['', Validators.required],
      degree: [''],
      experience_years: ['', [Validators.min(0), Validators.max(50)]],
      license_number: [''],
      bio: ['', Validators.maxLength(1000)],
      education: [''],
      achievements: [''],
      consultation_fee: ['', [Validators.min(0)]],
      address: [''],
      languages: ['']
    });

    this.scheduleForm = this.fb.group({
      working_days: [[]],
      morning_start: ['08:00'],
      morning_end: ['12:00'],
      afternoon_start: ['13:00'],
      afternoon_end: ['17:00'],
      break_duration: [30, [Validators.min(15), Validators.max(120)]],
      max_patients_per_day: [20, [Validators.min(1), Validators.max(50)]],
      advance_booking_days: [30, [Validators.min(1), Validators.max(90)]]
    });

    this.passwordForm = this.fb.group({
      current_password: ['', Validators.required],
      new_password: ['', [Validators.required, Validators.minLength(6)]],
      confirm_password: ['', Validators.required]
    }, {
      validators: this.passwordMatchValidator
    });
  }

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    
    // DEBUG: Log user info
    console.log('🔍 Current user:', this.currentUser);
    console.log('🔍 User role:', this.currentUser?.role);
    console.log('🔍 User active:', this.currentUser?.is_active);
    console.log('🔍 Token:', this.authService.getToken());
    
    // Test routes trước
    this.testRoutes();
    
    this.loadProfile();
  }

  testRoutes(): void {
    console.log('🧪 Testing routes...');
    
    // Test route cơ bản
    this.http.get('http://localhost:8000/api/test-doctors-me').subscribe({
      next: (response) => console.log('✅ Basic route works:', response),
      error: (error) => console.error('❌ Basic route failed:', error)
    });
    
    // Test auth route
    this.http.get('http://localhost:8000/api/test-auth').subscribe({
      next: (response) => console.log('✅ Auth route works:', response),
      error: (error) => console.error('❌ Auth route failed:', error)
    });
    
    // Test doctor route  
    this.http.get('http://localhost:8000/api/test-doctor').subscribe({
      next: (response) => console.log('✅ Doctor route works:', response),
      error: (error) => console.error('❌ Doctor route failed:', error)
    });
  }

  loadProfile(): void {
    this.loading = true;
    this.doctorService.getMyProfile().subscribe({
      next: (response: any) => {
        this.doctorProfile = response.data;
        this.populateForms();
        this.loading = false;
      },
      error: (error: any) => {
        console.error('Error loading profile:', error);
        this.showMessage('Không thể tải thông tin profile', 'error');
        this.loading = false;
      }
    });
  }

  populateForms(): void {
    if (this.doctorProfile) {
      // Populate profile form
      this.profileForm.patchValue({
        name: this.currentUser?.name || '',
        email: this.currentUser?.email || '',
        phone: this.currentUser?.phone || '',
        specialty: this.doctorProfile.specialty || '',
        degree: this.doctorProfile.degree || '',
        experience_years: this.doctorProfile.experience_years || '',
        license_number: this.doctorProfile.license_number || '',
        bio: this.doctorProfile.bio || '',
        education: this.doctorProfile.education || '',
        achievements: this.doctorProfile.achievements || '',
        consultation_fee: this.doctorProfile.consultation_fee || '',
        address: this.doctorProfile.address || '',
        languages: this.doctorProfile.languages || ''
      });

      // Populate schedule form
      this.scheduleForm.patchValue({
        working_days: this.doctorProfile.working_days || [],
        morning_start: this.doctorProfile.morning_start || '08:00',
        morning_end: this.doctorProfile.morning_end || '12:00',
        afternoon_start: this.doctorProfile.afternoon_start || '13:00',
        afternoon_end: this.doctorProfile.afternoon_end || '17:00',
        break_duration: this.doctorProfile.break_duration || 30,
        max_patients_per_day: this.doctorProfile.max_patients_per_day || 20,
        advance_booking_days: this.doctorProfile.advance_booking_days || 30
      });
    }
  }

  onSubmitProfile(): void {
    if (this.profileForm.valid) {
      this.saving = true;
      const formData = this.profileForm.value;

      this.doctorService.updateProfile(formData).subscribe({
        next: (response: any) => {
          this.showMessage('Cập nhật thông tin thành công!', 'success');
          // Update current user info
          this.authService.setCurrentUser({
            ...this.currentUser,
            name: formData.name,
            email: formData.email,
            phone: formData.phone
          });
          this.saving = false;
        },
        error: (error: any) => {
          console.error('Error updating profile:', error);
          const message = error.error?.message || 'Có lỗi xảy ra khi cập nhật';
          this.showMessage(message, 'error');
          this.saving = false;
        }
      });
    } else {
      this.markFormGroupTouched(this.profileForm);
    }
  }

  onSubmitSchedule(): void {
    if (this.scheduleForm.valid) {
      this.saving = true;
      const formData = this.scheduleForm.value;

      this.doctorService.updateSchedule(formData).subscribe({
        next: (response: any) => {
          this.showMessage('Cập nhật lịch làm việc thành công!', 'success');
          this.saving = false;
        },
        error: (error: any) => {
          console.error('Error updating schedule:', error);
          const message = error.error?.message || 'Có lỗi xảy ra khi cập nhật lịch';
          this.showMessage(message, 'error');
          this.saving = false;
        }
      });
    } else {
      this.markFormGroupTouched(this.scheduleForm);
    }
  }

  onSubmitPassword(): void {
    if (this.passwordForm.valid) {
      this.saving = true;
      const formData = this.passwordForm.value;

      this.doctorService.changePassword(formData).subscribe({
        next: (response: any) => {
          this.showMessage('Đổi mật khẩu thành công!', 'success');
          this.passwordForm.reset();
          this.saving = false;
        },
        error: (error: any) => {
          console.error('Error changing password:', error);
          const message = error.error?.message || 'Có lỗi xảy ra khi đổi mật khẩu';
          this.showMessage(message, 'error');
          this.saving = false;
        }
      });
    } else {
      this.markFormGroupTouched(this.passwordForm);
    }
  }

  passwordMatchValidator(form: FormGroup) {
    const newPassword = form.get('new_password');
    const confirmPassword = form.get('confirm_password');
    
    if (newPassword && confirmPassword && newPassword.value !== confirmPassword.value) {
      confirmPassword.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    }
    
    return null;
  }

  onWorkingDaysChange(day: string, event: any): void {
    const workingDays = this.scheduleForm.get('working_days')?.value || [];
    if (event.target.checked) {
      if (!workingDays.includes(day)) {
        workingDays.push(day);
      }
    } else {
      const index = workingDays.indexOf(day);
      if (index > -1) {
        workingDays.splice(index, 1);
      }
    }
    this.scheduleForm.patchValue({ working_days: workingDays });
  }

  isWorkingDay(day: string): boolean {
    const workingDays = this.scheduleForm.get('working_days')?.value || [];
    return workingDays.includes(day);
  }

  markFormGroupTouched(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      control?.markAsTouched();
    });
  }

  showMessage(message: string, type: 'success' | 'error'): void {
    this.message = message;
    this.messageType = type;
    setTimeout(() => {
      this.message = '';
    }, 5000);
  }

  getFieldError(fieldName: string, form: FormGroup = this.profileForm): string {
    const field = form.get(fieldName);
    if (field?.touched && field?.errors) {
      if (field.errors['required']) {
        return `${this.getFieldLabel(fieldName)} là bắt buộc`;
      }
      if (field.errors['email']) {
        return 'Email không hợp lệ';
      }
      if (field.errors['minlength']) {
        return `${this.getFieldLabel(fieldName)} phải có ít nhất ${field.errors['minlength'].requiredLength} ký tự`;
      }
      if (field.errors['maxlength']) {
        return `${this.getFieldLabel(fieldName)} không được quá ${field.errors['maxlength'].requiredLength} ký tự`;
      }
      if (field.errors['pattern']) {
        return `${this.getFieldLabel(fieldName)} không đúng định dạng`;
      }
      if (field.errors['min']) {
        return `Giá trị phải lớn hơn hoặc bằng ${field.errors['min'].min}`;
      }
      if (field.errors['max']) {
        return `Giá trị phải nhỏ hơn hoặc bằng ${field.errors['max'].max}`;
      }
      if (field.errors['passwordMismatch']) {
        return 'Mật khẩu xác nhận không khớp';
      }
    }
    return '';
  }

  getFieldLabel(fieldName: string): string {
    const labels: { [key: string]: string } = {
      'name': 'Họ tên',
      'email': 'Email',
      'phone': 'Số điện thoại',
      'specialty': 'Chuyên khoa',
      'experience_years': 'Số năm kinh nghiệm',
      'consultation_fee': 'Phí khám',
      'current_password': 'Mật khẩu hiện tại',
      'new_password': 'Mật khẩu mới',
      'confirm_password': 'Xác nhận mật khẩu'
    };
    return labels[fieldName] || fieldName;
  }

  isFieldInvalid(fieldName: string, form: FormGroup = this.profileForm): boolean {
    const field = form.get(fieldName);
    return !!(field?.invalid && field?.touched);
  }

  setActiveTab(tab: 'profile' | 'schedule' | 'password'): void {
    this.activeTab = tab;
    this.message = ''; // Clear messages when switching tabs
  }

  formatCurrency(value: number): string {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(value);
  }
}
