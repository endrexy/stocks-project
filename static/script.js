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

    // Configure marked.js options if available
    if (typeof marked !== 'undefined') {
        marked.setOptions({
            breaks: true,
            gfm: true,
            headerIds: false,
            mangle: false
        });
    }

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
        hamburgerBtn.classList.add('dark');
        sideMenu.classList.add('dark');

        // Apply to tiles if they exist
        document.querySelectorAll('.tile').forEach(tile => {
            tile.classList.add('dark');
        });

        // Apply to theme label if it exists
        const themeLabel = document.querySelector('.theme-label');
        if (themeLabel) themeLabel.classList.add('dark');

        // Apply to companies table if it exists
        const companiesTable = document.querySelector('.companies-table');
        if (companiesTable) companiesTable.classList.add('dark');

        // Apply to news articles if they exist
        document.querySelectorAll('.news-article').forEach(article => {
            article.classList.add('dark');
        });

        document.querySelectorAll('.news-link').forEach(link => {
            link.classList.add('dark');
        });

        // Chat-specific elements
        if (inputAreaFixed) inputAreaFixed.classList.add('dark');
        if (llmSelect) llmSelect.classList.add('dark');
        if (userInput) userInput.classList.add('dark');
        if (sendBtn) sendBtn.classList.add('dark');

        // Apply dark theme to existing messages
        document.querySelectorAll('.message').forEach(msg => {
            msg.classList.add('dark');
            msg.querySelector('.message-content')?.classList.add('dark');
        });
    }

    function applyLightTheme() {
        document.body.classList.remove('dark');
        hamburgerBtn.classList.remove('dark');
        sideMenu.classList.remove('dark');

        // Remove from tiles if they exist
        document.querySelectorAll('.tile').forEach(tile => {
            tile.classList.remove('dark');
        });

        // Remove from theme label if it exists
        const themeLabel = document.querySelector('.theme-label');
        if (themeLabel) themeLabel.classList.remove('dark');

        // Remove from companies table if it exists
        const companiesTable = document.querySelector('.companies-table');
        if (companiesTable) companiesTable.classList.remove('dark');

        // Remove from news articles if they exist
        document.querySelectorAll('.news-article').forEach(article => {
            article.classList.remove('dark');
        });

        document.querySelectorAll('.news-link').forEach(link => {
            link.classList.remove('dark');
        });

        // Chat-specific elements
        if (inputAreaFixed) inputAreaFixed.classList.remove('dark');
        if (llmSelect) llmSelect.classList.remove('dark');
        if (userInput) userInput.classList.remove('dark');
        if (sendBtn) sendBtn.classList.remove('dark');

        // Remove dark theme from existing messages
        document.querySelectorAll('.message').forEach(msg => {
            msg.classList.remove('dark');
            msg.querySelector('.message-content')?.classList.remove('dark');
        });
    }

    // Chat functionality (only if chat elements exist)
    if (sendBtn && userInput && chat) {
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
            if (sender === 'bot' && typeof marked !== 'undefined') {
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
    }
});
