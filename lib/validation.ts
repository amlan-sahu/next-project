import { z } from 'zod';

const imageExtensions = [".jpg", ".jpeg", ".png", ".gif", ".webp", ".bmp", ".svg"];

export const formSchema = z.object({
  title: z.string().min(3).max(100),
  description: z.string().min(5).max(500),
  category: z.string().min(3).max(20),
  link: z.string().url().refine((url) => {
    return imageExtensions.some(ext => url.toLowerCase().includes(ext));
  }, {
    message: "Must be a valid image URL ending with .jpg, .png, .webp, etc.",
  }),
  pitch: z.string().min(10),
});