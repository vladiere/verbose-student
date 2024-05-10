// Object returned on insert and update database
export interface IMySQLResult {
  insertId: number;
  message: string;
  status: number;
  affectedRows: number;
  changedRows: number;
  fieldCount: number;
  info: string;
  serverStatus: number;
  warningStatus: number;
}
export interface IUser {
  id: number;
  username: string;
  password: string;
  message: string;
  insertId: number;
  status: number;
}
