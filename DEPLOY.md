# MR Biker Admin redirect shell on mvumi.me

This repository now contains a small static redirect shell for **mvumi.me**.

Visitors are immediately sent to the real API-key protected MR Biker Admin app at:

```txt
https://mr-biker-admin.vercel.app/
```

## What is included

- `index.html` — zero-delay meta refresh plus JavaScript redirect to the real admin login
- `style.css` — retained only for repository history/backward compatibility; no longer loaded by the redirect page
- `script.js` — retained only for repository history/backward compatibility; no longer loaded by the redirect page
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

## Production integration

This static shell intentionally does **not** include real API keys or secrets.

The full Next.js MR Biker admin dashboard is deployed separately on Vercel. Configure production secrets in the Vercel project environment only:

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
MR_BIKER_API_KEY=
ADMIN_SESSION_SECRET=
```

Never commit `.env.local` or any real secret values.