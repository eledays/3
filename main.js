var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');

var lbl = document.querySelector('h1');
var text = document.querySelector('p');
var allowed = false;
var step = 0;

var music = new Audio('https://github.com/eledays/3/raw/refs/heads/main/music.wav');
var lyrics = document.querySelector('p.lyrics');

let endStarted = false;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var points = [
    null
];
var mainPoints = [];

function startFirework() {
    if (!allowed) return;

    if (step == 1) {
        text.style.opacity = 0;
        setTimeout(() => {
            setTimeout(() => { 
                text.innerText = 'Ещё разок)';
                text.style.opacity = 1; 
                allowed = true;
                step = 2;
            }, 300);
        }, 3000);
    }
    else if (step == 2) {
        text.style.opacity = 0;
        setTimeout(() => {
            setTimeout(() => { 
                text.innerText = 'И ещё)';
                text.style.opacity = 1; 
                allowed = true;
                step = 3;
            }, 300);
        }, 3000);
    }
    else if (step == 3) {
        text.style.opacity = 0;
        setTimeout(() => {
            setTimeout(() => { 
                text.innerText = 'Пока не нажимай';
                allowed = false;
                text.style.opacity = 1; 
                step = 4;
                setTimeout(() => {
                    music.play();
                    // music.currentTime = 17;

                    setTimeout(() => {
                        clearInterval(eiId);
                        allowed = false;
                    }, 94000);

                    text.style.opacity = 0;
                    points[0] = {
                        x: canvas.width / 2,
                        y: canvas.height * 2 - 1,
                        color: 'rgb(255, 0, 0)',
                        v: {x: 0, y: -1},
                        a: {x: 0, y: (1 ** 2) / (2 * (canvas.height * 2 - 1 - canvas.height / 2))},
                        r: canvas.height * .6,
                        shadow: 300
                    }

                    let codes = [3.809, 4.283, 4.714, 5.181, 5.66, 5.882, 6.117, 6.348, 6.577, 7.512, 7.999, 8.484, 8.927, 9.377, 9.812, 10.227, 11.218, 11.671, 12.144, 12.593, 13.114, 13.334, 13.577, 13.81, 14.034, 14.93, 15.388, 16.352, 16.819, 17.272, 18.195];
                    
                    codes.forEach((dl) => {
                        setTimeout(() => {
                            const iId = setInterval(generatePoints, 5, 
                                {
                                    x: window.innerWidth * Math.random(), y: window.innerHeight * Math.random(),
                                    v: {x: 0, y: 0}
                                }, '#fff'
                            );
                            mainPoints.splice(0, 1);
                            setTimeout(() => { clearInterval(iId); }, 200);
                        }, dl * 1000 - 200);
                    });
                    // console.warn('no intro fireworks');
                }, 3000);
            }, 300);
        }, 3000);
    }

    let startSound = new Audio('https://github.com/eledays/3/raw/refs/heads/main/start.wav');
    startSound.play();

    mainPoints.push(
        {
            x: Math.random() * canvas.width * .2 + canvas.width * .4,
            y: canvas.height - 100,
            color: '#ffffff',
            v: {x: Math.random() * 4 - 2, y: -10},
            a: {x: 0, y: .1},
            shadow: 0,
            r: 10
        }
    );

    setTimeout(() => {
        let boomSound = new Audio('https://github.com/eledays/3/raw/refs/heads/main/boom.wav');
        boomSound.play();
        const iId = setInterval(generatePoints, 5, mainPoints[0]);
        mainPoints.splice(0, 1);
        setTimeout(() => { clearInterval(iId); }, 200);
    }, 1500);
}

document.addEventListener('click', startFirework);

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}); 

function generatePoints(startPoint, specialColor=null) {
    
    v = Math.random() * 5 + 5;
    angle = Math.random() * Math.PI * 2;
    let x = Math.cos(angle) * v + 1 * startPoint.v.x;
    let y = Math.sin(angle) * v + 1 * startPoint.v.y;
    let color = specialColor != null ? specialColor : `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`;

    points.push({
        x: startPoint.x,
        y: startPoint.y,
        color: color,
        v: {x: x, y: y},
        a: {x: 0, y: .2},
        r: 5,
        shadow: 10
    });
}

