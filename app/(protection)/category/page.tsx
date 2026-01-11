'use client';

import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Card, Divider, Input, Modal, Row, Table, Typography } from "antd";
import type { TableColumnsType } from 'antd';
import { useState } from "react";

const { Title } = Typography;

interface StatusType {
    id: string;
    sortOrder: number,
    title: string
}

interface PriorityType {
    id: string;
    sortOrder: number,
    title: string
}
const statusData: StatusType[] = [
    {
        id: "1",
        sortOrder: 1,
        title: "Chưa thực hiện"
    },
    {
        id: "2",
        sortOrder: 2,
        title: "Đang thực hiện"
    },
    {
        id: "3",
        sortOrder: 3,
        title: "Đã hoàn thành"
    },
    {
        id: "4",
        sortOrder: 4,
        title: "Đã hủy"
    }
]
const priorityData: PriorityType[] = [
    {
        id: "1",
        sortOrder: 1,
        title: "Ưu tiên thấp"
    },
    {
        id: "2",
        sortOrder: 2,
        title: "Trung bình"
    },
    {
        id: "3",
        sortOrder: 3,
        title: "Việc gấp"
    }
]
export default function category() {
    const [modalTitle, setModalTitle] = useState("Thêm mới");
    const [openStatus, setOpenStatus] = useState(false);
    const [openPriority, setOpenPriority] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState<StatusType | undefined>(undefined);
    const [selectedPriority, setSelectedPriority] = useState<StatusType | undefined>(undefined);
    const addEditStatus = (id?: string) => {
        if (!id) {
            setModalTitle("Thêm trạng thái");
            setSelectedStatus(undefined);
        }
        else {
            setModalTitle("Chỉnh sửa trạng thái");
            setSelectedStatus(statusData.find(e => e.id == id));
        }
        setOpenStatus(true);
    }
    const addEditPriority= (id?: string) => {
        if (!id) {
            setModalTitle("Thêm mức độ ưu tiên");
            setSelectedPriority(undefined);
        }
        else {
            setModalTitle("Chỉnh sửa mức độ ưu tiên");
            setSelectedPriority(priorityData.find(e => e.id == id));
        }
        setOpenPriority(true);
    }
    const statusColumns: TableColumnsType<StatusType> = [
        { title: 'STT', dataIndex: 'sortOrder', key: 'sortOrder' },
        { title: 'Tên', dataIndex: 'title', key: 'title' },
        {
            title: 'Hành động', key: 'action', render: (_, record) => ( //record là bảng ghi dòng hiện tại
                <Row>
                    <Button
                        type="primary"
                        className="mx-2"
                        onClick={() => addEditStatus(record.id)}
                    >
                        <EditOutlined />
                    </Button>
                    <Button
                        type="primary"
                        className="mx-2"
                    >
                        <DeleteOutlined />
                    </Button>
                </Row>
            ),
        },
    ];
    const priorityColumns: TableColumnsType<PriorityType> = [
        { title: 'STT', dataIndex: 'sortOrder', key: 'sortOrder' },
        { title: 'Tên', dataIndex: 'title', key: 'title' },
        {
            title: 'Hành động', key: 'action', render: (_, record) => ( //record là bảng ghi dòng hiện tại
                <Row>
                    <Button
                        type="primary"
                        className="mx-2"
                        onClick={() => addEditPriority(record.id)}
                    >
                        <EditOutlined />
                    </Button>
                    <Button
                        type="primary"
                        className="mx-2"
                    >
                        <DeleteOutlined />
                    </Button>
                </Row>
            ),
        },
    ];
    return (
        <Card>
            <Title level={3}>Danh mục</Title>
            <Row
                justify="space-between"
                align="middle"
                className="mb-2"
            >
                <Title level={5}>Trạng thái</Title>
                <Button type="primary" onClick={() => addEditStatus()}>Thêm trạng thái</Button>
            </Row>
            <Table rowKey="id" dataSource={statusData} columns={statusColumns} />
            <Divider />
            <Row
                justify="space-between"
                align="middle"
                className="mb-2"
            >
                <Title level={5}>Mức độ ưu tiên</Title>
                <Button type="primary" onClick={() => addEditPriority()}>Thêm độ ưu tiên</Button>
            </Row>
            <Table rowKey="id" dataSource={priorityData} columns={priorityColumns} />
            <Modal
                title={modalTitle}
                onCancel={() => {
                    setOpenStatus(false);
                }}
                onOk={() => { }}
                open={openStatus}
            >
                <Input placeholder="Tên trạng thái" value={selectedStatus?.title} />
            </Modal>
            <Modal
                title={modalTitle}
                onCancel={() => {
                    setOpenPriority(false);
                }}
                onOk={() => { }}
                open={openPriority}
            >
                <Input placeholder="Tên mức độ ưu tiên" value={selectedPriority?.title} />
            </Modal>
        </Card>
    )
}