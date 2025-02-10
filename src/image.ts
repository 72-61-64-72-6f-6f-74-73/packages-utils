export type MediaImageUploadResult = {
    base_url: string;
    file_hash: string;
    file_ext: string;
};

export const fmt_media_image_upload_result_url = (res: MediaImageUploadResult): string => `${res.base_url}/${res.file_hash}.${res.file_ext}`;
