import { useState } from "react";
import { Button, Form, Input, Typography, Card, message } from "antd";
import { LockOutlined, PhoneOutlined } from "@ant-design/icons";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import logo from "/logo.svg";
import "./LoginPage.css";

message.config({
  top: 80,
  duration: 4,
  maxCount: 1,
});

export default function LoginPage() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState<boolean>(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const onFinish = async (values: LoginFormValues) => {
    setLoading(true);
    try {
      await login(values);
      navigate("/chat");
    }
    catch (error) {
      const errorMsg = (error as Error).message || "Login failed. Please try again.";
      message.error(errorMsg);
    }
    finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <Card className="login-card">
        <div className="login-header">
          <img src={logo} alt="ConnectedIn Logo" className="login-logo" />
          <Typography.Text className="login-subtitle">Sign in to start chatting</Typography.Text>
        </div>

        <Form
          form={form}
          name="login"
          onFinish={onFinish}
          layout="vertical"
          className="login-form"
          disabled={loading}>
          <Form.Item
            name="phone"
            rules={[
              {
                required: true,
                message: "Please enter your phone number!"
              },
              {
                pattern: /^(97|98)\d{8}$/,
                message: "Please enter a valid phone number!",
              },
            ]}>
            <Input
              prefix={<PhoneOutlined className="input-icon" />}
              placeholder="Phone (10 digits)"
              size="large"
              className="login-input"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{
              required: true,
              message: "Please enter your password!"
            }]}>
            <Input.Password
              prefix={<LockOutlined className="input-icon" />}
              placeholder="Password"
              size="large"
              className="login-input"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              className="login-button"
              loading={loading}
              disabled={loading}
              block>
              Sign In
            </Button>
          </Form.Item>

          <div className="login-footer">
            <Button
              type="link"
              onClick={() => message.warning("Please contact your admin to reset your password.")}
              disabled={loading}
              className="forgot-password">
              Forgot password?
            </Button>
          </div>
        </Form>
      </Card>
    </div>
  );
};