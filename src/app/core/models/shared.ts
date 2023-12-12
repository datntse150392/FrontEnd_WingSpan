export enum OperationType {
  Add = 'add',
  Delete = 'delete',
  Update = 'update',
}

export interface UpdateEventCart {
  isUpdateConfigLocal: boolean;
  operationType: OperationType;
}

export interface UpdateEventHeader {
  isUpdateConfigLocal: boolean;
  operationType: OperationType;
}

export interface DEFAULT {
  isUpdateConfigLocal: true;
  operationType: OperationType.Add;
}

export interface MessageToastActiveCourse {
  isActiveCourse: boolean;
  operationType: String;
}
