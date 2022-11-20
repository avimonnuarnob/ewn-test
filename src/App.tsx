import { useState } from 'react';

import Tab from './components/Tab';
import { AuthProvider } from './context/AuthContext';
import Signin from './pages/Signin';
import SignUp from './pages/Signup';

function App() {
  const [active, setActive] = useState<'login' | 'signup'>('login');

  return (
    <div className="app">
      <AuthProvider>
        <div className="container">
          <Tab active={active} setActive={setActive}>
            {active === 'login' ? <Signin /> : <SignUp />}
          </Tab>
        </div>
      </AuthProvider>
    </div>
  );
}

export default App;
