
//שמירת הניקוד הגבוה בלוקאל סטוראז
const best = document.querySelector("#best");
// localStorage.setItem("bestscore", "0"); 
let bestscore = Number(localStorage.getItem("bestscore")) || 0;
best.innerHTML = bestscore; // תעדכני את התצוגה עם הערך האתחולי


const tileColorClasses = [
    'tile-2', 'tile-4', 'tile-8', 'tile-16', 'tile-32',
    'tile-64', 'tile-128', 'tile-256', 'tile-512',
    'tile-1024', 'tile-2048'
];
/*הגרלת מספר 2 או 4 */
const numbers = [2, 4];
const randomIndexnum1 = Math.floor(Math.random() * numbers.length);
const randomNumber1 = numbers[randomIndexnum1];
const randomIndexnum2 = Math.floor(Math.random() * numbers.length);
const randomNumber2 = numbers[randomIndexnum2];
const place = [
    { row: 1, column: 1 },
    { row: 1, column: 2 },
    { row: 1, column: 3 },
    { row: 1, column: 4 },
    { row: 2, column: 1 },
    { row: 2, column: 2 },
    { row: 2, column: 3 },
    { row: 2, column: 4 },
    { row: 3, column: 1 },
    { row: 3, column: 2 },
    { row: 3, column: 3 },
    { row: 3, column: 4 },
    { row: 4, column: 1 },
    { row: 4, column: 2 },
    { row: 4, column: 3 },
    { row: 4, column: 4 }

];
const randomIndexplace1 = Math.floor(Math.random() * place.length);
const randomplace1 = place[randomIndexplace1];
const randomIndexplace2 = Math.floor(Math.random() * place.length);
const randomplace2 = place[randomIndexplace2];
const mone = document.querySelector("#mone");
function start() {
    best.innerHTML = localStorage.getItem("bestscore");
    const tile = document.querySelector(
        `.tile[data-row="${randomplace1.row}"][data-col="${randomplace1.column}"]`
    );

    if (tile) {
        tile.textContent = randomNumber1;
        tileColorClasses.forEach(cls => {
            tile.classList.remove(cls);
        });
        tile.classList.add(`tile-${randomNumber1}`);
    }

    const tile2 = document.querySelector(
        `.tile[data-row="${randomplace2.row}"][data-col="${randomplace2.column}"]`
    );

    if (tile2) {
        tile2.textContent = randomNumber2;
        tileColorClasses.forEach(cls => {
            tile2.classList.remove(cls);
        });
        tile2.classList.add(`tile-${randomNumber2}`);
    }
}


start();

function canMerge() {
    for (let row = 1; row <= 4; row++) {
        for (let col = 1; col <= 4; col++) {
            const tile = document.querySelector(`.tile[data-row="${row}"][data-col="${col}"]`);
            if (!tile) continue;
            const value = tile.textContent.trim();
            if (!value) continue;

            // בדיקה למימין
            if (col < 4) {
                const rightTile = document.querySelector(`.tile[data-row="${row}"][data-col="${col + 1}"]`);
                if (rightTile && rightTile.textContent.trim() === value) {
                    return true;
                }
            }
            // בדיקה למטה
            if (row < 4) {
                const downTile = document.querySelector(`.tile[data-row="${row + 1}"][data-col="${col}"]`);
                if (downTile && downTile.textContent.trim() === value) {
                    return true;
                }
            }
        }
    }
    return false;
}


