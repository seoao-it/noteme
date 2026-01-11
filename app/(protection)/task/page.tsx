'use client';

import { BarcodeOutlined, CalendarOutlined, DeleteOutlined, EditOutlined, OrderedListOutlined } from "@ant-design/icons";
import { Button, Card, DatePicker, Drawer, Form, Input, Row, Select, Table, Typography } from "antd";
import { useEffect, useState } from "react";
import type { TableColumnsType } from 'antd';
import dayjs from "dayjs";

const { Title, Text } = Typography;

type ProjectType = {
    id: string,
    code: string,
    name: string
}
const projects: ProjectType[] = [
    {
        id: "1",
        code: "Daily",
        name: "Công việc hàng ngày"
    }
]
type TaskType = {
    id: string,
    sortOrder: number,
    code: string,
    name: string,
    description?: string,
    status: string,
    priority: string,
    deadline: string
}
const data: TaskType[] = [
    {
        id: "1",
        sortOrder: 1,
        code: "HSK1",
        name: "Học tiếng trung",
        description: "Chazo",
        status: "Đang thực hiện",
        priority: "Trung bình",
        deadline: "01/01/2027"
    }
]
export default function Task() {
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState<string>("Thêm công việc");
    const [selectedTask, setSelectedTask] = useState<TaskType | undefined>(undefined);
    const [selectedProject, setSelectedProject] = useState<ProjectType | undefined>(undefined);
    const addEditTask = (id?: string) => {
        if (!id) {
            setTitle("Thêm công việc");
            setSelectedTask(undefined);
        }
        else {
            setTitle("Cật nhật công việc");
            const item = data.find(e => e.id === id);
            if (item) {
                setSelectedTask(item);
            }
        }
        setOpen(true);
    }
    const selectedProjectDefault = () => {
        const item = projects.length > 0 ? projects[0] : undefined;
        setSelectedProject(item);
    }
    const columns: TableColumnsType<TaskType> = [
        { title: 'STT', dataIndex: 'sortOrder', key: 'sortOrder' },
        { title: 'Ký hiệu', dataIndex: 'code', key: 'code' },
        { title: 'Tên công việc', dataIndex: 'name', key: 'name' },
        { title: 'Thời hạn', dataIndex: 'deadline', key: 'deadline' },
        { title: 'Ưu tiên', dataIndex: 'priority', key: 'priority' },
        { title: 'Trạng thái', dataIndex: 'status', key: 'status' },
        { title: 'Hành động', key: 'action', render: (_, record) => (
            <Row>
                    <Button
                        type="primary"
                        className="m-2"
                        onClick={() => addEditTask(record.id)}
                    >
                        <EditOutlined />
                    </Button>
                    <Button
                        type="primary"
                        className="m-2"
                    >
                        <DeleteOutlined />
                    </Button>
                </Row>
        )},
    ]
    useEffect(() => {
        selectedProjectDefault();
    }, [])
    return (
        <Card>
            <Row
                justify='space-between'
                align='middle'
            >
                <Title level={3}>Công việc</Title>
                <Button
                    type="primary"
                    onClick={() => addEditTask()}
                >
                    Thêm công việc
                </Button>
            </Row>
            <Select
                    showSearch={{ optionFilterProp: 'label', filterSort: (optionA, optionB) => (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase()), }}
                    style={{ width: 200 }}
                    placeholder="Tìm kiếm dự án"
                    defaultValue={selectedProject?.id}
                    options={projects.map(e => ({
                        value: e.id,
                        label: e.name,
                    }))}
                />
            <Table rowKey="id" dataSource={data} columns={columns} className="mt-3"/>
            <Drawer
                title={title}
                closable={{ 'aria-label': 'Close Button' }}
                onClose={() => setOpen(false)}
                open={open}
            >
                <Form>
                    <Title level={5}>Dự án: {selectedProject?.name}</Title>
                    <Form.Item>
                        {/* Sẽ viết hàm tạo gợi ý tự động */}
                        <Input placeholder="Ký hiệu" prefix={<BarcodeOutlined />} value={selectedTask?.code}/>
                    </Form.Item>
                    <Form.Item>
                        <Input placeholder="Tên công việc" prefix={<OrderedListOutlined />} value={selectedTask?.name}/>
                    </Form.Item>
                    <Form.Item>
                        <DatePicker placeholder="Thời hạn" prefix={<CalendarOutlined />} className="w-full" value={dayjs(selectedTask?.deadline)}/>
                    </Form.Item>
                    <Form.Item>
                        <Input.TextArea placeholder="Mô tả" value={selectedTask?.description}/>
                    </Form.Item>
                    <Button
                        type="primary"
                        className="w-full"
                    >
                        Lưu
                    </Button>
                </Form>
            </Drawer>
        </Card>
    )
}