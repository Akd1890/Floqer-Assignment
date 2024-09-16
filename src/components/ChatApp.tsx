import React, { useState } from 'react';
import { Card, Input, Button, List } from 'antd';

const ChatApp: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [messages, setMessages] = useState<Array<string>>([]);

  const handleSend = () => {
    if (inputValue) {
      setMessages([...messages, inputValue]);
      setInputValue('');
    }
  };

  return (
    <Card className="card" style={{ marginTop: '20px' }}>
      <h3>Ask Insights from the Data</h3>
      <Input.TextArea
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Ask anything about the ML Engineer Salaries..."
        rows={4}
      />
      <Button type="primary" onClick={handleSend} style={{ marginTop: '10px' }}>
        Send
      </Button>
      <List
        dataSource={messages}
        renderItem={(message, index) => (
          <List.Item key={index}>{message}</List.Item>
        )}
        style={{ marginTop: '20px' }}
      />
    </Card>
  );
};

export default ChatApp;
