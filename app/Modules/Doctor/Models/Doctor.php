<?php

namespace App\Modules\Doctor\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use App\Modules\Appointment\Models\Appointment;

class Doctor extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'specialty',
        'qualification',
        'experience_years',
        'consultation_fee',
        'bio',
        'is_available',
        
        // Thêm các fields mới
        'degree',
        'license_number',
        'education',
        'achievements',
        'address',
        'languages',
        'working_days',
        'morning_start',
        'morning_end',
        'afternoon_start',
        'afternoon_end',
        'break_duration',
        'max_patients_per_day',
        'advance_booking_days'
    ];

    protected $casts = [
        'consultation_fee' => 'decimal:2',
        'is_available' => 'boolean',
        'working_days' => 'array', // Cast to array for JSON field
        'morning_start' => 'datetime:H:i',
        'morning_end' => 'datetime:H:i',
        'afternoon_start' => 'datetime:H:i',
        'afternoon_end' => 'datetime:H:i',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function appointments()
    {
        return $this->hasMany(Appointment::class);
    }
}
