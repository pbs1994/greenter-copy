// This file must be loaded BEFORE any other imports
// It ensures .env.local is loaded before Stripe/Payload try to read env vars
import { loadEnvConfig } from '@next/env'
loadEnvConfig(process.cwd(), true)
