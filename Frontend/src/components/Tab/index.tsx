import { useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Avatar,
  Typography,
  Tabs,
  TabsHeader,
  Tab,
  Switch,
  Tooltip,
  Button,
} from "@material-tailwind/react";

type TabsProps = {
  tabs: Array<{
    label: string;
    content: React.ReactNode;
  }>;
};

const TabIndex = (props: TabsProps) => {
  const [activeTab, setActiveTab] = useState(0);
  const { tabs } = props;
  const handleClick = (index: number) => {
    setActiveTab(index);
  };
  return (
    <div className="flex flex-col">
      
        <Tabs value="Active">
            <TabsHeader>
        {tabs.map((tab, index) => {
          const { label } = tab;
          return (
            
              <Tab value={label}  onClick={() => handleClick(index)}>
              {label}
              </Tab>
            
          );
        })}
        </TabsHeader>
            </Tabs>


           
      <div className="flex flex-col">
        <div className="p-2">
          {tabs.find((_, index) => index === activeTab)?.content}
        </div>
      </div>
    </div>
  );
};

export default TabIndex;
