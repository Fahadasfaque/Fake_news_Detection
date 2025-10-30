# 🚀 Fake News Detection Project

<img src="https://socialify.git.ci/Fahadasfaque/Fake_news_Detection/image?language=1&name=1&owner=1&stargazers=1&theme=Light" alt="Fake_news_Detection" width="640" height="320" />

## 🎯 Project Overview

This comprehensive project combines **machine learning research** with a **modern web application** to combat misinformation. The project includes both a Jupyter notebook with ML model development and a beautiful, interactive web interface for real-time fake news detection.

### 🔬 Machine Learning Component
The project develops and compares four different machine learning models capable of identifying and classifying news articles as fake or authentic. Using a diverse dataset of news articles, we achieve high accuracy rates across all models.

### 🌐 Web Application Component  
A modern, responsive web application with beautiful animations that allows users to instantly analyze news articles using the trained ML models through an intuitive interface.

## 🤖 Machine Learning Models

1. **Logistic Regression** - 98.78% accuracy
2. **Decision Tree Classifier** - 99.53% accuracy  
3. **Gradient Boost Classifier** - 99.45% accuracy
4. **Random Forest Classifier** - 98.70% accuracy

## 📊 Dataset

We have used a comprehensive labelled dataset containing news articles with their corresponding authenticity labels. The dataset is divided into two classes:
- **True**: Genuine news articles from reputable sources
- **False**: Fake or fabricated news articles

### Dataset Statistics:
- **Fake News Articles**: 23,481 samples
- **Real News Articles**: 21,417 samples  
- **Total Articles**: 44,898 samples
- **Features**: Title, Text, Subject, Date, Class

## 💻 System Requirements 

### For Machine Learning (Jupyter Notebook):
**Hardware:**
- 4GB RAM (8GB recommended)
- i3 Processor or better
- 500MB free space

**Software:**
- Python 3.7+
- Anaconda (recommended)
- Jupyter Notebook

### For Web Application:
**Requirements:**
- Any modern web browser (Chrome, Firefox, Safari, Edge)
- No additional software installation needed
- Works on desktop, tablet, and mobile devices

## 📦 Dependencies (For ML Component)

Install the required Python libraries:

```bash
pip install pandas numpy matplotlib scikit-learn seaborn
```

**Required Libraries:**
- **pandas** - Data manipulation and analysis
- **numpy** - Numerical computing
- **scikit-learn** - Machine learning algorithms
- **matplotlib** - Data visualization
- **seaborn** - Statistical data visualization
- **re** - Regular expressions (built-in)

## 🎨 Web Application Features

### ✨ Modern UI/UX:
- **Beautiful Design**: Gradient backgrounds with glassmorphism effects
- **Smooth Animations**: CSS animations with staggered loading effects
- **Responsive Layout**: Works perfectly on all devices
- **Interactive Elements**: Hover effects and micro-interactions

### 🔍 Analysis Features:
- **Real-time Processing**: Instant analysis with loading indicators
- **Multiple Model Predictions**: View results from all 4 AI models
- **Confidence Visualization**: Animated progress bars and percentages
- **Sample Articles**: Pre-loaded fake and real news for testing

### 📱 User Experience:
- **Character Counter**: Real-time text length tracking
- **Keyboard Shortcuts**: Ctrl+Enter to analyze, Ctrl+Delete to clear
- **Visual Feedback**: Color-coded results (red=fake, green=real)
- **Detailed Analytics**: Processing time, text stats, and model breakdown

## 🚀 Usage

### Option 1: Web Application (Recommended for Quick Testing)

1. **Clone this repository:**
```bash
git clone https://github.com/kapilsinghnegi/Fake-News-Detection.git
cd Fake-News-Detection
```

2. **Open the web application:**
```bash
# Start a local server
python -m http.server 8080
# Then open http://localhost:8080 in your browser
```

3. **Use the application:**
   - Enter or paste a news article in the text area
   - Click "Analyze Article" to get instant predictions
   - View results from all 4 AI models with confidence scores
   - Try the provided sample articles for testing

### Option 2: Machine Learning Notebook

1. **Open Jupyter Notebook:**
```bash
jupyter notebook "Fake News Detection using machine learning.ipynb"
```

2. **Run the cells sequentially** to:
   - Load and preprocess the dataset
   - Train all four ML models
   - Evaluate model performance
   - Test with custom news articles

## 📈 Results & Performance

### Model Accuracy Comparison:
| Model | Accuracy | Precision | Recall | F1-Score |
|-------|----------|-----------|--------|----------|
| **Decision Tree** | 99.53% | 0.99 | 0.99 | 0.99 |
| **Gradient Boosting** | 99.45% | 0.99 | 0.99 | 0.99 |
| **Logistic Regression** | 98.78% | 0.99 | 0.99 | 0.99 |
| **Random Forest** | 98.70% | 0.99 | 0.99 | 0.99 |

### Key Findings:
- All models achieve excellent performance (>98% accuracy)
- Decision Tree Classifier shows the highest accuracy
- Ensemble methods (GB, RF) provide robust predictions
- Low false positive and false negative rates across all models

## 📁 Project Structure

```bash
Fake-News-Detection/
├── 📓 Fake News Detection using machine learning.ipynb  # ML Research & Training
├── 📊 Datasets/                                        # Training Data
│   └── datasets/
│       ├── Fake.csv                                   # Fake news articles
│       ├── True.csv                                   # Real news articles  
│       └── manual_testing.csv                         # Test samples
├── 🌐 Web Application/                                 # Interactive Web App
│   ├── index.html                                     # Main HTML file
│   ├── styles.css                                     # Modern CSS & animations
│   ├── script.js                                      # JavaScript functionality
│   └── test_articles.txt                              # Sample articles for testing
├── 📖 README.md                                        # Project documentation
└── 📋 WEB_APP_README.md                               # Web app specific guide
```

## 🚀 Model Deployment & Applications

### Current Implementation:
- **Web Interface**: Interactive browser-based application
- **Real-time Analysis**: Instant predictions with visual feedback
- **Multi-model Ensemble**: Combines predictions from 4 different algorithms

### Potential Applications:
- **Social Media Platforms**: Automatic content verification
- **News Aggregators**: Quality control for news feeds  
- **Educational Tools**: Teaching media literacy
- **Fact-checking Services**: Supporting human fact-checkers
- **Browser Extensions**: Real-time webpage analysis

## 🎯 Testing the Application

Use the provided `test_articles.txt` file which contains:
- **5 Fake News Samples**: Designed to trigger fake news detection
- **5 Real News Samples**: Professional journalism examples
- **Edge Cases**: Short articles and mixed signals for testing

## 📊 Project Screenshots

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.


## 🙏 Acknowledgments

- Dataset providers for the comprehensive news article collections
- Scikit-learn community for excellent machine learning tools
- Open source community for inspiration and resources

---

**⭐ If you found this project helpful, please give it a star!**

*Built with ❤️ for combating misinformation through AI and modern web technologies*
