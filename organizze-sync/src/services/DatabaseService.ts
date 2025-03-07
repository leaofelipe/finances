// const DIRECTORY = `files/`
// if (parseInt(MONTH) < 12) {
//   MONTH++
//   MONTH = MONTH.toString().padStart(2, '0')
//   getTransactions(MONTH.toString())
// } else {
//   if (!fs.existsSync(DIRECTORY)) {
//     fs.mkdirSync(DIRECTORY)
//   }
//   fs.writeFile(
//     `${DIRECTORY}/${YEAR}.json`,
//     JSON.stringify(DATA),
//     'utf8',
//     () => console.log('Arquivo salvo com sucesso!')
//   )
// }
