import cls from './NavigationList.module.scss';
import { INavigationLink, Text } from '@shared/ui';
import { classNames, ColorEnum, SizeEnum, useAppSelector } from '@shared/lib';
import { selectToolbar } from '@entities/event';

export const NavigationList = () => {
    const list: INavigationLink[] = [
        {
            label: 'Главная1',
            to: '/main',
        },
        {
            label: 'Главная2',
            to: '/main',
        },
        {
            label: 'Статистика',
            to: '/statistics',
        },
        {
            label: 'Загрузка видео',
            to: '/upload',
        },
    ];
    const isActive = useAppSelector(selectToolbar);

    return (
        <ul className={classNames(cls.list, {
            [cls.hide]: !isActive,
        }, [])}>
            {list.map(item => (
                <li
                    className={cls.listItem}
                    key={item.label}
                >
                    <Text.Link
                        color={ColorEnum.TEXT}
                        size={SizeEnum.H2}
                        to={item.to}
                    >
                        {item.label}
                    </Text.Link>
                </li>
            ))}
        </ul>
    );
};

