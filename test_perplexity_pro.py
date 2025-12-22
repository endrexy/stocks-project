from perplexity import Perplexity
import keys

client = Perplexity(api_key=keys.API_KEY_PERPLEXITY)

completion = client.chat.completions.create(
    messages=[
        {
            "role": "user",
            "content": "What are the major AI developments and announcements from today across the tech industry?"
        }
    ],
    model="sonar-pro"
)

print(completion.choices[0].message.content)