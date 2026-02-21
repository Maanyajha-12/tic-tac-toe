let boxes = [...document.querySelectorAll('.box')];
        let resetBtn = document.querySelector('#reset');
        let turnO = true;
        let newGameBtn = document.querySelector('#new-btn');
        let tttmatrix = document.querySelector('.tttmatrix');
        let winnermsg = document.querySelector('#winnermsg');
        

        const winPatterns = [
            [0, 1, 2],
            [0, 3, 6],
            [0, 4, 8],
            [1, 4, 7],
            [2, 5, 8],
            [2, 4, 6],
            [3, 4, 5],
            [6, 7, 8]
        ];

        boxes.forEach((box) => {
            box.addEventListener('click', function () {
                if (turnO) {
                    box.innerText = 'O';
                    box.style.color = 'blue';
                    turnO = false;
                    box.disabled = true;
                    checkWinner();
                } else {
                    box.innerText = 'X';
                    box.style.color = 'black';
                    turnO = true;
                    box.disabled = true;
                    checkWinner();
                }
            });
        });

        const enableBoxes = () => {
            for (let box of boxes) {
                box.disabled = false;
                box.innerText = "";
            }
        };

        const disableBoxes = () => {
            for (let box of boxes) {
                box.disabled = true;
            }
        };

        const showWinner = (winner) => {
            winnermsg.innerText = `Congratulations, Winner is ${winner}`;
            tttmatrix.classList.remove('hide');
            disableBoxes();
        };

        const checkWinner = () => {
            let winnerfound = false;
            for (let pattern of winPatterns) {
                let pos1 = boxes[pattern[0]].innerText;
                let pos2 = boxes[pattern[1]].innerText;
                let pos3 = boxes[pattern[2]].innerText;

                if (pos1 !== "" && pos2 !== "" && pos3 !== "" && 
                    pos1 === pos2 && pos2 === pos3) {
                    showWinner(pos1);
                    winnerfound = true;
                    return;
                }
            }

            if (!winnerfound) {
                const allBoxes = [...boxes].every((box) => box.innerText !== "");
                if (allBoxes) {
                    tttmatrix.classList.remove('hide');
                    winnermsg.innerText = 'Match Drawn';
                }
            }
        };

        const resetGame = () => {
            turnO = true;
            enableBoxes();
            tttmatrix.classList.add('hide');
        };

    newGameBtn.addEventListener('click', resetGame);
    resetBtn.addEventListener('click', resetGame);