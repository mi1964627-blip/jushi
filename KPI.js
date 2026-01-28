function register(){
  const fullName = fullName.value;
  const phone = phone.value;
  const job = job.value;
  const empId = empId.value;
  const email = registerEmail.value;
  const password = registerPassword.value;

  if(!fullName || !phone || !job || !empId || !email || !password){
    msg.innerText = "املأ كل البيانات";
    return;
  }

  auth.createUserWithEmailAndPassword(email,password)
    .then(user=>{
      return db.ref("users/"+user.user.uid).set({
        fullName, phone, job, empId, email
      });
    })
    .then(()=>{
      msg.innerText="تم إنشاء الحساب ✔";
      showLogin();
    })
    .catch(err=>msg.innerText=err.message);
}

/* Login */
function login(){
  auth.signInWithEmailAndPassword(loginEmail.value, loginPassword.value)
    .catch(err=>msg.innerText=err.message);
}

/* Logout */
function logout(){
  auth.signOut().then(()=>{
    location.reload();
  });
}

/* Auth State */
auth.onAuthStateChanged(user=>{
  if(user){
    showPage('p2');
  }else{
    showPage('p1');
  }
});

/* Page Control */
function showPage(id){
  document.querySelectorAll("section").forEach(s=>s.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}
function showRegister(){
  loginBox.style.display="none";
  registerBox.style.display="block";
}
function showLogin(){
  registerBox.style.display="none";
  loginBox.style.display="block";
}

/* Show / Hide Password */
document.addEventListener("DOMContentLoaded", ()=>{
  document.querySelectorAll(".show").forEach(btn=>{
    btn.addEventListener("click", ()=>{
      const input = btn.previousElementSibling;
      if(input.type==="password"){
        input.type="text";
        btn.textContent="hide";
      }else{
        input.type="password";
        btn.textContent="show";
      }
    });
  });
});
function saveRepair(){
  const repair = document.getElementById("repairText").value;

  if(!repair){
    alert("من فضلك اكتب وصف الإصلاح");
    return;
  }

  document.getElementById("repairMsg").innerText =
    "✅ تم حفظ الإصلاح بنجاح";
}
function saveDailyCheck(){
  const location = document.getElementById("checkLocation").value;
  const notes = document.getElementById("checkNotes").value;

  if(!location || !notes){
    alert("من فضلك اكتب المكان وملاحظات التشيك");
    return;
  }

  document.getElementById("dailyCheckMsg").innerText =
    "✅ تم حفظ التشيك اليومي بنجاح";
}

function saveSuggestion(){
  const problem = document.getElementById("problem").value;
  const solution = document.getElementById("solution").value;
  const result = document.getElementById("result").value;

  if(!problem || !solution || !result){
    alert("من فضلك املأ كل الخانات");
    return;
  }

  document.getElementById("suggestionMsg").innerText = "✅ تم حفظ الاقتراح بنجاح";
}
