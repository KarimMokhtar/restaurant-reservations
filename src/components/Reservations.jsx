import React, { useRef, useState } from "react";
import moment from "moment";
import { Button, Input, Space, Table, DatePicker, Tag } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { AREA_FILTERS, SHIFT_FILTERS, STATUS_FILTERS, statusTagMap, TABLE_DATA_INDEX } from "../constants";

const Reservations = ({ data }) => {
  const searchInput = useRef(null);
  const [businessDateFilters, setBusinessDateFilters] = useState([]);

  const handleSearch = (_, confirm) => {
    confirm();
  };

  const handleReset = clearFilters => {
    clearFilters();
    setBusinessDateFilters([]);
  };

  const getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div style={{ padding: 8 }} onKeyDown={e => e.stopPropagation()}>
        {dataIndex === "businessDate" ? (
          <DatePicker.RangePicker
            style={{ marginBottom: 8, display: "block" }}
            value={businessDateFilters}
            onChange={dates => {
              setBusinessDateFilters(dates);
              setSelectedKeys([dates]); // Ensure selectedKeys is an array
            }}
          />
        ) : (
          <Input
            ref={searchInput}
            placeholder={`Search ${TABLE_DATA_INDEX[dataIndex]}`}
            value={selectedKeys[0]}
            onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
            onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
            style={{ marginBottom: 8, display: "block" }}
          />
        )}
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}>
            Search
          </Button>
          <Button onClick={() => clearFilters && handleReset(clearFilters)} size="small" style={{ width: 90 }}>
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
            }}>
            Filter
          </Button>
          <Button type="link" size="small" onClick={close}>
            Close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: filtered => <SearchOutlined style={{ color: filtered ? "#1677ff" : undefined }} />,
    onFilter: (value, record) => {
      if (dataIndex === "businessDate") {
        const [start, end] = value;
        const businessDate = moment(record[dataIndex], "DD.MM.YYYY");
        return businessDate.isBetween(new Date(start), new Date(end), null, "[]");
      } else if (dataIndex === "firstName" || dataIndex === "lastName")
        return (
          record.customer[dataIndex] &&
          record.customer[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
        );

      return record[dataIndex] && record[dataIndex].toString().toLowerCase().includes(value.toLowerCase());
    },
    onFilterDropdownOpenChange: visible => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: text => text,
  });

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: "5%",
      sorter: (a, b) => a.id - b.id,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Date",
      dataIndex: "businessDate",
      key: "businessDate",
      width: "10%",
      sorter: (a, b) => new Date(a.businessDate) - new Date(b.businessDate),
      sortDirections: ["descend", "ascend"],
      ...getColumnSearchProps("businessDate"),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: "15%",
      filters: STATUS_FILTERS,
      onFilter: (value, record) => record.status.startsWith(value),
      render: status => <Tag color={statusTagMap[status]}>{status.toUpperCase()}</Tag>,
    },
    {
      title: "Customer First Name",
      dataIndex: ["customer", "firstName"],
      key: "customer.firstName",
      sorter: (a, b) => a.customer.firstName.localeCompare(b.customer.firstName),
      sortDirections: ["descend", "ascend"],
      ...getColumnSearchProps("firstName"),
    },
    {
      title: "Customer Last Name",
      dataIndex: ["customer", "lastName"],
      key: "customer.lastName",
      sorter: (a, b) => a.customer.lastName.localeCompare(b.customer.lastName),
      sortDirections: ["descend", "ascend"],
      ...getColumnSearchProps("lastName"),
    },
    {
      title: "Shift",
      dataIndex: "shift",
      key: "shift",
      filters: SHIFT_FILTERS,
      onFilter: (value, record) => record.shift.startsWith(value),
    },
    {
      title: "Area",
      dataIndex: "area",
      key: "area",
      filters: AREA_FILTERS,
      onFilter: (value, record) => record.area.startsWith(value),
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      width: "10%",
      sorter: (a, b) => a.quantity - b.quantity,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Guest Notes",
      dataIndex: "guestNotes",
      key: "guestNotes",
    },
  ];

  return <Table rowKey={"id"} columns={columns} dataSource={data} />;
};

export default Reservations;
