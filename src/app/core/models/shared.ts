export enum OperationType {
  Add = 'add',
  Delete = 'delete',
}

export interface UpdateEventCart {
  isUpdateConfigLocal: boolean;
  operationType: OperationType;
}

export interface DEFAULT {
  isUpdateConfigLocal: true;
  operationType: OperationType.Add;
}
