<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\JobCategory;

class JobCategoryController extends Controller
{
    public function getAllJobCategories()
    {
        try {
            // Retrieve job category and order by id in descending order
            $jobs = JobCategory::orderBy('id', 'desc')->get();

            // Check if the job category collection is empty
            if ($jobs->isEmpty()) {
                return response()->json([
                    'message' => 'No record found!',
                    'data' => []
                ], 200); // Status code 200 for no content
            }

            return response()->json([
                'message' => 'Job categories retrieved successfully!',
                'data' => $jobs
            ], 201); // Status code 201 for successful data retrieval

        } catch (\Exception $e) {
            // Handle any errors
            return response()->json([
                'message' => 'Something went wrong!',
                'error' => $e->getMessage()
            ], 500); // Status code 500 for server error
        }
    }
    public function getJobCategoryByID($id)
    {
        try {
            // Retrieve the job category
            $job = JobCategory::find($id);

            // Check if the job category exists
            if (!$job) {
                return response()->json([
                    'message' => 'Job category not found!',
                    'data' => null
                ], 404); // Status code 404 for not found
            }

            // If the category is found
            return response()->json([
                'message' => 'Job category retrieved successfully!',
                'data' => $job
            ], 200); // Status code 200 for successful retrieval

        } catch (\Exception $e) {
            // Handle any errors
            return response()->json([
                'message' => 'Something went wrong!',
                'error' => $e->getMessage()
            ], 500); // Status code 500 for server error
        }

    }
    public function addJobCategory(Request $request)
    {
        try {
            // Validate the incoming request data
            $validatedData = $request->validate([
                'title' => 'required|string|max:255',
            ]);

            $job = JobCategory::create([
                'title' => $validatedData['title']
            ]);

            // Return a success response
            return response()->json([
                'message' => 'Job category created successfully!',
                'data' => $job
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
    public function editJobCategory(Request $request, $id)
    {
        try {
            // Validate the incoming request data
            $validatedData = $request->validate([
                'title' => 'required|string|max:255',
            ]);

            // Find the job submission by ID
            $job = JobCategory::findOrFail($id);

            // Update other fields
            $job->title = $validatedData['title'];

            // Save the updated job submission
            $job->save();

            // Return a success response
            return response()->json([
                'message' => 'Job category updated successfully!',
                'data' => $job
            ], 200); // Status code 200 for successful update

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
    public function deleteJobCategory($id)
    {
        try {
            // Find the job category by ID, if not found it will throw an exception
            $job = JobCategory::findOrFail($id);

            // Delete the job category
            $job->delete();

            // Return a success response
            return response()->json([
                'message' => 'Job category deleted successfully!',
                'status' => 'success'
            ], 200); // 200 status code for success

        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            // Handle the case where the category is not found
            return response()->json([
                'message' => 'Job category not found!',
                'status' => 'error'
            ], 404); // 404 status code for not found

        } catch (\Exception $e) {
            // Handle any other errors
            return response()->json([
                'message' => 'Something went wrong while deleting the job category!',
                'error' => $e->getMessage(),
                'status' => 'error'
            ], 500); // 500 status code for server error
        }
    }
}
