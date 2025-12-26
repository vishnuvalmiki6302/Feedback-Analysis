# 📊 Machine Reading of Customer Feedback
## Complete Project Documentation & Workflow

**Project Title:** Machine Reading of Customer Feedback  
**Objective:** Create software that automates reading and analyzing customer feedback for improved insights and decision-making  
**Technology Stack:** React, Node.js, Express, MongoDB, Natural Language Processing

---

## 🎯 Executive Summary

This system automates the collection, analysis, and management of customer feedback using advanced Natural Language Processing (NLP) technology. It provides real-time sentiment analysis, topic detection, emotion recognition, and urgency classification to help organizations make data-driven decisions.

---

## 📋 Complete List of Changes & Features

### **1. Real NLP Analysis System** ✅

**Before:** Simple keyword matching (just checking if words like "good" or "bad" exist)  
**After:** Advanced NLP using professional libraries

**New Capabilities:**
- ✅ **Sentiment Analysis** - Context-aware sentiment detection with scoring (-5 to +5)
- ✅ **Keyword Extraction** - TF-IDF based extraction of meaningful terms
- ✅ **Topic Detection** - Automatically categorizes feedback into 7 topics:
  - Product Quality
  - Customer Service
  - Pricing
  - Delivery
  - Website/App Issues
  - Billing
  - Features
- ✅ **Emotion Detection** - Identifies happy, sad, angry, or neutral emotions
- ✅ **Urgency Classification** - Detects low, medium, or high priority issues
- ✅ **Language Detection** - Supports English, Spanish, French, German
- ✅ **Toxicity Detection** - Identifies inappropriate content
- ✅ **Intelligent Summarization** - Auto-generates concise summaries

**Technology:** `natural` library + `sentiment` library

---

### **2. Dual Access System** ✅

#### **A. Public Feedback Portal** (`/feedback`)
- ✅ No authentication required
- ✅ Customer-friendly interface
- ✅ Direct feedback submission
- ✅ Real-time NLP analysis on submission
- ✅ Professional design with clear call-to-action

#### **B. Admin Dashboard** (`/`)
- ✅ Secure authentication required
- ✅ Comprehensive analytics
- ✅ Manual feedback entry capability
- ✅ Advanced filtering and search
- ✅ CSV export functionality

---

### **3. Professional Authentication System** ✅

**Features:**
- ✅ Email + Password registration
- ✅ Secure password hashing (bcrypt)
- ✅ OTP (One-Time Password) verification via email
- ✅ JWT (JSON Web Token) for session management
- ✅ Refresh token support
- ✅ Rate limiting on OTP requests
- ✅ Token expiration for security

**Security:**
- Passwords never stored in plain text
- OTP expires after 10 minutes
- Rate limiting prevents abuse
- Secure token-based authentication

---

### **4. Enhanced Analytics Dashboard** ✅

**KPI Cards:**
- Total feedback count
- Average rating
- Sentiment distribution (positive/neutral/negative)
- Top keywords extracted
- Top tags used

**Filtering System:**
- Filter by sentiment
- Filter by channel (web, email, chat, store, phone)
- Filter by product/service
- Filter by status (open/resolved)
- Filter by date range
- Full-text search
- Filter by tags

**Feedback Display:**
- Shows all NLP insights:
  - Sentiment badge with score
  - Urgency indicator
  - Emotion tag
  - Detected topics
  - Extracted keywords
  - Auto-generated summary
  - Customer information

---

### **5. Data Management** ✅

- ✅ MongoDB database with optimized indexes
- ✅ CSV export (only for authenticated users)
- ✅ Efficient text search
- ✅ Timestamp tracking
- ✅ Status management (open/resolved)

---

## 🔄 Complete Workflow

### **WORKFLOW 1: Customer Feedback Submission**

