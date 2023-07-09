import {useState,useEffect,useRef} from 'react'

function GameLogic() {

    const [TIME_REMAINING,setTIME_REMAINING] = useState(10)
    const [startGame,setStartGame] = useState(false)
    const [text,setText] = useState("")
    const [timeRemaining,setTimeRemaining] = useState(TIME_REMAINING)
    const [NOW,setNOW] = useState(0)
    const textBoxRef = useRef(null)


    //set Timing function 
    function setTiming(e){
        const {value} = e.target
        setTIME_REMAINING(value)
    }

    function handleChange(e)
    {
        const {value} = e.target
        setText(value)
    }

    function CalculateWords(text){
        const textArray = text.trim().split(" ")
        return textArray.filter(word=>word!=="").length
    }

    //to Start the Game
    function toggleStartGame(){
        setStartGame(true)
        setTimeRemaining(TIME_REMAINING)
        setText("")
        setNOW(0)
        textBoxRef.current.disabled = false
        textBoxRef.current.focus()
    }

    //Time Running Effect
    useEffect(()=>{
        if(timeRemaining>0 && startGame)
        {setTimeout(() => {
            setTimeRemaining(prev=>prev-1)
        }, 1000);}
        else if(timeRemaining===0)
        {
            setStartGame(false)
            const numOfWord=CalculateWords(text)
            setNOW(numOfWord)

        }
    },[timeRemaining,startGame])

  return {handleChange,text,startGame,textBoxRef,timeRemaining,toggleStartGame,NOW,setTiming}
}

export default GameLogic
