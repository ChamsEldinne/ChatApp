<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use App\Models\User ;
use App\Models\Group ;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('groups', function (Blueprint $table) {
            $table->id();
            $table->string('name') ;
        });
        Schema::create('relation', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(User::class) ;
            $table->morphs('relationable') ;
            $table->string('status');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('groups');
        Schema::dropIfExists('relation') ;
    }
};
