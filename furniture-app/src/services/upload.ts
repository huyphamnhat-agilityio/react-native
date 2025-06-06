import {ImgBBResponse} from 'src/interfaces';
import {fetchApi} from './fetch';

export const uploadImage = async (image: FormData): Promise<string> => {
  const response = await fetchApi<ImgBBResponse>(
    `${process.env.UPLOAD_IMAGE_URL}?key=${process.env.IMGBB_API_KEY}`,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      method: 'POST',
      body: image,
    },
  );

  return response.data.url;
};
