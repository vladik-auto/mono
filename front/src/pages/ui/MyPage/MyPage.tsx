import cls from './MyPage.module.scss';
import { ChangeEvent, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { Button, Text } from '@shared/ui';
import { BorderEnum, classNames, ColorEnum, SizeEnum } from '@shared/lib';
import { Input } from '@shared/ui/Input';


export interface IFormChange {
    img: Blob | File | null | string;
    firstName: string
    lastName: string
    middleName: string
    email: string,
    address: string,
    password: string,
    repeatPassword: string,
}

export const MyPage = () => {
    const [img, setImg] = useState<File | null>();
    const {
        register,
        handleSubmit,
        control,
        reset,
        watch,
        setValue,
        getValues,
        formState: { errors },
    }
        = useForm<IFormChange>({
        defaultValues: {
            firstName: 'Альберт',
            middleName: 'Владимирович',
            lastName: 'Курагин',
            email: 'test@gmail.com',
            address: 'Краснодар, ЖД. вокзал Краснодар 1',
            password: '',
            repeatPassword: '',
        },
    });


    const firstName = register('firstName');
    const middleName = register('middleName');
    const lastName = register('lastName');
    const email = register('email');
    const address = register('address');
    const password = register('password', {
        minLength: {
            value: 6,
            message: 'Пароль должен содержать как минимум 6 символов',
        },
        maxLength: {
            value: 20,
            message: 'Пароль должен содержать не более 20 символов',
        },
    });
    const repeatPassword = register('repeatPassword', {
        validate: (value: string) => {
            if (watch('password') !== value) {
                return 'Пароли не совпадают';
            }
        },
    });

    const submit: SubmitHandler<IFormChange> = (data: IFormChange) => {
        const formData = new FormData();
        for (const [key, value] of Object.entries(data)) {
            formData.set(key, value);
        }
        if (img) {
            formData.set('img', img);
        }
    };


    const handleReset = () => {
        setImg(null);
        reset({
            img: '',
            firstName: '',
            lastName: '',
            middleName: '',
            email: '',
            address: '',
            password: '',
            repeatPassword: '',
        });
    };

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files.length > 0) {
            const file = files[0];
            const imageTypeRegex = /^image\//;
            if (imageTypeRegex.test(file.type)) {
                setImg(file);
                // setValue("img", file);
            } else {
                setImg(null);
                // setValue("img", null);
                toast.error('Выберите файл изображения');
            }
        }
    };


    return (
        <form onSubmit={handleSubmit(submit)} className={cls.form}>
            <div className={cls.mainInfo}>
                <div className={cls.avatar}>
                    {getValues('img') ? (
                        <img
                            src={`
                                    ${import.meta.env.VITE_SERVER_FILES}/user/$}`} alt="" />
                    ) : img ? (
                        <img src={URL.createObjectURL(img)} alt="" />
                    ) : (
                        <Text.Heading
                            color={ColorEnum.TEXT}
                            size={SizeEnum.H6}
                        >
                            T
                        </Text.Heading>
                    )}
                    <input
                        onChange={handleFileChange}
                        className={cls.avatarFile} type="file" />
                </div>
                <div className={cls.info}>
                    <Text.Heading
                        color={ColorEnum.TEXT}
                        size={SizeEnum.H6}
                    >
                        Основная информация
                    </Text.Heading>
                    <Controller
                        name="firstName"
                        control={control}
                        render={({ field }) => (
                            <div className={cls.wrapper}>
                                <Input
                                    className={classNames('', {
                                        [cls.errorInput]: errors.firstName !== undefined,
                                    }, [])}
                                    type="text"
                                    label="Имя"
                                    value={field.value}
                                    border={BorderEnum.H5}
                                    onChange={field.onChange}
                                    size={SizeEnum.H2}
                                    name="firstName"
                                    register={firstName}
                                />
                                {errors.firstName &&
                                    <Text.Paragraph
                                        className={cls.error}
                                        color={ColorEnum.TEXT}
                                        size={SizeEnum.H2}>{errors.firstName.message}</Text.Paragraph>}
                            </div>
                        )}
                    />
                    <Controller
                        name="middleName"
                        control={control}
                        render={({ field }) => (
                            <div className={cls.wrapper}>
                                <Input
                                    className={classNames('', {
                                        [cls.errorInput]: errors.middleName !== undefined,
                                    }, [])}
                                    type="text"
                                    label="Отчество"
                                    value={field.value}
                                    border={BorderEnum.H5}
                                    onChange={field.onChange}
                                    size={SizeEnum.H2}
                                    name="middleName"
                                    register={middleName}
                                />
                                {errors.middleName &&
                                    <Text.Paragraph
                                        className={cls.error}
                                        color={ColorEnum.TEXT}
                                        size={SizeEnum.H2}>{errors.middleName.message}</Text.Paragraph>}
                            </div>
                        )}
                    />
                    <Controller
                        name="lastName"
                        control={control}
                        render={({ field }) => (
                            <div className={cls.wrapper}>
                                <Input
                                    className={classNames('', {
                                        [cls.errorInput]: errors.lastName !== undefined,
                                    }, [])}
                                    type="text"
                                    label="Фамилия"
                                    value={field.value}
                                    border={BorderEnum.H5}
                                    onChange={field.onChange}
                                    size={SizeEnum.H2}
                                    name="lastName"
                                    register={lastName}
                                />
                                {errors.lastName &&
                                    <Text.Paragraph
                                        className={cls.error}
                                        color={ColorEnum.TEXT}
                                        size={SizeEnum.H2}>{errors.lastName.message}</Text.Paragraph>}
                            </div>
                        )}
                    />
                </div>
            </div>
            <div className={cls.additionalInfo}>
                <Text.Heading
                    color={ColorEnum.TEXT}
                    size={SizeEnum.H6}
                >
                    Рабочая информация
                </Text.Heading>
                <Controller
                    name="email"
                    control={control}
                    render={({ field }) => (
                        <div className={cls.wrapper}>
                            <Input
                                className={classNames('', {
                                    [cls.errorInput]: errors.email !== undefined,
                                }, [])}
                                type="text"
                                label="Почта"
                                value={field.value}
                                border={BorderEnum.H5}
                                onChange={field.onChange}
                                size={SizeEnum.H2}
                                name="username"
                                register={email}
                            />
                            {errors.email &&
                                <Text.Paragraph
                                    className={cls.error}
                                    color={ColorEnum.TEXT}
                                    size={SizeEnum.H2}>{errors.email.message}</Text.Paragraph>}
                        </div>
                    )}
                />
                <Controller
                    name="address"
                    control={control}
                    render={({ field }) => (
                        <div className={cls.wrapper}>
                            <Input
                                className={classNames('', {
                                    [cls.errorInput]: errors.address !== undefined,
                                }, [])}
                                type="text"
                                label="Адрес работы"
                                value={field.value}
                                border={BorderEnum.H5}
                                onChange={field.onChange}
                                size={SizeEnum.H2}
                                name="address"
                                register={address}
                            />
                            {errors.address &&
                                <Text.Paragraph
                                    className={cls.error}
                                    color={ColorEnum.TEXT}
                                    size={SizeEnum.H2}>{errors.address.message}</Text.Paragraph>}
                        </div>
                    )}
                />
            </div>
            <div className={cls.passwords}>
                <Text.Heading
                    color={ColorEnum.TEXT}
                    size={SizeEnum.H6}
                >
                    Пароли
                </Text.Heading>
                <Controller
                    name="password"
                    control={control}
                    render={({ field }) => (
                        <div className={cls.wrapper}>
                            <Input
                                className={classNames('', {
                                    [cls.errorInput]: errors.password !== undefined,
                                }, [])}
                                type="password"
                                label="Пароль"
                                value={field.value}
                                border={BorderEnum.H5}
                                onChange={field.onChange}
                                size={SizeEnum.H2}
                                name="password"
                                register={password}
                            />
                            {errors.password &&
                                <Text.Paragraph
                                    className={cls.error}
                                    color={ColorEnum.TEXT}
                                    size={SizeEnum.H2}>{errors.password.message}</Text.Paragraph>}
                        </div>
                    )}
                />

                <Controller
                    name="repeatPassword"
                    control={control}
                    render={({ field }) => (
                        <div className={cls.wrapper}>
                            <Input
                                className={classNames('', {
                                    [cls.errorInput]: errors.repeatPassword !== undefined,
                                }, [])}
                                type="password"
                                label="Повторите пароль"
                                value={field.value}
                                border={BorderEnum.H5}
                                onChange={field.onChange}
                                size={SizeEnum.H2}
                                name="repeatPassword"
                                register={repeatPassword}
                            />
                            {errors.repeatPassword &&
                                <Text.Paragraph
                                    className={cls.error}
                                    color={ColorEnum.TEXT}
                                    size={SizeEnum.H2}>{errors.repeatPassword.message}</Text.Paragraph>}
                        </div>
                    )}
                />

            </div>
            <div className={cls.buttons}>
                <Button
                    className={cls.button}

                    border={BorderEnum.H5}
                    type="submit"
                    color={ColorEnum.WHITE}
                    bgColor={ColorEnum.PRIMARY}
                    size={SizeEnum.H2}>
                    Отправить
                </Button>
                <Button
                    border={BorderEnum.H5}
                    className={cls.button}
                    type="button"
                    color={ColorEnum.WHITE}
                    bgColor={ColorEnum.DANGER}
                    size={SizeEnum.H2}
                    onClick={handleReset}
                >
                    Очистить
                </Button>
            </div>
        </form>
    );
};