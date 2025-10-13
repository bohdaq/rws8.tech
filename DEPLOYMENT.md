# Quick Deployment Guide

## 🚀 Deploy to GitHub Pages in 3 Steps

### Step 1: Initialize Git Repository (if not already done)

```bash
cd /Users/bohdantsap/git/rws8.tech
git init
git add .
git commit -m "Initial commit: Portfolio website"
```

### Step 2: Push to GitHub

If you haven't created the repository yet:
1. Go to https://github.com/new
2. Create a repository named `rws8.tech`
3. Don't initialize with README (we already have one)

Then push your code:

```bash
git remote add origin https://github.com/bohdaq/rws8.tech.git
git branch -M main
git push -u origin main
```

### Step 3: Enable GitHub Pages

1. Go to your repository: https://github.com/bohdaq/rws8.tech
2. Click **Settings** (top right)
3. Click **Pages** (left sidebar)
4. Under "Source":
   - Select branch: **main**
   - Select folder: **/ (root)**
5. Click **Save**

Your site will be live at: **https://bohdaq.github.io/rws8.tech/**

⏱️ It may take 2-5 minutes for the site to go live.

## 🔄 Updating Your Site

After making changes:

```bash
git add .
git commit -m "Update portfolio"
git push
```

GitHub Pages will automatically rebuild and deploy your changes.

## ✅ Verify Deployment

1. Wait a few minutes after pushing
2. Visit: https://bohdaq.github.io/rws8.tech/
3. Check all pages load correctly:
   - Homepage: /
   - Fullstack: /fullstack.html
   - Frontend: /frontend.html
   - Backend: /backend.html

## 🐛 Troubleshooting

### Site not loading?
- Check GitHub Actions tab for build errors
- Ensure GitHub Pages is enabled in Settings
- Wait 5-10 minutes for DNS propagation

### CSS not loading?
- Check that `styles.css` is in the root directory
- Verify the link tag in HTML files: `<link rel="stylesheet" href="styles.css">`

### 404 errors?
- Ensure all HTML files are in the root directory
- Check that file names match exactly (case-sensitive)

## 📊 Monitor Your Site

- **GitHub Actions**: See deployment status
- **Settings → Pages**: View deployment history
- **Google Search Console**: Monitor SEO performance (after submitting sitemap)

## 🎨 Next Steps

1. **Test locally** before pushing:
   ```bash
   python3 -m http.server 8000
   # Visit http://localhost:8000
   ```

2. **Add Google Analytics** (optional):
   - Create GA4 property
   - Add tracking code to all HTML files

3. **Submit to search engines**:
   - Google Search Console: https://search.google.com/search-console
   - Bing Webmaster Tools: https://www.bing.com/webmasters

4. **Custom domain** (optional):
   - Buy a domain
   - Rename `CNAME.example` to `CNAME`
   - Add your domain to the CNAME file
   - Configure DNS settings with your domain provider

## 📧 Need Help?

Check the main README.md for detailed documentation.
