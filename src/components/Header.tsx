const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
      <nav className="flex justify-between items-center px-4 sm:px-8 md:px-16 lg:px-32 py-4">
        <div className="flex items-center">
          <span className="text-sm sm:text-base font-bold p-2 rounded-[4px] bg-primary text-white">TD</span>
          <h1 className="text-sm sm:text-base font-bold ml-2 text-black">Teste Doqr</h1>
        </div>
        <div className="flex items-center">
          <div className="w-6 h-6 bg-primary2 rounded-full" />
          <h1 className="text-sm sm:text-base font-semibold ml-2 text-black">Caio</h1>
        </div>
      </nav>
    </header>
  );
}

export default Header;