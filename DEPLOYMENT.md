# Vitalae Deployment Guide

This guide covers deploying both the frontend and backend of the Vitalae website.

## 📁 Project Structure

- **`vitalae/`** - Backend server (Node.js/Express)
- **`vitalae-website/`** - Frontend application (HTML/CSS/JS)

## 🚀 Deployment Strategy

**Recommended Order:**
1. ✅ **Backend deployed** - `https://vitalae-backend-vjj6.onrender.com`
2. ✅ **Frontend configured** - Updated to connect to backend
3. Deploy the frontend

## 📋 Prerequisites

- Node.js 14+ installed
- Git repository set up
- Deployment platform accounts (e.g., Render, Heroku, Vercel, Netlify)

## 🔧 Backend Deployment ✅ COMPLETED

**Your backend is now live at:** `https://vitalae-backend-vjj6.onrender.com`

### Backend Status
- ✅ **Deployed on Render**
- ✅ **Health check available:** `https://vitalae-backend-vjj6.onrender.com/api/health`
- ✅ **User registration endpoint:** `https://vitalae-backend-vjj6.onrender.com/api/register`
- ✅ **Users list endpoint:** `https://vitalae-backend-vjj6.onrender.com/api/users`

### Test Your Backend
```bash
# Test health endpoint
curl https://vitalae-backend-vjj6.onrender.com/api/health

# Test user registration (replace with your data)
curl -X POST https://vitalae-backend-vjj6.onrender.com/api/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"123456"}'
```

## 🌐 Frontend Deployment

### Option 1: Vercel (Recommended)

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Deploy Frontend**
   ```bash
   # Navigate to your frontend directory
   cd vitalae-website
   
   # Deploy with Vercel
   vercel
   ```

3. **Get Frontend URL**
   - After deployment, note your frontend URL (e.g., `https://vitalae.vercel.app`)

### Option 2: Netlify

1. Go to [netlify.com](https://netlify.com)
2. Drag and drop your `vitalae-website` folder
3. Get your deployment URL

### Option 3: GitHub Pages

1. Push to GitHub
2. Enable GitHub Pages in repository settings
3. Get your deployment URL

## ⚙️ Configuration Updates

### ✅ Backend Configuration - COMPLETED
Your backend is already configured to accept requests from common frontend domains.

### ✅ Frontend Configuration - COMPLETED
Your `vitalae-website/config.js` is already updated with the correct backend URL.

## 🔍 Testing Deployment

### ✅ Backend Test
Your backend is working! Test it:
```bash
curl https://vitalae-backend-vjj6.onrender.com/api/health
```

### Frontend Test
1. **Test locally first:**
   - Open `vitalae-website/test-backend.html` in your browser
   - This will test the backend connection before deploying
   
2. **Deploy your frontend** using one of the options above
3. **Open your deployed frontend**
4. **Check browser console** for connection status
5. **Try registering a new user**

## 🚨 Common Issues & Solutions

### CORS Errors
- ✅ **Fixed**: Backend CORS is configured for common frontend domains
- If you get CORS errors, add your specific frontend domain to `vitalae/server.js`

### Database Issues
- SQLite files may not persist on Render (they reset occasionally)
- Consider using PostgreSQL for production (requires code changes)

### Environment Variables
- ✅ **Set**: `NODE_ENV=production` is configured on Render
- ✅ **Set**: `PORT` is automatically assigned by Render

## 📊 Monitoring

### Backend Monitoring
- ✅ **Render Dashboard**: Monitor logs and performance
- ✅ **Health Endpoint**: `https://vitalae-backend-vjj6.onrender.com/api/health`

### Frontend Monitoring
- Use browser dev tools to check API calls
- Monitor for JavaScript errors
- Check network tab for failed requests

## 🔄 Updates & Maintenance

### Backend Updates
1. Push changes to Git
2. Render will auto-deploy
3. Check health endpoint: `/api/health`

### Frontend Updates
1. Deploy new version to your chosen platform
2. Test user registration flow
3. Verify backend connection

## 📞 Support

If you encounter issues:
1. Check Render logs in your dashboard
2. Test backend endpoints manually
3. Check CORS configuration
4. Verify environment variables

## 🎯 Next Steps

1. **Test backend connection locally:**
   - Open `vitalae-website/test-backend.html` in your browser
   - Verify all tests pass
   
2. **Deploy your frontend** using Vercel, Netlify, or GitHub Pages
3. **Test the complete flow** - registration should work end-to-end
4. **Set up custom domains** (optional)
5. **Implement user authentication** (login functionality)
6. **Add data backup strategies**
7. **Scale database** if needed

## 🎉 Current Status

- ✅ **Backend**: Deployed and running on Render
- ✅ **Configuration**: Frontend configured to connect to backend
- ✅ **Local Testing**: Ready with test-backend.html
- 🔄 **Frontend**: Ready for deployment
- 🔄 **Testing**: Ready to test end-to-end functionality

## 🧪 Local Testing

Before deploying, test your backend connection locally:

1. **Open `vitalae-website/test-backend.html`** in your browser
2. **Click "Test Backend Connection"** - should show success
3. **Click "Test Health Endpoint"** - should show backend status
4. **Click "Test User Registration"** - should create a test user

If all tests pass, your frontend is ready for deployment!
