# Digi Friend

Digi Friend is a MERN stack application that allows users to connect, chat, and schedule meetings.

## Features

- User Authentication (JWT and Clerk)
- Real-time Chat (Socket.io)
- Event Scheduling (Cal.com integration)
- User Profiles
- Support Groups
- Resource Sharing
- Forums/Discussion Boards
- Mobile Responsive Design

## Tech Stack

- Frontend: React, Tailwind CSS
- Backend: Node.js, Express
- Database: MongoDB
- Authentication: JWT, Clerk
- Real-time Communication: Socket.io
- Scheduling: Cal.com
- Payment: PayU, Razorpay

## Getting Started

### Prerequisites

- Node.js
- MongoDB
- npm or yarn

### Installation

1. Clone the repository
   ```
   git clone https://github.com/yourusername/digi-friend.git
   ```

2. Install backend dependencies
   ```
   cd digi-friend/backend
   npm install
   ```

3. Install frontend dependencies
   ```
   cd ../frontend
   npm install
   ```

4. Create a `.env` file in the backend directory and add your environment variables:
   ```
   MONGODB_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   CLERK_API_KEY=your_clerk_api_key
   ```

5. Start the backend server
   ```
   npm run server
   ```

6. Start the frontend development server
   ```
   npm start
   ```

7. Open `http://localhost:3000` in your browser

## Deployment

The application is set up to be deployed on Vercel. Follow these steps:

1. Create a Vercel account if you haven't already
2. Install the Vercel CLI: `npm i -g vercel`
3. Run `vercel` in the project root directory and follow the prompts

## Contributing

Please read `CONTRIBUTING.md` for details on our code of conduct, and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the `LICENSE.md` file for details.