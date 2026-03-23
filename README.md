# SCHF Website

A production-ready NGO website for Strategic Care & Health Foundation built with Next.js 16, TypeScript, Prisma, and Tailwind CSS v4.

## Tech Stack

- **Framework**: Next.js 16.1.6 (App Router)
- **Language**: TypeScript
- **Database**: PostgreSQL (SQLite for development)
- **ORM**: Prisma
- **Styling**: Tailwind CSS v4
- **Auth**: NextAuth.js
- **Icons**: Lucide React

## Features

- Public pages: Home, About, Programs, Contact, Donate, Events, Partner
- Admin dashboard with full CRUD for all content
- Team member management
- Contact form with database storage
- Newsletter subscription
- Donation integration (Stripe, Paystack, LemonSqueezy)
- WhatsApp integration
- SEO optimization ready
- Responsive design
- Dark/light theme support

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL (or use SQLite for development)

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd schf-website

# Install dependencies
npm install

# Generate Prisma client
npm run db:generate

# Push database schema
npm run db:push

# Start development server
npm run dev
```

### Database Setup

The project uses SQLite by default for development. For PostgreSQL:

1. Update `prisma/schema.prisma`:
   ```prisma
   datasource db {
     provider = "postgresql"
     url      = env("DATABASE_URL")
   }
   ```

2. Update `DATABASE_URL` in `.env`

### Environment Variables

```bash
cp .env.example .env
```

Edit `.env` with your values:
- `DATABASE_URL` - Database connection string
- `NEXTAUTH_URL` - Your site URL
- `NEXTAUTH_SECRET` - Generate with: `openssl rand -base64 32`
- Payment gateway keys

## Development

```bash
# Start dev server
npm run dev

# Lint code
npm run lint

# Type check
npx tsc --noEmit
```

## Admin Access

1. Navigate to `/auth/register`
2. Enter an admin access code: `SCHF2024` or `SCHF2025`
3. Create your admin account
4. Access admin dashboard at `/admin/dashboard`

## Deployment

See [DEPLOY.md](./DEPLOY.md) for detailed deployment instructions.

### Vercel (Recommended)

```bash
npm i -g vercel
vercel
```

SSL/HTTPS is automatically configured on Vercel.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run db:generate` | Generate Prisma client |
| `npm run db:push` | Push schema to database |
| `npm run db:migrate` | Run database migrations |

## Project Structure

```
schf-website/
├── prisma/
│   └── schema.prisma    # Database schema
├── src/
│   ├── app/             # Next.js App Router pages
│   │   ├── admin/       # Admin panel pages
│   │   ├── api/         # API routes
│   │   └── ...          # Public pages
│   ├── components/      # React components
│   └── lib/             # Utilities and config
├── public/              # Static assets
├── next.config.ts        # Next.js configuration
└── tailwind.config.ts   # Tailwind configuration (if needed)
```

## License

Private project - All rights reserved.
