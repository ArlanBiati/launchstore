module.exports = {
  date(timestamp) {
    // const date recebe a data de acordo com o timestamp
    const date = new Date(timestamp)

    // const year recebe o ano de acordo com o timestamp acima - utilizamos UTC para pegar de forma universal
    const year = date.getUTCFullYear()

    // const month recebe o mes de acordo com o timestamp acima - utilizamos UTC para pegar de forma universal
    const month = `0${date.getUTCMonth() + 1}`.slice(-2)

    // const day recebe o dia de acordo com o timestamp acima - utilizamos UTC para pegar de forma universal
    const day = `0${date.getUTCDate()}`.slice(-2)

    // retornamos os dados em forma de string na ordem yyyy-mm-dd
    return {
      iso: `${year}-${month}-${day}`,
      birthDay: `${day}/${month}`,
      format: `${day}/${month}/${year}`
    }
  },
  formatPrice(price) {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price / 100)
  }
}
