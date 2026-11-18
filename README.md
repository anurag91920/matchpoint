 Coy Discover – Swipe-Based Matchmaking App

A mobile-first Discover experience inspired by modern swipe-based social and matchmaking applications.

 Features

- Discover profiles with photos, bios, interests, city and college information.
- Swipe right to Like and left to Pass.
- Like and Pass actions are also available through desktop buttons.
- Swiped profiles do not reappear in the feed.
- A mutual Like creates a Match.
- Match confirmation screen.
- Matches page showing mutual matches only.
- Persistent swipe and match data using MongoDB.
- Responsive interface for mobile, tablet and desktop.

 Tech Stack

Frontend**
- React
- Vite
- Tailwind CSS
- Framer Motion

**Backend**
- Node.js
- Express.js
- MongoDB
- Mongoose

Project Structure

```text
matchpoint/
├── client/       # React frontend
└── server/       # Express backend, models, routes and seed data
```

API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/feed` | Fetch available profiles |
| POST | `/swipe` | Save Like or Pass action |
| GET | `/matches` | Fetch mutual matches |

 Getting Started

 1. Clone the repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
cd matchpoint
```

 2. Start the backend

```bash
cd server
npm install
```

Create a `.env` file inside the server folder:

```env
MONGO_URI=your_mongodb_connection_string
PORT=5000
```

Start the backend:

```bash
npm run dev
```

### 3. Start the frontend

Open another terminal:

```bash
cd client
npm install
npm run dev
```

Open the local URL shown by Vite, usually:

```text
http://localhost:5173
```

 Database Setup

Configure your MongoDB connection string in `server/.env`. Run the project's seed script to insert the mock profiles before testing, using the seed command configured in the server project.

## Assignment Notes

This project demonstrates a standalone Discover experience with swipe interactions, mutual matching, API integration and persistent data storage.

Authentication and payment functionality are outside the scope of this prototype.

---

**Developer:** Anurag Chaurasiya  
**GitHub:** https://github.com/anurag91920
