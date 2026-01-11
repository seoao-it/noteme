'use client';
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Card, Checkbox, Col, Flex, Form, Image, Input, Row, theme, Typography } from "antd";

const { Title, Text } = Typography;
const { useToken } = theme;

export default function SignIn() {
    const [form] = Form.useForm();
    const { token } = useToken();

    return (
        <Flex
            justify="center"
            align="center"
            className={`w-[100vw] min-h-[100vh] bg-[${token.colorPrimary}]`}
        >
            <Card
                // className="md:min-w-[800px] w-full"
            >
                <Title
                    level={3}
                    className="mt-10"
                >Đăng nhập</Title>
                <Row
                    justify="space-between"
                    className="mt-10"
                    gutter={24}
                >
                    <Col
                        xs={24}
                        md={12}
                    >
                        <Form
                            form={form}
                            requiredMark={false}
                        >

                            <Form.Item>
                                <Input placeholder="Tên đăng nhập" prefix={<UserOutlined />} />
                            </Form.Item>
                            <Form.Item>
                                <Input.Password prefix={<LockOutlined />} />
                            </Form.Item>
                            <Form.Item>
                                <Checkbox>
                                    Lưu đăng nhập
                                </Checkbox>
                            </Form.Item>

                            <Button
                                type="primary"
                                className="w-full"
                            >
                                Đăng nhập
                            </Button>
                        </Form>
                    </Col>
                    <Col
                        xs={0}
                        sm={12}
                    >
                        <Image
                            preview={false}
                            alt="login"
                            src="/assets/images/login-side.png" />
                    </Col>
                </Row>
            </Card>
        </Flex>
    )
}