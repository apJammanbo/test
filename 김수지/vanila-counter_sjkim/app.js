var arrResult = [0]; // 연산결과 저장
var numIdx = 0; // arrResult의 포인터 대용
var $valueBox; // valuebox dom
var $inputBox; // inputbox dom

function onload() {

  $valueBox = document.getElementById('valuebox');
  $inputBox = document.getElementById('inputbox');

  var undoButton = document.getElementById("undoButton");
  var addButton = document.getElementById("addButton");
  var subButton = document.getElementById("subButton");
  var redoButton = document.getElementById("redoButton");
  
  undoButton.onclick = handleClick;
  addButton.onclick = handleClick;
  subButton.onclick = handleClick;
  redoButton.onclick = handleClick;
}

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

function handleClick(event) {

  console.log(Number.isInteger($inputBox.value));

  if( isNaN($inputBox.value) || !Number.isInteger(Number($inputBox.value)) ) { // NaN과 정수를 제외한 실수인 경우 input값 없애기
    $inputBox.value = '';
  } else {
    var targetId = event.target.id;
    var valValueBox = Number($valueBox.innerText);
    var valInputBox = Number($inputBox.value);
      
    // 버튼별 case 분리
    if(targetId === 'addButton') {
      arrResult.push(add(valValueBox, valInputBox));
    } else if(targetId === 'subButton') {
      arrResult.push(sub(valValueBox, valInputBox));
    } else if(targetId === 'undoButton') {
      numIdx++;
      undo();
    } else if(targetId === 'redoButton') {
      numIdx--;
      redo();
    } else {
      alert('targetId 확인 필요');
    }
  
  
    //undo버튼 활성화/비활성화 제어
    if(arrResult.length > 1 && arrResult.length - 2 - numIdx >= 0) {
      document.getElementById('undoButton').disabled = false;
    } else {
      document.getElementById('undoButton').disabled = true;
    }
  
    //redo버튼 활성화/비활성화 제어
    if(arrResult.length > 1 && numIdx > 0 ) {
      document.getElementById('redoButton').disabled = false;
    } else {
      document.getElementById('redoButton').disabled = true;
    }
  }
  
}



function redo() {
  $valueBox.innerText = arrResult[arrResult.length - 1 - numIdx];
}

function undo() {
  $valueBox.innerText = arrResult[arrResult.length - 1 - numIdx];
}

function add(v, i) {
  var addResult = v + i;
  $valueBox.innerText = addResult;
  return addResult;
}

function sub(v, i) {
  var subResult = v - i;
  $valueBox.innerText = subResult;
  return subResult;
}