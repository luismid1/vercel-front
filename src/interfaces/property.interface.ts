export interface Property {
  id: number;
  title: string;
  description: string;
  price: string;
  price_mxn: string;
  price_usd: string;
  photos: { [key: string]: string };
  video_url: null;
  virtual_tour: null;
  path_url: string;
  path_url_complete: string;
  address_country: string;
  address_state: string;
  address_city: string;
  address_county: string;
  address_zip: string;
  address_lat: string;
  address_lon: string;
  address_street: string;
  address_street_number: string;
  property_status: string;
  bulk_upload: boolean;
  scorefill: string;
  land_use: LandUse;
  additionals: string;
  amenities: string;
  category: Category;
  user: Agency;
  currency_type: CurrencyType;
  property_type: PropertyType;
  agency: Agency;
  walkscoring: Walkscoring[];
  created_at: Date;
}

export interface Agency {
  id: number;
  first_name: string;
  email: string;
  phone: string;
  since_at: Date;
  profile_photo: string;
  last_name?: string;
}

export interface Category {
  id: number;
  category: string;
  description: string;
  description_singular: string;
  seo_friendly: string;
  family: Family;
}

export interface Family {
  id: number;
  family_key: string;
  family_name: string;
  seo_friendly: string;
}

export interface CurrencyType {
  id: number;
  key: string;
  description: string;
  country: string;
}

export interface LandUse {
  id: number;
  land_use: string;
}

export interface PropertyType {
  id: number;
  type: string;
  seo_friendly: string;
}

export interface Walkscoring {
  walkscore: string;
  walk_description: string;
  bikescore: string;
  bike_description: string;
  more_info_link: string;
  updated: Date;
}
