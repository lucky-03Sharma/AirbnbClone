# Troubleshooting Guide

## Internal Server Error When Creating Listings from Different IP Addresses

### Common Causes and Solutions:

### 1. **MongoDB Atlas IP Whitelist Issue** ⚠️ MOST COMMON

**Problem:** MongoDB Atlas blocks connections from IP addresses that aren't whitelisted.

**Solution:**
1. Go to MongoDB Atlas Dashboard
2. Click on **Network Access** (left sidebar)
3. Click **Add IP Address**
4. Add `0.0.0.0/0` to allow ALL IP addresses (for production)
   - Or add specific IP addresses if you want to restrict access
5. Click **Confirm**
6. Wait 1-2 minutes for changes to take effect

**Note:** For Render/Vercel deployments, you MUST use `0.0.0.0/0` because the IP addresses change dynamically.

---

### 2. **Geocoding API Error**

**Problem:** Mapbox geocoding might fail for certain locations or API limits exceeded.

**Solution:**
- Check Mapbox API token is valid
- Ensure location is entered correctly
- Check Mapbox account for usage limits

**Fixed in code:** Added error handling for geocoding failures.

---

### 3. **File Upload Error**

**Problem:** Cloudinary upload might fail or file might be missing.

**Solution:**
- Check Cloudinary credentials are correct
- Ensure file size is within limits
- Check Cloudinary account status

**Fixed in code:** Added check for file existence before processing.

---

### 4. **Session Store Error**

**Problem:** MongoDB session store might fail to connect.

**Solution:**
- Ensure MongoDB connection string is correct
- Check MongoDB Atlas IP whitelist (same as #1)
- Verify SECRET environment variable is set

**Fixed in code:** Added error handler for session store.

---

### 5. **Environment Variables Missing**

**Problem:** Required environment variables not set on Render/Vercel.

**Solution:**
Check all these are set in your deployment platform:
- `ATLASDB_URL`
- `SECRET`
- `MAP_TOKEN`
- `CLOUD_NAME`
- `CLOUD_API_KEY`
- `CLOUD_API_SECRET`
- `NODE_ENV=production`
- `PORT`

---

### 6. **Database Connection Timeout**

**Problem:** Connection to MongoDB times out.

**Solution:**
- Check MongoDB Atlas cluster is running
- Verify connection string format
- Check network connectivity

---

## How to Check Logs

### On Render:
1. Go to your service dashboard
2. Click on **Logs** tab
3. Look for error messages
4. Check for MongoDB connection errors
5. Check for geocoding errors
6. Check for file upload errors

### Common Error Messages:

**MongoDB Connection Error:**
```
MongoNetworkError: failed to connect to server
```
→ **Fix:** Add IP to MongoDB Atlas whitelist

**Geocoding Error:**
```
Error geocoding location
```
→ **Fix:** Check location format and Mapbox token

**File Upload Error:**
```
Please upload an image
```
→ **Fix:** Ensure file is selected and Cloudinary is configured

---

## Quick Checklist

- [ ] MongoDB Atlas IP whitelist includes `0.0.0.0/0`
- [ ] All environment variables are set correctly
- [ ] MongoDB cluster is running
- [ ] Mapbox token is valid
- [ ] Cloudinary credentials are correct
- [ ] File size is within limits
- [ ] Location is entered correctly

---

## Still Having Issues?

1. Check Render/Vercel logs for specific error messages
2. Verify all environment variables are set
3. Test MongoDB connection from your local machine
4. Check Mapbox and Cloudinary account status
5. Ensure you're logged in when creating listings

