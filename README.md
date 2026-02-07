# LandingPageM - Fullstack AI App Builder

A modern, fullstack application for building AI-powered mobile and web apps with InstantDB backend.

## Features

- 🎨 Modern, professional design with gradient accents
- 📱 Fully responsive layout for all devices
- ✨ Smooth animations and transitions
- 🔐 **Authentication** with email magic codes, Google OAuth, and Apple Sign-In
- 🤖 **AI-Powered App Builder** with voice input and model selection
- 📊 **User Dashboard** with project management and analytics
- 💾 **Real-time Data Sync** with InstantDB
- 📈 **Analytics Tracking** for user behavior and engagement
- 🎯 Interactive FAQ accordion
- 🚀 Call-to-action sections throughout
- 💎 Beautiful UI components

## Technology Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Backend**: InstantDB (Backend-as-a-Service)
- **Authentication**: InstantDB Auth with magic codes, Google OAuth, Apple Sign-In
- **Real-time Database**: InstantDB with live queries
- **Hosting**: Static files (can be deployed anywhere)

## Project Structure

```
/
├── index.html              # Landing page
├── dashboard.html          # User dashboard
├── app-builder.html        # AI app builder interface
├── package.json           # Project dependencies
├── instant.schema.ts      # InstantDB data schema
├── instant.perms.ts       # InstantDB permissions
├── src/
│   ├── instant.js        # InstantDB client initialization
│   └── auth.js           # Authentication helpers
├── styles/
│   ├── styles.css        # Landing page styles
│   ├── builder.css       # App builder styles
│   └── dashboard.css     # Dashboard styles
└── scripts/
    ├── script.js         # Landing page logic
    ├── builder.js        # App builder logic
    └── dashboard.js      # Dashboard logic
```

## Getting Started

### 1. InstantDB Setup

1. Go to [instantdb.com](https://www.instantdb.com) and create an account
2. Create a new app - you'll get an App ID
3. The App ID is already configured in this project: `1d7dcab3-cd11-4c0b-ad09-4b34f71c344c`

### 2. Push Schema and Permissions

```bash
# Install InstantDB CLI globally
npm install -g @instantdb/cli

# Push the schema to your InstantDB app
npx instant-cli@latest push schema

# Push the permissions
npx instant-cli@latest push perms
```

### 3. Configure OAuth (Optional)

#### Google OAuth:
1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create OAuth credentials
3. Add to InstantDB dashboard under Auth settings
4. Update the Google client ID in `scripts/script.js`

#### Apple Sign-In:
1. Go to [Apple Developer](https://developer.apple.com)
2. Create Service ID
3. Add to InstantDB dashboard under Auth settings
4. Update the Apple client ID in `scripts/script.js`

### 4. Run Locally

```bash
# Start a local server
python3 -m http.server 8000

# Or use any static file server
# The app will be available at http://localhost:8000
```

### 5. Deploy

Deploy the static files to any hosting service:
- Netlify
- Vercel
- GitHub Pages
- AWS S3 + CloudFront
- Any static hosting

## Data Schema

### Users ($users)
- email (string, unique)
- name (string)
- avatar (string)
- plan (string: free/pro/enterprise)
- createdAt (date)

### Projects
- userId (ref to $users)
- title (string)
- description (string)
- prompt (string)
- model (string: gpt5/claude/qwen/kimi)
- platforms (json: array)
- features (json: array)
- style (string)
- status (string: draft/generating/completed/failed)
- createdAt, updatedAt (date)

### Generations
- projectId (ref to projects)
- userId (ref to $users)
- code (json: generated files)
- preview (string)
- generatedAt (date)
- duration (number)
- status (string)

### Analytics
- userId (ref to $users)
- eventType (string)
- metadata (json)
- timestamp (date)

## Key Features

### Authentication
- **Magic Code Login**: Passwordless email authentication
- **Google OAuth**: Sign in with Google account
- **Apple Sign-In**: Sign in with Apple ID
- **Session Management**: Persistent login across pages
- **Protected Routes**: Dashboard and builder require authentication

### Dashboard
- **Projects Grid**: View all your projects with thumbnails
- **Stats Overview**: Total projects, generations, completed apps
- **Search & Filter**: Find projects by name, status, date
- **Real-time Updates**: Live sync with database changes
- **Quick Actions**: Edit, delete, or open projects

### App Builder
- **AI Model Selection**: Choose from GPT-5, Claude, Qwen 3 Coder, Kimi K2
- **Platform Targeting**: Build for iOS, Android, and/or Web
- **Feature Configuration**: Add auth, database, API, payments, etc.
- **Voice Input**: Describe your app using voice commands
- **Auto-save**: Projects automatically save as drafts
- **Real-time Generation**: Track build progress with live updates
- **Project Management**: Save, load, and update projects

### Analytics
- Track user login/logout events
- Monitor project creation and updates
- Record app generation completion
- Track feature usage and engagement

## Permissions

Projects, generations, and analytics are scoped to individual users:
- Users can only view/edit their own projects
- Users can only access their own generations
- Users can only view their own analytics
- All operations require authentication

## Development

### Adding New Features

1. **Update Schema** (`instant.schema.ts`):
   - Add new entities or attributes
   - Define relationships
   - Push changes: `npx instant-cli@latest push schema`

2. **Update Permissions** (`instant.perms.ts`):
   - Define access rules
   - Set field-level permissions
   - Push changes: `npx instant-cli@latest push perms`

3. **Update Frontend**:
   - Add UI components
   - Integrate with InstantDB queries
   - Track analytics events

### Testing

1. Test authentication flows (email, Google, Apple)
2. Verify project CRUD operations
3. Test real-time updates
4. Validate permissions
5. Test on mobile devices
6. Cross-browser compatibility

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

**Note**: Voice input requires Chrome/Edge (uses Web Speech API)

## Troubleshooting

### Authentication Issues
- Clear browser cache and cookies
- Check InstantDB dashboard for auth errors
- Verify OAuth credentials are correct
- Ensure redirect URIs match your domain

### Database Issues
- Check browser console for errors
- Verify InstantDB App ID is correct
- Ensure schema is pushed to InstantDB
- Check permissions are configured correctly

### Real-time Sync Issues
- Check network connection
- Verify InstantDB is online
- Check browser console for WebSocket errors

## Environment Variables

For production deployment, you may want to use environment variables:

```bash
INSTANT_APP_ID=1d7dcab3-cd11-4c0b-ad09-4b34f71c344c
GOOGLE_CLIENT_ID=your-google-client-id
APPLE_CLIENT_ID=your-apple-client-id
```

## Security

- All data is scoped to authenticated users
- Permissions enforced at database level
- OAuth tokens handled securely by InstantDB
- HTTPS required for production
- CORS configured through InstantDB dashboard

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

All rights reserved © 2026 LandingPageM

## Support

For issues or questions:
- Check InstantDB documentation: https://www.instantdb.com/docs
- Review the code comments
- Check browser console for errors

## Roadmap

- [ ] Payment integration (Stripe)
- [ ] Team collaboration features
- [ ] Advanced analytics dashboard
- [ ] Code export to GitHub
- [ ] Deploy to hosting providers
- [ ] Mobile app for iOS/Android
- [ ] Real AI model integration
- [ ] Template marketplace
- [ ] Version history for projects
- [ ] Comments and feedback system

---

Built with ❤️ using InstantDB
