/*
========================================================

    GENESIS CODEX
    GCAβ — Gigachad Alpha (Still Beta)

    Production JavaScript
    Vanilla ES6+

========================================================
*/


"use strict";



/* ======================================================
   DOM REFERENCES
====================================================== */


const loader =
    document.querySelector(".genesis-loader");


const header =
    document.querySelector(".site-header");


const menuToggle =
    document.querySelector(".menu-toggle");


const navLinks =
    document.querySelector(".nav-links");


const year =
    document.querySelector("#current-year");





/* ======================================================
   INITIALIZATION
====================================================== */


document.addEventListener(
    "DOMContentLoaded",
    () => {

        initializeLoader();

        initializeHeader();

        initializeNavigation();

        initializeYear();

        initializeRevealSystem();

    }
);





/* ======================================================
   GENESIS LOADER
====================================================== */


function initializeLoader() {


    window.setTimeout(
        () => {

            if (!loader) {
                return;
            }


            loader.classList.add(
                "hidden"
            );


            document.body.classList.add(
                "loaded"
            );


        },
        1400
    );


}




/* ======================================================
   HEADER BEHAVIOR
====================================================== */


function initializeHeader() {


    if (!header) {
        return;
    }



    const updateHeader =
        () => {


            if (window.scrollY > 40) {


                header.classList.add(
                    "scrolled"
                );


            } else {


                header.classList.remove(
                    "scrolled"
                );


            }


        };



    updateHeader();



    window.addEventListener(
        "scroll",
        updateHeader,
        {
            passive: true
        }
    );


}





/* ======================================================
   MOBILE NAVIGATION
====================================================== */


function initializeNavigation() {


    if (!menuToggle || !navLinks) {
        return;
    }



    menuToggle.addEventListener(
        "click",
        () => {


            const expanded =
                menuToggle.getAttribute(
                    "aria-expanded"
                ) === "true";



            menuToggle.setAttribute(
                "aria-expanded",
                String(!expanded)
            );



            navLinks.classList.toggle(
                "active"
            );


            menuToggle.classList.toggle(
                "active"
            );


        }
    );





    document
        .querySelectorAll(
            ".nav-links a"
        )
        .forEach(
            link => {


                link.addEventListener(
                    "click",
                    () => {


                        navLinks.classList.remove(
                            "active"
                        );


                        menuToggle.setAttribute(
                            "aria-expanded",
                            "false"
                        );


                        menuToggle.classList.remove(
                            "active"
                        );


                    }
                );


            }
        );


}





/* ======================================================
   FOOTER YEAR
====================================================== */


function initializeYear() {


    if (!year) {
        return;
    }



    year.textContent =
        new Date()
            .getFullYear();


}





/* ======================================================
   SCROLL REVEAL SYSTEM
====================================================== */


function initializeRevealSystem() {


    const elements =
        document.querySelectorAll(
            `
            .section-header,
            .manifesto-card,
            .accumulation-symbol,
            .accumulation-text,
            .principle,
            .timeline-entry,
            .join-panel,
            .final-chamber
            `
        );



    if (
        !("IntersectionObserver" in window)
    ) {


        elements.forEach(
            element => {

                element.classList.add(
                    "visible"
                );

            }
        );


        return;

    }




    elements.forEach(
        element => {


            element.classList.add(
                "reveal"
            );


        }
    );



    const observer =
        new IntersectionObserver(
            entries => {


                entries.forEach(
                    entry => {


                        if (
                            entry.isIntersecting
                        ) {


                            entry.target.classList.add(
                                "visible"
                            );


                            observer.unobserve(
                                entry.target
                            );


                        }


                    }
                );


            },
            {
                threshold: 0.15,
                rootMargin: "0px 0px -80px"
            }
        );




    elements.forEach(
        element => {


            observer.observe(
                element
            );


        }
    );


}

/* ======================================================
   CINEMATIC ATMOSPHERE SYSTEM
====================================================== */


/*
    Lightweight pointer movement system.

    Purpose:
    - Adds subtle depth to Genesis elements.
    - Uses transform only for GPU acceleration.
    - Keeps movement intentionally restrained.
*/


