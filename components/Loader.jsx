const Loader = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br">
      <div className="relative">
        {/* Outer ring */}
        <div className="animate-spin rounded-full border-t-4 border-b-4 border-gradient-to-r from-blue-500 via-purple-500 to-pink-500 h-16 w-16"></div>
        {/* Inner glow */}
        <div className="absolute inset-2 h-12 w-12 bg-blue-100 rounded-full shadow-lg"></div>
      </div>
    </div>
  );
};

export default Loader;
