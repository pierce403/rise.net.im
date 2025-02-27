# Rise.net.im

A mobile app for building and maintaining local communities.

## Description

Rise.net.im is a tool for coordinating local communities, allowing users to chat, share resources, and organize community activities. The application is built as a Progressive Web App (PWA), which means it can be installed on mobile devices and accessed offline.

## Features (Stage 1)

- A landing page with a link to add the app as a PWA on mobile
- A simple chat interface
- A way to see who is online
- A way to invite others to the community

## Tech Stack

- TypeScript
- React
- Tailwind CSS
- XMTP (for decentralized messaging)

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/pierce403/rise.net.im.git
   cd rise.net.im/rise-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## Building for Production

To build the application for production, run:

```bash
npm run build
```

This will create a `dist` directory with the compiled assets.

## Deploying to Vercel

### Option 1: Deploy from the Command Line

1. Install the Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Login to Vercel:
   ```bash
   vercel login
   ```

3. Deploy the application:
   ```bash
   vercel
   ```

4. Follow the prompts to configure your deployment.

### Option 2: Deploy from the Vercel Dashboard

1. Build the application:
   ```bash
   npm run build
   ```

2. Create a new project on [Vercel](https://vercel.com).

3. Connect your GitHub repository or upload the `dist` directory.

4. Configure the following settings:
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

5. Click "Deploy" to deploy your application.

### Environment Variables

No environment variables are required for the basic functionality of the application.

## PWA Features

The application is configured as a Progressive Web App (PWA), which means it can be installed on mobile devices and accessed offline. To install the app on your mobile device:

1. Open the application in your mobile browser.
2. Tap the "Add to Home Screen" button in the application.
3. Follow the prompts to install the application.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the terms of the license included in the repository.
