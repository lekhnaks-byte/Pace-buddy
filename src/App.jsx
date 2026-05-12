import { useState, useEffect } from 'react'

function App() {

    const [timer, setTimer] = useState(1500000);
    const [mode, setMode] = useState("FOCUS SESSION");
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        let timerId;

        if (isActive && timer>0){
            timerId = setTimeout(() => {
            setTimer(timer - 1000);
        }, 1000);
    }

        return () => clearTimeout(timerId);
    }, [timer, isActive]);

    const getFormattedTime = (milliseconds) => {
        let total_seconds = parseInt(Math.floor(milliseconds / 1000));
        let minutes = parseInt(Math.floor(total_seconds / 60));
        let seconds = parseInt(total_seconds % 60);

        return `${minutes.toString().padStart(2, '0')} : ${seconds.toString().padStart(2, '0')}`;
    };

        const changemode = (numMin, modeName) => {
        setIsActive(false);
        setTimer(numMin*1000*60);
        setMode(modeName);
    }

    const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    if (mode === "FOCUS SESSION") setTimer(25 * 60 * 1000);
    if (mode === "SHORT BREAK") setTimer(5 * 60 * 1000);
    if (mode === "LONG BREAK") setTimer(15 * 60 * 1000);
  };

  const startButtonText = isActive ? "PAUSE" : "START";
  
    return(
        <div>
        <h1 className="text-violet-950 text-center text-4xl font-extrabold p-7">Welcome to PaceBuddy!</h1>
        <h3 className="text-violet-700 text-center text-2xl font-semibold p-2">- Your very own pomodoro timer -</h3>
        <div className = "flex place-self-center gap-16 p-2">
            <button onClick={() => changemode(25, "FOCUS SESSION")} className="font-semibold rounded-xl bg-violet-500 px-4 py-2 m-6 active:scale-95 transition-all">FOCUS SESSION</button>
            <button onClick={() => changemode(5, "SHORT BREAK")} className="font-semibold rounded-xl bg-violet-500 px-4 py-2 m-6 active:scale-95 transition-all">SHORT BREAK</button>
            <button onClick={() => changemode(18, "LONG BREAK")} className="font-semibold rounded-xl bg-violet-500 px-4 py-2 m-6 active:scale-95 transition-all">LONG BREAK</button>
        </div>
        <div className ="flex flex-col items-center justify-start">
            <div className ="bg-violet-600 p-10 rounded-3xl w-80 text-center mt-10">
                <h2 className ="font-bold text-m text-white mb-4">{mode}</h2>
                <div className ="text-5xl font-mono text-black mb-8">
                    {getFormattedTime(timer)}
                </div>
                <div className ="flex gap-4 justify-center">
                    <button
                        onClick = {toggleTimer}
                        className = {`flex-1 py-3 bg-white font-bold rounded-xl transition-all active:scale-95 ${isActive ? "text-red-600" : "text-green-600"}`}>
                    {startButtonText}
                    </button>
                    <button
                        onClick = {resetTimer}
                        className = "flex-1 py-3 bg-white text-violet-600 font-bold rounded-xl transition-all active:scale-95">
                            RESET
                    </button>
                </div>
            </div>
        </div>
      </div>
    );
}

export default App;