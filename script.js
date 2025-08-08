document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("start-btn").onclick = () => {
    document.getElementById("start-screen").style.display = "none";
    document.getElementById("quiz-content").style.display = "block";
    startQuiz();
  };
});

// ================= ALL SUBJECT QUESTIONS =================

// MATH QUESTIONS
const mathQuestions = [
  // Example — replace with all your math questions
  { question: "Convert 1101₂ to decimal.", options: ["11", "13", "14", "12"], correctAnswer: "13" },
  { question: "What is the base 10 value of 2A₁₆?", options: ["42", "38", "44", "46"], correctAnswer: "42" },
  {
    question: "Which number is not a binary number?",
    options: ["10101", "1110", "0011","10012",],
    correctAnswer: "Lenz's law"
  },

  // Chapter 13: Optics (5)
  {
    question: "According to the law of reflection, the angle of incidence equals the:",
    options: ["Angle of reflection", "Angle of refraction", "Normal", "Critical angle"],
    correctAnswer: "Angle of reflection"
  },
  {
    question: "An image formed by a plane mirror is generally:",
    options: ["Virtual, upright and same size as the object", "Real and inverted", "Virtual and magnified", "Real and diminished"],
    correctAnswer: "Virtual, upright and same size as the object"
  },
  {
    question: "Light travels slower in glass than in air, so glass has refractive index:",
    options: ["Greater than 1", "Equal to 0", "Less than 1", "Negative"],
    correctAnswer: "Greater than 1"
  },
  {
    question: "Total internal reflection occurs when light goes from a denser to a rarer medium and the angle is:",
    options: ["Greater than the critical angle", "Less than the critical angle", "At right angle only", "Equal to zero"],
    correctAnswer: "Greater than the critical angle"
  },
  {
    question: "The unit of optical power of a lens is called the:",
    options: ["Dioptre", "Meter", "Ohm", "Tesla"],
    correctAnswer: "Dioptre"
  },

  // Chapter 14: Modern Physics (Photoelectric & Particles) (5)
  {
    question: "In the photoelectric effect, increasing the intensity of light (at same frequency) mainly increases the:",
    options: ["Photoelectric current", "Kinetic energy of emitted electrons", "Frequency of light", "Work function of metal"],
    correctAnswer: "Photoelectric current"
  },
  {
    question: "If the frequency of incident light is below the threshold frequency, photoelectrons will be:",
    options: ["Not emitted", "Emitted with low energy", "Emitted with high energy", "Emitted with increasing current"],
    correctAnswer: "Not emitted"
  },
  {
    question: "What is the magnitude of the elementary electric charge (approx.)?",
    options: ["1.6×10⁻¹⁹ C", "9.1×10⁻³¹ C", "1.0×10⁻¹⁹ C", "1.6×10⁻¹⁸ C"],
    correctAnswer: "1.6×10⁻¹⁹ C"
  },
  {
    question: "Which of these is the mass of electron (approx.)?",
    options: ["9.11×10⁻³¹ kg", "1.67×10⁻²⁷ kg", "1.00×10⁻²⁶ kg", "9.11×10⁻²⁸ kg"],
    correctAnswer: "9.11×10⁻³¹ kg"
  },
  {
    question: "An alpha particle consists of:",
    options: ["Two protons and two neutrons", "One electron", "One proton", "One neutron"],
    correctAnswer: "Two protons and two neutrons"
  },

  // Chapter 15: Nuclear Physics & Radioactivity (5)
  {
    question: "A sample decays from 80 g to 10 g in some time. How many half-lives have passed?",
    options: ["3", "2", "4", "1"],
    correctAnswer: "3"
  },
  {
    question: "What is the SI unit of radioactivity (decays per second)?",
    options: ["Becquerel", "Curie", "Gray", "Sievert"],
    correctAnswer: "Becquerel"
  },
  {
    question: "If a substance has half-life 2 days and initial mass 100 g, how much remains after 6 days?",
    options: ["12.5 g", "25 g", "6.25 g", "50 g"],
    correctAnswer: "12.5 g"
  },
  {
    question: "Which type of radiation is least penetrating and stopped by paper?",
    options: ["Alpha", "Beta", "Gamma", "Neutron"],
    correctAnswer: "Alpha"
  },
  {
    question: "A beta particle is identical to which particle?",
    options: ["Electron", "Proton", "Neutron", "Alpha particle"],
    correctAnswer: "Electron"
  }
];

