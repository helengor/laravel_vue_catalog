<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class DocumentResource extends JsonResource
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
            'catalog_id' => $this->catalog_id,
            'name' => $this->name,
            'created' => $created_date->format('Y-m-d H:i'),
            'updated' => $updated_date->format('Y-m-d H:i'),
            'user' => new UserResource($this->user),
        ];
    }
}
