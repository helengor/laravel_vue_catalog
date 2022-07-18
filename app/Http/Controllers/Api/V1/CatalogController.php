<?php

namespace App\Http\Controllers\Api\V1;

use App\Events\FolderChange;
use App\Http\Controllers\Controller;
use App\Http\Requests\Catalog\CatalogStoreRequest;
use App\Http\Requests\Catalog\CatalogUpdateRequest;
use App\Http\Resources\Catalog\CatalogChildResource;
use App\Http\Resources\Catalog\CatalogResource;
use App\Models\Catalog;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;

class CatalogController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Catalog $catalog)
    {
        return  CatalogChildResource::collection($catalog->catalogRoot());
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(CatalogStoreRequest $request)
    {
        $id = Auth::id();
        $validated = $request->validated();
        $validated['user_id'] = $id;
        $created_catalog = Catalog::create($validated);

        event(new FolderChange($created_catalog, 'store'));
        return new CatalogChildResource($created_catalog);

    }

    /**
     * Display the specified resource
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Catalog $catalog)
    {
        return new CatalogResource($catalog);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(CatalogUpdateRequest $request, Catalog $catalog)
    {
        $catalog->update($request->validated());

        event(new FolderChange($catalog, 'update'));

        return new CatalogResource($catalog);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Catalog $catalog)
    {
        $catalog->delete();

        return response(null, Response::HTTP_NO_CONTENT);
    }
}
