import { useState } from "react";
import { Button, Form, Input, Select, Card, Switch, Slider, Radio, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
const { Option } = Select;

export default function SettingsPage() {
  const [form] = Form.useForm();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSave = async (_values: any) => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setLoading(false);
    setIsEditing(false);
    message.success("Settings saved successfully!");
  };

  return (
    <div
      style={{
        maxWidth: "800px",
        margin: "0 auto",
        padding: 16,
        minHeight: "100vh",
      }}>
      <Card
        title="Settings"
        extra={
          <Button type="primary" onClick={() => setIsEditing(!isEditing)}>
            {isEditing ? "Cancel" : "Edit"}
          </Button>
        }>
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSave}
          disabled={!isEditing}>
          <Form.Item
            label="Username"
            name="username"
            rules={[{
              required: true,
              message: "Please enter your username!"
            }]}>
            <Input size="large" prefix={<UserOutlined />} />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{
              required: true,
              message: "Please enter your password!"
            }]}>
            <Input.Password size="large" prefix={<LockOutlined />} />
          </Form.Item>

          <Form.Item label="Email Notifications" name="emailNotifications" valuePropName="checked">
            <Switch defaultChecked />
          </Form.Item>

          <Form.Item label="Language" name="language">
            <Select size="large" defaultValue="english">
              <Option value="english">English</Option>
              <Option value="spanish">Spanish</Option>
              <Option value="french">French</Option>
            </Select>
          </Form.Item>

          <Form.Item label="Theme" name="theme">
            <Radio.Group size="large" defaultValue="light">
              <Radio value="light">Light</Radio>
              <Radio value="dark">Dark</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item label="Volume Level" name="volumeLevel">
            <Slider defaultValue={30} min={0} max={100} />
          </Form.Item>

          <Form.Item label="Enable Auto-Login" name="autoLogin" valuePropName="checked">
            <Switch />
          </Form.Item>

          <Form.Item label="Subscription Plan" name="subscriptionPlan">
            <Select size="large" defaultValue="basic">
              <Option value="basic">Basic</Option>
              <Option value="premium">Premium</Option>
              <Option value="enterprise">Enterprise</Option>
            </Select>
          </Form.Item>

          <Form.Item label="Country" name="country">
            <Select size="large" defaultValue="usa">
              <Option value="usa">USA</Option>
              <Option value="canada">Canada</Option>
              <Option value="uk">UK</Option>
            </Select>
          </Form.Item>

          <Form.Item label="Preferred Contact Method" name="contactMethod">
            <Radio.Group size="large" defaultValue="email">
              <Radio value="email">Email</Radio>
              <Radio value="phone">Phone</Radio>
              <Radio value="sms">SMS</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item label="Profile Visibility" name="visibility">
            <Radio.Group size="large" defaultValue="public">
              <Radio value="public">Public</Radio>
              <Radio value="private">Private</Radio>
            </Radio.Group>
          </Form.Item>

          {
            isEditing && (
              <Form.Item>
                <Button
                  loading={loading}
                  disabled={loading}
                  type="primary"
                  htmlType="submit">
                  Save
                </Button>
              </Form.Item>
            )
          }
        </Form>
      </Card>
    </div>
  );
}
