import React, { useState, useEffect, useRef } from 'react';
import { FaMicrophone, FaPaperPlane, FaTimes } from 'react-icons/fa';

const recommendations = {
  en: ['What is your purpose?', 'How can I stay safe?', 'Tell me about cyber safety.', 'What to do in case of emergency?'],
  hi: ['आपका उद्देश्य क्या है?', 'मैं सुरक्षित कैसे रहूं?', 'साइबर सुरक्षा क्या है?', 'आपातकाल की स्थिति में क्या करें?']
};

const responses = {
  en: {
    'What is your purpose?': "I'm here to assist you with safety-related queries 🌟",
    'How can I stay safe?': 'Always stay alert, avoid unsafe areas, and keep emergency contacts handy 📱',
    'Tell me about cyber safety.': 'Use strong passwords, avoid suspicious links, and enable two-factor authentication 🔐',
    'What to do in case of emergency?': 'Call emergency services, stay calm, and find a safe place 🚨'
  },
  hi: {
    'आपका उद्देश्य क्या है?': 'मैं आपकी सुरक्षा से संबंधित प्रश्नों में सहायता के लिए यहां हूं 🌟',
    'मैं सुरक्षित कैसे रहूं?': 'हमेशा सतर्क रहें, असुरक्षित क्षेत्रों से बचें, और आपातकालीन संपर्क तैयार रखें 📱',
    'साइबर सुरक्षा क्या है?': 'मजबूत पासवर्ड का उपयोग करें, संदिग्ध लिंक से बचें, और दो-स्तरीय प्रमाणीकरण सक्षम करें 🔐',
    'आपातकाल की स्थिति में क्या करें?': 'आपातकालीन सेवाओं को कॉल करें, शांत रहें, और सुरक्षित स्थान खोजें 🚨'
  }
};

const ChatBot = ({ onClose }) => {
  const [messages, setMessages] = useState([
    { sender: 'sakhi', text: 'Hi there! 🌼 I\'m Sakhi, your safety buddy. Ask me anything!' }
  ]);
  const [input, setInput] = useState('');
  const [listening, setListening] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [language, setLanguage] = useState('en');
  const recognitionRef = useRef(null);
  const chatEndRef = useRef(null);

  const speak = (text) => {
    const synth = window.speechSynthesis;
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = language === 'hi' ? 'hi-IN' : 'en-US';
    const voices = synth.getVoices();
    utter.voice = voices.find((v) =>
      language === 'hi' ? v.lang.includes('hi-IN') : v.lang.includes('en-US')
    ) || voices[0];
    synth.speak(utter);
  };

  useEffect(() => {
    if ('webkitSpeechRecognition' in window) {
      const SpeechRecognition = window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.lang = language === 'hi' ? 'hi-IN' : 'en-US';

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
      };

      recognitionRef.current = recognition;
    }
  }, [language]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = (text = null) => {
    const userInput = text || input.trim();
    if (userInput === '') return;

    const newMessages = [...messages, { sender: 'user', text: userInput }];
    setMessages(newMessages);
    setInput('');
    setIsTyping(true);

    let reply = responses[language][userInput] || 'Thanks for your query! Let me look into it. 🔍';

    setTimeout(() => {
      setMessages([...newMessages, { sender: 'sakhi', text: reply }]);
      speak(reply);
      setIsTyping(false);
    }, 800);
  };

  const startListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.start();
      setListening(true);
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setListening(false);
    }
  };

  const handleLanguageChange = () => {
    setLanguage((prev) => (prev === 'en' ? 'hi' : 'en'));
  };

  const handleClose = () => {
    if (onClose && typeof onClose === 'function') {
      onClose();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 bg-white shadow-xl rounded-xl w-[360px] h-[550px] flex flex-col z-50 border border-emerald-200 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white p-3 rounded-t-xl flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-emerald-600">
            <span className="text-lg">🤖</span>
          </div>
          <h2 className="font-semibold">Chat with Sakhi</h2>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={handleLanguageChange} 
            className="text-xs bg-white/20 hover:bg-white/30 text-white px-2 py-1 rounded-md transition"
          >
            {language === 'en' ? 'हिन्दी' : 'English'}
          </button>
          <button 
            onClick={handleClose}
            className="hover:text-emerald-200 transition"
          >
            <FaTimes />
          </button>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-gradient-to-b from-white to-emerald-50">
        {messages.map((msg, index) => (
          <div key={index} className={`flex ${msg.sender === 'sakhi' ? 'items-start' : 'justify-end'}`}>
            <div
              className={`px-4 py-3 rounded-2xl max-w-[85%] transition-all duration-300 ${
                msg.sender === 'sakhi'
                  ? 'bg-white text-gray-800 shadow-sm border border-emerald-100 rounded-tl-none'
                  : 'bg-emerald-600 text-white rounded-br-none'
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex items-start">
            <div className="px-4 py-3 bg-white text-gray-800 shadow-sm rounded-2xl rounded-tl-none border border-emerald-100">
              <div className="flex space-x-2">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-bounce"></div>
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-bounce" style={{ animationDelay: '0.4s' }}></div>
              </div>
            </div>
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      {/* Recommendations */}
      <div className="px-4 pb-3 pt-2 bg-white border-t border-emerald-100 flex flex-wrap gap-2">
        {recommendations[language].map((question, index) => (
          <button
            key={index}
            onClick={() => handleSend(question)}
            className="text-xs bg-emerald-100 hover:bg-emerald-200 text-emerald-800 px-3 py-1.5 rounded-full transition"
          >
            {question}
          </button>
        ))}
      </div>

      {/* Input controls */}
      <div className="p-3 border-t border-emerald-100 bg-white flex gap-2 items-center">
        <input
          type="text"
          className="flex-1 border border-emerald-200 focus:border-emerald-400 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-emerald-300 transition"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={language === 'en' ? 'Type your message...' : 'अपना संदेश लिखें...'}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
        />
        <button
          onClick={() => handleSend()}
          className="w-10 h-10 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center transition"
        >
          <FaPaperPlane className="text-sm" />
        </button>
        <button
          onMouseDown={startListening}
          onMouseUp={stopListening}
          className={`w-10 h-10 rounded-full flex items-center justify-center transition ${
            listening 
              ? 'bg-red-500 text-white animate-pulse' 
              : 'bg-emerald-100 hover:bg-emerald-200 text-emerald-600'
          }`}
        >
          <FaMicrophone className="text-sm" />
        </button>
      </div>
    </div>
  );
};

export default ChatBot;