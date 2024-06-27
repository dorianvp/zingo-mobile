/**
 * @format
 */

import 'react-native';
import React from 'react';

import { render } from '@testing-library/react-native';
import { ShowUfvk } from '../components/Ufvk';
import { defaultAppContextLoaded, ContextAppLoadedProvider } from '../app/context';
import { CurrencyNameEnum, UfvkActionEnum } from '../app/AppState';

jest.useFakeTimers();
jest.mock('@fortawesome/react-native-fontawesome', () => ({
  FontAwesomeIcon: '',
}));
jest.mock('react-native-localize', () => ({
  getNumberFormatSettings: () => {
    return {
      decimalSeparator: '.',
      groupingSeparator: ',',
    };
  },
}));
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');
jest.mock('@react-native-community/netinfo', () => {
  const RN = jest.requireActual('react-native');

  RN.NativeModules.RNCNetInfo = {
    execute: jest.fn(() => '{}'),
  };

  return RN;
});
jest.mock('react-native', () => {
  const RN = jest.requireActual('react-native');

  RN.NativeModules.RPCModule = {
    execute: jest.fn(() => '{}'),
  };

  return RN;
});

// test suite
describe('Component ShowUfvk - test', () => {
  //snapshot test
  const state = defaultAppContextLoaded;
  state.translate = () => 'text translated';
  state.info.currencyName = CurrencyNameEnum.ZEC;
  state.totalBalance.total = 1.12345678;
  state.wallet.ufvk =
    'uview1234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890';
  const onClose = jest.fn();
  const onOK = jest.fn();
  test('ShowUfvk - snapshot', () => {
    const ufvk = render(
      <ContextAppLoadedProvider value={state}>
        <ShowUfvk onClickCancel={onClose} onClickOK={onOK} action={UfvkActionEnum.view} setPrivacyOption={jest.fn()} />
      </ContextAppLoadedProvider>,
    );
    expect(ufvk.toJSON()).toMatchSnapshot();
  });
});
