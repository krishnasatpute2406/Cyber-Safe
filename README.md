# CyberSafe – Online Scam Awareness Website

**A TY BSc Computer Science Project**  
*Demonstrated for Academic Evaluation & Community Cybersecurity Awareness*

---

## 1. Project Overview & Abstract

In recent years, the exponential growth of digital financial systems (such as Unified Payments Interface - UPI, instant internet banking, and mobile wallets) has transformed consumer commerce. However, this has been accompanied by a massive surge in cybercrime, online financial fraud, and sophisticated social engineering schemes. 

Most digital fraud today does not exploit software vulnerabilities or cryptographic flaws; rather, it exploits the **"human element"**—manipulating trust, panic, urgency, and lack of technical awareness.

**CyberSafe** is an educational, interactive website engineered specifically to build widespread scam literacy. It unpacks the technical lifecycle and psychological triggers of modern online scams, provides actionable defense rules, demystifies Indian cybersecurity laws and helplines (such as national helpline **1930** and **cybercrime.gov.in**), and tests user readiness via a scenario-based interactive quiz.

---

## 2. Project Objectives

- **Educational Impact**: Explain complex cyber fraud concepts in simple, accessible language with technical precision suitable for Computer Science evaluation.
- **Deconstruct Attack Lifecycles**: Map the step-by-step chronology (Lure $\to$ Social Engineering $\to$ Exploitation $\to$ Siphoning) of five major online fraud vectors.
- **Actionable Consumer Defense**: Provide clear, memorable rules (e.g. *"UPI PIN is strictly required for debiting money, never for receiving money"*).
- **Government Framework Integration**: Educate citizens about the **Golden Hour** concept, India's **1930** Citizen Financial Cyber Fraud Reporting System, and the **Chakshu** telecom fraud reporting portal.
- **Zero-Dependency Architecture**: Built purely with standard client-side technologies without heavy frameworks or external network dependencies, ensuring local, offline execution.

---

## 3. Technology Stack

As per project guidelines and academic criteria:

| Technology | Purpose |
| :--- | :--- |
| **HTML5** | Semantic markup, accessibility attributes (`aria-*`), responsive viewports, and multi-page routing. |
| **CSS3** | Modern styling, CSS custom properties (variables), Flexbox, CSS Grid layouts, media queries for mobile/desktop responsiveness, and custom cybersecurity dark navy palette with cyan accents. |
| **Vanilla JavaScript (ES6+)** | Dynamic DOM manipulation, interactive scam inspector simulator, category filtering, copy-to-clipboard API, and modular interactive quiz engine with scoring and review. |

> **Note on Architecture:** No React, Node.js, Next.js, backend frameworks, external databases, or paid APIs are used. The application runs locally simply by opening `index.html` in any web browser.

---

## 4. Project Directory Structure

```text
CyberSafe/
├── index.html           # Home page: Welcome, safety pillars, threat vectors directory, helpline
├── scams.html           # Scam Awareness: 5 clickable scam category cards & comparison matrix
├── scam-details.html    # In-depth breakdown: What is it, how it works, examples, red flags, stay safe
├── safety.html          # Safety Tips: Password/OTP hygiene, UPI rules, browsing, 1930 reporting guide
├── quiz.html            # Interactive Quiz: 8 scenario questions, instant feedback, scoring, review
├── css/
│   └── style.css        # Unified dark navy & electric cyan responsive stylesheet
├── js/
│   ├── script.js        # Navigation, mobile menu, copy-to-clipboard, category filter
│   └── quiz.js          # Scenario quiz question bank, scoring engine, review answers
├── images/
│   └── logo.png         # CyberSafe shield-and-digital-network emblem
└── README.md            # Comprehensive project documentation for examiner
```

---

## 5. Website Pages & Modules

### 1. Home (`index.html`)
- **Introduction**: Beginner-friendly introduction explaining why digital safety matters today.
- **Why Online Safety Matters**: 3 core pillars (Protect Your Money, Protect Your Identity, Browse with Confidence).
- **Core Scams Directory**: 5 clickable preview cards linking directly to detailed threat guides.
- **Emergency Helpline Spotlight**: Quick access to India's national cybercrime helpline **1930** and **cybercrime.gov.in**.

