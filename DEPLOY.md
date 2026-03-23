# SCHF Website - Production Deployment Guide

## Prerequisites
- Node.js 18+ (Recommended: 20.x LTS)
- PostgreSQL 14+ database
- Domain name (optional for testing)

## Quick Start (Development)

```bash
# Install dependencies
npm install

# Generate Prisma client
npm run db:generate

# Push schema to database
npm run db:push

# Start development server
npm run dev
```

## Environment Setup

1. **Copy environment file**
   ```bash
   cp .env.example .env
   ```

2. **Configure your `.env`:**
   - `DATABASE_URL` - PostgreSQL connection string
   - `NEXTAUTH_URL` - Your production URL (e.g., `https://schf.org`)
   - `NEXTAUTH_SECRET` - Generate a secure random string:
     ```bash
     openssl rand -base64 32
     ```
   - Payment gateway API keys

3. **Database setup**
   ```bash
   npm run db:generate
   npm run db:push
   ```

## Building for Production

```bash
# Run production build
npm run build

# Start production server
npm start
```

## Deployment Options

### Option 1: Vercel (Recommended)
```bash
npm i -g vercel
vercel
```
Vercel automatically handles:
- SSL/HTTPS certificates
- Build optimization
- CDN distribution
- Environment variable management

### Option 2: Railway
```bash
# Connect your GitHub repo at railway.app
# Add environment variables in dashboard
# Deploy automatically
```

### Option 3: Docker
```bash
# Build image
docker build -t schf-website .

# Run container
docker run -p 3000:3000 \
  -e DATABASE_URL="postgresql://..." \
  -e NEXTAUTH_SECRET="..." \
  schf-website
```

### Option 4: Traditional Server
```bash
npm run build
npm start
```
**Note:** For SSL/HTTPS, configure a reverse proxy (nginx, Caddy) or use Let's Encrypt.

## First-Time Setup (After Deployment)

1. Navigate to `/auth/register`
2. Create your admin account
3. Use access code: `SCHF2024` or `SCHF2025`
4. Configure site settings
5. Add team members and content

## Payment Gateway Setup

### Stripe
1. Create account at [stripe.com](https://stripe.com)
2. Get API keys from Dashboard > Developers > API keys
3. Configure webhook URL: `https://yourdomain.com/api/webhooks/stripe`
4. Add webhook secret to `STRIPE_WEBHOOK_SECRET`

### Paystack
1. Create account at [paystack.com](https://paystack.com)
2. Get API keys from Settings > API Keys & Webhooks
3. Configure webhook URL: `https://yourdomain.com/api/webhooks/paystack`

### LemonSqueezy
1. Create account at [lemonsqueezy.com](https://lemonsqueezy.com)
2. Get API keys from Settings > API
3. Configure webhook URL: `https://yourdomain.com/api/webhooks/lemonsqueezy`

## Security Checklist

Before going live, ensure:

- [ ] `NEXTAUTH_SECRET` changed to a secure random string (minimum 32 characters)
- [ ] `ADMIN_ACCESS_CODES` updated with unique, secure codes
- [ ] All payment gateway keys are production keys (not test keys)
- [ ] `NEXTAUTH_URL` set to your production HTTPS URL
- [ ] `DATABASE_URL` pointing to production PostgreSQL
- [ ] SSL/HTTPS enabled (automatic on Vercel, manual otherwise)
- [ ] Database backups configured
- [ ] Rate limiting enabled on API routes (if needed)

## Environment Variables Reference

| Variable | Required | Description |
|----------|----------|-------------|
| `DATABASE_URL` | Yes | PostgreSQL connection string |
| `NEXTAUTH_URL` | Yes | Production URL with HTTPS |
| `NEXTAUTH_SECRET` | Yes | Secure random string for JWT signing |
| `ADMIN_ACCESS_CODES` | Yes | Comma-separated admin registration codes |
| `STRIPE_PUBLIC_KEY` | No | Stripe publishable key |
| `STRIPE_SECRET_KEY` | No | Stripe secret key |
| `STRIPE_WEBHOOK_SECRET` | No | Stripe webhook signing secret |
| `PAYSTACK_PUBLIC_KEY` | No | Paystack public key |
| `PAYSTACK_SECRET_KEY` | No | Paystack secret key |
| `LEMONSQUEEZY_API_KEY` | No | LemonSqueezy API key |
| `LEMONSQUEEZY_STORE_ID` | No | LemonSqueezy store ID |
| `LEMONSQUEEZY_WEBHOOK_SECRET` | No | LemonSqueezy webhook secret |

## Troubleshooting

### Database Connection Issues
```bash
# Test database connection
npx prisma db execute --stdin <<< "SELECT 1"
```

### Build Failures
```bash
# Clear Next.js cache
rm -rf .next

# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Prisma Issues
```bash
# Regenerate Prisma client
npm run db:generate

# Reset database (WARNING: deletes all data)
npx prisma db push --force-reset
```

## Support
For issues, check the GitHub repository or contact the development team.
