import { users, todos } from './data.js';

const msg = document.getElementById("result");


//로컬 스토리지에 저장(로그인)
function login() {
  //로컬스토리지 한번 초기화
  window.localStorage.clear();
  const loginEmail = document.getElementById("email").value;
  const loginPassword = document.getElementById("password").value;

  //빈것 체크
  if (empty(loginEmail, loginPassword)) {
    users.forEach(user => {
      if (user.email == loginEmail && user.password == loginPassword) {
        localStorage.setItem("userEmail", loginEmail);
        localStorage.setItem("userPassword", loginPassword);

        //로그인된 사람만 사용되는 인증키1
        localStorage.setItem("accesskey", "1");

        //todo페이지 이동
        window.location.href = "./todo.html";
      }
    });
  }
}

function empty(email, password) {
  if (!email || !password) {
    msg.textContent = "모든 항목을 입력해주세요.";
    return 0;
  } else {
    return 1;
  }
}

function todoList() {
  todos.forEach((todo, movCount) => {
    
    const template =
      `<div class="col-sm-3 mb-3 mb-sm-5">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">${todo.title}</h5>
              <p class="card-text">${todo.description}</p>
              <span>${todo.isCompleted ? "완료" : "미완료"}</span>
                    <div class="form-check form-switch form-check-reverse">
                        <input class="form-check-input" type="checkbox" id="switchCheckReverse" ${todo.isCompleted? "checked" : ""}></input>
                        <label class="form-check-label" for="switchCheckReverse">상태변경</label>
                    </div>
            </div>
          </div>
        </div>`;

    document.getElementById("todoList").insertAdjacentHTML("beforeend", template);
  });
};
//실행
todoList();



//함수가 화면에 안불러와지니 화면.함수이름으로 변수를 지정해놓는다.
window.login = login;
window.empty = empty;
window.todoList = todoList;