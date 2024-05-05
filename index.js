import "./index.css";

const navDivs = document.querySelectorAll("nav div");

navDivs.forEach((div) => {
  div.addEventListener("click", () => {
    navDivs.forEach((div) => {
      div.classList.remove("focus");
    });
    div.classList.add("focus");
  });
});
