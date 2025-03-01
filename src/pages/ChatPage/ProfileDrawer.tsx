import { getTimeAgo } from "@/utils";
import { ClockCircleOutlined, HomeOutlined, MailOutlined, PhoneOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Col, Divider, Drawer, Row, Descriptions, Typography } from "antd";

export default function ProfileDrawer({ visible, closeProfileDrawer, selectedCustomer }: ProfileDrawerProps) {
  return (
    <Drawer
        open={visible}
        title="Profile Details"
        placement="right"
        onClose={closeProfileDrawer}
        width={350}
        closable={true}>
        <Row align="middle" gutter={16} style={{ marginBottom: 16 }}>
          <Col>
            <Avatar size={64} icon={<UserOutlined />} src={selectedCustomer?.avatar} />
          </Col>
          <Col>
            <Typography.Title level={4} style={{ margin: 0 }}>
              {selectedCustomer?.name}
            </Typography.Title>
          </Col>
        </Row>

        <Divider />

        <Descriptions column={1} bordered={true}>
          <Descriptions.Item label={<><MailOutlined /></>}>
            {selectedCustomer?.email}
          </Descriptions.Item>
          <Descriptions.Item label={<><PhoneOutlined /></>}>
            {selectedCustomer?.phone}
          </Descriptions.Item>
          <Descriptions.Item label={<><HomeOutlined /></>}>
            {selectedCustomer?.address}
          </Descriptions.Item>
          <Descriptions.Item label={<><ClockCircleOutlined /></>}>
            {
              getTimeAgo(selectedCustomer?.last_online)
            }
          </Descriptions.Item>
        </Descriptions>
      </Drawer>
  );
}

type ProfileDrawerProps = {
  visible: boolean;
  closeProfileDrawer: () => void;
  selectedCustomer: User | null;
};