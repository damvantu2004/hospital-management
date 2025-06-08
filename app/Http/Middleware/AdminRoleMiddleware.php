<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class AdminRoleMiddleware
{
    /**
     * Xử lý request, chỉ cho phép admin truy cập.
     */

    public function handle(Request $request, Closure $next) // Closure là một hàm callback, next là một hàm callback được truyền vào middleware để xử lý request tiếp theo
    {
        if (!$request->user() || $request->user()->role !== 'admin') {
            return response()->json([
                'status' => 'error',
                'message' => 'Bạn không có quyền truy cập chức năng này!',
                'code' => 'INSUFFICIENT_PRIVILEGES'
            ], 403);
        }
        return $next($request);
    }
}