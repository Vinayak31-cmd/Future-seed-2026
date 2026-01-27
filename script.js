function goToPage2() {
  window.location.href = "Page2.html";
}

// ---------- ADMIN ----------
function adminLogin() {
  if (document.getElementById("adminPass").value === "admin123") {
    sessionStorage.setItem("isAdmin", "true");
    location.reload();
  } else {
    alert("Wrong password");
  }
}

function adminLogout() {
  sessionStorage.removeItem("isAdmin");
  window.location.href = "Page1.html";
}

// ---------- DOCTORS ----------
let doctors = JSON.parse(localStorage.getItem("doctors")) || [];

function addDoctor() {
  const doc = {
    name: doctorName.value,
    speciality: speciality.value,
    experience: experience.value,
    photo: photo.value
  };
  doctors.push(doc);
  localStorage.setItem("doctors", JSON.stringify(doctors));
  alert("Doctor added");
}

function loadDoctors() {
  const list = document.getElementById("doctorList");
  if (!list) return;

  list.innerHTML = "";
  doctors.forEach((d, i) => {
    list.innerHTML += `
      <div class="doctor-card">
        <h3>${d.name}</h3>
        <p>${d.speciality}</p>
        <button onclick="bookDoctor(${i})">Book</button>
      </div>`;
  });
}

function bookDoctor(i) {
  const d = doctors[i];
  bDoctor.innerText = d.name;
  bSpec.innerText = d.speciality;
  bookingSection.style.display = "block";
}

function updateTimeSlots() {
  bTime.innerHTML = "";
  ["10:00 AM", "12:00 PM", "2:00 PM"].forEach(t => {
    const opt = document.createElement("option");
    opt.text = t;
    bTime.add(opt);
  });
}

function confirmBooking() {
  localStorage.setItem("appointment", JSON.stringify({
    doctor: bDoctor.innerText,
    spec: bSpec.innerText,
    day: bDay.value,
    time: bTime.value
  }));
  window.location.href = "Page3.html";
}

function cancelAppointment() {
  localStorage.removeItem("appointment");
  window.location.href = "Page2.html";
}

// ---------- PAGE 3 FIX (ADDED) ----------
function loadConfirmation() {
  const data = JSON.parse(localStorage.getItem("appointment"));
  if (!data) return;

  const cname = document.getElementById("cname");
  const cspec = document.getElementById("cspec");
  const cday = document.getElementById("confirmDay");
  const ctime = document.getElementById("ctime");

  if (cname) cname.innerText = data.doctor;
  if (cspec) cspec.innerText = data.spec;
  if (cday) cday.innerText = data.day;
  if (ctime) ctime.innerText = data.time;
}

// ---------- SAFE PAGE LOAD ----------
window.onload = function () {
  loadDoctors();
  loadConfirmation();
};
