<?php

namespace App\Http\Controllers;

use App\Models\Things;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class ThingsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index($id)
    {
        //
        return Things::where('status', 'active')->where('user_id', $id)->orderBy('updated_at', 'desc')->get();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'description' => ['required', 'string', 'max:255'],
            'id' => ['required'],
        ]);

        $things = Things::create([
            'name' => $request->name,
            'description' => $request->description,
            'user_id' => $request->id,
        ]);

        $things->save();

        return response()->json(['success' => true]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, $id)
    {
        $thing = Things::findOrFail($id);
        return response()->json(['data' => $thing]);
    }

    /**
     * Display the specified resource.
     */
    public function filter(Request $request, $filter)
    {
        return Things::where('status', $filter)->get();
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request)
    {
        $thing = Things::find($request->id);

        $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'description' => ['required', 'string', 'max:255'],
            'status' => ['string'],
        ]);

        $thing->name = $request->name;
        $thing->description = $request->description;
        $thing->status = $request->status;

        $thing->save();

        return response()->json(['stats' => true ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request)
    {
        $thing = Things::find($request->id);

        $thing->status = 'remove';
        $thing->save();

        return response()->json(['success' => true]);
    }
}
