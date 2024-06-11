
const btnRemoveProd = document.getElementById("btn-remove-cartprod");
const id = document.getElementById("prodID").textContent;

btnRemoveProd.addEventListener("click", async (event) => {
  try {
    const deleteProduct = await fetch(`/cart/delete/${id}`, {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
      },
    });

    window.location.reload();
  } catch (error) {
    console.log(error);
  }
});
