export const getAllowedMimeTypes = async (file: string) => !file.match(/\^.*/);
  
export const getMime = (path: string) =>
  path.match(/\.htm(l)?/)
    ? 'html'
    : path.match(/\.css/)
    ? 'css'
    : path.match(/\.js/)
    ? 'javascript'
    : path.match(/\.ts/)
    ? 'typescript'
    : 'unsupported';