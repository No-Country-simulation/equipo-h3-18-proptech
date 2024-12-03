function Loader() {
  return (
    <div className="relative flex-1 justify-center items-center flex">
      <div className="w-20 h-20 rounded-full absolute border-8 border-solid border-gray-200"></div>

      <div className="w-20 h-20 rounded-full animate-spin absolute border-8 border-solid border-primary border-t-transparent shadow-md"></div>
    </div>
  );
}

export default Loader;
