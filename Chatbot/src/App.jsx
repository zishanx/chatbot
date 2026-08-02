//Built it while learning React.

import './App.css'
import zishan from './assets/zishan.png'
import user from './assets/user.png'
import spinner from './assets/loading-spinner.gif'
import { useState } from 'react'
import { useRef } from 'react'
import { useEffect } from 'react'

function getResponse(input) {

  let cleanInput = input.trim().toLowerCase();



  if (cleanInput === "hi") {
    return 'Hello, How can I help you ?'
  }
  else if (cleanInput === "flip a coin") {
    let random = Math.floor(Math.random() * 2);
    let value;
    random === 0 ? value = "Head" : value = "Tail";

    return `You got ${value}`
  }
  else {
    return "Sorry I didn't understand."
  }
}

function ChatbotInput({ chatMessages, setChatMessages }) {

  const [input, setInput] = useState('');

  function saveInput(event) {
    setInput(event.target.value);
  }

  function saveMessage() {
    if (input === '') return;
    let clone = {}

    clone.message = input;
    clone.type = "user"
    clone.id = crypto.randomUUID()


    let response = getResponse(input)

    let responseobj = {}

    responseobj.message = <img src={spinner} width='50'></img>;
    responseobj.type = "robot";
    responseobj.id = crypto.randomUUID();

    setChatMessages([...chatMessages, clone, responseobj])

    setTimeout(() => {
      responseobj.message = response;
      setChatMessages(prev => [...prev.slice(0, -1), responseobj])
    }, 1000)

    setInput('');


  }

  function enter(event) {
    if (event.key === "Enter") {
      saveMessage()
    }

  }

  return (
    <div className='input'>
      <input
        type="text"
        onChange={saveInput}
        value={input}
        className='text-bar'
        onKeyDown={enter}
      >
      </input>
      <button
        onClick={saveMessage}
        className='send'
      >Send</button>
    </div>
  )
}

function ChatMessage({ chatMessages }) {



  return (

    <>
      {chatMessages.map((chatMessage) => {

        return (
          <div className={chatMessage.type}  >

            <img className='chat-img' src={chatMessage.type === "robot" ? zishan : user} alt="pfp" width='50' />
            <p>{chatMessage.message}</p>
          </div>
        )
      })}




    </>
  )
}


function App() {

  const [chatMessages, setChatMessages] = useState([]);
  const scroll = useRef(null)

  useEffect(() => {
    if (!scroll.current) return ;
    const container = scroll.current;
    container.scrollTop = container.scrollHeight;
  }, [chatMessages])

  return (
    <div className='container'>

      <div
        className='chat-box'
        ref={scroll}
      >
        <ChatMessage
          chatMessages={chatMessages}
        />
      </div>
      <ChatbotInput
        chatMessages={chatMessages}
        setChatMessages={setChatMessages}
      ></ChatbotInput>

    </div>
  )
}

export default App
