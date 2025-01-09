document.addEventListener("DOMContentLoaded", function() {
    const canvas = document.getElementById('totemCanvas');
    const ctx = canvas.getContext('2d');
    const startButton = document.getElementById('startButton');


    canvas.width = window.innerWidth * 2;  // Make canvas wider for horizontal scrolling
    canvas.height = window.innerHeight;  // Keep the height the same

    const centerX = canvas.width / 4;  // Position to the left, 1/4 of the canvas width
    const centerY = canvas.height / 2;  // Vertically centered


    const radius = Math.min(canvas.width, canvas.height) * 0.4;
    let counter = 0;
    let totalTime = 5;  // tempo timer total
    let currentQuadrant = 2;  // onde comeca
    const quadrants = [
        { start: (45 * Math.PI) / 180, end: (135 * Math.PI) / 180 },  // N
        { start: (135 * Math.PI) / 180, end: (225 * Math.PI) / 180 }, // S
        { start: (225 * Math.PI) / 180, end: (315 * Math.PI) / 180 }, // D
        { start: (315 * Math.PI) / 180, end: (45 * Math.PI) / 180 },  // E
    ];

 
    const colors = {
        safe: '#00FF00',
        warning: '#FFFF00',
        danger: '#FF0000'
    };

    // desenha totem
    function drawTotem() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // desenha quadrantes
        for (let i = 0; i < quadrants.length; i++) {
            ctx.beginPath();
            ctx.moveTo(centerX, centerY);

            // arco quadrantre
            ctx.arc(centerX, centerY, radius, quadrants[i].start, quadrants[i].end);

            // vermelho quadrante atual
            ctx.fillStyle = i === currentQuadrant ? 'red' : 'gray';
            ctx.fill();
        }

        // desenha contador
        ctx.fillStyle = 'white';
        ctx.font = `${radius / 3}px Arial`;  
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(counter, centerX, centerY);
    }

    // atualiza tempo e rotacao
    function updateTotem() {
        if (counter === 0) {
            currentQuadrant = (currentQuadrant + 1) % 4; 
            counter = totalTime;  // reseta timer
        } else {
            counter--;  // diminui timer
        }

        // atulizar o totem
        drawTotem();
    }


    let timerRunning = false;

    // comecar tempo qnd clica start
    function startTimer() {
        if (!timerRunning) {
            timerRunning = true;
            counter = totalTime;  // Initialize the counter
            drawTotem(); // Immediately draw the totem once the timer starts
            setInterval(updateTotem, 1000); // Update every second
            startButton.style.display = 'none';  // Hide the start button
        }
    }

    startButton.addEventListener('click', startTimer);
});
