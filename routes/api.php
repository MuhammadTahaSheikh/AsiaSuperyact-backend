<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ReachOutController;
use App\Http\Controllers\GalleryController;
use App\Http\Controllers\VideoController;
use App\Http\Controllers\ContactUsController;
use App\Http\Controllers\ProductController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Routes for Category

Route::get('/categories', [CategoryController::class, 'getAllCategories']);
Route::post('/add-category', [CategoryController::class, 'addCategory']);
Route::get('/category/{id}', [CategoryController::class, 'getCategoryByID']);
Route::delete('/delete-category/{id}', [CategoryController::class, 'deleteCategory']);
Route::post('/edit-category/{id}', [CategoryController::class, 'editCategory']);

// Routes for Reach Out

Route::get('/reach-out', [ReachOutController::class, 'getAllReachOut']);
Route::post('/add-reach-out', [ReachOutController::class, 'addReachOut']);
Route::get('/reach-out/{id}', [ReachOutController::class, 'getReachOutByID']);
Route::delete('/delete-reach-out/{id}', [ReachOutController::class, 'deleteReachOut']);
Route::put('/edit-reach-out/{id}', [ReachOutController::class, 'editReachOut']);

// Routes for Gallery

Route::get('/gallery', [GalleryController::class, 'getAllGallery']);
Route::post('/add-gallery', [GalleryController::class, 'addGallery']);
Route::delete('/delete-gallery/{id}', [GalleryController::class, 'deleteGallery']);

// Routes for Video

Route::get('/videos', [VideoController::class, 'getAllVideos']);
Route::post('/add-video', [VideoController::class, 'addVideo']);
Route::delete('/delete-video/{id}', [VideoController::class, 'deleteVideo']);

// Routes for Products

Route::get('/products', [ProductController::class, 'getAllProducts']);
Route::post('/add-product', [ProductController::class, 'addProduct']);
Route::get('/product/{id}', [ProductController::class, 'getProductByID']);
Route::get('/product/category/{id}', [ProductController::class, 'getProductByCategoryID']);
Route::delete('/delete-product/{id}', [ProductController::class, 'deleteProduct']);
Route::post('/edit-product/{id}', [ProductController::class, 'editProduct']);

// Routes for Contact Us form

Route::post('/contact-us', [ContactUsController::class, 'store']);
Route::get('/enquiries', [ContactUsController::class, 'getAllEnquiries']);
