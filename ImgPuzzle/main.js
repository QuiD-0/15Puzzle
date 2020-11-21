var table;
var row;
var col;
var counter;
var move = 0;

function start(){ 
  //행렬 값 받기
  row = document.getElementById("row").value;
  col = document.getElementById("col").value;
  if (row*col==0){
    alert("0은 행또는 열 값으로 설정할수 없습니다. 다시 입력해주세요");
  }else{
    document.getElementById("start").value="섞기";
    counter = document.getElementById("count");
    table = document.getElementById("table");
    
    //이동횟수 초기화
    move = 0;
    counter.innerHTML = move;
    //퍼즐 배열 생성 [col][row] 2차원 배열
    puzzleArr = new Array(row);
    for (var i = 0; i < row; i++)
    {
      puzzleArr[i] = new Array(col);
    }
    //배열에 위치에 따라 이미지 넣기 
    var imgwidth=Math.floor(500/col);
    var imgheight=Math.floor(300/row);
    count=1;
    for (var i = 0; i < row; i++)
    {
      for (var j = 0; j < col; j++)
      {
        puzzleArr[i][j] = count+" <img src=\"./img.jpg\" style=\"left:"+(-imgwidth*j)+"px; top: "+(-imgheight*i)+"px;\">";
        count++;
      }
    }
    //마지막 조각 빈칸을 위한 0 처리
    puzzleArr[row-1][col-1]=0;
    //퍼즐 섞기
    //행을 섞은뒤 열을 섞는다.
    shuffle(puzzleArr);
    for(var i =0;i<row;i++){
      shuffle(puzzleArr[i]);
    }
    printPuzzle();
  }
}
// 배열 섞어주는 함수
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
//퍼즐 출력하는 함수
function printPuzzle(){
  var imgwidth=Math.floor(500/col);
  var imgheight=Math.floor(300/row);
  var ouput = "";
  for (var i = 0; i < row; i++)
  {
    ouput += "<tr>";
    for (var j = 0; j < col; j++)
    {
      if (puzzleArr[i][j] == 0)
      {
        ouput += "<td class=\"square\" style=\"opacity:0;\"> </td>";
      }
      else
      { 
        ouput += "<td class=\"square\" style=\" width: "+(imgwidth-3)+"px; height:"+(imgheight-3)+"px; left:"+imgwidth*j+"px; top: "+imgheight*i+"px;\" onclick=\"moveBlock(" +i+ ","+j+")\" >" + puzzleArr[i][j] + "</td>";
      }
    } 
    ouput += "</tr>";
  } 
table.innerHTML = ouput;
}
// 클릭시 이동을 위한 함수
function moveBlock(clickRow,clickCol){
  // 이동가능한지 확인 
  if (moveCheck(clickRow,clickCol)){
      //클릭 횟수 증가
      countIncrease();
  }
}
//이동 가능 확인을 위한 함수
function moveCheck(clickRow,clickCol){
  moveRow = 0;
  moveCol = 0;
  //상하좌우 한번씩 모두 체크
 for (var i=1;i<5;i++){
  switch(i){
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
    clickRow + moveRow < row && clickCol + moveCol < col){
    // 상하좌우 중에서 0 인 블록이 있으면
    if ( puzzleArr[clickRow + moveRow][clickCol + moveCol] == 0){
      //퍼즐 위치 바꿔 주고 퍼즐 출력
        puzzleArr[clickRow + moveRow][clickCol + moveCol] = puzzleArr[clickRow][clickCol];
        puzzleArr[clickRow][clickCol] = 0;
        printPuzzle();
        // 퍼즐이 완성 되었을 경우
        if(endCheck()){
          alert("축하 합니다! 점수는 "+move+"입니다.")
        }
        return true;
    }
  }
 }
 return false;
}
//클릭 횟수 증가를 위한 함수
function countIncrease(){
  move++;
  if (counter) 
  {
    counter.innerHTML = move;
  }
}
//퍼즐 완성 확인을 위한 함수
function endCheck(){
  var count=1;
  for(var i=0;i<row;i++){
    for (var j=0;j<col;j++){
      if(puzzleArr[i][j]==0||puzzleArr[i][j].split(" ")[0]==count)
      count++;
      else return false;
    }
  }
  return true;
}

