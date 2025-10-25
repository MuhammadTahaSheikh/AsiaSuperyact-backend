<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('careers', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('companyName');
            $table->string('jobCategory');
            $table->string('designation');
            $table->string('yachtSize');
            $table->string('yachtType');
            $table->string('duration');
            $table->string('location')->nullable();
            $table->string('offeredSalary');
            $table->dateTime('expirationDate')->nullable();
            $table->string('experience');
            $table->string('gender');
            $table->string('qualification');
            $table->longText('description');
            $table->longText('requirements');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('careers');
    }
};
