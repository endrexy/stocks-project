import ollama

model = "llama2"  # Change to your model
messages = [{"role": "system", "content": "You are a helpful assistant."}]

print("Chatbot ready! Type 'quit' to exit.\n")

while True:
    user_input = input("You: ")
    if user_input.lower() == "quit":
        break
    
    messages.append({"role": "user", "content": user_input})
    response = ollama.chat(model=model, messages=messages)
    answer = response['message']['content']
    # answer = response
    print("Bot:", answer)
    
    messages.append({"role": "assistant", "content": answer})

