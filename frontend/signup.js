const form = document.querySelector("#signup-form");

const checkpassword = () => {
  const formdata = new FormData(form);
  const password1 = formdata.get("password");
  const password2 = formdata.get("password2");
  if (password1 === password2) {
    return true;
  } else return false;
};

const handlsubmit = async (event) => {
  event.preventDefault();
  const formdata = new FormData(form);
  const sha256password = sha256(formdata.get("password"));
  formdata.set("password", sha256password);

  const div = document.querySelector("#info");

  if (checkpassword()) {
    const res = await fetch("/signup", {
      method: "POST",
      body: formdata,
    });
    const data = await res.json();
    if (data === "200") {
      // div.innerText = "회원가입 완료";
      // div.style.color = "blue";
      alert("회원가입 완료");
      window.location.pathname = "/login.html";
    }
  } else {
    div.innerText = "비밀번호가 다릅니다";
    div.style.color = "red";
  }
};

form.addEventListener("submit", handlsubmit);
