import { useState, useEffect, useRef } from "react";
import { Typography, List, Input, Button, Avatar, Skeleton, InputRef } from "antd";
import { SearchOutlined, UserOutlined, SendOutlined, InfoCircleOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import { getCustomersData } from "@/services/customer";
import "./ChatPage.css";
import { useDispatch, useSelector } from "react-redux";
const { Title, Text } = Typography;
import ProfileDrawer from "./ProfileDrawer";
import { updateCustomer, updateMessage } from "@/redux/actions/customerAction";
import { formatMessagesWithDateSeparators, getTimeAgo } from "@/utils";

export default function ChatPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { customerId } = useParams();
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [visible, setVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [loadingCustomers, setLoadingCustomers] = useState(false);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const customers = useSelector((state: ReduxState) => state.customers);
  const currentUser = useSelector((state: ReduxState) => state.currentUser);
  const messageBoxRef = useRef<InputRef>(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const fetchCustomers = async () => {
      setLoadingCustomers(true);
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const response = await getCustomersData();
        dispatch(updateCustomer(response));
      }
      catch (error) {
        console.error("Error fetching customers:", error);
      }
      finally {
        setLoadingCustomers(false);
      }
    };

    if (customers.length === 0) {
      fetchCustomers();
    }
  }, []);

  useEffect(() => {
    if (!customerId || customers.length === 0) return;

    setLoadingMessages(true);
    const selected = customers.find((customer) => customer.user_id.toString() === customerId);
    if (selected) {
      setSelectedCustomer(selected);
      const formattedMessages = formatMessagesWithDateSeparators(selected.messages);
      setMessages(formattedMessages);
    }
    else {
      setSelectedCustomer(null);
      setMessages([]);
    }
    if (messageBoxRef.current) {
      messageBoxRef.current.focus();
    }
    setLoadingMessages(false);
  }, [customerId, customers]);

  const handleCustomerSelect = (customer: any) => {
    setSelectedCustomer(customer);
    const formattedMessages = formatMessagesWithDateSeparators(customer.messages);
    setMessages(formattedMessages);
    navigate(`/chats/${customer.user_id}`);
  };

  const showProfileDrawer = () => setVisible(true);
  const closeProfileDrawer = () => setVisible(false);

  const sendMessage = () => {
    if (newMessage.trim() && selectedCustomer) {
      dispatch(updateMessage({
        sender: currentUser.user_id,
        customer_id: selectedCustomer.user_id,
        message: newMessage
      }));
      setNewMessage("");
    }
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const filteredCustomers = customers.filter((customer) =>
    customer.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleBackToList = () => {
    setSelectedCustomer(null);
    navigate("/chats");
  };

  return (
    <div className="chat-page-container">
      {(!isMobile || !selectedCustomer) && (
        <div className="customer-list">
          <Title level={4}>Chats</Title>
          <Input
            placeholder="Search customers"
            prefix={<SearchOutlined />}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ marginBottom: 16 }}
          />
          <div className="customer-list-container">
            {loadingCustomers ? (
              <Skeleton active paragraph={{ rows: 5 }} />
            ) : (
              <List
                dataSource={filteredCustomers}
                renderItem={(customer) => (
                  <List.Item
                    style={{ cursor: "pointer" }}
                    onClick={() => handleCustomerSelect(customer)}
                    className={selectedCustomer?.user_id === customer.user_id ? "selected" : ""}>
                    <List.Item.Meta
                      avatar={<Avatar icon={<UserOutlined />} src={customer.avatar} size={45} />}
                      title={customer.name}
                      description={
                        <div>
                          <Text ellipsis style={{ maxWidth: "50%" }}>
                            {customer.messages[customer.messages.length - 1]?.message || "No messages"}
                          </Text>
                          <Text type="secondary" style={{ float: "right" }}>
                            {getTimeAgo(customer.messages[customer.messages.length - 1]?.date)}
                          </Text>
                        </div>
                      }
                    />
                  </List.Item>
                )}
              />
            )}
          </div>
        </div>
      )}

      {(isMobile && selectedCustomer) || !isMobile ? (
        <div className="chat-container">
          {selectedCustomer ? (
            <>
              <div className="chat-header">
                {isMobile && (
                  <Button
                    type="text"
                    icon={<ArrowLeftOutlined />}
                    onClick={handleBackToList}
                    style={{ marginRight: 8 }}
                  />
                )}
                <Avatar icon={<UserOutlined />} src={selectedCustomer.avatar} size={42} />
                <div>
                  <Title level={4} style={{ margin: "0 0 0 10px" }}>
                    {selectedCustomer.name}
                  </Title>
                  <Text type="secondary" style={{ fontSize: 12, marginLeft: 10 }}>
                    Active {getTimeAgo(selectedCustomer.last_online)}
                  </Text>
                </div>
                <Button
                  type="text"
                  icon={<InfoCircleOutlined />}
                  onClick={showProfileDrawer}
                  style={{ marginLeft: "auto" }}
                />
              </div>
              <div className="messages-container" ref={chatContainerRef}>
                {loadingMessages ? (
                  <Skeleton active paragraph={{ rows: 10 }} />
                ) : (
                  messages.map((msg, index) =>
                    msg.type === "date-separator" ? (
                      <div key={msg.id} className="date-separator">
                        <Text type="secondary">{msg.date}</Text>
                      </div>
                    ) : (
                      <div
                        key={msg.id}
                        className={`message-bubble ${msg.sender == currentUser.user_id ? "outgoing" : "incoming"} ${index === messages.length - 1 ? "last" : ""}`}>
                        <Text
                          style={{
                            color: msg.sender == currentUser.user_id ? "white" : "black",
                            fontWeight: 400,
                          }}>
                          {msg.text}
                        </Text>
                        <Text
                          type="secondary"
                          style={{
                            fontSize: "10px",
                            display: "block",
                            textAlign: msg.sender == currentUser.user_id ? "right" : "left",
                            color: msg.sender == currentUser.user_id ? "white" : "black",
                            marginTop: 4,
                          }}>
                          {msg.time}
                        </Text>
                      </div>
                    )
                  )
                )}
              </div>
              <div className="message-input">
                <Input
                  autoFocus
                  ref={messageBoxRef}
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onPressEnter={sendMessage}
                  placeholder="Type a message..."
                  suffix={<Button type="primary" icon={<SendOutlined />} onClick={sendMessage} />}
                />
              </div>
            </>
          ) : (
            !isMobile && (
              <div className="no-chat-selected">
                <Text>Select a customer to start chatting</Text>
              </div>
            )
          )}
        </div>
      ) : null}

      <ProfileDrawer
        visible={visible}
        closeProfileDrawer={closeProfileDrawer}
        selectedCustomer={selectedCustomer}
      />
    </div>
  );
};