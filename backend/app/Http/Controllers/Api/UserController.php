<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreUserRequest;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Http\JsonResponse;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): JsonResponse
    {
        $filterByRole = [];

        if (true === $request->filled('role')) {
            $filterByRole = User::whereHas('roles', function ($query) use ($request) {
                $query->where('name', $request->get('role'));
            });

            $filterByRole->with('roles');

            $filterByRole = $filterByRole->get();

        } else {
            $filterByRole = User::with('roles')->get();
        }

        return response()
            ->json(['users' => $filterByRole], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreUserRequest $request): JsonResponse
    {
        $user = new User();
        $user->first_name = $request->input('first_name');
        $user->last_name = $request->input('last_name');
        $user->middle_name = $request->input('middle_name', null);
        $user->email = $request->input('email');
        $user->save();

        $user
            ->roles()
            ->attach($request->input('roles'));

        $userWithRoles = $user->load('roles');

        return response()->json(['user' => $userWithRoles], 201);
    }

    /**
     * Deletes resource in storage.
     */
    public function destroy(int $id): JsonResponse
    {
        $user = User::findOrFail($id);
        
        if ($user->delete()) {
            return response()->json(['message' => 'User has been deleted.'], 200);
        }
    }
}
