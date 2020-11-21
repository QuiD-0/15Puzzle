var table;
var row;
var col;
var counter;
var move = 0;

function start() {
    //행렬 값 받기
    row = document.getElementById("row").value;
    col = document.getElementById("col").value;
    if (row * col == 0) {
        alert("0은 행또는 열 값으로 설정할수 없습니다. 다시 입력해주세요");
    } else {
        document.getElementById("start").value = "섞기";
        counter = document.getElementById("count");
        table = document.getElementById("table");

        //이동횟수 초기화
        move = 0;
        counter.innerHTML = move;
        //숫자 배열 생성 0~(n-1) 총 N개(N= row X col) 
        var matrix = row * col;
        var numberArr = new Array();
        for (var i = 0; i < matrix; i++) {
            numberArr.push(i);
        }
        //무작위로 섞기 배열의 0 ~ (n-1)까지가 랜덤한 순서로 섞임
        shuffle(numberArr);
        //퍼즐 배열 생성 [col][row] 2차원 배열
        puzzleArr = new Array(row);
        for (var i = 0; i < row; i++) {
            puzzleArr[i] = new Array(col);
        }
        //배열에 섞은 무작위 값 넣기
        var count = 0;
        for (var i = 0; i < row; i++) {
            for (var j = 0; j < col; j++) {
                puzzleArr[i][j] = numberArr[count];
                count++;
            }
        }
        printPuzzle();
    }
}
// 배열 섞어주는 함수
function shuffle(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
    }
}
//퍼즐 출력하는 함수
function printPuzzle() {
    var ouput = "";
    for (var i = 0; i < row; i++) {
        ouput += "<tr>";
        for (var j = 0; j < col; j++) {
            if (puzzleArr[i][j] == 0) {
                ouput += "<td class=\"zero\"> </td>";
            } else {
                ouput += "<td class=\"square\" onclick=\"moveBlock(" + i + "," + j + ")\">" + puzzleArr[i][j] + "</td>";
            }
        }
        ouput += "</tr>";
    }
    table.innerHTML = ouput;
}
// 클릭시 이동을 위한 함수
function moveBlock(clickRow, clickCol) {
    // 이동가능한지 확인 
    if (moveCheck(clickRow, clickCol)) {
        //클릭 횟수 증가
        countIncrease();
    } else {
        //움직일수 없을경우 배경색 바꾸기
        document.getElementsByTagName("tr")[clickRow].children[clickCol].style.backgroundColor = "coral";
    }
}
//이동 가능 확인을 위한 함수
function moveCheck(clickRow, clickCol) {
    moveRow = 0;
    moveCol = 0;
    //상하좌우 한번씩 모두 체크
    for (var i = 1; i < 5; i++) {
        switch (i) {
            case 1:
                moveRow = -1;
                moveCol = 0;
                break;
            case 2:
                moveRow = 1;
                moveCol = 0;
                break;
            case 3:
                moveRow = 0;
                moveCol = -1;
                break;
            case 4:
                moveRow = 0;
                moveCol = 1;
                break;
        }
        // 클릭한 곳 기준으로 상하좌우로 움직였을때 (0,0)~(row,col)안에 있는지 체크
        if (clickRow + moveRow >= 0 && clickCol + moveCol >= 0 &&
            clickRow + moveRow < row && clickCol + moveCol < col) {
            // 상하좌우 중에서 0 인 블록이 있으면
            if (puzzleArr[clickRow + moveRow][clickCol + moveCol] == 0) {
                //퍼즐 위치 바꿔 주고 퍼즐 출력
                puzzleArr[clickRow + moveRow][clickCol + moveCol] = puzzleArr[clickRow][clickCol];
                puzzleArr[clickRow][clickCol] = 0;
                printPuzzle();
                // 퍼즐이 완성 되었을 경우
                if (endCheck()) {
                    alert("축하 합니다! 점수는 " + move + "입니다.")
                }
                return true;
            }
        }
    }
    return false;
}
//클릭 횟수 증가를 위한 함수
function countIncrease() {
    move++;
    if (counter)
    {
        counter.innerHTML = move;
    }
}
//퍼즐 완성 확인을 위한 함수
function endCheck() {
    count = 1;
    for (var i = 0; i < row; i++) {
        for (var j = 0; j < col; j++) {
            if (puzzleArr[i][j] == count || puzzleArr[i][j] == 0)
                count++;
            else return false;
        }
    }
    return true;
}
