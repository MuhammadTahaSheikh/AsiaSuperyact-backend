<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CleanResponseMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $response = $next($request);
        
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
}
