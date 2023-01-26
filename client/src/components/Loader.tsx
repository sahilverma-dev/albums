const Loader = () => {
  return (
    <div
      className="flex items-center justify-center bg-black/10"
      style={{
        height: "calc(100vh - 70px)",
      }}
    >
      <img src="logo.png" className="h-10 animate-spin" alt="logo" />
    </div>
  );
};

export default Loader;
