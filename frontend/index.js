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

const renderData = (data) => {
  const main = document.querySelector("main");
  data.reverse().forEach(async (obj) => {
    // console.log(obj.id);
    const div = document.createElement("div");
    div.className = "item-list";

    const imgdiv = document.createElement("div");
    imgdiv.className = "item-list__img";

    const img = document.createElement("img");
    const res = await fetch(`/images/${obj.id}`);
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    img.src = url;

    const infodiv = document.createElement("div");
    infodiv.className = "item-list__info";

    const infotitlediv = document.createElement("div");
    infotitlediv.className = "item-list__info-title";
    infotitlediv.innerText = obj.title;

    const infometadiv = document.createElement("div");
    infometadiv.className = "item-list__info-meta";
    infometadiv.innerText = obj.place + " " + calcTime(obj.insertAt);

    const infopricediv = document.createElement("div");
    infopricediv.className = "item-list__info-price";
    infopricediv.innerText = obj.price;
    imgdiv.appendChild(img);
    infodiv.appendChild(infotitlediv);
    infodiv.appendChild(infometadiv);
    infodiv.appendChild(infopricediv);
    imgdiv.appendChild(img);
    div.appendChild(imgdiv);
    div.appendChild(infodiv);
    main.appendChild(div);
  });
};
const fetchlist = async () => {
  const res = await fetch("/items");
  const data = await res.json();
  //console.log(data);
  renderData(data);
};

fetchlist();
