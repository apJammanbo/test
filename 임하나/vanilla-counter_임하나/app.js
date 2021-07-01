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

let input = document.getElementById('inputbox');
let result = document.getElementById('valuebox');
let mementos = [];
let mementos2 = [];

function handleClick(event) {

  if(isNaN(input.value) || !Number.isInteger(Number(input.value))) {
    input.value = '';

  } else {
    console.log(event.target)
    console.log(event.target.id)
    const id = event.target.id;
   
    if(id === 'addButton'){
      add();
    }else if(id === 'subButton'){
      sub();
    }else if(id === 'redoButton') {
      redo();
    }else if(id === 'undoButton') {
      undo();
    }
  }
}

function add(){
  const prevValue = result.innerHTML;
  result.innerHTML = parseInt(result.innerHTML) + parseInt(input.value);
  mementos.push(prevValue);
  console.log(mementos);
  input.value='';
  numlist();
}

function sub() {
  const prevValue = result.innerHTML;
  result.innerHTML = parseInt(result.innerHTML) - parseInt(input.value);
  mementos.push(prevValue);
  console.log(mementos);
  input.value = '';
  numlist();
}

function undo() {
  mementos2.push(result.innerHTML);
  result.innerHTML = mementos.pop();
  console.log(mementos);
  console.log(mementos2);
  numlist();
}

function redo(){
  console.log('redo action!')
  mementos.push(result.innerHTML);
  result.innerHTML = mementos2.pop();
  console.log(mementos);
  console.log(mementos2);
  numlist();
}



function numlist() {
  if(mementos.length < 1) {
    document.getElementById('undoButton').disabled = true;
  } else {
    document.getElementById('undoButton').disabled = false;
  }
  if(mementos2.length < 1) {
    document.getElementById('redoButton').disabled = true;
  } else {
    document.getElementById('redoButton').disabled = false;
  }
}
