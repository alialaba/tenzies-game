export default function({dieValue, isHeld, onHold}){

  const bgColor ={
     backgroundColor: isHeld ? "#59E391" : "3fff" 
  }
    return(
       <>
       <div className="die__face" style={bgColor} onClick={onHold}>
         <h2 className="die__num">{dieValue}</h2>
         </div>
       
       </>
    );
}