document.getElementById('notificationForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const userId = document.getElementById('userId').value;
    const type = document.getElementById('type').value;
    const message = document.getElementById('message').value;

    const res = await fetch('http://localhost:5000/notifications', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, type, message })
    });

    const data = await res.json();
    alert(data.message || 'Notification sent!');
  });

  async function getNotifications() {
    const userId = document.getElementById('fetchUserId').value;
    const res = await fetch(`http://localhost:5000/users/${userId}/notifications`);
    const data = await res.json();

    const list = document.getElementById('notificationsList');
    list.innerHTML = '';
    data.forEach(n => {
      const li = document.createElement('li');
      li.textContent = `${n.type.toUpperCase()}: ${n.message}`;
      list.appendChild(li);
    });
  }
