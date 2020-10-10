<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Schedule;

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
            'user_id' => 1,
            'name' => 'Horario Semanal',
            'date' => '2020-10-20',
            // tasks -> JSON.Stringify(JSObject)
            'tasks' => '[{"order":0,"name":"Llevar coche al taller","done":true},{"order":1,"name":"Comprar algo para el cumple de Fran","done":false}]'
        ]);

        Schedule::create([
            'user_id' => 1,
            'name' => 'Limpieza',
            'date' => '2020-10-25',
            // tasks -> JSON.Stringify(JSObject)
            'tasks' => '[{"order":0,"name":"Quitar polvo","done":true},{"order":1,"name":"Barrer suelo","done":false},{"order":2,"name":"Fregar suelo","done":false}]'
        ]);
    }
}