function newtile() {
    const numbers = [2, 4];
    const randomNumber1 = numbers[Math.floor(Math.random() * numbers.length)];

    // מסנן רק מקומות פנויים
    const emptyPlaces = place.filter(pos => {
        const tile = document.querySelector(`.tile[data-row="${pos.row}"][data-col="${pos.column}"]`);
        return tile && tile.textContent.trim() === "";
    });
    //המשחק הסתיים נכשלת
    if (emptyPlaces.length === 0 && !canMerge()) {
        let currentScore = Number(mone.innerHTML);
        if (currentScore > bestscore) {
            bestscore = currentScore; // עדכון הערך במשתנה
            localStorage.setItem("bestscore", bestscore); // שמירה בלוקאל סטורג'
            best.innerHTML = bestscore; // עדכון תצוגה
            createConfetti();//מפעיל קונפטי 

        }

        const audio = new Audio('../שמע/איזה+לוזר.mp3');
        audio.play();
        document.querySelector('.game-over-message').style.display = 'flex';
        return; // אין מקום פנוי בלוח
    }

    const randomIndex = Math.floor(Math.random() * emptyPlaces.length);
    const chosenPlace = emptyPlaces[randomIndex];
    const tile = document.querySelector(
        `.tile[data-row="${chosenPlace.row}"][data-col="${chosenPlace.column}"]`
    );

    if (tile) {
        tile.textContent = randomNumber1;
        tileColorClasses.forEach(cls => {
            tile.classList.remove(cls);
        });
        tile.classList.add(`tile-${randomNumber1}`);
    }
}


//פונקציה ההזה שמאלה
function moveLeft() {
    const tiles = document.querySelectorAll('.tile');

    for (let row = 1; row <= 4; row++) {
        // מוצאים את האריחים עם מספר בשורה הנוכחית, ממוינים מהשמאל לימין
        let rowTiles = Array.from(tiles)
            .filter(tile => Number(tile.dataset.row) === row)
            .sort((a, b) => Number(a.dataset.col) - Number(b.dataset.col));

        // יוצרים מערך עם הערכים הנוכחיים של האריחים בשורה (מספרים או ריקים)
        let values = rowTiles.map(tile => tile.textContent.trim() || null);

        // פונקציה לאיחוד לפי חוקי 2048
        let mergedValues = [];
        let scoreSum = 0;
        for (let i = 0; i < values.length; i++) {
            if (values[i] == null) continue;
            if (i + 1 < values.length && values[i] === values[i + 1]) {
                { // מאחדים שני אריחים עם אותו מספר
                    const mergedValue = Number(values[i]) * 2;
                    mergedValues.push(String(mergedValue));
                    scoreSum += mergedValue;
                    mone.innerHTML = Number(mone.innerHTML) + mergedValue;
                    showScorePopup(mergedValue, getTileColor(mergedValue));
                }
                i++; // מדלגים על האריח הבא כי כבר מאוחד
            } else {
                mergedValues.push(values[i]);
            }
        }

        // ממלאים את השאר בריקים כדי להגיע לאורך 4
        while (mergedValues.length < 4) {
            mergedValues.push(null);
        }

        // מנקים את כל האריחים בשורה
        rowTiles.forEach(tile => tile.textContent = "");

        // מעדכנים את הטקסטים עם הערכים החדשים לפי מיקום שמאלי
        for (let i = 0; i < mergedValues.length; i++) {
            if (mergedValues[i] !== null) {
                rowTiles[i].textContent = mergedValues[i];
                tileColorClasses.forEach(cls => {
                    rowTiles[i].classList.remove(cls);
                });


                rowTiles[i].classList.add(`tile-${mergedValues[i]}`);
                if (rowTiles[i].textContent == 2048) {
                    const clup = new Audio('../שמע/כפיים.mp3');
                    clup.play();
                    document.querySelector('.win_massage').style.display = 'flex';
                }
            }


        }
    }
    // אם יש צורך לעדכן מיקום פיזי או אנימציות, תוסיף כאן
    updateTilePositions();
    //הוספת אריח עם מספר
    newtile();
}


