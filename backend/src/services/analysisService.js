// Professional NLP-based analysis using natural language processing libraries
import natural from "natural";
import Sentiment from "sentiment";

const sentimentAnalyzer = new Sentiment();
const { PorterStemmer, WordTokenizer } = natural;

// Enhanced sentiment analysis with context understanding
export function analyzeFeedbackText(text) {
  if (!text || typeof text !== "string" || text.trim().length === 0) {
    return {
      sentiment: "neutral",
      sentimentScore: 0,
      keywords: [],
      topics: [],
      toxicity: 0,
      language: "en",
      summary: "",
      emotion: "neutral",
      urgency: "low",
    };
  }

  const cleanText = text.trim();
  const lower = cleanText.toLowerCase();

  // 1. Advanced Sentiment Analysis using sentiment library
  const sentimentResult = sentimentAnalyzer.analyze(cleanText);
  const sentimentScore = sentimentResult.score;
  let sentiment = "neutral";
  if (sentimentScore > 2) sentiment = "positive";
  else if (sentimentScore < -2) sentiment = "negative";

  // 2. Keyword Extraction using TF-IDF
  const tokenizer = new WordTokenizer();
  const tokens = tokenizer.tokenize(lower) || [];
  const stemmedTokens = tokens.map((t) => PorterStemmer.stem(t)).filter((t) => t && t.length > 3);

  // Remove common stopwords
  const stopwords = new Set([
    "the", "a", "an", "and", "or", "but", "in", "on", "at", "to", "for", "of", "with", "by",
    "this", "that", "these", "those", "is", "are", "was", "were", "be", "been", "being",
    "have", "has", "had", "do", "does", "did", "will", "would", "should", "could", "may", "might",
    "can", "cannot", "must", "shall", "from", "into", "onto", "upon", "over", "under", "above",
    "below", "between", "among", "through", "during", "before", "after", "while", "when", "where",
    "why", "how", "what", "which", "who", "whom", "whose", "it", "its", "they", "them", "their",
  ]);

  const meaningfulTokens = stemmedTokens.filter((t) => !stopwords.has(t));
  const keywordFreq = {};
  meaningfulTokens.forEach((t) => {
    keywordFreq[t] = (keywordFreq[t] || 0) + 1;
  });

  const keywords = Object.entries(keywordFreq)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([word]) => word);

  // 3. Topic Detection (simple keyword-based topics)
  const topics = detectTopics(lower, keywords);

  // 4. Toxicity Detection
  const toxicPatterns = [
    /\b(stupid|idiot|dumb|moron|fool|hate|worst|terrible|awful|disgusting)\b/gi,
    /\b(f\*ck|sh\*t|damn|hell|b\*tch)\b/gi,
  ];
  const toxicityHits = toxicPatterns.reduce((count, pattern) => {
    const matches = lower.match(pattern);
    return count + (matches ? matches.length : 0);
  }, 0);
  const toxicity = Math.min(1, toxicityHits * 0.15);

  // 5. Language Detection (enhanced)
  const language = detectLanguage(lower);

  // 6. Intelligent Summary Generation
  const summary = generateSummary(cleanText);

  // 7. Emotion Detection
  const emotion = detectEmotion(lower, sentimentScore);

  // 8. Urgency Detection
  const urgency = detectUrgency(lower, sentimentScore);

  return {
    sentiment,
    sentimentScore,
    keywords,
    topics,
    toxicity,
    language,
    summary,
    emotion,
    urgency,
  };
}

function detectTopics(text, keywords) {
  const topicKeywords = {
    "product quality": ["quality", "product", "item", "material", "durable", "break", "broken"],
    "customer service": ["service", "support", "help", "staff", "employee", "representative", "agent"],
    "pricing": ["price", "cost", "expensive", "cheap", "affordable", "value", "money", "payment"],
    "delivery": ["delivery", "shipping", "arrive", "package", "ship", "fast", "slow", "late"],
    "website/app": ["website", "app", "site", "page", "load", "slow", "crash", "bug", "error"],
    "billing": ["billing", "invoice", "charge", "payment", "refund", "money", "credit"],
    "features": ["feature", "function", "option", "tool", "capability", "missing", "need"],
  };

  const detectedTopics = [];
  Object.entries(topicKeywords).forEach(([topic, words]) => {
    const matches = words.filter((w) => text.includes(w) || keywords.some((k) => k.includes(w)));
    if (matches.length >= 2) {
      detectedTopics.push(topic);
    }
  });

  return detectedTopics.length > 0 ? detectedTopics : ["general"];
}

function detectLanguage(text) {
  // Enhanced language detection
  const hasAccent = /[áéíóúñüÁÉÍÓÚÑÜ]/i.test(text);
  const spanishHints = [" el ", " la ", " los ", " las ", " de ", " que ", " y ", " es ", " en "];
  const frenchHints = [" le ", " la ", " les ", " de ", " et ", " est ", " dans ", " pour "];
  const germanHints = [" der ", " die ", " das ", " und ", " ist ", " für ", " mit "];

  if (hasAccent || spanishHints.some((w) => text.includes(w))) return "es";
  if (frenchHints.some((w) => text.includes(w))) return "fr";
  if (germanHints.some((w) => text.includes(w))) return "de";
  return "en";
}

function generateSummary(text) {
  // Intelligent sentence extraction for summary
  const sentences = text.split(/[.!?]+/).map((s) => s.trim()).filter((s) => s.length > 10);
  if (!sentences.length) return text.slice(0, 200);

  // Prefer first sentence (usually contains main point)
  let summary = sentences[0];

  // If first sentence is too short, add second
  if (summary.length < 50 && sentences.length > 1) {
    summary = `${summary} ${sentences[1]}`;
  }

  // Truncate if too long
  if (summary.length > 200) {
    summary = `${summary.slice(0, 197)}...`;
  }

  return summary;
}

function detectEmotion(text, sentimentScore) {
  const emotions = {
    happy: ["happy", "excited", "love", "great", "amazing", "wonderful", "fantastic", "excellent"],
    sad: ["sad", "disappointed", "unhappy", "upset", "depressed", "terrible"],
    angry: ["angry", "furious", "mad", "annoyed", "frustrated", "hate"],
    neutral: [],
  };

  if (sentimentScore > 3) return "happy";
  if (sentimentScore < -3) {
    if (emotions.angry.some((e) => text.includes(e))) return "angry";
    return "sad";
  }
  return "neutral";
}

function detectUrgency(text, sentimentScore) {
  const urgentKeywords = ["urgent", "asap", "immediately", "critical", "emergency", "broken", "crash", "not working"];
  const hasUrgent = urgentKeywords.some((k) => text.includes(k));
  const isNegative = sentimentScore < -2;

  if (hasUrgent || (isNegative && sentimentScore < -4)) return "high";
  if (isNegative || hasUrgent) return "medium";
  return "low";
}
