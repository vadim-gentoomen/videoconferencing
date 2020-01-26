// Actions
export class CheckSession {
  static readonly type = '[Auth] CheckSession';
}

export class Login {
  static readonly type = '[Auth] Login';

  constructor(public payload: { username: string, password: string }) {
  }
}

export class Logout {
  static readonly type = '[Auth] Logout';
}

export class LogoutSuccess {
  static readonly type = '[Auth] LogoutSuccess';
}

// Events
export class LoginRedirect {
  static readonly type = '[Auth] LoginRedirect';
}

export class LoginSuccess {
  static readonly type = '[Auth] LoginSuccess';
}

export class LoginFailed {
  static readonly type = '[Auth] LoginFailed';

  constructor(public error: any) {
  }
}
