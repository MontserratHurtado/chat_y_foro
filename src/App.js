import React, { useState, useRef, useEffect } from 'react';
import './App.css';
import Profile from './Profile';
import mamaImg from './imagenes/mujer.jpg';
function App() {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [backgroundImage, setBackgroundImage] = useState('assets/flowers-background.jpg');
  const [isBlocked, setIsBlocked] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showProfile, setShowProfile] = useState(false);
  const optionsRef = useRef(null);
  const menuRef = useRef(null);
  const searchRef = useRef(null);
  const messagesEndRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  var img = document.createElement('img'); 
  img.src = 'src/imagenes/usuario mujer.jpg';
  const sendMessage = (e) => {
    e.preventDefault();
    if (inputValue.trim() !== '' && !isBlocked) {
      const msg = { text: inputValue, id: Date.now(), sender: 'me' };
      setMessages((prevMessages) => [...prevMessages, msg]);
      setInputValue('');

      // Simular el mensaje "Mensaje leído" después de 4 segundos
      setTimeout(() => {
        const readMessage = { text: 'Enviame tu ubicacion porfavor', id: Date.now() + 1, sender: 'other' };
        setMessages((prevMessages) => [...prevMessages, readMessage]);
      }, 4000);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      sendMessage(e);
    }
  };

  const handleOptionClick = (option) => {
    if (option === 'location') {
      sendLocation();
    } else if (option === 'audio') {
      if (isRecording) {
        stopRecording();
      } else {
        startRecording();
      }
      setShowOptions(true);
    } else if (option === 'photo') {
      document.getElementById('file-upload').click();
    }
  };

  const handleMenuClick = (option) => {
    if (option === 'changeBackground') {
      document.getElementById('file-upload-bg').click();
    } else if (option === 'clearChat') {
      setMessages([]);
    } else if (option === 'blockUser') {
      const newBlockedStatus = !isBlocked;
      setIsBlocked(newBlockedStatus);
      const blockMessage = newBlockedStatus ? 'Bloqueaste a este usuario' : 'Usuario desbloqueado';
      setMessages((prevMessages) => [...prevMessages, { text: blockMessage, id: Date.now(), sender: 'system' }]);
      if (newBlockedStatus) {
        setInputValue('Bloqueaste a este usuario');
      } else {
        setInputValue('');
      }
    } else if (option === 'searchMessage') {
      setShowSearchBar(true);
      setSearchTerm('');
    }
    setShowMenu(false);
  };

  const startRecording = async () => {
    setIsRecording(true);
    audioChunksRef.current = [];

    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorderRef.current = new MediaRecorder(stream);

    mediaRecorderRef.current.ondataavailable = (event) => {
      audioChunksRef.current.push(event.data);
    };

    mediaRecorderRef.current.onstop = () => {
      const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
      const audioUrl = URL.createObjectURL(audioBlob);
      const audioMessage = { text: 'Mensaje de audio', audioUrl, id: Date.now(), sender: 'me' };
      setMessages((prevMessages) => [...prevMessages, audioMessage]);
    };

    mediaRecorderRef.current.start();
  };

  const stopRecording = () => {
    setIsRecording(false);
    mediaRecorderRef.current.stop();
  };

  const sendLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        const locationMessage = `https://maps.app.goo.gl/enzzweiNXX2xxhCJ6?g_st=ac`;
        const msg = { text: locationMessage, id: Date.now(), sender: 'me' };
        setMessages((prevMessages) => [...prevMessages, msg]);
      });
    } else {
      alert("Geolocalización no soportada en este navegador.");
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      const msg = { text: `Imagen: ${file.name}`, imageUrl: reader.result, id: Date.now(), sender: 'me' };
      setMessages((prevMessages) => [...prevMessages, msg]);
    };
    reader.readAsDataURL(file);
  };

  const changeBackgroundImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBackgroundImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (optionsRef.current && !optionsRef.current.contains(event.target)) {
        setShowOptions(false);
      }
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearchBar(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const filteredMessages = searchTerm
    ? messages.filter(msg => msg.text.toLowerCase().includes(searchTerm.toLowerCase()))
    : messages;

  return (
    <div className="App">
      {showProfile ? (
        <Profile toggleProfile={() => setShowProfile(false)} />
      ) : (
        <div className="chat-window" style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover' }}>
          <div className="header">
            <div className="contact-info" onClick={() => setShowProfile(true)}>
            
            
              <div className="user-info">
            { <h2>Mamá id: Date.now() + 3, sender: 'other', image: trabajoImg</h2>} 

                <div className="online-status">En línea</div>
              </div>
            </div>
            <div className="menu-button" onClick={() => setShowMenu(!showMenu)} ref={menuRef}>
              •••
              {showMenu && (
                <div className="menu" style={{ position: 'absolute', zIndex: 1000 }}>
                  <button onClick={() => handleMenuClick('changeBackground')}>Cambiar fondo</button>
                  <button onClick={() => handleMenuClick('clearChat')}>Vaciar chat</button>
                  <button onClick={() => handleMenuClick('blockUser')}>
                    {isBlocked ? 'Desbloquear Usuario' : 'Bloquear Usuario'}
                  </button>
                  <button onClick={() => handleMenuClick('searchMessage')}>Buscar mensaje</button>
                </div>
              )}
            </div>
            {showSearchBar && (
              <div ref={searchRef} className="search-bar">
                <input
                  type="text"
                  placeholder="Buscar mensajes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="search-input"
                />
              </div>
            )}
          </div>
          <div className="chat-container">
            <div className="messages">
              {filteredMessages.map((msg) => (
                <div key={msg.id} className={`message ${msg.sender}`}>
                  {msg.audioUrl ? (
                    <audio controls src={msg.audioUrl}></audio>
                  ) : (
                    msg.imageUrl ? <img src={msg.imageUrl} alt="Mensaje" /> : msg.text
                  )}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
            {isBlocked && (
              <div className="blocked-message">
                Este usuario no puede enviarte ni recibir mensajes tuyos.
              </div>
            )}
          </div>
          <form onSubmit={sendMessage} className="message-form">
            <div className="message-buttons" ref={optionsRef}>
              <div className="attach-button" onClick={() => setShowOptions(!showOptions)}>📎</div>
              {showOptions && (
                <div className="options-menu">
                  <button type="button" onClick={() => handleOptionClick('location')}>📍 Enviar Ubicación</button>
                  <button type="button" onClick={() => handleOptionClick('photo')}>📸 Enviar Foto</button>
                </div>
              )}
            </div>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => !isBlocked && setInputValue(e.target.value)}
              placeholder={isBlocked ? 'Bloqueaste a este usuario' : 'Escribe un mensaje'}
              className="message-input"
              disabled={isBlocked}
              onKeyDown={handleKeyDown}
            />
            <button type="submit" className="send-button" disabled={isBlocked}>Enviar</button>
            <input
              type="file"
              onChange={handleFileUpload}
              style={{ display: 'none' }}
              id="file-upload"
            />
            <input
              type="file"
              onChange={changeBackgroundImage}
              style={{ display: 'none' }}
              id="file-upload-bg"
            />
          </form>
        </div>
      )}
    </div>
  );
}

export default App;
