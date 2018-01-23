<?php

namespace App\Http\Controllers;

use Auth;
use Illuminate\Http\Request;
use App\Http\Requests\VerifyLoginRequest;

class ApiAuthController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login']]);
    }

    /**
     * Verifies a login request and sets a Token cookie if credentials
     * were valid.
     * @throws JWTException
     * @return JsonResponse
     */
    public function login(VerifyLoginRequest $request)
    {
        // Check if already logged in
        $user = $this->guard()->user();
        if($user)
        {
            return response()->json();
        }
        
        // grab credentials from the request
        $credentials = $request->only('email', 'password');

        if($token = $this->guard()->attempt($credentials))
        {
            //return $this->respondWithToken($token);
            return $this->respondWithCookie($token);
        }
        return response()->json(['error' => 'Unauthorized'], 401);
    }

    /**
     * Get the authenticated User
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function me()
    {
        return response()->json($this->guard()->user());
    }

    public function verifyCookie()
    {
        return response()->json();
    }

    /**
     * Log the user out (Invalidate the token)
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout()
    {
        $this->guard()->logout();
        \Cookie::forget('token');

        return response()->json(['message' => 'Successfully logged out']);
    }

    /**
     * Refresh a token.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function refresh()
    {
        return $this->respondWithToken($this->guard()->refresh());
    }

    /**
     * Get the token array structure.
     *
     * @param  string $token
     *
     * @return \Illuminate\Http\JsonResponse
     */
    protected function respondWithToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => $this->guard()->factory()->getTTL() * 60
        ]);
    }

    protected function respondWithCookie($token)
    {
        $expires_in = $this->guard()->factory()->getTTL() * 60;
        return response()->json(
            [
                'user' => $this->guard()->user()
            ])->cookie('token', $token, $expires_in, 'localhost', true, true);
    }

    /**
     * Get the guard to be used during authentication.
     *
     * @return \Illuminate\Contracts\Auth\Guard
     */
    public function guard()
    {
        return Auth::guard();
    }
}
