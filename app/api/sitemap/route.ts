// app/api/sitemap/route.ts
import { MetadataRoute } from 'next'
import { NextResponse } from 'next/server';

 function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://gbmeals.com/',
      lastModified: new Date(),
      changeFrequency: 'daily', // Adjust based on your content update frequency
      priority: 1.0,
    },
    {
      url: 'https://gbmeals.com/mealPlanner',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.6,
    },
    // Add more URLs as per your website's structure, for example:
    {
      url: 'https://gbmeals.com/login',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://gbmeals.com/aboutUs',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.5,
    },
    {
      url: 'https://gbmeals.com/privacyPolicy',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.2,
    },
    {
      url: 'https://gbmeals.com/termsofServices',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.2,
    },
    {
      url: 'https://gbmeals.com/cookieSetting',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.2,
    },
    {
      url: 'https://gbmeals.com/plans',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: 'https://gbmeals.com/myAccount',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: 'https://gbmeals.com/payment',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    // You can add dynamic routes here as well if needed
    {
      url: 'https://gbmeals.com/deleteAccount',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.5,
    },
    {
      url: 'https://gbmeals.com/forgetPass',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.5,
    },
    {
      url: 'https://gbmeals.com/welcome',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    // You can add dynamic routes here as well if needed
  ]
}

export const GET = async () => {
  try {
    const sitemapData = sitemap();
    return new NextResponse(JSON.stringify(sitemapData), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error(error.message);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
};