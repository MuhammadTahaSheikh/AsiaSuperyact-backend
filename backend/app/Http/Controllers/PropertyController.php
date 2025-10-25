<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Property;

class PropertyController extends Controller
{
    public function getAllProperties()
    {
        try {
            // For now, return empty array since properties table doesn't exist
            return response()->json([
                'message' => 'No properties found!',
                'data' => []
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Something went wrong!',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function getPropertyByID($id)
    {
        try {
            // For now, return not found since properties table doesn't exist
            return response()->json([
                'message' => 'Property not found!',
                'data' => null
            ], 404);

        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Something went wrong!',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
