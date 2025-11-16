# MongoDB Setup Guide

## Quick Setup

1. **Create a `.env.local` file** in the root of your project (same directory as `package.json`)

2. **Add your MongoDB connection string:**

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority
MONGODB_DB=awp-mini-proj
```

## Getting a MongoDB Connection String

### Option 1: MongoDB Atlas (Cloud - Recommended)

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Sign up for a free account
3. Create a new cluster (free tier available)
4. Click "Connect" → "Connect your application"
5. Copy the connection string
6. Replace `<password>` with your database user password
7. Replace `<database>` with your database name (or leave it to use the default)

### Option 2: Local MongoDB

If you have MongoDB installed locally:

```env
MONGODB_URI=mongodb://localhost:27017
MONGODB_DB=awp-mini-proj
```

## Connection String Format

- **Atlas (Cloud):** `mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority`
- **Local:** `mongodb://localhost:27017` or `mongodb://127.0.0.1:27017`

## Security Notes

- **Never commit `.env.local` to git** - it's already in `.gitignore`
- Keep your MongoDB password secure
- For production, use environment variables in your hosting platform (Vercel, etc.)

## Testing the Connection

After setting up `.env.local`:

1. Restart your development server: `npm run dev`
2. Try making a booking
3. Check the `/booking/success` page to see if bookings are being saved

## Troubleshooting

### "Missing MONGODB_URI" Error
- Make sure `.env.local` exists in the project root
- Restart your dev server after creating/modifying `.env.local`
- Check that the file doesn't have any syntax errors

### Connection Timeout
- Check your internet connection
- Verify the connection string is correct
- For Atlas: Make sure your IP is whitelisted in Network Access
- For Atlas: Check that your database user has proper permissions

### Authentication Failed
- Verify your username and password are correct
- Make sure special characters in password are URL-encoded
- Check that the database user exists and has read/write permissions

## Features

Once connected, the app will:
- ✅ Save all bookings to MongoDB
- ✅ Display total booking count on success page
- ✅ Show recent bookings with name, email, and phone
- ✅ Persist data across server restarts