```
┌─────────────────────────────────────────────────────────────┐
│ STEP 1: Customer Visits Public Feedback Page               │
│ URL: http://localhost:5173/feedback                         │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│ STEP 2: Customer Fills Feedback Form                       │
│ • Name (optional)                                           │
│ • Email (optional)                                          │
│ • Rating (1-5)                                              │
│ • Feedback Text (required)                                  │
│ • Product/Service (optional)                                │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│ STEP 3: Customer Submits Feedback                          │
│ POST /api/feedback                                          │
│ Body: { text, rating, customerName, customerEmail, ... }   │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│ STEP 4: Backend NLP Analysis (Automatic)                   │
│ • Sentiment Analysis → positive/neutral/negative           │
│ • Sentiment Score → -5 to +5                                │
│ • Keyword Extraction → top 10 keywords                      │
│ • Topic Detection → product quality, service, etc.           │
│ • Emotion Detection → happy/sad/angry/neutral              │
│ • Urgency Detection → low/medium/high                      │
│ • Language Detection → en/es/fr/de                         │
│ • Toxicity Check → 0 to 1 score                             │
│ • Summary Generation → concise summary                      │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│ STEP 5: Data Stored in MongoDB                              │
│ Collection: feedbacks                                       │
│ Document includes:                                          │
│ • Original feedback text                                    │
│ • All NLP analysis results                                  │
│ • Customer information                                      │
│ • Timestamps                                                │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│ STEP 6: Success Confirmation                                │
│ Customer sees: "Thank you! Your feedback has been          │
│ submitted and analyzed."                                   │
└─────────────────────────────────────────────────────────────┘
```

---

### **WORKFLOW 2: Admin Dashboard Access**

```
┌─────────────────────────────────────────────────────────────┐
│ STEP 1: Admin Visits Dashboard                              │
│ URL: http://localhost:5173/                                │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│ STEP 2: Admin Sees Login Page                              │
│ Options:                                                    │
│ • Sign Up (if new user)                                     │
│ • Login (if existing user)                                 │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│ STEP 3A: Sign Up (New User)                                │
│ POST /api/auth/signup                                       │
│ Body: { email, password }                                   │
│ → Backend creates user account                              │
│ → Password hashed with bcrypt                               │
│ → User saved to MongoDB (users collection)                  │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│ STEP 3B: Login (Existing User)                              │
│ POST /api/auth/login                                        │
│ Body: { email, password }                                   │
│ → Backend verifies password                                 │
│ → If correct: Generates 6-digit OTP                        │
│ → OTP stored in user document (expires in 10 min)          │
│ → OTP sent to user's email via SMTP                         │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│ STEP 4: Admin Receives OTP Email                           │
│ Email contains:                                             │
│ • 6-digit code                                              │
│ • Expiration time (10 minutes)                             │
│ • Security notice                                           │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│ STEP 5: Admin Enters OTP                                    │
│ POST /api/auth/verify-otp                                   │
│ Body: { email, code }                                       │
│ → Backend verifies OTP:                                    │
│   • Checks if code matches                                  │
│   • Checks if not expired                                   │
│   • If valid: Clears OTP from database                       │
│   • Generates JWT access token                              │
│   • Generates refresh token                                 │
│ → Returns tokens to frontend                                │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│ STEP 6: Frontend Stores Token                              │
│ • Access token saved in localStorage                       │
│ • Token included in all API requests                        │
│ • Dashboard becomes visible                                 │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│ STEP 7: Dashboard Loads Data                               │
│ Frontend makes API calls:                                   │
│ • GET /api/feedback → All feedback entries                  │
│ • GET /api/feedback/stats → Analytics                       │
│ Headers: { Authorization: Bearer <token> }                  │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│ STEP 8: Admin Sees Dashboard                               │
│ • KPI Cards (total, avg rating, sentiments)                 │
│ • Filter Bar (sentiment, channel, product, etc.)           │
│ • Feedback List (with all NLP insights)                     │
│ • Export CSV button                                         │
│ • Logout button                                             │
└─────────────────────────────────────────────────────────────┘
```

---

### **WORKFLOW 3: Admin Manual Feedback Entry**

```
┌─────────────────────────────────────────────────────────────┐
│ STEP 1: Admin Logged In                                     │
│ Dashboard visible with all features                         │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│ STEP 2: Admin Fills Feedback Form                          │
│ • Customer Name                                             │
│ • Customer Email                                            │
│ • Customer ID (optional)                                    │
│ • Feedback Text                                             │
│ • Rating (1-5)                                              │
│ • Channel (web/email/chat/store/phone)                      │
│ • Product/Service                                           │
│ • Feature (optional)                                       │
│ • Tags (comma-separated)                                    │
│ • Status (open/resolved)                                    │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│ STEP 3: Admin Submits                                      │
│ POST /api/feedback                                          │
│ Headers: { Authorization: Bearer <token> }                  │
│ Body: { text, rating, customerName, ... }                    │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│ STEP 4: Backend Analyzes (Same as Customer Flow)           │
│ All NLP analysis runs automatically                         │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│ STEP 5: Data Saved & Dashboard Refreshes                   │
│ • New feedback appears in list                             │
│ • Stats update automatically                                │
│ • All NLP insights visible                                  │
└─────────────────────────────────────────────────────────────┘
```

