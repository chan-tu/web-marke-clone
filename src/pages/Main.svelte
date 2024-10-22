<!-- <div>Main 페이지</div> -->
<script>
  import { onMount } from "svelte";
  import { getDatabase, ref, onValue } from "firebase/database";
  import Nav from "../components/Nav.svelte";

  let hour = new Date().getHours();
  let min = new Date().getMinutes();

  $: items = [];
  // 'items'를 반응형 변수로 선언
  // 값이 업데이트 될때 마다 Svelte가 알아서 화면을 업데이트 함

  const calcTime = (timestamp) => {
    const curTime = new Date().getTime() - 9 * 60 * 60 * 1000;
    const time = new Date(curTime - timestamp);
    const hour = time.getHours();
    const minute = time.getMinutes();
    const second = time.getSeconds();

    if (hour > 0) return `${hour}시간 전`;
    else if (minute > 0) return `${minute}분 전`;
    else if (second >= 0) return `${second}초 전`;
  };

  const db = getDatabase();
  const itemsRef = ref(db, "items/");

  onMount(() => {
    onValue(itemsRef, (snapshot) => {
      const data = snapshot.val();
      items = Object.values(data).reverse();
    });
    // 'onValue'은 딱 한번만 실행 되고 이후 새로운 데이터를 가져오지 않음
  });
  // 화면이 보여질 때마다 계속 실행되게 하고 싶을 때마다 'onMount' 사용
</script>

<header>
  <!-- 인포 -->
  <div class="info-bar">
    <div class="info-bar__time">{hour}:{min}</div>
    <div class="info-bar__icon">
      <img src="assets/char-bar.svg" alt="차트" />
      <img src="assets/wifi.svg" alt="와이파이" />
      <img src="assets/bettery.svg" alt="배터리" />
    </div>
  </div>
  <!-- 상단 메뉴 -->
  <div class="menu-bar">
    <div class="menu-bar__location">
      <div>강남</div>
      <div class="menu-bar__iconi">
        <img src="assets/arrow.svg" alt="" />
      </div>
    </div>
    <div class="menu-bar__icon">
      <img src="assets/search.svg" alt="" />
      <img src="assets/menu.svg" alt="" />
      <img src="assets/bell.svg" alt="" />
    </div>
  </div>
</header>
<!-- 메인 -->
<main>
  {#each items as item}
    <div class="=item-list">
      <div class="item-list__img">
        <img alt={item.title} src={item.imgurl} />
      </div>
      <div class="item-list__info">
        <div class="item-list__info-title">{item.title}</div>
        <div class="item-list__info-meta">
          {item.place}
          {calcTime(item.insertAt)}
        </div>
        <div class="item-list__info-price">{item.price}</div>
        <div>{item.description}</div>
      </div>
    </div>
  {/each}
  <a class="width-btn" href="#/write">+ 글씨기</a>
</main>

<Nav location="home" />

<!-- <div class="media-info-msg">화면을 축소 해주세요</div> -->

<style>
  .info-bar__time {
    color: red;
  }
</style>
