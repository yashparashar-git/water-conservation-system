const sendBtn = document.getElementById('send');

  sendBtn.addEventListener('click', () => {
    // Clear input fields
    document.getElementById('name').value = "";
    document.getElementById('email').value = "";
    document.getElementById('message').value = "";

    alert("Message Sent! ✅"); // Optional
  })