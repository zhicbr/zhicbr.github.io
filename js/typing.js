export function setupTyping() {
    const quotes = [
        "生活不止眼前的苟且，还有诗和远方。",
        "不要等待机会，而要创造机会。",
        "最困难的时刻，也是离成功最近的时刻。",
        "今天的付出是为了明天更好的收获。"
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