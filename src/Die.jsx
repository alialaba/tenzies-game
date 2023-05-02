export default function({dieValue, isHeld}){

  const bgColor ={
     backgroundColor: isHeld ? "#59E391" : "3fff" 
  }
    return(
       <>
       <div className="die__face" style={bgColor} >
         <h2 className="die__num">{dieValue}</h2>
         </div>
       
       </>
    );
}