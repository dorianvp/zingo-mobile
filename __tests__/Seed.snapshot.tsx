/**
 * @format
 */

import 'react-native';
import React from 'react';

import { render } from '@testing-library/react-native';
import Seed from '../components/Seed';
import {
  defaultAppStateLoaded,
  ContextAppLoadedProvider,
  defaultAppStateLoading,
  ContextAppLoadingProvider,
} from '../app/context';
import { CurrencyNameEnum, SeedActionEnum } from '../app/AppState';

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
describe('Component Seed - test', () => {
  //snapshot test
  const stateLoaded = defaultAppStateLoaded;
  stateLoaded.translate = (p: string) => {
    if (p === 'seed.buttontexts') {
      return `{
        "new": ["new"],
        "change": ["change"],
        "server": ["server"],
        "view": ["view"],
        "restore": ["restore"],
        "backup": ["backup"]
      }`;
    } else {
      return 'text translated';
    }
  };
  stateLoaded.wallet = {
    seed: 'pepe lolo titi',
    birthday: 1500100,
  };
  stateLoaded.info.currencyName = CurrencyNameEnum.ZEC;
  stateLoaded.totalBalance.total = 1.12345678;
  const onOk = jest.fn();
  const onCancel = jest.fn();
  test('Seed View - snapshot', () => {
    const seed = render(
      <ContextAppLoadedProvider value={stateLoaded}>
        <Seed onClickOK={onOk} onClickCancel={onCancel} action={SeedActionEnum.view} setPrivacyOption={jest.fn()} />
      </ContextAppLoadedProvider>,
    );
    expect(seed.toJSON()).toMatchSnapshot();
  });
  test('Seed Change - snapshot', () => {
    const seed = render(
      <ContextAppLoadedProvider value={stateLoaded}>
        <Seed onClickOK={onOk} onClickCancel={onCancel} action={SeedActionEnum.change} setPrivacyOption={jest.fn()} />
      </ContextAppLoadedProvider>,
    );
    expect(seed.toJSON()).toMatchSnapshot();
  });
  test('Seed Server - snapshot', () => {
    const seed = render(
      <ContextAppLoadedProvider value={stateLoaded}>
        <Seed onClickOK={onOk} onClickCancel={onCancel} action={SeedActionEnum.server} setPrivacyOption={jest.fn()} />
      </ContextAppLoadedProvider>,
    );
    expect(seed.toJSON()).toMatchSnapshot();
  });
  test('Seed Backup - snapshot', () => {
    const seed = render(
      <ContextAppLoadedProvider value={stateLoaded}>
        <Seed onClickOK={onOk} onClickCancel={onCancel} action={SeedActionEnum.backup} setPrivacyOption={jest.fn()} />
      </ContextAppLoadedProvider>,
    );
    expect(seed.toJSON()).toMatchSnapshot();
  });
  const stateLoading = defaultAppStateLoading;
  stateLoading.translate = (p: string) => {
    if (p === 'seed.buttontexts') {
      return `{
        "new": ["new"],
        "change": ["change"],
        "server": ["server"],
        "view": ["view"],
        "restore": ["restore"],
        "backup": ["backup"]
      }`;
    } else {
      return 'text translated';
    }
  };
  stateLoading.wallet = {
    seed: 'pepe lolo titi',
    birthday: 1500100,
  };
  stateLoading.info.latestBlock = 1900100;
  stateLoading.totalBalance.total = 1.12345678;
  test('Seed New - snapshot', () => {
    const seed = render(
      <ContextAppLoadingProvider value={stateLoading}>
        <Seed onClickOK={onOk} onClickCancel={onCancel} action={SeedActionEnum.new} setPrivacyOption={jest.fn()} />
      </ContextAppLoadingProvider>,
    );
    expect(seed.toJSON()).toMatchSnapshot();
  });
  test('Seed Restore - snapshot', () => {
    const seed = render(
      <ContextAppLoadingProvider value={stateLoading}>
        <Seed onClickOK={onOk} onClickCancel={onCancel} action={SeedActionEnum.restore} setPrivacyOption={jest.fn()} />
      </ContextAppLoadingProvider>,
    );
    expect(seed.toJSON()).toMatchSnapshot();
  });
});
