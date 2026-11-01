/**
 * CyberSafe – Online Scam Awareness
 * Interactive Quiz Engine (Vanilla JavaScript)
 * Author: TY BSc Computer Science Student Project
 */

const QUIZ_QUESTIONS = [
  {
    id: 1,
    category: "UPI & Online Payments",
    scenario: "A buyer sends a QR code and asks you to enter your UPI PIN to receive money. What should you do?",
    options: [
      { letter: "A", text: "Scan the QR code and enter your UPI PIN right away." },
      { letter: "B", text: "Refuse. You NEVER need to enter a UPI PIN to receive money." },
      { letter: "C", text: "Enter a wrong UPI PIN first to test it safely." },
      { letter: "D", text: "Ask them to send the QR code on Telegram instead." }
    ],
    correctAnswer: "B",
    explanation: "Correct! The Golden Rule of UPI is: Entering your UPI PIN is ONLY needed when YOU are sending money. Receiving money requires zero PIN entry and zero QR scanning."
  },
  {
    id: 2,
    category: "Secret OTP Codes",
    scenario: "A caller claims to be from your bank and asks for your 6-digit OTP to block a fraud payment. What should you do?",
    options: [
      { letter: "A", text: "Quickly give them the OTP code so they can stop the payment." },
      { letter: "B", text: "Ask them for their employee name before giving the OTP." },
      { letter: "C", text: "Hang up immediately and never share the OTP. Real banks never ask for OTPs." },
      { letter: "D", text: "Forward the entire SMS to the caller on WhatsApp." }
    ],
    correctAnswer: "C",
    explanation: "Correct! Real banks, police officers, and customer care agents will NEVER ask for your OTP. Scammers create panic to trick you into revealing the code."
  },
  {
    id: 3,
    category: "Fake Links (Phishing)",
    scenario: "An SMS threatens to block your bank account unless you tap a link to update your KYC. How can you tell if the link is safe?",
    options: [
      { letter: "A", text: "It starts with https://, so it must be 100% safe." },
      { letter: "B", text: "Check the domain name; fake links use strange names with extra hyphens instead of the bank's real website." },
      { letter: "C", text: "If the page displays the official bank logo, it is safe to enter your password." },
      { letter: "D", text: "Open the website in an incognito window to be safe." }
    ],
    correctAnswer: "B",
    explanation: "Correct! Always check the website domain name. Anyone can clone official logos and use https://. Legitimate banks only use their official website domain."
  },
  {
    id: 4,
    category: "Fake Job Traps",
    scenario: "An online job pays you ₹200 for simple video likes, then asks for a ₹5,000 deposit to unlock bigger earnings. What is this?",
    options: [
      { letter: "A", text: "A standard refundable company deposit." },
      { letter: "B", text: "A Fake Job & Task Scam. You will lose any money you deposit." },
      { letter: "C", text: "A government-approved online gig job." },
      { letter: "D", text: "A genuine cryptocurrency bonus scheme." }
    ],
    correctAnswer: "B",
    explanation: "Correct! This is a classic Fake Job Scam. They send a tiny initial payment to win trust, then demand deposits that you can never withdraw."
  },
  {
    id: 5,
    category: "Emergency Helpline",
    scenario: "If money is stolen in an online scam, what official government helpline number should you call immediately in India?",
    options: [
      { letter: "A", text: "100" },
      { letter: "B", text: "1930" },
      { letter: "C", text: "112" },
      { letter: "D", text: "1800-00-1111" }
    ],
    correctAnswer: "B",
    explanation: "Correct! Helpline 1930 is India's national cyber financial fraud helpline. Calling within the first 1 to 2 hours allows banks and police to freeze the stolen funds."
  },
  {
    id: 6,
    category: "Online Shopping Traps",
    scenario: "An ad offers a brand-new ₹25,000 smartphone for only ₹1,499 with an urgent timer and online payment only. What should you do?",
    options: [
      { letter: "A", text: "Buy it immediately before the countdown timer runs out." },
      { letter: "B", text: "Avoid it. It is a fake website that will steal your money." },
      { letter: "C", text: "Pay using a credit card because credit cards are always safe." },
      { letter: "D", text: "Order multiple phones to get a bigger discount." }
    ],
    correctAnswer: "B",
    explanation: "Correct! If a deal sounds too good to be true, it is always a scam. Fake shopping websites take advance payments and deliver nothing."
  },
  {
    id: 7,
    category: "Screen Sharing Apps",
    scenario: "A customer care caller asks you to install AnyDesk or TeamViewer on your phone and share the code. What will happen?",
    options: [
      { letter: "A", text: "The caller can see your screen, read your secret OTPs, and steal money from your accounts." },
      { letter: "B", text: "The agent will fix your account issues much faster." },
      { letter: "C", text: "It is safe because the app is from Google Play Store." },
      { letter: "D", text: "It only shares your camera, not your mobile screen." }
    ],
    correctAnswer: "A",
    explanation: "Correct! Remote screen-sharing apps let strangers see your phone screen in real time, allowing them to read OTPs and access your banking apps."
  },
  {
    id: 8,
    category: "Password Protection",
    scenario: "Which is the safest way to protect your online accounts and passwords?",
    options: [
      { letter: "A", text: "Use your pet's name and '123' for all your passwords." },
      { letter: "B", text: "Write all passwords on an open note on your phone." },
      { letter: "C", text: "Use unique, strong passwords for each account and turn on 2-step verification." },
      { letter: "D", text: "Share your password with close friends and family." }
    ],
    correctAnswer: "C",
    explanation: "Correct! Unique passwords ensure that a leak on one site does not compromise your other accounts. 2-step verification provides a strong second layer of security."
  }
];

