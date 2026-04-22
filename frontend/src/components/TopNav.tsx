export default function TopNav() {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left side - Logo and Title */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              {/* Calculator Icon */}
              <img src="/assets/logo-icon.jpg" alt="logo" className="w-8 h-8 rounded-[4px]" />
            </div>
            <div className="ml-3">
              <h1 className="text-lg font-semibold text-gray-900">Finland Salary Calculator</h1>
            </div>
          </div>

          {/* Center - Navigation Links */}
          <nav className="hidden md:flex space-x-8">
            <a href="#" className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium">
              Calculator
            </a>
            <a href="#" className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium">
              How it works
            </a>
            <a href="#" className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium">
              Salary by City
            </a>
            <a href="#" className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium">
              Guides
            </a>
            <a href="#" className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium">
              About
            </a>
          </nav>

          {/* Right side - Language Selector */}
          <div className="flex items-center">
            <div className="relative">
              <select className="appearance-none bg-white border border-gray-300 rounded-md py-2 pl-3 pr-8 text-sm text-gray-700 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                <option value="en">+ EN</option>
                <option value="fi">+ FI</option>
                <option value="sv">+ SV</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                </svg>
              </div>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button className="text-gray-700 hover:text-gray-900 p-2">
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu - hidden by default */}
        <div className="hidden md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a href="#" className="text-gray-700 hover:text-gray-900 block px-3 py-2 text-base font-medium">Calculator</a>
            <a href="#" className="text-gray-700 hover:text-gray-900 block px-3 py-2 text-base font-medium">How it works</a>
            <a href="#" className="text-gray-700 hover:text-gray-900 block px-3 py-2 text-base font-medium">Salary by City</a>
            <a href="#" className="text-gray-700 hover:text-gray-900 block px-3 py-2 text-base font-medium">Guides</a>
            <a href="#" className="text-gray-700 hover:text-gray-900 block px-3 py-2 text-base font-medium">About</a>
          </div>
        </div>
      </div>
    </header>
  );
}
