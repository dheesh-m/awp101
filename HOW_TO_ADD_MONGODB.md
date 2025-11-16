# 📍 Where and How to Add MongoDB Connection

## Step 1: Create the `.env.local` File

**Location:** Create the file in the **root folder** of your project (same folder where `package.json` is located)

**Your project path:** `C:\Users\ASUS\OneDrive\Desktop\awp mini proj\`

**File name:** `.env.local` (exactly this name, including the dot at the start)

## Step 2: Add Your MongoDB Connection String

Open `.env.local` in any text editor and add these lines:

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority
MONGODB_DB=awp-mini-proj
```

## Step 3: Replace with Your Actual Connection String

Replace the example connection string with your real MongoDB connection string.

### If using MongoDB Atlas (Cloud):
1. Go to https://www.mongodb.com/cloud/atlas
2. Sign up/Login
3. Create a free cluster
4. Click "Connect" → "Connect your application"
5. Copy the connection string
6. Replace `<password>` with your actual password
7. Replace `<database>` with `awp-mini-proj` (or your preferred name)

**Example:**
```env
MONGODB_URI=mongodb+srv://myuser:mypassword123@cluster0.abc123.mongodb.net/awp-mini-proj?retryWrites=true&w=majority
MONGODB_DB=awp-mini-proj
```

### If using Local MongoDB:
```env
MONGODB_URI=mongodb://localhost:27017
MONGODB_DB=awp-mini-proj
```

## Step 4: Save and Restart

1. **Save** the `.env.local` file
2. **Stop** your dev server (Ctrl+C if running)
3. **Restart** with: `npm run dev`

## 📁 File Structure

Your project should look like this:

```
awp mini proj/
├── .env.local          ← CREATE THIS FILE HERE
├── package.json
├── next.config.mjs
├── app/
├── components/
├── lib/
└── ... (other files)
```

## ⚠️ Important Notes

- ✅ The file must be named exactly `.env.local` (with the dot)
- ✅ It must be in the root folder (same as `package.json`)
- ✅ Never commit this file to git (it's already in `.gitignore`)
- ✅ Restart your server after creating/modifying the file
- ✅ No spaces around the `=` sign
- ✅ No quotes needed around the values

## 🧪 Test It

After adding the connection string:

1. Restart: `npm run dev`
2. Go to: http://localhost:3000/booking
3. Fill out a booking form
4. Submit it
5. Check: http://localhost:3000/booking/success
6. You should see your booking count and recent bookings!

## ❌ Common Mistakes

- ❌ Wrong location (not in root folder)
- ❌ Wrong filename (`.env` instead of `.env.local`)
- ❌ Forgot to restart server
- ❌ Wrong connection string format
- ❌ Password not URL-encoded (if it has special characters)

## 🆘 Still Not Working?

1. Check the terminal/console for error messages
2. Verify your connection string is correct
3. Make sure MongoDB Atlas IP whitelist includes your IP (or 0.0.0.0/0 for testing)
4. Verify your database user has read/write permissions

