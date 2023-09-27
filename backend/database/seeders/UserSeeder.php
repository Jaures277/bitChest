<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;


class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create([
            'email' => 'admin@exemple.com',
            'password' => Hash::make('password'),
            'first_name' => fake()->firstName(),
            'last_name' => fake()->lastName(),
            'status' => 'admin',
            'email_verified_at' => now(),
            'remember_token' => Str::random(10),
        ]);

        User::create([
            'email' => 'client@exemple.com',
            'password' => Hash::make('password'),
            'first_name' => fake()->firstName(),
            'last_name' => fake()->lastName(),
            'status' => 'client',
            'email_verified_at' => now(),
            'remember_token' => Str::random(10),
        ]);

        for ($i = 1; $i <= 8; $i++) {
            User::create([
                'email' => fake()->unique()->safeEmail,
                'password' => Hash::make('password'),
                'first_name' => fake()->firstName(),
                'last_name' => fake()->lastName(),
                'status' => fake()->randomDigit() <= 2 ? 'admin' : 'client', // 70% clients, 30% admins
                'email_verified_at' => now(),
                'remember_token' => Str::random(10),
            ]);
        }
    }
}
