<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use App\Modules\Appointment\Models\Appointment;

class AppointmentReminderMail extends Mailable
{
    use Queueable, SerializesModels;

    public $appointment;

    public function __construct(Appointment $appointment)
    {
        $this->appointment = $appointment->load(['patient.user', 'doctor.user']);
    }

    public function build()
    {
        return $this->subject('⏰ Nhắc nhở: Lịch hẹn vào ngày mai')
            ->view('emails.appointment_reminder')
            ->with([
                'patientName' => $this->appointment->patient->user->name,
                'doctorName' => $this->appointment->doctor->user->name,
                'specialty' => $this->appointment->doctor->specialty,
                'appointmentDate' => $this->appointment->appointment_date->format('d/m/Y'),
                'appointmentTime' => $this->appointment->appointment_time,
                'reason' => $this->appointment->reason,
                'consultationFee' => number_format($this->appointment->doctor->consultation_fee, 0, ',', '.'),
            ]);
    }
}
