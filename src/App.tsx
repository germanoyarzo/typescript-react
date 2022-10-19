import {useState, useRef, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import List from './components/List'
import Form from './components/Form'
import {Sub, SubsResponseFromApi} from './types'
import axios from 'axios';

/*const INITIAL_STATE =[
  {
    nick: 'german',
    subMonths: 3,
    avatar: 'https://i.pravatar.cc/150?u=dapelu',
    description: 'Es lo mas '
  },
  {
    nick: 'sergio_serrano',
    subMonths: 7,
    avatar: 'https://i.pravatar.cc/150?u=sergio_serrano'

  }
]*/

interface AppState{
  subs: Sub[],
  newSubsNumber: number
}


function App() {
  const [subs, setSubs] = useState<AppState["subs"]>([])
  const [newSubNumber, setNewSubNumber] = useState<AppState["newSubsNumber"]>(0)
  const divRef = useRef<HTMLDivElement>(null)

  useEffect (() =>{
    //setSubs(INITIAL_STATE)
    const fetchSubs= (): Promise<SubsResponseFromApi> =>{
      return axios
      .get('http://localhost:3001/subs')
      .then(response=> response.data)
    }

    const mapFromApiToSubs = (apiResponse: SubsResponseFromApi):
  Array<Sub> =>{
    return apiResponse.map(subFromApi =>{
      const {
        months: subMonths,
        profileUrl: avatar, 
        nick,
        description
      } =subFromApi
    })
  }

    fetchSubs(){
      .then(mapFromApiToSubs)
      .then(setSubs)
    }
  }, [])

  

 
  const handleNewSub = (newSub: Sub): void =>{
    setSubs(subs =>[...subs, newSub])
    setNewSubNumber(n =>n+1)
  }

  return (
    <div className="App" ref={divRef}>
        <h1>Subscriptores</h1>
        <List subs={subs}/>
        New Sub: {newSubNumber}
        <Form onNewSub={handleNewSub}/>
    </div>
  );
}

export default App;
