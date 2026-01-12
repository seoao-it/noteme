'use client';
import { FundProjectionScreenOutlined, SwapOutlined } from "@ant-design/icons";
import { Button, Card, Col, Drawer, Modal, Row, Input, Typography, Table } from "antd";
import { useState } from "react";
import type { ChangeEvent } from "react";
import type { TableColumnsType, TableProps } from 'antd';

const { Title } = Typography;
const { Search } = Input;
type TableRowSelection<T extends object = object> = TableProps<T>['rowSelection'];
type ProjectType = {
    id: string,
    sortOrder: number,
    code: string,
    name: string
}
const projects: ProjectType[] = [
    {
        id: "1",
        sortOrder: 1,
        code: "HSK1",
        name: "Học tiếng trung"
    },
    {
        id: "2",
        sortOrder: 2,
        code: "Game",
        name: "Chơi game"
    },
    {
        id: "3",
        sortOrder: 3,
        code: "English",
        name: "Học tiếng anh"
    },
]
export default function Progress() {
    const [openSearchProject, setOpenSearchProject] = useState(false);
    const [currentProject, setCurrentProject] = useState<ProjectType | undefined>(undefined);
    const [searchKeyword, setSearchKeyword] = useState<string>("");

    const projectColums: TableColumnsType<ProjectType> = [
        { title: 'STT', dataIndex: 'sortOrder', key: 'sortOrder' },
        { title: 'Ký hiệu', dataIndex: 'code', key: 'code' },
        { title: 'Tên dự án', dataIndex: 'name', key: 'name' },
    ]
    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
        console.log('selectedRowKeys changed: ', newSelectedRowKeys);
        setCurrentProject(currentProject);
    };
    const projectRowSelection: TableRowSelection<ProjectType> = {
        selectedRowKeys: currentProject ? [currentProject.id] : [],
        onChange: onSelectChange,
    };
    return (
        <>
            <Row
                gutter={24}
                align="top"
            >
                <Col
                    xs={24}
                    md={16}
                >
                    <Card>
                        <Row>
                            <Title level={3}>
                                Tiến độ công việc
                            </Title>
                            <Button
                                className="mx-3"
                                onClick={() => setOpenSearchProject(true)}
                            >
                                <SwapOutlined />
                            </Button>
                        </Row>
                    </Card>
                </Col>
                <Col
                    xs={0}
                    md={8}
                >
                    <Card>
                        <Title level={3}>
                            {currentProject?.name ?? "Tên dự án"}
                        </Title>
                    </Card>
                </Col>
            </Row>
            <Drawer
                open={openSearchProject}
                title="Danh sách dự án"
                size="large"
                onClose={() => {
                    setOpenSearchProject(false);
                }}
            >
                <Search
                    placeholder="Nhập ký hiệu hoặc tên dự án"
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchKeyword(e.target.value)}
                    prefix={<FundProjectionScreenOutlined />}
                />
                <Table rowKey="id" rowSelection={projectRowSelection} columns={projectColums} dataSource={projects.filter(item => item.code.toLowerCase().includes(searchKeyword.toLowerCase()) || item.name.toLowerCase().includes(searchKeyword.toLowerCase()))} />
            </Drawer>
        </>
    )
}