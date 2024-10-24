<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;
    protected $table = 'product';

    protected $fillable = [
        'title',
        'categoryID',
        'displayedDescription',
        'exteriorDesignDescription',
        'amenitiesDescription',
        'interiorDesignDescription',
        'toysAndTendersDescription',
        'imageURL',
        'price',
        'capacity',
        'pictureSpots',
        'bedrooms',
        'repairDate',
        'ratioOfSpace',
        'perk',
        'length', // Yacht-specific attributes
        'beam',
        'draft',
        'cruisingSpeed',
        'builder',
        'navalArchitect',
        'exteriorDesigner',
        'interiorDesigner',
        'hullMaterial',
        'superstructureMaterial',
        'grossTonnage',
        'deckMaterial'
    ];
    public function category()
{
    return $this->belongsTo(Category::class, 'categoryID');
}
}
