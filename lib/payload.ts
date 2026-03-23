import { getPayload } from 'payload'
import configPromise from '@payload-config'

/**
 * Get the Payload client for server-side data fetching
 * Uses Local API for optimal performance (no HTTP overhead)
 */
export async function getPayloadClient() {
  return getPayload({ config: configPromise })
}
