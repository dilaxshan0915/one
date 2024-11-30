const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const authRoutes = require("./routes/auth");
const router = require("./routes/auth");

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;

// Signup
router.post('/signup', async (req, res) => {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    users.push({ email, password: hashedPassword });
    res.status(201).send({ message: 'User registered successfully!' });
  });
  
  // Login
  router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = users.find((u) => u.email === email);
    if (!user) return res.status(400).send({ message: 'Invalid email or password' });
  
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) return res.status(400).send({ message: 'Invalid email or password' });
  
    const token = jwt.sign({ email: user.email }, 'SECRET_KEY', { expiresIn: '1h' });
    res.send({ token });
  });

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
