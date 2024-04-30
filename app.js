const loadServices = () => {
  fetch("https://careancestry.onrender.com/services/")
    .then((res) => res.json())
    .then((data) => displayService(data))
    .catch((err) => console.log(err));
};

const displayService = (services) => {
  //   console.log(services);
  services.forEach((service) => {
    const parent = document.getElementById("service-container");
    const li = document.createElement("li");
    li.innerHTML = `
      <div class="card shadow h-100">
                <div class="ratio ratio-16x9">
                  <img
                    src=${service.image}
                    class="card-img-top"
                    loading="lazy"
                    alt="..."
                  />
                </div>
                <div class="card-body p-3 p-xl-5">
                  <h3 class="card-title h5">${service.name}</h3>
                  <p class="card-text">
                    ${service.description.slice(0, 140)}
                  </p>
                </div>
              </div>
      `;
    parent.appendChild(li);
  });
};

const loadDoctors = (search) => {
  document.getElementById("doctors").innerHTML = "";
  document.getElementById("spinner").style.display = "block";
  console.log(search);
  fetch(
    `https://careancestry.onrender.com/doctor/list/?search=${search ? search : ""}`
  )
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      if (data.results.length > 0) {
        document.getElementById("spinner").style.display = "none";
        document.getElementById("nodata").style.display = "none";
        displyDoctors(data?.results);
      } else {
        document.getElementById("doctors").innerHTML = "";
        document.getElementById("spinner").style.display = "none";
        document.getElementById("nodata").style.display = "block";
      }
    });
};

const displyDoctors = (doctors) => {
  const parent = document.getElementById("doctors");

  // Clear previous content
  parent.innerHTML = "";

  // Create a grid container
  const gridContainer = document.createElement("div");
  gridContainer.classList.add("row", "row-cols-1", "row-cols-md-2", "g-4"); // Added "g-4" class to create a 1rem gap between columns

  doctors?.forEach((doctor) => {
    // Create a column for each doctor
    const col = document.createElement("div");
    col.classList.add("col", "mb-4"); // Added "mb-4" class to create a 1rem margin bottom for each column

    // Create a card for the doctor
    const div = document.createElement("div");
    div.classList.add("card", "doc-card");
    div.style.height = "100%"; // Set card height to 100%

    div.innerHTML = `
      <div class="card-body d-flex flex-column justify-content-between"> <!-- Align items in a column -->
        <img class="doc-img card-img-top mx-auto d-block" src=${
          doctor.image
        } alt="" /> <!-- Center the image -->
        <div>
          <h4 class="card-title text-center mt-3">${
            doctor?.user
          }</h4> <!-- Center the title -->
          <h6 class="card-subtitle text-center">${
            doctor?.designation[0]
          }</h6> <!-- Center the subtitle -->
          <p class="card-text mt-3">
            ${
              doctor.profession ? doctor.profession : "Doctor of Medicine"
            } <!-- Replace lorem ipsum with text related to their profession -->
          </p>
          <div class="specializations text-center mb-3"> <!-- Center the buttons and add margin bottom -->
            ${doctor?.specialization
              ?.map(
                (item) =>
                  `<button class="btn btn-primary me-2">${item}</button>`
              )
              .join("")}
          </div>
        </div>
        <div class="text-center"> <!-- Center the button -->
          <a href="docDetails.html?doctorId=${
            doctor.id
          }" class="doc-detail-btn" style="text-decoration: none;">Details</a>
        </div>
      </div>
    `;

    // Append the card to the column
    col.appendChild(div);

    // Append the column to the grid container
    gridContainer.appendChild(col);
  });

  // Append the grid container to the parent
  parent.appendChild(gridContainer);
};





const loadDesignation = () => {
  fetch("https://careancestry.onrender.com/doctor/designation/")
    .then((res) => res.json())
    .then((data) => {
      data.forEach((item) => {
        const parent = document.getElementById("drop-deg");
        const li = document.createElement("li");
        li.classList.add("dropdown-item");
        li.innerText = item?.name;
        parent.appendChild(li);
      });
    });
};
const loadSpecialization = () => {
  fetch("https://careancestry.onrender.com/doctor/specialization/")
    .then((res) => res.json())
    .then((data) => {
      data.forEach((item) => {
        const parent = document.getElementById("drop-spe");
        const li = document.createElement("li");
        li.classList.add("dropdown-item");
        li.innerHTML = `
        <li onclick="loadDoctors('${item.name}')"> ${item.name}</li>
          `;
        parent.appendChild(li);
      });
    });
};

const handleSearch = () => {
  const value = document.getElementById("search").value;
  loadDoctors(value);
};

const loadReview = () => {
  fetch("https://careancestry.onrender.com/doctor/reviews/")
    .then((res) => res.json())
    .then((data) => displayReview(data));
};

const displayReview = (reviews) => {
  reviews.forEach((review) => {
    const parent = document.getElementById("review-container");
    const div = document.createElement("div");
    div.classList.add("review-card");
    div.innerHTML = `
        <img src="./Images/girl.png" alt="" />
            <h4>${review.reviewer}</h4>
            <p>
             ${review.body.slice(0, 100)}
            </p>
            <h6>${review.rating}</h6>
        `;
    parent.appendChild(div);
  });
};

loadServices();
loadDoctors();
loadDesignation();
loadSpecialization();
loadReview();
