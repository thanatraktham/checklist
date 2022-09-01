export interface IRestaurant {
  img_url: string;
  location_id: number;
  location_name?: string;
  rating: number;
  restaurant_id?: number;
  restaurant_name: string;
  restaurant_url: string;
  visit_date: Date;
  google_map_url: string;
  tag_id: number;
}
