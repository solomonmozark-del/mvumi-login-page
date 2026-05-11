# MR Biker Admin landing shell on mvumi.me

This repository now contains a premium static MR Biker admin command-center shell for **mvumi.me**.

## What is included

- `index.html` — modern MR Biker admin landing/control-center preview
- `style.css` — lush dark UI, glassmorphism panels, responsive layout and motion graphics
- `script.js` — mobile menu, reveal animations, animated counters, password toggle and access-form validation
- `CNAME` — custom domain configuration for `mvumi.me`
- `.nojekyll` — keeps GitHub Pages from running Jekyll processing

## Deployment

This project is static and can be deployed directly by GitHub Pages from the `main` branch root.

1. Push changes to `solomonmozark-del/mvumi-login-page`.
2. In GitHub, open **Settings > Pages**.
3. Source: **Deploy from a branch**.
4. Branch: `main`, folder: `/ (root)`.
5. Confirm the custom domain is `mvumi.me` and enable HTTPS when DNS is ready.

## DNS records for mvumi.me

For GitHub Pages root domain hosting, configure these records at the DNS provider:

- `A @ 185.199.108.153`
- `A @ 185.199.109.153`
- `A @ 185.199.110.153`
- `A @ 185.199.111.153`
- `CNAME www solomonmozark-del.github.io`

## Future production integration

This static shell intentionally does **not** include real API keys or secrets.

When converting it into the full Next.js MR Biker admin dashboard, use environment variables only:

```env
GROQ_API_KEY=
TAVILY_API_KEY=
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
NEXT_PUBLIC_GOOGLE_MAPS_KEY=
MR_BIKER_SECRET=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
```

Never commit `.env.local` or any real secret values.