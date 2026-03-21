---
title: Getting Started with GitHub Pages
date: March 21, 2026
readTime: 4 min read
description: A step-by-step guide to hosting your static site for free using GitHub Pages.
---

GitHub Pages is one of the easiest ways to get a static website live on the internet — for free. It serves directly from a GitHub repository, which means your deployment workflow is just a `git push`.

## Prerequisites

- A GitHub account
- Your static site files (HTML, CSS, JS)
- Git installed locally

## Step 1: Create a Repository

Go to GitHub and create a new repository. For a personal site, name it `yourusername.github.io`. This is the magic name that GitHub uses to serve your site at `https://yourusername.github.io`.

## Step 2: Push Your Site

In your project directory, initialize git and push:

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/yourusername/yourusername.github.io.git
git push -u origin main
```

```python
import pandas as pd

df = pd.read_csv("test.csv")
print(df.head())
```

## Step 3: Enable GitHub Pages

In your repository settings, navigate to **Pages** under the *Code and automation* section. Set the source to `Deploy from a branch`, select `main`, and save. GitHub will build and deploy your site within a minute or two.

## Step 4: Visit Your Site

Your site is now live at `https://yourusername.github.io`. Every time you push to the `main` branch, GitHub automatically redeploys.

## Custom Domain (Optional)

You can connect a custom domain in the same Pages settings panel. Add a `CNAME` record pointing to `yourusername.github.io` with your DNS provider, then enter the domain in GitHub's UI.

That's it — ship it!

