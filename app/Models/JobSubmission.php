<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class JobSubmission extends Model
{
    use HasFactory;
    protected $table = 'job_submissions';

    protected $fillable = [
        'name',
        'email',
        'phone',
        'resumeURL'
    ];
}
