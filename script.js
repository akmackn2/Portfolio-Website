const header = document.querySelector("header");
const toggleButton = document.querySelector(".togglebtn");
const navLinks = document.querySelector(".navlinks");
const navItems = document.querySelectorAll(".navlinks a");

window.addEventListener("scroll", function () {
    if (window.scrollY > 0) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }
});

if (toggleButton && navLinks) {
    toggleButton.addEventListener("click", function () {
        toggleButton.classList.toggle("active");
        navLinks.classList.toggle("open");
    });
}

navItems.forEach(function (item) {
    item.addEventListener("click", function () {
        if (toggleButton && navLinks) {
            toggleButton.classList.remove("active");
            navLinks.classList.remove("open");
        }
    });
});

window.addEventListener("resize", function () {
    if (window.innerWidth > 768) {
        if (toggleButton && navLinks) {
            toggleButton.classList.remove("active");
            navLinks.classList.remove("open");
        }
    }
});

const typingElement = document.querySelector("#typing-text");

if (typingElement) {
    const fullText = "Computer Science graduate from the University of Houston College of Natural Sciences & Mathematics!";
    const speed = 100;
    const pause = 1000;

    function animateText() {
        let index = 0;
        typingElement.textContent = "";

        const interval = setInterval(() => {
            if (index < fullText.length) {
                typingElement.textContent += fullText[index];
                index++;
            } else {
                clearInterval(interval);

                setTimeout(() => {
                    reverseText();
                }, pause);
            }
        }, speed);
    }

    function reverseText() {
        let index = fullText.length;

        const interval = setInterval(() => {
            if (index > 0) {
                typingElement.textContent = fullText.slice(0, index - 1);
                index--;
            } else {
                clearInterval(interval);

                setTimeout(() => {
                    animateText();
                }, pause);
            }
        }, speed);
    }

    animateText();
}

const timelineViewport = document.querySelector(".timeline-viewport");
const timelineTrack = document.querySelector(".timeline-track");
const timelinePrev = document.querySelector(".timeline-arrow-left");
const timelineNext = document.querySelector(".timeline-arrow-right");
const timelineDots = document.querySelectorAll(".timeline-dot");
const timelineItems = document.querySelectorAll(".timeline-item");
const timelineProgress = document.querySelector(".timeline-progress");

function getTimelineScrollAmount() {
    const firstItem = document.querySelector(".timeline-item");

    if (!firstItem || !timelineTrack) {
        return 320;
    }

    const trackStyles = window.getComputedStyle(timelineTrack);
    const gap = parseInt(trackStyles.columnGap || trackStyles.gap || 22, 10);

    return firstItem.offsetWidth + gap;
}

function getCurrentTimelineIndex() {
    if (!timelineViewport || timelineItems.length === 0) {
        return 0;
    }

    const viewportCenter = timelineViewport.scrollLeft + timelineViewport.clientWidth / 2;
    let closestIndex = 0;
    let closestDistance = Infinity;

    timelineItems.forEach(function (item, index) {
        const itemCenter = item.offsetLeft + item.offsetWidth / 2;
        const distance = Math.abs(viewportCenter - itemCenter);

        if (distance < closestDistance) {
            closestDistance = distance;
            closestIndex = index;
        }
    });

    return closestIndex;
}

function scrollToTimelineItem(index) {
    if (!timelineViewport || !timelineItems[index]) {
        return;
    }

    const item = timelineItems[index];
    const left = item.offsetLeft - (timelineViewport.clientWidth - item.offsetWidth) / 2;

    timelineViewport.scrollTo({
        left: left,
        behavior: "smooth"
    });
}

function updateTimelineUI() {
    if (!timelineViewport || !timelinePrev || !timelineNext) {
        return;
    }

    const maxScrollLeft = timelineViewport.scrollWidth - timelineViewport.clientWidth;
    const currentScroll = timelineViewport.scrollLeft;
    const currentIndex = getCurrentTimelineIndex();

    timelinePrev.disabled = currentScroll <= 5;
    timelineNext.disabled = currentScroll >= maxScrollLeft - 5;

    timelineDots.forEach(function (dot, index) {
        if (index === currentIndex) {
            dot.classList.add("active");
        } else {
            dot.classList.remove("active");
        }
    });

    if (timelineProgress && timelineItems.length > 0) {
        const progressWidth = ((currentIndex + 1) / timelineItems.length) * 100;
        timelineProgress.style.width = progressWidth + "%";
    }
}

if (timelineViewport && timelinePrev && timelineNext) {
    timelinePrev.addEventListener("click", function () {
        const currentIndex = getCurrentTimelineIndex();
        scrollToTimelineItem(Math.max(currentIndex - 1, 0));
    });

    timelineNext.addEventListener("click", function () {
        const currentIndex = getCurrentTimelineIndex();
        scrollToTimelineItem(Math.min(currentIndex + 1, timelineItems.length - 1));
    });

    timelineDots.forEach(function (dot, index) {
        dot.addEventListener("click", function () {
            scrollToTimelineItem(index);
        });
    });

    timelineViewport.addEventListener("scroll", function () {
        window.requestAnimationFrame(updateTimelineUI);
    });

    window.addEventListener("resize", updateTimelineUI);

    updateTimelineUI();
}
