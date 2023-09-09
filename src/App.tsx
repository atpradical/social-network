import React from 'react';
import './App.css';
import Technologies from "./../src/components/Technologies";
import Header from "./../src/components/Header";

/*function App() {
  return (
    <div className="App">
     Let's go!
    </div>
  );
}*/


const App = () => {
  return (
    <div className="App">
        <Header />
        <Technologies/>

    </div>
  );
}

export default App;
