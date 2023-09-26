<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Wallet;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;

class UserController extends Controller
{
    /**
     * Users
     *
     * Return a list of users
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        $user = Auth::user();
        return response()->json(User::where('id', '!=', $user->id)->get());
    }

    public function store(Request $request){

        $validations = Validator::make($request->all(), [
            'first_name' => 'required|string',
            'last_name' => 'required|string',
            'email' => 'required|email|unique:users|max:155',
            'password' => 'required|min:4',
            'status' => 'required|string',
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
                'email' => $request->email,
                'status' => $request->status,
                'remember_token' => Str::random(10), //Generate verification code,
                'password' => Hash::make($request->password)
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

        $rules = [
            'first_name' => 'required|max:255',
            'last_name' => 'required|max:255',
            'email' => [
                'required',
                Rule::unique('users')->ignore($user->id),
                'email'
            ],
            'status' => 'in:admin,client',
            //'password' => 'confirmed',
        ];

        $input = $request->only(
            'first_name',
            'last_name',
            'email',
            'status',
            //'password',
        );

        $validator = Validator::make($input, $rules);

        if($validator->fails()) {
            $error = $validator->messages()->toJson();
            return response()->json(['success'=> false, 'error'=> $error])->header('Content-Type', 'application/json');
        }

        $user->update($request->all());

        return response()->json(['success'=> true, 'message'=> 'Utilisateur modifié !'])->header('Content-Type', 'application/json');
    }


    /**
     * User
     *
     * Return a specific user
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($id)
    {
        return response()->json(User::find($id));
    }

    /**
     * Wallet
     *
     * return the wallet of a user
     *
     * @param  string  token
     * @return \Illuminate\Http\JsonResponse
     */
    public function wallet(){
        $user = Auth::user();
        return response()->json(['success'=> true, 'wallet'=> $user->getWallet($user->id)]);
    }

    /**
     * Wallet
     *
     * return the wallet of a user
     *
     * @param  string  token
     * @return \Illuminate\Http\JsonResponse
     */
    public function walletInfo(){
        $user = Auth::user();
        return response()->json(Wallet::where('user_id', $user->id)->first());
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