// CHEMISTRY QUESTIONS
const chemistryQuestions = [
  { question: "What is the chemical symbol for water?", options: ["O2", "CO2", "H2O", "NaCl"], correctAnswer: "H2O" },
  { question: "Which gas turns limewater milky?", options: ["CO2", "O2", "N2", "H2"], correctAnswer: "CO2" },
  // Add more chemistry questions here...
];

// ENGLISH QUESTIONS
const englishQuestions = [
  { question: "Choose the correct spelling.", options: ["Acommodate", "Accommodate", "Acomodate", "Accomodate"], correctAnswer: "Accommodate" },
  { question: "What is the synonym of 'happy'?", options: ["Sad", "Joyful", "Angry", "Tired"], correctAnswer: "Joyful" },
  // Add more english questions here...
];

// ================= DETECT SUBJECT PAGE =================
let quizData = [];
const path = window.location.pathname.toLowerCase();

if (path.includes("math.html")) quizData = mathQuestions;
else if (path.includes("physics.html")) quizData = physicsQuestions;
else if (path.includes("chemistry.html")) quizData = chemistryQuestions;
else if (path.includes("english.html")) quizData = englishQuestions;

// If no specific subject detected, default to physics for testing
if (quizData.length === 0) {
  quizData = physicsQuestions;
}

// ================= QUIZ VARIABLES =================
let currentQuestion = 0;
let score = 0;
let selectedAnswers = Array(quizData.length).fill(null);
let timer;
let timeLeft = 120; // 2 minutes in seconds

// ================= FORMAT TIME =================
function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

// ================= UPDATE QUESTION NUMBER =================
function updateQuestionNumber() {
  document.getElementById("question-number").innerText = `Question ${currentQuestion + 1}`;
}

// ================= SHOW QUESTION =================
function showQuestion() {
  const q = quizData[currentQuestion];
  document.getElementById("question").innerText = q.question;
  
  // Update question number
  updateQuestionNumber();

  const optionsDiv = document.getElementById("options");
  optionsDiv.innerHTML = "";

  q.options.forEach(option => {
    const btn = document.createElement("button");
    btn.innerText = option;
    btn.onclick = () => {
      selectedAnswers[currentQuestion] = option;
      highlightSelection(option);
    };
    if (selectedAnswers[currentQuestion] === option) {
      btn.style.backgroundColor = "#4CAF50";
      btn.style.color = "white";
    }
    optionsDiv.appendChild(btn);
  });

  // Update navigation buttons
  document.getElementById("back-btn").style.display = currentQuestion > 0 ? "inline-block" : "none";
  document.getElementById("next-btn").style.display = currentQuestion < quizData.length - 1 ? "inline-block" : "none";
  document.getElementById("submit-btn").style.display = currentQuestion === quizData.length - 1 ? "inline-block" : "none";
}

// ================= HIGHLIGHT SELECTION =================
function highlightSelection(selected) {
  document.querySelectorAll("#options button").forEach(btn => {
    if (btn.innerText === selected) {
      btn.style.backgroundColor = "#4CAF50";
      btn.style.color = "white";
    } else {
      btn.style.backgroundColor = "";
      btn.style.color = "";
    }
  });
}

// ================= NAVIGATION =================
function nextQuestion() {
  if (currentQuestion < quizData.length - 1) {
    currentQuestion++;
    showQuestion();
  }
}

function prevQuestion() {
  if (currentQuestion > 0) {
    currentQuestion--;
    showQuestion();
  }
}

