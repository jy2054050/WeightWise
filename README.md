# Kid Weight Checker 👶⚖️

A playful, kid-friendly web application that helps parents check if their child's weight is in a healthy range according to WHO growth standards. Features a colorful interface with animations, emojis, and educational content designed specifically for families with young children (1-60 months).

## ✨ Features

- **Kid-Friendly Design**: Bright colors, animations, and playful doodles
- **Real-Time Assessment**: Input age, gender, height, and weight for instant results
- **Visual Feedback**: Interactive pie chart showing where your child fits in weight ranges
- **Educational Content**: FAQ and learning sections about child growth
- **WHO Standards**: Based on World Health Organization growth standards
- **Mobile Optimized**: Responsive design perfect for parents on-the-go

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed on your machine:
- [Node.js](https://nodejs.org/) (version 18 or higher)
- npm (comes with Node.js)

### Download the Code

You can download this project from Replit in several ways:

#### Option 1: Export as Zip (Recommended)
1. In your Replit project, click the three dots menu (⋯) in the file explorer
2. Select "Export as Zip"
3. Download and extract the zip file to your desired location

#### Option 2: Using Git (if connected)
```bash
git clone [your-replit-git-url]
cd kid-weight-checker
```

### Local Installation

1. **Navigate to the project directory:**
   ```bash
   cd kid-weight-checker
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser and visit:**
   ```
   http://localhost:5000
   ```

The application will automatically open in your default browser and you can start using it immediately!

## 🛠️ Development

### Project Structure

```
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Main application pages
│   │   ├── hooks/         # Custom React hooks
│   │   └── lib/           # Utility functions
├── server/                # Backend Express.js server
│   ├── index.ts          # Server entry point
│   ├── routes.ts         # API endpoints
│   └── storage.ts        # Data layer (in-memory)
├── shared/                # Shared types and schemas
│   └── schema.ts         # Zod validation schemas
└── README.md             # This file
```

### Available Scripts

- `npm run dev` - Start development server (frontend + backend)
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run type-check` - Run TypeScript type checking

### Technology Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS, Recharts
- **Backend**: Node.js, Express.js, TypeScript
- **Validation**: Zod schemas
- **UI Components**: Radix UI with shadcn/ui
- **Build Tool**: Vite
- **Form Handling**: React Hook Form

## 📊 How It Works

The weight assessment uses a simplified version of WHO growth standards:

1. **Base Calculation**: Uses height and age to calculate expected weight ranges
2. **Age Groups**: Different calculations for infants (0-2 years) vs young children (2-5 years)
3. **Gender Differences**: Accounts for different growth patterns between boys and girls
4. **Percentile Ranges**: Categorizes weight as underweight (<15th percentile), healthy (15th-85th percentile), or overweight (>85th percentile)

**Important**: This tool provides estimates only. Always consult healthcare professionals for medical advice.

## 🎨 Customization

### Colors
The app uses a kid-friendly color palette defined in `client/src/index.css`:
- Kid Blue: `hsl(211 100% 60%)`
- Kid Purple: `hsl(270 95% 75%)`
- Kid Pink: `hsl(340 100% 80%)`
- Kid Green: `hsl(142 76% 60%)`
- Kid Orange: `hsl(39 100% 65%)`

### Adding Content
- **FAQ Questions**: Edit the FAQ section in `client/src/pages/home.tsx`
- **Educational Content**: Update the theory section for SEO content
- **Age Range**: Modify the validation in `shared/schema.ts` (currently 1-60 months)

## 🌐 Deployment

The application is designed to work seamlessly on Replit, but can also be deployed to:
- Vercel
- Netlify  
- Heroku
- Any Node.js hosting platform

For production deployment, make sure to:
1. Set `NODE_ENV=production`
2. Configure any environment variables needed
3. Run `npm run build` to create optimized builds

## 📝 License

This project is created for educational purposes. The WHO growth standards are publicly available data used for health assessment.

## 🤝 Contributing

This is a family-friendly tool! If you'd like to improve it:
1. Focus on making it more accessible for parents
2. Add more educational content
3. Improve the visual design for children
4. Enhance mobile experience

## 📞 Support

If you need help running this locally:
1. Make sure Node.js is properly installed
2. Check that all dependencies installed correctly with `npm install`
3. Verify the development server is running on port 5000
4. Try clearing your browser cache if you see old content

---

Made with ❤️ for healthy families everywhere