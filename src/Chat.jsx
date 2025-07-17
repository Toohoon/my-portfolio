import { useState } from 'react'
import { Link } from 'react-router-dom'
import './Chat.css'

function Chat() {
  const [messages, setMessages] = useState([
    { role: 'ai', content: '你好！我是 AI，有什么可以帮你？' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    // 先把用户消息加进消息列表
    const newMessages = [...messages, { role: 'user', content: input }];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('http://localhost:3001/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: input }),
      });

      if (!response.ok) {
        throw new Error('网络请求失败');
      }

      const data = await response.json();

      setMessages([
        ...newMessages,
        { role: 'ai', content: data.result || 'AI 无回复' }
      ]);
    } catch (error) {
      console.error(error);
      setMessages([
        ...newMessages,
        { role: 'ai', content: '请求失败，请稍后再试。' }
      ]);
    } finally {
      setLoading(false);
    }
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

        {loading && (
          <div className="chat-message ai">
            <span>AI：</span> 正在输入...
          </div>
        )}
      </div>

      <div className="chat-footer">
        <div className="chat-input">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="请输入..."
            onKeyDown={e => {
              if (e.key === 'Enter') {
                handleSend();
              }
            }}
            disabled={loading}
          />
          <button onClick={handleSend} disabled={loading}>
            发送
          </button>
        </div>
      </div>
    </div>
  )
}

export default Chat;
