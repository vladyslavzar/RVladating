import { FC, ReactNode } from "react";
import { Layout } from "antd";

const { Content } = Layout;

interface ContainerProps {
  isHeader?: boolean;
  children: ReactNode;
}

const Container: FC<ContainerProps> = ({ isHeader, children }) => {
  return (
    <Layout className="layout">
      <Content style={{ padding: "50px" }}>{children}</Content>
    </Layout>
  );
};

export default Container;
