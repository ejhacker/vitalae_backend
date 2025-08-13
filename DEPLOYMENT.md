# Vitalae Deployment Guide

This guide covers deploying both the frontend and backend of the Vitalae website.

## 🚀 Deployment Strategy

**Recommended Order:**
1. Deploy the backend first
2. Update frontend configuration with backend URL
3. Deploy the frontend

## 📋 Prerequisites

- Node.js 14+ installed
- Git repository set up
- Deployment platform accounts (e.g., Render, Heroku, Vercel, Netlify)

## 🔧 Backend Deployment

### Option 1: Render (Recommended for beginners)

1. **Create Render Account**
   - Go to [render.com](https://render.com) and sign up

2. **Deploy Backend**
   - Click "New +" → "Web Service"
   - Connect your Git repository
   - Set build command: `npm install`
   - Set start command: `npm start`
   - Set environment variables:
     - `NODE_ENV`: `production`
     - `PORT`: `10000` (or let Render assign automatically)

3. **Get Backend URL**
   - After deployment, note your backend URL (e.g., `https://vitalae-backend.onrender.com`)

### Option 2: Heroku

1. **Install Heroku CLI**
   ```bash
   npm install -g heroku
   ```

2. **Deploy**
   ```bash
   heroku create vitalae-backend
   git push heroku main
   heroku config:set NODE_ENV=production
   ```

### Option 3: Railway

1. Go to [railway.app](https://railway.app)
2. Connect your repository
3. Deploy automatically

## 🌐 Frontend Deployment

### Option 1: Vercel (Recommended)

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Update Configuration**
   - Edit `config.js` and replace `https://your-backend-domain.com` with your actual backend URL
   - Example: `https://vitalae-backend.onrender.com`

3. **Deploy**
   ```bash
   vercel
   ```

### Option 2: Netlify

1. Go to [netlify.com](https://netlify.com)
2. Drag and drop your frontend folder
3. Update `config.js` with backend URL

### Option 3: GitHub Pages

1. Push to GitHub
2. Enable GitHub Pages in repository settings
3. Update `config.js` with backend URL

## ⚙️ Configuration Updates

### Backend Configuration

Before deploying, update `server.js`:

```javascript
// Update CORS origin for production
origin: NODE_ENV === 'production' 
    ? ['https://your-frontend-domain.com'] // Replace with actual frontend URL
    : ['http://localhost:3000', 'http://127.0.0.1:3000']
```

### Frontend Configuration

Update `config.js`:

```javascript
production: {
    apiBaseUrl: 'https://your-actual-backend-url.com', // Replace with your backend URL
    environment: 'production'
}
```

## 🔍 Testing Deployment

### Backend Health Check
```bash
curl https://your-backend-url.com/api/health
```

### Frontend Test
1. Open your deployed frontend
2. Check browser console for connection status
3. Try registering a new user

## 🚨 Common Issues & Solutions

### CORS Errors
- Ensure backend CORS origin includes your frontend domain
- Check that both URLs use HTTPS in production

### Database Issues
- SQLite files may not persist on some platforms
- Consider using PostgreSQL for production (requires code changes)

### Environment Variables
- Ensure `NODE_ENV=production` is set on backend
- Check that all required environment variables are configured

## 📊 Monitoring

### Backend Monitoring
- Use platform-specific monitoring (Render, Heroku, etc.)
- Check logs regularly
- Monitor database performance

### Frontend Monitoring
- Use browser dev tools to check API calls
- Monitor for JavaScript errors
- Check network tab for failed requests

## 🔄 Updates & Maintenance

### Backend Updates
1. Push changes to Git
2. Platform will auto-deploy (if configured)
3. Check health endpoint: `/api/health`

### Frontend Updates
1. Update `config.js` if backend URL changes
2. Deploy new version
3. Test user registration flow

## 📞 Support

If you encounter issues:
1. Check platform-specific logs
2. Verify environment variables
3. Test API endpoints manually
4. Check CORS configuration

## 🎯 Next Steps

After successful deployment:
1. Set up custom domains (optional)
2. Configure SSL certificates
3. Set up monitoring and alerts
4. Plan for database scaling
5. Implement user authentication
6. Add data backup strategies