// ================= SUBMIT QUIZ =================
function submitQuiz() {
  clearInterval(timer);
  score = 0;
  quizData.forEach((q, i) => {
    if (selectedAnswers[i] === q.correctAnswer) {
      score++;
    }
  });
  
  const percentage = Math.round((score / quizData.length) * 100);
  const grade = percentage >= 70 ? "Pass" : "Fail";
  
  document.getElementById("quiz-container").innerHTML = `
    <div style="text-align: center; padding: 20px;">
      <h2>Quiz Completed!</h2>
      <p style="font-size: 24px; margin: 20px 0;">Your Score: ${score}/${quizData.length}</p>
      <p style="font-size: 20px; margin: 20px 0;">Percentage: ${percentage}%</p>
      <p style="font-size: 18px; margin: 20px 0; color: ${grade === 'Pass' ? 'green' : 'red'};">Grade: ${grade}</p>
      <button onclick="location.reload()" style="padding: 10px 20px; font-size: 16px; margin-top: 20px;">Restart Quiz</button>
    </div>
  `;
}

// ================= TIMER =================
function startTimer() {
  document.getElementById("timer").innerText = `Time left: ${formatTime(timeLeft)}`;
  
  timer = setInterval(() => {
    timeLeft--;
    document.getElementById("timer").innerText = `Time left: ${formatTime(timeLeft)}`;
    
    // Change color when time is running low
    if (timeLeft <= 30) {
      document.getElementById("timer").style.color = "red";
    }
    
    if (timeLeft <= 0) {
      submitQuiz();
    }
  }, 1000);
}

// ================= START QUIZ =================
function startQuiz() {
  // Check if quiz data is loaded
  if (quizData.length === 0) {
    document.getElementById("quiz-container").innerHTML = `
      <div style="text-align: center; padding: 20px;">
        <h2>Error</h2>
        <p>No quiz questions found. Please check the page URL.</p>
        <button onclick="location.reload()">Reload Page</button>
      </div>
    `;
    return;
  }
  
  showQuestion();
  document.getElementById("next-btn").onclick = nextQuestion;
  document.getElementById("back-btn").onclick = prevQuestion;
  document.getElementById("submit-btn").onclick = submitQuiz;
  startTimer();
}10012"
  },
  {
    question: "Convert 25 to base 2.",
    options: ["10011", "10110","11001", "11101"],
    correctAnswer: "11001"
  },

  // Chapter 2: Fractions, Decimals, and Percentages
  {
    question: "What is 0.375 as a fraction?",
    options: ["3/8", "5/8", "1/4", "2/5"],
    correctAnswer: "3/8"
  },
  {
    question: "Convert 45% to a decimal.",
    options: [ "0.54","0.45", "4.5", "0.045"],
    correctAnswer: "0.45"
  },
  {
    question: "Which is greater: 2/5 or 0.4?",
    options: ["Equal", "2/5", "0.4", "None"],
    correctAnswer: "Equal"
  },
  {
    question: "Simplify 0.6 as a fraction.",
    options: ["3/5", "2/3", "5/6", "1/2"],
    correctAnswer: "3/5"
  },

  // Chapter 3: LCM and HCF
  {
    question: "Find the HCF of 18 and 24.",
    options: [ "12", "3","6", "8"],
    correctAnswer: "6"
  },
  {
    question: "What is the LCM of 4, 5, and 10?",
    options: ["40", "10","20", "60"],
    correctAnswer: "20"
  },
  {
    question: "Which of these is NOT a multiple of 9?",
    options: ["72", "81", "55", "45"],
    correctAnswer: "55"
  },
  {
    question: "The LCM of 6 and 8 is ______.",
    options: ["24", "48", "12", "16"],
    correctAnswer: "24"
  },
  // Chapter 4: Approximation and Estimation
{
  question: "What is 345.67 rounded to the nearest whole number?",
  options: [ "345", "344","346","350"],
  correctAnswer: "346"
},
{
  question: "Round 8.946 to 2 decimal places.",
  options: [ "8.94", "8.96", "8.93","8.95"],
  correctAnswer: "8.95"
},
{
  question: "Estimate the product of 41 × 59.",
  options: ["2500", "2600", "2700","2400"],
  correctAnswer: "2400"
},
{
  question: "Which number is closest to 0.49?",
  options: ["0.5", "0.4", "0.45", "0.6"],
  correctAnswer: "0.5"
},

// Chapter 5: BODMAS
{
  question: "Evaluate: 3 + 4 × 2",
  options: [ "14","11","10", "8"],
  correctAnswer: "11"
},
{
  question: "What is (6 + 2) × 3?",
  options: ["24", "27", "30", "20"],
  correctAnswer: "24"
},
{
  question: "Evaluate: 12 ÷ (3 + 1)",
  options: [ "2", "4","3", "5"],
  correctAnswer: "3"
},
{
  question: "Solve: 5 + 2 × (6 − 1)",
  options: [ "10", "17","15","12"],
  correctAnswer: "15"
},

