export interface TabItem {
  id: number;
  name: string;
  component?: React.ComponentType<any> | undefined; // Make it optional
  icon: string;
  headerShown?: boolean;
  isAddButton?: boolean;
}

export type TabsArray = TabItem[];
