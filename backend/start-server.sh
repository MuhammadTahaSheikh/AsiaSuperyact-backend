#!/bin/bash
cd /Users/muhammadtaha/Desktop/oldlaptop/AsiaSueryacht/backend
php -d error_reporting=0 -d display_errors=0 -d log_errors=0 artisan serve --host=127.0.0.1 --port=8000 2>&1 | grep -v "Deprecated" | grep -v "Warning"
