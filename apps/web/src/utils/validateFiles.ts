const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export function validateFiles(files: File[]) {
  const isValidFiles = files.every((file) => {
    const isImage = file.type.startsWith('image/');
    const isValidSize = file.size <= MAX_FILE_SIZE;
    return isImage && isValidSize;
  });

  if (!isValidFiles) {
    throw new Error(
      '유효하지 않은 파일이 포함되어 있어요. 이미지 파일(최대 5MB)만 업로드 가능해요.'
    );
  }

  return isValidFiles;
}
