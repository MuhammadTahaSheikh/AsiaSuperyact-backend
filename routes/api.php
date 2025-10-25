<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ReachOutController;
use App\Http\Controllers\GalleryController;
use App\Http\Controllers\VideoController;
use App\Http\Controllers\ContactUsController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\JobsController;
// use App\Http\Controllers\JobCategoryController;
// use App\Http\Controllers\JobDesignationController;
use App\Http\Controllers\JobSubmissionController;
use App\Http\Controllers\RecruitingCrewController;

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
Route::get('/hot-products', [ProductController::class, 'getHotProducts']);
Route::post('/add-product', [ProductController::class, 'addProduct']);
Route::get('/product/{id}', [ProductController::class, 'getProductByID']);
Route::get('/product/category/{id}', [ProductController::class, 'getProductByCategoryID']);
Route::delete('/delete-product/{id}', [ProductController::class, 'deleteProduct']);
Route::post('/edit-product/{id}', [ProductController::class, 'editProduct']);

// Routes for Jobs

Route::get('/jobs', [JobsController::class, 'getAllJobs']);
Route::post('/add-job', [JobsController::class, 'addJob']);
Route::get('/job/{id}', [JobsController::class, 'getJobByID']);
Route::get('/jobs-search', [JobsController::class, 'getJobsBySearch']);
Route::delete('/delete-job/{id}', [JobsController::class, 'deleteJob']);
Route::post('/edit-job/{id}', [JobsController::class, 'editJob']);

// Routes for Job Category

// Route::get('/job-categories', [JobCategoryController::class, 'getAllJobCategories']);
// Route::post('/add-job-category', [JobCategoryController::class, 'addJobCategory']);
// Route::get('/job-category/{id}', [JobCategoryController::class, 'getJobCategoryByID']);
// Route::delete('/delete-job-category/{id}', [JobCategoryController::class, 'deleteJobCategory']);
// Route::post('/edit-job-category/{id}', [JobCategoryController::class, 'editJobCategory']);

// Routes for Job Designation

// Route::get('/job-designations', [JobDesignationController::class, 'getAllJobDesignations']);
// Route::post('/add-job-designation', [JobDesignationController::class, 'addJobDesignation']);
// Route::get('/job-designation/{id}', [JobDesignationController::class, 'getJobDesignationByID']);
// Route::delete('/delete-job-designation/{id}', [JobDesignationController::class, 'deleteJobDesignation']);
// Route::post('/edit-job-designation/{id}', [JobDesignationController::class, 'editJobDesignation']);

// Routes for Job Submission

Route::get('/job-submission', [JobSubmissionController::class, 'getAllJobSubmissions']);
Route::post('/add-job-submission', [JobSubmissionController::class, 'addJobSubmission']);
Route::get('/job-submission/{id}', [JobSubmissionController::class, 'getJobSubmissionByID']);
Route::delete('/delete-job-submission/{id}', [JobSubmissionController::class, 'deleteJobSubmission']);
Route::post('/edit-job-submission/{id}', [JobSubmissionController::class, 'editJobSubmission']);

// Routes for Recruiting Crew

Route::get('/crew', [RecruitingCrewController::class, 'getAllCrew']);
Route::post('/add-crew', [RecruitingCrewController::class, 'addCrew']);
Route::get('/crew/{id}', [RecruitingCrewController::class, 'getCrewByID']);
Route::delete('/delete-crew/{id}', [RecruitingCrewController::class, 'deleteCrew']);
Route::post('/edit-crew/{id}', [RecruitingCrewController::class, 'editCrew']);

// Routes for Contact Us form

Route::post('/contact-us', [ContactUsController::class, 'store']);
Route::get('/enquiries', [ContactUsController::class, 'getAllEnquiries']);
