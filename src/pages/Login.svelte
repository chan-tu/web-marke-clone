<!-- <div>Login 페이지</div> -->
<!-- <form id="login-form" action="/login" method="POST">
  <div>로그인</div>
  <div>
    <label for="id">아이디</label>
    <input type="text" id="id" name="id" required />
  </div>
  <div>
    <label for="password">비밀번호</label>
    <input type="password" id="password" name="password" required />
  </div>
  <div>
    <button type="submit">로그인</button>
  </div>
  <div id="info"></div>
</form> -->
<script>
  import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
  import { user$ } from "../store";

  const provider = new GoogleAuthProvider();
  const auth = getAuth();

  const loginwithgoole = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;
      user$.set(user);
      localStorage.setItem("token", token);
    } catch (error) {
      console.error(error);
      // Handle Errors here.
      // const errorCode = error.code;
      // const errorMessage = error.message;
      // The email of the user's account used.
      // const email = error.customData.email;
      // The AuthCredential type that was used.
      // const credential = GoogleAuthProvider.credentialFromError(error);
    }
  };

  // .then((result) => {
  //   // This gives you a Google Access Token. You can use it to access the Google API.
  //   // const credential = GoogleAuthProvider.credentialFromResult(result);
  //   // const token = credential.accessToken;
  //   // The signed-in user info.
  //   // const user = result.user;
  //   // IdP data available using getAdditionalUserInfo(result)
  //   // ...
  // })
</script>

<div>
  <!-- {#if $user$}
    <div>{$user$?.displayName}로그인 완료</div>
  {/if} -->
  <div>로그인</div>
  <button class="login-btn" on:click={loginwithgoole}>
    <img
      class="google-img"
      src="https://w7.pngwing.com/pngs/869/485/png-transparent-google-logo-computer-icons-google-text-logo-google-logo.png"
      alt=""
    />
    <div>Googl로 시작</div>
    <div />
  </button>
</div>

<style>
  .login-btn {
    width: 125px;
    height: 50px;
    border: 1px solid gray;
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    border-radius: 10px;
  }
  .google-img {
    width: 20px;
  }
</style>
