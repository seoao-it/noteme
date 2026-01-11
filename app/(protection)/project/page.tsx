'use client';

import { BarcodeOutlined, CalendarOutlined, DeleteOutlined, EditOutlined, FundProjectionScreenOutlined } from "@ant-design/icons";
import { Button, Card, Modal, Row, Typography, Form, Input, DatePicker, Flex, Table } from "antd";
import { useState } from "react";
import type { TableColumnsType } from 'antd';
import dayjs from 'dayjs';

const { Title } = Typography;
type ProjectType = {
    id: string,
    sortOrder: number,
    code: string,
    name: string,
    description?: string,
    fromDate: string,
    toDate: string,
    totalTask: number,
    progressTask: number
}
const data: ProjectType[] = [
    {
        id: "1",
        sortOrder: 1,
        code: "Daily",
        name: "Công việc hàng ngày",
        description: "Công việc có tính chu kỳ hàng ngày",
        fromDate: "01/01/2026 12:00:00",
        toDate: "01/01/2027 12:00:00",
        totalTask: 0,
        progressTask: 0
    }
]
export default function Project() {
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState<string>("Thêm dự án");
    const [selectedProject, setSelectedProject] = useState<ProjectType | undefined>(undefined);
    const [form] = Form.useForm();
    const addEditProject = (id?: string) => {
        setOpen(true);
        if (!id) {
            setTitle("Thêm dự án");
            setSelectedProject(undefined);
        }
        else {
            var item = data.find(e => e.id === id);
            if(item){
                setSelectedProject(item);
            }
            setTitle("Cật nhật dự án");
        }
    }
    const onSubmit = () => {

    }
    const colums: TableColumnsType<ProjectType> = [
        { title: 'STT', dataIndex: 'sortOrder', key: 'sortOrder' },
        { title: 'Ký hiệu', dataIndex: 'code', key: 'code' },
        { title: 'Tên dự án', dataIndex: 'name', key: 'name' },
        { title: 'Mô tả', dataIndex: 'description', key: 'description' },
        { title: 'Ngày bắt đầu', dataIndex: 'fromDate', key: 'fromDate' },
        { title: 'Ngày kết thúc', dataIndex: 'toDate', key: 'toDate' },
        { title: 'Đang thực hiện', dataIndex: 'progressTask', key: 'progressTask' },
        { title: 'Tổng  số công việc', dataIndex: 'totalTask', key: 'totalTask' },
        {
            title: 'Hành động', key: 'action', render: (_, record) => (
                <Row>
                    <Button
                        type="primary"
                        className="m-2"
                        onClick={() => addEditProject(record.id)}
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
            )
        },
    ]
    return (
        <Card>
            <Row
                justify='space-between'
                align='middle'
            >
                <Title level={3}>Dự án</Title>
                <Button
                    type="primary"
                    onClick={() => addEditProject()}
                >
                    Thêm dự án
                </Button>
            </Row>
            <Table rowKey="id" dataSource={data} columns={colums} />
            <Modal
                title={title}
                open={open}
                onOk={() => onSubmit()}
                onCancel={() => {
                    setOpen(false);
                }}
            >
                <Form
                    form={form}
                >
                    <Form.Item>
                        <Input
                            placeholder="Ký hiệu"
                            className="mt-5"
                            value={selectedProject?.code}
                            prefix={<BarcodeOutlined />}
                        />
                    </Form.Item>
                    <Form.Item>
                        <Input
                            placeholder="Tên dự án"
                            value={selectedProject?.name}
                            prefix={<FundProjectionScreenOutlined />}
                        />
                    </Form.Item>
                    <Form.Item>
                        <DatePicker
                            placeholder="Ngày bắt đầu"
                            className="w-full"
                            value={dayjs(selectedProject?.fromDate)}
                            prefix={<CalendarOutlined />}
                        />
                    </Form.Item>
                    <Form.Item>
                        <DatePicker
                            placeholder="Ngày kết thúc"
                            className="w-full"
                            value={dayjs(selectedProject?.toDate)}
                            prefix={<CalendarOutlined />}
                        />
                    </Form.Item>
                    <Form.Item>
                        <Input.TextArea
                        value={selectedProject?.description}
                            placeholder="Mô tả"
                        />
                    </Form.Item>
                </Form>
            </Modal>
        </Card>
    )
}