import './App.css';
import  {useState, useEffect} from 'react';
import { useCallback } from 'react';
  
    
 const App = () => {
  const [ breakLength, setBreakLength ]  = useState(5);
  const [ sessionLength, setSessionLength ] = useState(25);
  const [timeLeft, setTimeLeft]  = useState(1500);
  const [play, setPlay] = useState('false');
 const [timingType, setTimingtype] = useState("SESSION");
  
  const timeout = setTimeout(() => {
  if(timeLeft && play) {
    setTimeLeft(timeLeft - 1)
  }  
  }, 1000)
  
  const handleBreakIncrease = () => {
    if(breakLength < 60) {
    setBreakLength(breakLength + 1);  
    }
  }
  const handleBreakDecrease = () => {
    if(breakLength > 1) {
    setBreakLength(breakLength - 1);  
    }
  }
  const handleSessionIncrease = () => {
    if(sessionLength < 60) {
      setSessionLength(sessionLength + 1);
      setTimeLeft(timeLeft + 60)
    }
  }
  const handleSessionDecrease = () => {
    if(sessionLength > 1) {
      setSessionLength(sessionLength - 1);
      setTimeLeft(timeLeft - 60)
    }
  }
 const handleReset = () => {
   clearTimeout(timeout);
   setBreakLength(5);
   setSessionLength(25);
   setTimeLeft(1500);
   setPlay(false);
   const audio = document.getElementById('beep');
   audio.pause();
   setTimingtype("SESSION");
   audio.currentTime = 0;
 } 
 const handlePlay = () => {
   clearTimeout(timeout);
   setPlay(!play);
 }
 const resetTimer = () => {
   const audio = document.getElementById('beep');
  if(!timeLeft && timingType === 'SESSION') {
    setTimeLeft(breakLength * 60);
    setTimingtype("BREAK");
    audio.play();
  }
 if(!timeLeft && timingType === 'BREAK') {
    setTimeLeft(sessionLength * 60);
    setTimingtype("SESSION");
    audio.pause();
   audio.currentTime = 0;
  }
 }
 

const clock = useCallback(() => {
  if (play) {
    resetTimer();
  } else {
    clearTimeout(timeout);
  }
}, [play, timeout, resetTimer]);


useEffect(() => {
  clock();
}, [clock]);
 
  const timeFormatter = () => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft - minutes * 60;
    const formattedSeconds = seconds < 10 ? '0' + seconds : seconds;
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
    
    return `${formattedMinutes}:${formattedSeconds}`;
  } 
  const title = timingType === 'SESSION' ? 'Session' : 'break'; 
  
  return (
   <div>
    <div className="wrapper">
      <h2>25 + 5 Clock</h2>
      <div className="break-session-length">
        <div>
          <h3 id="break-label">Break Length</h3>
          <div>
            <button disabled={play} onClick={handleBreakIncrease} id="break-increment">Increase</button>
              <strong id="break-length">{breakLength}</strong>
            <button disabled={play} onClick={handleBreakDecrease} id="break-decrement">Decrease</button>
          </div>
         </div>
         <div>
           <h3 id="session-label">Session Length</h3>
           <div>
            <button disabled={play} onClick={handleSessionIncrease} id="session-increment">Increase</button>
              <strong id="session-length">{sessionLength}</strong>
            <button disabled={play} onClick={handleSessionDecrease} id="session-decrement">Decrease</button>
          </div>
         </div>
      </div>
      <div className="timer-wrapper">
        <div className="timer">
           <h2 id="timer-label">{title}</h2>
           <h3 id="time-left">{timeFormatter()}</h3>
        </div>
        <button onClick={handlePlay} id="start_stop">Start/Stop</button>
        <button onClick={handleReset} id="reset">Reset</button>
      </div>
    </div>
    <audio
      id="beep" 
      preload="auto"
      src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
    />
    </div>
    );
}


export default App;
