# 🚀 Vercel Deployment Guide for MongoDB

## ✅ Optimizations Applied

The MongoDB connection has been optimized for Vercel's serverless environment:

1. **Connection Pooling**: Optimized pool size (1 connection per serverless instance)
2. **Connection Reuse**: Uses `globalThis` to persist connections across invocations
3. **Faster Timeouts**: Reduced timeouts for quicker cold starts
4. **Index Caching**: Prevents repeated index creation attempts
5. **Error Handling**: Better error messages for Vercel-specific issues

## 📋 Required Vercel Environment Variables

Add these in your Vercel project settings:

### Step 1: Go to Vercel Dashboard
1. Open your project: https://vercel.com/dashboard
2. Click **Settings** → **Environment Variables**

### Step 2: Add Variables

**Variable 1:**
- **Name:** `MONGODB_URI`
- **Value:** `mongodb+srv://Dheesh:123dheesh@cluster0.8hscqcq.mongodb.net/awp-mini-proj?retryWrites=true&w=majority`
- **Environment:** ✅ Production, ✅ Preview, ✅ Development

**Variable 2:**
- **Name:** `MONGODB_DB`
- **Value:** `awp-mini-proj`
- **Environment:** ✅ Production, ✅ Preview, ✅ Development

### Step 3: Save and Redeploy
1. Click **Save**
2. Go to **Deployments**
3. Click **⋯** (three dots) on latest deployment
4. Click **Redeploy**

## 🔒 MongoDB Atlas Configuration for Vercel

### IP Whitelist Setup

Vercel uses dynamic IPs, so you need to allow all IPs:

1. Go to **MongoDB Atlas** → **Network Access**
2. Click **"Add IP Address"**
3. Click **"Allow Access from Anywhere"** (`0.0.0.0/0`)
4. Click **"Confirm"**
5. Wait 1-2 minutes for changes to propagate

**⚠️ Security Note:** For production, consider restricting to specific IP ranges, but `0.0.0.0/0` is required for Vercel's dynamic IPs.

### Database User Permissions

Ensure your MongoDB user has proper permissions:

1. MongoDB Atlas → **Database Access**
2. Find user **"Dheesh"**
3. Ensure it has:
   - **Atlas admin** OR
   - **Read and write to any database**

## 🧪 Testing After Deployment

1. **Visit your Vercel URL:** `https://your-app.vercel.app`
2. **Go to booking page:** `/booking`
3. **Make a test booking**
4. **Check success page:** `/booking/success`
5. **Verify:**
   - ✅ Booking count increases
   - ✅ Your booking appears in recent bookings
   - ✅ Name, email, phone are displayed

## 🔍 Troubleshooting

### Error: "Missing MONGODB_URI"
- **Fix:** Add environment variable in Vercel settings
- **Verify:** Check that variable is set for Production environment

### Error: "Connection timeout"
- **Fix:** Update MongoDB Atlas IP whitelist to `0.0.0.0/0`
- **Wait:** 1-2 minutes after updating whitelist

### Error: "Authentication failed"
- **Fix:** Verify username and password in connection string
- **Check:** Database user permissions in MongoDB Atlas

### Bookings not appearing
- **Check:** Vercel function logs (Deployments → Function Logs)
- **Verify:** Environment variables are set correctly
- **Test:** Make a new booking and check immediately

## 📊 Performance Optimizations

The following optimizations are in place for Vercel:

1. **Connection Pool Size:** 1 (optimal for serverless)
2. **Connection Reuse:** Global connection caching
3. **Index Creation:** One-time with background flag
4. **Timeout Settings:** Optimized for cold starts
5. **Error Recovery:** Automatic reconnection on failure

## 🔄 Local vs Production

- **Local:** Uses `.env.local` file
- **Vercel:** Uses environment variables from dashboard
- **Same Database:** Both connect to the same MongoDB instance
- **Shared Data:** All bookings (local + Vercel) appear together

## ✅ Deployment Checklist

- [ ] Added `MONGODB_URI` to Vercel environment variables
- [ ] Added `MONGODB_DB` to Vercel environment variables
- [ ] Updated MongoDB Atlas IP whitelist to `0.0.0.0/0`
- [ ] Verified database user permissions
- [ ] Redeployed on Vercel
- [ ] Tested booking on live site
- [ ] Verified bookings appear on success page

## 🎯 Quick Deploy Command

After setting environment variables:

```bash
# Push to trigger deployment
git add .
git commit -m "Optimize MongoDB for Vercel"
git push
```

Or manually redeploy from Vercel dashboard.

## 📝 Notes

- **Cold Starts:** First request may be slower (~1-2s) due to connection establishment
- **Warm Starts:** Subsequent requests are fast (<100ms) due to connection reuse
- **Connection Limits:** MongoDB Atlas free tier allows 500 connections
- **Scaling:** Vercel automatically scales, each instance maintains its own connection

Your MongoDB setup is now optimized for Vercel! 🚀

