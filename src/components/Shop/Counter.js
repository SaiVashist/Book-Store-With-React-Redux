import { useState } from 'react'
import { useErrorHandler } from 'react-error-boundary'
const MAX_COUNT_ALLOWED = 5
const Counter = (props) => {
    const [count, setCount] = useState(0)
    const[eState , seteState] = useState(false)
    const handleErrorr = useErrorHandler()
    console.log(props.valuek)
  const increaseHandler = () => {
    try {
        if (count === MAX_COUNT_ALLOWED) {
            seteState(true)
          throw new Error('limited exceeded')
         
      } else {
        setCount(c => c + 1)
      }
    } catch (e) {
        handleErrorr(e)
    }
  }

    return ( 
      
    <div>
      <button onClick={increaseHandler}>counter {count}</button>
    </div>
  )
}

export default Counter
