// app/api/sitemap/route.ts
import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://nextjsgbmeals.vercel.app/',
      lastModified: new Date(),
      changeFrequency: 'daily', // Adjust based on your content update frequency
      priority: 1.0,
    },
    {
      url: 'https://nextjsgbmeals.vercel.app/mealPlanner',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.6,
    },
    // Add more URLs as per your website's structure, for example:
    {
      url: 'https://nextjsgbmeals.vercel.app/login',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://nextjsgbmeals.vercel.app/aboutUs',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.5,
    },
    {
      url: 'https://nextjsgbmeals.vercel.app/privacyPolicy',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.2,
    },
    {
      url: 'https://nextjsgbmeals.vercel.app/termsofServices',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.2,
    },
    {
      url: 'https://nextjsgbmeals.vercel.app/cookieSetting',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.2,
    },
    {
      url: 'https://nextjsgbmeals.vercel.app/plans',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: 'https://nextjsgbmeals.vercel.app/myAccount',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: 'https://nextjsgbmeals.vercel.app/payment',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    // You can add dynamic routes here as well if needed
    {
      url: 'https://nextjsgbmeals.vercel.app/deleteAccount',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.5,
    },
    {
      url: 'https://nextjsgbmeals.vercel.app/forgetPass',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.5,
    },
    {
      url: 'https://nextjsgbmeals.vercel.app/welcome',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    // You can add dynamic routes here as well if needed
  ]
}

export const GET = async () => {
  try {
    sitemap()
  } catch (error) {
    console.error(error.message)
  }
};
