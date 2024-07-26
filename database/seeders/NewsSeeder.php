<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class NewsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        for ($i=0; $i < 20; $i++) {
            DB::table('news')->insert([
                'title' => fake()->title(),
                'description' => fake()->paragraph(),
                'category' => fake()->sentence(),
                'author' => fake()->email(),
            ]);
        }
    }
}
