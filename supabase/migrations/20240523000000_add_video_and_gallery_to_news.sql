-- Add video_url and gallery_images columns to news table
ALTER TABLE news 
ADD COLUMN IF NOT EXISTS video_url TEXT,
ADD COLUMN IF NOT EXISTS gallery_images TEXT[]; -- Array of strings for image URLs

-- Add comment to explain columns
COMMENT ON COLUMN news.video_url IS 'URL of the uploaded video';
COMMENT ON COLUMN news.gallery_images IS 'Array of URLs for the photo gallery';
