<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;
use Validator;
use App\Http\Controllers\Controller;
use App\Models\User;


class UserController extends Controller
{
    public function login(Request $request){
        $credentials = [
            'email' => $request->email,
            'password' => $request->password
        ];

        if(auth()->attempt($credentials)){
            $user = Auth::user();
            $success['user'] = $user;
            $success['token'] = $user->createToken('Scheduler')->accessToken;
            return response()->json(['success' => $success], 200);
        }else{
            return response()->json(['error' => 'Unauthorised']);
        }
    }

    public function register(Request $request){
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'email' => 'required|email',
            'password' => 'required',
            'password_confirmation' => 'required|same:password'
        ]);

        if($validator->fails()){
            return response()->json(['error' => $validator->errors()]);
        }

        $data = $request->all();
        $data['password'] = Hash::make($data['password']);
        
        $user = User::create($data);
        $success['token'] = $user->createToken('Scheduler')->accessToken;

        return response()->json(['success' => $success], 200);
    }

    public function logout() {
        Auth::logout();
    }

    /**
     * Return current user details
     */
    public function user(){
        $user = Auth::user();
        return response()->json(['success' => $user], 200);
    }
}
