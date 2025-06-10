# 📋 PHÂN CHIA NHIỆM VỤ TEAM - USER MANAGEMENT SYSTEM

**Team:** 5 người (3 Frontend + 2 Backend)  
**Dự án:** Hệ thống quản lý người dùng & đặt lịch khám bệnh  
**Tech Stack:** Laravel + Angular + MySQL

---

## 🔙 BACKEND TEAM (2 người)

### 👨‍💻 Backend Person 1: Authentication & Core System

#### 📂 Phần code cần đọc hiểu:
- ✅ `app/Models/User.php`
- ✅ `app/Modules/Auth/` (toàn bộ thư mục) 
- ✅ `app/Http/Middleware/` (toàn bộ)
- ✅ `routes/api.php` (các route auth)
- ✅ `app/Mail/` (email system)
- ✅ Database migrations (user, auth tables)

#### 🎯 Nhiệm vụ chính:
- Hiểu hệ thống đăng ký/đăng nhập
- JWT authentication
- Email verification  
- Phân quyền (admin/doctor/patient)
- Security middleware

#### 📚 Checklist hoàn thành:
- [ ] Giải thích được JWT authentication flow
- [ ] Hiểu role-based authorization
- [ ] Biết cách debug authentication issues
- [ ] Có thể setup email verification
- [ ] Viết được middleware mới

---

### 👨‍💻 Backend Person 2: Business Logic & Features

#### 📂 Phần code cần đọc hiểu:
- ✅ `app/Modules/Patient/` (toàn bộ)
- ✅ `app/Modules/Doctor/` (toàn bộ)
- ✅ `app/Modules/Appointment/` (toàn bộ)
- ✅ `app/Console/Commands/` (reminder emails)
- ✅ Database migrations (patients, doctors, appointments)
- ✅ Database seeders

#### 🎯 Nhiệm vụ chính:
- Quản lý bệnh nhân/bác sĩ
- Hệ thống đặt lịch hẹn
- Email notifications
- Scheduled jobs (reminder)
- Business workflow

#### 📚 Checklist hoàn thành:
- [ ] Giải thích được appointment booking flow
- [ ] Hiểu patient/doctor data structure
- [ ] Biết cách setup email notifications
- [ ] Có thể thêm business logic mới
- [ ] Hiểu scheduled jobs

---

## 🎨 FRONTEND TEAM (3 người)

### 👩‍💻 Frontend Person 1: Authentication & Routing

#### 📂 Phần code cần đọc hiểu:
- ✅ `src/app/app.routes.ts`
- ✅ `src/app/guards/` (toàn bộ)
- ✅ `src/app/services/auth.service.ts`
- ✅ `src/app/pages/login/`
- ✅ `src/app/pages/forgot/`
- ✅ `src/app/interceptors/`
- ✅ `src/app/constants/global.constants.ts`

#### 🎯 Nhiệm vụ chính:
- Hệ thống đăng nhập/đăng ký UI
- Route guards (bảo vệ trang)
- JWT token management
- Authentication flow
- Navigation service

#### 📚 Checklist hoàn thành:
- [ ] Giải thích được Angular routing + guards
- [ ] Hiểu authentication UI flow
- [ ] Biết cách integrate với backend API
- [ ] Có thể fix auth-related bugs
- [ ] Hiểu token management

---

### 👩‍💻 Frontend Person 2: Admin & Doctor Interface

#### 📂 Phần code cần đọc hiểu:
- ✅ `src/app/pages/dashboard/` (admin)
- ✅ `src/app/pages/doctor-dashboard/`
- ✅ `src/app/pages/doctor-profile/`
- ✅ `src/app/pages/user/` (user management)
- ✅ `src/app/pages/user-form/`
- ✅ `src/app/services/user.service.ts`
- ✅ `src/app/services/doctor.service.ts`

#### 🎯 Nhiệm vụ chính:
- Admin dashboard (quản lý users)
- Doctor dashboard (xem bệnh nhân)
- Doctor profile management
- User CRUD operations
- Role-based UI cho doctor/admin

#### 📚 Checklist hoàn thành:
- [ ] Giải thích được admin/doctor dashboards
- [ ] Hiểu user management features
- [ ] Biết role-based UI rendering
- [ ] Có thể thêm admin features mới
- [ ] Hiểu doctor workflow

---

### 👩‍💻 Frontend Person 3: Patient Interface & Booking

#### 📂 Phần code cần đọc hiểu:
- ✅ `src/app/pages/patient-dashboard/`
- ✅ `src/app/pages/patient-profile/`
- ✅ `src/app/pages/book-appointment/`
- ✅ `src/app/public/homepage/`
- ✅ `src/app/services/patient.service.ts`
- ✅ `src/app/services/appointment.service.ts`
- ✅ `src/app/components/` (shared components)

#### 🎯 Nhiệm vụ chính:
- Patient dashboard
- Appointment booking flow
- Patient profile management
- Homepage công khai
- Shared UI components

#### 📚 Checklist hoàn thành:
- [ ] Giải thích được patient features
- [ ] Hiểu appointment booking UI
- [ ] Biết shared components usage
- [ ] Có thể improve patient UX
- [ ] Hiểu responsive design

---

## 📅 KẾ HOẠCH HỌC TẬP

### 🗓️ TUẦN 1: Đọc hiểu riêng lẻ

#### Backend Person 1: 