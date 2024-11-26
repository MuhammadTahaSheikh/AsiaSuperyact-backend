<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\RecruitingCrew;

class RecruitingCrewController extends Controller
{
    public function getAllCrew()
    {
        try {
            // Retrieve recruiting crew and order by id in descending order
            $crews = RecruitingCrew::orderBy('id', 'desc')->get();

            // Check if the recruiting crew collection is empty
            if ($crews->isEmpty()) {
                return response()->json([
                    'message' => 'No record found!',
                    'data' => []
                ], 200); // Status code 200 for no content
            }

            return response()->json([
                'message' => 'Recruiting crew retrieved successfully!',
                'data' => $crews
            ], 201); // Status code 201 for successful data retrieval

        } catch (\Exception $e) {
            // Handle any errors
            return response()->json([
                'message' => 'Something went wrong!',
                'error' => $e->getMessage()
            ], 500); // Status code 500 for server error
        }
    }
    public function getCrewByID($id)
    {
        try {
            // Retrieve the recruiting crew
            $crews = RecruitingCrew::find($id);

            // Check if the recruiting crew exists
            if (!$crews) {
                return response()->json([
                    'message' => 'Recruiting crew not found!',
                    'data' => null
                ], 404); // Status code 404 for not found
            }

            // If the recruiting crew is found
            return response()->json([
                'message' => 'Recruiting crew retrieved successfully!',
                'data' => $crews
            ], 200); // Status code 200 for successful retrieval

        } catch (\Exception $e) {
            // Handle any errors
            return response()->json([
                'message' => 'Something went wrong!',
                'error' => $e->getMessage()
            ], 500); // Status code 500 for server error
        }

    }
    public function addCrew(Request $request)
    {
        try {
            // Validate the incoming request data
            $validatedData = $request->validate([
                'positions' => 'required|string',
                'skills' => 'required|string',
                'yachtType' => 'required|string|max:255',
                'yachtOperation' => 'required|string|max:255',
                'yachtName' => 'required|string|max:255',
                'yachtSize' => 'required|string|max:255',
                'idealStartDate' => 'required|date',
                'basis' => 'required|string|max:255',
                'flag' => 'nullable|string|max:255',
                'preferredTCNOffice' => 'nullable|string|max:255',
                'yourName' => 'required|string|max:255',
                'yourEmail' => 'required|email|max:255',
                'yourPhone' => 'required|string|max:20',
                'yourLocation' => 'nullable|string|max:255',
                'yourMessage' => 'nullable|string',
                'newsUpdation' => 'boolean',
                'acceptPrivacyPolicy' => 'boolean',
            ]);
            $crews = RecruitingCrew::create([
                'positions' => $validatedData['positions'],
                'skills' => $validatedData['skills'],
                'yachtType' => $validatedData['yachtType'],
                'yachtOperation' => $validatedData['yachtOperation'],
                'yachtName' => $validatedData['yachtName'],
                'yachtSize' => $validatedData['yachtSize'],
                'idealStartDate' => $validatedData['idealStartDate'],
                'basis' => $validatedData['basis'],
                'flag' => $validatedData['flag'],
                'preferredTCNOffice' => $validatedData['preferredTCNOffice'],
                'yourName' => $validatedData['yourName'],
                'yourEmail' => $validatedData['yourEmail'],
                'yourPhone' => $validatedData['yourPhone'],
                'yourLocation' => $validatedData['yourLocation'],
                'yourMessage' => $validatedData['yourMessage'],
                'newsUpdation' => $validatedData['newsUpdation'],
                'acceptPrivacyPolicy' => $validatedData['acceptPrivacyPolicy'],
            ]);

            // Return a success response
            return response()->json([
                'message' => 'Recruiting crew created successfully!',
                'data' => $crews
            ], 201); // Status code 201 for created

        } catch (\Illuminate\Validation\ValidationException $e) {
            // Handle validation errors
            return response()->json([
                'message' => 'Validation error!',
                'errors' => $e->errors()
            ], 422); // Status code 422 for validation failure

        } catch (\Exception $e) {
            // Handle any other errors
            return response()->json([
                'message' => 'Something went wrong!',
                'error' => $e->getMessage()
            ], 500); // Status code 500 for server error
        }
    }
    public function editCrew(Request $request, $id)
    {
        try {
            // Validate the incoming request data
            $validatedData = $request->validate([
                'positions' => 'required|string',
                'skills' => 'required|string',
                'yachtType' => 'required|string|max:255',
                'yachtOperation' => 'required|string|max:255',
                'yachtName' => 'required|string|max:255',
                'yachtSize' => 'required|string|max:255',
                'idealStartDate' => 'required|date',
                'basis' => 'required|string|max:255',
                'flag' => 'nullable|string|max:255',
                'preferredTCNOffice' => 'nullable|string|max:255',
                'yourName' => 'required|string|max:255',
                'yourEmail' => 'required|email|max:255',
                'yourPhone' => 'required|string|max:20',
                'yourLocation' => 'nullable|string|max:255',
                'yourMessage' => 'nullable|string',
                'newsUpdation' => 'boolean',
                'acceptPrivacyPolicy' => 'boolean',
            ]);

            // Find the crew record by ID
            $crew = RecruitingCrew::findOrFail($id);

            // Update the crew data with validated data
            $crew->update([
                'positions' => $validatedData['positions'],
                'skills' => $validatedData['skills'],
                'yachtType' => $validatedData['yachtType'],
                'yachtOperation' => $validatedData['yachtOperation'],
                'yachtName' => $validatedData['yachtName'],
                'yachtSize' => $validatedData['yachtSize'],
                'idealStartDate' => $validatedData['idealStartDate'],
                'basis' => $validatedData['basis'],
                'flag' => $validatedData['flag'],
                'preferredTCNOffice' => $validatedData['preferredTCNOffice'],
                'yourName' => $validatedData['yourName'],
                'yourEmail' => $validatedData['yourEmail'],
                'yourPhone' => $validatedData['yourPhone'],
                'yourLocation' => $validatedData['yourLocation'],
                'yourMessage' => $validatedData['yourMessage'],
                'newsUpdation' => $validatedData['newsUpdation'],
                'acceptPrivacyPolicy' => $validatedData['acceptPrivacyPolicy'],
            ]);

            // Return a success response
            return response()->json([
                'message' => 'Recruiting crew updated successfully!',
                'data' => $crew
            ], 200); // Status code 200 for successful update

        } catch (\Illuminate\Validation\ValidationException $e) {
            // Handle validation errors
            return response()->json([
                'message' => 'Validation error!',
                'errors' => $e->errors()
            ], 422); // Status code 422 for validation failure

        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            // Handle the case where the crew is not found
            return response()->json([
                'message' => 'Recruiting crew not found!',
                'error' => $e->getMessage()
            ], 404); // Status code 404 for not found

        } catch (\Exception $e) {
            // Handle any other errors
            return response()->json([
                'message' => 'Something went wrong!',
                'error' => $e->getMessage()
            ], 500); // Status code 500 for server error
        }
    }
    public function deleteCrew($id)
    {
        try {
            // Find the recruiting crew by ID, if not found it will throw an exception
            $crews = RecruitingCrew::findOrFail($id);

            // Delete the recruiting crew
            $crews->delete();

            // Return a success response
            return response()->json([
                'message' => 'Recruiting crew deleted successfully!',
                'status' => 'success'
            ], 200); // 200 status code for success

        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            // Handle the case where the recruiting crew is not found
            return response()->json([
                'message' => 'Recruiting crew not found!',
                'status' => 'error'
            ], 404); // 404 status code for not found

        } catch (\Exception $e) {
            // Handle any other errors
            return response()->json([
                'message' => 'Something went wrong while deleting the recruiting crew!',
                'error' => $e->getMessage(),
                'status' => 'error'
            ], 500); // 500 status code for server error
        }
    }
}
