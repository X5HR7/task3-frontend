import { FC, useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { IMessage } from '../../interfaces/message.interface.ts';
import Form from '../Form/Form.tsx';
import Message from '../Message/Message.tsx';
import './App.css';

const App: FC = () => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const socket = io('http://localhost:3000');

  useEffect(() => {
    fetch('http://localhost:3000/api/messages')
      .then(res => res.json())
      .then(messages => {
        console.log(messages);
        setMessages(messages);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    socket.on('recMessage', (message: IMessage) => {
      console.log(message);
      setMessages(prevState => [...prevState, message]);
    });
  }, []);

  const handleSendMessage = (text: string) => {
    socket.emit('sendMessage', text);
  };

  return (
    <div className='app'>
      <ul className='messages'>
        {messages.length !== 0 ? (
          messages?.map(message => {
            return (
              <Message
                key={message.id}
                text={message.text}
                createdAt={message.createdAt}
                id={message.id}
              />
            );
          })
        ) : (
          <p className={'error'}>Сообщений еще нет!</p>
        )}
      </ul>
      <Form sendMessage={handleSendMessage} />
    </div>
  );
};

export default App;
