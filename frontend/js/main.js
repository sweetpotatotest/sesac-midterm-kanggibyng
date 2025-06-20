import { users } from './data.js';

const msg = document.getElementById("result");

//로컬 스토리지에 저장
function login() {
  const loginEmail = document.getElementById("email").value;
  const loginPassword = document.getElementById("password").value;
  //빈것 체크
  if (1) {
    console.log(11);
    
    users.forEach(user => {
      if (user.email === loginEmail && user.email === loginPassword) {
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



//함수가 화면에 안불러와지니 화면.함수이름으로 변수를 지정해놓는다.
window.login = login;
window.empty = empty;