<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class JobDesignation extends Model
{
    use HasFactory;
    protected $table = 'job_dasignations';

    protected $fillable = [
        'title',
        'jobCategoryID',
    ];
}
