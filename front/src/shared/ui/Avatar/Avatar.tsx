import cls from './Avatar.module.scss';
import { Text } from '@shared/ui';
import { classNames, ColorEnum, SizeEnum, useAppSelector, WeightEnum } from '@shared/lib';
import { selectToolbar } from '@entities/event';

export const Avatar = () => {
    const isActive = useAppSelector(selectToolbar);
    return (
        <div className={classNames(cls.wrapper, {
            [cls.hide]: !isActive,
        }, [])}>
            <div className={cls.avatar}>

            </div>
            <div className={classNames(cls.info, {
                [cls.hide]: !isActive,
            }, [])}>
                <Text.Paragraph
                    size={SizeEnum.H4}
                    color={ColorEnum.TEXT}
                    weight={WeightEnum.BOLD}
                >
                    Name
                </Text.Paragraph>
                <Text.Paragraph
                    size={SizeEnum.H4}
                    color={ColorEnum.TEXT}
                    weight={WeightEnum.MEDIUM}
                >
                    Email
                </Text.Paragraph>
            </div>
        </div>
    );
};

