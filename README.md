# Flannery 360 Excavator Training App

A mobile-first web application for 360° excavator operator training, built with React and Tailwind CSS.

## 🚀 Features

- **Mobile-First Design** - Optimized for mobile devices with responsive sidebar navigation
- **Interactive Training Modules** - Comprehensive learning content covering safety, operations, and techniques
- **Progress Tracking** - Visual progress indicators and completion status
- **Knowledge Checks** - Interactive quizzes to test understanding
- **Collapsible Sections** - Expandable content for better mobile navigation
- **Search Functionality** - Quick search through training content
- **Safety Focus** - Emphasizes OperateSAFE principles throughout

## 🛠️ Tech Stack

- **React 18** - Modern React with hooks and functional components
- **Tailwind CSS** - Utility-first CSS framework for rapid UI development
- **Lucide React** - Beautiful & consistent icon toolkit
- **Mobile-First Design** - Responsive design optimized for mobile devices

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd flannery-training-app
   ```

2. **Run the setup script**
   ```bash
   ./setup.sh
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

## 🎯 Available Scripts

- `npm start` - Start the development server
- `npm run build` - Build the app for production
- `npm test` - Run tests
- `npm run eject` - Eject from Create React App (one-way operation)

## 📁 Project Structure

```
flannery-training-app/
├── public/
│   └── index.html
├── src/
│   ├── App.js (FlanneryTrainingApp component)
│   ├── index.js
│   └── index.css
├── package.json
├── tailwind.config.js
├── postcss.config.js
├── setup.sh
└── README.md
```

## 🎨 Design System

### Colors
- **Primary**: Orange (`#f97316` - `#7c2d12`)
- **Success**: Green (`#10b981`)
- **Warning**: Amber (`#f59e0b`)
- **Info**: Blue (`#3b82f6`)
- **Neutral**: Gray scale (`#f9fafb` - `#111827`)

### Typography
- **Font Family**: Inter (Google Fonts)
- **Weights**: 300, 400, 500, 600, 700

### Components
- **Sidebar Navigation** - Collapsible mobile-friendly navigation
- **Cards** - Consistent card design with shadows and rounded corners
- **Buttons** - Primary and secondary button styles
- **Progress Indicators** - Visual progress tracking
- **Knowledge Checks** - Interactive quiz components

## 📱 Training Modules

### Dashboard
- Progress overview with completion tracking
- Safety reminders and quick actions
- Training objectives overview

### Introduction to 360 Excavator
- Machine overview and description
- Training objectives and learning outcomes
- Basic safety principles

### Health & Safety Legislation
- Health and Safety at Work Act 1974
- PUWER 98 Regulations
- Key responsibilities and requirements

### Major Components
- Power Unit & Oils safety procedures
- Hydraulic System maintenance
- Safety Features (ROPS, FOPS, seatbelts)

### Operating Procedures
- Pre-Operational Checks
- Site Travel Configuration
- Safety protocols and procedures

### Excavation Techniques
- Different types of excavation
- Best practices and techniques
- Safety considerations

## 🔧 Configuration

### Tailwind CSS
The project uses a custom Tailwind configuration with:
- Orange color palette for Flannery branding
- Mobile-first responsive design
- Custom component classes

### Environment Variables
Create a `.env` file in the root directory for environment-specific configuration:

```env
REACT_APP_API_URL=your-api-url
REACT_APP_ENVIRONMENT=development
```

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Netlify
1. Connect your repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `build`

### Deploy to Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -am 'Add feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Email: support@flannery.com
- Documentation: [docs.flannery.com](https://docs.flannery.com)
- Issues: [GitHub Issues](https://github.com/flannery/training-app/issues)

## 🙏 Acknowledgments

- [React](https://reactjs.org/) - A JavaScript library for building user interfaces
- [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework
- [Lucide](https://lucide.dev/) - Beautiful & consistent icon toolkit

---

**Flannery Training App** - Empowering excavator operators with mobile-first training and certification. 