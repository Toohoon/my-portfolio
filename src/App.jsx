import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './App.css'

function App() {
  const localQuotes = [
    { text: "Stay hungry, stay foolish.", author: "Steve Jobs" },
    { text: "Talk is cheap. Show me the code.", author: "Linus Torvalds" },
    { text: "Knowledge is power.", author: "Francis Bacon" },
  ];

  const randomIndex = Math.floor(Math.random() * localQuotes.length);
  const [quote, setQuote] = useState(localQuotes[randomIndex].text);
  const [author, setAuthor] = useState(localQuotes[randomIndex].author);
  const [quoteKey, setQuoteKey] = useState(Date.now());

  const fetchQuote = async () => {
    try {
      const response = await fetch('https://api.quotable.io/random');
      const data = await response.json();
      setQuote(data.content);
      setAuthor(data.author);
      setQuoteKey(Date.now());
    } catch (error) {
      console.error('获取名言失败：', error);
      // 保留当前名言
    }
  };

  useEffect(() => {
    // 首次延迟加载
    const timer = setTimeout(() => {
      fetchQuote();
    }, 1000);

    // 每 5 秒换一次
    const interval = setInterval(() => {
      fetchQuote();
    }, 5000);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="container">
      <img
        src="/me.jpg"
        alt="我的头像"
        className="avatar"
      />
      <h1>Hello World</h1>
      <p>我是喜欢代码的郑斗薰</p>
      <p>Contact Me: jungtoohoon@gmail.com</p>

      <Link to="/resume" className="btn">
        查看我的简历
      </Link>

      <div className="quote-box">
        <div key={quoteKey} className="fade-quote">
          <p className="quote-text">“{quote}”</p>
          <p className="quote-author">— {author}</p>
        </div>
      </div>
    </div>
  )
}

export default App