// Chapter 6: Directed Numbers
{
  question: "What is −5 + 3?",
  options: [ "2","−2", "−8", "8"],
  correctAnswer: "−2"
},
{
  question: "Evaluate: −7 − (−4)",
  options: ["−3", "−11", "3", "−1"],
  correctAnswer: "−3"
},
{
  question: "Simplify: −8 + (−6)",
  options: ["−14", "−2", "2", "14"],
  correctAnswer: "−14"
},
{
  question: "What is the result of 5 − 9?",
  options: [ "4","−4", "−14", "14"],
  correctAnswer: "−4"
},
// Chapter 7: Multiplication and Division of Directed Numbers
{
  question: "What is (−4) × 6?",
  options: ["−24", "24", "−10", "10"],
  correctAnswer: "−24"
},
{
  question: "Evaluate: (−5) × (−3)",
  options: ["15", "−15", "8", "−8"],
  correctAnswer: "15"
},
{
  question: "Divide: (−12) ÷ 4",
  options: ["3", "−6", "6","−3",],
  correctAnswer: "−3"
},
{
  question: "What is (−20) ÷ (−5)?",
  options: ["4", "−4", "5", "−5"],
  correctAnswer: "4"
},

// Chapter 8: Factors and Multiples
{
  question: "Which number is a factor of 36?",
  options: ["7", "9","6","13"],
  correctAnswer: "6"
},
{
  question: "Which number is a multiple of 7?",
  options: [ "34", "36", "37","35",],
  correctAnswer: "35"
},
{
  question: "What is the smallest prime number?",
  options: ["2", "3", "1", "5"],
  correctAnswer: "2"
},
{
  question: "Which of the following is not a prime number?",
  options: ["9", "11", "13", "17"],
  correctAnswer: "9"
},

// Chapter 9: Prime Numbers
{
  question: "Which number is a prime number?",
  options: ["19", "21", "27", "15"],
  correctAnswer: "19"
},
{
  question: "How many prime numbers are between 1 and 10?",
  options: [ "5","4", "3", "6"],
  correctAnswer: "4"
},
{
  question: "What is the 6th prime number?",
  options: ["13", "11", "17", "19"],
  correctAnswer: "13"
},
{
  question: "Which of these is NOT a prime number?",
  options: ["1", "2", "3", "5"],
  correctAnswer: "1"
},
// Chapter 10: Simple Equations
{
  question: "Solve: x + 5 = 12",
  options: ["7", "17", "5", "6"],
  correctAnswer: "7"
},
{
  question: "Solve: 3x = 15",
  options: ["5", "3", "45", "15"],
  correctAnswer: "5"
},
{
  question: "Find x: 2x − 4 = 10",
  options: ["6","7", "8", "5"],
  correctAnswer: "7"
},
{
  question: "Solve: x/2 = 6",
  options: ["12", "3", "10", "14"],
  correctAnswer: "12"
},

// Chapter 11: Word Problems on Simple Equations
{
  question: "John is 5 years older than Ali. If Ali is x years, what is John's age?",
  options: [ "x − 5", "5x", "x + 5", "x/5"],
  correctAnswer: "x + 5"
},
{
  question: "If 3 pencils cost N15, what is the cost of one pencil?",
  options: ["N3", "N15", "N5", "N45"],
  correctAnswer: "N5"
},
{
  question: "Mary has twice as many books as Bisi. If Bisi has x books, how many does Mary have?",
  options: ["2x", "x + 2", "x/2", "x − 2"],
  correctAnswer: "2x"
},
{
  question: "A number is multiplied by 5 to give 20. What is the number?",
  options: ["4", "5", "10", "15"],
  correctAnswer: "4"
},

