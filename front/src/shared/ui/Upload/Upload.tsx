import React, { useEffect, useRef, useState } from 'react';
import cls from './Upload.module.scss';
import UploadIcon from '@assets/icons/upload.svg';
import { Button, Text } from '@shared/ui';
import { BorderEnum, ColorEnum, formatDuration, SizeEnum, useAppDispatch } from '@shared/lib';
import { changeVideoProcessing } from '@entities/event';

interface UploadProps extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
}

export const Upload: React.FC<UploadProps> = (props) => {
    const [videoFile, setVideoFile] = useState<File | null>(null);
    const [videoUrl, setVideoUrl] = useState<string | null>(null);
    const [blobs, setBlobs] = useState<Blob[]>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(document.createElement('canvas'));
    const [duration, setDuration] = useState<number | null>(null);
    const dispatch = useAppDispatch();
    const [socket, setSocket] = useState<WebSocket | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        dispatch(changeVideoProcessing(false));
        if (file && file.type.startsWith('video/')) {
            setVideoFile(file);
            const url = URL.createObjectURL(file);
            setVideoUrl(url);
            setDuration(null); // Сброс продолжительности при выборе нового файла
            setBlobs([]); // Сброс blobs
        } else {
            alert('Пожалуйста, выберите видеофайл.');
            setVideoFile(null);
            setDuration(null); // Сброс продолжительности при неудачной загрузке файла
            setBlobs([]); // Сброс blobs
        }
    };

    useEffect(() => {
        if (videoFile) {
            const videoEl = videoRef.current;
            if (videoEl) {
                videoEl.onloadedmetadata = () => {
                    setDuration(videoEl.duration);
                    // Установка размеров холста в соответствии с разрешением видео
                    canvasRef.current.width = videoEl.videoWidth;
                    canvasRef.current.height = videoEl.videoHeight;
                };
                videoEl.src = URL.createObjectURL(videoFile); // Создание нового URL для видеофайла
                videoEl.load(); // Обновление видео
            }
        }
    }, [videoFile]);

    const handlePlaceholderClick = () => {
        fileInputRef.current?.click();
    };

    const handleConfirmClick = async () => {
        if (videoFile) {
            dispatch(changeVideoProcessing(true));
            await openWebSocket(); // Открываем WebSocket соединение
            await extractFrames();
            await sendBlobs(blobs);
        }
    };

    const openWebSocket = async () => {
        const newSocket = new WebSocket(`${import.meta.env.VITE_SERVER_WS}/video/ws/videoinput`);
        newSocket.onopen = () => {
            console.log('WebSocket connection opened');
        };
        newSocket.onmessage = (event) => {
            console.log('WebSocket message received:', event.data);
        };
        newSocket.onclose = () => {
            console.log('WebSocket connection closed');
        };
        newSocket.onerror = (error) => {
            console.error('WebSocket error observed:', error);
        };
        setSocket(newSocket);
    };

    const extractFrames = () => {
        const video = videoRef.current;
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        const duration = video?.duration || 0;
        const frameInterval = 5; // кадр каждые 5 секунд

        const captureFrame = (time: number) => {
            return new Promise<Blob | null>((resolve) => {
                if (video) {
                    video.currentTime = time;
                    video.onseeked = () => {
                        context?.drawImage(video, 0, 0, canvas.width, canvas.height);
                        canvas.toBlob((blob) => {
                            resolve(blob);
                        }, 'image/jpeg', 1); // Использование формата JPEG с качеством 1 (максимальное качество)
                    };
                }
            });
        };

        const processFrames = async () => {
            const capturedBlobs: Blob[] = [];
            for (let time = 0; time <= duration; time += frameInterval) {
                const blob = await captureFrame(time);
                if (blob) {
                    capturedBlobs.push(blob);
                    console.log(`Captured frame at ${time} seconds`, blob);
                }
            }
            setBlobs(capturedBlobs);
        };

        processFrames();
    };

    const sendBlobs = async (capturedBlobs: Blob[]) => {
        if (socket && socket.readyState === WebSocket.OPEN) {
            for (const blob of capturedBlobs) {
                socket.send(blob);
                console.log('Blob sent');
            }
            console.log('All blobs sent');
        } else {
            console.error('WebSocket is not open');
        }
    };

    return (
        <div className={cls.wrapper}>
            <input
                type="file"
                accept="video/*"
                onChange={handleFileChange}
                ref={fileInputRef}
                className={cls.hiddenInput}
                {...props}
            />
            <div className={cls.placeholder} onClick={handlePlaceholderClick}>
                {videoFile ? (
                    <Text.Paragraph color={ColorEnum.TEXT}>{videoFile.name}</Text.Paragraph>
                ) : (
                    <>
                        <UploadIcon />
                        <Text.Paragraph color={ColorEnum.TEXT}>
                            Нажмите для загрузки видео
                        </Text.Paragraph>
                    </>
                )}
            </div>
            {videoFile && (
                <>
                    <div className={cls.videoWrapper}>
                        <video ref={videoRef} className={cls.videoPlayer} controls>
                            Your browser does not support the video tag.
                        </video>
                    </div>
                    <div className={cls.info}>
                        <ul className={cls.listInfo}>
                            <li className={cls.listItem}>
                                <Text.Paragraph color={ColorEnum.TEXT} size={SizeEnum.H1}>
                                    Размер видео: {(videoFile.size / (1024 * 1024)).toFixed(2)} MB
                                </Text.Paragraph>
                            </li>
                            <li className={cls.listItem}>
                                <Text.Paragraph color={ColorEnum.TEXT} size={SizeEnum.H1}>
                                    Продолжительность: {formatDuration(duration)}
                                </Text.Paragraph>
                            </li>
                            <li className={cls.listItem}>
                                <Text.Paragraph color={ColorEnum.TEXT} size={SizeEnum.H1}>
                                    {/*@ts-ignore*/}
                                    Время обработки: {formatDuration(duration?.toFixed(0) / 1000)} секунд
                                </Text.Paragraph>
                            </li>
                        </ul>
                        <div className={cls.listItem}>
                            <Button
                                size={SizeEnum.H2}
                                color={ColorEnum.WHITE}
                                border={BorderEnum.H5}
                                bgColor={ColorEnum.PRIMARY}
                                onClick={handleConfirmClick}
                            >
                                Обработать
                            </Button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};
