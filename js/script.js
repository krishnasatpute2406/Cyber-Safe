/**
 * CyberSafe – Online Scam Awareness
 * Main Interactive Script (Vanilla JavaScript)
 * Author: TY BSc Computer Science Student Project
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initActiveNavLink();
  initDetailJumpBar();
  initHelplineCopy();
  initScamsFilter();
  initReportingAssistant();
});

/**
 * Mobile Navigation Toggle
 */
function initMobileMenu() {
  const menuBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');

  if (menuBtn && navLinks) {
    menuBtn.addEventListener('click', () => {
      const isExpanded = menuBtn.getAttribute('aria-expanded') === 'true';
      menuBtn.setAttribute('aria-expanded', !isExpanded);
      navLinks.classList.toggle('active');
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!menuBtn.contains(e.target) && !navLinks.contains(e.target)) {
        navLinks.classList.remove('active');
        menuBtn.setAttribute('aria-expanded', 'false');
      }
    });

    // Close menu when clicking any nav link
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        menuBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }
}

/**
 * Highlight Current Active Page in Navigation
 */
function initActiveNavLink() {
  const currentPath = window.location.pathname;
  const currentFile = currentPath.substring(currentPath.lastIndexOf('/') + 1) || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link');

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentFile || (currentFile === '' && href === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}



/**
 * Sticky Jump Navigation on Scam Details Page
 */
function initDetailJumpBar() {
  const jumpLinks = document.querySelectorAll('.jump-link');
  if (!jumpLinks.length) return;

  const sections = document.querySelectorAll('.scam-detail-article');

  window.addEventListener('scroll', () => {
    let currentId = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      if (window.scrollY >= sectionTop) {
        currentId = section.getAttribute('id');
      }
    });

    jumpLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentId}`) {
        link.classList.add('active');
      }
    });
  });
}

/**
 * Copy to Clipboard with Toast Notification for Indian Cyber Helpline & Portals
 */
function initHelplineCopy() {
  const copyButtons = document.querySelectorAll('[data-copy]');
  
  // Create toast element if not present
  let toast = document.querySelector('.toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast';
    document.body.appendChild(toast);
  }

  copyButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const textToCopy = btn.getAttribute('data-copy');
      if (!textToCopy) return;

      navigator.clipboard.writeText(textToCopy).then(() => {
        toast.innerHTML = `<span>✓</span> Copied: <strong>${textToCopy}</strong> to clipboard!`;
        toast.classList.add('show');
        setTimeout(() => {
          toast.classList.remove('show');
        }, 3000);
      }).catch(() => {
        // Fallback for older browsers
        const textarea = document.createElement('textarea');
        textarea.value = textToCopy;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);

        toast.innerHTML = `<span>✓</span> Copied: <strong>${textToCopy}</strong>`;
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 3000);
      });
    });
  });
}

/**
 * Category Filter for Scams Cards Page
 */
function initScamsFilter() {
  const filterBtns = document.querySelectorAll('.scam-filter-btn');
  const scamCards = document.querySelectorAll('.scam-card-item');

  if (!filterBtns.length || !scamCards.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterCategory = btn.getAttribute('data-filter');

      scamCards.forEach(card => {
        const cardCat = card.getAttribute('data-category');
        if (filterCategory === 'all' || cardCat === filterCategory) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/**
 * Indian Cyber Fraud Reporting Assistant
 */
const REPORTING_ASSISTANT_DATA = {
  money_lost: {
    title: "Money Lost via UPI, Bank Transfer or Online Payment",
    badgeText: "Immediate Action Required",
    badgeType: "urgent",
    description: "Financial cyber fraud is strictly time-sensitive. Quick action within the Golden Hour (first 1–2 hours) gives authorities the best chance to freeze stolen funds.",
    steps: [
      {
        title: "Call India's Cyber Fraud Helpline 1930 Immediately",
        desc: "Dial 1930 (toll-free, available 24x7 from anywhere in India). Provide the operator with your name, phone number, bank name, and the transaction reference (UTR) number. They will issue an alert across payment gateways and the recipient's bank to freeze the funds before ATM withdrawal."
      },
      {
        title: "Contact Your Bank or Payment App Right Away",
        desc: "Call your bank's emergency customer care number (printed on the back of your debit/credit card) or raise an emergency ticket in your payment app (Google Pay, PhonePe, Paytm). Request an emergency freeze on your card, netbanking, and outward UPI transfers."
      },
      {
        title: "File an Official Complaint on cybercrime.gov.in",
        desc: "Within 24 hours of calling 1930, visit https://www.cybercrime.gov.in/ and register an official complaint under 'Report Financial Fraud'. Save your acknowledgement number for police follow-up."
      },
      {
        title: "Preserve All Transaction Details & Evidence",
        desc: "Save the bank transaction reference number (UTR), the debit SMS, bank statement showing the unauthorized debit, the scammer's UPI ID or phone number, and all chat records. Use the checklist below to prepare your evidence."
      }
    ]
  },
  fake_kyc: {
    title: "Received a Fake Bank / Electricity / KYC Update Message",
    badgeText: "Phishing Attempt (Do Not Click)",
    badgeType: "caution",
    description: "Scammers broadcast fake threats to panic people into clicking malicious links and entering passwords on clone websites.",
    steps: [
      {
        title: "Do NOT Click the Link or Call the Given Number",
        desc: "If you have not clicked the link or replied to the sender, your bank account and phone are completely safe. Real banks and electricity boards never send suspension threats from personal 10-digit mobile numbers."
      },
      {
        title: "If You Already Clicked the Link and Entered Details",
        desc: "Immediately change your netbanking password, UPI PIN, and email passwords from a safe device. If you entered card numbers or an OTP, call your bank customer care immediately to block the card."
      },
      {
        title: "Save Evidence of the Fake Message",
        desc: "Take a full screenshot of the SMS or WhatsApp message showing the sender's mobile number, timestamp, and the exact website link (URL)."
      },
      {
        title: "Report to Government Chakshu Portal & 1909",
        desc: "Report the fraud communication to the Government of India's Chakshu portal at https://sancharsaathi.gov.in/ to help authorities disconnect the fraudulent SIM, or forward the SMS to 1909 (TRAI Spam Reporting)."
      }
    ]
  },
  shared_otp: {
    title: "Shared OTP or Confidential Banking Details with a Caller",
    badgeText: "High Account Compromise Risk",
    badgeType: "urgent",
    description: "Sharing an OTP or installing screen-sharing apps allows scammers to access your banking portal or approve pending transactions.",
    steps: [
      {
        title: "Call Your Bank Fraud Department Instantly",
        desc: "Immediately call the customer care number printed on the back of your card. Instruct them to freeze your bank account, block netbanking logins, and cancel the compromised debit/credit card."
      },
      {
        title: "Check Your Account for Unauthorized Debits",
        desc: "Log into official mobile banking or check via an ATM to verify whether any money was deducted. If money was debited, dial 1930 immediately."
      },
      {
        title: "Uninstall Remote Screen-Sharing Apps Immediately",
        desc: "If the caller made you install AnyDesk, TeamViewer QuickSupport, or RustDesk, put your phone in Airplane Mode immediately and uninstall those apps from your phone settings."
      },
      {
        title: "Change All Financial Passwords & PINs",
        desc: "Once your device is clean, reset your UPI PIN, ATM PIN, and netbanking password. Report the scammer's phone number at https://www.cybercrime.gov.in/."
      }
    ]
  },
  fake_job_shopping: {
    title: "Fake Job, Telegram Task, or Online Shopping Scam",
    badgeText: "Fraudulent Offer / Trap",
    badgeType: "caution",
    description: "Scammers promise high earnings for simple online tasks or advertise 90% discounts on fake shopping portals to collect advance deposits.",
    steps: [
      {
        title: "Stop Sending Any Further Money Immediately",
        desc: "Scammers will pressure you by claiming your money is frozen or you must pay 'VIP taxes' to withdraw. Never send another rupee; any additional payment will also be stolen."
      },
      {
        title: "If You Already Transferred Money",
        desc: "Dial India's cyber fraud helpline 1930 right away and contact the bank or UPI app used for the transfer. Provide the scammer's receiver UPI ID or bank account details."
      },
      {
        title: "Capture Complete Chat & Payment Evidence",
        desc: "Take full screenshots of Telegram or WhatsApp chats, task website links, product URLs, payment confirmation screens, and the scammer's phone numbers."
      },
      {
        title: "File a Formal Complaint on cybercrime.gov.in",
        desc: "Submit a complaint on https://www.cybercrime.gov.in/ under 'Report Financial Fraud' or 'Other Cyber Crime'. Provide all screenshots and URLs."
      }
    ]
  },
  fake_social_media: {
    title: "Fake Social Media Account Impersonating You or a Friend",
    badgeText: "Identity Impersonation",
    badgeType: "caution",
    description: "Scammers clone social media profiles (using your name and photos) to solicit emergency money from your friends and contacts.",
    steps: [
      {
        title: "Report the Profile Inside the Social Media App",
        desc: "Go to the fake profile on Instagram, Facebook, X, or LinkedIn. Click the options menu (three dots) -> Report -> 'It's pretending to be someone else' -> Select 'Me' or 'A Friend'."
      },
      {
        title: "Warn Your Friends & Family Publicly",
        desc: "Post a story or message on your genuine profile alerting your contacts: 'A fake account using my name is sending messages. Do NOT accept requests or transfer any money.'"
      },
      {
        title: "Save Evidence of Impersonation",
        desc: "Take screenshots of the fake account profile handle, bio, photos used, and any messages or payment QR codes sent to your contacts."
      },
      {
        title: "File a Complaint on cybercrime.gov.in",
        desc: "If the imposter is extorting money, using morphed images, or harassing people, report the profile URL and evidence at https://www.cybercrime.gov.in/ under 'Other Cyber Crime'."
      }
    ]
  },
  suspicious_message: {
    title: "Suspicious SMS, WhatsApp Message, or Unknown Phone Call",
    badgeText: "Suspicious Contact (Safe if Ignored)",
    badgeType: "safe",
    description: "You encountered an unverified phone call, parcel delivery threat, or lottery message, but have not shared any details or money.",
    steps: [
      {
        title: "Do NOT Reply, Click Links, or Call Back",
        desc: "Ignore threats of electricity disconnection, parcel customs seizures, or police arrest. If you do not interact, the scammer cannot harm your account."
      },
      {
        title: "Block and Report the Number on Your Phone",
        desc: "Use your phone's built-in block feature and tap 'Report and Block' in WhatsApp to flag the number as spam."
      },
      {
        title: "Report to Government Chakshu Portal",
        desc: "Help protect other citizens by reporting the suspected fraud number and message on the Department of Telecommunications (DoT) Chakshu portal at https://sancharsaathi.gov.in/."
      },
      {
        title: "Your Accounts Are Safe",
        desc: "Since you did not click any links, install screen apps, or share OTPs/PINs, your accounts and personal data remain secure. Stay alert!"
      }
    ]
  }
};

function initReportingAssistant() {
  const incidentBtns = document.querySelectorAll('.incident-btn');
  const guidanceContainer = document.getElementById('assistant-guidance-content');
  const checklistInputs = document.querySelectorAll('.checklist-checkbox');
  const checklistCounter = document.getElementById('checklist-count');
  const checklistResetBtn = document.getElementById('checklist-reset-btn');

  if (!incidentBtns.length || !guidanceContainer) return;

  function loadIncidentGuidance(key) {
    const data = REPORTING_ASSISTANT_DATA[key];
    if (!data) return;

    incidentBtns.forEach(btn => {
      if (btn.getAttribute('data-incident') === key) {
        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');
      } else {
        btn.classList.remove('active');
        btn.setAttribute('aria-selected', 'false');
      }
    });

    let stepsHtml = '';
    data.steps.forEach((step, idx) => {
      const priorityClass = idx === 0 ? 'guidance-step-card priority-1' : 'guidance-step-card';
      stepsHtml += `
        <div class="${priorityClass}">
          <div class="guidance-step-num">Step ${idx + 1}</div>
          <div class="guidance-step-content">
            <h5>${step.title}</h5>
            <p>${step.desc}</p>
          </div>
        </div>
      `;
    });

    guidanceContainer.innerHTML = `
      <div class="guidance-header">
        <div class="guidance-title-area">
          <h3>${data.title}</h3>
          <p style="font-size: 0.85rem; color: var(--text-secondary); margin-top: 0.25rem;">
            ${data.description}
          </p>
        </div>
        <span class="guidance-badge ${data.badgeType}">${data.badgeText}</span>
      </div>
      <div class="guidance-steps-list">
        ${stepsHtml}
      </div>
    `;
  }

  incidentBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const incidentKey = btn.getAttribute('data-incident');
      loadIncidentGuidance(incidentKey);

      if (window.innerWidth < 768) {
        const box = document.getElementById('assistant-guidance-box');
        if (box) {
          box.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });

  // Checklist handler
  function updateChecklistCount() {
    let checkedCount = 0;
    checklistInputs.forEach(input => {
      const parentLabel = input.closest('.checklist-label');
      if (input.checked) {
        checkedCount++;
        if (parentLabel) parentLabel.classList.add('checked');
      } else {
        if (parentLabel) parentLabel.classList.remove('checked');
      }
    });

    if (checklistCounter) {
      checklistCounter.textContent = `${checkedCount} of ${checklistInputs.length} items collected`;
    }
  }

  checklistInputs.forEach(input => {
    input.addEventListener('change', updateChecklistCount);
  });

  if (checklistResetBtn) {
    checklistResetBtn.addEventListener('click', () => {
      checklistInputs.forEach(input => {
        input.checked = false;
        const parentLabel = input.closest('.checklist-label');
        if (parentLabel) parentLabel.classList.remove('checked');
      });
      updateChecklistCount();
    });
  }

  // Load default incident
  loadIncidentGuidance('money_lost');
  updateChecklistCount();
}

