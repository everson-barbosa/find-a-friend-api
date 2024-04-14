import fs from 'node:fs'
import path from 'node:path'

interface WriteUploadFileProps {
  folder: string
  fileName: string
  fileBuffer: Buffer
}

export async function writeUploadFile({
  folder,
  fileName,
  fileBuffer,
}: WriteUploadFileProps) {
  const uploadPath = path.join('temp', 'uploads', folder)

  if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true })
  }

  fs.writeFileSync(`${uploadPath}/${fileName}`, fileBuffer)

  return { path: uploadPath }
}
