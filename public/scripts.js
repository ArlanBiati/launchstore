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
formDelete.addEventListener("submit", (event) => {
  const confirmation = confirm("Deseja deletar")
  if (!confirmation) {
    event.preventDefault()
  }
})

const PhotosUpload = {
  uploadLimit: 6,

  handleFileInput(event) {
    const { files: fileList } = event.target
    const { uploadLimit } = PhotosUpload

    if (fileList.length > uploadLimit) {
      alert(`Envie no máximo ${uploadLimit} fotos`)
      event.preventDefault()
      return
    }

    Array.from(fileList).forEach((file) => {
      const reader = new FileReader()

      reader.onload = () => {
        const image = new Image()
        image.src = String(reader.result)

        const div = document.createElement('div')
        div.classListAdd('photo')

        div.onclick = () => {
          alert('remover foto')
        }

        div.appendChild(image)

        document.querySelector('#photos-preview').appendChild(div)
      }

      reader.readAsDataURL(file)
    })
  }
}