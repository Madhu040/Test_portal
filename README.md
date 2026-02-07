# LandingPageM

A modern, responsive landing page for an AI-powered mobile and web app builder.

## Features

- 🎨 Modern, professional design with gradient accents
- 📱 Fully responsive layout for all devices
- ✨ Smooth animations and transitions
- 🔐 Login modal with Google and Apple Sign-In integration
- 🤖 **AI-Powered App Builder** with voice input and model selection
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
├── index.html      # Main landing page
├── app-builder.html # AI app builder interface
├── styles.css      # Landing page styling
├── builder.css     # App builder styling
├── script.js       # Landing page interactions
├── builder.js      # App builder functionality
├── .gitignore      # Git ignore rules
└── README.md       # This file
```

## Sections

### Landing Page (`index.html`)
- **Hero** - Eye-catching header with animated preview
- **Features** - Highlighting key capabilities
- **Examples** - Showcase of different app types
- **How It Works** - 3-step process explanation
- **Pricing** - Transparent pricing plans
- **FAQ** - Common questions and answers
- **CTA** - Multiple conversion points
- **Login Modal** - Secure authentication with Google & Apple Sign-In

### App Builder (`app-builder.html`)
- **AI Model Selection** - Choose from GPT-5, Claude, Qwen 3 Coder, or Kimi K2
- **Platform Selection** - Build for iOS, Android, and/or Web
- **Feature Options** - Add authentication, database, API, payments, etc.
- **Style Customization** - Select from multiple design themes
- **Prompt Input** - Describe your app in natural language
- **Voice Input** - Use voice commands to describe your app (Chrome/Edge)
- **Example Prompts** - Quick start templates for common app types
- **Real-time Generation** - See progress as AI builds your app
- **Preview & Download** - View generated app summary and download code

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

## App Builder

The app builder (`app-builder.html`) provides a comprehensive interface for AI-powered app generation:

### Features:

1. **AI Model Selection:**
   - GPT-5 (Most powerful, best for complex apps)
   - Claude Sonnet (Excellent reasoning, great for UIs)
   - Qwen 3 Coder (Fast coding, optimized performance)
   - Kimi K2 (Balanced speed and quality)

2. **Platform Targets:**
   - iOS (React Native)
   - Android (React Native)
   - Web (React/Vue/vanilla JS)

3. **Built-in Features:**
   - User Authentication
   - Database Integration
   - REST API
   - Real-time Updates
   - Payment Integration
   - Push Notifications

4. **Input Methods:**
   - Text prompt with character counter
   - Voice input (Chrome/Edge only - uses Web Speech API)
   - Example prompts for quick start

5. **Generation Process:**
   - Real-time progress tracking
   - Stage-by-stage status updates
   - Visual progress bar
   - Preview of generated app structure

### Using Voice Input:

The voice input feature uses the browser's built-in speech recognition:
- Only works in Chrome, Edge, and other Chromium-based browsers
- Click the microphone icon to start/stop recording
- Speak naturally - the AI will transcribe and add to your prompt
- Works best in a quiet environment

### Example Prompts:

The builder includes pre-written examples for:
- **Fitness Apps** - Workout tracking, goals, social features
- **Finance Apps** - Expense tracking, budgets, charts
- **Social Networks** - Profiles, groups, chat, feeds
- **E-commerce** - Product browsing, cart, checkout, reviews

## License

All rights reserved © 2026 LandingPageM
