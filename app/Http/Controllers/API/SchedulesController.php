<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
//use App\Models\User;
use App\Models\Schedule;

class SchedulesController extends Controller
{
    public function index(){
        $user = Auth::user();
        $schedules = Schedule::where('user_id', $user->id)->get();
        schedulesToFront($schedules);
        
        return response()->json(['success' => $routines], 200);
    }

    public function find($id){
        $user = Auth::user();

        try{
            $schedule = Schedule::findOrFail($id);
            
            if($schedule->user_id == $user->id){
                $schedule->tasks = json_decode($schedule->tasks);
                return response()->json(['success' => $schedule]);
            }else{
                return response()->json(['error' => 'The schedule does not belong to this user']);
            }
        }catch(ModelNotFoundException $e){
            return response()->json(['error' => 'The schedule does not exist']);
        }
    }

    /**
     * SUPPORT SUBFUNCTIONS
     */
    private function schedulesToFront($schedules){
        foreach($schedules as $schedule)
            $schedule->tasks = json_decode($schedule->tasks);
    }
}
