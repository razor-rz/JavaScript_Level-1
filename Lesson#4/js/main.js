function task1() {
  let n = prompt("Введите любое число от 0");
  let obj = {};
  if (n < 10) {
    obj.one = n;
    obj.ten = 0;
    obj.hun = 0;
  } else if (n < 1000) {
    obj.one = n % 10;
    obj.ten = Math.floor(n / 10) % 10;
    obj.hun = Math.floor(n / 100) % 10;
  }
  console.log(obj);
}

function task2() {
  let arrPC = [];
  while (arrPC.length < 4) {
    let r = Math.floor(Math.random() * 10);
    if (arrPC.indexOf(r) < 0) arrPC.push(r);
  }
  console.log(arrPC);

  let playersNum = prompt("Укажите любое число 4-х значное число");
  let arrPlayer = [];
  for (let i = 0; i < 4; i++) {
    let newElements = parseInt(playersNum.substr(i, 1));
    arrPlayer.push(newElements);
  }
  console.log(arrPlayer);
}
