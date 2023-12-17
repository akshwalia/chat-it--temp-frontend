
const WaveTypingIndicator = () => {
  return (
    <div className="messagecontent bg-white self-start rounded-lg p-2 max-w-[550px] flex items-center justify-center">
      <div className=" h-4 flex gap-1 items-end">
        <span className="bg-gray-400 w-2 h-2 rounded-full animate-bounce-slow"></span>
        <span className="bg-gray-400 w-2 h-2 rounded-full animate-bounce-medium"></span>
        <span className="bg-gray-400 w-2 h-2 rounded-full animate-bounce-fast"></span>
      </div>
    </div>
  );
};

export default WaveTypingIndicator;
