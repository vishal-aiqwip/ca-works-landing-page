# 🚀 AIQWIP

## 🧬 Clone the repository:
```bash
git clone https://github.com/ .
# or
git clone git@github.com: .
```

## 📦 Install all dependencies:
```bash
bun i
# or
npm i
```

## 🔐 Setup environment variables
```bash
# Look into the env.example file
````

## 🛠️ Start the development server:
```bash
npm run dev
# or
bun dev
```

## 🏗️ Build the application for production:
```bash
npm run build
# or
bun run build
```

## 🧹 Perform a deep clean (remove node_modules and .next dir):
```bash
npm run cls
# or
bun run cls

npm run cls:all
# or
bun run cls:all
```

### 🔍 Checkout development or production server:
```bash
http://localhost:3000
```

## 🚀 Used Technologies:

- ``Better Auth``: An open-source authentication library for JavaScript applications.
- ``Next.js``: Flexible React framework.
- ``React``: Library for building user interfaces.
- ``Shadcn``: React component library that offers a set of pre-built, customizable components for building modern web apps.
- ``React Hook Form``: Performant, flexible and extensible forms with easy-to-use validation.
- ``zod``: Zod is a schema declaration and validation library.
- ``Tailwind CSS @4``: Utility-first CSS framework.
- ``Tailwind Merge @3.4.1``: Merge the tailwind css util classes.
- ``Biome``: Linting tool for identifying and reporting on patterns in JavaScript.
- ``Lucide react @0.488.0``: Include popular icons in the project.
<!-- - ``crypto-js @4.2.0``: JavaScript library of crypto standards. -->
<!-- - ``swiper @11.2.6``: Swiper is the most modern free mobile touch slider with hardware accelerated transitions and amazing native behavior. -->


## 🚢 Production Deployment

The app is deployed on a VPS using Docker Compose + Nginx + Let's Encrypt SSL.

**Domain:** `https://aiqwip.in`
**Port:** `3200` (internal)

### Prerequisites

- Docker & Docker Compose installed
- Nginx installed on the host
- SSL certificate for `aiqwip.in` (via Let's Encrypt / Certbot)

### Environment Setup

Create `.env.prod` in the project root:

```bash
NODE_ENV=production
PORT=3200
NEXT_PUBLIC_APP_URL=https://aiqwip.in
API_URL=https://your-api-domain.com   # optional, if backend API is needed
```

### Build & Start

```bash
# Build and start the container
make prod-build

# Start without rebuilding
make prod

# Stop the container
make prod-down

# View logs
make prod-logs

# Check health
make check
```

### Nginx Setup (first time only)

```bash
# 1. Get SSL certificate
sudo certbot certonly --nginx -d aiqwip.in -d www.aiqwip.in

# 2. Copy nginx config
sudo cp ~/aiqwip/nginx/prod/aiqwip.in.conf /etc/nginx/sites-available/aiqwip.conf

# 3. Enable the site
sudo ln -s /etc/nginx/sites-available/aiqwip.conf /etc/nginx/sites-enabled/aiqwip.conf

# 4. Test and reload
sudo nginx -t && sudo systemctl reload nginx
```

### Rebuild & Restart

```bash
# After code changes — rebuild image and restart container
make prod-build

# Restart without rebuilding (e.g. after .env.prod change)
make prod-down && make prod

# Full clean rebuild (removes old image, builds from scratch)
make clean && make prod-build
```

### Redeploy after pulling new code

```bash
cd ~/aiqwip
git pull
make prod-build
```

### Useful Commands

| Command | Description |
|---------|-------------|
| `make prod-build` | Build image and start container |
| `make prod` | Start container (no rebuild) |
| `make prod-down` | Stop container |
| `make prod-logs` | Tail container logs |
| `make prod-ps` | List running containers |
| `make prod-nginx-test` | Test nginx config |
| `make prod-nginx-reload` | Reload nginx |
| `make check` | Health check |
| `make clean` | Remove all containers and images |

## 📚 Resources
- [Next js](https://nextjs.org/docs)
- [React](https://react.dev/learn)
- [Tailwind css](https://tailwindcss.com)
- [Biomejs](https://biomejs.dev/)
- [Shadcn](https://ui.shadcn.com/docs)
- [Lucide icons](https://lucide.dev/icons/)
- [Better Auth](https://www.better-auth.com/)
