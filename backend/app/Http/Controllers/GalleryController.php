<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Gallery;

class GalleryController extends Controller
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

    private function cleanImageUrls($gallery)
    {
        return $gallery->map(function ($item) {
            if (!empty($item->imageURL)) {
                // Replace old server URLs with localhost
                $item->imageURL = str_replace('http://192.168.18.79:8000', 'http://localhost:8000', $item->imageURL);
            }
            return $item;
        });
    }
    public function getAllGallery()
    {
        try {
            // Retrieve gallery and order by id in descending order
            $gallery = Gallery::orderBy('id', 'desc')->get();

            // Check if the gallery collection is empty
            if ($gallery->isEmpty()) {
                return response()->json([
                    'message' => 'No record found!',
                    'data' => []
                ], 200); // Status code 200 for no content
            }

            $cleanedGallery = $this->cleanImageUrls($gallery);
            return $this->cleanResponse(response()->json([
                'message' => 'Gallery retrieved successfully!',
                'data' => $cleanedGallery
            ], 201)); // Status code 201 for successful data retrieval

        } catch (\Exception $e) {
            // Handle any errors
            return response()->json([
                'message' => 'Something went wrong!',
                'error' => $e->getMessage()
            ], 500); // Status code 500 for server error
        }
    }
    public function addGallery(Request $request)
    {
        try {
            // Validate the incoming request data
            $validatedData = $request->validate([
                'imageUpload' => 'required|array',
                'imageUpload.*' => 'mimes:png,jpg,jpeg|max:10000',
            ]);

            $uploadedImages = [];

            // Check if images are uploaded and handle each file
            if ($validatedData['imageUpload']) {
                foreach ($validatedData['imageUpload'] as $file) {
                    $fileName = time() . '_' . $file->getClientOriginalName();
                    $destinationPath = public_path('assets/images/gallery');
                    $file->move($destinationPath, $fileName);
                    $imagePath = env('BASE_URL') . 'assets/images/gallery/' . $fileName;

                    // Create a new gallery record for each image
                    $gallery = Gallery::create([
                        'imageURL' => $imagePath,
                    ]);

                    // Add the gallery record to the response array
                    $uploadedImages[] = $gallery;
                }
            }

            // Return a success response
            return response()->json([
                'message' => 'Gallery added successfully!',
                'data' => $uploadedImages
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
    public function deleteGallery($id)
    {
        try {
            // Find the gallery by ID, if not found it will throw an exception
            $gallery = Gallery::findOrFail($id);

            // Delete the gallery
            $gallery->delete();

            // Return a success response
            return response()->json([
                'message' => 'Gallery deleted successfully!',
                'status' => 'success'
            ], 200); // 200 status code for success

        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            // Handle the case where the gallery is not found
            return response()->json([
                'message' => 'Gallery not found!',
                'status' => 'error'
            ], 404); // 404 status code for not found

        } catch (\Exception $e) {
            // Handle any other errors
            return response()->json([
                'message' => 'Something went wrong while deleting the gallery!',
                'error' => $e->getMessage(),
                'status' => 'error'
            ], 500); // 500 status code for server error
        }
    }
}
