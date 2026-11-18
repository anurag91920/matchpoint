# Coy Discover — Swipe-Based Matchmaking App

A modern, mobile-first swipe-based discovery experience built as part of the **Coy SDE Intern Assignment**.

Coy Discover allows users to explore profiles, express interest through likes or passes, and connect when both users like each other. The application follows a privacy-first matching approach where one-sided likes are never revealed.

##  Features

###  Profile Discovery
- Explore 30+ seeded mock user profiles.
- View profile photos, names, ages, bios, locations, and interests.
- Display one profile card at a time.

###  Swipe Experience
- Swipe right to Like a profile.
- Swipe left to Pass on a profile.
- Drag gestures on mobile devices.
- Like and Pass buttons for desktop users.
- Smooth swipe animations and visual feedback.
- Previously swiped profiles never appear again.
- Friendly empty state when no profiles remain.

###  Mutual Matching
- A match is created only when both users like each other.
- Display an "It's a Match!" confirmation screen.
- Dedicated Matches section for mutual matches.
- One-sided likes remain private.

###  Data Persistence
- Store profile and swipe information in MongoDB.
- Persist likes and passes across page reloads.
- Retrieve mutual matches through backend APIs.

###  Responsive Design
- Mobile-first user interface.
- Responsive layouts for mobile, tablet, and desktop.
- Smooth interactions and clean navigation.

##  Tech Stack

| Frontend | Backend | Database |
|---|---|---|
| React.js | Node.js | MongoDB |
| Vite | Express.js | Mongoose |
| Tailwind CSS | REST APIs | |
| Framer Motion | | |

##  Project Structure

```text
matchpoint/
│
├── client/                 # React frontend
│   ├── src/
│   ├── public/
│   └── package.json
│
├── server/                 # Express backend
│   ├── models/
│   ├── routes/
│   ├── seed/
│   └── package.json
│
└── README.md
```

##  Backend API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/feed` | Fetch profiles not yet swiped on |
| POST | `/swipe` | Record a Like or Pass action |
| GET | `/matches` | Fetch mutual matches only |

### Matching Logic

1. A user likes or passes on a profile.
2. The swipe action is saved in the database.
3. If the user likes a profile that has already liked them, a mutual match is created.
4. The application displays the match confirmation.
5. Only mutual matches appear in the Matches section.

##  Getting Started

Follow these steps to run the project locally.

### 1. Clone the Repository

```bash
git clone https://github.com/anurag91920/matchpoint.git
cd matchpoint
```

### 2. Setup Backend

```bash
cd server
npm install
```

Create a `.env` file inside the `server` folder:

```env
MONGO_URI=your_mongodb_connection_string
PORT=5000
```

Start the backend:

```bash
npm run dev
```

### 3. Setup Frontend

Open a new terminal:

```bash
cd client
npm install
npm run dev
```

Open the local URL displayed by Vite, usually:

```text
http://localhost:5173
```

### 4. Database Seeding

Make sure MongoDB is connected and run the seed script configured in the server's `package.json` to insert the mock profiles.

##  Privacy-First Approach

Privacy is an important part of the matching experience:

- One-sided likes are never exposed to the user.
- A match is created only after mutual interest.
- The Matches section displays only confirmed mutual matches.
- Swipe history is persisted to prevent previously viewed profiles from reappearing.

##  Assignment Scope

This project was developed as a standalone implementation of the Discover tab described in the Coy SDE Intern Assignment.

It demonstrates:
- Profile discovery and swipe interactions.
- Mutual matching logic.
- REST API integration.
- MongoDB persistence.
- Responsive frontend development.

Authentication and payment functionality are outside the scope of this prototype.

##  Developer

**Anurag Chaurasiya**

- GitHub: https://github.com/anurag91920
- Project Repository: https://github.com/anurag91920/matchpoint

---

 If you find this project interesting, feel free to explore the repository!
