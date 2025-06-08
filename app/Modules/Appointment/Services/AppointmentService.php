<?php

namespace App\Modules\Appointment\Services;

use App\Modules\Appointment\Models\Appointment;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use App\Mail\AppointmentBookedMail;
use App\Mail\AppointmentConfirmedMail;

class AppointmentService
{
    public function getAppointmentsByRole($user)
    {
        if ($user->role === 'patient') {
            $patient = $user->patient;
            return $patient ? $patient->appointments()->with(['doctor.user'])->get() : collect();
        }
        
        if ($user->role === 'doctor') {
            $doctor = $user->doctor;
            return $doctor ? $doctor->appointments()->with(['patient.user'])->get() : collect();
        }

        // Admin case
        return Appointment::with(['patient.user', 'doctor.user'])->get();
    }

    public function createAppointment(array $data)
    {
        Log::info('Creating appointment', $data);
        
        $appointment = Appointment::create($data);
        
        // 🆕 GỬI EMAIL KHI ĐẶT LỊCH THÀNH CÔNG
        $this->sendBookingConfirmationEmail($appointment);
        
        return $appointment;
    }

    public function updateAppointmentStatus($id, $status, $notes = null)
    {
        $appointment = Appointment::findOrFail($id);
        
        $updateData = ['status' => $status];
        if ($notes) {
            $updateData['notes'] = $notes;
        }
        
        $appointment->update($updateData);
        
        // 🆕 GỬI EMAIL KHI BÁC SĨ XÁC NHẬN
        if ($status === 'confirmed') {
            $this->sendConfirmationEmail($appointment);
        }
        
        Log::info('Appointment status updated', ['id' => $id, 'status' => $status]);
        return $appointment->load(['patient.user', 'doctor.user']);
    }

    public function getAppointmentById($id)
    {
        return Appointment::with(['patient.user', 'doctor.user'])->findOrFail($id);
    }

    // 🆕 EMAIL KHI ĐẶT LỊCH
    private function sendBookingConfirmationEmail(Appointment $appointment)
    {
        try {
            $appointment->load(['patient.user', 'doctor.user']);
            
            Mail::to($appointment->patient->user->email)
                ->send(new AppointmentBookedMail($appointment));
            
            Log::info('Appointment booking email sent', [
                'appointment_id' => $appointment->id,
                'patient_email' => $appointment->patient->user->email
            ]);
            
        } catch (\Exception $e) {
            Log::error('Failed to send appointment booking email', [
                'appointment_id' => $appointment->id,
                'error' => $e->getMessage()
            ]);
        }
    }

    // 🆕 EMAIL KHI BÁC SĨ XÁC NHẬN
    private function sendConfirmationEmail(Appointment $appointment)
    {
        try {
            $appointment->load(['patient.user', 'doctor.user']);
            
            Mail::to($appointment->patient->user->email)
                ->send(new AppointmentConfirmedMail($appointment));
            
            Log::info('Appointment confirmation email sent', [
                'appointment_id' => $appointment->id,
                'patient_email' => $appointment->patient->user->email
            ]);
            
        } catch (\Exception $e) {
            Log::error('Failed to send appointment confirmation email', [
                'appointment_id' => $appointment->id,
                'error' => $e->getMessage()
            ]);
        }
    }
}
