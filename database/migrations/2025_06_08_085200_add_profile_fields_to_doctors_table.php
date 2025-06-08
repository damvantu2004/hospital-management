<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('doctors', function (Blueprint $table) {
            $table->string('degree')->nullable()->after('qualification');
            $table->string('license_number')->nullable()->after('degree');
            $table->text('education')->nullable()->after('bio');
            $table->text('achievements')->nullable()->after('education');
            $table->text('address')->nullable()->after('achievements');
            $table->string('languages')->nullable()->after('address');
            
            // Schedule fields
            $table->json('working_days')->nullable()->after('languages');
            $table->time('morning_start')->nullable()->after('working_days');
            $table->time('morning_end')->nullable()->after('morning_start');
            $table->time('afternoon_start')->nullable()->after('morning_end');
            $table->time('afternoon_end')->nullable()->after('afternoon_start');
            $table->integer('break_duration')->default(30)->after('afternoon_end');
            $table->integer('max_patients_per_day')->default(20)->after('break_duration');
            $table->integer('advance_booking_days')->default(30)->after('max_patients_per_day');
        });
    }

    public function down(): void
    {
        Schema::table('doctors', function (Blueprint $table) {
            $table->dropColumn([
                'degree', 'license_number', 'education', 'achievements', 
                'address', 'languages', 'working_days', 'morning_start',
                'morning_end', 'afternoon_start', 'afternoon_end',
                'break_duration', 'max_patients_per_day', 'advance_booking_days'
            ]);
        });
    }
}; 