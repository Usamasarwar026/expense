export interface TabItem {
  id: number;
  name: string;
  component?: React.ComponentType<any> | undefined;
  icon: string;
  headerShown?: boolean;
  isAddButton?: boolean;
}

export type TabsArray = TabItem[];
