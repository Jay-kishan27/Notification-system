const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

let notifications = [];

app.post('/notifications', (req, res) => {
  const { userId, type, message } = req.body;
  notifications.push({ userId, type, message, timestamp: new Date() });
  console.log(`Sent ${type} to ${userId}: ${message}`);
  res.json({ success: true, message: 'Notification sent successfully' });
});

app.get('/users/:id/notifications', (req, res) => {
  const userId = req.params.id;
  const userNotifications = notifications.filter(n => n.userId === userId);
  res.json(userNotifications);
});

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
