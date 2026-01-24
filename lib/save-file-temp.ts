import fs from "fs"
import path from "path"

export async function saveFileToTemp(file: File) {
  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)

  const uploadDir = path.join(process.cwd(), "public", "uploads", "temp")

  // ensure directory exists
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true })
  }

  const fileName = `${Date.now()}-${file.name}`
  const filePath = path.join(uploadDir, fileName)

  await fs.promises.writeFile(filePath, buffer)

  return {
    fileName,
    filePath,
  }
}
