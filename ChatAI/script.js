document.addEventListener('DOMContentLoaded', () => {
    const chatBox = document.getElementById('chat-box');
    const userInput = document.getElementById('user-input');
    const sendBtn = document.getElementById('send-btn');
    const apiKey = 'AIzaSyBzruPp6ugnStszQbc_Wk9rOAHuq4SE6uA'; // <-- THAY THẾ BẰNG API KEY CỦA BẠN
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`;

    // Hàm thêm tin nhắn vào chat box
    function addMessage(message, sender) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', sender === 'user' ? 'user-message' : 'bot-message');
        messageElement.textContent = message;
        chatBox.appendChild(messageElement);
        chatBox.scrollTop = chatBox.scrollHeight; // Tự động cuộn xuống tin nhắn mới nhất
    }

    // Hàm gửi yêu cầu đến Gemini API
    async function getBotResponse(prompt) {
        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    contents: [{
                        parts: [{
                            text: prompt
                        }]
                    }]
                })
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            const botMessage = data.candidates[0].content.parts[0].text;
            addMessage(botMessage, 'bot');

        } catch (error) {
            console.error('Error:', error);
            addMessage('Xin lỗi, đã có lỗi xảy ra. Vui lòng thử lại.', 'bot');
        }
    }

    // Hàm xử lý khi người dùng gửi tin nhắn
    function handleSend() {
        const userMessage = userInput.value.trim();
        if (userMessage) {
            addMessage(userMessage, 'user');
            userInput.value = '';
            getBotResponse(userMessage);
        }
    }

    // Lắng nghe sự kiện click nút gửi
    sendBtn.addEventListener('click', handleSend);

    // Lắng nghe sự kiện nhấn Enter trong ô input
    userInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            handleSend();
        }
    });

    // Tin nhắn chào mừng ban đầu
    addMessage('Chào bạn, tôi là Gemini. Tôi có thể giúp gì cho bạn?', 'bot');
});
