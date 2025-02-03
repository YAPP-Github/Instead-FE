import { GET } from '@web/shared/server';
import ky from 'ky';

export const getPresignedUrls = async (
  imagesCount: number
): Promise<string[]> => {
  const urls: string[] = [];

  for (let i = 0; i < imagesCount; i++) {
    const response = await GET<{
      presignedUrl: string;
      duration: number;
      imageUrl: string;
    }>('presigned-url/post-group');

    urls.push(response.data.presignedUrl);
  }

  return urls;
};

export const base64ToBlob = (base64: string, mimeType: string) => {
  const byteString = atob(base64.split(',')[1]!);
  const byteArray = new Uint8Array(byteString.length);

  for (let i = 0; i < byteString.length; i++) {
    byteArray[i] = byteString.charCodeAt(i);
  }

  return new Blob([byteArray], { type: mimeType });
};

export const uploadImages = async (
  images: (string | File)[]
): Promise<string[]> => {
  const presignedUrls = await getPresignedUrls(images.length);
  const imageUrls: string[] = [];

  await Promise.all(
    presignedUrls.map(async (presignedUrl, index) => {
      try {
        if (typeof images[index] === 'string') {
          const convertedImage = base64ToBlob(
            images[index] as string,
            'image/png'
          );
          await ky.put(presignedUrl, {
            body: convertedImage,
            headers: {
              'Content-Type': 'image/png',
            },
          });
        } else {
          const file = images[index] as File;
          await ky.put(presignedUrl, {
            body: file,
            headers: {
              'Content-Type': file.type,
            },
          });
        }

        const imageUrl = presignedUrl.split('?')[0]!;
        imageUrls.push(imageUrl);
      } catch (error) {
        console.error('이미지 업로드 실패:', error);
        throw new Error('이미지 업로드에 실패했습니다.');
      }
    })
  );

  return imageUrls;
};
