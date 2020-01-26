export interface AuthStateModel {
  id?: number;
  username?: string;
  roles?: string[];
  accessToken?: string;
  tokenType?: string;
  initialized?: boolean;
}


