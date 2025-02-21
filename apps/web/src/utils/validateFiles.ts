const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export function validateFiles(files: File[]) {
  const isValidFiles = files.every((file) => {
    const isImage = file.type.startsWith('image/');
    const isValidSize = file.size <= MAX_FILE_SIZE;
    return isImage && isValidSize;
  });

  return isValidFiles;
}
