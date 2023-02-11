export type AmenityParent = {
  id: number;
  property_category_id: number;
  name: string;
  seo_friendly: string;
  active_record: boolean;
  created_at: string;
  updated_at: string;
  created_by: string;
};

export type AmenityChild = {
  id: number;
  name: string;
  seo_friendly: string;
  property_category: number;
  amenity_parent: string;
};
