<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Video;

class VideoController extends Controller
{
    public function getAllVideos()
    {
        try {
            // Retrieve video and order by id in descending order
            $video = Video::orderBy('id', 'desc')->get();

            // Check if the video collection is empty
            if ($video->isEmpty()) {
                return response()->json([
                    'message' => 'No record found!',
                    'data' => []
                ], 200); // Status code 200 for no content
            }

            return response()->json([
                'message' => 'Videos retrieved successfully!',
                'data' => $video
            ], 201); // Status code 201 for successful data retrieval

        } catch (\Exception $e) {
            // Handle any errors
            return response()->json([
                'message' => 'Something went wrong!',
                'error' => $e->getMessage()
            ], 500); // Status code 500 for server error
        }
    }
    public function addVideo(Request $request)
    {
        try {
            // Validate the incoming request data
            $validatedData = $request->validate([
                'imageUpload' => 'required|mimes:png,jpg,jpeg|max:10000',
                'videoUpload' => 'required|mimes:mp4,mov,ogg,qt|max:50000', // Correct video MIME types
            ]);

            $imagePath = null;
            $videoPath = null;

            // Check if an image is uploaded
            if ($validatedData['imageUpload']) {
                $file = $validatedData['imageUpload'];
                $fileName = time() . '_' . $file->getClientOriginalName();
                $destinationPath = public_path('assets/images/videos/thumbnail');
                $file->move($destinationPath, $fileName);
                $imagePath = env('BASE_URL') . 'assets/images/videos/thumbnail/' . $fileName;
            }

            // Check if a video is uploaded
            if ($validatedData['videoUpload']) {
                $file = $validatedData['videoUpload']; // Get the uploaded video file
                $fileName = time() . '_' . $file->getClientOriginalName(); // Generate a unique file name
                $destinationPath = public_path('assets/videos'); // Define destination path for storing the file
                $file->move($destinationPath, $fileName); // Move the uploaded video to the destination
                $videoPath = env('BASE_URL') . 'assets/videos/' . $fileName; // Construct the video URL path
            }

            // Create a new video using the validated data
            $video = Video::create([
                'thumbnail' => $imagePath, // Store the image path in the database
                'videoURL' => $videoPath, // Store the video path in the database
            ]);

            // Return a success response
            return response()->json([
                'message' => 'Video added successfully!',
                'data' => $video
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

    public function deleteVideo($id)
    {
        try {
            // Find the video by ID, if not found it will throw an exception
            $video = Video::findOrFail($id);

            // Delete the video
            $video->delete();

            // Return a success response
            return response()->json([
                'message' => 'Video deleted successfully!',
                'status' => 'success'
            ], 200); // 200 status code for success

        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            // Handle the case where the video is not found
            return response()->json([
                'message' => 'Video not found!',
                'status' => 'error'
            ], 404); // 404 status code for not found

        } catch (\Exception $e) {
            // Handle any other errors
            return response()->json([
                'message' => 'Something went wrong while deleting the video!',
                'error' => $e->getMessage(),
                'status' => 'error'
            ], 500); // 500 status code for server error
        }
    }
}