let currentQuestionIndex = 0;
let score = 0;
let userAnswers = [];
let hasAnsweredCurrent = false;

document.addEventListener('DOMContentLoaded', () => {
  initQuiz();
});

function initQuiz() {
  const quizContainer = document.getElementById('quiz-app');
  if (!quizContainer) return;

  currentQuestionIndex = 0;
  score = 0;
  userAnswers = [];
  hasAnsweredCurrent = false;

  renderQuestion();
}

function renderQuestion() {
  const q = QUIZ_QUESTIONS[currentQuestionIndex];
  const total = QUIZ_QUESTIONS.length;
  hasAnsweredCurrent = false;

  // Update Progress Fill
  const progressFill = document.getElementById('quiz-progress-fill');
  if (progressFill) {
    const percent = (currentQuestionIndex / total) * 100;
    progressFill.style.width = `${percent}%`;
  }

  // Update Meta Header
  const counterEl = document.getElementById('quiz-counter');
  const categoryEl = document.getElementById('quiz-category');
  if (counterEl) counterEl.textContent = `Question ${currentQuestionIndex + 1} of ${total}`;
  if (categoryEl) categoryEl.textContent = q.category;

  // Question Text
  const questionTextEl = document.getElementById('quiz-question-text');
  if (questionTextEl) questionTextEl.textContent = q.scenario;

  // Options
  const optionsContainer = document.getElementById('quiz-options-container');
  if (optionsContainer) {
    optionsContainer.innerHTML = '';
    q.options.forEach(opt => {
      const btn = document.createElement('button');
      btn.className = 'quiz-option-btn';
      btn.type = 'button';
      btn.setAttribute('data-letter', opt.letter);
      btn.innerHTML = `
        <span class="quiz-opt-letter">${opt.letter}</span>
        <span class="quiz-opt-text">${opt.text}</span>
      `;
      btn.addEventListener('click', () => handleOptionSelect(opt.letter, btn));
      optionsContainer.appendChild(btn);
    });
  }

  // Hide Feedback Box
  const feedbackBox = document.getElementById('quiz-feedback-box');
  if (feedbackBox) {
    feedbackBox.className = 'quiz-feedback-box';
    feedbackBox.innerHTML = '';
  }

  // Next Button state
  const nextBtn = document.getElementById('quiz-next-btn');
  if (nextBtn) {
    nextBtn.style.display = 'none';
    nextBtn.textContent = currentQuestionIndex === total - 1 ? 'See Final Score' : 'Next Question →';
  }
}

function handleOptionSelect(selectedLetter, clickedBtn) {
  if (hasAnsweredCurrent) return;
  hasAnsweredCurrent = true;

  const q = QUIZ_QUESTIONS[currentQuestionIndex];
  const isCorrect = selectedLetter === q.correctAnswer;
  if (isCorrect) {
    score++;
  }

  userAnswers.push({
    question: q.scenario,
    category: q.category,
    selected: selectedLetter,
    correctAnswer: q.correctAnswer,
    options: q.options,
    explanation: q.explanation,
    isCorrect: isCorrect
  });

  // Highlight all buttons
  const allBtns = document.querySelectorAll('.quiz-option-btn');
  allBtns.forEach(btn => {
    btn.disabled = true;
    const letter = btn.getAttribute('data-letter');
    if (letter === q.correctAnswer) {
      btn.classList.add('correct');
    } else if (letter === selectedLetter && !isCorrect) {
      btn.classList.add('incorrect');
    }
  });

  // Display Feedback
  const feedbackBox = document.getElementById('quiz-feedback-box');
  if (feedbackBox) {
    feedbackBox.classList.add('active');
    feedbackBox.classList.add(isCorrect ? 'correct' : 'incorrect');

    feedbackBox.innerHTML = `
      <div class="feedback-title">
        <span>${isCorrect ? '✓ Correct Answer!' : '✗ That is Incorrect!'}</span>
      </div>
      <div class="feedback-text">${q.explanation}</div>
    `;
  }

  // Show Next Button
  const nextBtn = document.getElementById('quiz-next-btn');
  if (nextBtn) {
    nextBtn.style.display = 'inline-flex';
    nextBtn.onclick = () => {
      if (currentQuestionIndex < QUIZ_QUESTIONS.length - 1) {
        currentQuestionIndex++;
        renderQuestion();
      } else {
        showResults();
      }
    };
  }
}

