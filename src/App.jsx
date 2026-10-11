import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Shield,
  Terminal,
  Cpu,
  LockKeyhole,
  BrainCircuit,
  Code2,
  Zap,
  ChevronRight,
  Crosshair,
  Trophy,
  ArrowLeft,
  Activity,
  Volume2,
  VolumeX,
} from "lucide-react";

import "./App.css";

/* =========================================
   MISSION DATA
========================================= */

const missions = [
  {
    id: "01",
    title: "CRACK THE CODE",
    description:
      "Decode encrypted patterns before the system locks you out.",
    difficulty: "LOGIC",
    icon: BrainCircuit,
    color: "green",
    duration: "60 SEC",
  },
  {
    id: "02",
    title: "MEMORY BREACH",
    description:
      "Remember the sequence. One mistake can expose your identity.",
    difficulty: "MEMORY",
    icon: Cpu,
    color: "purple",
    duration: "60 SEC",
  },
  {
    id: "03",
    title: "DEBUG THE SYSTEM",
    description:
      "Find hidden bugs in corrupted code and restore system access.",
    difficulty: "CODING",
    icon: Code2,
    color: "blue",
    duration: "60 SEC",
  },
  {
    id: "04",
    title: "FIREWALL REFLEX",
    description:
      "Identify the correct symbols while avoiding dangerous decoys.",
    difficulty: "REFLEX",
    icon: Zap,
    color: "orange",
    duration: "45 SEC",
  },
  {
    id: "05",
    title: "FINAL FIREWALL",
    description:
      "Combine every skill to break through the final security layer.",
    difficulty: "BOSS LEVEL",
    icon: LockKeyhole,
    color: "red",
    duration: "90 SEC",
  },
];

/* =========================================
   MISSION 01: LOGIC PUZZLES
========================================= */

const logicQuestions = [
  {
    question: "Complete the sequence: 2, 6, 12, 20, 30, ?",
    options: ["36", "40", "42", "44"],
    answer: "42",
    explanation:
      "The differences are 4, 6, 8, 10, and 12. Therefore, 30 + 12 = 42.",
  },
  {
    question: "If A=1, B=2, ..., Z=26, what is the value of HACK?",
    options: ["19", "21", "23", "25"],
    answer: "23",
    explanation:
      "H=8, A=1, C=3, K=11. Their sum is 8 + 1 + 3 + 11 = 23.",
  },
  {
    question: "Find the missing number: 3, 9, 27, 81, ?",
    options: ["162", "189", "243", "324"],
    answer: "243",
    explanation:
      "Every number is multiplied by 3. Therefore, 81 × 3 = 243.",
  },
  {
    question: "Which number does not belong: 4, 9, 16, 25, 36, 48?",
    options: ["16", "25", "36", "48"],
    answer: "48",
    explanation:
      "4, 9, 16, 25, and 36 are perfect squares. 48 is not.",
  },
  {
    question: "If A=1, B=2, ..., Z=26, what is the value of BYTE?",
    options: ["48", "52", "56", "60"],
    answer: "52",
    explanation:
      "B=2, Y=25, T=20, E=5. Their sum is 2 + 25 + 20 + 5 = 52.",
  },
  {
    question: "Complete the sequence: 1, 1, 2, 3, 5, 8, ?",
    options: ["11", "12", "13", "15"],
    answer: "13",
    explanation:
      "Each number is the sum of the previous two numbers: 5 + 8 = 13.",
  },
  {
    question:
      "A number doubled and increased by 6 equals 26. Find the number.",
    options: ["8", "10", "12", "13"],
    answer: "10",
    explanation:
      "2x + 6 = 26. Therefore, 2x = 20 and x = 10.",
  },
  {
    question: "Find the next number: 5, 10, 20, 40, ?",
    options: ["60", "70", "80", "100"],
    answer: "80",
    explanation:
      "Every number is multiplied by 2. Therefore, 40 × 2 = 80.",
  },
  {
    question: "Which is the odd one out?",
    options: ["Triangle", "Square", "Circle", "Cube"],
    answer: "Cube",
    explanation:
      "A cube is three-dimensional; the others are two-dimensional.",
  },
  {
    question:
      "If 5 machines make 5 chips in 5 minutes, how long for 10 machines to make 10 chips?",
    options: ["2.5 minutes", "5 minutes", "10 minutes", "15 minutes"],
    answer: "5 minutes",
    explanation:
      "Each machine makes one chip in five minutes. Ten machines can make ten chips simultaneously in five minutes.",
  },
];

/* =========================================
   MISSION 02: MEMORY ROUNDS
========================================= */

const memoryRounds = [
  {
    sequence: ["◆", "●", "▲"],
    options: [
      ["◆", "●", "▲"],
      ["●", "◆", "▲"],
      ["◆", "▲", "●"],
      ["▲", "●", "◆"],
    ],
  },
  {
    sequence: ["★", "◆", "●", "▲"],
    options: [
      ["★", "●", "◆", "▲"],
      ["★", "◆", "●", "▲"],
      ["◆", "★", "●", "▲"],
      ["▲", "◆", "●", "★"],
    ],
  },
  {
    sequence: ["●", "▲", "★", "◆", "■"],
    options: [
      ["●", "▲", "◆", "★", "■"],
      ["▲", "●", "★", "◆", "■"],
      ["●", "▲", "★", "◆", "■"],
      ["●", "★", "▲", "◆", "■"],
    ],
  },
  {
    sequence: ["■", "★", "▲", "●", "◆", "⬟"],
    options: [
      ["■", "★", "▲", "●", "◆", "⬟"],
      ["■", "▲", "★", "●", "◆", "⬟"],
      ["★", "■", "▲", "◆", "●", "⬟"],
      ["■", "★", "●", "▲", "⬟", "◆"],
    ],
  },
  {
    sequence: ["⬟", "◆", "★", "●", "■", "▲", "⬢"],
    options: [
      ["⬟", "◆", "●", "★", "■", "▲", "⬢"],
      ["⬟", "◆", "★", "●", "■", "▲", "⬢"],
      ["◆", "⬟", "★", "●", "▲", "■", "⬢"],
      ["⬟", "★", "◆", "●", "■", "⬢", "▲"],
    ],
  },
];

/* =========================================
   MISSIONS 03–05: CHALLENGE DATA
========================================= */

const debugQuestions = [
  {
    title: "FIX THE LOOP",
    question: "The loop should print numbers from 1 to 5. What should change?",
    code: "for (let i = 1; i < 5; i++) {\n  console.log(i);\n}",
    options: ["Change i < 5 to i <= 5", "Change let to const", "Remove i++", "Start i at 0"],
    answer: "Change i < 5 to i <= 5",
    explanation: "Using i <= 5 includes 5 in the output. The original condition stops before 5.",
  },
  {
    title: "REPAIR THE FUNCTION",
    question: "The function should return the sum. Which fix is correct?",
    code: "function add(a, b) {\n  console.log(a + b);\n}\nconst result = add(4, 6);",
    options: ["Replace console.log with return", "Remove both parameters", "Change + to -", "Delete the function"],
    answer: "Replace console.log with return",
    explanation: "return sends the value back to the caller; console.log only displays it.",
  },
  {
    title: "FIX THE CONDITION",
    question: "Access should be granted only when isLoggedIn is true.",
    code: "if (isLoggedIn = true) {\n  console.log('Access granted');\n}",
    options: ["Use === instead of =", "Remove the if", "Change true to null", "Rename console"],
    answer: "Use === instead of =",
    explanation: "A single equals sign assigns a value. Triple equals checks equality.",
  },
  {
    title: "ARRAY ACCESS",
    question: "Which change prints the first item, React?",
    code: 'const tools = ["React", "Vite", "Node"];\nconsole.log(tools[1]);',
    options: ["Change tools[1] to tools[0]", "Use tools[3]", "Remove the brackets", "Rename tools to tool"],
    answer: "Change tools[1] to tools[0]",
    explanation: "JavaScript arrays use zero-based indexing, so the first item is at index 0.",
  },
  {
    title: "FIX THE COMPARISON",
    question: "Which operator checks whether age is at least 18?",
    code: "if (age > 18) {\n  console.log('Eligible');\n}",
    options: ["Change > to >=", "Change > to =", "Remove age", "Change if to for"],
    answer: "Change > to >=",
    explanation: "The >= operator includes 18 as well as every value greater than 18.",
  },
];

