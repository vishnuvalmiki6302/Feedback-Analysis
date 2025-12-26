# 📊 Complete Data Flow Explanation

## 🎯 Two Different Groups of People

### 1. **App Users (Authenticated)**
- **Who**: Analysts, managers, admins who need to view/manage feedback
- **What they do**: 
  - Sign up / Login with email + password + OTP
  - Access the dashboard
  - Submit feedback entries (manually entering customer feedback)
  - View analytics, filter, export data

### 2. **Customers (Not Authenticated)**
- **Who**: Your actual customers who give feedback about your product/service
- **What they do**: 
  - They DON'T log into this app
  - Their feedback is RECORDED by app users
  - Their info (name, email, ID) is stored in the feedback record

---

## 🔄 Complete Data Flow

### **AUTHENTICATION FLOW** (For App Users)

```
1. User visits app → Sees login page
   ↓
2. User clicks "Sign Up"
   POST /api/auth/signup
   Body: { email, password }
   ↓
3. Backend creates User in MongoDB
   - Hashes password with bcrypt
   - Saves to "users" collection
   ↓
4. User clicks "Login"
   POST /api/auth/login
   Body: { email, password }
   ↓
5. Backend checks password
   - If correct → Generates 6-digit OTP
   - Stores OTP in User document (otpCode, otpExpiresAt)
   - Sends OTP via email
   ↓
6. User enters OTP code
   POST /api/auth/verify-otp
   Body: { email, code }
   ↓
7. Backend verifies OTP
   - If valid → Clears OTP from database
   - Returns JWT access token + refresh token
   ↓
8. Frontend saves token in localStorage
   - Shows dashboard
   - All API calls include: Authorization: Bearer <token>
```

### **FEEDBACK SUBMISSION FLOW** (App User enters Customer Feedback)

```
1. Authenticated app user fills feedback form
   - Customer name, email, ID (the actual customer)
   - Feedback text, rating, channel, product, etc.
   ↓
2. Frontend sends request
   POST /api/feedback
   Headers: { Authorization: Bearer <token> }
   Body: {
     text: "Great product!",
     rating: 5,
     customerName: "John Doe",
     customerEmail: "john@example.com",
     channel: "web",
     product: "Mobile App"
   }
   ↓
3. Backend receives request
   - (Currently NO auth check - anyone can submit)
   - Runs analysis on feedback text:
     * Sentiment (positive/negative/neutral)
     * Keywords extraction
     * Language detection
     * Toxicity check
     * Summary generation
   ↓
4. Backend saves to MongoDB
   - Creates Feedback document in "feedbacks" collection
   - Stores customer info + analysis results
   ↓
5. Frontend refreshes data
   - Fetches updated feedback list
   - Updates stats/analytics
```

### **FEEDBACK VIEWING FLOW** (App User views dashboard)

```
1. Authenticated app user opens dashboard
   ↓
2. Frontend loads data
   GET /api/feedback/stats
   GET /api/feedback?sentiment=positive&channel=web
   Headers: { Authorization: Bearer <token> }
   ↓
3. Backend queries MongoDB
   - Aggregates stats (totals, sentiments, top tags)
   - Filters feedback by query params
   ↓
4. Frontend displays
   - KPI cards (total, avg rating, sentiment breakdown)
   - Filter bar
   - Feedback list with all customer entries
```

---

## 🗄️ Database Collections

### **users** collection
```javascript
{
  _id: ObjectId,
  email: "analyst@company.com",      // App user's email
  passwordHash: "$2b$10$...",         // Hashed password
  phone: "+1234567890",                // Optional
  role: "user",                        // Default role
  otpCode: "123456",                   // Current OTP (if any)
  otpExpiresAt: ISODate,              // OTP expiry time
  otpRequestedAt: ISODate,            // When OTP was sent
  otpAttempts: 0,                      // Failed attempts
  createdAt: ISODate,
  updatedAt: ISODate
}
```

