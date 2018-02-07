<?php

namespace App\Http\Controllers;

use Cookie;
use JWTAuth;
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
        // grab credentials from the request
        $credentials = $request->only('email', 'password');

        if($token = auth()->attempt($credentials))
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
        return $this->respondWithCookie(auth()->refresh());
        //return response()->json([ 'user' => auth()->user() ]);
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
    public function logout(Request $request)
    {
        $res = auth()->logout(true);

        return response()->json([
            'message' => 'Successfully logged out'
        ]);
    }

    /**
     * Refresh a token.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function refresh()
    {
        return $this->respondWithToken(auth()->refresh());
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
            'expires_in' => auth()->factory()->getTTL() * 60
        ]);
    }

    protected function respondWithCookie($token)
    {
        $user = auth()->userOrFail();

        $config = config('session');
        $expires_in = auth()->factory()->getTTL() * 60;
        return response()->json( compact('user') )->cookie(
                'token', 
                $token, 
                $expires_in,
                $config['path'], 
                $config['domain'], 
                $config['secure']
            );
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
