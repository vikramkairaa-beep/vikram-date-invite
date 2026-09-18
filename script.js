const screens = document.querySelectorAll(".card");
const mailScreen = document.getElementById("mailScreen");
const noBtn = document.getElementById("noBtn");
const choiceArea = document.getElementById("choiceArea");
const hint = document.getElementById("hint");

function openInvite(){
  mailScreen.classList.remove("active");
  document.getElementById("screen1").classList.add("active");
}

function showScreen(n){
  mailScreen.classList.remove("active");
  screens.forEach((s,i)=>s.classList.toggle("active",i===n-1));
}

/* Playful NO button: it moves away when they try to click/touch it. */
function moveNo(){
  const area = choiceArea.getBoundingClientRect();
  const btn = noBtn.getBoundingClientRect();
  const maxX = Math.max(0, area.width - btn.width);
  const maxY = Math.max(0, area.height - btn.height);
  const x = Math.random() * maxX;
  const y = Math.random() * maxY;
  noBtn.style.position = "absolute";
  noBtn.style.left = x + "px";
  noBtn.style.top = y + "px";
  hint.textContent = "Haha 😭 NO is feeling shy... try again!";
}
noBtn.addEventListener("mouseenter", moveNo);
noBtn.addEventListener("pointerdown", function(e){
  e.preventDefault();
  moveNo();
});
noBtn.addEventListener("touchstart", function(e){
  e.preventDefault();
  moveNo();
},{passive:false});

function sayYes(){
  showScreen(2);
  document.getElementById("date").focus();
}

function setDate(){
  const date=document.getElementById("date").value;
  const time=document.getElementById("time").value;
  const error=document.getElementById("error");
  if(!date || !time){
    error.textContent="Pick a date and time first 😌";
    return;
  }
  const d=new Date(date+"T00:00:00");
  const formatted=d.toLocaleDateString("en-IN",{day:"2-digit",month:"2-digit",year:"numeric"});
  document.getElementById("selectedDate").textContent=`Your selected date: ${formatted} • ${time}`;
  document.getElementById("selectedDate").style.display="block";
  error.textContent="";
  showScreen(3);
}

function niceTry(){
  document.getElementById("confirmedDate").textContent=
    document.getElementById("selectedDate").textContent.replace("Your selected date:","Confirmed:");
  showScreen(4);
}

function restart(){
  document.getElementById("date").value="";
  document.getElementById("time").value="";
  document.getElementById("selectedDate").style.display="none";
  noBtn.style.position="static";
  noBtn.style.left="";
  noBtn.style.top="";
  hint.textContent="Try clicking NO 👀";
  screens.forEach(s=>s.classList.remove("active"));
  mailScreen.classList.add("active");
}