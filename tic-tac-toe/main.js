// クリックしたら○×を記入
// クリック回数が奇数なら◯偶数なら✕をクリックした場所に記入
// クリックしたタイミング

document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('.cell');
    let currentPlayer = 'O';
    let isEnd = false;

    cells.forEach(cell => {
        cell.addEventListener('click', () => {
            if (cell.textContent === '') {
                cell.textContent = currentPlayer;
                console.log(cell.textContent);
                isEnd = checkEnd(Array.from(cells), currentPlayer);
                if (isEnd) {
                    alert(`Player ${currentPlayer} is winner.`);
                }
                currentPlayer = currentPlayer === 'O' ? 'X' : 'O';
            }
        });
    });
});

// 勝利判定
// 勝利条件となる3つの組み合わせを配列とし、その配列のいずれかの組み合わせを currentPlayer の記号で満たしていればそのプレイヤーが勝利。
function checkEnd(cellArray, currentPlayer) {
    console.log(`cellArray: ${cellArray}`);
    const winnerConditions = [[0, 1, 2], [0, 4, 8], [0, 3, 6], [1, 4, 7], [2, 4, 6], [2, 5, 8], [3, 4, 5], [6, 7, 8]];
    const indices = cellArray.reduce((indices, cell, index) => {
        if (cell.textContent === currentPlayer) {
            indices.push(index);
        }
        return indices;
    }, []);

    return isContainedArray(indices, winnerConditions);
};

// subArray のすべての要素に対して、array に含まれているか否かを確認している
// return: boolean
function containsSubArray(array, subArray) {
    return subArray.every(element => array.includes(element))
}

// twoDimensionsArray のすべての配列に対して containsSubArray を実行し、一つでも true であれば true を返す
// return: boolean
function isContainedArray(array, twoDimensionsArray) {
    console.log(`array: ${array}`);
    console.log(`twoDimensionsArray: ${twoDimensionsArray}`);
    return twoDimensionsArray.some(subArray => containsSubArray(array, subArray));
}

// TODO List

// TypeScrip にする
// React にする
// NodeJS にする
// 例外処理いれる
// テストコード書く(UT)
// テスト検討する(ST)