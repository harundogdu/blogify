import { Navbar, Main, Footer } from 'components/export';

function App() {
  return (
    <div className='w-full min-h-screen flex flex-col bg-gray-100'>
      <Navbar />
      <Main />
      <Footer />
    </div>
  );
}

export default App;
