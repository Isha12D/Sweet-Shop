
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Footer from './components/Footer';
import { UserProvider } from './context/UserContext';

function App() {
  return (
    
    <UserProvider>
    <Navbar/>
    <Hero/>
    <Footer/>
    </UserProvider>
    
  );
}

export default App;
