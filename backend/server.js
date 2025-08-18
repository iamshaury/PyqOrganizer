const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const multer = require('multer');
const pdf = require('pdf-parse');
const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

// --- Initializations ---
const app = express();
const PORT = process.env.PORT || 5000;

// Initialize Google Generative AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// --- Middleware ---
app.use(cors());
app.use(express.json());

// Multer setup for file uploads (in-memory storage)
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// --- Database Connection ---
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected successfully.'))
  .catch(err => console.error('MongoDB connection error:', err));

// --- Mongoose Schema and Model for User ---
const UserSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});
const User = mongoose.model('User', UserSchema);

// --- Authentication Middleware ---
const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Authorization token is required.' });
    }
    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Add user payload to request
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid or expired token.' });
    }
};

// --- API Routes ---

// User Registration Route
app.post('/api/users/register', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required.' });
    }
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User with this email already exists.' });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new User({ email, password: hashedPassword });
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully.' });
    } catch (error) {
        res.status(500).json({ message: 'Server error during registration.', error: error.message });
    }
});

// User Login Route
app.post('/api/users/login', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required.' });
    }
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials.' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials.' });
        }
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Server error during login.', error: error.message });
    }
});

// PYQ Organizer Route (Protected)
app.post('/api/organize', authMiddleware, upload.array('pyqs', 5), async (req, res) => {
    if (!req.files || req.files.length === 0) {
        return res.status(400).json({ message: 'No PDF files uploaded.' });
    }
    if (!req.body.syllabus) {
        return res.status(400).json({ message: 'Syllabus is required.' });
    }

    try {
        let combinedPdfText = '';

        // 1. Loop through each file, extract text, and combine it.
        for (const file of req.files) {
            const data = await pdf(file.buffer);
            combinedPdfText += data.text + '\n\n--- END OF PAPER ---\n\n';
        }

        // 2. Prepare the prompt for Gemini with the combined text
        const prompt = `
            You are an expert academic assistant. Your task is to analyze the text from several question papers and categorize each question according to the provided syllabus.

            **Syllabus:**
            ${req.body.syllabus}

            **Combined Question Paper Text:**
            ${combinedPdfText}

            **Instructions:**
            1. Read through the entire combined text from all papers.
            2. Identify every distinct question. Do not include duplicate questions.
            3. For each question, determine which unit from the syllabus it belongs to.
            4. If a question doesn't fit any unit, place it in a category named "Miscellaneous".
            5. Return the result as a single, valid JSON object. The keys of the object should be the unit names from the syllabus, and the values should be an array of strings, where each string is a unique question belonging to that unit.
            
            **Example JSON Output:**
            {
              "Unit 1: Thermodynamics": ["Question A...", "Question B..."],
              "Unit 2: Optics": ["Question C..."],
              "Miscellaneous": ["Question D..."]
            }

            Now, provide the JSON output for the given syllabus and combined question paper text.
        `;
        
        // 3. Call Gemini API
        const result = await model.generateContent(prompt);
        const response = result.response;
        let text = response.text();

        // 4. Clean and parse the JSON response
        const jsonMatch = text.match(/\{[\s\S]*\}/);

        if (jsonMatch && jsonMatch[0]) {
            try {
                const jsonString = jsonMatch[0];
                const organizedData = JSON.parse(jsonString);
                res.json(organizedData);
            } catch (parseError) {
                console.error('JSON parsing error:', parseError);
                res.status(500).json({ message: 'Failed to parse the AI response.', error: parseError.message });
            }
        } else {
             res.status(500).json({ message: 'No valid JSON object found in the AI response.' });
        }

    } catch (error) {
        console.error('Error in /api/organize:', error);
        res.status(500).json({ message: 'Failed to process the PDF.', error: error.message });
    }
});


// --- Start Server ---
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
