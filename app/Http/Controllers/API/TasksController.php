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
                ->orderBy('order', 'asc')
                ->get();
            return response()->json(['success' => $tasks], 200);
        }catch(ModelNotFoundException $e){
            return response()->json(['error' => 'Unauthorized schedule tasks']);
        }
        
    }

    /**
     * Return a task find by id
     */
    public function find(int $id){
        $user = Auth::user();

        try{
            $task = Task::findOrFail($id);
            return response()->json(['success' => $task]);
        }catch(ModelNotFoundException $e){
            return response()->json(['error' => 'The schedule does not exist']);
        }
    }

    /**
     * store a new task
     */
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

    
    /**
     * update a task info (not order)
     */
    public function update($id, Request $request) {
        $user = Auth::user();

        Task::where('id', $id)->update([
            'name' => $request->name,
            'completed' => $request->completed,
            'updated_at' => Carbon::now()
        ]);
        $task = Task::find($id);

        return response()->json(['success' => $task], 200);
    }

    
    /**
     * update two tasks order
     */
    public function reorder($schedule_id, Request $request) {
        try{
            $task = Task::findOrFail($request->task_id);
            $order = intval($request->order);

            if($order != $task->order) {
                if($order < $task->order) {
                    DB::table('tasks')
                        ->where('schedule_id', $schedule_id)
                        ->where('order', '>=', $order)
                        ->where('order', '<', $task->order)
                        ->increment('order');
                } else if($order > $task->order) {
                    DB::table('tasks')
                        ->where('schedule_id', $schedule_id)
                        ->where('order', '>=', $task->order)
                        ->where('order', '<', $order)
                        ->decrement('order');
                }

                $task->order = $order;
                $task->save();
            }

            return response()->json(['success' => null]);

        }catch(ModelNotFoundException $e) {
            return response()->json(['error' => 'There is an error with the task id: does not exist'], 404);
        }
    }

    /**
     * delete a task
     */
    public function delete($id) {
        try{
            $task = Task::findOrFail($id);

            DB::table('tasks')
                ->where('schedule_id', $task->schedule_id)
                ->where('order', '>', $task->order)
                ->decrement('order');

            $task->delete();

            return response()->json(null, 204);

        }catch(ModelNotFoundException $e) {
            return response()->json(['error' => 'The task does not exist'], 404);
        }
    }
}
