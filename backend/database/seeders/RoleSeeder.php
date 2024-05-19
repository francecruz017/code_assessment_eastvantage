<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Role;
use Illuminate\Support\Facades\DB;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        DB::statement('ALTER TABLE roles AUTO_INCREMENT = 1');

        $roles = [
            'Administrator',
            'Author',
            'Editor',
            'Subscriber',
        ];

        $now = now();

        $rolesWithTimestamps = array_map(function ($role) use ($now) {
            return [
                'name' => $role,
                'created_at' => $now,
                'updated_at' => $now,
            ];
        }, $roles);

        Role::insert($rolesWithTimestamps);

        return;
    }
}
