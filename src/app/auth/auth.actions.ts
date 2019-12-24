// Actions
export class CheckSession {
  static type = '[Auth] CheckSession';
}

export class Login {
  static readonly type = '[Auth] Login';

  constructor(public payload: { username: string, password: string }) {
  }
}

export class Logout {
  static readonly type = '[Auth] Logout';
}


// Events
export class LoginRedirect {
  static type = '[Auth] LoginRedirect';
}

export class LoginSuccess {
  static type = '[Auth] LoginSuccess';

  constructor(public data: any) {
  }
}

export class LoginFailed {
  static type = '[Auth] LoginFailed';

  constructor(public error: any) {
  }
}
