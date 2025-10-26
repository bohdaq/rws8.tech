# Bohdan Tsap - Developer Portfolio

A modern, SEO-friendly static website showcasing my work as a Full-stack, Frontend, and Backend Developer.

## 🌐 Live Site

Visit the live site at: `https://rws8.tech/`

## 📋 Overview

This portfolio website is built with pure HTML and CSS, optimized for GitHub Pages deployment. It features:

- **SEO Optimization**: Meta tags, Open Graph tags, and structured data (JSON-LD)
- **Responsive Design**: Mobile-first approach with modern CSS Grid and Flexbox
- **Accessibility**: WCAG-compliant with semantic HTML and keyboard navigation support
- **Performance**: Lightweight, no external dependencies, fast loading times
- **Modern UI**: Clean, professional design with smooth animations and transitions

## 📁 Project Structure

```
rws8.tech/
├── index.html          # Homepage with overview and featured projects
├── fullstack.html      # Full-stack development expertise
├── frontend.html       # Frontend development skills
├── backend.html        # Backend development projects
├── styles.css          # Main stylesheet with responsive design
└── README.md          # This file
```

## 🚀 Deployment to GitHub Pages

### Option 1: Deploy from Repository Root

1. **Push the files to your GitHub repository:**
   ```bash
   git add .
   git commit -m "Add portfolio website"
   git push origin main
   ```

2. **Enable GitHub Pages:**
   - Go to your repository on GitHub
   - Navigate to **Settings** → **Pages**
   - Under "Source", select **Deploy from a branch**
   - Select branch: **main** and folder: **/ (root)**
   - Click **Save**

3. **Access your site:**
   - Your site will be available at: `https://rws8.tech/`
   - It may take a few minutes for the site to go live

### Option 2: Deploy from docs/ folder

If you prefer to keep the website files in a `docs/` folder:

1. **Move files to docs folder:**
   ```bash
   mkdir docs
   mv *.html *.css docs/
   ```

2. **Enable GitHub Pages:**
   - Go to **Settings** → **Pages**
   - Select branch: **main** and folder: **/docs**
   - Click **Save**

### Option 3: Using GitHub Actions (Recommended for advanced users)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./
```

## 🎨 Customization

### Update Personal Information

1. **Edit HTML files** to update:
   - Name and title
   - Project descriptions
   - Links to repositories
   - Contact information

2. **Update meta tags** in each HTML file:
   - Change `og:url` to your actual GitHub Pages URL
   - Update descriptions and keywords

### Customize Colors

Edit CSS variables in `styles.css`:

```css
:root {
    --primary-color: #2563eb;      /* Main brand color */
    --primary-dark: #1e40af;       /* Darker shade */
    --accent-color: #f59e0b;       /* Accent highlights */
    /* ... more variables */
}
```

### Add New Projects

Add project cards in the HTML files:

```html
<div class="project-card">
    <h3>Project Name</h3>
    <p>Project description...</p>
    <div class="tech-tags">
        <span class="tag">Technology</span>
    </div>
    <a href="https://github.com/..." class="project-link">View Project →</a>
</div>
```

## 🔍 SEO Features

### Implemented SEO Best Practices:

- ✅ Semantic HTML5 structure
- ✅ Meta descriptions for all pages
- ✅ Open Graph tags for social media sharing
- ✅ Twitter Card metadata
- ✅ Canonical URLs
- ✅ Structured data (JSON-LD) for search engines
- ✅ Descriptive alt text (add to images if you include them)
- ✅ Mobile-responsive design
- ✅ Fast loading times
- ✅ Clean URL structure

### To Further Improve SEO:

1. **Add a sitemap.xml:**
   ```xml
   <?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <url>
       <loc>https://rws8.tech/</loc>
       <priority>1.0</priority>
     </url>
     <url>
       <loc>https://rws8.tech/fullstack.html</loc>
       <priority>0.8</priority>
     </url>
     <!-- Add other pages -->
   </urlset>
   ```

2. **Add robots.txt:**
   ```
   User-agent: *
   Allow: /
   Sitemap: https://rws8.tech/sitemap.xml
   ```

3. **Submit to search engines:**
   - Google Search Console
   - Bing Webmaster Tools

## 📱 Responsive Breakpoints

- **Desktop**: 1200px and above
- **Tablet**: 768px - 1199px
- **Mobile**: Below 768px
- **Small Mobile**: Below 480px

## ♿ Accessibility Features

- Semantic HTML elements
- ARIA labels where appropriate
- Keyboard navigation support
- Focus indicators
- Color contrast compliance
- Reduced motion support for users with motion sensitivity

## 🛠️ Technologies Used

- **HTML5**: Semantic markup
- **CSS3**: Modern layouts (Grid, Flexbox), animations, custom properties
- **No JavaScript**: Pure HTML/CSS for maximum performance and simplicity

## 📊 Performance

- **Lighthouse Score**: Aim for 90+ in all categories
- **No external dependencies**: Faster loading
- **Optimized CSS**: Minimal, efficient styles
- **Mobile-first**: Optimized for all devices

## 🔄 Local Development

To test locally:

1. **Simple HTTP Server (Python):**
   ```bash
   python3 -m http.server 8000
   ```
   Then visit: `http://localhost:8000`

2. **Using Node.js:**
   ```bash
   npx http-server
   ```

3. **VS Code Live Server:**
   - Install "Live Server" extension
   - Right-click on `index.html` → "Open with Live Server"

## 📝 License

This project is open source and available for personal use.

## 🤝 Contributing

Feel free to fork this repository and customize it for your own portfolio!

## 📧 Contact

- **GitHub**: [@bohdaq](https://github.com/bohdaq)
- **ORCID**: [0000-0002-5221-5607](https://orcid.org/0000-0002-5221-5607)

---

Built with ❤️ by Bohdan Tsap
