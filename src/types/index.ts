export interface Post {
  id: string;
  userId: string;
  content: string;
  post_image_url: string | null;
  post_date: Date;
}
