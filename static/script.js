document.addEventListener('DOMContentLoaded', function () {
    const chat = document.getElementById('chat');
    const userInput = document.getElementById('user-input');
    const sendBtn = document.getElementById('send-btn');
    const themeToggle = document.getElementById('theme-toggle');
    const llmSelect = document.getElementById('llm-select');
    const inputAreaFixed = document.querySelector('.input-area-fixed');
    const backendUrl = '/chat';

    // Hamburger menu elements
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const sideMenu = document.getElementById('side-menu');
    const closeBtn = document.getElementById('close-btn');
    const overlay = document.getElementById('overlay');
    const menuLinks = document.querySelectorAll('.menu-items a');

    // Configure marked.js options
    marked.setOptions({
        breaks: true,
        gfm: true,
        headerIds: false,
        mangle: false
    });

    // Set initial state for theme
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        themeToggle.checked = true;
        applyDarkTheme();
    }

    // Hamburger menu functionality
    hamburgerBtn.addEventListener('click', () => {
        sideMenu.classList.add('open');
        overlay.classList.add('show');
    });

    closeBtn.addEventListener('click', () => {
        sideMenu.classList.remove('open');
        overlay.classList.remove('show');
    });

    overlay.addEventListener('click', () => {
        sideMenu.classList.remove('open');
        overlay.classList.remove('show');
    });

    // Menu item click handlers
    menuLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const page = link.getAttribute('data-page');
            
            // Remove active class from all links
            menuLinks.forEach(l => l.classList.remove('active'));
            // Add active class to clicked link
            link.classList.add('active');
            
            // Close menu
            sideMenu.classList.remove('open');
            overlay.classList.remove('show');
            
            // Handle page navigation (placeholder for now)
            console.log(`Navigating to ${page}`);
            // You can add actual page switching logic here
        });
    });

    // Theme toggle functionality
    themeToggle.addEventListener('change', () => {
        if (themeToggle.checked) {
            applyDarkTheme();
        } else {
            applyLightTheme();
        }
    });

    function applyDarkTheme() {
        document.body.classList.add('dark');
        inputAreaFixed.classList.add('dark');
        llmSelect.classList.add('dark');
        userInput.classList.add('dark');
        sendBtn.classList.add('dark');
        hamburgerBtn.classList.add('dark');
        sideMenu.classList.add('dark');
        // Apply dark theme to existing messages
        document.querySelectorAll('.message').forEach(msg => {
            msg.classList.add('dark');
            msg.querySelector('.message-content')?.classList.add('dark');
        });
    }

    function applyLightTheme() {
        document.body.classList.remove('dark');
        inputAreaFixed.classList.remove('dark');
        llmSelect.classList.remove('dark');
        userInput.classList.remove('dark');
        sendBtn.classList.remove('dark');
        hamburgerBtn.classList.remove('dark');
        sideMenu.classList.remove('dark');
        // Remove dark theme from existing messages
        document.querySelectorAll('.message').forEach(msg => {
            msg.classList.remove('dark');
            msg.querySelector('.message-content')?.classList.remove('dark');
        });
    }

    // Send message on button click
    sendBtn.addEventListener('click', sendMessage);

    // Send message on Enter, add new line on Shift+Enter
    userInput.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' && e.shiftKey) {
            // Shift+Enter: Allow default new line behavior
        } else if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });

    function sendMessage() {
        const message = userInput.value.trim();
        if (!message) return;

        // Add user message to chat
        addMessage(message, 'user');

        // Get selected LLM
        const selectedLLM = llmSelect.value;

        // Send request to Flask backend with selected LLM
        fetch(backendUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                message: message,
                llm: selectedLLM
            })
        })
        .then(response => response.json())
        .then(data => {
            addMessage(data.response, 'bot');
        })
        .catch(error => {
            console.error('Error:', error);
            addMessage('Sorry, something went wrong.', 'bot');
        });

        userInput.value = '';
    }

    function addMessage(text, sender) {
        const isDark = document.body.classList.contains('dark');

        // Create message container
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}`;
        if (isDark) messageDiv.classList.add('dark');

        // Create message header (You: / Bot:)
        const headerDiv = document.createElement('div');
        headerDiv.className = 'message-header';
        headerDiv.textContent = sender === 'user' ? 'You:' : 'Bot:';

        // Create message content
        const contentDiv = document.createElement('div');
        contentDiv.className = 'message-content';
        if (isDark) contentDiv.classList.add('dark');

        // Parse markdown for bot messages, plain text for user messages
        if (sender === 'bot') {
            contentDiv.innerHTML = marked.parse(text);
        } else {
            contentDiv.textContent = text;
        }

        // Append header and content to message
        messageDiv.appendChild(headerDiv);
        messageDiv.appendChild(contentDiv);

        // Append message to chat
        chat.appendChild(messageDiv);

        // Scroll to bottom smoothly
        window.scrollTo({
            top: document.body.scrollHeight,
            behavior: 'smooth'
        });
    }
});
