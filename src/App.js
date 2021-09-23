import './App.css';

import Base from './Components/Base';
import { WatchListProvider } from './WatchListContext';
function App() {
  return (
    <div className="App">
      <WatchListProvider>
          <Base/>
      </WatchListProvider>
    </div>
  );
}

export default App;
