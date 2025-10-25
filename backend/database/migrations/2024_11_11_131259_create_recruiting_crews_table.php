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
        Schema::create('recruiting_crews', function (Blueprint $table) {
            $table->id();
            $table->longText('positions');
            $table->longText('skills');
            $table->string('yachtType');
            $table->string('yachtOperation');
            $table->string('yachtName');
            $table->string('yachtSize');
            $table->dateTime('idealStartDate');
            $table->string('basis');
            $table->string('flag')->nullable();
            $table->string('preferredTCNOffice')->nullable();
            $table->string('yourName');
            $table->string('yourEmail');
            $table->string('yourPhone');
            $table->string('yourLocation')->nullable();
            $table->longText('yourMessage')->nullable();
            $table->boolean('newsUpdation')->default(false);
            $table->boolean('acceptPrivacyPolicy')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('recruiting_crews');
    }
};
