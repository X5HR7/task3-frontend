import { ChangeEvent, FC, FormEvent, useEffect, useState } from 'react';
import './Form.css';

interface IForm {
  sendMessage: (text: string) => void;
}

const Form: FC<IForm> = ({ sendMessage }) => {
  const [text, setText] = useState<string>('');
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    if (text !== '') setIsValid(true);
    else setIsValid(false);
  }, [text]);

  const handleTextChange = (event: ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    sendMessage(text);
    setText('');
  };

  return (
    <form className='form' onSubmit={handleFormSubmit}>
      <input type='text' className='input' value={text} onChange={handleTextChange} />
      <button type='submit' className='button' disabled={!isValid}>
        Отправить
      </button>
    </form>
  );
};

export default Form;
