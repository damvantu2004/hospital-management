<?php

namespace App\Modules\Appointment\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Appointment\Services\AppointmentService;
use Illuminate\Http\Request;
use Carbon\Carbon;

class AppointmentController extends Controller
{
    protected $appointmentService;

    public function __construct(AppointmentService $appointmentService)
    {
        $this->appointmentService = $appointmentService;
    }

    public function index(Request $request)
    {
        $appointments = $this->appointmentService->getAppointmentsByRole($request->user());
        return $this->successResponse($appointments, 'Appointments retrieved');
    }

    public function store(Request $request)
    {
        // Kiểm tra thời gian trước khi validate
        $appointmentDate = $request->appointment_date;
        $appointmentTime = $request->appointment_time;
        
        if ($appointmentDate === now()->format('Y-m-d')) {
            $currentTime = now();
            $minimumTime = $currentTime->copy()->addHours(2);
            
            $appointmentDateTime = Carbon::createFromFormat('Y-m-d H:i', $appointmentDate . ' ' . $appointmentTime);
            
            if ($appointmentDateTime <= $minimumTime) {
                return $this->errorResponse(null, 
                    'Lịch hẹn phải được đặt ít nhất 2 tiếng sau thời điểm hiện tại. Thời gian sớm nhất hôm nay: ' . $minimumTime->format('H:i'), 
                    422
                );
            }
        }

        $validated = $request->validate([
            'doctor_id' => 'required|exists:doctors,id',
            'appointment_date' => 'required|date|after_or_equal:today',
            'appointment_time' => 'required|date_format:H:i',
            'reason' => 'required|string|max:500'
        ]);

        // Tìm patient_id từ user hiện tại
        $patient = $request->user()->patient;
        if (!$patient) {
            return $this->errorResponse(null, 'Patient profile not found', 404);
        }

        $validated['patient_id'] = $patient->id;
        $appointment = $this->appointmentService->createAppointment($validated);

        return $this->successResponse($appointment, 'Appointment created successfully', 201);
    }

    public function show($id)
    {
        $appointment = $this->appointmentService->getAppointmentById($id);
        return $this->successResponse($appointment, 'Appointment details retrieved');
    }

    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'status' => 'required|in:pending,confirmed,completed,cancelled',
            'notes' => 'nullable|string'
        ]);

        $appointment = $this->appointmentService->updateAppointmentStatus(
            $id, 
            $validated['status'], 
            $validated['notes'] ?? null
        );

        return $this->successResponse($appointment, 'Appointment updated successfully');
    }
}
