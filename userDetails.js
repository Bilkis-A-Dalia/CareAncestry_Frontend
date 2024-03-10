const loadUserDetails = () => {
  const user_id = localStorage.getItem("user_id");
  fetch(`https://careancestry.onrender.com/patient/list/${user_id}`)
    .then((res) => res.json())
    .then((data) => {
      const parent = document.getElementById("user-detais-container");
      const div = document.createElement("user-all");
      div.classList.add("user-all");
      div.innerHTML = `
          <div class="user-img">
          <img src="./Images/man-1.jpg" alt="" />
        </div>
        <div class="user-info">
          <h1>${data.user}</h1>
          <h3>${data.email}</h3>
        </div>
          `;
      parent.appendChild(div);
    });
};
loadUserDetails();
