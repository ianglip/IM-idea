document.addEventListener('DOMContentLoaded', () => {
  // DOM Elements
  const loginScreen = document.getElementById('login-screen');
  const chatScreen = document.getElementById('chat-screen');
  const usernameInput = document.getElementById('username-input');
  const joinBtn = document.getElementById('join-btn');
  const messageInput = document.getElementById('message-input');
  const sendBtn = document.getElementById('send-btn');
  const chatMessages = document.getElementById('chat-messages');
  const userList = document.getElementById('users');
  const onlineStatus = document.getElementById('online-status');
  const typingIndicator = document.getElementById('typing-indicator');
  
  // Connect to Socket.io server
  const socket = io();
  let username = '';
  let typingTimeout = null;
  
  // Join chat when button is clicked
  joinBtn.addEventListener('click', joinChat);
  usernameInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') joinChat();
  });
  
  function joinChat() {
    username = usernameInput.value.trim();
    if (username) {
      socket.emit('user_join', username);
      loginScreen.classList.add('hidden');
      chatScreen.classList.remove('hidden');
      messageInput.focus();
    }
  }
  
  // Send message
  sendBtn.addEventListener('click', sendMessage);
  messageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
    
    // Emit typing event
    socket.emit('typing');
    
    // Clear typing timeout and set a new one
    clearTimeout(typingTimeout);
    typingTimeout = setTimeout(() => {
      socket.emit('typing_stopped');
    }, 1000);
  });
  
  function sendMessage() {
    const message = messageInput.value.trim();
    if (message) {
      socket.emit('chat_message', message);
      messageInput.value = '';
      messageInput.focus();
    }
  }
  
  // Socket events
  
  // Display chat message
  socket.on('chat_message', (data) => {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message');
    messageDiv.classList.add(data.user === username ? 'sent' : 'received');
    
    messageDiv.innerHTML = `
      <div class="header">${data.user === username ? 'You' : data.user}</div>
      <div class="content">${escapeHtml(data.message)}</div>
      <div class="time">${data.time}</div>
    `;
    
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    typingIndicator.textContent = '';
  });
  
  // Update user list
  socket.on('update_users', (users) => {
    userList.innerHTML = '';
    users.forEach(user => {
      const li = document.createElement('li');
      li.textContent = user === username ? `${user} (You)` : user;
      userList.appendChild(li);
    });
    onlineStatus.textContent = `${users.length} online`;
  });
  
  // Show user joined message
  socket.on('user_joined', (user) => {
    const div = document.createElement('div');
    div.classList.add('system-message');
    div.textContent = `${user} has joined the chat`;
    chatMessages.appendChild(div);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  });
  
  // Show user left message
  socket.on('user_left', (user) => {
    if (user) {
      const div = document.createElement('div');
      div.classList.add('system-message');
      div.textContent = `${user} has left the chat`;
      chatMessages.appendChild(div);
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }
  });
  
  // Show typing indicator
  socket.on('typing', (user) => {
    if (user !== username) {
      typingIndicator.textContent = `${user} is typing...`;
    }
  });
  
  socket.on('typing_stopped', () => {
    typingIndicator.textContent = '';
  });
  
  // Helper function to prevent XSS
  function escapeHtml(unsafe) {
    return unsafe
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }
});
