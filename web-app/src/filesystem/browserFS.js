export async function openFile() {

  const [handle] = await window.showOpenFilePicker()

  const file = await handle.getFile()

  const content = await file.text()

  return {
    handle,
    name: file.name,
    content
  }

}

export async function saveFile(handle,content){

  const writable = await handle.createWritable()

  await writable.write(content)

  await writable.close()

}