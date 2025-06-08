import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { AppointmentService } from '../../services/appointment.service';
import { DoctorService } from '../../services/doctor.service';
import { AuthService } from '../../services/auth.service';
import { LoadingComponent } from '../../components/loading/loading.component';

@Component({
  selector: 'app-book-appointment',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, LoadingComponent],
  templateUrl: './book-appointment.component.html',
  styleUrl: './book-appointment.component.css'
})
export class BookAppointmentComponent implements OnInit {
  appointmentForm: FormGroup;
  doctors: any[] = [];
  selectedDoctor: any = null;
  availableTimeSlots: string[] = [];
  loading: boolean = false;
  submitting: boolean = false;
  minDate: string = '';
  maxDate: string = '';
  message: string = '';
  messageType: 'success' | 'error' = 'success';
  currentUser: any = null;

  timeSlots = [
    '08:00', '08:30', '09:00', '09:30', '10:00', '10:30',
    '11:00', '11:30', '13:00', '13:30', '14:00', '14:30',
    '15:00', '15:30', '16:00', '16:30', '17:00', '17:30'
  ];

  constructor(
    private fb: FormBuilder,
    private appointmentService: AppointmentService,
    private doctorService: DoctorService,
    private authService: AuthService,
    private router: Router
  ) {
    this.appointmentForm = this.fb.group({
      doctor_id: ['', Validators.required],
      appointment_date: ['', Validators.required],
      appointment_time: ['', Validators.required],
      reason: ['', [Validators.required, Validators.minLength(10)]],
      phone: [''] // Thêm field phone
    });
  }

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    this.setDateLimits();
    this.loadDoctors();
    this.setupFormSubscriptions();
    this.checkUserPhone();
  }

  // Method kiểm tra và setup validation cho phone
  checkUserPhone(): void {
    if (!this.currentUser?.phone) {
      // Nếu user chưa có phone, thêm validation required
      this.appointmentForm.get('phone')?.setValidators([
        Validators.required,
        Validators.pattern(/^[0-9]{10,11}$/) // 10-11 digits
      ]);
      this.appointmentForm.get('phone')?.updateValueAndValidity();
    } else {
      // Nếu đã có phone, pre-fill form
      this.appointmentForm.patchValue({
        phone: this.currentUser.phone
      });
    }
  }

  setDateLimits(): void {
    const today = new Date();
    const maxDate = new Date();
    maxDate.setMonth(today.getMonth() + 3);

    this.minDate = this.formatDateForInput(today);
    this.maxDate = this.formatDateForInput(maxDate);
  }

  formatDateForInput(date: Date): string {
    return date.toISOString().split('T')[0];
  }

  loadDoctors(): void {
    this.loading = true;
    this.doctorService.getAvailableDoctors().subscribe({
      next: (response) => {
        this.doctors = response.data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading doctors:', error);
        this.showMessage('Không thể tải danh sách bác sĩ', 'error');
        this.loading = false;
      }
    });
  }

  setupFormSubscriptions(): void {
    this.appointmentForm.get('doctor_id')?.valueChanges.subscribe(doctorId => {
      if (doctorId) {
        this.selectedDoctor = this.doctors.find(d => d.id == doctorId);
        this.appointmentForm.patchValue({ appointment_time: '' });
        this.checkAvailableTimeSlots();
      }
    });

    this.appointmentForm.get('appointment_date')?.valueChanges.subscribe(() => {
      this.appointmentForm.patchValue({ appointment_time: '' });
      this.checkAvailableTimeSlots();
    });
  }

  checkAvailableTimeSlots(): void {
    const doctorId = this.appointmentForm.get('doctor_id')?.value;
    const date = this.appointmentForm.get('appointment_date')?.value;

    if (doctorId && date) {
      this.availableTimeSlots = [...this.timeSlots];
    }
  }

  isSelectedDateToday(): boolean {
    const selectedDate = this.appointmentForm.get('appointment_date')?.value;
    const today = new Date().toISOString().split('T')[0];
    return selectedDate === today;
  }

  getMinimumTimeToday(): string {
    const now = new Date();
    const minimumTime = new Date(now.getTime() + (2 * 60 * 60 * 1000));
    return minimumTime.toLocaleTimeString('vi-VN', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  }

  isTimeSlotAvailable(time: string): boolean {
    const selectedDate = this.appointmentForm.get('appointment_date')?.value;
    const today = new Date().toISOString().split('T')[0];
    
    if (!selectedDate) return false;
    
    if (selectedDate === today) {
      const now = new Date();
      const minimumTime = new Date(now.getTime() + (2 * 60 * 60 * 1000));
      const [hours, minutes] = time.split(':').map(Number);
      const slotTime = new Date();
      slotTime.setHours(hours, minutes, 0, 0);
      
      return slotTime >= minimumTime;
    }
    
    return this.availableTimeSlots.includes(time);
  }

  onSubmit(): void {
    if (this.appointmentForm.valid) {
      this.submitting = true;
      const formData = this.appointmentForm.value;

      this.appointmentService.bookAppointment(formData).subscribe({
        next: (response: any) => {
          this.showMessage('Đặt lịch khám thành công!', 'success');
          setTimeout(() => {
            this.router.navigate(['/patient-dashboard']);
          }, 2000);
        },
        error: (error: any) => {
          console.error('Error booking appointment:', error);
          let message = 'Có lỗi xảy ra khi đặt lịch';
          
          if (error.error?.message) {
            message = error.error.message;
          } else if (error.error?.errors) {
            const errors = Object.values(error.error.errors).flat();
            message = errors.join(', ');
          }
          
          this.showMessage(message, 'error');
        },
        complete: () => {
          this.submitting = false;
        }
      });
    } else {
      this.markFormGroupTouched();
    }
  }

  markFormGroupTouched(): void {
    Object.keys(this.appointmentForm.controls).forEach(key => {
      const control = this.appointmentForm.get(key);
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

  getFieldError(fieldName: string): string {
    const field = this.appointmentForm.get(fieldName);
    if (field?.touched && field?.errors) {
      if (field.errors['required']) {
        return `${this.getFieldLabel(fieldName)} là bắt buộc`;
      }
      if (field.errors['minlength']) {
        return `${this.getFieldLabel(fieldName)} phải có ít nhất ${field.errors['minlength'].requiredLength} ký tự`;
      }
      if (field.errors['pattern']) {
        return `${this.getFieldLabel(fieldName)} không đúng định dạng`;
      }
    }
    return '';
  }

  getFieldLabel(fieldName: string): string {
    const labels: { [key: string]: string } = {
      'doctor_id': 'Bác sĩ',
      'appointment_date': 'Ngày khám',
      'appointment_time': 'Giờ khám',
      'reason': 'Lý do khám',
      'phone': 'Số điện thoại'
    };
    return labels[fieldName] || fieldName;
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.appointmentForm.get(fieldName);
    return !!(field?.invalid && field?.touched);
  }
}