// messages.js – Tự động tạo 1000 lời chúc yêu thương

const openings = [
  "Anh yêu em", "Em là cả thế giới của anh", "Mỗi khoảnh khắc bên em",
  "Có em trong đời", "Anh luôn nhớ em", "Tình yêu của anh dành cho em",
  "Ánh mắt em", "Nụ cười của em", "Bàn tay em", "Trái tim em"
];

const middles = [
  "là món quà tuyệt vời nhất", "khiến anh rung động", "làm anh ấm áp hơn",
  "làm anh hạnh phúc mỗi ngày", "luôn ở trong tim anh", "thật đẹp biết bao",
  "làm anh không thể rời mắt", "làm trái tim anh loạn nhịp", "đáng yêu vô cùng",
  "là điều tuyệt diệu nhất anh từng biết"
];

const endings = [
  "Mãi yêu em 💖", "Yêu em trọn đời 💘", "Chỉ cần em luôn bên anh 💑",
  "Chúng ta sẽ mãi bên nhau 🥰", "Anh sẽ luôn chờ em 💌", "Cùng nhau đi hết cuộc đời 💕",
  "Em là định mệnh của anh 💞", "Mỗi ngày có em là một ngày hạnh phúc 🌹",
  "Dù thế nào, anh cũng luôn yêu em 😘", "Chỉ cần có em là đủ 💗"
];

// Hàm tạo 1000 câu ngẫu nhiên không trùng lặp
function generateLoveMessages(count = 1000) {
  const set = new Set();
  while (set.size < count) {
    const msg = `${random(openings)} ${random(middles)}. ${random(endings)}`;
    set.add(msg);
  }
  return Array.from(set);
}

function random(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// Tạo mảng và gán ra biến toàn cục
const loveMessages = generateLoveMessages();
