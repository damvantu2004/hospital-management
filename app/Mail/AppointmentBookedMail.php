<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use App\Modules\Appointment\Models\Appointment;

class AppointmentBookedMail extends Mailable
{
    use Queueable, SerializesModels;

    public $appointment;

    public function __construct(Appointment $appointment)
    {
        $this->appointment = $appointment->load(['patient.user', 'doctor.user']);
    }

    public function build()
    {
        return $this->subject('✅ Đặt lịch hẹn thành công')
            ->view('emails.appointment_booked')
            ->with([
                'patientName' => $this->appointment->patient->user->name,
                'doctorName' => $this->appointment->doctor->user->name,
                'specialty' => $this->appointment->doctor->specialty,
                'appointmentDate' => $this->appointment->appointment_date->format('d/m/Y'),
                'appointmentTime' => $this->appointment->appointment_time,
                'reason' => $this->appointment->reason,
                'status' => 'pending',
                'consultationFee' => number_format($this->appointment->doctor->consultation_fee, 0, ',', '.'),
            ]);
    }
}
