<?php

namespace App\Http\Resources\Catalog;

use App\Http\Resources\DocumentResource;
use App\Http\Resources\UserResource;
use Illuminate\Http\Resources\Json\JsonResource;

class CatalogResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        $created_date = new \DateTime($this->created_at);
        $updated_date = new \DateTime($this->updated_at);

        return [
            'id' => $this->id,
            'parent_id' => $this->parent_id,
            'name' => $this->name,
            'created' => $created_date->format('Y-m-d H:i'),
            'updated' => $updated_date->format('Y-m-d H:i'),
            'user' => new UserResource($this->user),
            'documents' => DocumentResource::collection($this->documents),
            'childs' => CatalogChildResource::collection($this->childs),
            'breadcrumbs' => new CatalogBreadcrumbsResource($this->breadcrumbs),
        ];
    }
}
