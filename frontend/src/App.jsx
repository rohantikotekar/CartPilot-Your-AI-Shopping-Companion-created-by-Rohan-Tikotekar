import { useState, useRef, useEffect } from 'react';

const API_URL = import.meta.env.VITE_API_URL || '/api';

function App() {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "👋 Hi! I'm CartPilot created by Rohan Tikotekar. I can help you find products from our store, answer questions, or recommend items based on images. Try asking me something like 'Recommend a sports t-shirt' or upload an image!"
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageData, setImageData] = useState(null);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setImageData(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImagePreview(null);
    setImageData(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const parseProductRecommendations = (content) => {
    // Try to extract product information from the response
    const productPattern = /\*\*(.+?)\*\*[\s\S]*?Price:\*\*\s*\$?([\d.]+)[\s\S]*?image["\s:]*([^\s"]+)/gi;
    const matches = [...content.matchAll(productPattern)];
    
    if (matches.length > 0) {
      return matches.map(match => ({
        name: match[1],
        price: match[2],
        image: match[3]
      }));
    }
    return null;
  };

  const renderMessage = (msg) => {
    if (msg.role === 'assistant') {
      const products = parseProductRecommendations(msg.content);
      
      if (products && products.length > 0) {
        return (
          <div>
            <div style={styles.messageText}>{msg.content.split('**')[0]}</div>
            <div style={styles.productGrid}>
              {products.map((product, idx) => (
                <div key={idx} style={styles.productCard}>
                  <img 
                    src={product.image} 
                    alt={product.name}
                    style={styles.productImage}
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/200x200?text=No+Image';
                    }}
                  />
                  <div style={styles.productInfo}>
                    <h4 style={styles.productName}>{product.name}</h4>
                    <p style={styles.productPrice}>${product.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      }
    }
    
    return <div style={styles.messageText}>{msg.content}</div>;
  };

  const sendMessage = async () => {
    if ((!input.trim() && !imageData) || loading) return;

    const userMessage = {
      role: 'user',
      content: input.trim() || 'What do you see in this image?',
      image: imagePreview
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: input.trim() || 'What do you see in this image?',
          image: imageData
        })
      });

      if (!response.ok) throw new Error('Failed to get response');

      const data = await response.json();
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: data.reply
      }]);
    } catch (error) {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: '❌ Sorry, something went wrong. Please try again.'
      }]);
      console.error('Error:', error);
    } finally {
      setLoading(false);
      removeImage();
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.chatBox}>
        <div style={styles.header}>
          <h1 style={styles.title}>🛍️ CartPilot</h1>
          <p style={styles.subtitle}>Your AI Shopping Companion created by Rohan Tikotekar</p>
        </div>

        <div style={styles.messagesContainer}>
          {messages.map((msg, idx) => (
            <div key={idx} style={{
              ...styles.message,
              ...(msg.role === 'user' ? styles.userMessage : styles.assistantMessage)
            }}>
              {msg.image && (
                <img src={msg.image} alt="uploaded" style={styles.messageImage} />
              )}
              {renderMessage(msg)}
            </div>
          ))}
          {loading && (
            <div style={styles.loadingContainer}>
              <div style={styles.loadingDot}></div>
              <div style={styles.loadingDot}></div>
              <div style={styles.loadingDot}></div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div style={styles.inputContainer}>
          {imagePreview && (
            <div style={styles.imagePreviewContainer}>
              <img src={imagePreview} alt="preview" style={styles.imagePreview} />
              <button onClick={removeImage} style={styles.removeImageBtn}>✕</button>
            </div>
          )}
          
          <div style={styles.inputWrapper}>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageSelect}
              style={styles.fileInput}
              id="fileInput"
            />
            <label htmlFor="fileInput" style={styles.imageButton}>
              📷
            </label>
            
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me anything or upload an image..."
              style={styles.input}
              disabled={loading}
            />
            
            <button
              onClick={sendMessage}
              disabled={loading || (!input.trim() && !imageData)}
              style={{
                ...styles.sendButton,
                ...(loading || (!input.trim() && !imageData) ? styles.sendButtonDisabled : {})
              }}
            >
              {loading ? '⏳' : '➤'}
            </button>
          </div>
        </div>

        <div style={styles.examples}>
          <p style={styles.examplesTitle}>Try asking:</p>
          <div style={styles.exampleButtons}>
            <button onClick={() => setInput("What can you do?")} style={styles.exampleBtn}>
              What can you do?
            </button>
            <button onClick={() => setInput("Recommend a sports t-shirt")} style={styles.exampleBtn}>
              Sports t-shirt
            </button>
            <button onClick={() => setInput("Best products for gym")} style={styles.exampleBtn}>
              Gym products
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
  },
  chatBox: {
    width: '100%',
    maxWidth: '800px',
    height: '90vh',
    backgroundColor: 'white',
    borderRadius: '20px',
    boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
  },
  header: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    padding: '24px',
    textAlign: 'center',
  },
  title: {
    fontSize: '28px',
    fontWeight: '700',
    marginBottom: '8px',
  },
  subtitle: {
    fontSize: '14px',
    opacity: 0.9,
  },
  messagesContainer: {
    flex: 1,
    overflowY: 'auto',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    backgroundColor: '#f8f9fa',
  },
  message: {
    maxWidth: '85%',
    padding: '12px 16px',
    borderRadius: '16px',
    wordWrap: 'break-word',
    lineHeight: '1.5',
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#667eea',
    color: 'white',
  },
  assistantMessage: {
    alignSelf: 'flex-start',
    backgroundColor: 'white',
    color: '#333',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  },
  messageImage: {
    maxWidth: '100%',
    borderRadius: '12px',
    marginBottom: '8px',
  },
  messageText: {
    whiteSpace: 'pre-wrap',
  },
  productGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
    gap: '12px',
    marginTop: '12px',
  },
  productCard: {
    backgroundColor: '#f8f9fa',
    borderRadius: '12px',
    overflow: 'hidden',
    border: '1px solid #e0e0e0',
    transition: 'transform 0.2s',
    cursor: 'pointer',
  },
  productImage: {
    width: '100%',
    height: '180px',
    objectFit: 'cover',
  },
  productInfo: {
    padding: '10px',
  },
  productName: {
    fontSize: '13px',
    fontWeight: '600',
    margin: '0 0 6px 0',
    color: '#333',
  },
  productPrice: {
    fontSize: '14px',
    fontWeight: '700',
    color: '#667eea',
    margin: 0,
  },
  loadingContainer: {
    display: 'flex',
    gap: '8px',
    alignSelf: 'flex-start',
    padding: '16px',
  },
  loadingDot: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    backgroundColor: '#667eea',
    animation: 'bounce 1.4s infinite ease-in-out both',
  },
  inputContainer: {
    padding: '20px',
    backgroundColor: 'white',
    borderTop: '1px solid #e0e0e0',
  },
  imagePreviewContainer: {
    position: 'relative',
    marginBottom: '12px',
    display: 'inline-block',
  },
  imagePreview: {
    maxWidth: '150px',
    maxHeight: '150px',
    borderRadius: '12px',
    border: '2px solid #667eea',
  },
  removeImageBtn: {
    position: 'absolute',
    top: '-8px',
    right: '-8px',
    backgroundColor: '#ff4444',
    color: 'white',
    border: 'none',
    borderRadius: '50%',
    width: '24px',
    height: '24px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: 'bold',
  },
  inputWrapper: {
    display: 'flex',
    gap: '12px',
    alignItems: 'center',
  },
  fileInput: {
    display: 'none',
  },
  imageButton: {
    backgroundColor: '#f0f0f0',
    border: 'none',
    borderRadius: '12px',
    width: '48px',
    height: '48px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    fontSize: '24px',
    transition: 'all 0.2s',
  },
  input: {
    flex: 1,
    padding: '14px 18px',
    border: '2px solid #e0e0e0',
    borderRadius: '12px',
    fontSize: '15px',
    outline: 'none',
    transition: 'border-color 0.2s',
  },
  sendButton: {
    backgroundColor: '#667eea',
    color: 'white',
    border: 'none',
    borderRadius: '12px',
    width: '48px',
    height: '48px',
    cursor: 'pointer',
    fontSize: '20px',
    fontWeight: 'bold',
    transition: 'all 0.2s',
  },
  sendButtonDisabled: {
    backgroundColor: '#ccc',
    cursor: 'not-allowed',
  },
  examples: {
    padding: '16px 20px',
    backgroundColor: '#f8f9fa',
    borderTop: '1px solid #e0e0e0',
  },
  examplesTitle: {
    fontSize: '13px',
    color: '#666',
    marginBottom: '8px',
    fontWeight: '500',
  },
  exampleButtons: {
    display: 'flex',
    gap: '8px',
    flexWrap: 'wrap',
  },
  exampleBtn: {
    backgroundColor: 'white',
    border: '1px solid #e0e0e0',
    borderRadius: '20px',
    padding: '6px 14px',
    fontSize: '13px',
    cursor: 'pointer',
    transition: 'all 0.2s',
    color: '#667eea',
    fontWeight: '500',
  },
};

export default App;