function initializeParallax() {


    const core =
        document.querySelector(".energy-core");


    const symbol =
        document.querySelector(".beta-symbol");


    const finalSymbol =
        document.querySelector(".final-symbol");



    if (
        !core &&
        !symbol &&
        !finalSymbol
    ) {

        return;

    }



    let targetX = 0;
    let targetY = 0;

    let currentX = 0;
    let currentY = 0;



    window.addEventListener(
        "pointermove",
        event => {


            const x =
                (event.clientX / window.innerWidth - .5);


            const y =
                (event.clientY / window.innerHeight - .5);



            targetX =
                x * 20;


            targetY =
                y * 20;


        },
        {
            passive: true
        }
    );





    function animate() {


        currentX +=
            (targetX - currentX) * .04;


        currentY +=
            (targetY - currentY) * .04;



        const transform =
            `translate(${currentX}px, ${currentY}px)`;



        if (core) {

            core.style.transform =
                `translate(-50%, -50%) ${transform}`;

        }



        if (symbol) {

            symbol.style.transform =
                transform;

        }



        if (finalSymbol) {

            finalSymbol.style.transform =
                transform;

        }



        requestAnimationFrame(
            animate
        );


    }



    requestAnimationFrame(
        animate
    );


}



function initializeParticles() {


    const canvas =
        document.querySelector("#particle-field");


    if (!canvas) return;


    const ctx =
        canvas.getContext("2d");


    let particles = [];


    let width;
    let height;



    function resize(){

        width =
            canvas.width =
            window.innerWidth;


        height =
            canvas.height =
            window.innerHeight;

    }



    window.addEventListener(
        "resize",
        resize
    );


    resize();



    const amount =
        window.innerWidth < 700
            ? 35
            : 90;



    for(let i=0;i<amount;i++){

const roll = Math.random();


    particles.push({

    x:
        Math.random()*width,

    y:
        Math.random()*height,


    size:
        Math.random()*2+0.5,


    speed:
        Math.random()*0.25+0.05,


    opacity:
        Math.random()*0.6+0.2,


    drift:
        Math.random()*Math.PI*2,


    type:
        roll > 0.96
            ? "beta"
            :
        roll > 0.88
            ? "gold"
            :
        "energy"

});


    }





    function animate(){


        ctx.clearRect(
            0,
            0,
            width,
            height
        );



        particles.forEach(p=>{


            p.y -= p.speed;


            p.x +=
                Math.sin(
                    p.drift
                ) * 0.15;



            if(p.y < -10){

                p.y =
                    height+10;

            }



            ctx.beginPath();


            ctx.arc(
                p.x,
                p.y,
                p.size,
                0,
                Math.PI*2
            );


            ctx.fillStyle =
                `rgba(103,184,255,${p.opacity})`;


            ctx.fill();


        });



        requestAnimationFrame(
            animate
        );


    }


    animate();

}

window.addEventListener(
    "load",
    () => {

        initializeParticles();

    }
);

/* ======================================================
   SMOOTH ANCHOR NAVIGATION
====================================================== */


function initializeSmoothLinks() {


    const links =
        document.querySelectorAll(
            'a[href^="#"]'
        );



    links.forEach(
        link => {


            link.addEventListener(
                "click",
                event => {


                    const targetID =
                        link.getAttribute(
                            "href"
                        );



                    const target =
                        document.querySelector(
                            targetID
                        );



                    if (!target) {

                        return;

                    }



                    event.preventDefault();



                    target.scrollIntoView(
                        {
                            behavior:
                                "smooth",
                            block:
                                "start"
                        }
                    );


                }
            );


        }
    );


}







/* ======================================================
   ACTIVE CHAPTER TRACKING
====================================================== */


function initializeChapterObserver() {


    const chapters =
        document.querySelectorAll(
            ".chapter"
        );



    if (
        chapters.length === 0 ||
        !("IntersectionObserver" in window)
    ) {

        return;

    }



    const observer =
        new IntersectionObserver(
            entries => {


                entries.forEach(
                    entry => {


                        if (
                            entry.isIntersecting
                        ) {


                            entry.target
                                .classList
                                .add(
                                    "chapter-active"
                                );


                        }


                    }
                );


            },
            {
                threshold:
                    .35
            }
        );



    chapters.forEach(
        chapter => {


            observer.observe(
                chapter
            );


        }
    );


}







