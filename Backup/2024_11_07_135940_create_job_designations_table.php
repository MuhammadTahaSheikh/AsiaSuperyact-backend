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
        Schema::create('job_designations', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->unsignedBigInteger('jobCategoryID');
            $table->timestamps();

            $table->foreign('jobCategoryID')->references('id')->on('job_categories')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('job_designations');
    }
};
