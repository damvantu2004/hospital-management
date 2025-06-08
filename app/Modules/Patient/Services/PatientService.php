<?php

namespace App\Modules\Patient\Services;

use App\Modules\Patient\Models\Patient;
use App\Models\User;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB;

class PatientService
{
    public function getAllPatients()
    {
        return Patient::with('user')->get();
    }

    public function getPatientByUserId($userId)
    {
        return Patient::where('user_id', $userId)->with('user')->first();
    }

    public function getPatientById($id)
    {
        return Patient::with('user')->findOrFail($id);
    }

    public function updatePatientProfile($userId, array $data)
    {
        return DB::transaction(function () use ($userId, $data) {
            // Separate user fields from patient fields
            $userFields = [
                'name' => $data['name'] ?? null,
                'email' => $data['email'] ?? null,
                'phone' => $data['phone'] ?? null,
            ];
            
            $patientFields = [
                'date_of_birth' => $data['date_of_birth'] ?? null,
                'gender' => $data['gender'] ?? null,
                'blood_type' => $data['blood_type'] ?? null,
                'address' => $data['address'] ?? null,
                'emergency_contact' => $data['emergency_contact'] ?? null,
                'emergency_phone' => $data['emergency_phone'] ?? null,
                'medical_history' => $data['medical_history'] ?? null,
                'allergies' => $data['allergies'] ?? null,
                'current_medications' => $data['current_medications'] ?? null,
            ];

            // Remove null values
            $userFields = array_filter($userFields, function($value) {
                return $value !== null;
            });
            $patientFields = array_filter($patientFields, function($value) {
                return $value !== null;
            });

            // Update user table
            if (!empty($userFields)) {
                User::where('id', $userId)->update($userFields);
                Log::info('User profile updated', ['user_id' => $userId, 'fields' => array_keys($userFields)]);
            }

            // Update or create patient record
            $patient = Patient::where('user_id', $userId)->first();
            
            if (!$patient) {
                $patient = Patient::create(array_merge($patientFields, ['user_id' => $userId]));
                Log::info('Patient profile created', ['user_id' => $userId]);
            } else {
                if (!empty($patientFields)) {
                    $patient->update($patientFields);
                    Log::info('Patient profile updated', ['user_id' => $userId, 'fields' => array_keys($patientFields)]);
                }
            }

            return $patient->load('user');
        });
    }
}
