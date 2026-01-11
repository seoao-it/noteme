'use client';

import { Button, Card, Drawer, Form, Row, Select, Typography } from "antd";
import { useEffect, useState } from "react";

const { Title } = Typography;

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
    priority: string
}
const data: TaskType[] = [
    {
        id: "1",
        sortOrder: 1,
        code: "HSK1",
        name: "Học tiếng trung",
        description: "Chazo",
        status: "Đang thực hiện",
        priority: "Trung bình"
    }
]
export default function Task() {
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState<string>("Thêm công việc");
    const [selectedTask, setSelectedTask] = useState<TaskType | undefined>(undefined);
    const [selectedProject, setSelectedProject] = useState<ProjectType | undefined>(undefined);
    const addEditProject = (id?: string) => {
        if(!id){
            setTitle("Thêm công việc");
            setSelectedTask(undefined);
        }
        else {
            setTitle("Cật nhật công việc");
            const item = data.find(e => e.id === id);
            if(item){
                setSelectedTask(item);
            }
        }
        setOpen(true);
    }
    const selectedProjectDefault = () => {
        const item = projects.length > 0 ? projects[0] : undefined;
        setSelectedProject(item);
    }
    useEffect(() => {
        selectedProjectDefault();
    }, [])
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
                    Thêm công việc
                </Button>
            </Row>
            <Form>
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
            </Form>

            <Drawer
                title={title}
                closable={{ 'aria-label': 'Close Button' }}
                onClose={() => setOpen(false)}
                open={open}
            >
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
            </Drawer>
        </Card>
    )
}