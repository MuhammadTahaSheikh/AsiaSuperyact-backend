<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ReachOut;

class ReachOutController extends Controller
{
    private function cleanResponse($response)
    {
        // Clean the output buffer to remove deprecation warnings
        if (ob_get_level()) {
            ob_clean();
        }
        
        // Get the content and clean it
        $content = $response->getContent();
        
        // Remove deprecation warnings from the content
        $content = preg_replace('/<br\s*\/?>\s*<b>Deprecated<\/b>.*?<\/b><br\s*\/?>/s', '', $content);
        $content = preg_replace('/<br\s*\/?>\s*<b>Warning<\/b>.*?<\/b><br\s*\/?>/s', '', $content);
        
        // Set the cleaned content back
        $response->setContent($content);
        
        return $response;
    }
    
    public function getAllReachOut()
    {
        try {
            // Retrieve reach outs and order by id in descending order
            $reach = ReachOut::orderBy('id', 'desc')->get();

            // Check if the products collection is empty
            if ($reach->isEmpty()) {
                return response()->json([
                    'message' => 'No record found!',
                    'data' => []
                ], 200); // Status code 200 for no content
            }

            return $this->cleanResponse(response()->json([
                'message' => 'Reach out retrieved successfully!',
                'data' => $reach
            ], 201)); // Status code 201 for successful data retrieval

        } catch (\Exception $e) {
            // Handle any errors
            return response()->json([
                'message' => 'Something went wrong!',
                'error' => $e->getMessage()
            ], 500); // Status code 500 for server error
        }
    }
    public function getReachOutByID($id)
    {
        try {
            // Retrieve the reach out
            $reach = ReachOut::find($id);

            // Check if the reach out exists
            if (!$reach) {
                return response()->json([
                    'message' => 'Reach out not found!',
                    'data' => null
                ], 404); // Status code 404 for not found
            }

            // If the reach out is found
            return response()->json([
                'message' => 'Reach out retrieved successfully!',
                'data' => $reach
            ], 200); // Status code 200 for successful retrieval

        } catch (\Exception $e) {
            // Handle any errors
            return response()->json([
                'message' => 'Something went wrong!',
                'error' => $e->getMessage()
            ], 500); // Status code 500 for server error
        }

    }
    public function addReachOut(Request $request)
    {
        try {
            // Validate the incoming request data
            $validatedData = $request->validate([
                'address' => 'required|string|max:255', // Address validation
                'email' => 'required|email|max:255',    // Email validation
                'phone' => ['required', 'regex:/^(\+?[0-9\s\-\(\)]{7,15})$/'], // Phone validation
            ]);
            

            // Create a new reach out using the validated data
            $reach = ReachOut::create([
                'address' => $validatedData['address'],
                'email' => $validatedData['email'],
                'phone' => $validatedData['phone'],
            ]);

            // Return a success response
            return response()->json([
                'message' => 'Category added successfully!',
                'data' => $reach
            ], 201); // Status code 201 for created

        } catch (\Illuminate\Validation\ValidationException $e) {
            // Handle validation errors
            return response()->json([
                'message' => 'Validation error!',
                'errors' => $e->errors()
            ], 422); // Status code 422 for unprocessable entity (validation failure)

        } catch (\Exception $e) {
            // Handle any other errors
            return response()->json([
                'message' => 'Something went wrong!',
                'error' => $e->getMessage()
            ], 500); // Status code 500 for server error
        }
    }
    public function editReachOut(Request $request, $id)
    {
        // return $request;
        try {
            // Validate the incoming request data
            $validatedData = $request->validate([
                'address' => 'required|string|max:255', // Address validation
                'email' => 'required|email|max:255',    // Email validation
                'phone' => ['required', 'regex:/^(\+?[0-9\s\-\(\)]{7,15})$/'], // Phone validation
            ]);

            $item = ReachOut::findOrFail($id);
            $item->update([
                'address' => $validatedData['address'],
                'email' => $validatedData['email'],
                'phone' => $validatedData['phone'],
            ]);

            // Return a success response
            return response()->json([
                'message' => 'Reach out updated successfully!',
                'data' => $item
            ], 201); // Status code 201 for created

        } catch (\Illuminate\Validation\ValidationException $e) {
            // Handle validation errors
            return response()->json([
                'message' => 'Validation error!',
                'errors' => $e->errors()
            ], 422); // Status code 422 for unprocessable entity (validation failure)

        } catch (\Exception $e) {
            // Handle any other errors
            return response()->json([
                'message' => 'Something went wrong!',
                'error' => $e->getMessage()
            ], 500); // Status code 500 for server error
        }
    }
    public function deleteReachOut($id)
    {
        try {
            // Find the reach out by ID, if not found it will throw an exception
            $reach = ReachOut::findOrFail($id);

            // Delete the reach out
            $reach->delete();

            // Return a success response
            return response()->json([
                'message' => 'Reach out deleted successfully!',
                'status' => 'success'
            ], 200); // 200 status code for success

        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            // Handle the case where the reach out is not found
            return response()->json([
                'message' => 'Reach out not found!',
                'status' => 'error'
            ], 404); // 404 status code for not found

        } catch (\Exception $e) {
            // Handle any other errors
            return response()->json([
                'message' => 'Something went wrong while deleting the reach out!',
                'error' => $e->getMessage(),
                'status' => 'error'
            ], 500); // 500 status code for server error
        }
    }
}