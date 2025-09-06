document.addEventListener('DOMContentLoaded', () => {
    const chatbotMessages = document.getElementById('chatbot-messages');
    const userInput = document.getElementById('user-input');
    const sendButton = document.getElementById('send-button');

    // Function to add a message to the chat
    function addMessage(sender, text) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message');
        messageDiv.classList.add(sender === 'user' ? 'user-message' : 'bot-message');
        messageDiv.textContent = text;
        chatbotMessages.appendChild(messageDiv);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }

    // Function to send a message to the backend
    async function sendMessage() {
        const message = userInput.value.trim();
        if (message === '') return;

        addMessage('user', message);
        userInput.value = '';

        try {
            const response = await fetch('/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: message }),
            });
            const data = await response.json();
            addMessage('bot', data.response);
        } catch (error) {
            addMessage('bot', "Sorry, I couldn't process your request.");
            console.error('Error:', error);
        }
    }

    // Event listeners
    sendButton.addEventListener('click', sendMessage);
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
});