### 2. Scam Awareness (`scams.html`)
- **Category Filter**: Easy filter tabs (*All Scams*, *Banking & Money*, *Passwords & Codes*, *Jobs & Tasks*, *Shopping*).
- **5 Featured Clickable Scam Cards**:
  1. *Phishing Scams* (Fake Links & Websites)
  2. *OTP Fraud* (Secret Code Theft & Screen Sharing)
  3. *UPI Scams* (Payment & QR Code Traps)
  4. *Fake Job Scams* (Work From Home Traps)
  5. *Online Shopping Scams* (Fake Online Stores & Advance Payment Traps)

### 3. Scam Details (`scam-details.html`)
- **Sticky Quick Jump Bar**: Smoothly jump to any of the five scam sections.
- **Structured 4-Part Analysis for Every Scam**:
  1. *What is it?* (Plain-English explanation)
  2. *How does it happen?* (Step-by-step simple explanation)
  3. *Warning signs* (Easy-to-spot red flags)
  4. *How to stay safe* (Practical safety habits)

### 4. Safety Tips (`safety.html`)
- **Practical Guidelines**: Short, clear advice on passwords, OTPs, UPI payments, safe browsing, and device privacy.
- **The CyberSafe Do's & Don'ts Checklist**: Quick mental checklist for daily internet use.
- **Emergency Reporting Guide**:
  - Detailed overview of national helpline **1930**.
  - Simple 3-step action plan if scammed (Call Bank $\to$ Dial 1930 $\to$ File on `cybercrime.gov.in`).

### 5. Interactive Quiz (`quiz.html`)
- **8 Scenario-Based Questions**: Tests real-life situations in simple, clear English.
- **Instant Feedback**: Displays immediately whether the choice was safe or risky, with a simple explanation.
- **Score & Review**: Calculates the final score and lets the user review each question and restart anytime.

---

## 6. How to Run Locally

### Method 1: Direct File Opening (No Web Server Required)
1. Download or extract the `CyberSafe/` folder to your computer.
2. Double-click `index.html` to open it in Google Chrome, Mozilla Firefox, Microsoft Edge, or Safari.
3. All internal links (`scams.html`, `scam-details.html`, `safety.html`, `quiz.html`), stylesheets, and scripts work seamlessly offline.

### Method 2: Using Any Local Development Server
If you prefer running a local HTTP server:
```bash
# Python 3
python -m http.server 8000

# Node / npx (optional)
npx serve .
```
Then navigate to `http://localhost:8000` in your browser.

---

## 7. Key Cybersecurity Concepts for Examiner Discussion

1. **Social Engineering vs. System Vulnerabilities**: How attackers exploit psychological cognitive biases (authority, scarcity, urgency, fear) rather than breaking cryptographic algorithms.
2. **The Mechanism of UPI (Unified Payments Interface)**:
   - Difference between **Credit Push** (`Pay`) and **Debit Pull** (`Collect Request`).
   - Why entering a UPI PIN is cryptographically designed ONLY to debit money from the user's account.
3. **Phishing & Typosquatting**:
   - Visual spoofing techniques, homograph attacks, and deceptive subdomain structures (e.g. `sbi.bank-login-secure.xyz`).
   - Free Let's Encrypt SSL certificates misused by phishers to display the HTTPS padlock.
4. **Remote Access Trojan (RAT) Misuse**:
   - How legitimate remote diagnostic software (AnyDesk, TeamViewer) is weaponized to bypass 2FA by capturing live phone screen feeds.
5. **The Golden Hour in Cybercrime Mitigation**:
   - How dialing **1930** triggers the Citizen Financial Cyber Fraud Reporting System to freeze funds at intermediary payment gateways and mule accounts before physical ATM cash-out.
6. **Relevant Legal Provisions in India**:
   - **IT Act, 2000 Section 66D**: Punishment for cheating by personation by using computer resources (imprisonment up to 3 years and fine up to ₹1 Lakh).
   - **IT Act, 2000 Section 43 & 66**: Unauthorized access and identity theft.

---

## 8. Conclusion

The **CyberSafe** project bridges the gap between technical computer science principles and real-world digital safety. By presenting attack architectures clearly alongside interactive demonstrations and structured legal remedies, it serves as an effective demonstration for academic evaluation and an impactful public awareness utility.
