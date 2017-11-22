<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;

class ApiAuthController extends Controller
{
    public function login(Request $request)
    {
        // grab credentials from the request
        $credentials = $request->only('email', 'password');

        try {
            // attempt to verify the credentials and create a token for the user
            if (! $token = JWTAuth::attempt($credentials)) {
                return response()->json(['error' => 'invalid_credentials'], 401);
            }
        } catch (JWTException $e) {
            // something went wrong whilst attempting to encode the token
            return response()->json(['error' => 'could_not_create_token'], 500);
        }
        
        $user = JWTAuth::toUser($token);
        // all good so return the token
        return response()->json([ "token" => $token, "user" => $user ]);
    }

    public function authUserToken(Request $request)
    {
        try 
        {     
            if (! $user = JWTAuth::parseToken()->authenticate()) {
                return response()->json(['user_not_found'], 404);
            }
            // Refresh token
            $newToken =  JWTAuth::parseToken()->refresh();
        } 
        catch (Tymon\JWTAuth\Exceptions\TokenExpiredException $e) 
        {
            return response()->json(['token_expired'], $e->getStatusCode());
        } 
        catch (Tymon\JWTAuth\Exceptions\TokenInvalidException $e) 
        {
            return response()->json(['token_invalid'], $e->getStatusCode());
        } 
        catch (Tymon\JWTAuth\Exceptions\JWTException $e) 
        {
            return response()->json(['token_absent'], $e->getStatusCode());
        }
        
        //$response->headers->set('Authorization', 'Bearer '.$newToken);
    
        // the token is valid and we have found the user via the sub claim
        // send the refreshed token back for update
        return response()->json(compact('user', 'newToken'));
    }
}