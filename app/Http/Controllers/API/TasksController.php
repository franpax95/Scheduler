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
        if($request->newOrder != $request->currentOrder) {
            $task = Task::where([
                'schedule_id', '=', $schedule_id,
                'order', '=', $request->currentOrder
            ]);
    
            // $request tendrá currentOrder que es el orden antiguo y newOrder que es la nueva posición
            if($request->newOrder < $request->currentOrder) {
                DB::raw('UPDATE tasks SET tasks.order = tasks.order + 1 WHERE tasks.schedule_id = ' + $schedule_id + ' AND tasks.order >= ' + $request->newOrder + ' AND tasks.order < ' + $request->currentOrder);
            } else if($request->newOrder > $request->currentOrder) {
                DB::raw('UPDATE tasks SET tasks.order = tasks.order - 1 WHERE tasks.schedule_id = ' + $schedule_id + ' AND tasks.order >= ' + $request->currentOrder + ' AND tasks.order < ' + $request->newOrder);
            }

            $task->order = $request->newOrder;
            $task->save();
    
            // $startTask = Task::where([
            //     ['schedule_id', '=', $schedule_id],
            //     ['order', '=', $request->currentOrder]
            // ])->first();
    
            // $endTask = Task::where([
            //     ['schedule_id', '=', $schedule_id],
            //     ['order', '=', $request->endIndex]
            // ])->first();
    
    
            // $startTask->order = $request->endIndex;
            // $endTask->order = $request->startIndex;
    
            // $startTask->save();
            // $endTask->save();
    
    
            return response()->json(['success' => null]);
        } else {
            return response()->json(['success' => null]);
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
