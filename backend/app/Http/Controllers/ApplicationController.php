<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Application;
use Illuminate\Http\Request;

class ApplicationController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'offer_id' => 'required|exists:offers,id',
            'user_id' => 'required|exists:users,id',
            'resume_url' => 'required|string',
            'cover_letter' => 'nullable|string',
        ]);

        return Application::create($request->all());
    }

    public function index(Request $request)
    {
        if ($request->has('offer_id')) {
            return Application::with('user')->where('offer_id', $request->offer_id)->get();
        }

        if ($request->has('user_id')) {
            return Application::with('offer.company')->where('user_id', $request->user_id)->get();
        }

        return Application::with(['user', 'offer'])->get();
    }
}
