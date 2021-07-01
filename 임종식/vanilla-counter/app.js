// 제일 잘함
// 한번더 마킹

let redoStack = []; // redo 용 스택
let undoStack = []; // undo 용 큐
let globalValue = 0;

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

function handleClick(event) {
  const {
    target: { id },
  } = event;
  let { value } = document.getElementById("inputbox");

  switch (id) {
    case "addButton":
      addValue(value);
      break;
    case "subButton":
      subValue(value);
      break;
    case "undoButton":
      undo();
      break;
    case "redoButton":
      redo();
      break;
    default:
      alert("장애 발생");
      break;
  }
}

/**
 * @title 값 적용 핸들
 * @description 계산된 값을 valuebox에 적용시킨다. inputBox 초기화 한다.
 */
const applyValueOnBox = (value, isInitInputbox = true) => {
  let valueBox = document.getElementById("valuebox");

  valueBox.innerText = value;
  globalValue = value;

  // 입력박스 초기화 여부를 기준하여 inputbox 갱신
  if (isInitInputbox) {
    initialInputValue();
  }

  console.log("redoStack: ", redoStack);
  console.log("undoStack: ", undoStack);
  console.log("globalValue: ", globalValue);
};

/**
 * @title 입력 창 초기화
 * @description inputbox에 값을 초기화한다.
 */
const initialInputValue = () => {
  let inputbox = document.getElementById("inputbox");

  inputbox.value = null;
};

/**
 * @title 뒤로가기 핸들
 * @description 결과를 이전 값으로 돌린다. 기존의 값은 redoStack에 추가
 */
const undo = () => {
  let value = popUndoStack();

  pushRedoStack(globalValue); // redoStack 추가
  applyValueOnBox(value, false);
};

/**
 * @title 앞으로 가기 핸들
 * @description redoStack에 들어가있는 가장 최신값을 로드한다.
 */
const redo = () => {
  let value = popRedoStack();

  pushUndoStack(globalValue);
  applyValueOnBox(value, false);
};

/**
 * @title 더하기 핸들
 * @description 기존 값에서 입력한 값을 더하기 연산
 * 입력값 null 체크
 * 입력값 Number 파싱
 * 기존 값 Undo에 push
 * 값 피드백
 * redo 초기화
 */
const addValue = (value) => {
  if (checkNullNaN(value)) {
    initialInputValue();
    return;
  }

  const newValue = parseToNumber(value) + globalValue;

  pushUndoStack(globalValue);
  applyValueOnBox(newValue);
  initRedoStack();
};

/**
 * @title 빼기 핸들
 * @description 기존 값에서 입력한 값을 빼기 연산
 * 입력값 null 체크
 * 입력값 Number 파싱
 * 기존 값 Undo에 push
 * 값 피드백
 * redo 초기화
 */
const subValue = (value) => {
  if (checkNullNaN(value)) {
    initialInputValue();
    return;
  }

  const newValue = globalValue - parseToNumber(value);

  pushUndoStack(globalValue);
  applyValueOnBox(newValue);
  initRedoStack();
};

/**
 * @title inputbox 값 null 체크 및 isNaN 체크
 */
const checkNullNaN = (value) => {
  if (value === null || value === undefined || value === "") {
    return true;
  }

  return isNaN(parseFloat(value)) ? true : false;
};

/* stack handlers */

/**
 * @title undo 스택 삽입
 */
const pushUndoStack = (value) => {
  let undobutton = document.getElementById("undoButton");
  undoStack.push(value);

  undobutton.disabled = false;
};

/**
 * @title undo 스택 추출
 */
const popUndoStack = () => {
  let undobutton = document.getElementById("undoButton");
  let value = undoStack.pop();

  if (undoStack.length === 0) {
    undobutton.disabled = true;
  }

  return value;
};

/**
 * @title redo 스택 삽입
 */
const pushRedoStack = (value) => {
  let redobutton = document.getElementById("redoButton");
  redoStack.push(value);

  redobutton.disabled = false;
};

/**
 * @title redo 스택 추출
 */
const popRedoStack = () => {
  let redobutton = document.getElementById("redoButton");
  let value = redoStack.pop();

  if (redoStack.length === 0) {
    redobutton.disabled = true;
  }

  return value;
};

/**
 * @title redo 스택 초기화
 */
const initRedoStack = () => {
  let redobutton = document.getElementById("redoButton");

  redoStack = [];
  redobutton.disabled = true;
};

/**
 * @title number 파싱
 */
const parseToNumber = (str) => {
  const type = typeof str;
  if (type === "number") {
    return str;
  } else if (type === "string") {
    let result = parseFloat(str);
    return result;
  } else {
    console.log("type: ", type);
    alert("타입 장애");
  }
};
