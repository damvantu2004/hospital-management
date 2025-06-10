import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AppointmentService } from '../../services/appointment.service';
import { AuthService } from '../../services/auth.service';
import { LoadingComponent } from '../../components/loading/loading.component';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';

@Component({
  selector: 'app-my-appointments',
  standalone: true,
  imports: [CommonModule, RouterModule, LoadingComponent, SidebarComponent],
  templateUrl: './my-appointments.component.html',
  styleUrl: './my-appointments.component.css'
})
export class MyAppointmentsComponent implements OnInit {
  appointments: any[] = [];
  filteredAppointments: any[] = [];
  loading: boolean = true;
  currentUser: any = null;
  selectedStatus: string = 'all';

  constructor(
    private appointmentService: AppointmentService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    this.loadAppointments();
  }

  loadAppointments(): void {
    this.loading = true;
    this.appointmentService.getMyAppointments().subscribe({
      next: (response) => {
        this.appointments = response.data;
        this.filterAppointments();
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading appointments:', error);
        this.loading = false;
      }
    });
  }

  filterAppointments(): void {
    if (this.selectedStatus === 'all') {
      this.filteredAppointments = [...this.appointments];
    } else {
      this.filteredAppointments = this.appointments.filter(apt => apt.status === this.selectedStatus);
    }
    
    // Sort by date and time (newest first)
    this.filteredAppointments.sort((a, b) => {
      const dateA = new Date(a.appointment_date + ' ' + a.appointment_time);
      const dateB = new Date(b.appointment_date + ' ' + b.appointment_time);
      return dateB.getTime() - dateA.getTime();
    });
  }

  onStatusChange(status: string): void {
    this.selectedStatus = status;
    this.filterAppointments();
  }

  formatDate(date: string): string {
    return new Date(date).toLocaleDateString('vi-VN');
  }

  formatTime(time: string): string {
    return time.substring(0, 5); // HH:MM
  }

  getStatusBadgeClass(status: string): string {
    switch (status) {
      case 'pending':
        return 'badge bg-warning text-dark';
      case 'confirmed':
        return 'badge bg-info text-white';
      case 'completed':
        return 'badge bg-success';
      case 'cancelled':
        return 'badge bg-danger';
      default:
        return 'badge bg-secondary';
    }
  }

  getStatusText(status: string): string {
    switch (status) {
      case 'pending':
        return 'Chờ xác nhận';
      case 'confirmed':
        return 'Đã xác nhận';
      case 'completed':
        return 'Hoàn thành';
      case 'cancelled':
        return 'Đã hủy';
      default:
        return status;
    }
  }

  getStatusCount(status: string): number {
    if (status === 'all') {
      return this.appointments.length;
    }
    return this.appointments.filter(apt => apt.status === status).length;
  }

  cancelAppointment(appointmentId: number): void {
    if (confirm('Bạn có chắc chắn muốn hủy lịch hẹn này?')) {
      this.appointmentService.updateAppointmentStatus(appointmentId, 'cancelled').subscribe({
        next: (response) => {
          console.log('Appointment cancelled successfully');
          this.loadAppointments(); // Reload appointments
        },
        error: (error) => {
          console.error('Error cancelling appointment:', error);
          alert('Có lỗi xảy ra khi hủy lịch hẹn. Vui lòng thử lại.');
        }
      });
    }
  }
}