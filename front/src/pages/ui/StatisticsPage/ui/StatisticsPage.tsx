import cls from './StatisticsPage.module.scss';
import { ISelectItem, ITabProps, Select, Tab, Text } from '@shared/ui';
import { ColorEnum, SizeEnum } from '@shared/lib';
import { useState } from 'react';
import { StatisticsTabsEnum } from '@pages/ui';
import {
    AllTimeViolationsChart, FrequencyViolationsChart,
    LastMonthViolationsChart,
    LastWeekViolationsChart,
    ViolationTypesChart,
} from '@widgets/ui';

export const StatisticsPage = () => {
    const [isActive, setIsActive] = useState<boolean>(false);
    const employees: ISelectItem[] = [
        { id: '1', name: 'John Doe' },
        { id: '2', name: 'Jane Smith' },
        { id: '3', name: 'Alice Johnson' },
        { id: '4', name: 'Bob Brown' },
    ];
    const [tabsInfo, setTabsInfo] = useState<ITabProps[]>([
        { text: StatisticsTabsEnum.AllTimeViolationsChart, isActive: true },
        { text: StatisticsTabsEnum.LastMonthViolationsChart, isActive: false },
        { text: StatisticsTabsEnum.LastWeekViolationsChart, isActive: false },
        { text: StatisticsTabsEnum.ViolationTypesChart, isActive: false },
        { text: StatisticsTabsEnum.FrequencyViolationsChart, isActive: false },
    ]);
    const renderActiveTabContent = () => {
        const activeTab = tabsInfo.find(tab => tab.isActive)?.text;

        switch (activeTab) {
            case StatisticsTabsEnum.AllTimeViolationsChart:
                return <AllTimeViolationsChart />;
            case StatisticsTabsEnum.LastMonthViolationsChart:
                return <LastMonthViolationsChart />;
            case StatisticsTabsEnum.LastWeekViolationsChart:
                return <LastWeekViolationsChart />;
            case StatisticsTabsEnum.ViolationTypesChart:
                return <ViolationTypesChart />;
            case StatisticsTabsEnum.FrequencyViolationsChart:
                return <FrequencyViolationsChart />;
            default:
                return null;
        }
    };

    const handleTabClick = (index: number) => {
        setTabsInfo(tabsInfo.map((tab, i) => ({
            ...tab,
            isActive: i === index,
        })));
    };
    const handleSelect = (selectedName: string) => {
        setIsActive(true);
    };

    return (
        <div className={cls.wrapper}>
            <div className={cls.heading}>
                <Text.Heading
                    color={ColorEnum.TEXT}
                    size={SizeEnum.H3}
                >
                    Статистика
                </Text.Heading>
                <div className={cls.select}>
                    <Text.Heading
                        color={ColorEnum.TEXT}
                        size={SizeEnum.H6}
                    >
                        Выберите сотрудника
                    </Text.Heading>
                    <Select items={employees} onSelect={handleSelect} />
                </div>
            </div>
            {isActive
                &&
                <>
                    <ul className={cls.tabs}>
                        {tabsInfo.map((tab, index) => (
                            <Tab
                                key={index}
                                text={tab.text}
                                isActive={tab.isActive}
                                onClick={() => handleTabClick(index)}
                            />
                        ))}
                    </ul>
                    <div className={cls.content}>
                        {renderActiveTabContent()}
                    </div>
                </>
            }
        </div>
    );
};

