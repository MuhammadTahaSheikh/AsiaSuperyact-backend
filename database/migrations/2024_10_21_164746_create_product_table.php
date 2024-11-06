<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('product', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('displayedDescription');
            $table->text('exteriorDesignDescription');
            $table->text('amenitiesDescription');
            $table->text('interiorDesignDescription');
            $table->text('toysAndTendersDescription');
            $table->text('imageURL');
            
            // $table->unsignedInteger('price'); // Price should not be negative
            // $table->unsignedInteger('capacity'); // Capacity should not be negative
            // $table->unsignedInteger('pictureSpots'); // Picture spots should not be negative
            // $table->unsignedInteger('bedrooms'); // Bedrooms should not be negative
            // $table->dateTime('repairDate');
            // // $table->string('ratioOfSpace');
            // $table->decimal('ratioOfSpace', 8, 2); // Better to store as a decimal if it's a ratio
            // $table->string('perk'); // Remains string, assuming it's a description

            
            $table->unsignedInteger('price'); // Price should not be negative
            $table->unsignedInteger('guests'); // Capacity should not be negative
            $table->unsignedInteger('cabins'); // Picture spots should not be negative
            $table->unsignedInteger('crew'); // Bedrooms should not be negative
            $table->unsignedInteger('year');

            $table->string('length')->nullable(); // Length, e.g., "80m / 262ft"
            $table->string('beam')->nullable();   // Beam, e.g., "14.2m / 47ft"
            $table->string('draft')->nullable();  // Draft, e.g., "3.9m / 13ft"
            $table->string('cruisingSpeed')->nullable();  // Cruising speed, e.g., "14 Knots"
            $table->string('builder')->nullable();  // Builder, e.g., "Oceanco"
            $table->string('navalArchitect')->nullable(); // Naval architect, e.g., "Oceanco"
            $table->string('exteriorDesigner')->nullable(); // Exterior designer, e.g., "Nuvolari & Lenard"
            $table->string('interiorDesigner')->nullable(); // Interior designer, e.g., "Alberto Pinto"
            $table->string('hullMaterial')->nullable(); // Hull material, e.g., "Steel"
            $table->string('superstructureMaterial')->nullable(); // Superstructure material, e.g., "Aluminium"
            $table->unsignedInteger('grossTonnage')->nullable(); // Gross tonnage, e.g., "2310"
            $table->string('deckMaterial')->nullable(); // Deck material, e.g., "Teak"
            $table->timestamps();

        });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('product');
    }
};
