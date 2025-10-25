<?php

namespace App\Http\Controllers;
use App\Models\ContactUs;

use Illuminate\Http\Request;

class ContactUsController extends Controller
{
    public function store(Request $request)
    {
        try {
            $validatedData = $request->validate([
                'name' => 'required|string',
                'email' => 'required|email',
                'phone' => 'nullable|string',
                'subject' => 'nullable|string',
                'enquiry' => 'required|string',
            ]);

            $resource = ContactUs::create($validatedData);

            return response()->json([
                'message' => 'Your enquiry is submitted successfully!',
                'data' => $resource
            ], 201);
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

    public function getAllEnquiries()
    {
        try {
            $enquiries = ContactUs::orderBy('id', 'desc')->get();

            if ($enquiries->isEmpty()) {
                return response()->json([
                    'message' => 'No record found!',
                    'data' => []
                ], 200); // Status code 200 for no content
            }

            return response()->json([
                'message' => 'Enquiries found successfully!',
                'data' => $enquiries
            ], 201); // Status code 201 for successful data retrieval

        } catch (\Exception $e) {
            // Handle any errors
            return response()->json([
                'message' => 'Something went wrong!',
                'error' => $e->getMessage()
            ], 500); // Status code 500 for server error
        }
    }
}
