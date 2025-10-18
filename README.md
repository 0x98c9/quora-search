# 🔍 Quora Search Builder

A modern, minimal web application for building advanced Google search queries to find specific Quora questions. Built with React, TypeScript, and Tailwind CSS.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/React-18-61dafb.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6.svg)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38bdf8.svg)

## 🎯 Overview

Quora Search Builder is a powerful tool that helps you create sophisticated Google search queries to discover relevant Quora questions. Whether you're doing content research, market analysis, or SEO work, this tool streamlines the process of finding exactly the questions you need.

## ✨ Features

### Core Functionality
- 🔧 **Pattern Selection** - Pre-built question patterns organized by category:
  - **How** - how do, how does, how to, how can
  - **Can** - can I, can you, can we
  - **What** - what is, what are, what does, what can
  - **Is/Are** - is it, is there, are there
  - **Has/Does/Anyone** - has anyone, does anyone, has it, does it
  - **Where** - where is, where can, where do
- 🎯 **Custom Patterns** - Add your own comma-separated question patterns
- 🏷️ **Topic Filtering** - Filter by Quora space or topic
- 🔑 **Keyword Search** - Include additional keywords to refine results

### Advanced Filters
- 🔍 **Date Range Filters** - Find questions from specific time periods:
  - Past 24 hours
  - Past week
  - Past month
  - Past year
  - Any time (default)
- 📊 **Sort Options** - Order results by:
  - Relevance (default)
  - Most recent
- 👁️ **Filter Indicators** - Visual badges show active filters in real-time

### User Experience
- 🎨 **Modern UI Design** - Clean, minimal interface with:
  - Glassmorphic cards with backdrop blur effects
  - Smooth animations and transitions
  - Gradient accents and modern color palette
  - Responsive 4-column pattern grid on desktop
- 🌓 **Dark Mode** - Beautiful dark theme with full support
- � **One-Click Copy** - Copy generated queries instantly to clipboard
- 🚀 **Direct Search** - Open Google search in a new tab with one click
- 💾 **Auto-Save** - Automatically saves your configuration to localStorage
- 📱 **Responsive Design** - Optimized for mobile, tablet, and desktop
- ⚡ **Real-time Preview** - Live query preview updates as you make changes

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
- **Glassmorphic Cards** - Translucent cards with backdrop blur effects for a modern, layered look
- **Gradient Accents** - Beautiful gradient backgrounds on buttons and selected items
  - Indigo to blue gradients for primary actions
  - Purple to pink gradients for custom sections
  - Amber to orange accents for warnings/notifications
- **Smooth Animations** - Fade-in effects, hover states, and micro-interactions throughout
- **Interactive Chips** - Selectable pattern chips with gradient backgrounds when active
- **Enhanced Typography** - Inter font family for clean, professional appearance
- **Visual Feedback** - Clear states for all interactive elements with hover/active/focus styles
- **Responsive Grid Layout** - Pattern chips display in optimized columns:
  - 2 columns on mobile (< 640px)
  - 3 columns on tablet (640px - 1024px)
  - 4 columns on desktop (> 1024px)

### Dark Mode
Toggle between light and dark themes with a single click. The dark mode features:
- Optimized contrast ratios for readability
- Adapted glassmorphic effects with darker overlays
- Consistent color palette across all elements
- Smooth transition between themes
- Preference saved to localStorage

## 📖 How to Use

### Basic Usage
1. **Select Question Patterns** 
   - Click on pattern groups (How, What, Can, etc.)
   - Select specific patterns you want to search for
   - Patterns are displayed in a 4-column grid on desktop for easy selection
   - Each group shows a counter of selected patterns (e.g., "2/4")

2. **Add Topic (Optional)** 
   - Enter a Quora space or topic in the first input field
   - Example: "Artificial Intelligence", "Digital Marketing", "Productivity"

3. **Add Custom Patterns (Optional)** 
   - Include additional comma-separated patterns in the "Custom Patterns" field
   - Example: "how about", "what about", "why not"

4. **Add Keywords (Optional)** 
   - Enter any additional keywords to refine your search
   - Example: "machine learning", "startup ideas", "remote work"

5. **Apply Advanced Filters (Optional)** 
   - Click "Advanced Filters" to expand the filter section
   - **Date Range**: Choose from Past 24 hours, week, month, year, or any time
   - **Sort By**: Select relevance or most recent
   - Active filters are displayed with badges in both the filter section and preview area

