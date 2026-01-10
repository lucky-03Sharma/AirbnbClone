# Quick Deployment Steps

## 🚀 Deploy to Render (Easiest - Full Stack)

### Step 1: Prepare Your Code
✅ Already done! Your code is ready.

### Step 2: Go to Render
1. Visit: https://dashboard.render.com
2. Sign up/Login with GitHub

### Step 3: Create Web Service
1. Click "New +" → "Web Service"
2. Connect your GitHub repo: `AnasTanwar5/wanderlust`
3. Click "Connect"

### Step 4: Configure
- **Name**: `wanderlust`
- **Region**: Choose closest region
- **Branch**: `main`
- **Root Directory**: (leave empty)
- **Runtime**: `Node`
- **Build Command**: `npm install`
- **Start Command**: `npm start`
- **Plan**: Free

### Step 5: Add Environment Variables
Click "Advanced" → Add these variables:

```
NODE_ENV=production
PORT=10000
ATLASDB_URL=mongodb+srv://Lucky_S:slkam0306@cluster0.odzjg5q.mongodb.net/?appName=Cluster0
SECRET=mysupersecretcode
MAP_TOKEN=pk.eyJ1IjoibHVja3lzMTIzIiwiYSI6ImNtanYxanpzNzR4ZHkzZ3F4bjFwaTdpOGMifQ.Novw1bK76XuGUJPUyiJnNw
CLOUD_NAME=dzmlevw1r
CLOUD_API_KEY=919236859241387
CLOUD_API_SECRET=OxniRFLzncMhI3bO2TbgOG6Kkt0
```

### Step 6: Deploy
1. Click "Create Web Service"
2. Wait 5-10 minutes for build
3. Your app will be live! 🎉

---

## 🔧 MongoDB Atlas Setup (Important!)

Before deploying, make sure:

1. Go to MongoDB Atlas → Network Access
2. Click "Add IP Address"
3. Add `0.0.0.0/0` (allows all IPs - needed for Render)
4. Click "Confirm"

---

## 📝 After Deployment

1. Visit your Render URL (e.g., `https://wanderlust-xxxx.onrender.com`)
2. Test the app:
   - Create account
   - Add listing
   - Upload images
   - Check map functionality

---

## 🔄 Updating Your App

1. Make changes locally
2. Push to GitHub:
   ```bash
   git add .
   git commit -m "Update"
   git push origin main
   ```
3. Render auto-deploys! (takes 2-5 minutes)

---

## ⚠️ Troubleshooting

**App not loading?**
- Check Render logs: Dashboard → Your Service → Logs
- Verify environment variables are set correctly
- Check MongoDB Atlas IP whitelist

**Database connection error?**
- Ensure MongoDB Atlas allows `0.0.0.0/0`
- Verify `ATLASDB_URL` is correct in Render

**Build failing?**
- Check build logs in Render
- Ensure `package.json` has all dependencies
- Verify Node version compatibility

---

Need help? Check the full guide in `DEPLOYMENT.md`

