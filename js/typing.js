export function setupTyping() {
    const quotes = [
        "只恐西风又惊秋，不觉暗中流年换。",
        "Opportunity does not waste time with those who are unprepared.",
        "活着本身就很妙，如果连这道理都不懂，怎么去探索更深的东西呢？",
        "厚积薄发",
        "天道酬勤",
        "We live between the earth and sky;Like travelers we shall pass by."
        
    ];

    const typingContainer = document.querySelector('.typing-container');
    let currentQuoteIndex = 0;
    let currentCharIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function type() {
        const currentQuote = quotes[currentQuoteIndex];
        
        if (isDeleting) {
            typingContainer.textContent = currentQuote.substring(0, currentCharIndex - 1);
            currentCharIndex--;
        } else {
            typingContainer.textContent = currentQuote.substring(0, currentCharIndex + 1);
            currentCharIndex++;
        }

        if (!isDeleting && currentCharIndex === currentQuote.length) {
            isDeleting = true;
            typingSpeed = 50;
            setTimeout(type, 2000);
            return;
        }

        if (isDeleting && currentCharIndex === 0) {
            isDeleting = false;
            currentQuoteIndex = (currentQuoteIndex + 1) % quotes.length;
            typingSpeed = 100;
        }

        setTimeout(type, typingSpeed);
    }

    type();
}