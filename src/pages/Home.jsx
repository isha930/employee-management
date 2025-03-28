const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      {/* Heading */}
      <h1 className="text-3xl font-bold text-center mt-10 text-blue-600">
        Welcome to Employee Management System
      </h1>

      {/* Project Details */}
      <footer className="mt-10 text-center text-gray-600">
        <p className="text-lg font-medium">Developed by [ISHA DURGE]</p>
        <p>Email: [ishadurge7@gmail.com]</p>
        <p>GitHub: <a href="https://github.com/isha930" className="text-blue-500 hover:underline">github.com/yourgithub</a></p>
      </footer>
    </div>
  );
};

export default Home;
