<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;

class ProductController extends Controller
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

    private function cleanImageUrls($products)
    {
        return $products->map(function ($product) {
            if (!empty($product->imageURL)) {
                // Split the comma-separated URLs and clean each one
                $urls = explode(',', $product->imageURL);
                $cleanedUrls = array_map(function ($url) {
                    $url = trim($url);
                    // If URL starts with http://192.168.18.79:8000, replace with localhost
                    if (strpos($url, 'http://192.168.18.79:8000') === 0) {
                        return str_replace('http://192.168.18.79:8000', 'http://localhost:8000', $url);
                    }
                    // If URL is a relative path (starts with assets/), prepend localhost
                    if (strpos($url, 'assets/') === 0) {
                        return 'http://localhost:8000/' . $url;
                    }
                    return $url;
                }, $urls);
                $product->imageURL = implode(',', $cleanedUrls);
            }
            return $product;
        });
    }
    public function getAllProducts()
    {
        try {
            // Retrieve products and order by id in descending order
            $products = Product::orderBy('id', 'desc')->get();

            // Check if the products collection is empty
            if ($products->isEmpty()) {
                return response()->json([
                    'message' => 'No record found!',
                    'data' => []
                ], 200); // Status code 200 for no content
            }

            $cleanedProducts = $this->cleanImageUrls($products);
            return $this->cleanResponse(response()->json([
                'message' => 'Products retrieved successfully!',
                'data' => $cleanedProducts
            ], 201)); // Status code 201 for successful data retrieval

        } catch (\Exception $e) {
            // Handle any errors
            return response()->json([
                'message' => 'Something went wrong!',
                'error' => $e->getMessage()
            ], 500); // Status code 500 for server error
        }
    }
    public function getHotProducts()
    {
        try {
            // Retrieve specific products: Prod1 (ID: 10), Prod2 (ID: 11), Prod3 (ID: 12)
            $products = Product::whereIn('id', [10, 11, 12])->orderBy('id', 'desc')->get();

            // Check if the products collection is empty
            if ($products->isEmpty()) {
                return response()->json([
                    'message' => 'No record found!',
                    'data' => []
                ], 200); // Status code 200 for no content
            }

            $cleanedProducts = $this->cleanImageUrls($products);
            return $this->cleanResponse(response()->json([
                'message' => 'Hot products retrieved successfully!',
                'data' => $cleanedProducts
            ], 201)); // Status code 201 for successful data retrieval

        } catch (\Exception $e) {
            // Handle any errors
            return response()->json([
                'message' => 'Something went wrong!',
                'error' => $e->getMessage()
            ], 500); // Status code 500 for server error
        }
    }
    public function getProductByID($id)
    {
        try {
            // Retrieve the product
            $product = Product::find($id);

            // Check if the product exists
            if (!$product) {
                return response()->json([
                    'message' => 'Product not found!',
                    'data' => null
                ], 404); // Status code 404 for not found
            }

            // If the product is found, clean the image URLs
            $cleanedProduct = $this->cleanImageUrls(collect([$product]))->first();
            return $this->cleanResponse(response()->json([
                'message' => 'Product retrieved successfully!',
                'data' => $cleanedProduct
            ], 200)); // Status code 200 for successful retrieval

        } catch (\Exception $e) {
            // Handle any errors
            return response()->json([
                'message' => 'Something went wrong!',
                'error' => $e->getMessage()
            ], 500); // Status code 500 for server error
        }

    }
    public function getProductByCategoryID($id)
    {
        try {
            // Retrieve the product bu category id
            $product = Product::where('categoryID', $id)->orderBy('created_at', 'desc')->get();

            // Check if the product exists
            if (!$product) {
                return response()->json([
                    'message' => 'Product not found!',
                    'data' => null
                ], 404); // Status code 404 for not found
            }

            // If the product is found
            return response()->json([
                'message' => 'Product retrieved successfully!',
                'data' => $product
            ], 200); // Status code 200 for successful retrieval

        } catch (\Exception $e) {
            // Handle any errors
            return response()->json([
                'message' => 'Something went wrong!',
                'error' => $e->getMessage()
            ], 500); // Status code 500 for server error
        }

    }
    public function addProduct(Request $request)
    {
        try {
            // Validate the incoming request data
            $validatedData = $request->validate([
                'title' => 'required|string|max:255',
                'categoryID' => 'required|exists:categories,id', // Ensure category exists
                'displayedDescription' => 'required|string',
                'exteriorDesignDescription' => 'nullable|string',
                'amenitiesDescription' => 'nullable|string',
                'interiorDesignDescription' => 'nullable|string',
                'toysAndTendersDescription' => 'nullable|string',
                'imageUpload' => 'required|array',
                'imageUpload.*' => 'mimes:png,jpg,jpeg|max:10000', 

                // 'price' => 'required|integer',
                // 'capacity' => 'required|integer',
                // 'pictureSpots' => 'nullable|integer',
                // 'bedrooms' => 'required|integer',
                // 'repairDate' => 'nullable|date',
                // 'ratioOfSpace' => 'nullable|numeric|regex:/^\d{1,6}(\.\d{1,2})?$/',
                // 'perk' => 'nullable|string|max:255',

                'price' => 'required|integer',
                'guests' => 'required|integer',
                'cabins' => 'required|integer',
                'crew' => 'nullable|integer',
                'year' => 'required|integer',

                'length' => 'nullable|string|max:255',
                'beam' => 'nullable|string|max:255',
                'draft' => 'nullable|string|max:255',
                'cruisingSpeed' => 'nullable|string|max:255',
                'builder' => 'nullable|string|max:255',
                'navalArchitect' => 'nullable|string|max:255',
                'exteriorDesigner' => 'nullable|string|max:255',
                'interiorDesigner' => 'nullable|string|max:255',
                'hullMaterial' => 'nullable|string|max:255',
                'superstructureMaterial' => 'nullable|string|max:255',
                'grossTonnage' => 'nullable|integer',
                'deckMaterial' => 'nullable|string|max:255',
                'hotProduct' => 'boolean',
            ]);

            // Handle the image upload if provided
            $imagePaths = [];
            if ($request->hasFile('imageUpload')) {
                foreach ($request->file('imageUpload') as $file) {
                    $fileName = time() . '_' . $file->getClientOriginalName();
                    $destinationPath = public_path('assets/images/product');
                    $file->move($destinationPath, $fileName);
                    $imagePaths[] = env('BASE_URL') . 'assets/images/product/' . $fileName;
                }
            }

            // Join the image paths into a comma-separated string
            $imagePathsString = implode(',', $imagePaths);

            // Create a new product using the validated data
            $product = Product::create([
                'title' => $validatedData['title'],
                'categoryID' => $validatedData['categoryID'],
                'displayedDescription' => $validatedData['displayedDescription'],
                'exteriorDesignDescription' => $validatedData['exteriorDesignDescription'],
                'amenitiesDescription' => $validatedData['amenitiesDescription'],
                'interiorDesignDescription' => $validatedData['interiorDesignDescription'],
                'toysAndTendersDescription' => $validatedData['toysAndTendersDescription'],
                'imageURL' => $imagePathsString, 

                // 'price' => $validatedData['price'],
                // 'capacity' => $validatedData['capacity'],
                // 'pictureSpots' => $validatedData['pictureSpots'],
                // 'bedrooms' => $validatedData['bedrooms'],
                // 'repairDate' => $validatedData['repairDate'],
                // 'ratioOfSpace' => $validatedData['ratioOfSpace'],
                // 'perk' => $validatedData['perk'],

                'price' => $validatedData['price'],
                'guests' => $validatedData['guests'],
                'cabins' => $validatedData['cabins'],
                'crew' => $validatedData['crew'],
                'year' => $validatedData['year'],

                'length' => $validatedData['length'],
                'beam' => $validatedData['beam'],
                'draft' => $validatedData['draft'],
                'cruisingSpeed' => $validatedData['cruisingSpeed'],
                'builder' => $validatedData['builder'],
                'navalArchitect' => $validatedData['navalArchitect'],
                'exteriorDesigner' => $validatedData['exteriorDesigner'],
                'interiorDesigner' => $validatedData['interiorDesigner'],
                'hullMaterial' => $validatedData['hullMaterial'],
                'superstructureMaterial' => $validatedData['superstructureMaterial'],
                'grossTonnage' => $validatedData['grossTonnage'],
                'deckMaterial' => $validatedData['deckMaterial'],
                'hotProduct' => $validatedData['hotProduct'],
            ]);

            // Return a success response
            return response()->json([
                'message' => 'Product created successfully!',
                'data' => $product
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
    public function editProduct(Request $request, $id)
    {
        try {
            // Validate the incoming request data
            $validatedData = $request->validate([
                'title' => 'required|string|max:255',
                'categoryID' => 'required|exists:categories,id', // Ensure category exists
                'displayedDescription' => 'required|string',
                'exteriorDesignDescription' => 'nullable|string',
                'amenitiesDescription' => 'nullable|string',
                'interiorDesignDescription' => 'nullable|string',
                'toysAndTendersDescription' => 'nullable|string',
                'imageUpload' => 'required|array',
                'imageUpload.*' => 'mimes:png,jpg,jpeg|max:10000', 

                // 'price' => 'required|integer',
                // 'capacity' => 'required|integer',
                // 'pictureSpots' => 'nullable|integer',
                // 'bedrooms' => 'required|integer',
                // 'repairDate' => 'nullable|date',
                // 'ratioOfSpace' => 'nullable|numeric|regex:/^\d{1,6}(\.\d{1,2})?$/',
                // 'perk' => 'nullable|string|max:255',

                'price' => 'required|integer',
                'guests' => 'required|integer',
                'cabins' => 'required|integer',
                'crew' => 'required|integer',
                'year' => 'required|integer',

                'length' => 'nullable|string|max:255',
                'beam' => 'nullable|string|max:255',
                'draft' => 'nullable|string|max:255',
                'cruisingSpeed' => 'nullable|string|max:255',
                'builder' => 'nullable|string|max:255',
                'navalArchitect' => 'nullable|string|max:255',
                'exteriorDesigner' => 'nullable|string|max:255',
                'interiorDesigner' => 'nullable|string|max:255',
                'hullMaterial' => 'nullable|string|max:255',
                'superstructureMaterial' => 'nullable|string|max:255',
                'grossTonnage' => 'nullable|integer',
                'deckMaterial' => 'nullable|string|max:255',
                'hotProduct' => 'boolean',
            ]);


            // Handle the image upload if provided
            $imagePaths = [];
            if ($request->hasFile('imageUpload')) {
                foreach ($request->file('imageUpload') as $file) {
                    $fileName = time() . '_' . $file->getClientOriginalName();
                    $destinationPath = public_path('assets/images/product');
                    $file->move($destinationPath, $fileName);
                    $imagePaths[] = env('BASE_URL') . 'assets/images/product/' . $fileName;
                }
            }

            // Join the image paths into a comma-separated string
            $imagePathsString = implode(',', $imagePaths);

            $product = Product::findOrFail($id);
            $product->update([
                'title' => $validatedData['title'],
                'categoryID' => $validatedData['categoryID'],
                'displayedDescription' => $validatedData['displayedDescription'],
                'exteriorDesignDescription' => $validatedData['exteriorDesignDescription'],
                'amenitiesDescription' => $validatedData['amenitiesDescription'],
                'interiorDesignDescription' => $validatedData['interiorDesignDescription'],
                'toysAndTendersDescription' => $validatedData['toysAndTendersDescription'],
                'imageURL' => $imagePathsString, 

                // 'price' => $validatedData['price'],
                // 'capacity' => $validatedData['capacity'],
                // 'pictureSpots' => $validatedData['pictureSpots'],
                // 'bedrooms' => $validatedData['bedrooms'],
                // 'repairDate' => $validatedData['repairDate'],
                // 'ratioOfSpace' => $validatedData['ratioOfSpace'],
                // 'perk' => $validatedData['perk'],

                'price' => $validatedData['price'],
                'guests' => $validatedData['guests'],
                'cabins' => $validatedData['cabins'],
                'crew' => $validatedData['crew'],
                'year' => $validatedData['year'],

                'length' => $validatedData['length'],
                'beam' => $validatedData['beam'],
                'draft' => $validatedData['draft'],
                'cruisingSpeed' => $validatedData['cruisingSpeed'],
                'builder' => $validatedData['builder'],
                'navalArchitect' => $validatedData['navalArchitect'],
                'exteriorDesigner' => $validatedData['exteriorDesigner'],
                'interiorDesigner' => $validatedData['interiorDesigner'],
                'hullMaterial' => $validatedData['hullMaterial'],
                'superstructureMaterial' => $validatedData['superstructureMaterial'],
                'grossTonnage' => $validatedData['grossTonnage'],
                'deckMaterial' => $validatedData['deckMaterial'],
                'hotProduct' => $validatedData['hotProduct'],
            ]);

            // Return a success response
            return response()->json([
                'message' => 'Product updated successfully!',
                'data' => $product
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
    public function deleteProduct($id)
    {
        try {
            // Find the product by ID, if not found it will throw an exception
            $product = Product::findOrFail($id);

            // Delete the product
            $product->delete();

            // Return a success response
            return response()->json([
                'message' => 'Product deleted successfully!',
                'status' => 'success'
            ], 200); // 200 status code for success

        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            // Handle the case where the category is not found
            return response()->json([
                'message' => 'Product not found!',
                'status' => 'error'
            ], 404); // 404 status code for not found

        } catch (\Exception $e) {
            // Handle any other errors
            return response()->json([
                'message' => 'Something went wrong while deleting the product!',
                'error' => $e->getMessage(),
                'status' => 'error'
            ], 500); // 500 status code for server error
        }
    }

    // Method for yacht-for-sale-products (returns all products for now)
    public function getYachtForSaleProducts()
    {
        try {
            $products = Product::orderBy('id', 'desc')->get();

            if ($products->isEmpty()) {
                return response()->json([
                    'message' => 'No yacht for sale products found!',
                    'data' => []
                ], 200);
            }

            $cleanedProducts = $this->cleanImageUrls($products);
            return $this->cleanResponse(response()->json([
                'message' => 'Yacht for sale products retrieved successfully!',
                'data' => $cleanedProducts
            ], 200));

        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Something went wrong!',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    // Method for charter-yachts-products (returns all products for now)
    public function getCharterYachtsProducts()
    {
        try {
            $products = Product::orderBy('id', 'desc')->get();

            if ($products->isEmpty()) {
                return response()->json([
                    'message' => 'No charter yacht products found!',
                    'data' => []
                ], 200);
            }

            $cleanedProducts = $this->cleanImageUrls($products);
            return $this->cleanResponse(response()->json([
                'message' => 'Charter yacht products retrieved successfully!',
                'data' => $cleanedProducts
            ], 200));

        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Something went wrong!',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
