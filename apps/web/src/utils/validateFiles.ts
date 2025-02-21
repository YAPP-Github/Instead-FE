/**
 * 이미지가 맞는지 검증한다
 */
export function validateFiles(files: File[]) {
  const isValidFiles = files.every((file) => {
    const isImage = file.type.startsWith('image/');
    return isImage;
  });

  return isValidFiles;
}
