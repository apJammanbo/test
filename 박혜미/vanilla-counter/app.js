function onload() {
  var undoButton = document.getElementById("undoButton");
  var addButton = document.getElementById("addButton");
  var subButton = document.getElementById("subButton");
  var redoButton = document.getElementById("redoButton");

  undoButton.onclick = handleClick;
  addButton.onclick = handleClick;
  subButton.onclick = handleClick;
  redoButton.onclick = handleClick;
}

// 이전 내역이 있을 경우에는 undo, 다음 내역이 있을 경우에는 redo
// undo 를 한 후 redo 값이 있는 상태에서 값 입력 후 값 계산을 할 경우 기존 redo 값은 새로 갱신된다.

// input에 숫자를 입력하고 + 버튼을 클릭하면 결과값에 입력한 숫자 만큼 더해지고 input의 값은 없어진다.
// input에 숫자를 입력하고 - 버튼을 클릭하면 결과값에 입력한 숫자 만큼 빼지고 input의 값은 없어진다.
// input에 유효하지 않은 숫자를 입력하고 +, - 버튼을 클릭하면 동작은 무시 되되고 input의 값은 없어진다.(정수만 입력할 수 있다.)

// undo를 클릭하면 이전 값으로 돌아간다. undo 버튼을 클릭해도 이전 인풋값은 유지 된다.
// redo를 클릭하면 이후 값으로 되돌린다. redo 버튼을 클릭해도 이전 인풋값은 유지 된다.
// undo와 redo는 동작이 가능할때만 활성화 상태가 된다.

// input에 유효한 숫자를 입력하고 +, - 버튼을 클릭했을때 이후 값들은 없어지고 Redo 버튼은 비활성화된다.
// -> 1 입력 후 + : 결과값 1
// -> 2 입력 후 + : 결과값 3
// -> 3 입력 후 + : " 결과값 6
// -> undo 버튼 : 결과값 3
// -> 4 입력 후 + : 결과값 7
// -> undo 버튼 : 결과값 3 -> redo 버튼 활성화
// -> undo 버튼 : 결과값 1
// -> undo 버튼 : 결과갑 0 -> undo 버튼 비활성화
// -> redo 버튼 : 결과갑 1 -> undo 버튼 활성화

// 숫자 결과 값 기록
var resultNums = [0];
var doIdx = 0; // undo,redo 용 idx

function handleClick(event) {
  // 클릭 된 버튼의 ID
  var eventBtnId = event.target.id;
  // 입력 된 값
  var inNum = document.getElementById("inputbox").value;
  // 현재 결과 값
  var resultNum = document.getElementById("valuebox").innerHTML;

  //정수가 아닐 경우 값 제거 및 무시
  if (eventBtnId == "addButton" || eventBtnId == "subButton") {
    if (inNum == "" || inNum % 1 !== 0) {
      document.getElementById("inputbox").value = "";
      return;
    } else {
      resultNum = eventBtnId == "addButton" ? resultNum * 1 + inNum * 1 : resultNum * 1 - inNum * 1;

      // 컨트롤 발생 시 redo 결과 들은 다 사라짐
      resultNums.splice(doIdx + 1, resultNums.length - doIdx);

      document.getElementById("valuebox").innerHTML = resultNum;
      resultNums.push(resultNum); // 결과값 저장

      doIdx = resultNums.length - 1; // undo, redu idx 초기화
    }
  } else {
    if (eventBtnId == "undoButton") {
      doIdx--;
    } else {
      doIdx++;
    }
    resultNum = resultNums[doIdx];
    document.getElementById("valuebox").innerHTML = resultNum;
  }

  if (doIdx != 0) {
    // 결과 값 리스트에 값이 들어 있을 경우 undo 활성화
    document.getElementById("undoButton").removeAttribute("disabled");
  } else {
    document.getElementById("undoButton").setAttribute("disabled", "");
  }
  if (doIdx != resultNums.length - 1) {
    // undo 클릭 시 redo 활성화
    document.getElementById("redoButton").removeAttribute("disabled");
  } else {
    document.getElementById("redoButton").setAttribute("disabled", "");
  }
}
