const handlelogOut = () => {
  const token = localStorage.getItem("token");

  fetch("https://careancestry.onrender.com/patient/logout/", {
    method: "POST",
    headers: {
      Authorization: `Token ${token}`,
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      localStorage.removeItem("token");
      localStorage.removeItem("patient_id");
      localStorage.removeItem("user_id");
      localStorage.removeItem("user_name");
      if (patientId) {
        // Remove patient_id from localStorage
        localStorage.removeItem("patient_id");
      }
    });
};

