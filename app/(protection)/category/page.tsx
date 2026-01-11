'use client';

import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Card, Divider, Row, Table, Typography } from "antd";
import type { TableColumnsType } from 'antd';

const { Title } = Typography;

interface StatusType {
    id: string;
    sortOrder: number,
    title: string
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

interface PriorityType {
    id: string;
    sortOrder: number,
    title: string
}
const priorityColumns: TableColumnsType<PriorityType> = [
    { title: 'STT', dataIndex: 'sortOrder', key: 'sortOrder' },
    { title: 'Tên', dataIndex: 'title', key: 'title' },
    {
        title: 'Hành động', key: 'action', render: (_, record) => ( //record là bảng ghi dòng hiện tại
            <Row>
                <Button
                    type="primary"
                    className="mx-2"
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
    return (
        <Card>
            <Title level={3}>Danh mục</Title>
            <Row
                justify="space-between"
                align="middle"
                className="mb-2"
            >
                <Title level={5}>Trạng thái</Title>
                <Button type="primary">Thêm trạng thái</Button>
            </Row>
            <Table rowKey="id" dataSource={statusData} columns={statusColumns} />
            <Divider />
            <Row
                justify="space-between"
                align="middle"
                className="mb-2"
            >
                <Title level={5}>Mức độ ưu tiên</Title>
                <Button type="primary">Thêm độ ưu tiên</Button>
            </Row>
            <Table rowKey="id" dataSource={priorityData} columns={priorityColumns} />
        </Card>
    )
}