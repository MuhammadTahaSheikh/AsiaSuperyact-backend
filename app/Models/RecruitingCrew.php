<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RecruitingCrew extends Model
{
    use HasFactory;
    protected $table = 'recruiting_crews';

    protected $fillable = [
        'positions',
        'skills',
        'yachtType',
        'yachtOperation',
        'yachtName',
        'yachtSize',
        'idealStartDate',
        'basis',
        'flag',
        'preferredTCNOffice',
        'yourName',
        'yourEmail',
        'yourPhone',
        'yourLocation',
        'yourMessage',
        'newsUpdation',
        'acceptPrivacyPolicy',
    ];
}
