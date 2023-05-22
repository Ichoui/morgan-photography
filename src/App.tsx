import React from 'react';
import logo from './logo.svg';
import './App.scss';
import { Photoswipe } from './components/photoswipe/Photoswipe';

function App(): React.JSX.Element {
  return (
    <div className='App'>
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a className='App-link' href='https://reactjs.org' target='_blank' rel='noopener noreferrer'>
          Learn React
        </a>
        <Photoswipe test={'myParam'} />
      </header>
    </div>
  );
}
// https://github.com/dromru/react-photoswipe-gallery
export default App;
