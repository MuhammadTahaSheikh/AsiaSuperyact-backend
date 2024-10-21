<?php

namespace App\Http\Controllers;
use App\Models\ContactUs;

use Illuminate\Http\Request;

class ContactUsController extends Controller
{
    public function store(Request $request){
        $validatedData = $request->validate([
            'name' => 'required|string',
            'email' => 'required|email',
            'subject' => 'required|string',
            'enquiry' => 'required|string',
        ]);

        $resource = ContactUs::create($validatedData);

        return response()->json([
            'message' => 'Your enquiry is submitted successfully!',
            'data' => $resource
        ], 201);
    }

    public function getAllEnquiries(){
        $enquiries = ContactUs::all();
        return response()->json([
            'message' => 'Your enquiry is submitted successfully!',
            'data' => $enquiries
        ], 201);
    }
}
