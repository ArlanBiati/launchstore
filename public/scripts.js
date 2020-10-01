const Mask = {
  apply(input, func) {
    setTimeout(() => {
      input.value = Mask[func](input.value)
    }, 1)
  },

  formatBRL(value) {
    value = value.replace(/\D/g, "")

    return value = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value / 100)
  }
}

const formDelete = document.querySelector('#form-delete')
formDelete.addEventListener("submit", (e) => {
  const confirmation = confirm("Deseja deletar")
  if (!confirmation) {
    e.preventDefault()
  }
})