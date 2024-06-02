import cls from './Toolbar.module.scss';
import { Avatar, NavigationList, Text, ThemeSwitcher } from '@shared/ui';
import { Outlet } from 'react-router-dom';
import { classNames, ColorEnum, SizeEnum, useAppDispatch, useAppSelector } from '@shared/lib';
import Tab from '@assets/icons/tab.svg';
import { changeToolbar, selectToolbar } from '@entities/event';

export const Toolbar = () => {
    const dispatch = useAppDispatch();
    const isActive = useAppSelector(selectToolbar);
    return (
        <div className={cls.container}>
            <div className={classNames(cls.wrapper, {
                [cls.hide]: !isActive,
            }, [])}>
                {/*<Text.Heading*/}
                {/*    size={SizeEnum.H2}*/}
                {/*    color={ColorEnum.TEXT}*/}
                {/*>*/}
                {/*    LOGO*/}
                {/*</Text.Heading>*/}
                <Avatar />
                <NavigationList />
                <div className={
                    classNames(cls.buttons, {
                    [cls.hide] : !isActive
                }, [])
                }>
                    <ThemeSwitcher />
                    <div
                        onClick={() => {
                            dispatch(changeToolbar());
                        }}
                        className={cls.tab}>
                        <Tab />
                    </div>
                </div>
            </div>
            <div className={cls.body}>
                <Outlet />
            </div>
        </div>
    );
};

