# Deploy login page to mvumi.me using GitHub

This project is static and already includes:
- index.html
- style.css
- script.js
- CNAME
- .nojekyll

## 1) Create a GitHub repository and push

Run these commands in this folder:

```bash
git init
git add .
git commit -m "Add login page"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

## 2) Turn on GitHub Pages

1. Open your repo on GitHub.
2. Go to Settings > Pages.
3. Source: Deploy from a branch.
4. Branch: main, folder: /(root).
5. Save.

GitHub will publish your site at:
- https://YOUR_USERNAME.github.io/YOUR_REPO/

Because this repo has a CNAME file, Pages will use mvumi.me as the custom domain.

## 3) Set Namecheap DNS for mvumi.me

In Namecheap > Domain List > Manage > Advanced DNS:

1. Add these A records for root domain (@):
   - 185.199.108.153
   - 185.199.109.153
   - 185.199.110.153
   - 185.199.111.153
2. Add CNAME record for www:
   - Host: www
   - Value: YOUR_USERNAME.github.io
3. Remove conflicting A or CNAME records for @ and www.

## 4) Verify custom domain in GitHub

1. Go back to Settings > Pages.
2. Confirm Custom domain is mvumi.me.
3. Enable Enforce HTTPS once DNS finishes propagating.

## Optional next step: connect real authentication

Replace the success message in script.js with a fetch() POST call to your backend login API endpoint.
