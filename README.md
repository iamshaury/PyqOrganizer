# 📚 PYQ Organizer

> **AI-Powered Question Paper Organization System**

A modern web application that uses artificial intelligence to automatically organize Previous Year Questions (PYQs) from PDF files according to your course syllabus. Built with a beautiful dark theme and intuitive user interface.

![PYQ Organizer](https://img.shields.io/badge/Status-Active-brightgreen)
![React](https://img.shields.io/badge/React-18.2.0-blue)
![Node.js](https://img.shields.io/badge/Node.js-Latest-green)
![Tailwind](https://img.shields.io/badge/Tailwind-CSS-blue)

## ✨ Features

### 🎯 **Core Functionality**
- **AI-Powered Organization**: Automatically categorizes questions by syllabus units
- **PDF Processing**: Upload multiple PDF question papers at once
- **Smart Parsing**: Extracts and processes questions from complex PDF layouts
- **Unit-wise Grouping**: Questions organized according to your course structure

### 🎨 **Modern UI/UX**
- **Dark Theme**: Beautiful gradient design with purple-pink accents
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Drag & Drop**: Intuitive file upload with visual feedback
- **Smooth Animations**: Polished transitions and micro-interactions
- **Glassmorphism**: Modern backdrop blur effects throughout

### 🔐 **User Management**
- **Secure Authentication**: JWT-based login system
- **User Registration**: Easy account creation process
- **Session Management**: Persistent login sessions

### 📱 **Interactive Components**
- **Collapsible Accordions**: Expandable question sections by unit
- **Scrollable Content**: Smooth scrolling with custom styled scrollbars
- **File Management**: Easy file selection and removal
- **Loading States**: Beautiful loading animations during processing

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **MongoDB** (for backend database)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/iamshaury/PyqOrganizer.git
   cd PyqOrganizer
   ```

2. **Install Backend Dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install Frontend Dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Environment Setup**
   
   Create `.env` file in the backend directory:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   PORT=5000
   ```

5. **Start the Application**
   
   **Backend** (Terminal 1):
   ```bash
   cd backend
   npm start
   ```
   
   **Frontend** (Terminal 2):
   ```bash
   cd frontend
   npm run dev
   ```

6. **Access the Application**
   
   Open your browser and navigate to `http://localhost:5173`

## 🛠️ Tech Stack

### **Frontend**
- **React 18.2.0** - Modern UI library
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client for API requests
- **Vite** - Fast build tool and dev server

### **Backend**
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **JWT** - JSON Web Tokens for authentication
- **Multer** - File upload middleware

### **AI/ML Integration**
- **PDF Processing** - Extract text from PDF files
- **Natural Language Processing** - Question categorization
- **Machine Learning** - Intelligent content organization

## 📁 Project Structure

```
PyqOrganizer/
├── frontend/                 # React frontend application
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   │   ├── auth/         # Authentication components
│   │   │   ├── organizer/    # Main app components
│   │   │   ├── ui/           # Base UI components
│   │   │   └── icons/        # SVG icon components
│   │   ├── utils/            # Utility functions
│   │   ├── App.jsx           # Main app component
│   │   └── main.jsx          # App entry point
│   ├── public/               # Static assets
│   └── package.json          # Frontend dependencies
├── backend/                  # Node.js backend API
│   ├── routes/               # API route handlers
│   ├── models/               # Database models
│   ├── middleware/           # Custom middleware
│   ├── utils/                # Backend utilities
│   └── package.json          # Backend dependencies
└── README.md                 # Project documentation
```

## 🎯 Usage

### **Step 1: Authentication**
- Register a new account or login with existing credentials
- Secure JWT-based authentication system

### **Step 2: Upload Syllabus**
- Enter your course syllabus with unit-wise breakdown
- Example format:
  ```
  Unit 1: Thermodynamics
  Unit 2: Optics
  Unit 3: Quantum Mechanics
  ```

### **Step 3: Upload PDFs**
- Drag and drop PDF files or browse to select
- Support for multiple files simultaneously
- Real-time file validation and preview

### **Step 4: AI Processing**
- Click "Organize Questions" to start AI processing
- Watch the beautiful loading animation while AI works
- Questions are automatically categorized by units

### **Step 5: Review Results**
- Browse organized questions in collapsible sections
- Each unit shows question count and expandable content
- Smooth scrolling through long question lists

## 🎨 Design Features

### **Color Palette**
- **Primary**: Purple to Pink gradients (`from-purple-600 to-pink-600`)
- **Background**: Dark gradients (`from-gray-900 via-gray-800 to-black`)
- **Cards**: Semi-transparent gray with backdrop blur
- **Text**: White primary, gray secondary tones

### **Typography**
- **Font**: Inter (system fallbacks included)
- **Hierarchy**: Clear heading and body text distinction
- **Readability**: Optimized line heights and spacing

### **Animations**
- **Fade-in**: Smooth component entrance animations
- **Hover Effects**: Interactive button and card states
- **Loading Spinners**: Custom purple-themed loading indicators
- **Accordion Transitions**: Smooth expand/collapse animations

## 🔧 Development

### **Available Scripts**

**Frontend:**
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

**Backend:**
```bash
npm start            # Start production server
npm run dev          # Start development server with nodemon
```

### **Code Style**
- **ESLint** configuration for consistent code quality
- **Prettier** integration for code formatting
- **Component-based architecture** for maintainability

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Shaury** - [@iamshaury](https://github.com/iamshaury)

## 🙏 Acknowledgments

- Thanks to the React and Node.js communities
- Tailwind CSS for the amazing utility framework
- All contributors who help improve this project

---

<div align="center">
  <strong>Made with ❤️ for students and educators</strong>
</div>
