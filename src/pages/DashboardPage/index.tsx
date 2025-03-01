import RegistrationChart from "@/components/charts/UserRegistrationChart";
import DailyActiveUsers from "@/components/charts/DailyActiveUsersChart";
import MessagesSentChart from "@/components/charts/MessagesSentChart";
import UsersByAgeChart from "@/components/charts/UsersByAgeChart";
import ActiveTimeDataChart from "@/components/charts/UsersActiveEachHourChart";
import TotalUsersChart from "@/components/charts/TotalUsersChart";
import UsersByMessagesChart from "@/components/charts/UsersByMessagesChart";
import { Card, Row, Col } from "antd";

export default function DashboardPage() {
  return (
    <div
      style={{
        padding: 16,
        background: "#f0f2f5",
        minHeight: "100vh",
      }}>
      <Card style={{ marginBottom: 16 }}>
        <RegistrationChart />
      </Card>
      <Row gutter={[16, 16]}>
        <Col xs={24} md={12}>
          <Card>
            <DailyActiveUsers />
          </Card>
        </Col>
        <Col xs={24} md={12}>
          <Card>
            <MessagesSentChart />
          </Card>
        </Col>
        <Col xs={24} md={12}>
          <Card>
            <UsersByAgeChart />
          </Card>
        </Col>
        <Col xs={24} md={12}>
          <Card>
            <ActiveTimeDataChart />
          </Card>
        </Col>
        <Col xs={24} md={12}>
          <Card>
            <TotalUsersChart />
          </Card>
        </Col>
        <Col xs={24} md={12}>
          <Card>
            <UsersByMessagesChart />
          </Card>
        </Col>
      </Row>
    </div>
  );
}
