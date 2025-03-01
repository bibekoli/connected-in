import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Form, Input, Select, InputNumber, Card, message } from "antd";
import { updateCurrentUser } from "@/redux/actions/currentUserAction";

const { TextArea } = Input;
const { Option } = Select;

export default function ProfilePage() {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const currentUser = useSelector((state: ReduxState) => state.currentUser);
  const [isEditing, setIsEditing] = useState(false);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    form.setFieldsValue(currentUser);
  }, [currentUser, form]);

  const onFinish = async (values: any) => {
    setUpdating(true);

    // Simulate API request
    await new Promise((resolve) => setTimeout(resolve, 2000));

    dispatch(updateCurrentUser(values));
    setIsEditing(false);
    setUpdating(false);
    message.success("Profile updated successfully!");
  };

  const onFinishFailed = () => {
    message.error("Please fill in all required fields correctly.");
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
        title="My Profile"
        extra={
          <Button type="primary" onClick={() => setIsEditing(!isEditing)}>
            {isEditing ? "Cancel" : "Edit"}
          </Button>
        }>
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          disabled={!isEditing}>
          <Form.Item
            label="Name"
            name="name"
            rules={[{
              required: true,
              message: "Please enter your name!"
            }]}>
            <Input size="large" />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please enter your email!" },
              { type: "email", message: "Please enter a valid email!" },
            ]}>
            <Input size="large" />
          </Form.Item>

          <Form.Item
            label="Age"
            name="age"
            rules={[
              {
                required: true,
                message: "Please enter your age!"
              },
              {
                type: "number",
                min: 1,
                max: 120,
                message: "Age must be between 1 and 120!"
              },
            ]}>
            <InputNumber size="large" style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            label="Gender"
            name="gender"
            rules={[{
              required: true,
              message: "Please select your gender!"
            }]}>
            <Select size="large">
              <Option value="Male">Male</Option>
              <Option value="Female">Female</Option>
              <Option value="Other">Other</Option>
            </Select>
          </Form.Item>

          <Form.Item label="Phone" name="phone">
            <Input size="large" />
          </Form.Item>

          <Form.Item label="Location" name="location">
            <Input size="large" />
          </Form.Item>

          <Form.Item label="Bio" name="bio">
            <TextArea size="large" rows={4} />
          </Form.Item>

          {
            isEditing && (
              <Form.Item>
                <Button
                  loading={updating}
                  disabled={updating}
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
};