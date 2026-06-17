/**
 * @file script.js
 * @description Client-side layout engine for Aura Beauty Supply.
 * Controls the front-page carousel slide transitions and manages 
 * the dynamic generation and lifecycle of transactional toast feedback banners.
 * @version 1.0.0
 * * @type {NodeListOf<Element>} slides - Collection of slide container DOM elements.
 * @type {Element} prevBtn - DOM trigger for retrospective slide transitions.
 * @type {Element} nextBtn - DOM trigger for prospective slide transitions.
 * @type {Number} currentSlideIndex - Active array pointer tracking the visible carousel layer.
 */

const slides = document.querySelectorAll('.slide');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
let currentSlideIndex = 0;

/**
 * Modifies visibility classes across slide elements using wrapping boundary logic.
 * @param {Number} index - The target slide position pointer to evaluate.
 * @returns {Void}
 */
function showSlide(index) {
    slides[currentSlideIndex].classList.remove('active');
    
    if (index >= slides.length) {
        currentSlideIndex = 0;
    } else if (index < 0) {
        currentSlideIndex = slides.length - 1;
    } else {
        currentSlideIndex = index;
    }

    slides[currentSlideIndex].classList.add('active');
}

nextBtn.addEventListener('click', () => showSlide(currentSlideIndex + 1));
prevBtn.addEventListener('click', () => showSlide(currentSlideIndex - 1));

/**
 * Evaluates URL parameter payloads on resource loading to generate asynchronous notification layouts.
 */
document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const successMessage = urlParams.get('success');

    if (successMessage) {
        const toastNotification = document.createElement("div");
        toastNotification.innerText = "✨ " + successMessage;
        
        Object.assign(toastNotification.style, {
            position: "fixed",
            top: "20px",
            right: "20px",
            backgroundColor: "#FFF0F5",
            color: "#FF69B4",
            padding: "16px 24px",
            borderRadius: "8px",
            border: "1px solid #FFB6C1",
            fontFamily: "'Playfair Display', serif",
            letterSpacing: "1px",
            boxShadow: "0 4px 15px rgba(255, 182, 193, 0.4)",
            zIndex: "9999",
            transition: "all 0.5s ease"
        });

        document.body.appendChild(toastNotification);

        setTimeout(() => {
            toastNotification.style.opacity = "0";
            toastNotification.style.transform = "translateY(-10px)";
            setTimeout(() => toastNotification.remove(), 500);
        }, 3500);
    }
});