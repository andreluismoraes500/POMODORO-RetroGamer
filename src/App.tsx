import { usePomodoro } from "./customHook";

function App() {
  const { timer, isActive, start, pause, reset, stop } = usePomodoro(1500);

  const handleStart = () => {
    /**start pomodoro */
    start();
  };
  const handlePause = () => {
    /**pause pomodoro */
    pause();
  };
  const handleRefresh = () => {
    reset();
    stop();
  };

  return (
    <div className="font-press flex justify-center items-center h-screen w-screen select-none flex-col">
      <div className=" text-red-300  text-7xl">{timer}</div>
      <div className="flex gap-4 mt-6">
        <button
          onClick={handleStart}
          disabled={isActive}
          className="text-blue-300 bg-blue-900 text-3xl rounded p-2 flex justify-center items-center hover:bg-blue-600"
        >
          Start
        </button>
        <button
          disabled={!isActive}
          onClick={handlePause}
          className="text-blue-300 bg-blue-900 text-3xl rounded p-2 flex justify-center items-center hover:bg-blue-600"
        >
          Pause
        </button>
        <button
          onClick={handleRefresh}
          className="text-blue-300 bg-blue-900 text-3xl rounded p-2 flex justify-center items-center hover:bg-blue-600"
        >
          Refresh
        </button>
      </div>
    </div>
  );
}

export default App;
