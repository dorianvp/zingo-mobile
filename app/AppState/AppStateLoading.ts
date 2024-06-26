import { StackScreenProps } from '@react-navigation/stack';

import TotalBalanceClass from './classes/TotalBalanceClass';

import InfoType from './types/InfoType';
import WalletType from './types/WalletType';
import ZecPriceType from './types/ZecPriceType';
import BackgroundType from './types/BackgroundType';
import { TranslateType } from './types/TranslateType';
import NetInfoType from './types/NetInfoType';
import BackgroundErrorType from './types/BackgroundErrorType';
import ServerType from './types/ServerType';
import SnackbarType from './types/SnackbarType';
import SecurityType from './types/SecurityType';

import { CurrencyEnum } from './enums/CurrencyEnum';
import { LanguageEnum } from './enums/LanguageEnum';
import { ModeEnum } from './enums/ModeEnum';
import { SelectServerEnum } from './enums/SelectServerEnum';
import { ChainNameEnum } from './enums/ChainNameEnum';
import { AppStateStatus } from 'react-native';

export default interface AppStateLoading {
  // state
  route: StackScreenProps<any>['route'];
  appStateStatus: AppStateStatus;
  screen: number;
  actionButtonsDisabled: boolean;
  walletExists: boolean;
  customServerShow: boolean;
  customServerUri: string;
  customServerChainName: ChainNameEnum;
  biometricsFailed: boolean;
  startingApp: boolean;
  serverErrorTries: number;
  donationAlert: boolean;
  firstLaunchingMessage: boolean;

  // context
  navigation: StackScreenProps<any>['navigation'];
  netInfo: NetInfoType;
  wallet: WalletType;
  totalBalance: TotalBalanceClass;
  info: InfoType;
  zecPrice: ZecPriceType;
  background: BackgroundType;
  translate: (key: string) => TranslateType;
  backgroundError: BackgroundErrorType;
  setBackgroundError: (title: string, error: string) => void;
  readOnly: boolean;
  snackbars: SnackbarType[];
  addLastSnackbar: (snackbar: SnackbarType) => void;

  // settings
  server: ServerType;
  currency: CurrencyEnum;
  language: LanguageEnum;
  sendAll: boolean;
  donation: boolean;
  privacy: boolean;
  mode: ModeEnum;
  security: SecurityType;
  selectServer: SelectServerEnum;
  rescanMenu: boolean;

  // eslint-disable-next-line semi
}
