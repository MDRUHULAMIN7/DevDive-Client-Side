import { useState } from 'react';

function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <nav className="relative bg-white shadow hidden sm:hidden lg:block">
        <div className="px-6 py-3 mx-auto md:flex">
          <div className="flex items-center justify-between">
            <a href="#">
              <img className="w-auto h-6 sm:h-7" src="https://merakiui.com/images/full-logo.svg" alt="Logo" />
            </a>
          </div>

          <div>

            
          </div>
        </div>
      </nav>


    </>
  )
}

export default App
