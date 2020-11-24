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

        $scheduleQuery = DB::table('schedules')->where('id', $schedule_id)->get();

        if(count($scheduleQuery) == 0) {
            return response()->json('Schedule does not exists.', 404);
        } else if($scheduleQuery[0]->user_id != $user->id) {
            return response()->json('Not authorized', 401);
        }


        $tasks = DB::table('tasks')
                    ->where('schedule_id', $scheduleQuery[0]->id)
                    ->orderBy('order', 'asc')
                    ->get();

        return response()->json($tasks, 200);
    }

    /**
     * Return a task find by id
     */
    // public function find(int $id){
    //     $user = Auth::user();

    //     $taskQuery = DB::table('tasks')->where('id', $id)->get();

    //     if(count($taskQuery) == 0) {
    //         return response()->json('Task does not exists.', 404);
    //     } else if($taskQuery[0]->user_id != $user->id) {
    //         return response()->json('Not authorized', 401);
    //     } else {
    //         return response()->json($taskQuery[0], 200);
    //     }
    // }

    /**
     * store a new task
     */
    public function store(Request $request) {
        $user = Auth::user();

        // Update order tasks from the same schedule (if last order it wont update anything)
        DB::table('tasks')
            ->where('schedule_id', $request->schedule_id)
            ->where('order', '>=', $request->order)
            ->increment('order');
        
        // Insert new task
        $id = DB::table('tasks')->insertGetId([
            'name' => $request->name,
            'completed' => $request->completed,
            'order' => $request->order,
            'schedule_id' => $request->schedule_id,
            'user_id' => $user->id,
            'created_at' => Carbon::now()
        ]);

        // Retrieve task
        $task = DB::table('tasks')->find($id);

        return response()->json($task, 200);
    }

    
    /**
     * update a task info (not order)
     */
    public function update($id, Request $request) {
        $user = Auth::user();

        // Update task
        DB::table('tasks')
            ->where('id', $id)
            ->update([
                'name' => $request->name,
                'completed' => $request->completed,
                'updated_at' => Carbon::now()
            ]);

        // Retrieve new task
        $task = DB::table('tasks')->find($id);

        return response()->json($task, 200);
    }

    
    /**
     * update tasks order
     */
    public function reorder($schedule_id, Request $request) {
        $user = Auth::user();

        // Check schedule_id
        $scheduleQuery = DB::table('schedules')->where('id', $schedule_id)->get();
        if(count($scheduleQuery) == 0) {
            return response()->json('Schedule does not exists.', 404);
        } else if($scheduleQuery[0]->user_id != $user->id) {
            return response()->json('Not authorized', 401);
        }
        $schedule = $scheduleQuery[0];
        
        // Retrieve & Check task
        $taskQuery = DB::table('tasks')->where('id', $request->id)->get();
        if(count($taskQuery) == 0) {
            return response()->json('Task does not exists.', 404);
        } else if($taskQuery[0]->user_id != $user->id) {
            return response()->json('Not authorized', 401);
        } else if($taskQuery[0]->schedule_id != $schedule->id) {
            return response()->json('Task does not belong to Schedule', 403);
        }
        $task = $taskQuery[0];

        // Update logic
        $newOrder = intval($request->order);
        $oldOrder = $task->order;

        if($newOrder != $oldOrder) {
            if($newOrder < $oldOrder) {
                DB::table('tasks')
                    ->where('schedule_id', $schedule_id)
                    ->where('order', '>=', $newOrder)
                    ->where('order', '<', $oldOrder)
                    ->increment('order');
            } else if($newOrder > $oldOrder) {
                DB::table('tasks')
                    ->where('schedule_id', $schedule_id)
                    ->where('order', '>', $oldOrder)
                    ->where('order', '<=', $newOrder)
                    ->decrement('order');
            }

            DB::table('tasks')
                ->where('id', $task->id)
                ->update(['order' => $newOrder]);
        }

        // Get updated tasks
        $tasks = DB::table('tasks')
                    ->where('schedule_id', $schedule->id)
                    ->orderBy('order', 'asc')
                    ->get();

        return response()->json($tasks, 200);
    }

    /**
     * delete a task
     */
    public function delete($id) {
        // Retrieve & Check task
        $taskQuery = DB::table('tasks')->where('id', $request->id)->get();
        if(count($taskQuery) == 0) {
            return response()->json('Task does not exists.', 404);
        } else if($taskQuery[0]->user_id != $user->id) {
            return response()->json('Not authorized', 401);
        } else if($taskQuery[0]->schedule_id != $schedule->id) {
            return response()->json('Task does not belong to Schedule', 403);
        }
        $task = $taskQuery[0];

        // Decrement some tasks order
        DB::table('tasks')
            ->where('schedule_id', $task->schedule_id)
            ->where('order', '>', $task->order)
            ->decrement('order');

        // Delete task
        DB::table('tasks')->where('id', $task->id)->delete();

        // Get updated tasks
        $updatedTasks = DB::table('tasks')->where('schedule_id', $task->schedule_id)->orderBy('order', 'asc')->get();

        return response()->json($updatedTasks, 200);
    }
}
