        let boxes = [...document.querySelectorAll('.box')];
        let resetBtn = document.querySelector('#reset');
        let turnO = true;
        let hidden = document.querySelector('.hidden');
        let winnermsg = document.querySelector('#winnermsg');
        let player1Input = document.querySelector("#player1");
        let player2Input = document.querySelector("#player2");
        let startBtn = document.querySelector("#start-btn");
        let player1Name = "Player 1";
        let player2Name = "Player 2";
        startBtn.addEventListener("click", () => {
    player1Name = player1Input.value || "Player 1";
    player2Name = player2Input.value || "Player 2";

    document.querySelector(".player-inputs").style.display = "none";
});

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

        function enableBoxes() {
         for (let i = 0; i < boxes.length; i++) {
            boxes[i].disabled = false;
            boxes[i].innerText = "";
    }
}

        function disableBoxes() {
             for (let i = 0; i < boxes.length; i++) {
                 boxes[i].disabled = true;
    }
}

    function showWinner(winner) {
        let winnerName = winner === "O" ? player1Name : player2Name;
         winnermsg.innerText = `Congratulations ${winnerName} You won!`;
          hidden.classList.remove("hide");
          disableBoxes();
}
          

    function checkWinner() {
        let winnerfound = false;

        for (let pattern of winPatterns) {
        let pos1 = boxes[pattern[0]].innerText;
        let pos2 = boxes[pattern[1]].innerText;
        let pos3 = boxes[pattern[2]].innerText;

        if (pos1 !== "" && pos2 !== "" && 
            pos3 !== "" && 
            pos1 === pos2 && pos2 === pos3) {

            showWinner(pos1);
            winnerfound = true;
            return;
        }
    }

    if (!winnerfound) {
        const allBoxes = [...boxes].every(function(box) {
            return box.innerText !== "";
        });

        if (allBoxes) {
            hidden.classList.remove('hide');
            winnermsg.innerText = 'Match Drawn';
        }
    }
}

        function resetGame() {
            turnO = true;
            enableBoxes();
            hidden.classList.add('hide');
}

    resetBtn.addEventListener('click', resetGame);