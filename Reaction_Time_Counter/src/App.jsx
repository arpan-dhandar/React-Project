import { useEffect, useState } from "react";

const App = () => {
  const [status, setStatus] = useState("idle");
  const [startTime, setStartTime] = useState(null);
  const [reactionTime, setReactionTime] = useState(null);
  const [bestTime, setBestTime] = useState(null);
  const [count, setCount] = useState(3);

  function clickedTooEarly() {
    setStatus("idle");
    alert("Too early! Wait for green!");
  }

  function handleClick() {
    const timeTaken = Date.now() - startTime;
    setReactionTime(timeTaken);
    if (!bestTime || timeTaken < bestTime) setBestTime(timeTaken);
    setStatus("clicked");
  }

  function reset() {
    setStatus("idle");
    setStartTime(null);
    setReactionTime(null);
  }

  function getRating() {
    if (reactionTime < 200) return { label: "SUPERHUMAN", color: "text-cyan-400",   emoji: "⚡" };
    if (reactionTime < 300) return { label: "EXCELLENT",  color: "text-green-400",  emoji: "🔥" };
    if (reactionTime < 400) return { label: "GOOD",       color: "text-lime-400",   emoji: "👍" };
    if (reactionTime < 500) return { label: "AVERAGE",    color: "text-yellow-400", emoji: "😐" };
    return                         { label: "TOO SLOW",   color: "text-red-400",    emoji: "🐢" };
  }

  useEffect(() => {
    if (status !== "countdown") return;

    setCount(3);

    const timer = setInterval(() => {
      setCount((prev) => {
        if (prev === 1) {
          clearInterval(timer);
          setStatus("waiting");
          const delay = Math.random() * 3000 + 1000;
          setTimeout(() => {
            setStatus("ready");
            setStartTime(Date.now());
          }, delay);
          return 0;
        }
        return prev - 1;
      });
    }, 1000); // ✅ fixed — 1 second delay

    return () => clearInterval(timer);
  }, [status]);

  return (
    <div className="min-h-screen bg-[#080808] flex items-center justify-center font-mono">

      {/* ── IDLE SCREEN ── */}
      {status === "idle" && (
        <div className="flex flex-col items-center gap-8 text-center px-6">
          <div>
            <h1 className="text-8xl font-black text-white tracking-widest">
              REFLEX
            </h1>
            <h2
              className="text-8xl font-black text-transparent tracking-widest"
              style={{ WebkitTextStroke: "1px #333" }}
            >
              TEST
            </h2>
          </div>
          <p className="text-zinc-600 text-xs tracking-widest uppercase">
            How fast are your reflexes?
          </p>
          {bestTime && (
            <div className="text-xs text-zinc-500 border border-zinc-800 rounded-full px-4 py-1.5">
              best — <span className="text-white">{bestTime}ms</span>
            </div>
          )}
          <button
            onClick={() => setStatus("countdown")}
            className="px-10 py-4 bg-white text-black text-xl font-black tracking-widest rounded-full hover:bg-zinc-200 active:scale-95 transition-all"
          >
            START
          </button>
        </div>
      )}

      {/* ── COUNTDOWN SCREEN ── */}
      {status === "countdown" && (
        <div className="flex flex-col items-center gap-8 text-center px-6">
          {/* big animated number */}
          <div className="relative flex items-center justify-center">
            <div className="absolute w-52 h-52 rounded-full border border-zinc-800 animate-ping opacity-20"/>
            <div className="w-44 h-44 rounded-full border border-zinc-700 flex items-center justify-center">
              <span
                key={count}
                className="text-8xl font-black text-white"
                style={{ animation: "popIn 0.3s ease forwards" }}
              >
                {count}
              </span>
            </div>
          </div>

          {/* label changes based on count */}
          <p className="text-zinc-500 text-xs tracking-widest uppercase">
            {count === 3 && "get ready..."}
            {count === 2 && "almost..."}
            {count === 1 && "here it comes!"}
            {count === 0 && "GO!"}
          </p>

          {/* animated dots */}
          <div className="flex gap-2">
            <div className={`w-2 h-2 rounded-full transition-all duration-300 ${count <= 2 ? "bg-white" : "bg-zinc-700"}`}/>
            <div className={`w-2 h-2 rounded-full transition-all duration-300 ${count <= 1 ? "bg-white" : "bg-zinc-700"}`}/>
            <div className={`w-2 h-2 rounded-full transition-all duration-300 ${count === 0 ? "bg-white" : "bg-zinc-700"}`}/>
          </div>
        </div>
      )}

      {/* ── WAITING SCREEN (RED) ── */}
      {status === "waiting" && (
        <div
          onClick={clickedTooEarly}
          className="w-full min-h-screen flex flex-col items-center justify-center gap-6 bg-[#1a0000] cursor-pointer select-none"
        >
          <div className="w-32 h-32 rounded-full border-2 border-red-500/40 flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-red-500/30 animate-pulse"/>
          </div>
          <h1 className="text-5xl font-black text-red-400 tracking-widest">
            WAIT...
          </h1>
          <p className="text-xs text-red-800 tracking-widest uppercase">
            Don't click yet!
          </p>
        </div>
      )}

      {/* ── READY SCREEN (GREEN) ── */}
      {status === "ready" && (
        <div
          onClick={handleClick}
          className="w-full min-h-screen flex flex-col items-center justify-center gap-6 bg-[#001a00] cursor-pointer select-none"
        >
          <div className="relative flex items-center justify-center">
            <div className="w-36 h-36 rounded-full border-2 border-green-400/50 absolute animate-ping"/>
            <div className="w-32 h-32 rounded-full border-2 border-green-400 flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-green-400"/>
            </div>
          </div>
          <h1 className="text-6xl font-black text-green-400 tracking-widest">
            CLICK!
          </h1>
          <p className="text-xs text-green-700 tracking-widest uppercase">
            Now! Now! Now!
          </p>
        </div>
      )}

      {/* ── RESULT SCREEN ── */}
      {status === "clicked" && (
        <div className="flex flex-col items-center gap-6 text-center px-6">
          <div className="text-8xl font-black text-white">
            {reactionTime}
            <span className="text-3xl text-zinc-500 ml-2">ms</span>
          </div>
          <p className={`text-3xl font-black tracking-widest ${getRating().color}`}>
            {getRating().emoji} {getRating().label}
          </p>
          {bestTime === reactionTime && (
            <div className="text-xs text-yellow-500 border border-yellow-900 rounded-full px-4 py-1.5">
              🏆 new best!
            </div>
          )}
          {bestTime && bestTime !== reactionTime && (
            <div className="text-xs text-zinc-600 border border-zinc-800 rounded-full px-4 py-1.5">
              best — {bestTime}ms
            </div>
          )}
          <button
            onClick={reset}
            className="mt-2 px-8 py-3 bg-white text-black text-xl font-black tracking-widest rounded-full hover:bg-zinc-200 active:scale-95 transition-all"
          >
            TRY AGAIN
          </button>
        </div>
      )}

    </div>
  );
};

export default App;