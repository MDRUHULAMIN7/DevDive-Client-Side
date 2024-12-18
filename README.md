
# DevDive - Developer Community Platform

live-link : https://devdive1.netlify.app/
server-side-repo: https://github.com/MDRUHULAMIN7/Dev-Dive-Server-Side

Welcome to **DevDive**! This project is a developer-centric platform designed to foster a collaborative environment for developers through real-time problem-solving, knowledge sharing, and mentorship. DevDive supports premium features like mentor access, an integrated AI chatbot, a live code editor, and interactive notifications, creating a rich ecosystem for developers to grow and connect.
**DevDive** is built to empower developers by offering a range of tools and social features that enhance learning, networking, and development practices. With unique capabilities like real-time chat with mentors, a responsive code editor, and cross-platform post sharing, DevDive provides an all-in-one solution for developer engagement and productivity.

## Key Features

- **Real-Time Posts**: View and interact with new posts instantly.
- **Like/Dislike System**: React to posts with likes or dislikes.
- **Content Filtering**: Filter content by tags for easy navigation.
- **Comment System**: Engage in discussions by adding comments.
- **Follow & Notifications**: Follow users and receive notifications on new activities.
- **Search Functionality**: Find posts and topics easily.
- **Polling System**: Participate in community polls.
- **Leaderboard**: Track top contributors and popular posts.
- **Payment Gateway Integration**: SSLCommerz payment system for secure premium upgrades.
- **Real-Time Chats & Video Meetings**: Communicate with mentors or other users.
- **Code Editor**: Write and test HTML, CSS, and JavaScript code with live previews.
- **DevAI Chatbot**: Get instant answers and support with our AI-driven assistant.

---

## Technology Stack

- **Frontend**: React, Redux, Tailwind CSS, Framer Motion
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: Firebase
- **Payment Gateway**: SSLCommerz
- **Video Meetings**: ZegoCloud
- **AI Chatbot**: Gemini API (for DevAI)

---

## Team Contributions

### Ruhul Amin
- Developed the **Payment System** and **Mentor Panel**
- Integrated **SSLCommerz** for secure transactions.
- Enabled **Live Chat & Video Meeting** capabilities.

### Fardus Hassan
- Worked on **Responsive Design** and **Infinite Scrolling**.
- Implemented backend data-fetching for popular data display.
- Fixed bugs and handled Git merge conflicts.

### Adnan Shirage
- Built the **Code Editor** for HTML, CSS, and JavaScript with a live preview feature.

### Nifat Hossain
- Implemented **Follower Notifications** for increased user engagement.
- **Post Details Page** and **Comment Section** of Posts

### Firoz Nur
- Designed a **Responsive Footer**, managed admin **Reports**, and optimized data performance.
- Enhanced the **Signup Experience** with an animated modal.

### Sanjida Akter
- Refined **UI/UX** and prepared team documentation for presentations.

---

## Getting Started

To get started with DevDive, follow these steps to set up the project locally.

### Prerequisites

- **Node.js** (version 16 or higher)
- **MongoDB** (locally or via MongoDB Atlas)
- **Firebase Account** (for authentication setup)
- **SSLCommerz Account** (for payment system setup)

### Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/your-username/DevDive.git
   cd DevDive
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Set Up Environment Variables**
    for env files contact us.
   Create a `.env` file in the root directory and add the following keys:
   ```plaintext
   MONGODB_URI=<your_mongodb_uri>
   FIREBASE_API_KEY=<your_firebase_api_key>
   SSL_COMMERZ_API_KEY=<your_sslcommerz_key>
   GEMINI_API_KEY=<your_gemini_api_key>
   ```

5. **Run the Development Server**
   ```bash
   npm start
   ```

6. **Navigate to the Platform**
   Open [http://localhost:3000](http://localhost:5000) in your browser to view the project.

---

## Folder Structure

```
DevDive/
├── src/
│   ├── assets/          # Images, icons, and other assets
│   ├── components/      # Reusable UI components
│   ├── context/         # Context providers for global state
│   ├── pages/           # Application pages (Dashboard, Profile, etc.)
│   ├── services/        # API services and utility functions
│   ├── styles/          # Global styles and theme settings
│   ├── App.js           # Main App component
│   └── index.js         # Entry point
├── public/              # Static files and index.html
├── .env                 # Environment variables
├── .gitignore           # Files and folders ignored by Git
├── package.json         # Project dependencies and scripts
└── README.md            # Project documentation
```

## Deployment


1. **Build the Project**
   ```bash
   npm run build
   ```

2. **Deploy to Netlify.


