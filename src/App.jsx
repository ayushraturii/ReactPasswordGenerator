import React, { use } from 'react';
import { useState,useCallback,useEffect,useRef} from 'react';


function App()
{
  const [length, setLength] = useState(8);
  const[numberAllowed, setNumberAllowed] = useState(false);
  const[charAllowed, setCharAllowed] = useState(false);
  const[password,setPassword] = useState('');

  //useref is used to store the function so that it does not get recreated on every render

  const passwordRef = useRef(null);

  const passwordgenerator = useCallback(()=>{
    let pass="";
    let str="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if(numberAllowed)
      str += "0123456789";
    if(charAllowed)
      str += "!@#$%^&*()_+[]{}|;:,.<>?";
    for(let i=0;i<length;i++)
    {
      const randomIndex = Math.floor(Math.random() * str.length+1);
      pass += str[randomIndex];
    }
    setPassword(pass);
  },[length, numberAllowed, charAllowed,setPassword]);

  useEffect(() => {
    passwordgenerator();
  }, [length, numberAllowed, charAllowed, passwordgenerator]);

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();

    //passwordRef.current?.setSelectionRange(0, 101); // For mobile devices
    window.navigator.clipboard.writeText(password)
  }, [password])


  return (
    <>
      <div className='w-full bg-gray-900 text-white py-4 px-8 flex justify-between items-center'>
        <h1 >Password Generator</h1></div>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 
      my-8 text-orange-500 bg-gray-700'>
        <div className='flex shadow-md rounded-lg bg-gray-800 p-4 overflow-hidden mb-4'>
          <input type="text" value={password}
          className='outline-none w-full py-1 px-3'
          placeholder='password'
          ref={passwordRef}
          readOnly/>

          <input type="range"
          min={6}
          max={100}
          value={length}
          className='cursor-pointer'
          onChange={(e)=>{setLength(e.target.value)}}
           />
          <label className='ml-2 text-white'>Length: {length}</label>

          <button className='bg-blue-300 mx-4 rounded-md text-white'
          onClick={copyPasswordToClipboard}>Copy</button>




          
        </div>
        <input type="checkbox" defaultChecked={numberAllowed}
        id="numberinput"
        onChange={()=>{
          setNumberAllowed((prev)=>!prev);
        }} />
        <label htmlFor="numberinput">Number</label>
        <input type="checkbox" defaultChecked={charAllowed}
        id="charinput"
        onChange={()=>{
          setCharAllowed((prev)=>!prev);
        }} />
        <label htmlFor="charinput">Special Characters</label>
        <button className='bg-orange-500 text-white px-4 py-2 rounded-lg mt-4 hover:bg-orange-600 transition-colors'
        onClick={passwordgenerator}>
          Generate Password
        </button>
      </div>
    </>
  )
  
  
}

export default App;

