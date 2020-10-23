<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use App\Models\Task;
use App\Models\Schedule;

class SchedulesController extends Controller
{
    /**
     * Return all schedules, without tasks
     */
    public function get(){
        $user = Auth::user();
        $schedules = Schedule::where('user_id', $user->id)->get();
        return response()->json(['success' => $schedules], 200);
    }

    /**
     * Return all schedules for a specific date, without tasks
     */
    public function getByDate($date){
        $user = Auth::user();
        $schedules = Schedule::where('user_id', $user->id)
            ->where('date', $date)    //REVISAR el tema de las fechas
            ->orderBy('name', 'desc')
            ->get();

        return response()->json(['success' => $schedules], 200);
    }

    /**
     * Return a schedule find by id, with tasks
     */
    public function find($id){
        $user = Auth::user();

        try{
            $schedule = Schedule::findOrFail($id);
            
            if($schedule->user_id == $user->id){
                $tasks = Taks::where('schedule_id', $schedule->id)->orderBy('order', 'desc')->get();
                $schedule->tasks = $tasks;
                return response()->json(['success' => $schedule]);
            }else{
                return response()->json(['error' => 'The schedule does not belong to this user']);
            }
        }catch(ModelNotFoundException $e){
            return response()->json(['error' => 'The schedule does not exist']);
        }
    }
}
