# Stocks Project

A comprehensive stock market analysis application with AI-powered insights using Ollama and Perplexity LLM models.

## Features

- **AI-Powered Analysis**: Integrates with Ollama and Perplexity LLM for intelligent stock insights
- **Flask Web Interface**: User-friendly web interface for stock analysis
- **Chatbot CLI**: Command-line interface for interactive stock discussions
- **Real-time Data**: Fetch and analyze stock market data

## Project Structure

```
├── app.py                      # Main Flask application
├── ollama_LLM.py              # Ollama LLM integration
├── perplexity_LLM.py          # Perplexity LLM integration
├── test_chatbot_CLI_ollama.py # Tests for Ollama chatbot
├── test_perplexity_pro.py     # Tests for Perplexity integration
├── test_perplexity_results.py # Tests for Perplexity results
├── templates/                  # HTML templates
│   └── index.html
├── static/                     # Static files (CSS, JS)
│   ├── style.css
│   ├── script.js
│   └── css/
│       └── style.css
└── myenv/                      # Python virtual environment
```

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd stocks_project
   ```

2. **Create and activate virtual environment**
   ```bash
   python3 -m venv myenv
   source myenv/bin/activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Configure LLM Models**
   - For Ollama: Ensure Ollama is running locally
   - For Perplexity: Add your API key to environment variables

## Usage

### Web Interface
```bash
python app.py
```
Then navigate to `http://localhost:5005` in your browser.

### CLI Chatbot
```bash
python test_chatbot_CLI_ollama.py
```

## Configuration

Update the following files with your settings:
- `ollama_LLM.py` - Ollama model settings
- `perplexity_LLM.py` - Perplexity API configuration

## Testing

Run the test suite:
```bash
python -m pytest test_*.py
```

## Requirements

- Python 3.11+
- Flask
- Ollama (for local LLM)
- Perplexity API (for cloud-based LLM)
- httpx
- pydantic

See `requirements.txt` for complete list.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contributing

Contributions are welcome! Please feel free to submit pull requests for improvements and bug fixes.

## Support

For issues, questions, or suggestions, please open an issue in the repository.

---

**Note**: This project uses AI models for analysis. Always verify results independently before making investment decisions.
