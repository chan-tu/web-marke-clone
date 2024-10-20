const form = document.querySelector("#login-form");

const handlsubmit = async (event) => {
  event.preventDefault();
  const formdata = new FormData(form);
  const sha256password = sha256(formdata.get("password"));
  formdata.set("password", sha256password);

  const res = await fetch("/login", {
    method: "POST",
    body: formdata,
  });
  const data = await res.json();
  const accessToken = data.access_token;
  if (accessToken) {
    localStorage.setItem("token", accessToken);
    window.location.pathname - "/";
  }
  // window.sessionStorage.setItem("token", accessToken);
  alert("로그인 완료");

  // const infodiv = document.querySelector("#info");
  // infodiv.innerText = "로그인 성공 ";

  window.location.pathname = "/";

  // const btn = document.createElement("button");
  // btn.innerText = "상품 가져오기";
  // btn.addEventListener("click", async () => {
  //   const res = await fetch("/items", {
  //     headers: {
  //       Authorization: `Bearer ${accessToken}`,
  //     },
  //   });
  //   const data = await res.json();
  //   console.log(data);
  // });
  // infodiv.appendChild(btn);
};

form.addEventListener("submit", handlsubmit);
