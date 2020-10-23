<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Schedule;
use App\Models\Task;

use Carbon\Carbon;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        User::create([
            'name' => 'Francisco Javier Navarro García',
            'email' => 'franpax95@admin.com',
            'password' => bcrypt('admin')
        ]);



        Schedule::create([
            'name' => 'Horario Semanal',
            'date' => Carbon::parse('2020-10-20'),
            'user_id' => 1,
        ]);

        Task::create([
            'name' => 'Kegel',
            'order' => 0,
            'completed' => true,
            'schedule_id' => 1,
            'user_id' => 1,
        ]);

        Task::create([
            'name' => 'Cara',
            'order' => 1,
            'completed' => true,
            'schedule_id' => 1,
            'user_id' => 1,
        ]);

        Task::create([
            'name' => 'Ordenar el cuarto',
            'order' => 2,
            'completed' => false,
            'schedule_id' => 1,
            'user_id' => 1,
        ]);



        Schedule::create([
            'user_id' => 1,
            'name' => 'Limpieza',
            'date' => Carbon::parse('2020-10-25'),
        ]);

        Task::create([
            'name' => 'Cocina',
            'order' => 0,
            'completed' => true,
            'schedule_id' => 1,
            'user_id' => 1,
        ]);

        Task::create([
            'name' => 'Baño',
            'order' => 1,
            'completed' => false,
            'schedule_id' => 2,
            'user_id' => 1,
        ]);

        Task::create([
            'name' => 'Habitación',
            'order' => 2,
            'completed' => false,
            'schedule_id' => 2,
            'user_id' => 1,
        ]);
    }
}
