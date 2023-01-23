const Loader = () => {
  return (
    <div
      className="w-full flex items-center justify-center flex-col gap-2"
      style={{
        height: `calc(100vh - 124px)`,
      }}
    >
      <img
        src="/logo.png"
        alt="loading"
        className="h-10 aspect-square animate-spin"
      />
      <p className="font-bold">Loading ...</p>
    </div>
  );
};

export default Loader;
