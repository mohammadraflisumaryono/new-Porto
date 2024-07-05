document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  const projectId = urlParams.get("id");

  fetch("data.json")
    .then((response) => response.json())
    .then((data) => {
      const project = data.projects.find((p) => p.id === projectId);

      const projectTitleElement = document.getElementById("project-title");
      const projectDescriptionElement = document.getElementById(
        "project-description"
      );
      const galleryElement = document.getElementById("gallery");

      if (project) {
        if (projectTitleElement) {
          projectTitleElement.innerText = project.title;
        }
        if (projectDescriptionElement) {
          projectDescriptionElement.innerText = project.description;
        }
        if (galleryElement) {
          project.images.forEach((image) => {
            const imgElement = document.createElement("img");
            imgElement.src = `images/${image}`;
            imgElement.alt = project.title;
            galleryElement.appendChild(imgElement);
          });
        }
      } else {
        if (projectTitleElement) {
          projectTitleElement.innerText = "Project Not Found";
        }
        if (projectDescriptionElement) {
          projectDescriptionElement.innerText =
            "The project you are looking for does not exist.";
        }
      }
    })
    .catch((error) => console.error("Error loading JSON data:", error));
});
