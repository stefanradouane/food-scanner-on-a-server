const homeDialog = document.querySelector(".home")
const cta = document.querySelector(".cta--home")

// Close home
if (cta) {
    cta.addEventListener("click", e => {
        homeDialog.ariaExpanded = false
    })
}