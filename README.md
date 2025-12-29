# Task Manager

A modern, minimal task management application built with React. Features a clean SaaS-style design with an indigo/blue gradient color scheme.

## Features

- ✨ Create, edit, and delete tasks
- 🎯 Set task priorities (Low, Medium, High)
- 📊 Track task status (Pending, In Progress, Completed)
- 🔍 Filter tasks by status
- 💾 Persistent storage using localStorage
- 📱 Fully responsive design
- ♿ Accessible with high contrast colors

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm start
```

Runs the app in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### Build

```bash
npm run build
```

Builds the app for production to the `build` folder.

### Deploy to GitHub Pages

1. Update the `homepage` field in `package.json` with your GitHub Pages URL:
   ```json
   "homepage": "https://yourusername.github.io/task-manager"
   ```

2. Create a new repository on GitHub

3. Initialize git and push your code:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/task-manager.git
   git push -u origin main
   ```

4. Deploy to GitHub Pages:
   ```bash
   npm run deploy
   ```

Your app will be live at `https://yourusername.github.io/task-manager`

## Design System

### Color Palette

- **Primary**: Indigo/Blue gradient (#4f46e5 to #6366f1)
- **Success**: Emerald green (#10b981)
- **Warning**: Amber (#f59e0b)
- **Error**: Red (#ef4444)
- **Background**: Light gray (#f5f7fb)

### Components

- `Navbar` - Gradient header with branding
- `TaskCard` - Individual task display with priority indicator
- `Button` - Reusable button with multiple variants
- `Modal` - Form modal for creating/editing tasks
- `StatusBadge` - Visual status indicator

## License

MIT
