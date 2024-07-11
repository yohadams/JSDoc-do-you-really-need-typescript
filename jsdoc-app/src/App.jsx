import { useState } from 'react';
import { User } from './Components/User/User';
import { UserProvider } from './UserContext';

import './App.css';

/**
 * @namespace App
 */

/** 
 * Max value of the user id.
 * 
 * @constant {number} 
 * @memberof App
 * */
const MAX = 10;

/**
 * Min value of the user id.
 * 
 * @constant {number}
 * @memberof App
 * */
const MIN = 1;

/**
 * Represents a main App component.
 * @component
 * @memberof App
 */

function App() {
  /**
   * State for the user id.
   * 
   * @constant {number} id
   * @memberof App
   */
  const [id, setId] = useState(1);

  /**
   * Handles the click event for the next button.
   * 
   * @function
   * @memberof App
   * */
  const handleClickNext = () => {
    setId((prevId) => prevId + 1);
  };

  /**
   * Handles the click event for the previous button.
   * 
   * @function
   * @memberof App
   */
  const handleClickPrev = () => {
    setId((prevId) => prevId - 1);
  };

  return (
    <UserProvider>
      <User id={id} />
      <div style={{ width: '100%', display: 'flex', gap: '8px', placeContent: 'center' }}>
        <button disabled={id === MIN} onClick={handleClickPrev} style={{ marginTop: '16px' }}>Prev</button>
        <button disabled={id === MAX} onClick={handleClickNext} style={{ marginTop: '16px' }}>Next</button>
      </div>
    </UserProvider>
  )
}

export default App
