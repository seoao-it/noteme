'use client';

import { AppstoreOutlined, AuditOutlined, BellOutlined, CheckSquareOutlined, FundProjectionScreenOutlined, OrderedListOutlined, ScheduleOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Form, Input, Layout, Popover, Row, Typography, theme, Menu } from "antd";
import { ReactNode, useEffect, useState } from "react";
import { Notification } from "./components/notification";
import type { GetProps, MenuProps } from 'antd';
import dayjs from 'dayjs';
import 'dayjs/locale/vi';
import { usePathname, useRouter } from 'next/navigation';

type ProtectionLayoutProps = {
    children: ReactNode
}
const { Header, Sider, Content } = Layout;
const { Title, Text } = Typography;
const { Search } = Input;
type MenuItem = Required<MenuProps>['items'][number];
const items: MenuItem[] = [
    {
        key: 'dashboard',
        label: "Tổng quan",
        icon: <AppstoreOutlined />
    },
    {
        key: 'progress',
        label: "Tiến độ công việc",
        icon: <CheckSquareOutlined />
    },
    {
        key: 'category',
        label: "Trạng thái",
        icon: <AuditOutlined />
    },
    {
        key: 'project',
        label: "Dự án",
        icon: <FundProjectionScreenOutlined />
    },
    {
        key: 'task',
        label: "Công việc",
        icon: <OrderedListOutlined />
    }
]
const labels: any[] = [
    {
        key: '/dashboard',
        label: "Tổng quan"
    },
    {
        key: '/progress',
        label: "Tiến độ công việc"
    },
    {
        key: '/category',
        label: "Trạng thái"
    },
    {
        key: '/project',
        label: "Dự án"
    },
    {
        key: '/task',
        label: "Công việc"
    }
]
export default function ProtectionLayout(props: ProtectionLayoutProps) {
    const [pageTitle, setPageTitle] = useState("Tổng quan");
    const [openNofication, setOpenNofication] = useState(false);
    const [dayOfWeek, setDayOfWeek] = useState(dayjs().format('dddd'));
    const [datetime, setDateTime] = useState(dayjs().format('DD/MM/YYYY'));
    const fullname = "Giàng Seo Áo";
    const email = "seoao.contact@gmail.com";
    const { token } = theme.useToken();
    const pathname = usePathname();
    const router = useRouter();
    const headerStyle: React.CSSProperties = {
        textAlign: 'center',
        color: '#000',
        height: 64,
        paddingInline: 48,
        lineHeight: '64px',
        backgroundColor: '#fff',
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
    };
    const contentStyle: React.CSSProperties = {
        // textAlign: 'center',
        minHeight: 120,
        // lineHeight: '120px',
        color: '#000',
        backgroundColor: '#fff',
        // paddingLeft: "1rem"
    };
    const siderStyle: React.CSSProperties = {
        // textAlign: 'center',
        lineHeight: '120px',
        color: '#fff',
        backgroundColor: "#fff",
        maxWidth: "250px",
        width: "25%",
        position: "relative"
    };
    type SearchProps = GetProps<typeof Input.Search>;
    const onSearch: SearchProps['onSearch'] = (value, _e, info) => console.log(info?.source, value);
    const onSelectMenu: MenuProps['onClick'] = (e) => {
        router.push(e.key);
    };
    const getPageLabel = () => {
        const item = labels.find(e => e?.key == pathname);
        console.log("route = " + pathname)
        if (item) {
            setPageTitle(item.label);
        }
    }

    useEffect(() => {
        getPageLabel();
    })
    return (
        <Layout className="h-[100vh]">
            <Header style={headerStyle} className="z-20">
                <Row
                    justify="space-between"
                    align="middle"
                >
                    <Title>{pageTitle}</Title>
                    <Form>
                        <Search
                            placeholder="Tìm kiếm..."
                            onSearch={onSearch}
                            enterButton
                            className="md:min-w-[600px]"
                        />
                    </Form>
                    <Row
                        align="middle"
                    >
                        <Popover
                            content={<Notification />}
                            title="Thông báo"
                            trigger="click"
                            open={openNofication}
                            onOpenChange={() => setOpenNofication(!openNofication)}
                            className="mx-3"
                        >
                            <Button
                                type="primary"
                            >
                                <BellOutlined />
                            </Button>
                        </Popover>
                        <Button
                            type="primary"
                            className="mx-3"
                        >
                            <ScheduleOutlined />
                        </Button>
                        <div className="pl-5 text-start">
                            <Title level={5} className="!mb-0 !mt-0 truncate">{dayOfWeek}</Title>
                            <Text className="block truncate max-w-[180px] mx-auto">{datetime}</Text>
                        </div>
                    </Row>
                </Row>
            </Header>
            <Layout>
                <Sider
                    style={siderStyle}
                    className="relative"
                >
                    <div
                        style={{
                            backgroundColor: token.colorPrimary,
                        }}
                        className="absolute left-0 right-0 top-12 bottom-0 rounded-tr-sm rounded-br-sm"
                    />
                    <div className="relative flex flex-col items-center pt-4 pb-6">
                        <Avatar
                            className="border-1 border-[white]"
                            size={60}
                            icon={<UserOutlined />}
                        />
                        <Title level={5} className="!mb-0 !mt-0 truncate">{fullname}</Title>
                        <Text className="block truncate max-w-[180px] mx-auto">{email}</Text>
                    </div>
                    <Menu
                        onClick={onSelectMenu}
                        defaultSelectedKeys={['dashboard']}
                        mode="inline"
                        items={items}
                    />
                </Sider>
                <Content style={contentStyle} className="pt-12 px-12 overflow-y-scroll">
                    {props.children}
                </Content>
            </Layout>
        </Layout>
    )
}