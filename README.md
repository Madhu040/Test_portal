# LandingPageM

A modern, responsive landing page for an AI-powered mobile and web app builder.

## Features

- 🎨 Modern, professional design with gradient accents
- 📱 Fully responsive layout for all devices
- ✨ Smooth animations and transitions
- 🔐 Login modal with Google and Apple Sign-In integration
- 🎯 Interactive FAQ accordion
- 🚀 Call-to-action sections throughout
- 💎 Beautiful UI components

## Technology Stack

- HTML5
- CSS3 (with custom properties and animations)
- Vanilla JavaScript (no dependencies)

## Getting Started

### Running Locally

1. Clone the repository
2. Navigate to the project directory
3. Start a local server:

```bash
python3 -m http.server 8000
```

4. Open your browser and visit `http://localhost:8000`

## Project Structure

```
.
├── index.html      # Main HTML file
├── styles.css      # All styling and responsive design
├── script.js       # Interactive functionality
├── .gitignore      # Git ignore rules
└── README.md       # This file
```

## Sections

- **Hero** - Eye-catching header with animated preview
- **Features** - Highlighting key capabilities
- **Examples** - Showcase of different app types
- **How It Works** - 3-step process explanation
- **Pricing** - Transparent pricing plans
- **FAQ** - Common questions and answers
- **CTA** - Multiple conversion points
- **Login Modal** - Secure authentication with Google & Apple Sign-In

## Authentication

The login feature includes:

- **Google Sign-In** - OAuth integration ready
- **Apple Sign-In** - Apple ID authentication ready
- **Email/Password** - Traditional login form
- **Remember Me** - Optional persistent login
- **Forgot Password** - Password recovery link

### Setting Up Authentication (Production)

To enable authentication in production, you'll need to:

1. **Google OAuth:**
   - Get a Client ID from [Google Cloud Console](https://console.cloud.google.com)
   - Configure OAuth consent screen
   - Add authorized redirect URIs
   - Update the Google login handler in `script.js`

2. **Apple Sign-In:**
   - Register for [Apple Developer Program](https://developer.apple.com)
   - Create a Service ID in Certificates, Identifiers & Profiles
   - Configure domains and return URLs
   - Update the Apple login handler in `script.js`

3. **Backend API:**
   - Set up authentication endpoints (`/api/login`, `/api/register`, etc.)
   - Implement JWT or session-based authentication
   - Add password hashing and security measures
   - Configure CORS and security headers

## License

All rights reserved © 2026 LandingPageM
