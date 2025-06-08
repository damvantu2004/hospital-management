<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Modules\Appointment\Models\Appointment;
use Illuminate\Support\Facades\Mail;
use App\Mail\AppointmentReminderMail;
use Illuminate\Support\Facades\Log;
use Carbon\Carbon;

class SendAppointmentReminders extends Command
{
    protected $signature = 'appointments:send-reminders';
    protected $description = 'Send appointment reminders for tomorrow appointments';

    public function handle()
    {
        $tomorrow = Carbon::tomorrow()->format('Y-m-d');
        
        // Lấy tất cả lịch hẹn đã confirmed cho ngày mai
        $appointments = Appointment::with(['patient.user', 'doctor.user'])
            ->where('appointment_date', $tomorrow)
            ->where('status', 'confirmed')
            ->get();

        $this->info("Found {$appointments->count()} appointments for tomorrow ({$tomorrow})");

        $successCount = 0;
        $errorCount = 0;

        foreach ($appointments as $appointment) {
            try {
                Mail::to($appointment->patient->user->email)
                    ->send(new AppointmentReminderMail($appointment));
                
                $successCount++;
                
                Log::info('Appointment reminder sent', [
                    'appointment_id' => $appointment->id,
                    'patient_email' => $appointment->patient->user->email,
                    'appointment_date' => $appointment->appointment_date
                ]);
                
            } catch (\Exception $e) {
                $errorCount++;
                
                Log::error('Failed to send appointment reminder', [
                    'appointment_id' => $appointment->id,
                    'error' => $e->getMessage()
                ]);
            }
        }

        $this->info("✅ Reminders sent successfully: {$successCount}");
        if ($errorCount > 0) {
            $this->error("❌ Failed to send: {$errorCount}");
        }

        return Command::SUCCESS;
    }
} 