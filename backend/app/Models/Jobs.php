<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Jobs extends Model
{
    use HasFactory;
    protected $table = 'careers';

    protected $fillable = [
        'title',
        'companyName',
        'jobCategory',
        'designation',
        'yachtSize',
        'yachtType',
        'duration',
        'location',
        'offeredSalary',
        'expirationDate',
        'experience',
        'gender',
        'qualification',
        'description',
        'requirements',
        'keyPoints',
    ];
}
