
import { act} from "react-dom/test-utils"
import useNewSubForm from "../hooks/useNewSubForm"
import {Sub} from '../types'



interface FormProps{
    onNewSub: (newSub: Sub) =>void
}



const Form =({onNewSub}: FormProps)=>{
    const [inputValues, dispatch] = useNewSubForm()
   
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) =>{
        event.preventDefault()
        onNewSub(inputValues)    
        dispatch({type: "clear"})
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>{
        const {name, value} = event.target
        dispatch({type: "change_value",
            payload: {
                inputName: name,
                inputValue: value
            }
            
        })
       
    }

    const handleClear = ()=>{
        dispatch({type: "clear"})
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input onChange={handleChange} value={inputValues.nick} type="text" name="nick" placeholder="nick" />
                <input onChange={handleChange} value={inputValues.subMonths} type="number" name="subMonths" placeholder="SubMonths" />
                <input onChange={handleChange} value={inputValues.avatar} type="text" name="avatar" placeholder="avatar" />
                <textarea onChange={handleChange} value={inputValues.description} name="description" placeholder="description" />
                <button onClick= {handleClear} type='button'>Clear the form</button>
                <button type='submit'>Save a new Subs</button>
            </form>
        </div>
    )
}
export default Form;

function dispatch(arg0: { type: string }) {
    throw new Error("Function not implemented.")
}
