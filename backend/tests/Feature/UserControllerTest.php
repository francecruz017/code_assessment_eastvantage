<?php

namespace Tests\Feature;

use App\Models\User;
use Database\Seeders\RoleSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class UserControllerTest extends TestCase
{
    use RefreshDatabase;

    private static $seeded = false;

    public function setUp(): void 
    {
        parent::setUp();

        if (!static::$seeded) {
            $this->seed(RoleSeeder::class);
            static::$seeded = true;
        }
    }


    public function testGettingListOfUsers(): void
    {
        $users = User::factory()->count(2)->create();

        $response = $this->get('/api/users');

        $response
            ->assertStatus(200)
            ->assertJsonCount(2, 'users');
    }

    public function testSavingOfUsersWithRole(): void
    {
        $formData = [
            'first_name' => 'Sam',
            'last_name' => 'Brown',
            'email' => 'sam.brown@test.com',
            'roles' => [1],
        ];

        $response = $this->post('/api/users', $formData);

        $response
            ->assertStatus(201)
            ->assertJson([
                'user' => [
                    'first_name' => 'Sam',
                    'last_name' => 'Brown',
                    'email' => 'sam.brown@test.com',
                    'roles' => [
                        [
                            'id' => 1,
                            'name' => 'Administrator',
                        ]
                    ]
                ]
            ]);
    }
}
