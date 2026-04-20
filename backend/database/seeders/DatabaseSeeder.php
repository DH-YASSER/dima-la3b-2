<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create Companies
        $companyUser = User::create([
            'name' => 'HR Manager TechDev',
            'email' => 'hr@techdev.ma',
            'password' => bcrypt('password'),
            'role' => 'company'
        ]);

        $company = \App\Models\Company::create([
            'user_id' => $companyUser->id,
            'name' => 'TechDev Morocco',
            'city' => 'Casablanca',
            'description' => 'A leading IT solutions provider in Casablanca.',
        ]);

        $companyUser2 = User::create([
            'name' => 'Recruiter Creative',
            'email' => 'jobs@creative.ma',
            'password' => bcrypt('password'),
            'role' => 'company'
        ]);

        $company2 = \App\Models\Company::create([
            'user_id' => $companyUser2->id,
            'name' => 'Creative Agence',
            'city' => 'Rabat',
            'description' => 'Modern digital marketing agency in Rabat.',
        ]);

        // Create Offers
        \App\Models\Offer::create([
            'company_id' => $company->id,
            'title' => 'Full-stack Developer (Stage PFE)',
            'description' => 'Looking for a motivated student to work on Laravel/React projects.',
            'type' => 'stage',
            'city' => 'Casablanca',
            'category' => 'IT / Software',
            'deadline' => now()->addDays(30),
        ]);

        \App\Models\Offer::create([
            'company_id' => $company2->id,
            'title' => 'Junior Graphic Designer',
            'description' => 'Join our creative team to design modern UI/UX interfaces.',
            'type' => 'job',
            'city' => 'Rabat',
            'category' => 'Design',
            'deadline' => now()->addDays(15),
        ]);

        \App\Models\Offer::create([
            'company_id' => $company->id,
            'title' => 'Social Media Intern',
            'description' => 'Help us manage our clients social media presence.',
            'type' => 'stage',
            'city' => 'Marrakech',
            'category' => 'Marketing',
            'deadline' => now()->addDays(20),
        ]);

        // Create Student
        User::create([
            'name' => 'Yassine Student',
            'email' => 'student@example.com',
            'password' => bcrypt('password'),
            'role' => 'student'
        ]);
    }
}
