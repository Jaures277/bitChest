<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class AuthController extends Controller
{

    public function register(Request $request){

        $validations = Validator::make($request->all(), [
            'first_name' => 'required|string',
            'last_name' => 'required|string',
            'email' => 'required|email|unique:users|max:155',
            'password' => 'required|min:4',
        ]);


        if ($validations->fails()) {
            $errors = $validations->errors();

            return response()->json([
                'errors' => $errors,
                'status' => 401
            ]);
        }


        if ($validations->passes()) {

            $user = User::create([
                'first_name' => $request->first_name,
                'last_name' => $request->last_name,
                'status' => $request->status,
                'email' => $request->email,
                'remember_token' => Str::random(10), //Generate verification code,
                'password' => Hash::make('password')
            ]);

            $token = $user->createToken('auth_token')->plainTextToken;
            return response()->json([
                'token' => $token,
                'type' => 'Bearer'
            ]);
        }
    }

    /**
     * Update
     *
     * Update a user
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, $id)
    {
        $user = User::find($id);
        if($user->status != 'admin'){
                return response()->json(['success'=> false, 'error'=> "Vous n'êtes pas autorisée à modifié cette utilisateur"])->header('Content-Type', 'application/json');
        }


        $input = $request->only(
            'name',
            'email',
            'role',
            'password',
            'password_confirmation'
        );

        $validator = Validator::make($input, $rules);

        if($validator->fails()) {
            $error = $validator->messages()->toJson();
            return response()->json(['success'=> false, 'error'=> $error])->header('Content-Type', 'application/json');
        }


        $user->update($request->all());

        return response()->json(['success'=> true, 'message'=> 'Utilisateur modifié !'])->header('Content-Type', 'application/json');
    }

    public function login(Request $request)
    {

        if (!Auth::attempt($request->only('email', 'password'))) {
            return response()->json([
                'msg' => ' Wrong email or password. Please try again',
                'status' => 401
            ]);
        }

        $user = User::where('email', $request->email)->firstOrFail();
        $token = $user->createToken('auth_token')->plainTextToken;


        return response()->json([
            'token' => $token,
            'user' => $user,
            'type' => 'Bearer ',
            'status'=>200,
        ])->cookie('jwt', $token);
    }

    public function user(Request $request)
    {
        return $request->user();
    }

    /**
     * Delete
     *
     * Delete a user
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy($id)
    {
        $user = User::find($id);
        $user->delete();

        return response()->json(['success'=> true, 'message'=> 'Utilisateur supprimé !'])->header('Content-Type', 'application/json');
    }
}
