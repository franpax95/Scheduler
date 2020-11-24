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
        /**
         * Users
         */
        User::create([
            'name' => 'Francisco Javier Navarro García',
            'email' => 'franpax95@admin.com',
            'password' => bcrypt('admin')
        ]);

        User::create([
            'name' => 'Saúl Berjón',
            'email' => 'saulberjon@email.com',
            'password' => bcrypt('berjon')
        ]);


        /**
         * Schedules
         */
        Schedule::create([
            'name' => 'Horario Semanal',
            'date' => Carbon::parse('2020-11-24'),
            'user_id' => 1,
        ]);

        Schedule::create([
            'user_id' => 1,
            'name' => 'Limpieza',
            'date' => Carbon::parse('2020-11-27'),
        ]);

        Schedule::create([
            'name' => 'Horario Semanal',
            'date' => Carbon::parse('2020-11-25'),
            'user_id' => 2,
        ]);

        Schedule::create([
            'user_id' => 2,
            'name' => 'Limpieza',
            'date' => Carbon::parse('2020-10-27'),
        ]);


        /**
         * Tasks
         */
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

        Task::create([
            'name' => 'Cocina',
            'order' => 0,
            'completed' => true,
            'schedule_id' => 2,
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

        Task::create([
            'name' => 'Tomates',
            'order' => 0,
            'completed' => false,
            'schedule_id' => 3,
            'user_id' => 2,
        ]);

        Task::create([
            'name' => 'Lechuga',
            'order' => 1,
            'completed' => false,
            'schedule_id' => 3,
            'user_id' => 2,
        ]);

        Task::create([
            'name' => 'Zanahoria',
            'order' => 2,
            'completed' => false,
            'schedule_id' => 3,
            'user_id' => 2,
        ]);

        Task::create([
            'name' => 'Pepinos',
            'order' => 3,
            'completed' => false,
            'schedule_id' => 3,
            'user_id' => 2,
        ]);

        Task::create([
            'name' => 'Salón',
            'order' => 0,
            'completed' => false,
            'schedule_id' => 4,
            'user_id' => 2,
        ]);

        Task::create([
            'name' => 'Cocina',
            'order' => 1,
            'completed' => false,
            'schedule_id' => 4,
            'user_id' => 2,
        ]);
    }
}
