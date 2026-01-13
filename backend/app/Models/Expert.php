<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Expert extends Model
{
    protected $fillable = [
        'name',
        'role',
        'image',
        'bio',
    ];

    public function videos(): HasMany
    {
        return $this->hasMany(Video::class);
    }
}
