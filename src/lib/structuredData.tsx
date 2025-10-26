/**
 * Utilities for generating JSON-LD structured data for SEO
 */

import React from 'react';

interface Product {
  id: string
  name: string
  description: string
  price: number
  images: string[]
  sku: string
  category: {
    name: string
  }
}

/**
 * Generate Product schema for JSON-LD
 */
export function generateProductSchema(product: Product, url: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.images,
    sku: product.sku,
    brand: {
      '@type': 'Brand',
      name: 'BitBuy',
    },
    category: product.category.name,
    offers: {
      '@type': 'Offer',
      url,
      priceCurrency: 'USD',
      price: product.price.toFixed(2),
      availability: 'https://schema.org/InStock',
      seller: {
        '@type': 'Organization',
        name: 'BitBuy',
      },
    },
  }
}

/**
 * Generate Organization schema for JSON-LD
 */
export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'BitBuy',
    url: process.env.NEXTAUTH_URL || 'http://localhost:3000',
    logo: `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/logo.png`,
    description: 'Your Premium E-Commerce Destination for electronics, clothing, home goods, and more.',
    sameAs: [
      'https://facebook.com/bitbuy',
      'https://twitter.com/bitbuy',
      'https://instagram.com/bitbuy',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+1-234-567-8900',
      contactType: 'Customer Service',
      email: 'support@bitbuy.com',
      availableLanguage: 'English',
    },
  }
}

/**
 * Generate WebSite schema for JSON-LD
 */
export function generateWebSiteSchema() {
  const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000'

  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'BitBuy',
    url: baseUrl,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${baseUrl}/products?search={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  }
}

/**
 * Generate BreadcrumbList schema for JSON-LD
 */
export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
}

/**
 * Helper to insert JSON-LD script into page
 */
export function JsonLd({ data }: { data: any }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
