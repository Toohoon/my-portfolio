import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './Chat.css'

function Chat() {
  const [messages, setMessages] = useState([
    { role: 'ai', content: '你好！我是 AI，有什么可以帮你？' }
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { role: 'user', content: input }];
    setMessages([
      ...newMessages,
      { role: 'ai', content: '抱歉，AI 暂时不可用。' }
    ]);
    setInput('');
  };

  return (
    <div className="chat-page">
      <Link to="/" className="btn back-btn">
        返回首页
      </Link>

      <h1 className="chat-title">AI Chat</h1>

      <div className="chat-box">
        {messages.map((msg, index) => (
          <div key={index} className={`chat-message ${msg.role}`}>
            <span>{msg.role === 'user' ? '你' : 'AI'}：</span> {msg.content}
          </div>
        ))}
      </div>

      <div className="chat-footer">
        <div className="chat-input">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="请输入..."
          />
          <button onClick={handleSend}>发送</button>
        </div>
      </div>
    </div>
  )
}

export default Chat;
