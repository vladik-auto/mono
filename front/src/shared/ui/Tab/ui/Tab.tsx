import cls from './Tab.module.scss';
import { ITabProps, Text } from '@shared/ui';
import { classNames, ColorEnum, SizeEnum } from '@shared/lib';


export const Tab = ({ text, isActive, onClick }: ITabProps) => {
    return (
        <li
            onClick={onClick}
            className={classNames(cls.wrapper, {
                [cls.active]: isActive,
            }, [])}
        >
            <Text.Paragraph color={isActive ? ColorEnum.WHITE : ColorEnum.TEXT} size={SizeEnum.H4}>
                {text}
            </Text.Paragraph>
        </li>
    );
};