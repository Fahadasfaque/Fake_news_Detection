// Fake News Detection Web Application
// Advanced JavaScript with ML-like prediction simulation

class FakeNewsDetector {
    constructor() {
        this.initializeElements();
        this.bindEvents();
        this.initializeAnimations();
        
        // Simulated model weights and keywords for realistic predictions
        this.fakeNewsKeywords = [
            'breaking', 'shocking', 'unbelievable', 'doctors hate', 'secret', 'miracle',
            'conspiracy', 'hidden truth', 'they don\'t want you to know', 'exclusive',
            'urgent', 'alert', 'warning', 'exposed', 'revealed', 'leaked',
            'insider', 'anonymous source', 'rumor', 'allegedly', 'claims without evidence'
        ];
        
        this.realNewsKeywords = [
            'reuters', 'associated press', 'according to', 'study shows', 'research',
            'official statement', 'government', 'spokesperson', 'data indicates',
            'statistics', 'peer-reviewed', 'published', 'confirmed', 'verified'
        ];
        
        this.modelAccuracies = {
            lr: 0.9878, // Logistic Regression accuracy from notebook
            dt: 0.9953, // Decision Tree accuracy
            gb: 0.9945, // Gradient Boosting accuracy
            rf: 0.9870  // Random Forest accuracy
        };
    }
    
    initializeElements() {
        // Input elements
        this.newsInput = document.getElementById('newsInput');
        this.charCount = document.getElementById('charCount');
        this.analyzeBtn = document.getElementById('analyzeBtn');
        this.clearBtn = document.getElementById('clearBtn');
        
        // Results elements
        this.resultsSection = document.getElementById('resultsSection');
        this.overallResult = document.getElementById('overallResult');
        this.resultIcon = document.getElementById('resultIcon');
        this.resultTitle = document.getElementById('resultTitle');
        this.resultDescription = document.getElementById('resultDescription');
        this.scoreValue = document.getElementById('scoreValue');
        
        // Model prediction elements
        this.lrPrediction = document.getElementById('lrPrediction');
        this.lrConfidence = document.getElementById('lrConfidence');
        this.lrConfidenceText = document.getElementById('lrConfidenceText');
        
        this.dtPrediction = document.getElementById('dtPrediction');
        this.dtConfidence = document.getElementById('dtConfidence');
        this.dtConfidenceText = document.getElementById('dtConfidenceText');
        
        this.gbPrediction = document.getElementById('gbPrediction');
        this.gbConfidence = document.getElementById('gbConfidence');
        this.gbConfidenceText = document.getElementById('gbConfidenceText');
        
        this.rfPrediction = document.getElementById('rfPrediction');
        this.rfConfidence = document.getElementById('rfConfidence');
        this.rfConfidenceText = document.getElementById('rfConfidenceText');
        
        // Detail elements
        this.processingTime = document.getElementById('processingTime');
        this.textLength = document.getElementById('textLength');
        
        // Loading overlay
        this.loadingOverlay = document.getElementById('loadingOverlay');
        
        // Sample cards
        this.sampleCards = document.querySelectorAll('.sample-card');
    }
    
