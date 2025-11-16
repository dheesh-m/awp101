# 🔧 MongoDB Connection Troubleshooting

## Current Error: SSL/TLS Connection Issue

The error you're seeing usually means one of these:

### 1. **IP Address Not Whitelisted** (Most Common)

Your IP address needs to be added to MongoDB Atlas Network Access.

**Fix:**
1. Go to https://cloud.mongodb.com
2. Click on your cluster → **Network Access** (left sidebar)
3. Click **"Add IP Address"**
4. Choose one:
   - **"Add Current IP Address"** (recommended for security)
   - **"Allow Access from Anywhere"** (`0.0.0.0/0`) - for testing only
5. Click **"Confirm"**
6. Wait 1-2 minutes for changes to take effect

### 2. **Check Your Connection String**

Your current connection string:
```
mongodb+srv://Dheesh:123dheesh@cluster0.8hscqcq.mongodb.net/awp-mini-proj?appName=Cluster0&retryWrites=true&w=majority
```

**Verify:**
- ✅ Username: `Dheesh`
- ✅ Password: `123dheesh`
- ✅ Cluster: `cluster0.8hscqcq.mongodb.net`
- ✅ Database: `awp-mini-proj`

### 3. **Test Connection from MongoDB Atlas**

1. Go to MongoDB Atlas → Your Cluster
2. Click **"Connect"** → **"Connect using MongoDB Compass"**
3. Copy the connection string
4. Open MongoDB Compass
5. Paste and connect
6. If it works in Compass but not in your app → IP whitelist issue

### 4. **Alternative: Try Without appName Parameter**

Sometimes the `appName` parameter can cause issues. Try this connection string:

```env
MONGODB_URI=mongodb+srv://Dheesh:123dheesh@cluster0.8hscqcq.mongodb.net/awp-mini-proj?retryWrites=true&w=majority
```

### 5. **Check Database User Permissions**

1. MongoDB Atlas → **Database Access**
2. Find user **"Dheesh"**
3. Make sure it has:
   - **Atlas admin** OR
   - **Read and write to any database**

## Quick Fix Steps:

1. ✅ **Whitelist your IP** in Network Access
2. ✅ **Restart your Next.js server**: `npm run dev`
3. ✅ **Try making a booking** again
4. ✅ **Check the success page** to see if data is saved

## Still Not Working?

1. **Check MongoDB Atlas Status**: https://status.mongodb.com
2. **Try from a different network** (mobile hotspot)
3. **Check firewall/antivirus** blocking connections
4. **Verify password** - make sure there are no extra spaces

## Test Connection Command:

```powershell
mongosh "mongodb+srv://Dheesh:123dheesh@cluster0.8hscqcq.mongodb.net/awp-mini-proj?retryWrites=true&w=majority"
```

If this works, the issue is with your Next.js app configuration.
If this fails, the issue is with MongoDB Atlas settings (IP whitelist, credentials, etc.)