function draw() {    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    points.concat(mainPoints).forEach((point) => {
        if (point == null) return;
        ctx.beginPath();
        ctx.arc(point.x, point.y, point.r, 0, 2 * Math.PI);
        ctx.fillStyle = point.color;
        ctx.shadowColor = point.color;
        ctx.shadowBlur = point.shadow;
        ctx.fill();
        ctx.closePath();
    });
}

var eiId = null;
function tick() {
    if (music.currentTime < 19.1) {
        // lyrics.innerText = '';
    }
    else if (music.currentTime < 19.3) {
        lyrics.innerText = 'Now';
    }
    else if (music.currentTime < 19.55) {
        lyrics.innerText = 'Now and';
    }
    else if (music.currentTime < 19.78) {
        lyrics.innerText = 'Now and then,';
    }
    else if (music.currentTime < 20.02) {
        lyrics.innerText = 'Now and then, I';
    }
    else if (music.currentTime < 20.25) {
        lyrics.innerText = 'Now and then, I think';
    }
    else if (music.currentTime < 20.48) {
        lyrics.innerText = 'Now and then, I think of';
    }
    else if (music.currentTime < 20.95) {
        lyrics.innerText = 'Now and then, I think of when';
    }
    else if (music.currentTime < 21.33) {
        lyrics.innerText = 'Now and then, I think of when we';
    }
    else if (music.currentTime < 21.84) {
        lyrics.innerText = 'Now and then, I think of when we were';
    }
    else if (music.currentTime < 24) {
        lyrics.innerText = 'Now and then, I think of when we were together';
        setTimeout(() => lyrics.style.opacity = 0, 300);
    }
    else if (music.currentTime < 26.25) {
        lyrics.style.right = '50px';
        lyrics.style.left = 'auto';
        lyrics.style.textAlign = 'right';
        lyrics.style.opacity = 1;
        lyrics.innerText = '';
    }
    else if (music.currentTime < 26.5) {
        lyrics.innerText = 'Like';
    }
    else if (music.currentTime < 26.6) {
        lyrics.innerText = 'Like when';
    }
    else if (music.currentTime < 26.9) {
        lyrics.innerText = 'Like when you';
    }
    else if (music.currentTime < 27.2) {
        lyrics.innerText = 'Like when you said ';
    }
    else if (music.currentTime < 27.4) {
        lyrics.innerText = 'Like when you said you';
    }
    else if (music.currentTime < 27.6) {
        lyrics.innerText = 'Like when you said you felt';
    }
    else if (music.currentTime < 27.9) {
        lyrics.innerText = 'Like when you said you felt so';
    }
    else if (music.currentTime < 28.6) {
        lyrics.innerText = 'Like when you said you felt so happy, ';
    }
    else if (music.currentTime < 29.29) {
        lyrics.innerText = 'Like when you said you felt so happy, you';
    }
    else if (music.currentTime < 29.55) {
        lyrics.innerText = 'Like when you said you felt so happy, you could';
    }
    else if (music.currentTime < 31.65) {
        lyrics.innerText = 'Like when you said you felt so happy, you could die';
        setTimeout(() => lyrics.style.opacity = 0, 300);
    }
    else if (music.currentTime < 33.93) {
        lyrics.style.left = `${window.innerWidth / 2}px`;
        lyrics.style.right = 'auto';
        lyrics.style.textAlign = 'left';
        lyrics.style.top = '70%';
        lyrics.style.color = '#fff';
        lyrics.style.opacity = 1;
        lyrics.innerText = '';
    }
    else if (music.currentTime < 34) {
        lyrics.innerText = 'I ';
    }
    else if (music.currentTime < 34.2) {
        lyrics.innerText = 'I told ';
    }
    else if (music.currentTime < 34.8) {
        lyrics.innerText = 'I told myself ';
    }
    else if (music.currentTime < 34.83) {
        lyrics.innerText = 'I told myself that ';
    }
    else if (music.currentTime < 35.1) {
        lyrics.innerText = 'I told myself that you ';
    }
    else if (music.currentTime < 35.4) {
        lyrics.innerText = 'I told myself that you were ';
    }
    else if (music.currentTime < 35.82) {
        lyrics.innerText = 'I told myself that you were right ';
    }
    else if (music.currentTime < 36.16) {
        lyrics.innerText = 'I told myself that you were right for ';
    }
    else if (music.currentTime < 36.9) {
        lyrics.innerText = 'I told myself that you were right for me';
        setTimeout(() => lyrics.style.opacity = 0, 300);
    }
    else if (music.currentTime < 37.4) {
        lyrics.style.right = '50%';
        lyrics.style.left = 'auto';
        lyrics.style.textAlign = 'right';
        lyrics.style.top = '40%';
        lyrics.style.color = '#fff';
        lyrics.style.opacity = 1;
        lyrics.innerText = '';
    }
    else if (music.currentTime < 37.55) {
        lyrics.innerText = 'But ';
    }
    else if (music.currentTime < 37.85) {
        lyrics.innerText = 'But felt ';
    }
    else if (music.currentTime < 38.15) {
        lyrics.innerText = 'But felt so ';
    }
    else if (music.currentTime < 38.6) {
        lyrics.innerText = 'But felt so lonely ';
    }
    else if (music.currentTime < 38.85) {
        lyrics.innerText = 'But felt so lonely in ';
    }
    else if (music.currentTime < 39.09) {
        lyrics.innerText = 'But felt so lonely in your ';
    }
    else if (music.currentTime < 40.6) {
        lyrics.innerText = 'But felt so lonely in your company ';
        setTimeout(() => lyrics.style.opacity = 0, 300);
    }
    else if (music.currentTime < 41.2) {
        lyrics.style.right = 'auto';
        lyrics.style.left = '50%';
        lyrics.style.transform = 'translateX(-50%)';
        lyrics.style.textAlign = 'center';
        lyrics.style.top = '30%';
        lyrics.style.color = '#fff';
        lyrics.style.opacity = 1;
        lyrics.innerText = '';
    }
    else if (music.currentTime < 41.4) {
        lyrics.innerText = 'But ';
    }
    else if (music.currentTime < 41.585) {
        lyrics.innerText = 'But that ';
    }
    else if (music.currentTime < 41.75) {
        lyrics.innerText = 'But that was ';
    }
    else if (music.currentTime < 42.335) {
        lyrics.innerText = 'But that was love ';
    }
    else if (music.currentTime < 42.45) {
        lyrics.innerText = 'But that was love and ';
    }
    else if (music.currentTime < 42.6) {
        lyrics.innerText = 'But that was love and it\'s ';
    }
    else if (music.currentTime < 42.675) {
        lyrics.innerText = 'But that was love and it\'s an ';
    }
    else if (music.currentTime < 43.27) {
        lyrics.innerText = 'But that was love and it\'s an it\'s an ache ';
    }
    else if (music.currentTime < 43.5) {
        lyrics.innerText = 'But that was love and it\'s an it\'s an ache I ';
    }
    else if (music.currentTime < 44.2) {
        lyrics.innerText = 'But that was love and it\'s an it\'s an ache I still ';
    }
    else if (music.currentTime < 48.2) {
        lyrics.innerText = 'But that was love and it\'s an it\'s an ache I still remember';
        setTimeout(() => lyrics.style.opacity = 0, 300);
    }
    else {
        lyrics.innerText = '';
        allowed = true;
    }


    points.concat(mainPoints).forEach((point) => {
        if (point == null) return;
        point.v.x += point.a.x;
        point.v.y += point.a.y;

        point.x += point.v.x;
        point.y += point.v.y;

        if ((point.x < 0 || point.x > canvas.width) || (point.y / 2 < 0 || point.y / 2 > canvas.height)) {
            points.splice(points.indexOf(point), 1);
        }
    });
    // console.log(points.concat(mainPoints).length, points);

    if (!endStarted && (music.currentTime > 48 || (points[0] != null && points[0].v.y > 0))) {
        endStarted = true;

        points[0].v = {x: 0, y: 0};
        points[0].a = {x: 0, y: 0};

        lbl.style.opacity = 1;
        const iId = setInterval(() => {
            startFirework();
        }, 100);

        setTimeout(() => {
            clearInterval(iId);
        }, 1000);

        eiId = setInterval(() => {startFirework();}, 750);
    }

    draw();
}

const tickId = setInterval(tick, 1000 / 60);

setTimeout(() => {
    text.style.opacity = 0;
    setTimeout(() => { 
        text.innerHTML = 'Советую перейти в полноэкранный режим (F11) и включить звук';
        text.style.opacity = 1; 
        setTimeout(() => {
            text.style.opacity = 0;
            setTimeout(() => { 
                text.innerText = 'Нажми на экран';
                text.style.opacity = 1; 
                allowed = true;
                step = 1;
                // console.warn('steps skip')
            }, 300);
        }, 7000);
    }, 300);
}, 2000);