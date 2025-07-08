import { useState } from 'react'
import { Link } from 'react-router-dom'
import './Chat.css'

function Chat() {
  const [messages, setMessages] = useState([
    { role: 'ai', content: '你好！我是 AI，有什么可以帮你？' }
  ])
  const [input, setInput] = useState('')

  const handleSend = async () => {
    if (!input.trim()) return

    // 添加用户输入
    const newMessages = [...messages, { role: 'user', content: input }]
    setMessages(newMessages)

    // 调用 OpenAI API
    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer YOUR_OPENAI_API_KEY` // <-- 替换你的 key
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            { role: 'system', content: '你是一个乐于助人的 AI 助手。' },
            ...newMessages.map(m => ({
              role: m.role,
              content: m.content
            }))
          ]
        })
      })

      const data = await response.json()
      const aiMessage = data.choices[0].message.content

      setMessages([
        ...newMessages,
        { role: 'ai', content: aiMessage }
      ])
    } catch (error) {
      console.error(error)
      setMessages([
        ...newMessages,
        { role: 'ai', content: '抱歉，AI 服务暂时不可用。' }
      ])
    }

    setInput('')
  }

  return (
    <div className="chat-container">
      <h1>AI Chat</h1>
      <div className="chat-box">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`chat-message ${msg.role}`}
          >
            <span>{msg.role === 'user' ? '你' : 'AI'}：</span> {msg.content}
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="请输入..."
        />
        <button onClick={handleSend}>发送</button>
      </div>
      <Link to="/" className="btn">
        返回首页
      </Link>
    </div>
  )
}

export default Chat
