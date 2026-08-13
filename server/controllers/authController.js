const User = require('../models/User');
const Portfolio = require('../models/Portfolio');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const getJwtSecret = () => process.env.JWT_SECRET || 'super_secret_jwt_key_portfolio_maker_2026_key';

// Register User
exports.register = async (req, res) => {
  try {
    const { name, email, username, password } = req.body;

    if (!name || !email || !username || !password) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    const cleanUsername = username.toLowerCase().trim().replace(/[^a-z0-9_-]/g, '');
    if (!cleanUsername) {
      return res.status(400).json({ success: false, message: 'Invalid username format' });
    }

    // Check existing email or username
    const existingEmail = await User.findOne({ email: email.toLowerCase() });
    if (existingEmail) {
      return res.status(400).json({ success: false, message: 'Email is already registered' });
    }

    const existingUsername = await User.findOne({ username: cleanUsername });
    if (existingUsername) {
      return res.status(400).json({ success: false, message: 'Username is already taken' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = new User({
      name,
      email: email.toLowerCase(),
      username: cleanUsername,
      password: hashedPassword,
    });
    await user.save();

    // Create initial default portfolio for the user
    const defaultPortfolio = new Portfolio({
      user: user._id,
      title: `${name}'s Portfolio`,
      template: 'minimal',
      personal: {
        fullName: name,
        username: cleanUsername,
        tagline: 'Full Stack Developer & Creative Builder',
        bio: 'Passionate developer focused on building intuitive, high-performance web applications.',
        location: 'San Francisco, CA',
        profileImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
        resumeUrl: '',
      },
      social: {
        github: `https://github.com/${cleanUsername}`,
        linkedin: `https://linkedin.com/in/${cleanUsername}`,
        twitter: '',
        email: email,
        website: '',
      },
      skills: [
        { id: '1', name: 'JavaScript / ES6+', category: 'Technical', level: 'Advanced', order: 1 },
        { id: '2', name: 'React.js / Next.js', category: 'Frameworks', level: 'Advanced', order: 2 },
        { id: '3', name: 'Node.js / Express', category: 'Backend', level: 'Intermediate', order: 3 },
        { id: '4', name: 'MongoDB / Mongoose', category: 'Database', level: 'Intermediate', order: 4 },
        { id: '5', name: 'CSS3 / Tailwind / Responsive UI', category: 'Frontend', level: 'Advanced', order: 5 },
      ],
      projects: [
        {
          id: 'p1',
          title: 'Full-Stack Portfolio Maker',
          description: 'A web app that enables developers to build, customize, and export static portfolio sites as ZIP files.',
          techStack: ['React', 'Node.js', 'Express', 'MongoDB', 'EJS'],
          githubUrl: `https://github.com/${cleanUsername}/portfolio-maker`,
          liveUrl: '',
          image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80',
          order: 1,
        },
        {
          id: 'p2',
          title: 'AI Smart Task Planner',
          description: 'Intelligent daily task schedule visualizer with priority queues and deadline reminders.',
          techStack: ['React', 'TailwindCSS', 'Python'],
          githubUrl: `https://github.com/${cleanUsername}/ai-task-planner`,
          liveUrl: '',
          image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=600&q=80',
          order: 2,
        },
      ],
      experience: [
        {
          id: 'e1',
          company: 'Tech Innovators Inc.',
          role: 'Frontend Developer Intern',
          location: 'Remote',
          startDate: '2025-06',
          endDate: '2025-12',
          current: false,
          description: 'Developed responsive UI components, integrated REST APIs, and optimized page load performance.',
        },
      ],
      education: [
        {
          id: 'ed1',
          institution: 'University of Engineering & Tech',
          degree: 'Bachelor of Technology',
          field: 'Computer Science',
          startDate: '2023',
          endDate: '2027',
          description: 'Focused on Data Structures, Web Engineering, and Software Architecture.',
        },
      ],
      achievements: [
        {
          id: 'a1',
          title: '1st Place Hackathon Winner',
          issuer: 'TechFest 2025',
          date: '2025',
          description: 'Built a real-time collaborative dashboard in under 36 hours.',
        },
      ],
      certifications: [
        {
          id: 'c1',
          title: 'Full Stack Web Development',
          issuer: 'Meta / Coursera',
          issueDate: '2025',
          credentialUrl: '',
        },
      ],
      customTheme: {
        accentColor: '#6366f1',
        darkTheme: true,
        fontSize: 'normal',
      },
      isPublic: true,
    });
    await defaultPortfolio.save();

    // Create token
    const token = jwt.sign({ userId: user._id, username: user.username }, getJwtSecret(), {
      expiresIn: '7d',
    });

    res.status(201).json({
      success: true,
      message: 'Account created successfully',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        username: user.username,
      },
    });
  } catch (err) {
    console.error('Register error:', err);
    res.status(500).json({ success: false, message: 'Server error during registration' });
  }
};

// Login User
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password are required' });
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(400).json({ success: false, message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'Invalid email or password' });
    }

    const token = jwt.sign({ userId: user._id, username: user.username }, getJwtSecret(), {
      expiresIn: '7d',
    });

    res.json({
      success: true,
      message: 'Logged in successfully',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        username: user.username,
      },
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ success: false, message: 'Server error during login' });
  }
};

// Get current user profile
exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password');
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    res.json({ success: true, user });
  } catch (err) {
    console.error('getMe error:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
