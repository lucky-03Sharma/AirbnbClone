# Deployment Guide for Wanderlust

## ⚠️ Important: Architecture Clarification

**This is a MONOLITHIC Express application** - everything runs together:
- Server-side rendering with EJS templates
- No separate frontend/backend
- All routes, views, and logic in one Express app

**You only need to deploy to ONE place** (Render OR Vercel), not both!

---

This guide covers deployment options for your full-stack Express app.

## Prerequisites

1. GitHub account with your code pushed
2. Vercel account (sign up at https://vercel.com)
3. Render account (sign up at https://render.com)
4. MongoDB Atlas account (already set up)

---

## Option 1: Deploy Full Stack to Render (Recommended)

Since this is a full-stack Express app, deploying everything to Render is simpler.

### Steps:

1. **Push your code to GitHub** (already done ✅)

2. **Go to Render Dashboard**
   - Visit https://dashboard.render.com
   - Click "New +" → "Web Service"

3. **Connect GitHub Repository**
   - Select your repository: `AnasTanwar5/wanderlust`
   - Click "Connect"

4. **Configure the Service**
   - **Name**: `wanderlust` (or any name you prefer)
   - **Region**: Choose closest to your users
   - **Branch**: `main`
   - **Root Directory**: Leave empty (root)
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free (or choose paid for better performance)

5. **Add Environment Variables**
   Click "Advanced" → "Add Environment Variable" and add:
   ```
   NODE_ENV=production
   PORT=10000
   ATLASDB_URL=your_mongodb_atlas_connection_string
   SECRET=your_secret_key_here
   MAP_TOKEN=your_mapbox_token
   CLOUD_NAME=your_cloudinary_cloud_name
   CLOUD_API_KEY=your_cloudinary_api_key
   CLOUD_API_SECRET=your_cloudinary_api_secret
   ```

6. **Deploy**
   - Click "Create Web Service"
   - Render will build and deploy your app
   - Wait for deployment to complete (5-10 minutes)

7. **Get Your URL**
   - Once deployed, you'll get a URL like: `https://wanderlust-xxxx.onrender.com`
   - Your app is now live! 🎉

---

## Option 2: Deploy to Vercel (Frontend) + Render (Backend)

### Part A: Deploy Backend to Render

Follow steps 1-7 from Option 1 above, but note your Render URL.

### Part B: Deploy Frontend to Vercel

1. **Go to Vercel Dashboard**
   - Visit https://vercel.com/dashboard
   - Click "Add New..." → "Project"

2. **Import GitHub Repository**
   - Select your repository: `AnasTanwar5/wanderlust`
   - Click "Import"

3. **Configure Project**
   - **Framework Preset**: Other
   - **Root Directory**: `./`
   - **Build Command**: Leave empty (or `npm install`)
   - **Output Directory**: Leave empty
   - **Install Command**: `npm install`

4. **Add Environment Variables**
   Click "Environment Variables" and add:
   ```
   NODE_ENV=production
   ATLASDB_URL=your_mongodb_atlas_connection_string
   SECRET=your_secret_key_here
   MAP_TOKEN=your_mapbox_token
   CLOUD_NAME=your_cloudinary_cloud_name
   CLOUD_API_KEY=your_cloudinary_api_key
   CLOUD_API_SECRET=your_cloudinary_api_secret
   ```

5. **Deploy**
   - Click "Deploy"
   - Wait for deployment (2-5 minutes)
   - Your app will be live at: `https://wanderlust-xxxx.vercel.app`

---

## Important Notes

### Environment Variables Security

⚠️ **Never commit your `.env` file to GitHub!**

Your `.env` file is already in `.gitignore`, which is good. Make sure to add all environment variables in:
- Render Dashboard → Your Service → Environment
- Vercel Dashboard → Your Project → Settings → Environment Variables

### MongoDB Atlas Configuration

1. Go to MongoDB Atlas Dashboard
2. Network Access → Add IP Address → Add `0.0.0.0/0` (allow all IPs for Render/Vercel)
3. Database Access → Ensure your user has read/write permissions

### Cloudinary Configuration

Make sure your Cloudinary credentials are correct and the account is active.

### Mapbox Token

Ensure your Mapbox token is valid and has proper permissions.

---

## Troubleshooting

### Common Issues:

1. **Build Fails**
   - Check build logs in Render/Vercel dashboard
   - Ensure all dependencies are in `package.json`
   - Check Node version compatibility

2. **Database Connection Error**
   - Verify MongoDB Atlas IP whitelist includes Render/Vercel IPs
   - Check `ATLASDB_URL` is correct
   - Ensure database user has proper permissions

3. **Environment Variables Not Working**
   - Double-check variable names (case-sensitive)
   - Ensure variables are set in the deployment platform
   - Restart the service after adding variables

4. **Port Issues**
   - Render uses port from `PORT` env variable (default: 10000)
   - Vercel handles ports automatically

---

## Post-Deployment Checklist

- [ ] Test all routes (home, listings, create, edit, delete)
- [ ] Test user authentication (signup, login, logout)
- [ ] Test image uploads (Cloudinary)
- [ ] Test map functionality (Mapbox)
- [ ] Check console for errors
- [ ] Test on mobile devices
- [ ] Monitor logs for any issues

---

## Updating Your Deployment

After making changes:

1. Push changes to GitHub:
   ```bash
   git add .
   git commit -m "Your changes"
   git push origin main
   ```

2. Render/Vercel will automatically detect changes and redeploy
3. Wait for deployment to complete (usually 2-5 minutes)

---

## Support

If you encounter issues:
1. Check deployment logs in Render/Vercel dashboard
2. Check browser console for frontend errors
3. Verify all environment variables are set correctly
4. Ensure MongoDB Atlas is accessible

Good luck with your deployment! 🚀

