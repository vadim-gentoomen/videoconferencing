import {RouterState} from '@ngxs/router-plugin';
import {Selector} from '@ngxs/store';

import {RouterStateParams} from './custom-router-state-serializer';

export class RouterSelector {

  @Selector([RouterState.state])
  static getAccountId(router: RouterStateParams): number | undefined {
    return Number(router.params.accountId) || undefined;
  }
}
