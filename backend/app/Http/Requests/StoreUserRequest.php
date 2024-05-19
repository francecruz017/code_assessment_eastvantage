<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Http\JsonResponse;

class StoreUserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'first_name' => 'required|string|max:100|regex:/^[a-zA-Z\s]*$/',
            'last_name' => 'required|string|max:100|regex:/^[a-zA-Z\s]*$/',
            'middle_name' => 'string|max:100|regex:/^[a-zA-Z\s]*$/',
            'roles' => 'required|array',
            'roles.*' => 'exists:roles,id',
            'email' => 'required|email|unique:users,email',
        ];
    }

    protected function failedValidation(Validator $validator): JsonResponse
    {
        throw new HttpResponseException(response()->json(['errors' => $validator->errors()], 400));
    }
}