---

### **WORKFLOW 4: Analytics & Filtering**

```
┌─────────────────────────────────────────────────────────────┐
│ STEP 1: Admin Applies Filters                               │
│ Options:                                                     │
│ • Sentiment: positive/negative/neutral                      │
│ • Channel: web/email/chat/store/phone                       │
│ • Product: specific product name                            │
│ • Status: open/resolved                                     │
│ • Date Range: from/to dates                                 │
│ • Search: text search                                       │
│ • Tags: specific tags                                       │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│ STEP 2: Frontend Builds Query                              │
│ Converts filters to URL query parameters                    │
│ Example: ?sentiment=negative&channel=web&product=Mobile App │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│ STEP 3: Backend Queries MongoDB                            │
│ • Applies filters to database query                         │
│ • Uses indexes for fast retrieval                           │
│ • Returns filtered results                                   │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│ STEP 4: Dashboard Updates                                   │
│ • Feedback list shows filtered results                      │
│ • Stats recalculate based on filtered data                  │
│ • All NLP insights still visible                            │
└─────────────────────────────────────────────────────────────┘
```

---

### **WORKFLOW 5: Data Export**

```
┌─────────────────────────────────────────────────────────────┐
│ STEP 1: Admin Clicks "Export CSV"                          │
│ (Only visible when logged in)                               │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│ STEP 2: Frontend Opens Export Endpoint                      │
│ GET /api/feedback/export                                    │
│ Opens in new tab/window                                     │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│ STEP 3: Backend Generates CSV                               │
│ • Fetches all feedback (up to 2000 records)                 │
│ • Converts to CSV format                                    │
│ • Includes all fields:                                      │
│   - Original feedback                                       │
│   - All NLP analysis results                                │
│   - Customer information                                    │
│   - Timestamps                                              │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│ STEP 4: CSV File Downloads                                  │
│ File: feedback_export.csv                                   │
│ Can be opened in Excel, Google Sheets, etc.                 │
└─────────────────────────────────────────────────────────────┘
```

---

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    FRONTEND (React)                         │
│  ┌──────────────────┐  ┌──────────────────┐                │
│  │  Public Page     │  │  Admin Dashboard │                │
│  │  /feedback       │  │  /               │                │
│  │  (No Auth)       │  │  (Auth Required) │                │
│  └──────────────────┘  └──────────────────┘                │
│           │                      │                           │
│           └──────────┬───────────┘                          │
│                      │                                       │
│              HTTP Requests                                  │
└──────────────────────┼───────────────────────────────────────┘
                       │
┌──────────────────────┼───────────────────────────────────────┐
│              BACKEND (Node.js + Express)                     │
│  ┌──────────────────────────────────────────┐              │
│  │         API Endpoints                     │              │
│  │  • POST /api/auth/signup                  │              │
│  │  • POST /api/auth/login                   │              │
│  │  • POST /api/auth/verify-otp              │              │
│  │  • GET  /api/feedback                     │              │
│  │  • POST /api/feedback                     │              │
│  │  • GET  /api/feedback/stats               │              │
│  │  • GET  /api/feedback/export              │              │
│  └──────────────────────────────────────────┘              │
│                       │                                      │
│  ┌────────────────────┼────────────────────┐                │
│  │                    │                    │                │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   Auth       │  │   Feedback   │  │    NLP       │      │
│  │  Controller  │  │  Controller  │  │   Service    │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
│         │                  │                    │            │
│  ┌──────┴──────┐  ┌───────┴───────┐  ┌──────────┐          │
│  │   OTP       │  │   Analysis    │  │  Token   │          │
│  │  Service    │  │   Service     │  │ Service  │          │
│  └─────────────┘  └───────────────┘  └──────────┘          │
│         │                  │                    │            │
│  ┌──────┴──────┐  ┌───────┴───────┐                        │
│  │   Mail      │  │   Natural.js  │                        │
│  │  Service    │  │  + Sentiment  │                        │
│  └─────────────┘  └───────────────┘                        │
└──────────────────────┼───────────────────────────────────────┘
                       │
