const dogForm = document.getElementById("dogInfos");
const inputElement = document.getElementById("searchInput");

dogForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const inputValue = inputElement.value;
  fetch(`http://localhost:3000/dogprofile?address=${inputValue}`).then(
    (data) => {
      data.json().then((data) => {
        showData(data);
      });
    }
  );
});

const showData = (data) => {
  let errorParagraph = document.getElementById("error-message");
  let dogProfileTitle = document.getElementById("dogProfileTitle");
  console.log(data);

  if (data.message) {
    errorParagraph.style = "display: block";
    errorParagraph.innerHTML = `<strong>Error:</strong> ${data.message}`;
    return;
  }

  errorParagraph.style = "display: none";
  dogProfileTitle.style = "display: block";
  let dogInfos = document.getElementById("dog-location");
  let dogImage = document.getElementById("dog-image");

  dogInfos.innerHTML = `This dog (a beautiful <strong>${data.breed}</strong>) was found 
                          in <strong>${data.location}</strong> at latitude <strong>${data.latitude}</strong> 
                          and longitude <strong>${data.longitude}</strong.`;

  dogImage.src = data.image;
};
