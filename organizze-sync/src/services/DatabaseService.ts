import fs from 'fs'
import path from 'path'
import S3 from './AWS'

const FOLDER_NAME = 'files'
const DIRECTORY = path.resolve(__dirname, '..', FOLDER_NAME)
class DatabaseService {
  saveToFile(year: string, data: string) {
    this.clearDirectory()
    this.createDirectory()
    this.createFile(year, data)
  }

  clearDirectory() {
    if (!fs.existsSync(DIRECTORY)) return
    fs.rm(DIRECTORY, { recursive: true, force: true }, (err) => {
      if (err) return console.error(err)
    })
  }

  createDirectory() {
    if (fs.existsSync(DIRECTORY)) return
    fs.mkdir(DIRECTORY, (err) => {
      if (err) return console.error(err)
    })
  }

  createFile(year: string, data: string) {
    const fileName = `${year}.json`
    const filePath = path.resolve(DIRECTORY, fileName)
    fs.writeFile(filePath, data, (err) => {
      if (err) return console.error(err)
      console.log(`Arquivo ${fileName} criado com sucesso!`)
    })
  }

  saveToServer(year: string, data: string) {
    return S3.createFile(year, data)
  }
}

export default new DatabaseService()
