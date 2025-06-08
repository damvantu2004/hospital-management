<?php

namespace App\Modules\Doctor\Services;

use App\Modules\Doctor\Models\Doctor;
use App\Models\User;
use Illuminate\Support\Facades\Log;

class DoctorService
{
    public function getAllDoctors()
    {
        return Doctor::with('user')->where('is_available', true)->get();
    }

    public function getDoctorById($id)
    {
        return Doctor::with('user')->findOrFail($id);
    }

    public function getDoctorByUserId($userId)
    {
        return Doctor::where('user_id', $userId)->with('user')->first();
    }

    public function getAvailableDoctors()
    {
        return Doctor::with('user')
            ->where('is_available', true)
            ->get();
    }

    public function updateDoctorProfile($userId, array $data)
    {
        $doctor = Doctor::where('user_id', $userId)->first();
        
        if (!$doctor) {
            // Tạo doctor record mới nếu chưa có
            $doctor = Doctor::create(array_merge($data, ['user_id' => $userId]));
        } else {
            $doctor->update($data);
        }

        // Cập nhật thông tin user nếu có
        if (isset($data['name']) || isset($data['email']) || isset($data['phone'])) {
            $user = User::find($userId);
            $userUpdateData = [];
            
            if (isset($data['name'])) $userUpdateData['name'] = $data['name'];
            if (isset($data['email'])) $userUpdateData['email'] = $data['email'];
            if (isset($data['phone'])) $userUpdateData['phone'] = $data['phone'];
            
            if (!empty($userUpdateData)) {
                $user->update($userUpdateData);
            }
        }

        Log::info('Doctor profile updated', ['user_id' => $userId]);
        return $doctor->load('user');
    }

    public function getAvailableDoctorsWithFilter($specialty = null, $search = null)
    {
        $query = Doctor::with('user')->where('is_available', true);
        
        if ($specialty) {
            $query->where('specialty', 'like', '%' . $specialty . '%');
        }
        
        if ($search) {
            $query->whereHas('user', function($q) use ($search) {
                $q->where('name', 'like', '%' . $search . '%')
                  ->orWhere('email', 'like', '%' . $search . '%');
            });
        }
        
        return $query->paginate(10);
    }
}