### **feedbacks** collection
```javascript
{
  _id: ObjectId,
  text: "Great product!",              // Customer's feedback text
  rating: 5,                           // Customer's rating
  customerName: "John Doe",            // Actual customer's name
  customerEmail: "john@example.com",    // Actual customer's email
  customerId: "CUST123",               // Customer ID (optional)
  channel: "web",                      // Where feedback came from
  product: "Mobile App",               // Product name
  feature: "Checkout",                 // Feature name
  tags: ["billing", "onboarding"],    // Tags
  status: "open",                      // open/resolved
  sentiment: "positive",              // Auto-analyzed
  keywords: ["great", "product"],     // Auto-extracted
  language: "en",                      // Auto-detected
  toxicity: false,                    // Auto-checked
  summary: "Customer satisfied...",   // Auto-generated
  createdAt: ISODate,
  updatedAt: ISODate
}
```

---

## 🔐 Current Security Status

### ✅ Protected (Requires Auth)
- **Dashboard access**: Frontend checks for token before showing UI
- **API calls**: Frontend sends token in headers (but backend doesn't verify yet)

### ⚠️ Not Protected (Currently Open)
- **Feedback endpoints**: Anyone can POST/GET feedback without auth
- **Stats endpoint**: Anyone can view analytics

### 💡 To Add Protection
You would need to:
1. Add `authMiddleware` to feedback routes
2. Verify JWT token on each request
3. Reject requests without valid token

---

## 📝 Example Scenarios

### Scenario 1: New Analyst Joins
```
1. Analyst signs up: email="analyst@company.com", password="secure123"
2. Backend creates User account
3. Analyst logs in → Gets OTP via email → Enters code
4. Analyst gets access token → Sees dashboard
5. Analyst can now view all customer feedback
```

### Scenario 2: Recording Customer Feedback
```
1. Analyst (logged in) receives customer complaint via email
2. Analyst opens dashboard → Fills feedback form:
   - Customer: "Sarah Smith" (sarah@example.com)
   - Text: "App crashes when I click checkout"
   - Rating: 2
   - Channel: "email"
   - Product: "Mobile App"
3. Backend analyzes: sentiment="negative", keywords=["crashes", "checkout"]
4. Feedback saved to database
5. Dashboard shows new entry with analysis
```

### Scenario 3: Viewing Analytics
```
1. Manager (logged in) opens dashboard
2. Frontend fetches:
   - GET /api/feedback/stats → Shows totals, sentiment breakdown
   - GET /api/feedback → Shows all feedback entries
3. Manager filters by:
   - Sentiment: "negative"
   - Product: "Mobile App"
4. Sees only negative feedback for mobile app
5. Exports to CSV for report
```

---

## 🎯 Key Points to Remember

1. **Authentication = App Users** (analysts, managers)
2. **Feedback = Customer Data** (stored by app users)
3. **Two separate things**: The person logging in ≠ The customer giving feedback
4. **Current state**: Auth exists but feedback endpoints are open (can be protected later)
5. **OTP flow**: Email-based, stored in User document, cleared after verification

---

## 🔧 Files Involved

### Backend
- `src/models/User.js` - App user schema
- `src/models/Feedback.js` - Customer feedback schema
- `src/controllers/authController.js` - Signup/login/OTP logic
- `src/controllers/feedbackController.js` - CRUD for feedback
- `src/services/otpService.js` - OTP generation/verification
- `src/services/mailService.js` - Email sending
- `src/services/tokenService.js` - JWT token handling

### Frontend
- `src/App.jsx` - Main app (shows login or dashboard)
- `src/components/AuthPanel.jsx` - Login/signup/OTP forms
- `src/components/FeedbackForm.jsx` - Form to enter customer feedback
- `src/components/FeedbackList.jsx` - Display all customer feedback
- `src/components/InsightCards.jsx` - Analytics cards

---

This should clarify the complete data flow! 🚀

