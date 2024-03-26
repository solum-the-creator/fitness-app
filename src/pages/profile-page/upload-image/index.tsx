import { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { BASE_IMAGE_URL, STATUS_CODE } from '@constants/constants';
import { BASE_API_URL } from '@redux/api/api-slice';
import { UploadImage as UploadImageResponse } from '@redux/api/types';
import { useAppSelector } from '@redux/configure-store';
import { Form, Upload, UploadProps } from 'antd';
import { UploadChangeParam, UploadFile } from 'antd/lib/upload/interface';
import axios, { AxiosError, AxiosProgressEvent } from 'axios';
import { UploadRequestError, UploadRequestOption } from 'rc-upload/lib/interface';

import { ErrorModal } from './error-modal';
import { UploadButton } from './upload-button';

import styles from './upload-image.module.scss';

type UploadImageProps = {
    imageUrl: string | undefined;
    onGetValue: (e: any) => string | undefined;
};

export const UploadImage = ({ imageUrl, onGetValue }: UploadImageProps) => {
    const matches = useMediaQuery({ query: '(max-width: 480px)' });
    const authToken = useAppSelector((state) => state.auth.accessToken);
    const [defaultFileList, setDefaultFileList] = useState<UploadFile[]>(
        imageUrl ? [{ uid: '-1', name: 'image.png', status: 'done', url: imageUrl }] : [],
    );

    const [errorModalVisible, setErrorModalVisible] = useState(false);

    useEffect(() => {
        setDefaultFileList(
            imageUrl ? [{ uid: '-1', name: 'image.png', status: 'done', url: imageUrl }] : [],
        );
    }, [imageUrl]);

    const uploadImage = async (options: UploadRequestOption) => {
        const { onSuccess, onError, file, onProgress } = options;

        const fmData = new FormData();

        const config = {
            headers: {
                'content-type': 'multipart/form-data',
                Authorization: `Bearer ${authToken}`,
            },
            onUploadProgress: (event: AxiosProgressEvent) => {
                const total = event.total || 0;
                const percent = Math.floor((event.loaded / total) * 100);

                if (onProgress) {
                    onProgress({ ...event, percent });
                }
            },
        };

        fmData.append('file', file);
        try {
            const response = await axios.post<UploadImageResponse>(
                `${BASE_API_URL}upload-image`,
                fmData,
                config,
            );

            response.data.url = `${BASE_IMAGE_URL}${response.data.url}`;

            if (onSuccess) {
                onSuccess(response.data);
            }
        } catch (err) {
            const axiosError = err as AxiosError;

            const event: UploadRequestError = {
                name: axiosError.name,
                message: axiosError.message,
                status: axiosError.response?.status,
                method: 'POST',
                url: `${BASE_API_URL}upload-image`,
            };

            if (event.status === STATUS_CODE.CONFLICT) {
                setErrorModalVisible(true);
                setDefaultFileList([]);

                return;
            }

            if (onError) {
                onError(event);
            }
        }
    };

    const handleOnChange: UploadProps['onChange'] = ({
        file,
        fileList,
    }: UploadChangeParam<UploadFile>) => {
        setDefaultFileList(fileList);

        if (file.status === 'done') {
            setDefaultFileList([
                {
                    ...fileList[0],
                    url: file.response.url,
                    thumbUrl: file.response.url,
                },
            ]);
        }

        if (file.status === 'error') {
            setDefaultFileList([
                {
                    ...fileList[0],
                    originFileObj: undefined,
                },
            ]);
        }
    };

    return (
        <div className={styles.upload_container} data-test-id='profile-avatar'>
            <Form.Item name='imgSrc' noStyle={true} getValueFromEvent={onGetValue}>
                <Upload
                    accept='image/*'
                    customRequest={uploadImage}
                    onChange={handleOnChange}
                    listType={matches ? 'picture' : 'picture-card'}
                    fileList={defaultFileList}
                    locale={{ uploading: 'Загружаем' }}
                    progress={{ strokeWidth: 4, strokeColor: '#2F54EB', showInfo: false }}
                >
                    {defaultFileList.length >= 1 ? null : <UploadButton />}
                </Upload>
            </Form.Item>
            <ErrorModal isError={errorModalVisible} onClose={() => setErrorModalVisible(false)} />
        </div>
    );
};
