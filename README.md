											AI-Powered FAQ System
~Project Overview
This project is a full-stack web application developed as part of the ODIN Technologies – Developer Assessment Task.
The objective of the application is to help businesses efficiently manage Frequently Asked Questions (FAQs) and improve the quality of answers using AI assistance.
The system allows users to add, view, edit, delete, and search FAQs, along with an optional feature to rewrite answers using an AI model.
The application is designed to be simple, user-friendly, and easy to understand, while still being scalable for future enhancements.
~Features Implemented
Landing Page
Displays the project title “AI-Powered Support Knowledge Base”
Shows a short description explaining the purpose of the application
Includes a “Go to FAQ Dashboard” button for navigation
FAQ Dashboard
Displays all FAQs in a clean and structured table format
Shows Question, Answer, and Actions
Includes a search bar to filter FAQs by question text
Provides an Add FAQ button to create new entries
FAQ Management (CRUD Operations)
Add FAQ
Opens a modal with input fields for question and answer
Edit FAQ
Opens a pre-filled modal allowing updates to existing FAQs
Delete FAQ
Requires user confirmation before deletion
Validation
Both question and answer fields are mandatory before saving
AI Rewrite Feature
Available inside the Add/Edit FAQ modal
Sends the current answer to the backend for processing
Uses an AI model to rewrite the answer in a clearer and more professional tone
The rewritten content replaces the existing answer but remains editable
This feature is optional and does not affect normal CRUD operations
~Technology Stack Used
Frontend
React.js with TypeScript
Axios for API communication
Inline CSS for simple and readable styling
Backend
Node.js with Express.js
RESTful API design using standard HTTP methods
~Database
SQLite database
Prisma ORM for database schema management and queries
AI Integration
OpenAI API for rewriting FAQ answers
Secure API key management using environment variables
Project Folder Structure
Copy code

odin/
│
├── backend/
│   ├── prisma/
│   │   └── dev.db
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   └── components/
│   │       └── Dashboard.tsx
│   └── package.json
│
├── screenshots/
│   ├── landing-page.png
│   ├── dashboard.png
│   └── add-edit-modal.png
│
├── .gitignore
└── README.md
~Backend API Endpoints
GET /faqs – Fetch all FAQs
POST /faqs – Create a new FAQ
PUT /faqs/:id – Update an existing FAQ
DELETE /faqs/:id – Delete a FAQ
POST /ai/rewrite – Rewrite an FAQ answer using AI
Environment Configuration (.env)
Create a .env file inside the backend folder with the following content:
OPENAI_API_KEY=your_openai_api_key_here
Note: The .env file is excluded from version control for security reasons.
Setup Instructions
1. Clone the Repository
Copy code

git clone <your-github-repo-url>
cd odin
2. Backend Setup
Copy code

cd backend
npm install
node server.js
The backend server will start on:
Copy code

http://localhost:5000
3. Frontend Setup
Copy code

cd frontend
npm install
npm start
The frontend application will run on:
Copy code

http://localhost:3000
Screenshots
All UI screenshots are available in the screenshots/ folder.
The screenshots demonstrate:
Landing page
FAQ dashboard
Add/Edit FAQ modal
AI rewrite feature in action
These visuals help reviewers quickly verify the working functionality of the application.
Assumptions and Notes
Authentication was not implemented, as it was not required for this task
The AI rewrite feature is optional and intended to assist users, not replace manual input
SQLite was selected for simplicity and ease of local development
The project structure allows easy extension for future features such as user authentication or deployment
Conclusion
This project fulfills all functional and technical requirements specified in the ODIN Technologies assessment task.
It demonstrates full-stack development skills, REST API design, database handling, and practical AI integration.
The codebase is intentionally kept simple, readable, and maintainable, ensuring that all implementation decisions can be clearly explained during technical discussions.


## Screenshots

Landing Page
![Landing Page](screenshots/HomePage.png)
FAQ Dashboard
![FAQ Dashboard](screenshots/FAQ_page.png)
Add / Edit /Search/Rewrite/Delete FAQ
![FAQ Modal](screenshots/editFAQ.png)
![FAQ Modal](screenshots/deleteFAQ.png)
![FAQ Modal](screenshots/addFAQ.png)
![FAQ Modal](screenshots/rewriteAI.png)
![FAQ Modal](screenshots/searchFAQ.png)