// Chapter 12: Indices
{
  question: "Simplify: 2³",
  options: ["8", "6", "9", "4"],
  correctAnswer: "8"
},
{
  question: "What is 5⁰?",
  options: ["1", "5", "0", "undefined"],
  correctAnswer: "1"
},
{
  question: "Evaluate: 3² + 4²",
  options: ["25", "9", "16", "12"],
  correctAnswer: "25"
},
{
  question: "Simplify: 10⁻¹",
  options: ["0.1", "1", "10", "−10"],
  correctAnswer: "0.1"
},
// Chapter 13: Standard Form
{
  question: "Write 4500 in standard form.",
  options: ["4.5 × 10³", "45 × 10²", "0.45 × 10⁴", "4.5 × 10²"],
  correctAnswer: "4.5 × 10³"
},
{
  question: "What is 3.2 × 10⁴ in ordinary number?",
  options: ["32000", "3200", "320", "320000"],
  correctAnswer: "32000"
},
{
  question: "Write 0.0067 in standard form.",
  options: ["6.7 × 10⁻³", "6.7 × 10³", "0.67 × 10⁻²", "67 × 10⁻⁴"],
  correctAnswer: "6.7 × 10⁻³"
},
{
  question: "Convert 7.1 × 10² to a whole number.",
  options: ["710", "71", "701", "700"],
  correctAnswer: "710"
},

// Chapter 14: Ratio
{
  question: "Simplify the ratio 10:15.",
  options: ["2:3", "3:2", "5:4", "4:5"],
  correctAnswer: "2:3"
},
{
  question: "Divide N60 in the ratio 2:3.",
  options: ["N24 and N36", "N30 and N30", "N20 and N40", "N25 and N35"],
  correctAnswer: "N24 and N36"
},
{
  question: "A recipe uses flour and sugar in the ratio 4:1. How much sugar is needed for 20 cups of flour?",
  options: ["4 cups", "20 cups", "10 cups","5 cups",],
  correctAnswer: "5 cups"
},
{
  question: "Which is equivalent to the ratio 6:9?",
  options: [ "3:2", "1:2", "2:3", "2:5"],
  correctAnswer: "2:3"
},

// Chapter 15: Proportions
{
  question: "If 3 oranges cost N90, what is the cost of 5 oranges?",
  options: ["N150", "N120", "N180", "N100"],
  correctAnswer: "N150"
},
{
  question: "6 workers can complete a job in 4 days. How many days will it take 3 workers?",
  options: ["8", "6", "4", "2"],
  correctAnswer: "8"
},
{
  question: "If 5 pens cost N200, what is the cost of 1 pen?",
  options: ["N20", "N25", "N50","N40",],
  correctAnswer: "N40"
},
{
  question: "10 liters of petrol costs N1500. What is the cost of 4 liters?",
  options: ["N500","N600",  "N400", "N750"],
  correctAnswer: "N600"
},
];

