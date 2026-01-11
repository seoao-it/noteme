'use client';

import { LockFilled, LockOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Card, Col, Flex, Form, Image, Input, Row, Typography } from "antd";

const { Title, Text } = Typography;
export default function SingUp() {
    return (
        <Flex
            justify="center"
            align="center"
            className="min-h-screen"
        >
            <Card>
                <Row
                    justify="space-between"
                    align="middle"
                    gutter={24}
                >
                    <Col
                        xs={0}
                        md={12}
                    >
                        <Image
                            alt="register"
                            src="/assets/images/register-side.png"
                            className="md:block hidden"
                            preview={false}
                        />
                    </Col>
                    <Col
                    xs={24}
                        md={12}
                    >
                        <Form
                            requiredMark={false}
                            className="w-full"
                        >
                            <Title
                                level={3}
                                className="pb-10"
                            >Đăng ký</Title>
                            <Form.Item>
                                <Input
                                    placeholder="Họ và tên"
                                    prefix={<UserOutlined />}
                                />
                            </Form.Item>
                            <Form.Item>
                                <Input
                                    type='email'
                                    placeholder="Email"
                                    prefix={<MailOutlined />}
                                />
                            </Form.Item>
                            <Form.Item>
                                <Input.Password
                                    placeholder="Nhập mật khẩu"
                                    prefix={<LockFilled />}
                                />
                            </Form.Item>
                            <Form.Item>
                                <Input.Password
                                    placeholder="Nhập lại mật khẩu"
                                    prefix={<LockOutlined />}
                                />
                            </Form.Item>
                            <Button
                                type="primary"
                                className="w-full"
                            >
                                Đăng ký
                            </Button>
                            <Row align="middle">
                                <Text>Đã có tài khoản?</Text>
                                <Button type="link">Đăng nhập</Button>
                            </Row>
                        </Form>
                    </Col>
                </Row>
            </Card>
        </Flex>
    )
}