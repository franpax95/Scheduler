<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

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
            ->where('date', $date)
            ->orderBy('name', 'asc')
            ->get();

        return response()->json(['success' => $schedules], 200);
    }

    /**
     * Return a schedule find by id, with tasks
     */
    public function find(int $id){
        $user = Auth::user();

        try{
            $schedule = Schedule::findOrFail($id);
            
            if($schedule->user_id == $user->id){
                $tasks = Task::where('schedule_id', $schedule->id)->orderBy('order', 'asc')->get();
                $schedule->tasks = $tasks;
                return response()->json(['success' => $schedule]);
            }else{
                return response()->json(['error' => 'The schedule does not belong to this user']);
            }
        }catch(ModelNotFoundException $e){
            return response()->json(['error' => 'The schedule does not exist']);
        }
    }

    /**
     * store a new schedule
     */
    public function store(Request $request) {
        $user = Auth::user();

        $id = DB::table('schedules')->insertGetId([
            'name' => $request->name,
            'date' => $request->date,
            'user_id' => $user->id,
            'created_at' => Carbon::now()
        ]);

        $schedule = Schedule::find($id);

        return response()->json(['success' => $schedule], 200);
    }
}
