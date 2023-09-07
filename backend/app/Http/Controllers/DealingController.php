<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreDealingRequest;
use App\Http\Requests\UpdateDealingRequest;
use App\Models\Dealing;

class DealingController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreDealingRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Dealing $dealing)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Dealing $dealing)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateDealingRequest $request, Dealing $dealing)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Dealing $dealing)
    {
        //
    }
}
