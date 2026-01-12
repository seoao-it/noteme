'use client';
import { FundProjectionScreenOutlined, RetweetOutlined, ScheduleOutlined, SolutionOutlined } from "@ant-design/icons";
import { Button, Card, Col, Drawer, Modal, Row, Input, Typography, Table, Statistic, Radio } from "antd";
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

type TaskType = {
    id: string,
    sortOrder: number,
    code: string,
    name: string,
    deadline: string,
    isProgress: boolean,
    isDone: boolean
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

const tasks: TaskType[] = [
    {
        id: "1",
        sortOrder: 1,
        code: "Task1",
        name: "Công việc 1",
        deadline: "01/01/2026",
        isProgress: true,
        isDone: false
    },
    {
        id: "1",
        sortOrder: 2,
        code: "Task2",
        name: "Công việc ",
        deadline: "01/01/2026",
        isProgress: false,
        isDone: false
    },
    {
        id: "1",
        sortOrder: 3,
        code: "Task2",
        name: "Công việc ",
        deadline: "01/01/2026",
        isProgress: false,
        isDone: false
    }
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
    const onSelectChange = (
        selectedRowKeys: React.Key[],
        selectedRows: ProjectType[]
    ) => {
        setCurrentProject(selectedRows[0]);
    };
    const projectRowSelection: TableRowSelection<ProjectType> = {
        type: "radio",
        selectedRowKeys: currentProject ? [currentProject.id] : [],
        onChange: onSelectChange,
    };

    const taskColums: TableColumnsType<ProjectType> = [
        { title: 'STT', dataIndex: 'sortOrder', key: 'sortOrder' },
        { title: 'Ký hiệu', dataIndex: 'code', key: 'code' },
        { title: 'Tên công việc', dataIndex: 'name', key: 'name' },
        { title: 'Thời hạn', dataIndex: 'deadline', key: 'deadline' },
        {
        title: 'Đang thực hiện', key: 'isInProgress', render: (_, record) => (
                <Row
                    justify='center'
                >
                    <Radio />
                </Row>
            )
        },
        { title: 'Hoàn thành', key: 'isDone', render: (_, record) => (
                <Row
                    justify='center'
                >
                    <Radio />
                </Row>
            ) },
    ]
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
                                {currentProject?.name ?? "Tên dự án"}
                            </Title>
                            <Button
                                className="mx-3"
                                onClick={() => setOpenSearchProject(true)}
                            >
                                <RetweetOutlined />
                            </Button>
                        </Row>
                        <Table rowKey="id" columns={taskColums} dataSource={tasks} />
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
                        <Row
                            gutter={24}
                        >
                            <Col>
                                <Card variant="borderless">
                                    <Statistic
                                        title="Chưa thực hiện"
                                        value={15}
                                        precision={0}
                                        styles={{ content: { color: '#cf1322' } }}
                                        prefix={<SolutionOutlined />}
                                    // suffix="%"
                                    />
                                </Card>
                            </Col>
                            <Col>
                                <Card variant="borderless">
                                    <Statistic
                                        title="Hoàn thành"
                                        value={20}
                                        precision={0}
                                        styles={{ content: { color: '#3f8600' } }}
                                        prefix={<ScheduleOutlined />}
                                    // suffix="%"
                                    />
                                </Card>
                            </Col>
                        </Row>
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