// PHYSICS QUESTIONS
const physicsQuestions = [
  { question: "What is the SI unit of force?", options: ["Newton", "Joule", "Watt", "Pascal"], correctAnswer: "Newton" },
  { question: "Speed is distance divided by?", options: ["Time", "Force", "Mass", "Energy"], correctAnswer: "Time" },
    {
    question: "The SI unit of power is:",
    options: ["Joule", "Watt", "Newton", "Pascal"],
    correctAnswer: "Watt"
  },
  {
    question: "If a car travels 120 km in 2 hours, its average speed is:",
    options: ["40 km/h", "60 km/h", "80 km/h", "100 km/h"],
    correctAnswer: "60 km/h"
  },
  {
    question: "The physical quantity measured in Newton is:",
    options: ["Force", "Pressure", "Energy", "Power"],
    correctAnswer: "Force"
  },
  {
    question: "The dimensional formula of velocity is equivalent to:",
    options: ["LT⁻¹", "L²T⁻²", "ML⁻¹T⁻²", "MT⁻²"],
    correctAnswer: "LT⁻¹"
  },
  {
    question: "Which of these is a derived unit?",
    options: ["Metre", "Second", "Newton", "Kilogram"],
    correctAnswer: "Newton"
  },

// ================= Physics Chapter 2: Motion in One Dimension =================
  {
    question: "A car accelerates from rest at 4 m/s² for 5 seconds. Its final velocity is:",
    options: ["10 m/s", "15 m/s", "20 m/s", "25 m/s"],
    correctAnswer: "20 m/s"
  },
  {
    question: "A body moves with a velocity of 10 m/s for 6 s. The distance covered is:",
    options: ["40 m", "50 m", "60 m", "70 m"],
    correctAnswer: "60 m"
  },
  {
    question: "If a train slows down uniformly from 30 m/s to rest in 15 s, its deceleration is:",
    options: ["−2 m/s²", "−1.5 m/s²", "−3 m/s²", "−4 m/s²"],
    correctAnswer: "−2 m/s²"
  },
  {
    question: "A ball dropped from rest falls for 3 seconds. The distance fallen is:",
    options: ["29.4 m", "30 m", "44.1 m", "45 m"],
    correctAnswer: "44.1 m"
  },
  {
    question: "A car travels 100 m in 4 s. Its average speed is:",
    options: ["20 m/s", "25 m/s", "30 m/s", "35 m/s"],
    correctAnswer: "25 m/s"
  },

// ================= Physics Chapter 3: Motion in Two Dimensions =================
  {
    question: "A projectile is fired with a horizontal velocity of 20 m/s from a height of 45 m. Time of flight is:",
    options: ["2 s", "3 s", "4 s", "5 s"],
    correctAnswer: "3 s"
  },
  {
    question: "If a projectile has a maximum height of 20 m, its initial vertical velocity is:",
    options: ["10 m/s", "14 m/s", "20 m/s", "28 m/s"],
    correctAnswer: "20 m/s"
  },
  {
    question: "A ball is thrown horizontally from a cliff and lands 40 m away after 2 s. The horizontal velocity is:",
    options: ["10 m/s", "15 m/s", "20 m/s", "25 m/s"],
    correctAnswer: "20 m/s"
  },
  {
    question: "The horizontal range of a projectile is maximum when the angle of projection is:",
    options: ["30°", "45°", "60°", "90°"],
    correctAnswer: "45°"
  },
  {
    question: "A projectile lands 50 m away after 5 s. The horizontal velocity is:",
    options: ["5 m/s", "8 m/s", "10 m/s", "15 m/s"],
    correctAnswer: "10 m/s"
  },

  {
    question: "A 12 kg box is given a net acceleration of 2 m/s². What is the net force on the box?",
    options: ["12 N", "24 N", "36 N", "6 N"],
    correctAnswer: "24 N"
  },
  {
    question: "Two forces of 5 N and 12 N act on a body in opposite directions. What is the resultant?",
    options: ["7 N", "17 N", "60 N", "−7 N"],
    correctAnswer: "7 N"
  },
  {
    question: "A mass of 2 kg is at rest on Earth (g = 10 m/s²). What is its weight?",
    options: ["2 N", "10 N", "20 N", "200 N"],
    correctAnswer: "20 N"
  },
  {
    question: "A 5 kg block is pulled with 30 N while friction opposes motion with 10 N. What is the acceleration of the block?",
    options: ["2 m/s²", "4 m/s²", "6 m/s²", "8 m/s²"],
    correctAnswer: "4 m/s²"
  },
  {
    question: "A 3 kg mass on a frictionless surface is connected to a 1 kg hanging mass. What is the acceleration of the system (g = 10 m/s²)?",
    options: ["2.5 m/s²", "3 m/s²", "1.5 m/s²", "5 m/s²"],
    correctAnswer: "2.5 m/s²"
  },

  // Chapter 5: Work, Energy & Power (5)
  {
    question: "A 2 kg object is lifted vertically 5 m in 4 s. What is the average power output? (g = 10 m/s²)",
    options: ["10 W", "25 W", "50 W", "100 W"],
    correctAnswer: "25 W"
  },
  {
    question: "The kinetic energy of a 3 kg object moving at 10 m/s is:",
    options: ["15 J", "150 J", "300 J", "75 J"],
    correctAnswer: "150 J"
  },
  {
    question: "A car of mass 1000 kg speeds up from 10 m/s to 20 m/s. The increase in kinetic energy is:",
    options: ["50,000 J", "100,000 J", "150,000 J", "200,000 J"],
    correctAnswer: "150,000 J"
  },
  {
    question: "A machine does 6000 J of work in 2 minutes. Its power output is:",
    options: ["30 W", "50 W", "100 W", "300 W"],
    correctAnswer: "50 W"
  },
  {
    question: "A force of 50 N pulls an object 20 m along the direction of the force. Work done by the force is:",
    options: ["500 J", "1000 J", "1500 J", "2000 J"],
    correctAnswer: "1000 J"
  },

  // Chapter 6: Circular Motion & Gravitation (5)
  {
    question: "A vehicle moving in a circle of radius 25 m at 10 m/s has what centripetal acceleration?",
    options: ["2 m/s²", "4 m/s²", "8 m/s²", "10 m/s²"],
    correctAnswer: "4 m/s²"
  },
  {
    question: "An object completes 2 revolutions every second. Its period is:",
    options: ["0.25 s", "0.5 s", "1 s", "2 s"],
    correctAnswer: "0.5 s"
  },
  {
    question: "A 0.5 kg mass moves in a circle of radius 2 m with speed 4 m/s. What is the centripetal force?",
    options: ["1 N", "2 N", "3 N", "4 N"],
    correctAnswer: "2 N"
  },
  {
    question: "A ball travels horizontally off a cliff and lands 40 m from the base after 2 s. What was its horizontal speed?",
    options: ["10 m/s", "15 m/s", "20 m/s", "5 m/s"],
    correctAnswer: "20 m/s"
  },
  {
    question: "The horizontal range of a projectile is maximum at which launch angle?",
    options: ["30°", "40°", "45°", "60°"],
    correctAnswer: "45°"
  },
  {
    question: "A 0.5 kg ball slows from 12 m/s to 4 m/s. What is the magnitude of the impulse on the ball?",
    options: ["4 Ns", "8 Ns", "2 Ns", "6 Ns"],
    correctAnswer: "4 Ns"
  },
  {
    question: "Two objects stick together after collision. A 2 kg object moving at 5 m/s collides with a 3 kg object at rest. What is their common speed after collision?",
    options: ["2 m/s", "5 m/s", "3 m/s", "1 m/s"],
    correctAnswer: "2 m/s"
  },
  {
    question: "A force of 10 N acts on a 2 kg mass for 0.5 s. What is the change in momentum?",
    options: ["5 Ns", "10 Ns", "2.5 Ns", "0.5 Ns"],
    correctAnswer: "5 Ns"
  },
  {
    question: "A car of mass 1000 kg increases its speed from 10 m/s to 20 m/s. What is the change in momentum?",
    options: ["10000 kg·m/s", "5000 kg·m/s", "20000 kg·m/s", "1000 kg·m/s"],
    correctAnswer: "10000 kg·m/s"
  },
  {
    question: "A bullet of mass 0.05 kg travels at 400 m/s. What is its momentum?",
    options: ["20 kg·m/s", "200 kg·m/s", "0.2 kg·m/s", "80 kg·m/s"],
    correctAnswer: "20 kg·m/s"
  },

  // Chapter 8: Simple Harmonic Motion (5)
  {
    question: "An oscillator completes 5 cycles in 10 seconds. What is its period?",
    options: ["2 s", "0.2 s", "0.5 s", "5 s"],
    correctAnswer: "2 s"
  },
  {
    question: "A pendulum has period 0.5 s. What is its frequency?",
    options: ["2 Hz", "0.5 Hz", "1 Hz", "4 Hz"],
    correctAnswer: "2 Hz"
  },
  {
    question: "If the frequency of an oscillator doubles, what happens to the period?",
    options: ["It halves", "It doubles", "It stays the same", "It quadruples"],
    correctAnswer: "It halves"
  },
  {
    question: "How many oscillations does a 5 Hz oscillator make in 2 minutes?",
    options: ["600", "120", "240", "300"],
    correctAnswer: "600"
  },
  {
    question: "If one oscillation takes 0.2 s, how long do 50 oscillations take?",
    options: ["10 s", "5 s", "0.4 s", "20 s"],
    correctAnswer: "10 s"
  },

  // Chapter 9: Waves & Sound (5)
  {
    question: "A wave has frequency 250 Hz and wavelength 0.6 m. What is its speed?",
    options: ["150 m/s", "100 m/s", "250 m/s", "75 m/s"],
    correctAnswer: "150 m/s"
  },
  {
    question: "Sound waves travel at 340 m/s. A sound of frequency 170 Hz has wavelength:",
    options: ["2 m", "0.5 m", "1 m", "4 m"],
    correctAnswer: "2 m"
  },
  {
    question: "Two tuning forks of frequency 256 Hz and 260 Hz produce beats. What is the beat frequency?",
    options: ["4 Hz", "256 Hz", "260 Hz", "2 Hz"],
    correctAnswer: "4 Hz"
  },
  {
    question: "If the wavelength of a wave doubles while speed stays constant, the frequency becomes:",
    options: ["Half", "Double", "Same", "Quadruple"],
    correctAnswer: "Half"
  },
  {
    question: "How long does it take sound to travel 1.00 km at 340 m/s (to 2 decimal places)?",
    options: ["2.94 s", "2.50 s", "3.00 s", "2.90 s"],
    correctAnswer: "2.94 s"
  },

  // Chapter 10: Heat & Thermodynamics (5)
  {
    question: "How much energy is required to raise 2.0 kg of water by 20°C? (use 4200 J/kg·K)",
    options: ["168000 J", "84000 J", "42000 J", "336000 J"],
    correctAnswer: "168000 J"
  },
  {
    question: "What is 27°C in Kelvin?",
    options: ["300 K", "273 K", "290 K", "250 K"],
    correctAnswer: "300 K"
  },
  {
    question: "The latent heat of vaporization of water is approximately 2.26×10^6 J/kg. How much energy to vaporize 1 kg of water (answer in J)?",
    options: ["2260000 J", "2260 J", "226000 J", "22600000 J"],
    correctAnswer: "2260000 J"
  },
  {
    question: "Which mode of heat transfer does not require a material medium?",
    options: ["Radiation", "Conduction", "Convection", "All require a medium"],
    correctAnswer: "Radiation"
  },
  {
    question: "At what Celsius temperature does water freeze?",
    options: ["0°C", "100°C", "32°C", "-10°C"],
    correctAnswer: "0°C"
  },

  // Chapter 11: Electricity & Circuits (5)
  {
    question: "A resistor of 5 Ω carries 2 A. What is the potential difference across it?",
    options: ["10 V", "5 V", "7.5 V", "12 V"],
    correctAnswer: "10 V"
  },
  {
    question: "A device draws 2 A from a 12 V supply. What is its power?",
    options: ["24 W", "12 W", "6 W", "48 W"],
    correctAnswer: "24 W"
  },
  {
    question: "Two resistors 4 Ω and 6 Ω are connected in series across 10 V. What is the current in the circuit?",
    options: ["1 A", "2 A", "0.5 A", "10 A"],
    correctAnswer: "1 A"
  },
  {
    question: "Two 6 Ω resistors are connected in parallel across a 12 V source. What is the total current from the source?",
    options: ["4 A", "2 A", "6 A", "8 A"],
    correctAnswer: "4 A"
  },
  {
    question: "What charge passes through a wire when 2 A flows for 10 s?",
    options: ["20 C", "10 C", "5 C", "200 C"],
    correctAnswer: "20 C"
  },

  // Chapter 12: Magnetism & Electromagnetism (5)
  {
    question: "A magnetic compass needle points towards:",
    options: ["Magnetic north", "True north", "South", "Equator"],
    correctAnswer: "Magnetic north"
  },
  {
    question: "Which rule is used to find direction of force on a current-carrying conductor in a magnetic field (motor effect)?",
    options: ["Fleming's left-hand rule", "Fleming's right-hand rule", "Lenz's law", "Ohm's law"],
    correctAnswer: "Fleming's left-hand rule"
  },
  {
    question: "Inside a long current-carrying solenoid the magnetic field is approximately:",
    options: ["Uniform and strong", "Zero", "Varying randomly", "Always weak"],
    correctAnswer: "Uniform and strong"
  },
  {
    question: "What is the SI unit of magnetic flux density?",
    options: ["Tesla", "Weber", "Ampere", "Volt"],
    correctAnswer: "Tesla"
  },
  {
    question: "Which law explains the direction of induced emf that opposes the change producing it?",
    options: ["Lenz's law", "Ohm's law", "Newton's law", "Hooke's law"],
    correctAnswer: "
