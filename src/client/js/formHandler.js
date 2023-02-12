function handleSubmit(event) {
  event.preventDefault();
  // check what text was put into the form field
  let formText = document.getElementById("name").value;
  if (formText.length < 1) {
    alert("Input Text should not be empty");
    return;
  }
  console.log("::: Form Submitted :::");
  fetch(`http://localhost:8080/test?text=${formText}`)
    .then((res) => res.json())
    .then(function (res) {
      document.getElementById("results").innerHTML = res.message;
    });
}

export { handleSubmit };
