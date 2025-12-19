from perplexity import Perplexity
import keys

client = Perplexity(api_key=keys.PERPLEXITY_API_KEY)

search = client.search.create(
    query=[
      "What is Comet Browser?",
      "Perplexity AI",
      "Perplexity Changelog"
    ]
)

for result in search.results:
    print(f"{result.title}: {result.url}")