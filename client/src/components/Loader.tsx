const Loader = () => {
  return (
    <div
      className="flex items-center justify-center flex-col gap-3"
      style={{
        height: "calc(100vh - 70px)",
      }}
    >
      <img src="logo.png" className="h-10 animate-spin" alt="logo" />
      <p className="font-bold">Loading ...</p>
    </div>
  );
};

export default Loader;
