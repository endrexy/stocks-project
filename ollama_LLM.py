import ollama

model = "llama2"  # Change to your model

def get_ai_response(user_message, chat_history):
    print("using llama\n")
    """
    Takes user message and chat history, returns response and updated history.
    This function has NO global state - it's pure and reusable.
    """
    # Add user message to history
    chat_history.append({"role": "user", "content": user_message})

    # Get response from Ollama
    response = ollama.chat(model=model, messages=chat_history)
    response_text = response['message']['content']

    # Add assistant response to history
    chat_history.append({"role": "assistant", "content": response_text})

    # Debug print
    print("\nChat history:", chat_history) 

    return response_text, chat_history