function showResults() {
  const activeQuizCard = document.getElementById('quiz-active-card');
  const resultCard = document.getElementById('quiz-result-card');
  const progressFill = document.getElementById('quiz-progress-fill');

  if (activeQuizCard) activeQuizCard.style.display = 'none';
  if (resultCard) {
    resultCard.classList.add('active');
    resultCard.style.display = 'block';
  }
  if (progressFill) progressFill.style.width = '100%';

  const total = QUIZ_QUESTIONS.length;
  const scoreValEl = document.getElementById('result-score-val');
  const badgeEl = document.getElementById('result-badge');
  const summaryEl = document.getElementById('result-summary');

  if (scoreValEl) scoreValEl.textContent = score;

  let badge = "";
  let message = "";

  if (score === total) {
    badge = "Scam Expert! (8 out of 8)";
    message = "Excellent! You know how to identify fake messages, protect your passwords, and keep your money safe. You are well prepared to spot online scams.";
  } else if (score >= 6) {
    badge = "Great Job! (Strong Awareness)";
    message = "You have good online safety habits and know how to avoid most common scams. Check the questions you missed below to become even safer.";
  } else if (score >= 4) {
    badge = "Fair Score (A Few Mistakes)";
    message = "You know some basic rules, but you could still be tricked by clever fake calls or websites. Review the questions you missed below to stay safe.";
  } else {
    badge = "Needs Practice (Be Careful Online)";
    message = "Take extra care when using the internet. Be sure to read our Scam Details and Safety Tips pages to learn how to protect yourself.";
  }

  if (badgeEl) badgeEl.textContent = badge;
  if (summaryEl) summaryEl.textContent = message;

  // Bind Restart
  const restartBtn = document.getElementById('quiz-restart-btn');
  if (restartBtn) {
    restartBtn.onclick = () => {
      if (resultCard) {
        resultCard.classList.remove('active');
        resultCard.style.display = 'none';
      }
      const reviewBox = document.getElementById('review-answers-box');
      if (reviewBox) reviewBox.style.display = 'none';
      if (activeQuizCard) activeQuizCard.style.display = 'block';
      initQuiz();
    };
  }

  // Bind Review Answers
  const reviewBtn = document.getElementById('quiz-review-btn');
  const reviewBox = document.getElementById('review-answers-box');
  if (reviewBtn && reviewBox) {
    reviewBtn.onclick = () => {
      reviewBox.style.display = reviewBox.style.display === 'block' ? 'none' : 'block';
      renderReviewAnswers();
    };
  }
}

function renderReviewAnswers() {
  const reviewContainer = document.getElementById('review-list');
  if (!reviewContainer) return;

  reviewContainer.innerHTML = '';
  userAnswers.forEach((ans, idx) => {
    const item = document.createElement('div');
    item.className = 'review-item';
    
    const userOpt = ans.options.find(o => o.letter === ans.selected);
    const correctOpt = ans.options.find(o => o.letter === ans.correctAnswer);

    item.innerHTML = `
      <div class="review-item-q">
        <span style="color: ${ans.isCorrect ? '#34d399' : '#f87171'}; font-weight: bold; margin-right: 6px;">
          ${ans.isCorrect ? '✓' : '✗'}
        </span>
        ${idx + 1}. ${ans.question}
      </div>
      <div class="review-item-answer user">
        Your Answer: <strong>[${ans.selected}] ${userOpt ? userOpt.text : 'None'}</strong>
      </div>
      ${!ans.isCorrect ? `
        <div class="review-item-answer correct">
          Correct Answer: <strong>[${ans.correctAnswer}] ${correctOpt ? correctOpt.text : ''}</strong>
        </div>
      ` : ''}
      <div class="review-item-explain">
        <strong>Takeaway:</strong> ${ans.explanation}
      </div>
    `;
    reviewContainer.appendChild(item);
  });
}
