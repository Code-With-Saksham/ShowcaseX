const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  id: { type: String, required: true },
  title: { type: String, default: '' },
  description: { type: String, default: '' },
  techStack: [{ type: String }],
  githubUrl: { type: String, default: '' },
  liveUrl: { type: String, default: '' },
  image: { type: String, default: '' },
  order: { type: Number, default: 0 },
});

const experienceSchema = new mongoose.Schema({
  id: { type: String, required: true },
  company: { type: String, default: '' },
  role: { type: String, default: '' },
  location: { type: String, default: '' },
  startDate: { type: String, default: '' },
  endDate: { type: String, default: '' },
  current: { type: Boolean, default: false },
  description: { type: String, default: '' },
});

const educationSchema = new mongoose.Schema({
  id: { type: String, required: true },
  institution: { type: String, default: '' },
  degree: { type: String, default: '' },
  field: { type: String, default: '' },
  startDate: { type: String, default: '' },
  endDate: { type: String, default: '' },
  description: { type: String, default: '' },
});

const achievementSchema = new mongoose.Schema({
  id: { type: String, required: true },
  title: { type: String, default: '' },
  issuer: { type: String, default: '' },
  date: { type: String, default: '' },
  description: { type: String, default: '' },
});

const certificationSchema = new mongoose.Schema({
  id: { type: String, required: true },
  title: { type: String, default: '' },
  issuer: { type: String, default: '' },
  issueDate: { type: String, default: '' },
  credentialUrl: { type: String, default: '' },
});

const skillSchema = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, default: '' },
  category: { type: String, default: 'Technical' }, // Technical, Soft, Tools, Frameworks
  level: { type: String, default: 'Advanced' },
  order: { type: Number, default: 0 },
});

const portfolioSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  title: {
    type: String,
    default: 'My Portfolio',
  },
  template: {
    type: String,
    enum: ['minimal', 'developer', 'creative'],
    default: 'minimal',
  },
  personal: {
    fullName: { type: String, default: '' },
    username: { type: String, default: '' },
    tagline: { type: String, default: '' },
    bio: { type: String, default: '' },
    location: { type: String, default: '' },
    profileImage: { type: String, default: '' },
    resumeUrl: { type: String, default: '' },
  },
  social: {
    github: { type: String, default: '' },
    linkedin: { type: String, default: '' },
    twitter: { type: String, default: '' },
    email: { type: String, default: '' },
    website: { type: String, default: '' },
  },
  skills: [skillSchema],
  projects: [projectSchema],
  experience: [experienceSchema],
  education: [educationSchema],
  achievements: [achievementSchema],
  certifications: [certificationSchema],
  customTheme: {
    accentColor: { type: String, default: '#6366f1' }, // Deep indigo default accent
    darkTheme: { type: Boolean, default: false },
    fontSize: { type: String, default: 'normal' },
  },
  isPublic: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

portfolioSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Portfolio', portfolioSchema);
