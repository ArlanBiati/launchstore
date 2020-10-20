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

const PhotosUpload = {
  input: "",
  preview: document.querySelector('#photos-preview'),
  uploadLimit: 6,
  files: [],

  // função que captura os arquivos.
  handleFileInput(event) {

    // fileList recebe os arquivos selecionados pelo usuario
    const { files: fileList } = event.target

    // o input recebe os arquivos selecionados
    PhotosUpload.input = event.target

    if (PhotosUpload.hasLimit(event)) return

    Array.from(fileList).forEach((file) => {

      // adiciona o arquivo selecionado dentro do array files(arquivos)
      PhotosUpload.files.push(file)

      // constructor que permite ler arquivos
      const reader = new FileReader()

      // quando os arquivos estiverem prontos
      reader.onload = () => {

        // usamos um construtor de imagem que gera uma tag <img>
        const image = new Image()

        // atribuimos ao image.source o resultado do arquivo lido, garantindo que ele seja uma string
        image.src = String(reader.result)

        // pegamos nossa div que tem as imagens
        const div = PhotosUpload.getContainer(image)

        // aidiconamos a div dentro do preview
        PhotosUpload.preview.appendChild(div)
      }

      reader.readAsDataURL(file)
    })

    PhotosUpload.input.files = PhotosUpload.getAllFiles()
  },

  // hasLimit -> Limita o usuario adicionar mais de seis fotos
  hasLimit(event) {
    const { uploadLimit, input, preview } = PhotosUpload
    const { files: fileList } = input

    // se o n° de fotos for maior que o limite, enviamos um alerta com o máximo de fotos e quebramos o evento de capturar esses arquivos
    if (fileList.length > uploadLimit) {
      alert(`Envie no máximo ${uploadLimit} fotos`)
      event.preventDefault()
      return true
    }

    // criamos um array vazio chamado photosDiv
    const photosDiv = []

    // (preview = div#photos-preview).adiciona uma filho e percorre usando o forEach
    // pra cada item do array, verificamos se o valor é == a photo e adicionamos no array photosDiv
    preview.childNodes.forEach((item) => {
      if (item.classList && item.classList.value == "photo") {
        photosDiv.push(item)
      }
    })

    // total de fotos = tamanho array de arquivos selecionados + arquivos já capturados pelo input
    const totalPhotos = fileList.length + photosDiv.length

    // se o n° total de fotos for maior que o limite, enviamos um alerta e quebramos o evento de capturar esses arquivos
    if (totalPhotos > uploadLimit) {
      alert("Você atingiu o limite total de fotos")
      event.preventDefault()
      return true
    }
    return false
  },
  getAllFiles() {
    const dataTransfer = new ClipboardEvent("").clipboardData || new DataTransfer()

    PhotosUpload.files.forEach(file => dataTransfer.items.add(file))

    return dataTransfer.files
  },
  getContainer(image) {

    // criamos uma div
    const div = document.createElement('div')

    // aidiconamos uma classe com o nome de photo
    div.classList.add('photo')

    // capturamos o click na imagem e passamos a função de remover a imagem
    div.onclick = PhotosUpload.removePhoto

    // dentro desta div adicionamos o arquivo de imagem
    div.appendChild(image)

    // dentro desta div adicionamos um filho com a função de adicionar um botão
    div.appendChild(PhotosUpload.getRemoveButton())

    return div
  },
  getRemoveButton() {

    // a constante button recebe um elemento i
    const button = document.createElement('i')

    // é adicionado uma classe no button
    button.classList.add('material-icons')

    // 
    button.innerHTML = "close"
    return button
  },
  removePhoto(event) {
    const photoDiv = event.target.parentNode
    const photosArray = Array.from(PhotosUpload.preview.children)
    const index = photosArray.indexOf(photoDiv)

    PhotosUpload.files.splice(index, 1)
    PhotosUpload.input.files = PhotosUpload.getAllFiles()

    photoDiv.remove()
  },
  removeOldPhoto(event) {
    const photoDiv = event.target.parentNode

    if (photoDiv.id) {
      const removedFiles = document.querySelector('input[name="removed_files"]')
      if (removedFiles) {
        removedFiles.value += `${photoDiv.id},`
      }
    }

    photoDiv.remove()
  }
}

