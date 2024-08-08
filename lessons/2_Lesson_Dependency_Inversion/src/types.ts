export type Task = {
  id: string;
  title: string;
  done: boolean;
  ownerId?: string;
};

export type TUserSelectSlot = React.ComponentType<{
  userId?: string;
  onChangeUserId: (value: string) => void;
}>;