┌──────────────────────┼───────────────────────────────────────┐
│              DATABASE (MongoDB Atlas)                        │
│  ┌──────────────────┐  ┌──────────────────┐                 │
│  │   users          │  │   feedbacks      │                 │
│  │  Collection      │  │   Collection     │                 │
│  │                  │  │                  │                 │
│  │  • email         │  │  • text          │                 │
│  │  • passwordHash  │  │  • sentiment     │                 │
│  │  • otpCode       │  │  • sentimentScore│                │
│  │  • otpExpiresAt  │  │  • keywords      │                 │
│  │  • role          │  │  • topics        │                 │
│  │                  │  │  • emotion      │                 │
│  │                  │  │  • urgency      │                 │
│  │                  │  │  • language     │                 │
│  │                  │  │  • toxicity     │                 │
│  │                  │  │  • summary      │                 │
│  │                  │  │  • customerInfo │                 │
│  │                  │  │  • timestamps   │                 │
│  └──────────────────┘  └──────────────────┘                 │
└───────────────────────────────────────────────────────────────┘
```

---

## 📊 Data Flow Diagram

```
CUSTOMER FEEDBACK SUBMISSION:
┌─────────┐
│Customer │
└────┬────┘
     │ 1. Submits feedback
     ↓
┌─────────────┐
│  Frontend   │  /feedback page
│  (React)    │
└──────┬──────┘
       │ 2. POST /api/feedback
       ↓
┌─────────────┐
│   Backend   │
│  (Express)  │
└──────┬──────┘
       │ 3. analyzeFeedbackText()
       ↓
┌─────────────┐
│ NLP Service │
│ (Natural +  │
│  Sentiment) │
└──────┬──────┘
       │ 4. Returns analysis
       ↓
┌─────────────┐
│  Controller │
└──────┬──────┘
       │ 5. Saves to MongoDB
       ↓
┌─────────────┐
│  MongoDB    │
│  (Atlas)    │
└─────────────┘
```

---

## 🎯 Key Benefits for Business

### **1. Automated Analysis**
- No manual reading required
- Instant insights from every feedback
- Consistent analysis across all entries

### **2. Actionable Intelligence**
- Urgency detection prioritizes critical issues
- Topic categorization groups similar feedback
- Emotion detection identifies customer satisfaction levels

### **3. Time Savings**
- Real-time processing
- Automatic categorization
- Quick filtering and search

### **4. Data-Driven Decisions**
- Comprehensive analytics
- Trend identification
- Export capabilities for reporting

### **5. Scalability**
- Handles thousands of feedback entries
- Efficient database queries
- Cloud-ready architecture

---

## 🔐 Security Features

1. **Password Security**
   - Bcrypt hashing (industry standard)
   - Never stored in plain text

2. **OTP Verification**
   - Time-limited (10 minutes)
   - Rate limiting prevents abuse
   - Email-based delivery

3. **Token Management**
   - JWT with expiration
   - Refresh token support
   - Secure storage

4. **Access Control**
   - Public page for customers (read-only submission)
   - Admin dashboard requires authentication
   - Export only for authenticated users

---

## 📈 Technical Specifications

### **Frontend:**
- React 18.3.1
- Vite 5.0.0
- Tailwind CSS 3.4.13
- React Router DOM 6.26.0

### **Backend:**
- Node.js
- Express 4.22.1
- MongoDB 7.8.8 (via Mongoose)
- Natural.js 6.12.0 (NLP)
- Sentiment.js 5.0.2 (Sentiment Analysis)

### **Database:**
- MongoDB Atlas (Cloud)
- Collections: `users`, `feedbacks`
- Indexed for performance

---

## 🚀 Deployment Ready

- ✅ Environment-based configuration
- ✅ Error handling
- ✅ Input validation
- ✅ Rate limiting
- ✅ CORS configuration
- ✅ Production-ready code structure

---

## 📝 Presentation Points

1. **Problem Solved:** Manual feedback analysis is time-consuming and inconsistent
2. **Solution:** Automated NLP-based analysis system
3. **Technology:** Modern stack with real NLP libraries
4. **Features:** Dual access, comprehensive analytics, secure authentication
5. **Benefits:** Time savings, actionable insights, scalable solution
6. **Future:** Ready for enhancements (charts, AI recommendations, integrations)

---

**This system is production-ready and demonstrates professional software development practices with real-world applicability.**



