<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Category;

class CategoryController extends Controller
{
    public function getAllCategories()
    {
        try {
            // Retrieve products and order by id in descending order
            $categories = Category::orderBy('id', 'desc')->get();

            // Check if the products collection is empty
            if ($categories->isEmpty()) {
                return response()->json([
                    'message' => 'No record found!',
                    'data' => []
                ], 200); // Status code 200 for no content
            }

            return response()->json([
                'message' => 'Categories retrieved successfully!',
                'data' => $categories
            ], 201); // Status code 201 for successful data retrieval

        } catch (\Exception $e) {
            // Handle any errors
            return response()->json([
                'message' => 'Something went wrong!',
                'error' => $e->getMessage()
            ], 500); // Status code 500 for server error
        }
    }
    public function getCategoryByID($id)
    {
        try {
            // Retrieve the category
            $category = Category::find($id);

            // Check if the category exists
            if (!$category) {
                return response()->json([
                    'message' => 'Category not found!',
                    'data' => null
                ], 404); // Status code 404 for not found
            }

            // If the category is found
            return response()->json([
                'message' => 'Category retrieved successfully!',
                'data' => $category
            ], 200); // Status code 200 for successful retrieval

        } catch (\Exception $e) {
            // Handle any errors
            return response()->json([
                'message' => 'Something went wrong!',
                'error' => $e->getMessage()
            ], 500); // Status code 500 for server error
        }

    }
    public function addCategory(Request $request)
    {
        try {
            // Validate the incoming request data
            $validatedData = $request->validate([
                'title' => 'required|string|max:255',
                'description' => 'required|string',
                'imageUpload' => 'required|mimes:png,jpg,jpeg|max:10000',
            ]);

            $imagePath = null;

            // Check if an image is uploaded
            if ($request->hasFile('imageUpload')) {
                $file = $request->file('imageUpload');
                $fileName = time() . '_' . $file->getClientOriginalName();
                $destinationPath = public_path('assets/images/category');
                $file->move($destinationPath, $fileName);
                $imagePath = env('BASE_URL') . 'assets/images/category/' . $fileName;
            }

            // Create a new category using the validated data
            $category = Category::create([
                'title' => $validatedData['title'],
                'description' => $validatedData['description'],
                'imageURL' => $imagePath,
            ]);

            // Return a success response
            return response()->json([
                'message' => 'Category added successfully!',
                'data' => $category
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
    public function editCategory(Request $request, $id)
    {
        // return $request;
        try {
            // Validate the incoming request data
            $validatedData = $request->validate([
                'title' => 'required|string|max:255',
                'description' => 'required|string',
                'imageUpload' => 'required|mimes:png,jpg,jpeg|max:10000', // Allow null for image
            ]);

            $imagePath = null;

            // Check if an image is uploaded
            if ($request->hasFile('imageUpload')) {
                $file = $request->file('imageUpload');
                $fileName = time() . '_' . $file->getClientOriginalName();
                $destinationPath = public_path('assets/images/category');
                $file->move($destinationPath, $fileName);
                $imagePath = env('BASE_URL') . 'assets/images/category/' . $fileName;
            }

            $item = Category::findOrFail($id);
            $item->update([
                'title' => $validatedData['title'],
                'description' => $validatedData['description'],
                'imageURL' => $imagePath,
            ]);

            // Return a success response
            return response()->json([
                'message' => 'Category updated successfully!',
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
    public function deleteCategory($id)
    {
        try {
            // Find the category by ID, if not found it will throw an exception
            $category = Category::findOrFail($id);

            // Delete the category
            $category->delete();

            // Return a success response
            return response()->json([
                'message' => 'Category deleted successfully!',
                'status' => 'success'
            ], 200); // 200 status code for success

        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            // Handle the case where the category is not found
            return response()->json([
                'message' => 'Category not found!',
                'status' => 'error'
            ], 404); // 404 status code for not found

        } catch (\Exception $e) {
            // Handle any other errors
            return response()->json([
                'message' => 'Something went wrong while deleting the category!',
                'error' => $e->getMessage(),
                'status' => 'error'
            ], 500); // 500 status code for server error
        }
    }

}