function moveRight() {
    const tiles = document.querySelectorAll('.tile');

    for (let row = 1; row <= 4; row++) {
        let rowTiles = Array.from(tiles)
            .filter(tile => Number(tile.dataset.row) === row)
            .sort((a, b) => Number(b.dataset.col) - Number(a.dataset.col));
        let values = rowTiles.map(tile => tile.textContent.trim() || null);
        let mergedValues = [];
        let scoreSum = 0;
        for (let i = 0; i < values.length; i++) {
            if (values[i] == null) continue;
            if (i + 1 < values.length && values[i] === values[i + 1]) {
                { // מאחדים שני אריחים עם אותו מספר
                    const mergedValue = Number(values[i]) * 2;
                    mergedValues.push(String(mergedValue));
                    scoreSum += mergedValue;
                    mone.innerHTML = Number(mone.innerHTML) + mergedValue;
                    showScorePopup(mergedValue, getTileColor(mergedValue));


                }
                i++; // מדלגים על האריח הבא כי כבר מאוחד
            } else {
                mergedValues.push(values[i]);
            }
        }

        while (mergedValues.length < 4) {
            mergedValues.push(null);
        }
        rowTiles.forEach(tile => tile.textContent = "");
        for (let i = 0; i < 4; i++) {
            if (mergedValues[i] !== null) {
                rowTiles[i].textContent = mergedValues[i];
                tileColorClasses.forEach(cls => {
                    rowTiles[i].classList.remove(cls);
                });
                rowTiles[i].classList.add(`tile-${mergedValues[i]}`);
                if (rowTiles[i].textContent == 2048) {
                    const clup = new Audio('../שמע/כפיים.mp3');
                    clup.play();
                    document.querySelector('.win_massage').style.display = 'flex';
                }
            }
        }
    }

    updateTilePositions();
    newtile();
}
function moveUp() {
    const tiles = document.querySelectorAll('.tile');

    for (let col = 1; col <= 4; col++) {
        let colTiles = Array.from(tiles)
            .filter(tile => Number(tile.dataset.col) === col)
            .sort((a, b) => Number(a.dataset.row) - Number(b.dataset.row));
        let values = colTiles.map(tile => tile.textContent.trim() || null);
        let mergedValues = [];
        let scoreSum = 0;
        for (let i = 0; i < values.length; i++) {
            if (values[i] == null) continue;
            if (i + 1 < values.length && values[i] === values[i + 1]) {
                { // מאחדים שני אריחים עם אותו מספר
                    const mergedValue = Number(values[i]) * 2;
                    mergedValues.push(String(mergedValue));
                    scoreSum += mergedValue;
                    mone.innerHTML = Number(mone.innerHTML) + mergedValue;
                    showScorePopup(mergedValue, getTileColor(mergedValue));

                }
                i++; // מדלגים על האריח הבא כי כבר מאוחד
            } else {
                mergedValues.push(values[i]);
            }
        }

        while (mergedValues.length < 4) {
            mergedValues.push(null);
        }
        colTiles.forEach(tile => tile.textContent = "");
        for (let i = 0; i < mergedValues.length; i++) {
            if (mergedValues[i] !== null) {
                colTiles[i].textContent = mergedValues[i];
                tileColorClasses.forEach(cls => {
                    colTiles[i].classList.remove(cls);
                });
                colTiles[i].classList.add(`tile-${mergedValues[i]}`);
                if (colTiles[i].textContent == 2048) {
                    const clup = new Audio('../שמע/כפיים.mp3');
                    clup.play();
                    document.querySelector('.win_massage').style.display = 'flex';
                }
            }
        }
    }
    updateTilePositions();
    newtile();
}
function moveDown() {
    const tiles = document.querySelectorAll('.tile');

    for (let col = 1; col <= 4; col++) {
        let colTiles = Array.from(tiles)
            .filter(tile => Number(tile.dataset.col) === col)
            .sort((a, b) => Number(b.dataset.row) - Number(a.dataset.row));
        let values = colTiles.map(tile => tile.textContent.trim() || null);
        let mergedValues = [];
        let scoreSum = 0;
        for (let i = 0; i < values.length; i++) {
            if (values[i] == null) continue;
            if (i + 1 < values.length && values[i] === values[i + 1]) {
                { // מאחדים שני אריחים עם אותו מספר
                    const mergedValue = Number(values[i]) * 2;
                    mergedValues.push(String(mergedValue));
                    scoreSum += mergedValue;
                    mone.innerHTML = Number(mone.innerHTML) + mergedValue;
                    showScorePopup(mergedValue, getTileColor(mergedValue));


                }
                i++; // מדלגים על האריח הבא כי כבר מאוחד
            } else {
                mergedValues.push(values[i]);
            }
        }


        while (mergedValues.length < 4) {
            mergedValues.push(null);
        }

        colTiles.forEach(tile => tile.textContent = "");
        for (let i = 0; i < mergedValues.length; i++) {
            if (mergedValues[i] !== null) {
                colTiles[i].textContent = mergedValues[i];
                tileColorClasses.forEach(cls => {
                    colTiles[i].classList.remove(cls);
                });
                colTiles[i].classList.add(`tile-${mergedValues[i]}`);
                if (colTiles[i].textContent == 2048) {
                    const clup = new Audio('../שמע/כפיים.mp3');
                    clup.play();
                    console.log(colTiles[i]);
                    document.querySelector('.win_massage').style.display = 'flex';
                }
            }
        }
    }
    updateTilePositions();
    newtile();
}
//פונקצית עזר לעדכון הערך החדש
function updateTilePositions() {
    const tiles = document.querySelectorAll('.tile');
    tiles.forEach(tile => {
        tile.style.gridRow = tile.dataset.row;
        tile.style.gridColumn = tile.dataset.col;
    });
}
//ארוע על ידי חיצי המקלדת
window.addEventListener('keydown', function (event) {
    switch (event.key) {
        case 'ArrowLeft':
            // קריאה לפונקציה שמזיזה שמאלה
            moveLeft();
            break;
        case 'ArrowRight':
            // קריאה לפונקציה שמזיזה ימינה
            moveRight();
            break;
        case 'ArrowUp':
            // קריאה לפונקציה שמזיזה למעלה
            moveUp();
            break;
        case 'ArrowDown':
            // קריאה לפונקציה שמזיזה למטה
            moveDown();
            break;
    }
});




