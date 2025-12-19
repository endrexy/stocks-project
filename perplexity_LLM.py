from perplexity import Perplexity
import keys

client = Perplexity(api_key=keys.PERPLEXITY_API_KEY)

def get_ai_response(user_message, chat_history):
    print("using perplexity pro\n")

    # Add user message to history
    chat_history.append({"role": "user", "content": user_message})

    # Get response from Perplexity Pro
    completion = client.chat.completions.create(
        messages=[
            {
                "role": "user",
                "content": user_message
            }
        ],
        model="sonar-pro"
    )
    
    # Add assistant response to history
    chat_history.append({"role": "assistant", "content": completion.choices[0].message.content})

    # Debug print
    print("\nChat history:", chat_history) 

    return completion.choices[0].message.content, chat_history