const reflexQuestions = [
  { title: "TARGET LOCK", question: "Select the shield symbol. Ignore the decoys.", target: "🛡️", options: ["⚡", "🛡️", "💀", "🔒"], answer: "🛡️", explanation: "Target acquired. Shield symbols represent the protected system." },
  { title: "THREAT SCAN", question: "Select the warning symbol.", target: "⚠️", options: ["🔑", "💾", "⚠️", "🧠"], answer: "⚠️", explanation: "Warning symbol identified. Keep scanning quickly." },
  { title: "ACCESS KEY", question: "Select the key symbol.", target: "🔑", options: ["🧩", "🔑", "⚡", "🛡️"], answer: "🔑", explanation: "Correct. The access key has been secured." },
  { title: "ENERGY PULSE", question: "Select the lightning symbol.", target: "⚡", options: ["🔒", "💀", "⚡", "🔑"], answer: "⚡", explanation: "Correct. Energy pulse matched." },
  { title: "LOCKDOWN", question: "Select the lock symbol.", target: "🔒", options: ["🧠", "⚠️", "🛡️", "🔒"], answer: "🔒", explanation: "Correct. The lock symbol is secured." },
];

const finalQuestions = [
  { title: "BOSS LOGIC", question: "Complete the sequence: 3, 6, 12, 24, ?", options: ["36", "42", "48", "54"], answer: "48", explanation: "Each number doubles: 24 × 2 = 48." },
  { title: "BOSS DEBUG", question: "Which fix makes the function send its result back?", code: "function square(n) {\n  console.log(n * n);\n}", options: ["Use return n * n", "Rename n", "Remove the function", "Change * to +"], answer: "Use return n * n", explanation: "The return statement gives the calculated value back to the caller." },
  { title: "BOSS REFLEX", question: "Firewall scan: choose the shield symbol.", options: ["💀", "⚡", "🛡️", "🔑"], answer: "🛡️", explanation: "Correct target selected. Firewall layer weakened." },
  { title: "BOSS LOGIC", question: "If A=1, B=2, ..., Z=26, what is the value of BYTE?", options: ["48", "52", "56", "60"], answer: "52", explanation: "B=2, Y=25, T=20, E=5. The total is 52." },
  { title: "FINAL DEBUG", question: "Which operator checks equality without type conversion?", code: "if (value ___ 10) {\n  unlock();\n}", options: ["===", "=", "++", "=>"], answer: "===", explanation: "Triple equals checks strict equality without type conversion." },
];

/* =========================================
   HELPER FUNCTIONS
========================================= */

function shuffleArray(array) {
  const shuffled = [...array];

  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled;
}

function getTimeForDifficulty(difficulty) {
  if (difficulty === "ROOKIE") return 18;
  if (difficulty === "NIGHTMARE") return 8;

  return 12;
}

/* =========================================
   MAIN APPLICATION
========================================= */