function toggleInstructions() {
    const box = document.getElementById("instructions");
    box.style.display = box.style.display === "none" ? "block" : "none";
}

// התיבה מוסתרת כברירת מחדל
document.getElementById("instructions").style.display = "none";

function createConfetti() {
    const confettiWrapper = document.getElementById('confetti-wrapper');
    const colors = ['#ff33cc', '#33ff00', '#00d7ff', '#ffff33', '#ff6600', '#aa33ff', '#ff0033', '#33fff3', '#3366ff', '#00ffaa', '#ff4466'];
    const confettiCount = 30;

    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.left = Math.random() * window.innerWidth + 'px';
        confetti.style.top = Math.random() * window.innerHeight * 0.5 + 'px';
        confettiWrapper.appendChild(confetti);

        animateConfetti(confetti);
    }

    setTimeout(() => {
        confettiWrapper.innerHTML = '';
    }, 3000);
}

function animateConfetti(confetti) {
    const duration = 2000 + Math.random() * 2000;
    const startX = parseFloat(confetti.style.left);
    const startY = parseFloat(confetti.style.top);
    const endX = startX + (Math.random() * 100 - 50);
    const endY = startY + 200 + Math.random() * 100;
    let startTime = null;

    function animate(time) {
        if (!startTime) startTime = time;
        const elapsed = time - startTime;
        const progress = Math.min(elapsed / duration, 1);

        confetti.style.transform = `translate(${(endX - startX) * progress}px, ${(endY - startY) * progress}px) rotate(${progress * 360}deg)`;
        confetti.style.opacity = 1 - progress;

        if (progress < 1) {
            requestAnimationFrame(animate);
        }
    }
    requestAnimationFrame(animate);
}


//קפיצה של המספרים

function showScorePopup(value, color) {
    const popup = document.createElement("div");
    popup.className = "score-popup";
    popup.textContent = `+${value}`;
    popup.style.color = color; // הצבע של האריח שהתמזג

    const container = document.querySelector("#mone").parentElement;
    container.appendChild(popup);

    setTimeout(() => {
        popup.remove();
    }, 1000);
}
function getTileColor(value) {
    const colors = {
        2: "#ff33cc",
        4: "#33ff57",
        8: "#33d7ff",
        16: "#ffd633",
        32: "#ff8800",
        64: "#a633ff",
        128: "#33fff3",
        256: "#00ff00",
        512: "#ffaa00",
        1024: "#3366ff",
        2048: "#ff66ff"
    };
    return colors[value] || "#000"; // אם אין התאמה – תחזיר שחור
}

//settimeout
setTimeout(() => {
    alert("אמא את מתקדמת לניצחון את טובה!!!");
}, 10000);
//ארוע מקלדת 2
newgame = document.querySelector(".newgame");
newgame.addEventListener("mouseover", function () { createConfetti() })
