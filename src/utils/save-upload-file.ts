import fs from 'node:fs'
import path from 'node:path'
import { Stream } from 'node:stream'

interface SaveUploadFileProps {
  fileStream: Stream
  fileName: string
  folder: string
}

export async function saveUploadFile({
  fileStream,
  fileName,
  folder,
}: SaveUploadFileProps) {
  if (!fs.existsSync(folder)) {
    fs.mkdirSync(folder, { recursive: true })
  }

  const filePath = path.join(folder, fileName)

  const writableStream = fs.createWriteStream(filePath)

  fileStream.pipe(writableStream)
}
