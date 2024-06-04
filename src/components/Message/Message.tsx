import { FC } from 'react';
import { IMessage } from '../../interfaces/message.interface.ts';
import './Message.css';

const Message: FC<IMessage> = ({ text, createdAt }) => {
  const dateTime = new Date(createdAt);

  return (
    <li className='message'>
      <p className='message__date'>{dateTime.toDateString()}</p>
      <p className='message__text'>{text}</p>
    </li>
  );
};

export default Message;
