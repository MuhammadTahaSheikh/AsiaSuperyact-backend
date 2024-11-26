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
            // Transform jobs data to match the desired format
            $formattedJobs = $jobs->map(function ($job) {
                return [
                    'id' => $job->id,
                    'title' => $job->title,
                    'companyName' => $job->companyName,
                    'designation' => $job->designation,
                    'info' => [
                        $job->duration ?: 'No duration provided',
                        $job->qualification ? "Qualifications: " . $job->qualification : 'No qualification provided',
                        $job->experience ? "Experience: " . $job->experience . " Year(s)" : 'No experience provided',
                        $job->yachtSize ? "YachtSize: " . $job->yachtSize : 'No yacht size provided',
                    ],
                    'yachtType' => $job->yachtType,
                    'location' => $job->location,
                    'offeredSalary' => $job->offeredSalary,
                    'expirationDate' => $job->expirationDate,
                    'gender' => $job->gender,
                    'description' => $job->description,
                    'requirements' => $job->requirements,
                    'created_at' => $job->created_at,
                    'updated_at' => $job->updated_at
                ];
            });
            return response()->json([
                'message' => 'Jobs retrieved successfully!',
                'data' => $formattedJobs
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
            // Retrieve the job by ID
            $job = Jobs::find($id);

            // Check if the job exists
            if (!$job) {
                return response()->json([
                    'message' => 'Job not found!',
                    'data' => null
                ], 404); // Status code 404 for not found
            }

            // Format job data to match the desired structure
            $formattedJob = [
                'id' => $job->id,
                'title' => $job->title,
                'companyName' => $job->companyName,
                'designation' => $job->designation,
                'info' => [
                    $job->duration ?: 'No duration provided',
                    $job->qualification ? "Qualifications: " . $job->qualification : 'No qualification provided',
                    $job->experience ? "Experience: " . $job->experience . " Year(s)" : 'No experience provided',
                    $job->yachtSize ? "YachtSize: " . $job->yachtSize : 'No yacht size provided',
                ],
                'yachtType' => $job->yachtType,
                'location' => $job->location,
                'offeredSalary' => $job->offeredSalary,
                'expirationDate' => $job->expirationDate,
                'gender' => $job->gender,
                'description' => $job->description,
                'requirements' => $job->requirements,
                'created_at' => $job->created_at,
                'updated_at' => $job->updated_at
            ];

            return response()->json([
                'message' => 'Job retrieved successfully!',
                'data' => $formattedJob
            ], 200); // Status code 200 for successful data retrieval

        } catch (\Exception $e) {
            // Handle any errors without exposing sensitive details in production
            return response()->json([
                'message' => 'Something went wrong!',
                'error' => config('app.debug') ? $e->getMessage() : 'Please try again later.'
            ], 500); // Status code 500 for server error
        }
    }
    public function getJobsBySearch(Request $request)
    {
        try {
            // Retrieve the query parameters
            $designation = $request->query('designation');
            $yachtSize = $request->query('yacht_size');
            $yachtType = $request->query('yacht_type');
            $gender = $request->query('gender');

            // Start the query builder for Jobs
            $jobsQuery = Jobs::query();

            // Apply filters if they are provided
            if ($designation) {
                $jobsQuery->where('designation', $designation);
            }

            if ($yachtSize) {
                $jobsQuery->where('yachtSize', $yachtSize);
            }

            if ($yachtType) {
                $jobsQuery->where('yachtType', $yachtType);
            }

            if ($gender) {
                $jobsQuery->where('gender', $gender);
            }

            // Get the filtered results
            $jobs = $jobsQuery->get();

            // Transform jobs data to match the desired format
            $formattedJobs = $jobs->map(function ($job) {
                return [
                    'id' => $job->id,
                    'title' => $job->title,
                    'location' => $job->location,
                    'info' => [
                        $job->duration ? $job->duration : 'No duration provided',
                        $job->qualification ? "Qualifications: " . $job->qualification : 'No qualification provided',
                        $job->experience ? "Experience: " . $job->experience . " Year(s)" : 'No experience provided',
                        $job->yachtSize ? "YachtSize: " . $job->yachtSize : 'No yacht size provided',
                    ]
                ];
            });

            // Check if any jobs were found
            if ($formattedJobs->isEmpty()) {
                return response()->json([
                    'message' => 'No jobs found matching the criteria.',
                    'data' => []
                ], 404); // Status code 404 for not found
            }

            // If jobs are found, return them
            return response()->json([
                'message' => 'Jobs retrieved successfully!',
                'data' => $formattedJobs
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
                // 'jobCategory' => 'nullable|string|max:255',
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
            ]);

            // Create a new job using the validated data
            $job = Jobs::create([
                'title' => $validatedData['title'],
                'companyName' => $validatedData['companyName'],
                // 'jobCategory' => $validatedData['jobCategory'],
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
                // 'jobCategory' => 'required|string|max:255',
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
            ]);
            $job = Jobs::findOrFail($id);
            $job->update([
                'title' => $validatedData['title'],
                'companyName' => $validatedData['companyName'],
                // 'jobCategory' => $validatedData['jobCategory'],
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
