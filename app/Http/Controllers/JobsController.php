<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Jobs;

class JobsController extends Controller
{
    public function getAllJobs()
    {
        try {
            // Retrieve jobs and order by id in descending order
            $jobs = Jobs::orderBy('id', 'desc')->get();

            // Check if the jobs collection is empty
            if ($jobs->isEmpty()) {
                return response()->json([
                    'message' => 'No record found!',
                    'data' => []
                ], 200); // Status code 200 for no content
            }

            return response()->json([
                'message' => 'Jobs retrieved successfully!',
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
    public function getJobByID($id)
    {
        try {
            // Retrieve the job
            $job = Jobs::find($id);

            // Check if the job exists
            if (!$job) {
                return response()->json([
                    'message' => 'Job not found!',
                    'data' => null
                ], 404); // Status code 404 for not found
            }

            // If the job is found
            return response()->json([
                'message' => 'Job retrieved successfully!',
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
    public function addJob(Request $request)
    {
        // dd('Hi');
        try {
            // Validate the incoming request data
            $validatedData = $request->validate([
                'title' => 'required|string|max:255',
                'companyName' => 'required|string|max:255',
                'jobCategory' => 'required|string|max:255',
                'designation' => 'required|string|max:255',
                'yachtSize' => 'required|string|max:255',
                'yachtType' => 'required|string|max:255',
                'duration' => 'required|string|max:255',
                'location' => 'nullable|string|max:255',
                'offeredSalary' => 'required|string|max:255',
                'expirationDate' => 'nullable|date',
                'experience' => 'required|string|max:255',
                'gender' => 'required|string|max:255',
                'qualification' => 'required|string|max:255',
                'description' => 'required|string',
                'requirements' => 'required|string',
                'keyPoints' => 'required|string',
            ]);

            // Create a new job using the validated data
            $job = Jobs::create([
                'title' => $validatedData['title'],
                'companyName' => $validatedData['companyName'],
                'jobCategory' => $validatedData['jobCategory'],
                'designation' => $validatedData['designation'],
                'yachtSize' => $validatedData['yachtSize'],
                'yachtType' => $validatedData['yachtType'],
                'duration' => $validatedData['duration'],
                'location' => $validatedData['location'],
                'offeredSalary' => $validatedData['offeredSalary'],
                'expirationDate' => $validatedData['expirationDate'],
                'experience' => $validatedData['experience'],
                'gender' => $validatedData['gender'],
                'qualification' => $validatedData['qualification'],
                'description' => $validatedData['description'],
                'requirements' => $validatedData['requirements'],
                'keyPoints' => $validatedData['keyPoints'],
            ]);

            // Return a success response
            return response()->json([
                'message' => 'Job created successfully!',
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
    public function editJob(Request $request, $id)
    {
        try {
            // Validate the incoming request data
            $validatedData = $request->validate([
                'title' => 'required|string|max:255',
                'companyName' => 'required|string|max:255',
                'jobCategory' => 'required|string|max:255',
                'designation' => 'required|string|max:255',
                'yachtSize' => 'required|string|max:255',
                'yachtType' => 'required|string|max:255',
                'duration' => 'required|string|max:255',
                'location' => 'nullable|string|max:255',
                'offeredSalary' => 'required|string|max:255',
                'expirationDate' => 'nullable|date',
                'experience' => 'required|string|max:255',
                'gender' => 'required|string|max:255',
                'qualification' => 'required|string|max:255',
                'description' => 'required|string',
                'requirements' => 'required|string',
                'keyPoints' => 'required|string',
            ]);
            $job = Jobs::findOrFail($id);
            $job->update([
                'title' => $validatedData['title'],
                'companyName' => $validatedData['companyName'],
                'jobCategory' => $validatedData['jobCategory'],
                'designation' => $validatedData['designation'],
                'yachtSize' => $validatedData['yachtSize'],
                'yachtType' => $validatedData['yachtType'],
                'duration' => $validatedData['duration'],
                'location' => $validatedData['location'],
                'offeredSalary' => $validatedData['offeredSalary'],
                'expirationDate' => $validatedData['expirationDate'],
                'experience' => $validatedData['experience'],
                'gender' => $validatedData['gender'],
                'qualification' => $validatedData['qualification'],
                'description' => $validatedData['description'],
                'requirements' => $validatedData['requirements'],
                'keyPoints' => $validatedData['keyPoints'],
            ]);

            // Return a success response
            return response()->json([
                'message' => 'Job updated successfully!',
                'data' => $job
            ], 200); // Status code 200 for success

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
    public function deleteJob($id)
    {
        try {
            // Find the job by ID, if not found it will throw an exception
            $job = Jobs::findOrFail($id);

            // Delete the job
            $job->delete();

            // Return a success response
            return response()->json([
                'message' => 'Job deleted successfully!',
                'status' => 'success'
            ], 200); // 200 status code for success

        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            // Handle the case where the category is not found
            return response()->json([
                'message' => 'Job not found!',
                'status' => 'error'
            ], 404); // 404 status code for not found

        } catch (\Exception $e) {
            // Handle any other errors
            return response()->json([
                'message' => 'Something went wrong while deleting the job!',
                'error' => $e->getMessage(),
                'status' => 'error'
            ], 500); // 500 status code for server error
        }
    }
}