function App() {
  /* Navigation and player */

  const [screen, setScreen] = useState("home");

  const [playerName, setPlayerName] = useState(
    () => localStorage.getItem("bytebreak_player") || ""
  );

  const [difficulty, setDifficulty] = useState("HACKER");

  const [selectedMission, setSelectedMission] = useState(null);

  const [soundEnabled, setSoundEnabled] = useState(() => {
    try {
      return localStorage.getItem("bytebreak_sound") !== "off";
    } catch {
      return true;
    }
  });

  // Synthesized game sounds: no external audio files are required.
  const playSound = (type) => {
    if (!soundEnabled || typeof window === "undefined") return;

    const soundPatterns = {
      click: [{ f: 420, d: 0.07, t: 0 }],
      select: [{ f: 520, d: 0.07, t: 0 }, { f: 740, d: 0.09, t: 0.06 }],
      start: [{ f: 330, d: 0.12, t: 0 }, { f: 440, d: 0.12, t: 0.1 }, { f: 660, d: 0.18, t: 0.2 }],
      correct: [{ f: 740, d: 0.09, t: 0 }, { f: 980, d: 0.13, t: 0.08 }],
      wrong: [{ f: 220, d: 0.12, t: 0 }, { f: 165, d: 0.18, t: 0.1 }],
      lifeLost: [{ f: 260, d: 0.1, t: 0 }, { f: 190, d: 0.2, t: 0.08 }],
      timeout: [{ f: 500, d: 0.1, t: 0 }, { f: 350, d: 0.1, t: 0.12 }, { f: 220, d: 0.22, t: 0.24 }],
      tick: [{ f: 880, d: 0.045, t: 0 }],
      memoryReveal: [{ f: 520, d: 0.08, t: 0 }, { f: 660, d: 0.08, t: 0.1 }, { f: 780, d: 0.12, t: 0.2 }],
      combo: [{ f: 660, d: 0.09, t: 0 }, { f: 880, d: 0.09, t: 0.08 }, { f: 1100, d: 0.09, t: 0.16 }, { f: 1320, d: 0.18, t: 0.24 }],
      complete: [{ f: 523, d: 0.12, t: 0 }, { f: 659, d: 0.12, t: 0.11 }, { f: 784, d: 0.12, t: 0.22 }, { f: 1046, d: 0.24, t: 0.33 }],
      victory: [{ f: 523, d: 0.14, t: 0 }, { f: 659, d: 0.14, t: 0.12 }, { f: 784, d: 0.14, t: 0.24 }, { f: 1046, d: 0.14, t: 0.36 }, { f: 1318, d: 0.34, t: 0.48 }],
    };

    try {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (!AudioContextClass) return;

      const audioContext = new AudioContextClass();
      const pattern = soundPatterns[type] || soundPatterns.click;
      const volume = type === "tick" || type === "click" ? 0.045 : 0.075;
      let finalEnd = 0;

      pattern.forEach(({ f, d, t }) => {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        const startAt = audioContext.currentTime + t;
        const endAt = startAt + d;

        oscillator.type = type === "wrong" || type === "timeout" || type === "lifeLost" ? "triangle" : "sine";
        oscillator.frequency.setValueAtTime(f, startAt);
        gainNode.gain.setValueAtTime(0.0001, startAt);
        gainNode.gain.linearRampToValueAtTime(volume, startAt + 0.015);
        gainNode.gain.exponentialRampToValueAtTime(0.0001, endAt);
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        oscillator.start(startAt);
        oscillator.stop(endAt + 0.01);
        finalEnd = Math.max(finalEnd, t + d);
      });

      window.setTimeout(() => {
        audioContext.close().catch(() => {});
      }, (finalEnd + 0.1) * 1000);
    } catch (error) {
      console.warn("BYTEBREAK sound effect could not play:", error);
    }
  };

  const [leaderboard, setLeaderboard] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("bytebreak_leaderboard") || "[]");
    } catch {
      return [];
    }
  });

  const saveMissionScore = ({ missionId, missionTitle, score, correct, wrong, bestCombo }) => {
    const accuracy = correct + wrong === 0
      ? 0
      : Math.round((correct / (correct + wrong)) * 100);

    const entry = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      player: playerName.trim() || "Unknown Operator",
      missionId,
      missionTitle,
      score,
      correct,
      wrong,
      bestCombo,
      accuracy,
      difficulty,
      date: new Date().toISOString(),
    };

    let savedScores = [];
    try {
      savedScores = JSON.parse(localStorage.getItem("bytebreak_leaderboard") || "[]");
      if (!Array.isArray(savedScores)) savedScores = [];
    } catch {
      savedScores = [];
    }

    const updatedScores = [...savedScores, entry]
      .sort((a, b) => b.score - a.score)
      .slice(0, 50);

    localStorage.setItem("bytebreak_leaderboard", JSON.stringify(updatedScores));
    setLeaderboard(updatedScores);
  };

  /* Mission 01: Crack the Code */

  const [gameQuestions, setGameQuestions] = useState([]);

  const [questionIndex, setQuestionIndex] = useState(0);

  const [gameScore, setGameScore] = useState(0);

  const [lives, setLives] = useState(3);

  const [questionTime, setQuestionTime] = useState(12);

  const [feedback, setFeedback] = useState("");

  const [combo, setCombo] = useState(0);

  const [bestCombo, setBestCombo] = useState(0);

  const [correctAnswers, setCorrectAnswers] = useState(0);

  const [wrongAnswers, setWrongAnswers] = useState(0);

  /* Mission 02: Memory Breach */

  const [memoryRoundIndex, setMemoryRoundIndex] = useState(0);

  const [memoryScore, setMemoryScore] = useState(0);

  const [memoryLives, setMemoryLives] = useState(3);

  const [memoryPhase, setMemoryPhase] = useState("show");

  const [memoryFeedback, setMemoryFeedback] = useState("");

  const [memoryTime, setMemoryTime] = useState(12);

  const [memoryCorrect, setMemoryCorrect] = useState(0);

  const [memoryWrong, setMemoryWrong] = useState(0);

  const [memoryCombo, setMemoryCombo] = useState(0);

  const [memoryBestCombo, setMemoryBestCombo] = useState(0);

  /* Missions 03–05: shared arcade state */
  const [arcadeQuestions, setArcadeQuestions] = useState([]);
  const [arcadeIndex, setArcadeIndex] = useState(0);
  const [arcadeScore, setArcadeScore] = useState(0);
  const [arcadeLives, setArcadeLives] = useState(3);
  const [arcadeTime, setArcadeTime] = useState(12);
  const [arcadeFeedback, setArcadeFeedback] = useState("");
  const [arcadeCorrect, setArcadeCorrect] = useState(0);
  const [arcadeWrong, setArcadeWrong] = useState(0);
  const [arcadeCombo, setArcadeCombo] = useState(0);
  const [arcadeBestCombo, setArcadeBestCombo] = useState(0);

  /* =========================================
     MISSION 01: START
  ========================================= */

  const startCodeMission = () => {
    const shuffledQuestions = shuffleArray(logicQuestions);

    setGameQuestions(shuffledQuestions.slice(0, 5));

    setQuestionIndex(0);

    setGameScore(0);

    setLives(3);

    setQuestionTime(getTimeForDifficulty(difficulty));

    setFeedback("");

    setCombo(0);

    setBestCombo(0);

    setCorrectAnswers(0);

    setWrongAnswers(0);

    playSound("start");
    setScreen("game");
  };

  /* =========================================
     MISSION 02: START
  ========================================= */

  const startMemoryMission = () => {
    setMemoryRoundIndex(0);

    setMemoryScore(0);

    setMemoryLives(3);

    setMemoryPhase("show");

    setMemoryFeedback("");

    setMemoryTime(getTimeForDifficulty(difficulty));

    setMemoryCorrect(0);

    setMemoryWrong(0);

    setMemoryCombo(0);

    setMemoryBestCombo(0);

    playSound("start");
    setScreen("memory-game");
  };

  const startArcadeMission = (missionId) => {
    const source = missionId === "03" ? debugQuestions : missionId === "04" ? reflexQuestions : finalQuestions;
    setArcadeQuestions(shuffleArray(source));
    setArcadeIndex(0);
    setArcadeScore(0);
    setArcadeLives(3);
    setArcadeTime(getTimeForDifficulty(difficulty));
    setArcadeFeedback("");
    setArcadeCorrect(0);
    setArcadeWrong(0);
    setArcadeCombo(0);
    setArcadeBestCombo(0);
    playSound("start");
    setScreen(missionId === "03" ? "debug-game" : missionId === "04" ? "reflex-game" : "final-game");
  };

  /* =========================================
     INITIALIZE HEIST
  ========================================= */

  const startHeist = () => {
    const name = playerName.trim();

    if (!name) {
      alert("Enter your hacker alias before starting the mission.");
      return;
    }

    localStorage.setItem("bytebreak_player", name);

    setPlayerName(name);

    playSound("select");
    setScreen("missions");
  };

  /* =========================================
     MISSION NAVIGATION
  ========================================= */

  const openMission = (mission) => {
    setSelectedMission(mission);

    if (mission.id === "01") {
      startCodeMission();
    } else if (mission.id === "02") {
      startMemoryMission();
    } else {
      startArcadeMission(mission.id);
    }
  };

  /* =========================================
     MISSION 01: ANSWER HANDLER
  ========================================= */

  const handleAnswer = (option) => {
    if (feedback || lives <= 0) return;

    const currentQuestion = gameQuestions[questionIndex];

    if (!currentQuestion) return;

    if (option === currentQuestion.answer) {
      const nextCombo = combo + 1;

      const timeBonus = questionTime * 10;

      const comboBonus = nextCombo >= 3 ? 50 : 0;

      setGameScore(
        (previous) => previous + 100 + timeBonus + comboBonus
      );

      setCorrectAnswers((previous) => previous + 1);

      setCombo(nextCombo);

      setBestCombo((previous) => Math.max(previous, nextCombo));

      playSound(nextCombo >= 3 ? "combo" : "correct");
      setFeedback("correct");
    } else {
      setLives((previous) => Math.max(0, previous - 1));

      setWrongAnswers((previous) => previous + 1);

      setCombo(0);

      playSound("wrong");
      setFeedback("wrong");
    }
  };

  /* =========================================
     MISSION 01: COUNTDOWN
  ========================================= */

  useEffect(() => {
    if (screen !== "game" || feedback || questionTime <= 0) {
      return undefined;
    }

    const timer = setTimeout(() => {
      setQuestionTime((previous) => Math.max(0, previous - 1));
    }, 1000);

    return () => clearTimeout(timer);
  }, [screen, feedback, questionTime]);

  useEffect(() => {
    if (screen === "game" && questionTime === 0 && !feedback) {
      playSound("timeout");
      setFeedback("timeout");

      setLives((previous) => Math.max(0, previous - 1));

      setWrongAnswers((previous) => previous + 1);

      setCombo(0);
    }
  }, [screen, questionTime, feedback]);

  /* =========================================
     MISSION 01: NEXT QUESTION
  ========================================= */

  const continueGame = () => {
    if (lives <= 0 || questionIndex >= gameQuestions.length - 1) {
      saveMissionScore({
        missionId: "01",
        missionTitle: "CRACK THE CODE",
        score: gameScore,
        correct: correctAnswers,
        wrong: wrongAnswers,
        bestCombo,
      });
      playSound("complete");
      setScreen("results");

      return;
    }

    setQuestionIndex((previous) => previous + 1);

    setQuestionTime(getTimeForDifficulty(difficulty));

    setFeedback("");
  };

  /* =========================================
     MISSION 02: ANSWER HANDLER
  ========================================= */

  const handleMemoryAnswer = (option) => {
    if (memoryPhase !== "recall" || memoryFeedback || memoryLives <= 0) {
      return;
    }

    const currentRound = memoryRounds[memoryRoundIndex];

    if (!currentRound) return;

    const isCorrect =
      JSON.stringify(option) === JSON.stringify(currentRound.sequence);

    if (isCorrect) {
      const nextCombo = memoryCombo + 1;

      const timeBonus = memoryTime * 10;

      const comboBonus = nextCombo >= 3 ? 50 : 0;

      setMemoryScore(
        (previous) => previous + 100 + timeBonus + comboBonus
      );

      setMemoryCorrect((previous) => previous + 1);

      setMemoryCombo(nextCombo);

      setMemoryBestCombo((previous) =>
        Math.max(previous, nextCombo)
      );

      playSound(nextCombo >= 3 ? "combo" : "correct");
      setMemoryFeedback("correct");
    } else {
      setMemoryLives((previous) => Math.max(0, previous - 1));

      setMemoryWrong((previous) => previous + 1);

      setMemoryCombo(0);

      playSound("wrong");
      setMemoryFeedback("wrong");
    }

    setMemoryPhase("feedback");
  };

  /* =========================================
     MISSION 02: DISPLAY SEQUENCE
  ========================================= */

  useEffect(() => {
    if (screen !== "memory-game" || memoryPhase !== "show") {
      return undefined;
    }

    playSound("memoryReveal");
    const timer = setTimeout(() => {
      setMemoryPhase("recall");
    }, 3000);

    return () => clearTimeout(timer);
  }, [screen, memoryPhase, memoryRoundIndex]);

  /* =========================================
     MISSION 02: COUNTDOWN
  ========================================= */

  useEffect(() => {
    if (
      screen !== "memory-game" ||
      memoryPhase !== "recall" ||
      memoryFeedback ||
      memoryTime <= 0
    ) {
      return undefined;
    }

    const timer = setTimeout(() => {
      setMemoryTime((previous) => Math.max(0, previous - 1));
    }, 1000);

    return () => clearTimeout(timer);
  }, [screen, memoryPhase, memoryFeedback, memoryTime]);

  /* =========================================
     MISSION 02: TIMEOUT
  ========================================= */

  useEffect(() => {
    if (
      screen === "memory-game" &&
      memoryPhase === "recall" &&
      memoryTime === 0 &&
      !memoryFeedback
    ) {
      setMemoryLives((previous) => Math.max(0, previous - 1));

      setMemoryWrong((previous) => previous + 1);

      setMemoryCombo(0);

      playSound("timeout");
      setMemoryFeedback("timeout");

      setMemoryPhase("feedback");
    }
  }, [screen, memoryPhase, memoryTime, memoryFeedback]);

  /* =========================================
     MISSION 02: NEXT ROUND
  ========================================= */

  const continueMemoryGame = () => {
    if (
      memoryLives <= 0 ||
      memoryRoundIndex >= memoryRounds.length - 1
    ) {
      saveMissionScore({
        missionId: "02",
        missionTitle: "MEMORY BREACH",
        score: memoryScore,
        correct: memoryCorrect,
        wrong: memoryWrong,
        bestCombo: memoryBestCombo,
      });
      playSound("complete");
      setScreen("memory-results");

      return;
    }

    setMemoryRoundIndex((previous) => previous + 1);

    setMemoryPhase("show");

    setMemoryFeedback("");

    setMemoryTime(getTimeForDifficulty(difficulty));
  };

  /* =========================================
     MISSIONS 03–05: ARCADE HANDLERS
  ========================================= */

  const handleArcadeAnswer = (option) => {
    if (arcadeFeedback || arcadeLives <= 0) return;
    const current = arcadeQuestions[arcadeIndex];
    if (!current) return;
    if (option === current.answer) {
      const nextCombo = arcadeCombo + 1;
      setArcadeScore((previous) => previous + 100 + arcadeTime * 5 + (nextCombo >= 3 ? 50 : 0));
      setArcadeCorrect((previous) => previous + 1);
      setArcadeCombo(nextCombo);
      setArcadeBestCombo((previous) => Math.max(previous, nextCombo));
      playSound(nextCombo >= 3 ? "combo" : "correct");
      setArcadeFeedback("correct");
    } else {
      setArcadeLives((previous) => Math.max(0, previous - 1));
      setArcadeWrong((previous) => previous + 1);
      setArcadeCombo(0);
      playSound("wrong");
      setArcadeFeedback("wrong");
    }
  };

  useEffect(() => {
    if (!["debug-game", "reflex-game", "final-game"].includes(screen) || arcadeFeedback || arcadeTime <= 0) return undefined;
    const timer = setTimeout(() => setArcadeTime((previous) => Math.max(0, previous - 1)), 1000);
    return () => clearTimeout(timer);
  }, [screen, arcadeFeedback, arcadeTime]);

  useEffect(() => {
    if (["debug-game", "reflex-game", "final-game"].includes(screen) && arcadeTime === 0 && !arcadeFeedback) {
      setArcadeLives((previous) => Math.max(0, previous - 1));
      setArcadeWrong((previous) => previous + 1);
      setArcadeCombo(0);
      playSound("timeout");
      setArcadeFeedback("timeout");
    }
  }, [screen, arcadeTime, arcadeFeedback]);

  const continueArcadeMission = () => {
    if (arcadeLives <= 0 || arcadeIndex >= arcadeQuestions.length - 1) {
      saveMissionScore({
        missionId: selectedMission?.id || "00",
        missionTitle: selectedMission?.title || "ARCADE MISSION",
        score: arcadeScore,
        correct: arcadeCorrect,
        wrong: arcadeWrong,
        bestCombo: arcadeBestCombo,
      });
      playSound(selectedMission?.id === "05" && arcadeLives > 0 ? "victory" : "complete");
      setScreen("arcade-results");
      return;
    }
    setArcadeIndex((previous) => previous + 1);
    setArcadeTime(getTimeForDifficulty(difficulty));
    setArcadeFeedback("");
  };

  const replayArcadeMission = () => {
    if (selectedMission) startArcadeMission(selectedMission.id);
  };

  // Final three seconds of any active challenge get a light warning tick.
  useEffect(() => {
    const active =
      (screen === "game" && !feedback && questionTime > 0 && questionTime <= 3) ||
      (screen === "memory-game" && memoryPhase === "recall" && !memoryFeedback && memoryTime > 0 && memoryTime <= 3) ||
      (["debug-game", "reflex-game", "final-game"].includes(screen) && !arcadeFeedback && arcadeTime > 0 && arcadeTime <= 3);

    if (active) playSound("tick");
  }, [screen, questionTime, feedback, memoryPhase, memoryTime, memoryFeedback, arcadeTime, arcadeFeedback]);

  /* =========================================
     REPLAY FUNCTIONS
  ========================================= */

  const playAgain = () => {
    startCodeMission();
  };

  const replayMemory = () => {
    startMemoryMission();
  };

  /* =========================================
     RENDER
  ========================================= */

  return (
    <main className="app-shell">
      <div className="ambient ambient-one" />

      <div className="ambient ambient-two" />

      {/* HEADER */}

      <header className="topbar">
        <button
          className="brand"
          onClick={() => setScreen("home")}
          aria-label="Go to BYTEBREAK home"
        >
          <span className="brand-icon">
            <Terminal size={22} />
          </span>

          <span>
            BYTE<span className="brand-accent">BREAK</span>

            <small>CYBER OPERATIONS DIVISION</small>
          </span>
        </button>

        <div className="system-status">
          <span className="status-dot" />
          SYSTEM ONLINE
        </div>

        <div className="topbar-right">
          <button
            type="button"
            className="sound-toggle"
            aria-label={soundEnabled ? "Turn sound off" : "Turn sound on"}
            aria-pressed={soundEnabled}
            onClick={() => {
              const nextState = !soundEnabled;
              setSoundEnabled(nextState);
              try {
                localStorage.setItem("bytebreak_sound", nextState ? "on" : "off");
              } catch {
                // Sound still works for this session if storage is unavailable.
              }
            }}
          >
            {soundEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
            <span>{soundEnabled ? "SOUND ON" : "SOUND OFF"}</span>
          </button>

          <span className="version-label">BUILD 01.02</span>

          <Shield size={20} className="top-shield" />
        </div>
      </header>

      <AnimatePresence mode="wait">
        {/* =====================================
            HOME SCREEN
        ===================================== */}

        {screen === "home" && (
          <motion.section
            key="home"
            className="hero-section"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35 }}
          >
            <div className="hero-left">
              <div className="eyebrow">
                <span className="eyebrow-line" />
                CLASSIFIED MISSION // BB-2601
              </div>

              <h1>
                THINK FAST.
                <br />

                <span className="outline-text">HACK SMART.</span>

                <br />

                <span className="green-text">ESCAPE.</span>
              </h1>

              <p className="hero-description">
                A classified AI security system has gone rogue. Five layers
                of digital defense stand between you and freedom. Every
                second matters. Every decision counts.
              </p>

              <div className="hero-features">
                <div className="feature-item">
                  <Crosshair size={17} />
                  <span>5 MISSIONS</span>
                </div>

                <div className="feature-item">
                  <BrainCircuit size={17} />
                  <span>ADAPTIVE CHALLENGES</span>
                </div>

                <div className="feature-item">
                  <Trophy size={17} />
                  <span>GLOBAL RANKING</span>
                </div>
              </div>

              <div className="access-panel">
                <label htmlFor="hacker-alias">
                  <Terminal size={15} />
                  ENTER YOUR HACKER ALIAS
                </label>

                <input
                  id="hacker-alias"
                  type="text"
                  maxLength={20}
                  placeholder="e.g. ShadowByte"
                  value={playerName}
                  onChange={(event) => setPlayerName(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") startHeist();
                  }}
                />

                <label className="difficulty-label">
                  SELECT DIFFICULTY
                </label>

                <div className="difficulty-options">
                  {["ROOKIE", "HACKER", "NIGHTMARE"].map((level) => (
                    <button
                      key={level}
                      type="button"
                      className={`difficulty-button ${
                        difficulty === level ? "active" : ""
                      }`}
                      onClick={() => setDifficulty(level)}
                    >
                      {level}
                    </button>
                  ))}
                </div>

                <button className="start-button" onClick={startHeist}>
                  INITIALIZE HEIST
                  <ChevronRight size={19} />
                </button>

                <p className="access-note">
                  <LockKeyhole size={12} />
                  AUTHORIZED ACCESS NOT REQUIRED. COURAGE IS.
                </p>

                <button
                  type="button"
                  className="leaderboard-home-button"
                  onClick={() => setScreen("leaderboard")}
                >
                  <Trophy size={16} /> VIEW LEADERBOARD
                </button>
              </div>
            </div>

            <div className="hero-right">
              <div className="visual-topline">
                <span>LIVE SYSTEM MONITOR</span>

                <span className="live-label">● LIVE</span>
              </div>

              <div className="core-visual">
                <div className="orbit orbit-outer" />

                <div className="orbit orbit-middle" />

                <div className="orbit orbit-inner" />

                <div className="crosshair crosshair-horizontal" />

                <div className="crosshair crosshair-vertical" />

                <div className="core-center">
                  <Shield size={57} strokeWidth={1.1} />

                  <span>BB</span>
                </div>

                <div className="orbit-label orbit-label-one">
                  <span className="mini-dot" />

                  FIREWALL ACTIVE
                </div>

                <div className="orbit-label orbit-label-two">
                  ENCRYPTION: AES-256
                </div>

                <div className="orbit-label orbit-label-three">
                  <Activity size={13} />

                  THREAT LEVEL: HIGH
                </div>
              </div>

              <div className="terminal-card">
                <div className="terminal-heading">
                  <div className="terminal-dots">
                    <span />
                    <span />
                    <span />
                  </div>

                  <span>root@bytebreak:~</span>

                  <span className="terminal-lock">
                    <LockKeyhole size={13} />
                  </span>
                </div>

                <div className="terminal-body">
                  <p>
                    <span className="terminal-green">root@bytebreak</span>

                    <span className="terminal-muted">:~$</span> initiate
                    sequence
                  </p>

                  <p className="terminal-muted">
                    Loading security protocols...
                  </p>

                  <p>
                    <span className="terminal-green">[OK]</span> Neural
                    interface ready
                  </p>

                  <p>
                    <span className="terminal-green">[OK]</span> Puzzle
                    engine initialized
                  </p>

                  <p>
                    <span className="terminal-yellow">[!]</span> Unknown
                    intruder detected
                  </p>

                  <p className="terminal-command">
                    <span className="terminal-green">root@bytebreak</span>

                    <span className="terminal-muted">:~$</span>{" "}

                    <span className="blinking-cursor">_</span>
                  </p>
                </div>
              </div>

              <div className="visual-footer">
                <span>NEURAL NETWORK v2.6</span>

                <span>ENCRYPTED CONNECTION</span>
              </div>
            </div>
          </motion.section>
        )}

        {/* =====================================
            MISSION SELECTION
        ===================================== */}

        {screen === "missions" && (
          <motion.section
            key="missions"
            className="missions-section"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            <div className="missions-top-actions">
              <button
                className="back-button"
                onClick={() => setScreen("home")}
              >
                <ArrowLeft size={16} />
                BACK TO BASE
              </button>

              <button
                type="button"
                className="leaderboard-home-button"
                onClick={() => setScreen("leaderboard")}
              >
                <Trophy size={16} /> LEADERBOARD
              </button>
            </div>

            <div className="section-eyebrow">
              OPERATOR: {playerName.toUpperCase()}
            </div>

            <h1 className="missions-title">
              SELECT YOUR <span className="green-text">MISSION.</span>
            </h1>

            <p className="missions-description">
              Five security layers. One escape route. Complete every
              challenge to reach the core.
            </p>

            <div className="mission-progress">
              <span>MISSION PROGRESS</span>

              <span>0 / 5 COMPLETED</span>

              <div className="progress-track">
                <div className="progress-fill" />
              </div>
            </div>

            <div className="mission-grid">
              {missions.map((mission, index) => {
                const Icon = mission.icon;

                return (
                  <motion.button
                    key={mission.id}
                    type="button"
                    className={`mission-card ${mission.color}`}
                    onClick={() => openMission(mission)}
                    whileHover={{ y: -5 }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.08 }}
                  >
                    <div className="mission-card-top">
                      <span className="mission-number">
                        LAYER_{mission.id}
                      </span>

                      <Icon size={25} />
                    </div>

                    <div className="mission-tag">
                      {mission.difficulty}
                    </div>

                    <h2>{mission.title}</h2>

                    <p>{mission.description}</p>

                    <div className="mission-card-footer">
                      <span>{mission.duration}</span>

                      <span className="mission-play">
                        ACCESS <ChevronRight size={15} />
                      </span>
                    </div>
                  </motion.button>
                );
              })}
            </div>

            <div className="difficulty-summary">
              <Shield size={17} />

              DIFFICULTY: <strong>{difficulty}</strong>

              <span>
                Choose a layer to inspect or launch its mission.
              </span>
            </div>
          </motion.section>
        )}

        {/* =====================================
            MISSION 01: CRACK THE CODE
        ===================================== */}

        {screen === "game" && gameQuestions.length > 0 && (
          <motion.section
            key="game"
            className="code-game-section"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
          >
            <div className="game-topline">
              <button
                className="back-button"
                onClick={() => setScreen("missions")}
              >
                <ArrowLeft size={16} />

                ABORT MISSION
              </button>

              <span className="game-security-label">
                <span className="status-dot" />

                SECURITY LAYER 01
              </span>
            </div>

            <div className="game-heading">
              <p className="section-eyebrow">
                MISSION 01 // LOGIC ENGINE
              </p>

              <h1>
                CRACK THE <span className="green-text">CODE.</span>
              </h1>

              <p>
                Solve the encrypted pattern before the security system locks
                you out.
              </p>
            </div>

            <div className="game-stats">
              <div className="game-stat">
                <span>OPERATOR</span>

                <strong>{playerName}</strong>
              </div>

              <div className="game-stat">
                <span>SCORE</span>

                <strong className="stat-green">{gameScore}</strong>
              </div>

              <div className="game-stat">
                <span>LIVES</span>

                <strong className="stat-red">
                  {"♥ ".repeat(lives).trim() || "—"}
                </strong>
              </div>

              <div className="game-stat">
                <span>COMBO</span>

                <strong>{combo}×</strong>
              </div>
            </div>

            <div className="question-progress">
              <div>
                <span>ENCRYPTION CHALLENGE</span>

                <span>
                  QUESTION {questionIndex + 1} / {gameQuestions.length}
                </span>
              </div>

              <div className="progress-track">
                <div
                  className="progress-fill"
                  style={{
                    width: `${
                      ((questionIndex + 1) / gameQuestions.length) * 100
                    }%`,
                  }}
                />
              </div>
            </div>

            <div className="puzzle-panel">
              <div className="puzzle-panel-header">
                <span>
                  <Terminal size={15} />

                  encrypted_sequence.exe
                </span>

                <span
                  className={
                    questionTime <= 4 ? "timer-danger" : "timer-normal"
                  }
                >
                  {String(questionTime).padStart(2, "0")} SEC
                </span>
              </div>

              <div className="puzzle-content">
                <div className="puzzle-index">
                  CHALLENGE_{String(questionIndex + 1).padStart(2, "0")}
                </div>

                <h2>{gameQuestions[questionIndex].question}</h2>

                <div className="answer-grid">
                  {gameQuestions[questionIndex].options.map(
                    (option, index) => {
                      const isCorrect =
                        Boolean(feedback) &&
                        option === gameQuestions[questionIndex].answer;

                      return (
                        <button
                          key={option}
                          type="button"
                          className={`answer-button ${
                            isCorrect ? "answer-correct" : ""
                          }`}
                          onClick={() => handleAnswer(option)}
                          disabled={Boolean(feedback) || lives <= 0}
                        >
                          <span className="answer-letter">
                            {String.fromCharCode(65 + index)}
                          </span>

                          <span>{option}</span>
                        </button>
                      );
                    }
                  )}
                </div>

                {feedback && (
                  <motion.div
                    className={`answer-feedback ${
                      feedback === "correct"
                        ? "feedback-success"
                        : "feedback-error"
                    }`}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <strong>
                      {feedback === "correct"
                        ? "ACCESS GRANTED"
                        : feedback === "timeout"
                          ? "TIME EXPIRED"
                          : "ACCESS DENIED"}
                    </strong>

                    <p>
                      {feedback === "correct"
                        ? gameQuestions[questionIndex].explanation
                        : `Correct answer: ${
                            gameQuestions[questionIndex].answer
                          }. ${gameQuestions[questionIndex].explanation}`}
                    </p>

                    {combo >= 3 && feedback === "correct" && (
                      <span className="combo-bonus">
                        COMBO BONUS ACTIVATED +50
                      </span>
                    )}

                    <button
                      type="button"
                      className="start-button"
                      onClick={continueGame}
                    >
                      {lives <= 0 ||
                      questionIndex >= gameQuestions.length - 1
                        ? "VIEW MISSION RESULTS"
                        : "NEXT CHALLENGE"}

                      <ChevronRight size={18} />
                    </button>
                  </motion.div>
                )}

                {!feedback && (
                  <div className="puzzle-hint">
                    <Shield size={14} />

                    THINK CAREFULLY. WRONG ANSWERS COST ONE LIFE.
                  </div>
                )}
              </div>
            </div>

            <div className="game-bottomline">
              <span>DIFFICULTY: {difficulty}</span>

              <span>BEST COMBO: {bestCombo}×</span>

              <span>TIME BONUS ENABLED</span>
            </div>
          </motion.section>
        )}

        {/* =====================================
            MISSION 01: RESULTS
        ===================================== */}

        {screen === "results" && (
          <motion.section
            key="results"
            className="results-section"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="results-panel">
              <div className="results-icon">
                <Trophy size={42} />
              </div>

              <p className="section-eyebrow">
                MISSION 01 // REPORT GENERATED
              </p>

              <h1>
                {lives > 0 ? "SYSTEM BREACHED." : "ACCESS DENIED."}
              </h1>

              <p className="results-subtitle">
                Operator {playerName}, your mission has ended.
              </p>

              <div className="final-score">
                <span>FINAL SCORE</span>

                <strong>{gameScore}</strong>

                <small>POINTS</small>
              </div>

              <div className="results-grid">
                <div>
                  <span>CORRECT</span>

                  <strong>{correctAnswers}</strong>
                </div>

                <div>
                  <span>MISTAKES</span>

                  <strong>{wrongAnswers}</strong>
                </div>

                <div>
                  <span>BEST COMBO</span>

                  <strong>{bestCombo}×</strong>
                </div>

                <div>
                  <span>ACCURACY</span>

                  <strong>
                    {correctAnswers + wrongAnswers === 0
                      ? 0
                      : Math.round(
                          (correctAnswers /
                            (correctAnswers + wrongAnswers)) *
                            100
                        )}
                    %
                  </strong>
                </div>
              </div>

              <button
                type="button"
                className="start-button"
                onClick={playAgain}
              >
                REPLAY MISSION

                <Zap size={18} />
              </button>

              <button
                type="button"
                className="results-secondary-button"
                onClick={() => setScreen("missions")}
              >
                RETURN TO MISSION SELECT
              </button>
            </div>
          </motion.section>
        )}

        {/* =====================================
            MISSION 02: MEMORY BREACH
        ===================================== */}

        {screen === "memory-game" && (
          <motion.section
            key="memory-game"
            className="code-game-section memory-game-section"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
          >
            <div className="game-topline">
              <button
                className="back-button"
                onClick={() => setScreen("missions")}
              >
                <ArrowLeft size={16} />

                ABORT MISSION
              </button>

              <span className="game-security-label">
                <span className="status-dot" />

                SECURITY LAYER 02
              </span>
            </div>

            <div className="game-heading">
              <p className="section-eyebrow">
                MISSION 02 // NEURAL MEMORY TEST
              </p>

              <h1>
                MEMORY <span className="green-text">BREACH.</span>
              </h1>

              <p>
                Memorize the sequence. Reproduce it perfectly. Don't let the
                system erase your memory.
              </p>
            </div>

            <div className="game-stats">
              <div className="game-stat">
                <span>OPERATOR</span>

                <strong>{playerName}</strong>
              </div>

              <div className="game-stat">
                <span>SCORE</span>

                <strong className="stat-green">{memoryScore}</strong>
              </div>

              <div className="game-stat">
                <span>LIVES</span>

                <strong className="stat-red">
                  {"♥ ".repeat(memoryLives).trim() || "—"}
                </strong>
              </div>

              <div className="game-stat">
                <span>COMBO</span>

                <strong>{memoryCombo}×</strong>
              </div>
            </div>

            <div className="question-progress">
              <div>
                <span>MEMORY SEQUENCE</span>

                <span>
                  ROUND {memoryRoundIndex + 1} / {memoryRounds.length}
                </span>
              </div>

              <div className="progress-track">
                <div
                  className="progress-fill"
                  style={{
                    width: `${
                      ((memoryRoundIndex + 1) / memoryRounds.length) * 100
                    }%`,
                    background: "var(--purple)",
                  }}
                />
              </div>
            </div>

            <div className="puzzle-panel memory-panel">
              <div className="puzzle-panel-header">
                <span>
                  <BrainCircuit size={15} />

                  neural_memory.exe
                </span>

                <span
                  className={
                    memoryPhase === "show"
                      ? "timer-normal"
                      : memoryTime <= 4
                        ? "timer-danger"
                        : "timer-normal"
                  }
                >
                  {memoryPhase === "show"
                    ? "MEMORIZE"
                    : `${String(memoryTime).padStart(2, "0")} SEC`}
                </span>
              </div>

              <div className="puzzle-content">
                <div className="puzzle-index">
                  MEMORY_FRAGMENT_
                  {String(memoryRoundIndex + 1).padStart(2, "0")}
                </div>

                {memoryPhase === "show" && (
                  <motion.div
                    className="memory-sequence-display"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                  >
                    <p className="memory-instruction">
                      MEMORIZE THIS SEQUENCE
                    </p>

                    <div className="memory-symbols">
                      {memoryRounds[memoryRoundIndex].sequence.map(
                        (symbol, index) => (
                          <motion.span
                            key={`${symbol}-${index}`}
                            className="memory-symbol"
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.12 }}
                          >
                            {symbol}
                          </motion.span>
                        )
                      )}
                    </div>

                    <p className="memory-warning">
                      SEQUENCE WILL DISAPPEAR SHORTLY
                    </p>
                  </motion.div>
                )}

                {memoryPhase === "recall" && (
                  <motion.div
                    className="memory-recall"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <h2>RECONSTRUCT THE SEQUENCE</h2>

                    <p>
                      Which option matches the symbols you just saw?
                    </p>

                    <div className="memory-options">
                      {memoryRounds[memoryRoundIndex].options.map(
                        (option, index) => (
                          <button
                            key={`${memoryRoundIndex}-${index}`}
                            type="button"
                            className="memory-option"
                            onClick={() => handleMemoryAnswer(option)}
                          >
                            <span className="answer-letter">
                              {String.fromCharCode(65 + index)}
                            </span>

                            <span className="memory-option-symbols">
                              {option.map((symbol, symbolIndex) => (
                                <span key={`${symbol}-${symbolIndex}`}>
                                  {symbol}
                                </span>
                              ))}
                            </span>
                          </button>
                        )
                      )}
                    </div>
                  </motion.div>
                )}

                {memoryPhase === "feedback" && (
                  <motion.div
                    className={`answer-feedback ${
                      memoryFeedback === "correct"
                        ? "feedback-success"
                        : "feedback-error"
                    }`}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <strong>
                      {memoryFeedback === "correct"
                        ? "MEMORY VERIFIED"
                        : memoryFeedback === "timeout"
                          ? "TIME EXPIRED"
                          : "MEMORY CORRUPTED"}
                    </strong>

                    <p>
                      Correct sequence:{" "}
                      {memoryRounds[memoryRoundIndex].sequence.join(" ")}
                    </p>

                    {memoryFeedback === "correct" &&
                      memoryCombo >= 3 && (
                        <span className="combo-bonus">
                          COMBO BONUS ACTIVATED +50
                        </span>
                      )}

                    <button
                      type="button"
                      className="start-button"
                      onClick={continueMemoryGame}
                    >
                      {memoryLives <= 0 ||
                      memoryRoundIndex >= memoryRounds.length - 1
                        ? "VIEW MISSION RESULTS"
                        : "NEXT MEMORY FRAGMENT"}

                      <ChevronRight size={18} />
                    </button>
                  </motion.div>
                )}
              </div>
            </div>

            <div className="game-bottomline">
              <span>DIFFICULTY: {difficulty}</span>

              <span>BEST COMBO: {memoryBestCombo}×</span>

              <span>MEMORY PROTOCOL ACTIVE</span>
            </div>
          </motion.section>
        )}

        {/* =====================================
            MISSION 02: RESULTS
        ===================================== */}

        {screen === "memory-results" && (
          <motion.section
            key="memory-results"
            className="results-section"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="results-panel">
              <div className="results-icon">
                <BrainCircuit size={42} />
              </div>

              <p className="section-eyebrow">
                MISSION 02 // MEMORY REPORT
              </p>

              <h1>
                {memoryLives > 0
                  ? "MEMORY RESTORED."
                  : "MEMORY BREACHED."}
              </h1>

              <p className="results-subtitle">
                Operator {playerName}, your memory test is complete.
              </p>

              <div className="final-score">
                <span>FINAL SCORE</span>

                <strong>{memoryScore}</strong>

                <small>POINTS</small>
              </div>

              <div className="results-grid">
                <div>
                  <span>CORRECT</span>

                  <strong>{memoryCorrect}</strong>
                </div>

                <div>
                  <span>MISTAKES</span>

                  <strong>{memoryWrong}</strong>
                </div>

                <div>
                  <span>BEST COMBO</span>

                  <strong>{memoryBestCombo}×</strong>
                </div>

                <div>
                  <span>ACCURACY</span>

                  <strong>
                    {memoryCorrect + memoryWrong === 0
                      ? 0
                      : Math.round(
                          (memoryCorrect /
                            (memoryCorrect + memoryWrong)) *
                            100
                        )}
                    %
                  </strong>
                </div>
              </div>

              <button
                type="button"
                className="start-button"
                onClick={replayMemory}
              >
                REPLAY MEMORY BREACH

                <Zap size={18} />
              </button>

              <button
                type="button"
                className="results-secondary-button"
                onClick={() => setScreen("missions")}
              >
                RETURN TO MISSION SELECT
              </button>
            </div>
          </motion.section>
        )}

        {/* =====================================
            MISSIONS 03–05: PLAYABLE CHALLENGES
        ===================================== */}
        {["debug-game", "reflex-game", "final-game"].includes(screen) && arcadeQuestions.length > 0 && (
          <motion.section key={screen} className="code-game-section" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }}>
            <div className="game-topline">
              <button className="back-button" onClick={() => setScreen("missions")}><ArrowLeft size={16} /> ABORT MISSION</button>
              <span className="game-security-label"><span className="status-dot" /> SECURITY LAYER {selectedMission?.id}</span>
            </div>
            <div className="game-heading">
              <p className="section-eyebrow">MISSION {selectedMission?.id} // {selectedMission?.difficulty} PROTOCOL</p>
              <h1>{selectedMission?.title.split(" ").slice(0, -1).join(" ")} <span className="green-text">{selectedMission?.title.split(" ").slice(-1)[0]}.</span></h1>
              <p>{selectedMission?.description}</p>
            </div>
            <div className="game-stats">
              <div className="game-stat"><span>OPERATOR</span><strong>{playerName}</strong></div>
              <div className="game-stat"><span>SCORE</span><strong className="stat-green">{arcadeScore}</strong></div>
              <div className="game-stat"><span>LIVES</span><strong className="stat-red">{"♥ ".repeat(arcadeLives).trim() || "—"}</strong></div>
              <div className="game-stat"><span>COMBO</span><strong>{arcadeCombo}×</strong></div>
            </div>
            <div className="question-progress"><div><span>CHALLENGE PROGRESS</span><span>ROUND {arcadeIndex + 1} / {arcadeQuestions.length}</span></div><div className="progress-track"><div className="progress-fill" style={{ width: `${((arcadeIndex + 1) / arcadeQuestions.length) * 100}%` }} /></div></div>
            <div className="puzzle-panel">
              <div className="puzzle-panel-header"><span><Terminal size={15} /> {screen === "debug-game" ? "debug_console.exe" : screen === "reflex-game" ? "firewall_scanner.exe" : "final_firewall.exe"}</span><span className={arcadeTime <= 4 ? "timer-danger" : "timer-normal"}>{String(arcadeTime).padStart(2, "0")} SEC</span></div>
              <div className="puzzle-content">
                <div className="puzzle-index">{arcadeQuestions[arcadeIndex].title || `CHALLENGE_${arcadeIndex + 1}`}</div>
                <h2>{arcadeQuestions[arcadeIndex].question}</h2>
                {arcadeQuestions[arcadeIndex].code && <pre style={{ whiteSpace: "pre-wrap", overflowX: "auto", background: "rgba(0,0,0,.28)", border: "1px solid var(--green)", borderRadius: "8px", padding: "18px", color: "var(--green)", fontFamily: "monospace", lineHeight: 1.6 }}>{arcadeQuestions[arcadeIndex].code}</pre>}
                <div className="answer-grid">
                  {arcadeQuestions[arcadeIndex].options.map((option, index) => {
                    const isCorrect = Boolean(arcadeFeedback) && option === arcadeQuestions[arcadeIndex].answer;
                    return <button key={`${arcadeIndex}-${option}`} type="button" className={`answer-button ${isCorrect ? "answer-correct" : ""}`} onClick={() => handleArcadeAnswer(option)} disabled={Boolean(arcadeFeedback) || arcadeLives <= 0}><span className="answer-letter">{String.fromCharCode(65 + index)}</span><span>{option}</span></button>;
                  })}
                </div>
                {arcadeFeedback && <motion.div className={`answer-feedback ${arcadeFeedback === "correct" ? "feedback-success" : "feedback-error"}`} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
                  <strong>{arcadeFeedback === "correct" ? "ACCESS GRANTED" : arcadeFeedback === "timeout" ? "TIME EXPIRED" : "ACCESS DENIED"}</strong>
                  <p>{arcadeFeedback === "correct" ? arcadeQuestions[arcadeIndex].explanation : `Correct answer: ${arcadeQuestions[arcadeIndex].answer}. ${arcadeQuestions[arcadeIndex].explanation}`}</p>
                  {arcadeCombo >= 3 && arcadeFeedback === "correct" && <span className="combo-bonus">COMBO BONUS ACTIVATED +50</span>}
                  <button type="button" className="start-button" onClick={continueArcadeMission}>{arcadeLives <= 0 || arcadeIndex >= arcadeQuestions.length - 1 ? "VIEW MISSION RESULTS" : "NEXT CHALLENGE"}<ChevronRight size={18} /></button>
                </motion.div>}
                {!arcadeFeedback && <div className="puzzle-hint"><Shield size={14} /> CORRECT ANSWERS EARN POINTS. WRONG ANSWERS COST ONE LIFE.</div>}
              </div>
            </div>
            <div className="game-bottomline"><span>DIFFICULTY: {difficulty}</span><span>BEST COMBO: {arcadeBestCombo}×</span><span>SECURITY PROTOCOL ACTIVE</span></div>
          </motion.section>
        )}

        {screen === "arcade-results" && (
          <motion.section key="arcade-results" className="results-section" initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}>
            <div className="results-panel">
              <div className="results-icon"><Trophy size={42} /></div>
              <p className="section-eyebrow">MISSION {selectedMission?.id} // REPORT GENERATED</p>
              <h1>{arcadeLives > 0 ? "SYSTEM BREACHED." : "ACCESS DENIED."}</h1>
              <p className="results-subtitle">Operator {playerName}, your {selectedMission?.title.toLowerCase()} mission has ended.</p>
              <div className="final-score"><span>FINAL SCORE</span><strong>{arcadeScore}</strong><small>POINTS</small></div>
              <div className="results-grid"><div><span>CORRECT</span><strong>{arcadeCorrect}</strong></div><div><span>MISTAKES</span><strong>{arcadeWrong}</strong></div><div><span>BEST COMBO</span><strong>{arcadeBestCombo}×</strong></div><div><span>ACCURACY</span><strong>{arcadeCorrect + arcadeWrong === 0 ? 0 : Math.round((arcadeCorrect / (arcadeCorrect + arcadeWrong)) * 100)}%</strong></div></div>
              <button type="button" className="start-button" onClick={replayArcadeMission}>REPLAY MISSION <Zap size={18} /></button>
              <button type="button" className="results-secondary-button" onClick={() => setScreen("missions")}>RETURN TO MISSION SELECT</button>
            </div>
          </motion.section>
        )}

        {/* =====================================
            LOCAL LEADERBOARD
        ===================================== */}

        {screen === "leaderboard" && (
          <motion.section
            key="leaderboard"
            className="leaderboard-section"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
          >
            <div className="leaderboard-heading">
              <p className="section-eyebrow">BYTEBREAK // OPERATOR RANKINGS</p>
              <h1>HALL OF <span className="green-text">OPERATORS.</span></h1>
              <p>Top mission scores saved in this browser.</p>
            </div>

            {leaderboard.length === 0 ? (
              <div className="leaderboard-empty">
                <Trophy size={42} />
                <h2>NO SCORES RECORDED</h2>
                <p>Complete any mission to claim your place on the leaderboard.</p>
              </div>
            ) : (
              <div className="leaderboard-table-wrap">
                <div className="leaderboard-table-header">
                  <span>RANK / OPERATOR</span>
                  <span>MISSION</span>
                  <span>ACCURACY</span>
                  <span>SCORE</span>
                </div>
                {leaderboard.map((entry, index) => (
                  <div className={`leaderboard-row ${index < 3 ? `leaderboard-top-${index + 1}` : ""}`} key={entry.id || `${entry.player}-${entry.date}-${index}`}>
                    <div className="leaderboard-player-cell">
                      <span className="leaderboard-rank">{String(index + 1).padStart(2, "0")}</span>
                      <div>
                        <strong>{entry.player}</strong>
                        <small>{entry.difficulty || "HACKER"} MODE</small>
                      </div>
                    </div>
                    <div className="leaderboard-mission-cell">
                      <strong>{entry.missionTitle}</strong>
                      <small>LAYER_{entry.missionId}</small>
                    </div>
                    <span className="leaderboard-accuracy">{entry.accuracy ?? 0}%</span>
                    <strong className="leaderboard-score">{Number(entry.score || 0).toLocaleString()}</strong>
                  </div>
                ))}
              </div>
            )}

            <p className="leaderboard-note">
              LOCAL LEADERBOARD // Scores are stored only in this browser and are not shared between devices.
            </p>

            <div className="leaderboard-actions">
              <button type="button" className="start-button" onClick={() => setScreen("missions")}>
                PLAY A MISSION <ChevronRight size={18} />
              </button>
              <button type="button" className="results-secondary-button" onClick={() => setScreen("home")}>
                BACK TO BASE
              </button>
            </div>
          </motion.section>
        )}

        {/* =====================================
            OTHER MISSION BRIEFING
        ===================================== */}

        {screen === "briefing" && selectedMission && (
          <motion.section
            key="briefing"
            className="briefing-section"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
          >
            <button
              className="back-button"
              onClick={() => setScreen("missions")}
            >
              <ArrowLeft size={16} />

              ALL MISSIONS
            </button>

            <div className="briefing-panel">
              <div className="briefing-icon">
                {(() => {
                  const Icon = selectedMission.icon;

                  return <Icon size={38} />;
                })()}
              </div>

              <p className="section-eyebrow">
                CLASSIFIED // LAYER_{selectedMission.id}
              </p>

              <h1>{selectedMission.title}</h1>

              <p className="briefing-description">
                {selectedMission.description}
              </p>

              <div className="briefing-details">
                <div>
                  <span>CHALLENGE TYPE</span>

                  <strong>{selectedMission.difficulty}</strong>
                </div>

                <div>
                  <span>TIME ALLOCATION</span>

                  <strong>{selectedMission.duration}</strong>
                </div>

                <div>
                  <span>OPERATOR</span>

                  <strong>{playerName}</strong>
                </div>

                <div>
                  <span>DIFFICULTY</span>

                  <strong>{difficulty}</strong>
                </div>
              </div>

              <div className="briefing-warning">
                <Shield size={18} />

                <p>
                  MISSION BRIEFING ONLY
                  <br />
                  This mission briefing is available for reference. Return to mission select to launch a playable challenge.
                </p>
              </div>

              <button
                type="button"
                className="start-button briefing-back"
                onClick={() => setScreen("missions")}
              >
                RETURN TO MISSION SELECT

                <ChevronRight size={18} />
              </button>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* FOOTER */}

      <footer className="site-footer">
        <span>BYTEBREAK © 2026</span>

        <span>BUILT FOR THE BRAVE MINDS.</span>

        <span>ALL SYSTEMS OPERATIONAL</span>
      </footer>
    </main>
  );
}

export default App;