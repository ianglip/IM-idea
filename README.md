# Instant Messaging Application

A real-time instant messaging web application built with Node.js, Express, and Socket.IO.

## Features

- Real-time messaging
- User online status
- Typing indicators
- Chat history during session
- Responsive design

## Setup Instructions

### Prerequisites

- Node.js (version 14.x or higher)
- npm (usually comes with Node.js)

### Installation

1. Clone or download this repository
2. Open a terminal/command prompt in the project directory
3. Install dependencies:

```bash
npm install
```

4. Start the server:

```bash
npm start
```

5. The application will be running at: http://localhost:3000

## Testing Instructions

### Basic Testing

1. Open http://localhost:3000 in your web browser
2. Enter a username and click "Join Chat"
3. You should see the main chat interface

### Multi-User Testing

To test conversation between multiple users:

1. Open the application in two different browser windows or tabs
2. Enter different usernames in each window
3. Start sending messages between the two users
4. Observe real-time updates in both windows

### Feature Testing

#### Real-Time Messaging
- Send a message from one user and verify it appears instantly for other users
- Check that sent and received messages have different styling

#### User Status
- Join with a new user and verify the "user has joined" message appears
- Close a browser tab and verify the "user has left" message appears
- Check that the online users list updates correctly

#### Typing Indicator
- Start typing in one window and verify the "[user] is typing..." message appears in other windows
- Stop typing and verify the indicator disappears after a moment

### Cross-Browser Testing

Test the application in different browsers to ensure compatibility:
- Chrome
- Firefox
- Safari
- Edge

### Mobile Testing

Test the application on mobile devices or using browser developer tools' mobile emulation:
1. Open the browser's developer tools (F12 or right-click > Inspect)
2. Toggle the device emulation mode
3. Select different device sizes and verify the UI adapts correctly

## Troubleshooting

- **Messages not appearing**: Ensure your server is running and the browser console doesn't show any errors
- **Connection issues**: Check if the Socket.IO connection is established (no errors in browser console)
- **Port conflicts**: If port 3000 is already in use, modify the PORT variable in server.js

## Extending the Application

Some ideas for extending the functionality:
- Add persistent message storage with a database
- Implement private messaging between users
- Add user authentication
- Enable file/image sharing
- Create different chat rooms