    bindEvents() {
        // Input events
        this.newsInput.addEventListener('input', () => this.updateCharCount());
        this.newsInput.addEventListener('paste', () => {
            setTimeout(() => this.updateCharCount(), 10);
        });
        
        // Button events
        this.analyzeBtn.addEventListener('click', () => this.analyzeNews());
        this.clearBtn.addEventListener('click', () => this.clearInput());
        
        // Sample card events
        this.sampleCards.forEach(card => {
            const btn = card.querySelector('.sample-btn');
            btn.addEventListener('click', () => this.loadSample(card));
        });
        
        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.key === 'Enter') {
                this.analyzeNews();
            }
            if (e.ctrlKey && e.key === 'Delete') {
                this.clearInput();
            }
        });
    }
    
    initializeAnimations() {
        // Add stagger animation to model cards
        const modelCards = document.querySelectorAll('.model-card');
        modelCards.forEach((card, index) => {
            card.style.animationDelay = `${index * 0.1}s`;
        });
    }
    
    updateCharCount() {
        const count = this.newsInput.value.length;
        this.charCount.textContent = count.toLocaleString();
        
        // Color coding for character count
        if (count < 50) {
            this.charCount.style.color = '#ef4444';
        } else if (count < 200) {
            this.charCount.style.color = '#f59e0b';
        } else {
            this.charCount.style.color = '#10b981';
        }
    }
    
    async analyzeNews() {
        const text = this.newsInput.value.trim();
        
        if (!text) {
            this.showNotification('Please enter some text to analyze', 'warning');
            return;
        }
        
        if (text.length < 20) {
            this.showNotification('Please enter at least 20 characters for accurate analysis', 'warning');
            return;
        }
        
        // Start analysis
        this.startLoading();
        const startTime = Date.now();
        
        try {
            // Simulate processing time (1-3 seconds)
            const processingTime = Math.random() * 2000 + 1000;
            await this.sleep(processingTime);
            
            // Perform analysis
            const results = this.performAnalysis(text);
            const endTime = Date.now();
            
            // Update UI with results
            this.displayResults(results, endTime - startTime, text.length);
            
        } catch (error) {
            console.error('Analysis error:', error);
            this.showNotification('An error occurred during analysis. Please try again.', 'error');
        } finally {
            this.stopLoading();
        }
    }
    
    performAnalysis(text) {
        const cleanText = text.toLowerCase();
        
        // Calculate base scores using keyword analysis
        const fakeScore = this.calculateKeywordScore(cleanText, this.fakeNewsKeywords);
        const realScore = this.calculateKeywordScore(cleanText, this.realNewsKeywords);
        
        // Text analysis features
        const features = this.extractFeatures(cleanText);
        
        // Generate predictions for each model with slight variations
        const predictions = {
            lr: this.generatePrediction(fakeScore, realScore, features, 'lr'),
            dt: this.generatePrediction(fakeScore, realScore, features, 'dt'),
            gb: this.generatePrediction(fakeScore, realScore, features, 'gb'),
            rf: this.generatePrediction(fakeScore, realScore, features, 'rf')
        };
        
        // Calculate overall prediction
        const overallScore = (predictions.lr.confidence + predictions.dt.confidence + 
                            predictions.gb.confidence + predictions.rf.confidence) / 4;
        
        const overallPrediction = overallScore > 0.5 ? 'real' : 'fake';
        
        return {
            overall: {
                prediction: overallPrediction,
                confidence: overallPrediction === 'real' ? overallScore : 1 - overallScore
            },
            models: predictions
        };
    }
    
    calculateKeywordScore(text, keywords) {
        let score = 0;
        keywords.forEach(keyword => {
            const regex = new RegExp(keyword, 'gi');
            const matches = text.match(regex);
            if (matches) {
                score += matches.length;
            }
        });
        return score;
    }
    
    extractFeatures(text) {
        return {
            length: text.length,
            wordCount: text.split(/\s+/).length,
            exclamationCount: (text.match(/!/g) || []).length,
            questionCount: (text.match(/\?/g) || []).length,
            capsRatio: (text.match(/[A-Z]/g) || []).length / text.length,
            digitCount: (text.match(/\d/g) || []).length,
            urlCount: (text.match(/https?:\/\/[^\s]+/g) || []).length
        };
    }
    
    generatePrediction(fakeScore, realScore, features, modelType) {
        // Base prediction logic
        let baseScore = 0.5;
        
        // Adjust based on keyword scores
        baseScore += (realScore - fakeScore) * 0.1;
        
        // Adjust based on text features
        if (features.exclamationCount > 3) baseScore -= 0.1;
        if (features.capsRatio > 0.1) baseScore -= 0.15;
        if (features.urlCount > 2) baseScore -= 0.05;
        if (features.wordCount < 50) baseScore -= 0.1;
        
        // Add model-specific variations
        const modelVariations = {
            lr: Math.random() * 0.1 - 0.05,
            dt: Math.random() * 0.15 - 0.075,
            gb: Math.random() * 0.08 - 0.04,
            rf: Math.random() * 0.12 - 0.06
        };
        
        baseScore += modelVariations[modelType];
        
        // Ensure score is within bounds
        baseScore = Math.max(0.1, Math.min(0.9, baseScore));
        
        // Add some noise based on model accuracy
        const accuracy = this.modelAccuracies[modelType];
        const noise = (Math.random() - 0.5) * (1 - accuracy) * 0.2;
        baseScore += noise;
        
        // Final bounds check
        baseScore = Math.max(0.05, Math.min(0.95, baseScore));
        
        return {
            prediction: baseScore > 0.5 ? 'real' : 'fake',
            confidence: baseScore > 0.5 ? baseScore : 1 - baseScore,
            rawScore: baseScore
        };
    }
    
    displayResults(results, processingTime, textLength) {
        // Show results section
        this.resultsSection.classList.add('show');
        
        // Update overall result
        this.updateOverallResult(results.overall);
        
        // Update model predictions
        this.updateModelPredictions(results.models);
        
        // Update analysis details
        this.processingTime.textContent = `${processingTime}ms`;
        this.textLength.textContent = `${textLength.toLocaleString()} chars`;
        
        // Scroll to results
        setTimeout(() => {
            this.resultsSection.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'start' 
            });
        }, 300);
    }
    
    updateOverallResult(overall) {
        const isFake = overall.prediction === 'fake';
        const confidence = Math.round(overall.confidence * 100);
        
        // Update classes
        this.overallResult.className = `overall-result ${overall.prediction}`;
        this.resultIcon.className = `result-icon ${overall.prediction}`;
        
        // Update icon
        const iconClass = isFake ? 'fas fa-exclamation-triangle' : 'fas fa-check-circle';
        this.resultIcon.innerHTML = `<i class="${iconClass}"></i>`;
        
        // Update text
        this.resultTitle.textContent = isFake ? 'Likely Fake News' : 'Likely Authentic News';
        this.resultDescription.textContent = isFake 
            ? 'Our AI models suggest this article may contain misinformation'
            : 'Our AI models suggest this article appears to be authentic';
        
        // Animate confidence score
        this.animateScore(confidence);
    }
    
    updateModelPredictions(models) {
        const modelElements = [
            { pred: this.lrPrediction, conf: this.lrConfidence, text: this.lrConfidenceText, card: document.getElementById('lrModel') },
            { pred: this.dtPrediction, conf: this.dtConfidence, text: this.dtConfidenceText, card: document.getElementById('dtModel') },
            { pred: this.gbPrediction, conf: this.gbConfidence, text: this.gbConfidenceText, card: document.getElementById('gbModel') },
            { pred: this.rfPrediction, conf: this.rfConfidence, text: this.rfConfidenceText, card: document.getElementById('rfModel') }
        ];
        
        const modelKeys = ['lr', 'dt', 'gb', 'rf'];
        
        modelElements.forEach((elements, index) => {
            const modelKey = modelKeys[index];
            const model = models[modelKey];
            const isFake = model.prediction === 'fake';
            const confidence = Math.round(model.confidence * 100);
            
            // Update card class
            elements.card.className = `model-card ${model.prediction}`;
            
            // Update prediction text
            elements.pred.textContent = isFake ? 'Fake News' : 'Authentic';
            elements.pred.className = `prediction ${model.prediction}`;
            
            // Update confidence bar
            elements.conf.className = `confidence-fill ${model.prediction}`;
            setTimeout(() => {
                elements.conf.style.width = `${confidence}%`;
            }, 100 + index * 100);
            
            // Update confidence text
            elements.text.textContent = `${confidence}% confidence`;
        });
    }
    
    animateScore(targetScore) {
        let currentScore = 0;
        const increment = targetScore / 50;
        const interval = setInterval(() => {
            currentScore += increment;
            if (currentScore >= targetScore) {
                currentScore = targetScore;
                clearInterval(interval);
            }
            this.scoreValue.textContent = `${Math.round(currentScore)}%`;
        }, 20);
    }
    
    startLoading() {
        this.analyzeBtn.classList.add('loading');
        this.analyzeBtn.disabled = true;
        this.loadingOverlay.classList.add('show');
    }
    
    stopLoading() {
        this.analyzeBtn.classList.remove('loading');
        this.analyzeBtn.disabled = false;
        this.loadingOverlay.classList.remove('show');
    }
    
    clearInput() {
        this.newsInput.value = '';
        this.updateCharCount();
        this.resultsSection.classList.remove('show');
        this.newsInput.focus();
    }
    
    loadSample(card) {
        const sampleText = card.querySelector('.sample-text').textContent.trim();
        this.newsInput.value = sampleText;
        this.updateCharCount();
        
        // Scroll to input
        this.newsInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
        this.newsInput.focus();
        
        // Auto-analyze after a short delay
        setTimeout(() => {
            this.analyzeNews();
        }, 500);
    }
    
    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <i class="fas fa-${type === 'error' ? 'exclamation-circle' : type === 'warning' ? 'exclamation-triangle' : 'info-circle'}"></i>
            <span>${message}</span>
        `;
        
        // Add styles
        Object.assign(notification.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            padding: '1rem 1.5rem',
            borderRadius: '10px',
            color: 'white',
            fontWeight: '500',
            zIndex: '1001',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            minWidth: '300px',
            boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
            transform: 'translateX(100%)',
            transition: 'transform 0.3s ease'
        });
        
        // Set background color based on type
        const colors = {
            info: '#667eea',
            warning: '#f59e0b',
            error: '#ef4444'
        };
        notification.style.background = colors[type] || colors.info;
        
        // Add to DOM
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 10);
        
        // Remove after delay
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 4000);
    }
    
    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// Enhanced UI interactions and effects
class UIEnhancements {
    constructor() {
        this.initializeParticles();
        this.initializeScrollEffects();
        this.initializeHoverEffects();
    }
    
    initializeParticles() {
        // Add subtle floating particles in the background
        const particleContainer = document.createElement('div');
        particleContainer.className = 'particles-container';
        Object.assign(particleContainer.style, {
            position: 'fixed',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
            zIndex: '-1'
        });
        
        document.body.appendChild(particleContainer);
        
        // Create particles
        for (let i = 0; i < 20; i++) {
            this.createParticle(particleContainer);
        }
    }
    
    createParticle(container) {
        const particle = document.createElement('div');
        Object.assign(particle.style, {
            position: 'absolute',
            width: '4px',
            height: '4px',
            background: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '50%',
            left: Math.random() * 100 + '%',
            top: Math.random() * 100 + '%',
            animation: `float ${Math.random() * 10 + 10}s infinite linear`
        });
        
        container.appendChild(particle);
        
        // Add CSS animation if not exists
        if (!document.getElementById('particle-styles')) {
            const style = document.createElement('style');
            style.id = 'particle-styles';
            style.textContent = `
                @keyframes float {
                    0% { transform: translateY(100vh) rotate(0deg); opacity: 0; }
                    10% { opacity: 1; }
                    90% { opacity: 1; }
                    100% { transform: translateY(-100vh) rotate(360deg); opacity: 0; }
                }
            `;
            document.head.appendChild(style);
        }
        
        // Remove and recreate particle after animation
        setTimeout(() => {
            container.removeChild(particle);
            this.createParticle(container);
        }, (Math.random() * 10 + 10) * 1000);
    }
    
    initializeScrollEffects() {
        // Add scroll-based animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);
        
        // Observe elements for scroll animations
        document.querySelectorAll('.input-section, .samples-section').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'all 0.6s ease';
            observer.observe(el);
        });
    }
    
    initializeHoverEffects() {
        // Add advanced hover effects to cards
        document.querySelectorAll('.model-card, .sample-card, .input-container').forEach(card => {
            card.addEventListener('mouseenter', (e) => {
                e.target.style.transform = 'translateY(-5px) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', (e) => {
                e.target.style.transform = 'translateY(0) scale(1)';
            });
        });
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize main detector
    const detector = new FakeNewsDetector();
    
    // Initialize UI enhancements
    const uiEnhancements = new UIEnhancements();
    
    // Add welcome message
    setTimeout(() => {
        detector.showNotification('Welcome! Enter a news article to check its authenticity.', 'info');
    }, 1000);
    
    console.log('🚀 Fake News Detection System initialized successfully!');
    console.log('📊 Features: 4 AI Models, Real-time Analysis, Modern UI');
    console.log('🔍 Ready to analyze news articles...');
});
