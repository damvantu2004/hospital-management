<?php

namespace App\Modules\Doctor\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Modules\Doctor\Services\DoctorService;

class DoctorController extends Controller
{
    protected $doctorService;

    public function __construct(DoctorService $doctorService)
    {
        $this->doctorService = $doctorService;
    }

    public function index(Request $request)
    {
        $specialty = $request->get('specialty');
        $search = $request->get('search');
        
        if ($specialty || $search) {
            $doctors = $this->doctorService->getAvailableDoctorsWithFilter($specialty, $search);
        } else {
            $doctors = $this->doctorService->getAvailableDoctors();
        }
        
        return $this->successResponse($doctors, 'Bác sĩ đã được kích hoạt');
    }

    public function show($id)
    {
        $doctor = $this->doctorService->getDoctorById($id);
        return $this->successResponse($doctor, 'Chi tiết bác sĩ');
    }

    public function available()
    {
        $doctors = $this->doctorService->getAvailableDoctors();
        return $this->successResponse($doctors, 'Bác sĩ đã được kích hoạt');
    }

    public function profile(Request $request)
    {
        $doctor = $this->doctorService->getDoctorByUserId($request->user()->id);
        
        if (!$doctor) {
            // Tự động tạo doctor record với thông tin mặc định
            $doctor = $this->doctorService->updateDoctorProfile($request->user()->id, [
                'specialty' => 'Chuyên khoa chung',
                'qualification' => 'Cần cập nhật',
                'experience_years' => 0,
                'consultation_fee' => 0,
                'is_available' => false
            ]);
        }
        
        return $this->successResponse($doctor, 'Doctor profile retrieved');
    }

    public function updateProfile(Request $request)
    {
        $validated = $request->validate([
            // User info
            'name' => 'sometimes|string|max:255',
            'email' => 'sometimes|email|max:255|unique:users,email,' . $request->user()->id,
            'phone' => 'sometimes|string|max:20',
            
            // Doctor specific info
            'specialty' => 'sometimes|string|max:255',
            'qualification' => 'sometimes|string|max:255',
            'experience_years' => 'sometimes|integer|min:0|max:50',
            'consultation_fee' => 'sometimes|numeric|min:0',
            'bio' => 'sometimes|string|max:1000',
            'is_available' => 'sometimes|boolean',
            
            // Additional fields từ frontend
            'degree' => 'sometimes|string|max:100',
            'license_number' => 'sometimes|string|max:50',
            'education' => 'sometimes|string|max:500',
            'achievements' => 'sometimes|string|max:500',
            'address' => 'sometimes|string|max:500',
            'languages' => 'sometimes|string|max:200',
            
            // Schedule info  
            'working_days' => 'sometimes|array',
            'morning_start' => 'sometimes|date_format:H:i',
            'morning_end' => 'sometimes|date_format:H:i',
            'afternoon_start' => 'sometimes|date_format:H:i',
            'afternoon_end' => 'sometimes|date_format:H:i',
            'break_duration' => 'sometimes|integer|min:15|max:120',
            'max_patients_per_day' => 'sometimes|integer|min:1|max:50',
            'advance_booking_days' => 'sometimes|integer|min:1|max:90'
        ]);

        $doctor = $this->doctorService->updateDoctorProfile($request->user()->id, $validated);
        return $this->successResponse($doctor, 'Profile updated successfully');
    }

    public function specialties()
    {
        $specialties = [
            'Nội khoa', 'Ngoại khoa', 'Tim mạch', 'Thần kinh',
            'Nhi khoa', 'Sản phụ khoa', 'Mắt', 'Tai mũi họng',
            'Da liễu', 'Tâm thần', 'Xương khớp', 'Ung bướu',
            'Răng hàm mặt', 'Phục hồi chức năng', 'Gây mê hồi sức'
        ];
        
        return $this->successResponse($specialties, 'Danh sách chuyên khoa');
    }
}
