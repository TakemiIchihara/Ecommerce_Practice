import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'
import type { Image } from 'sanity'

export const client = createClient({
  projectId: 'i6d9zp8w',
  dataset: 'production',
  apiVersion: '2024-01-02',
  useCdn: true,
  token: import.meta.env.VITE_PUBLIC_SANITY_TOKEN
})

const builder = imageUrlBuilder(client)

export const urlFor = (source: Image) => builder.image(source)