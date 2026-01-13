<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Video extends Model
{
    protected $fillable = [
        'title',
        'description',
        'thumbnail',
        'embed_url',
        'expert_id',
        'trail_id',
        'views',
    ];

    /**
     * Automatically convert YouTube URLs to embed format when setting embed_url.
     */
    protected function embedUrl(): Attribute
    {
        return Attribute::make(
            set: fn (string $value) => $this->convertToEmbedUrl($value),
        );
    }

    /**
     * Convert various YouTube URL formats to embed URL.
     */
    private function convertToEmbedUrl(string $url): string
    {
        // Extract video ID from various YouTube URL formats
        $videoId = null;

        // Format: https://www.youtube.com/watch?v=VIDEO_ID or with extra params
        if (preg_match('/youtube\.com\/watch\?.*v=([a-zA-Z0-9_-]+)/', $url, $matches)) {
            $videoId = $matches[1];
        }
        // Format: https://youtu.be/VIDEO_ID or https://youtu.be/VIDEO_ID?si=...
        elseif (preg_match('/youtu\.be\/([a-zA-Z0-9_-]+)/', $url, $matches)) {
            $videoId = $matches[1];
        }
        // Format: https://www.youtube.com/embed/VIDEO_ID (already embed format)
        elseif (preg_match('/youtube\.com\/embed\/([a-zA-Z0-9_-]+)/', $url, $matches)) {
            $videoId = $matches[1];
        }

        if ($videoId) {
            return "https://www.youtube.com/embed/{$videoId}";
        }

        return $url;
    }

    public function expert(): BelongsTo
    {
        return $this->belongsTo(Expert::class);
    }

    public function trail(): BelongsTo
    {
        return $this->belongsTo(Trail::class);
    }

    public function categories(): BelongsToMany
    {
        return $this->belongsToMany(Category::class)->withTimestamps();
    }

    public function users(): BelongsToMany
    {
        return $this->belongsToMany(User::class)->withPivot('rate')->withTimestamps();
    }
}
