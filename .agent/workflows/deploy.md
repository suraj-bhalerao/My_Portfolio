---
description: How to deploy the portfolio application
---

### Option 1: Deploying to Vercel (Recommended for React/Vite)
1. Push your code to a GitHub repository.
2. Go to [Vercel](https://vercel.com/) and sign up with GitHub.
3. Click "New Project" and import your repository.
4. Vercel will automatically detect Vite. Click "Deploy".
5. Your site will be live on a `vercel.app` subdomain.

### Option 2: Deploying to Replit
1. Create a new Repl and select the "React" or "Node.js" template.
2. Upload your project files or import from GitHub.
3. In the shell, run:
   ```bash
   npm install
   npm run build
   ```
4. To serve the production build on Replit, you might need a simple server or use the `serve` package:
   ```bash
   npx serve -s dist
   ```
5. Replit will provide a URL to view your live site.

### Option 3: GitHub Pages
1. Install the `gh-pages` package:
   ```bash
   npm install gh-pages --save-dev
   ```
2. Add these scripts to `package.json`:
   ```json
   "predeploy": "npm run build",
   "deploy": "gh-pages -d dist"
   ```
3. Run `npm run deploy`.
