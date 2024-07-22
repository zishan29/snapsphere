export interface Post {
  post_id: string;
  user_id: string;
  content: string;
  post_image_url: string | null;
  post_date: Date;
}
