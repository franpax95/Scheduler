<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

use App\Http\Controllers\Controller;
use App\Models\Task;
use App\Models\Schedule;

class TasksController extends Controller
{
    /**
     * Return tasks by schedule_id
     */
    public function get($schedule_id){
        $user = Auth::user();

        try{
            $sch = Schedule::findOrFail($schedule_id);
            $tasks = Task::where('user_id', $user->id)
                ->where('schedule_id', $schedule_id)
                ->orderBy('order', 'desc')
                ->get();
            return response()->json(['success' => $tasks], 200);
        }catch(ModelNotFoundException $e){
            return response()->json(['error' => 'Unauthorized schedule tasks']);
        }
        
    }

    /**
     * Return a task find by id
     */
    public function find($id){
        $user = Auth::user();

        try{
            $task = Task::findOrFail($id);
            return response()->json(['success' => $task]);
        }catch(ModelNotFoundException $e){
            return response()->json(['error' => 'The schedule does not exist']);
        }
    }

    public function store(Request $request) {
        $user = Auth::user();

        DB::table('tasks')
            ->where('schedule_id', $request->schedule_id)
            ->where('order', '>=', $request->order)
            ->increment('order');

        $id = DB::table('tasks')->insertGetId([
            'name' => $request->name,
            'completed' => $request->completed,
            'order' => $request->order,
            'schedule_id' => $request->schedule_id,
            'user_id' => $user->id,
            'created_at' => Carbon::now()
        ]);

        $task = Task::find($id);

        return response()->json(['success' => $task], 200);
    }
}
