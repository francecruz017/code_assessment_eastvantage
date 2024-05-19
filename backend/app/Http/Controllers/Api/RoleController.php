<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreRoleRequest;
use App\Models\Role;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class RoleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): JsonResponse
    {
        $roles = Role::withCount('users')->get();

        return response()
            ->json(['roles' => $roles], 200);
    }

    /**
     * Store a newly created resource in storage.
    */
    public function store(StoreRoleRequest $request): JsonResponse
    {
        $role = new Role();
        $role->name = $request->input('name');
        $role->save();

        return response()->json(['role' => $role], 201);
    }

    /**
     * Deletes resource in storage.
     */
    public function destroy(int $id): JsonResponse
    {
        $user = Role::findOrFail($id);
        
        if ($user->delete()) {
            return response()->json(['message' => 'Role has been deleted.'], 200);
        }
    }
}
