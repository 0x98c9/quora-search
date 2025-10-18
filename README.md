# 🔍 Quora Search Builder

A modern, minimal web application for building advanced Google search queries to find specific Quora questions. Built with React, TypeScript, and Tailwind CSS.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/React-18-61dafb.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6.svg)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38bdf8.svg)

## ✨ Features

- 🎨 **Modern UI Design** - Clean, minimal interface with glassmorphic effects and smooth animations
- 🌓 **Dark Mode** - Beautiful dark theme with full support
- 🔧 **Pattern Selection** - Pre-built question patterns (How, What, Can, Is, Where, etc.)
- 🎯 **Custom Patterns** - Add your own comma-separated question patterns
- 🏷️ **Topic Filtering** - Filter by Quora space or topic
- 🔑 **Keyword Search** - Include additional keywords to refine results
- 📋 **One-Click Copy** - Copy generated queries instantly
- 🚀 **Direct Search** - Open Google search in a new tab with one click
- 💾 **Auto-Save** - Automatically saves your state to localStorage
- 📱 **Responsive Design** - Works seamlessly on all devices

## 🎯 Use Cases

- **Content Research** - Find Quora questions related to specific topics for content ideas
- **Market Research** - Discover what people are asking about your industry
- **SEO Research** - Find question-based keywords for content optimization
- **Competitor Analysis** - Research questions in your niche
- **Link Building** - Find relevant Quora questions to answer with your content

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/0x98c9/quora-search.git
cd quora-search-tool
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## 🎨 UI Features

### Modern Design Elements
- **Glassmorphic Cards** - Translucent cards with backdrop blur effects
- **Gradient Accents** - Beautiful gradient backgrounds and buttons
- **Smooth Animations** - Fade-in effects and micro-interactions
- **Interactive Chips** - Selectable pattern chips with hover states
- **Enhanced Typography** - Inter font for clean, professional look
- **Visual Feedback** - Clear states for all interactive elements

### Dark Mode
Toggle between light and dark themes with a single click. The dark mode features:
- Optimized contrast for readability
- Adapted glassmorphic effects
- Consistent color palette across all elements

## 📖 How to Use

1. **Select Question Patterns** - Click on pattern groups (How, What, Can, etc.) and select specific patterns
2. **Add Topic (Optional)** - Enter a Quora space or topic to filter results
3. **Add Custom Patterns** - Include additional comma-separated patterns in the "Custom Patterns" field
4. **Add Keywords** - Enter any additional keywords to refine your search
5. **Preview Query** - View the generated Google search query in real-time
6. **Search or Copy** - Click "Search on Google" to open the query or "Copy Query" to copy it to clipboard

### Example Usage

**Finding AI-related questions:**
- Topic: `Artificial Intelligence`
- Patterns: Select "what is", "how does", "how to"
- Custom Keyword: `machine learning`
- Result: `site:quora.com "Artificial Intelligence" "machine learning" ("what is" OR "how does" OR "how to")`

## 🛠️ Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **@tailwindcss/forms** - Form styling plugin

## 📁 Project Structure

```
quora-search-tool/
├── public/             # Static assets
├── src/
│   ├── App.tsx        # Main application component
│   ├── App.css        # App-specific styles
│   ├── index.css      # Global styles and Tailwind
│   ├── main.tsx       # Application entry point
│   └── assets/        # Images and icons
├── index.html         # HTML template
├── package.json       # Dependencies and scripts
├── tailwind.config.cjs # Tailwind configuration
├── tsconfig.json      # TypeScript configuration
└── vite.config.ts     # Vite configuration
```

## 🎨 Customization

### Colors
Customize the color scheme in `tailwind.config.cjs`:
```js
colors: {
  primary: {
    DEFAULT: '#6366F1',
    600: '#4F46E5',
    700: '#4338CA',
  },
}
```

### Patterns
Add or modify question patterns in `App.tsx`:
```typescript
const PATTERN_GROUPS: PatternGroup[] = [
  { id: 'how', label: 'How', options: ['how do', 'how does', 'how to'] },
  // Add more patterns...
]
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Built with [Vite](https://vitejs.dev/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Icons from [Heroicons](https://heroicons.com/)
- Font: [Inter](https://rsms.me/inter/) by Rasmus Andersson

## 📧 Contact

Project Link: [https://github.com/0x98c9/quora-search](https://github.com/0x98c9/quora-search)

---

Made with ❤️ for better Quora searches
