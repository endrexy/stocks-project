import logging
from flask import Flask, request, jsonify, render_template, session
from flask_cors import CORS
import perplexity_LLM, ollama_LLM


app = Flask(__name__)
CORS(app)
app.logger.setLevel(logging.DEBUG)
app.secret_key = 'very-secret-key'  # For sessions

# Serve the index page
@app.route('/', methods=['GET'])
def index():
    return render_template('index.html')

# API Endpoint for chat
@app.route('/chat', methods=['POST'])
def chat():
    data = request.get_json()
    user_message = data.get('message', '')
    llm_choice = data.get('llm', 'ollama')  # Default to ollama
    
    # Debug print
    app.logger.info(f"Selected LLM: {llm_choice}\n")
    app.logger.info(f"Received message: {user_message}\n") 

    # Initialize chat history if new session
    if 'chat_history' not in session:
        session['chat_history'] = [
            {"role": "system", "content": "You are a helpful assistant."}
        ]

    # Choose LLM based on user selection
    match llm_choice:
        case 'perplexity':
            bot_response, session['chat_history'] = perplexity_LLM.get_ai_response(user_message, session['chat_history'])
        case 'ollama':
            bot_response, session['chat_history'] = ollama_LLM.get_ai_response(user_message, session['chat_history'])
        case _:
            return jsonify({'error': 'Invalid LLM choice'}), 400
    
    # Debug print
    app.logger.info(f"Bot response: {bot_response}\n")  

    return jsonify({'response': bot_response})

if __name__ == '__main__':
    app.run(debug=True, host='127.0.0.1', port=5005)

