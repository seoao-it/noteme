import { ConfigProvider } from 'antd';
import { ReactNode } from 'react';

type ThemeProviderProps = {
    children: ReactNode
}
export default function ThemeProvider(props: ThemeProviderProps) {
    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: '#FF6767',
                    borderRadius: 8,
                    fontSize: 14,
                },
            }}
        >
            {props.children}
        </ConfigProvider>
    );
}