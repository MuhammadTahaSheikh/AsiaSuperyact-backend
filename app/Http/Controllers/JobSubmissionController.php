<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\JobSubmission;

class JobSubmissionController extends Controller
{
    public function getAllJobSubmissions()
    {
        try {
            // Retrieve job submission and order by id in descending order
            $jobs = JobSubmission::orderBy('id', 'desc')->get();

            // Check if the job submission collection is empty
            if ($jobs->isEmpty()) {
                return response()->json([
                    'message' => 'No record found!',
                    'data' => []
                ], 200); // Status code 200 for no content
            }

            return response()->json([
                'message' => 'Job submissions retrieved successfully!',
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
    public function getJobSubmissionByID($id)
    {
        try {
            // Retrieve the job submission
            $job = JobSubmission::find($id);

            // Check if the job submission exists
            if (!$job) {
                return response()->json([
                    'message' => 'Job submission not found!',
                    'data' => null
                ], 404); // Status code 404 for not found
            }

            // If the product is found
            return response()->json([
                'message' => 'Job submissions retrieved successfully!',
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
    public function addJobSubmission(Request $request)
    {
        try {
            // Validate the incoming request data
            $validatedData = $request->validate([
                'name' => 'required|string|max:255',
                'email' => 'required|string|max:255',
                'phone' => 'required|string|max:255',
                'resumeUpload' => 'required|mimes:pdf,doc,docx|max:10000',
            ]);

            // Handle file upload
            if ($request->hasFile('resumeUpload')) {
                // Get the uploaded file
                $file = $request->file('resumeUpload');

                // Generate a unique file name to avoid collisions
                $fileName = time() . '_' . $file->getClientOriginalName();

                // Define the destination path
                $filePath = public_path("assets/resume");

                // Move the file to the destination folder
                $file->move($filePath, $fileName);

                // Construct the URL path for the file
                $urlPath = env('BASE_URL') . "assets/resume/" . $fileName;

                // Ensure the field name 'resumeURL' matches your database
                $job = JobSubmission::create([
                    'name' => $validatedData['name'],
                    'email' => $validatedData['email'],
                    'phone' => $validatedData['phone'],
                    'resumeURL' => $urlPath,  // Updated to match the field name in your database
                ]);

                // Return a success response
                return response()->json([
                    'message' => 'Job submission created successfully!',
                    'data' => $job
                ], 201); // Status code 201 for created
            } else {
                // If no file is uploaded, return an error response
                return response()->json([
                    'message' => 'File not uploaded!'
                ], 400); // Status code 400 for bad request
            }

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
    public function editJobSubmission(Request $request, $id)
    {
        try {
            // Validate the incoming request data
            $validatedData = $request->validate([
                'name' => 'required|string|max:255',
                'email' => 'required|string|max:255',
                'phone' => 'required|string|max:255',
                'resumeUpload' => 'nullable|mimes:pdf,doc,docx|max:10000', // Made file upload optional
            ]);

            // Find the job submission by ID
            $job = JobSubmission::findOrFail($id);

            // Handle file upload if a new file is provided
            if ($request->hasFile('resumeUpload')) {
                // Get the uploaded file
                $file = $request->file('resumeUpload');

                // Generate a unique file name to avoid collisions
                $fileName = time() . '_' . $file->getClientOriginalName();

                // Define the destination path
                $filePath = public_path("assets/resume");

                // Move the file to the destination folder
                $file->move($filePath, $fileName);

                // Construct the URL path for the file
                $urlPath = env('BASE_URL') . "/assets/resume/" . $fileName;

                // Update the file path in the database
                $job->resumeURL = $urlPath;
            }

            // Update other fields
            $job->name = $validatedData['name'];
            $job->email = $validatedData['email'];
            $job->phone = $validatedData['phone'];

            // Save the updated job submission
            $job->save();

            // Return a success response
            return response()->json([
                'message' => 'Job submission updated successfully!',
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
    public function deleteJobSubmission($id)
    {
        try {
            // Find the job submission by ID, if not found it will throw an exception
            $job = JobSubmission::findOrFail($id);

            // Delete the job submission
            $job->delete();

            // Return a success response
            return response()->json([
                'message' => 'Job submission deleted successfully!',
                'status' => 'success'
            ], 200); // 200 status code for success

        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            // Handle the case where the category is not found
            return response()->json([
                'message' => 'Job submission not found!',
                'status' => 'error'
            ], 404); // 404 status code for not found

        } catch (\Exception $e) {
            // Handle any other errors
            return response()->json([
                'message' => 'Something went wrong while deleting the job submission!',
                'error' => $e->getMessage(),
                'status' => 'error'
            ], 500); // 500 status code for server error
        }
    }
}
