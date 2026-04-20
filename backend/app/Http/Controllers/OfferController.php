<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Offer;
use Illuminate\Http\Request;

class OfferController extends Controller
{
    public function index(Request $request)
    {
        $query = Offer::with('company');

        if ($request->has('city')) {
            $query->where('city', $request->city);
        }

        if ($request->has('type')) {
            $query->where('type', $request->type);
        }

        if ($request->has('category')) {
            $query->where('category', $request->category);
        }

        return $query->latest()->get();
    }

    public function show($id)
    {
        return Offer::with('company')->findOrFail($id);
    }

    public function store(Request $request)
    {
        $request->validate([
            'company_id' => 'required|exists:companies,id',
            'title' => 'required|string',
            'description' => 'required|string',
            'type' => 'required|in:stage,job',
            'city' => 'required|string',
            'category' => 'required|string',
            'deadline' => 'required|date',
        ]);

        return Offer::create($request->all());
    }
}
