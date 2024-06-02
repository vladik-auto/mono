import cls from './UploadPage.module.scss';
import { Text, Upload } from '@shared/ui';
import { ColorEnum, SizeEnum, useAppSelector } from '@shared/lib';
import { selectVideoProcessing } from '@entities/event';

export const UploadPage = () => {
    const videoProcessing = useAppSelector(selectVideoProcessing);
    return (
        <div className={cls.wrapper}>
            <div className={cls.video}>
                <Text.Heading
                    color={ColorEnum.TEXT}
                    size={SizeEnum.H3}
                >
                    Загрузка видео
                </Text.Heading>
                <Upload />
            </div>
            {videoProcessing
                &&
                <div className={cls.events}>
                    <Text.Heading
                        color={ColorEnum.TEXT}
                        size={SizeEnum.H3}
                    >
                        Нарушения
                    </Text.Heading>
                </div>
            }
        </div>
    );
};



