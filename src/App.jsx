import { useEffect, useRef, useState } from 'react';
import Die from './Die';
import { nanoid } from 'nanoid';
import Confetti from 'react-confetti'


function App() {

const [dice, setDice] = useState(allNewDice());
const [tenzies, setTenzies] = useState(false);
const [roll, setRoll] = useState(0);

 //lazy state initialization 
const [best, setBest] = useState(()=> JSON.parse(localStorage.getItem("best")) || 0); //(retrieve less best number of roll)
const [bestTime, setBestTime] = useState(()=> JSON.parse(localStorage.getItem("timeSpan")) || 0); //(retrieve less best time duration)

const [startTimer,setStartTimer] = useState(null);
const [timer, setTimer] = useState(null)
const intervalRef = useRef(null);


//Start timer
function handleStart(){
  setStartTimer(Date.now());
  setTimer(Date.now());
  clearInterval(intervalRef.current);
  intervalRef.current = setInterval(()=>{
    setTimer(Date.now());
  },10 )
}

// console.log(handleStart())
//Stop Timer

function handleStop(){
   clearInterval(intervalRef.current); 
   if(seconds < bestTime || bestTime === 0){
    localStorage.setItem("timeSpan", seconds);
    setBestTime(seconds)
   }
}
let seconds = 0;

if(timer !== null && startTimer !== null){
  seconds =(timer - startTimer) / 1000;
  console.log(seconds)
}



//SideEffect that run everytime dice changes
 useEffect(()=>{
  const firstValue  =  dice[0].value;
  const allDiceHeld = dice.every((die) => die.isHeld);
  const allSameValue = dice.every((die)=> die.value === firstValue);
  
  if(allDiceHeld && allSameValue){
     //if tenzies is true (stop timer func, set localstorage)
    setTenzies(true);
    handleStop()
    if(roll < best || best === 0){
      localStorage.setItem("best" , roll);
      setBest(roll)
    }
  }
  
},[dice]) 


//Pull random dice
function generateNewDice(){
  return {
    value: Math.ceil(Math.random() * 6),
    isHeld: false,
    id: nanoid()
  }
}

//Generate Random Number for dice
function allNewDice(){
    let newDice = [];
    for(let i = 0; i < 10; i++){
      newDice.push(generateNewDice())
    }
    return newDice;
  }

//Roll dice
function rollDice(){
  //if tenzies is false (roll dice, increment roll by 1 and start timer)
  if(!tenzies){
    setDice((oldDice)=> oldDice.map((die)=>( die.isHeld ? die : generateNewDice())))
    setRoll(roll + 1);
    handleStart();
  }else{
    setTenzies(false);
    setDice(allNewDice());
    setRoll(0);
  
  }
 
}

  // Hold dice
  function holdDice(id){
   setDice((prevDice)=> prevDice.map((die)=>(die.id === id ? {...die, isHeld:!die.isHeld} : die)))
  }

  const diceElements = dice.map((die)=> (<Die key={die.id}   dieValue={die.value} isHeld={die.isHeld} onHold={()=> holdDice(die.id)} />))

  return (
    
    <main className='die__disc'>
      <div className="die__count-timer">{seconds.toFixed(2)}s</div>
      {tenzies &&  <Confetti/>}
      {bestTime !== 0 && (
          <div className="die__besttime">
            <span className="die__best-name">Best Time:</span>
            <span className="die__best-time">{bestTime}s</span>
          </div>
        )}
      
            <h1 className="die__title">Tenzies</h1>
            <p className="die__instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className='die__container'>
        {diceElements}
        </div>
        <button className='die__btn' onClick={rollDice}>{tenzies ? "New Game" : "Roll"}</button>
        
        <div className="die__board">
        <h4>Rolls: {roll}</h4>
        {best !== 0 && (<h4>Best: {best}</h4>)}
        </div>
    </main>
  )
}

export default App