6. **Preview Query** 
   - View the generated Google search query in real-time
   - See active filter badges if filters are applied
   - Review before searching to ensure accuracy

7. **Search or Copy** 
   - Click **"Search on Google"** to open the query in a new browser tab
   - Click **"Copy Query"** to copy the query to your clipboard

### Example Workflows

#### Example 1: Content Research
**Goal**: Find recent "how to" questions about AI
- **Topic**: `Artificial Intelligence`
- **Patterns**: Select "how to", "how can", "how do"
- **Custom Keyword**: `machine learning`
- **Advanced Filters**: 
  - Date range: "Past month"
  - Sort: "Most recent"
- **Result**: Google search for recent Quora questions about AI and machine learning

#### Example 2: Market Research
**Goal**: Find what people are asking about startups
- **Topic**: `Startups`
- **Patterns**: Select "what is", "what are", "how do"
- **Custom Patterns**: `what should`
- **Advanced Filters**: Date range = "Past week"
- **Result**: Recent questions about starting and running businesses

#### Example 3: Competitor Analysis
**Goal**: Find questions in your niche
- **Topic**: `Your niche topic`
- **Patterns**: Select multiple from different categories
- **Custom Keyword**: `Your product/service category`
- **Advanced Filters**: Sort = "Most recent"
- **Result**: Latest questions you can answer to build authority

## 🛠️ Tech Stack

- **React 18** - UI library with hooks
- **TypeScript** - Type safety and better developer experience
- **Vite** - Lightning-fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework for rapid UI development
- **@tailwindcss/forms** - Form styling plugin for consistent input designs
- **localStorage API** - Client-side state persistence

### Key Dependencies
```json
{
  "react": "^18.3.1",
  "typescript": "~5.6.2",
  "vite": "^7.1.10",
  "tailwindcss": "^3.4.17"
}
```

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

### Theme Colors
Customize the color scheme in `tailwind.config.cjs`:
```js
colors: {
  primary: {
    DEFAULT: '#6366F1',  // Indigo
    600: '#4F46E5',
    700: '#4338CA',
  },
}
```

### Question Patterns
Add or modify question patterns in `App.tsx`:
```typescript
const PATTERN_GROUPS: PatternGroup[] = [
  { 
    id: 'how', 
    label: 'How', 
    options: ['how do', 'how does', 'how to', 'how can'] 
  },
  // Add more pattern groups...
]
```

### Date Filters
Customize date filter options in `App.tsx`:
```typescript
const DATE_FILTERS = [
  { id: 'any', label: 'Any time', value: '' },
  { id: 'day', label: 'Past 24 hours', value: 'qdr:d' },
  // Add more date ranges...
]
```

### Grid Layout
Adjust the responsive grid columns for pattern display:
```jsx
// In App.tsx, modify the className:
<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
  // Change numbers to adjust columns per breakpoint
</div>
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

### How to Contribute
1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines
- Follow the existing code style and conventions
- Write clear, descriptive commit messages
- Test your changes thoroughly before submitting
- Update documentation for any new features
- Ensure the app works in both light and dark modes

## 🐛 Bug Reports & Feature Requests

Found a bug or have a feature request? Please open an issue on GitHub with:
- Clear description of the issue/feature
- Steps to reproduce (for bugs)
- Expected vs actual behavior
- Screenshots if applicable
- Browser and OS information

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Built with [Vite](https://vitejs.dev/) - Next generation frontend tooling
- Styled with [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- Icons from [Heroicons](https://heroicons.com/) - Beautiful hand-crafted SVG icons
- Font: [Inter](https://rsms.me/inter/) by Rasmus Andersson - Highly legible variable font
- Inspired by the need for better Quora content discovery

## � Project Stats

- **Lines of Code**: ~600+ (TypeScript/TSX)
- **Components**: Single-page application with modular sections
- **Patterns**: 24 pre-built question patterns across 6 categories
- **Filters**: 5 date range options + 2 sort options
- **Responsive Breakpoints**: 3 (mobile, tablet, desktop)

## 🔮 Future Enhancements

Potential features for future releases:
- Export/Import query configurations
- Query history and favorites
- Keyboard shortcuts
- Multiple site search (beyond Quora)
- Query templates library
- Analytics dashboard
- Browser extension

## �📧 Contact

Project Link: [https://github.com/0x98c9/quora-search](https://github.com/0x98c9/quora-search)

## ⭐ Show Your Support

If you find this tool useful, please consider giving it a star on GitHub!

---

Made with ❤️ for better Quora searches | © 2025
