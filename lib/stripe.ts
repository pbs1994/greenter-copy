import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-12-15.clover',
})

/**
 * Check if we're in test mode based on the Stripe secret key
 */
export function isStripeTestMode(): boolean {
  return process.env.STRIPE_SECRET_KEY?.startsWith('sk_test_') ?? false
}

export { stripe }


/**
 * Create a product and price on Stripe
 */
export async function createStripeProduct(data: {
  name: string;
  description?: string;
  imageUrl?: string;
  priceInCents: number;
}): Promise<{ productId: string; priceId: string }> {
  // Create the product
  const product = await stripe.products.create({
    name: data.name,
    description: data.description || undefined,
    images: data.imageUrl ? [data.imageUrl] : undefined,
  });

  // Create the price
  const price = await stripe.prices.create({
    product: product.id,
    unit_amount: data.priceInCents,
    currency: 'eur',
  });

  return {
    productId: product.id,
    priceId: price.id,
  };
}

/**
 * Update a product on Stripe (name, description, image)
 */
export async function updateStripeProduct(
  productId: string,
  data: {
    name?: string;
    description?: string;
    imageUrl?: string;
  }
): Promise<void> {
  await stripe.products.update(productId, {
    name: data.name,
    description: data.description || '',
    images: data.imageUrl ? [data.imageUrl] : [],
  });
}

/**
 * Create a new price and archive the old one
 * Returns the new price ID
 */
export async function updateStripePrice(
  productId: string,
  oldPriceId: string,
  newPriceInCents: number
): Promise<string> {
  // Create new price
  const newPrice = await stripe.prices.create({
    product: productId,
    unit_amount: newPriceInCents,
    currency: 'eur',
  });

  // Archive old price
  await stripe.prices.update(oldPriceId, {
    active: false,
  });

  return newPrice.id;
}

/**
 * Archive a product on Stripe (soft delete)
 */
export async function archiveStripeProduct(productId: string): Promise<void> {
  await stripe.products.update(productId, {
    active: false,
  });
}