/* ======================================================
   PERFORMANCE GUARD
====================================================== */


function initializePerformanceMode() {


    const reduceMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        );



    if (
        reduceMotion.matches
    ) {


        document.documentElement
            .classList
            .add(
                "reduced-motion"
            );


        return;

    }



    /*
        Detect low-power environments.

        Avoids unnecessary effects
        on older devices.
    */


    const cores =
        navigator.hardwareConcurrency || 4;



    if (
        cores <= 2
    ) {


        document.documentElement
            .classList
            .add(
                "low-performance"
            );


    }


}







/* ======================================================
   LAZY MEDIA / FUTURE EXTENSION
====================================================== */


function initializeLazySystems() {


    /*
        Reserved for future Genesis assets.

        Keeps architecture ready for:
        - animated relics
        - audio chambers
        - visual archives
        - collectible layers

    */


}







/* ======================================================
   BOOT SEQUENCE
====================================================== */


window.addEventListener(
    "load",
    () => {


        initializeParallax();

        initializeSmoothLinks();

        initializeChapterObserver();

        initializePerformanceMode();

        initializeLazySystems();


    }
);

/* ======================================================
   GENESIS β INTERACTION
====================================================== */


/*
    The β symbol is the central artifact.

    Interaction goals:
    - Reward curiosity.
    - Remain subtle.
    - Avoid distracting from the experience.

*/


function initializeBetaArtifact() {


    const betaElements =
        document.querySelectorAll(
            ".beta-symbol, .core-symbol, .join-beta, .final-symbol"
        );



    if (
        betaElements.length === 0
    ) {

        return;

    }



    betaElements.forEach(
        element => {


            element.addEventListener(
                "mouseenter",
                () => {


                    element.classList.add(
                        "beta-awakened"
                    );


                }
            );



            element.addEventListener(
                "mouseleave",
                () => {


                    element.classList.remove(
                        "beta-awakened"
                    );


                }
            );


        }
    );


}







/* ======================================================
   KEYBOARD EXPERIENCE
====================================================== */


function initializeKeyboardNavigation() {


    document.addEventListener(
        "keydown",
        event => {


            /*
                Escape closes mobile navigation.
            */


            if (
                event.key === "Escape"
            ) {


                if (
                    navLinks &&
                    menuToggle
                ) {


                    navLinks.classList.remove(
                        "active"
                    );


                    menuToggle.classList.remove(
                        "active"
                    );


                    menuToggle.setAttribute(
                        "aria-expanded",
                        "false"
                    );


                }


            }



        }
    );


}







/* ======================================================
   EXTERNAL LINK SAFETY
====================================================== */


function initializeExternalLinks() {


    const externalLinks =
        document.querySelectorAll(
            'a[target="_blank"]'
        );



    externalLinks.forEach(
        link => {


            const relation =
                link.getAttribute(
                    "rel"
                );



            if (
                !relation ||
                !relation.includes(
                    "noopener"
                )
            ) {


                link.setAttribute(
                    "rel",
                    "noopener noreferrer"
                );


            }


        }
    );


}







/* ======================================================
   VIEWPORT RESIZE HANDLER
====================================================== */


function initializeResizeHandler() {


    let resizeTimer;



    window.addEventListener(
        "resize",
        () => {


            document.body.classList.add(
                "resizing"
            );



            clearTimeout(
                resizeTimer
            );



            resizeTimer =
                setTimeout(
                    () => {


                        document.body.classList.remove(
                            "resizing"
                        );


                    },
                    250
                );


        },
        {
            passive:
                true
        }
    );


}







/* ======================================================
   FINAL GENESIS BOOT
====================================================== */


window.addEventListener(
    "load",
    () => {


        initializeBetaArtifact();

        initializeKeyboardNavigation();

        initializeExternalLinks();

        initializeResizeHandler();


    }
);







/* ======================================================
   OPTIONAL DEBUG SIGNATURE
====================================================== */


if (
    window.location.hash === "#genesis-debug"
) {


    console.info(
        "%cGCAβ Genesis Codex",
        `
        color:#67b8ff;
        font-size:20px;
        font-weight:bold;
        `
    );


    console.info(
        "Artifact systems initialized."
    );


}