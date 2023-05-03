import React, { useEffect, useMemo, useState } from 'react';
import { useLocalStorage } from '@buidly/dapp-core/dist/hooks';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import {
  useGetAccount,
  useGetActiveTransactionsStatus
} from '@multiversx/sdk-dapp/hooks';
import { Loader, PageState } from '@multiversx/sdk-dapp/UI';
import { getIsLoggedIn } from '@multiversx/sdk-dapp/utils';
import BigNumber from 'bignumber.js';
import { useGetDappConfig } from 'hooks/useGetDappConfig';
import { AccountToken, ConvertToken } from 'types';
import {
  ConvertButton,
  ConvertInfo,
  ConvertLayout,
  TokenTable
} from './components';
import { TransactionsSignedInfo } from './components/TransactionsSignedInfo';
import { computeValueAfterFees } from './helpers';
import { useGetConvertTokens, useGetProtocolFee } from './hooks';
import { useGetAccountTokens } from './hooks/useGetAccountTokens';
import { useGetSwapDustTokens } from './hooks/useGetSwapDustTokens';

const MIN_AMOUNT = 0.01;
const SUGGESTED_SLIPPAGE = 0.02;
const DEFAULT_SLIPPAGE = 0.01;

const ConvertPage = () => {
  const { dappConfig, loading: configLoading } = useGetDappConfig();

  const referralTag = localStorage.getItem('xdc_ref');

  const { address } = useGetAccount();
  const isLoggedIn = Boolean(address);

  const {
    tokens: accountTokens,
    isLoading,
    error,
    reloadTokens
  } = useGetAccountTokens();
  const {
    tokens: convertTokens,
    loading: convertTokensLoading,
    error: convertTokensError
  } = useGetConvertTokens();

  const { swapDustTokens, loading: txLoading } = useGetSwapDustTokens();

  const protocolFee = useGetProtocolFee();
  const { success, pending } = useGetActiveTransactionsStatus();

  const [checkedTokens, setCheckedTokens] = useState<AccountToken[]>([]);
  const [convertToken, setConvertToken] = useLocalStorage<
    ConvertToken | undefined
  >('xdc_token', undefined);

  const [manualSlippageChange, setManualSlippageChange] = useState(false);
  const [slippage, setSlippage] = useLocalStorage<number>(
    'xdc_slippage',
    DEFAULT_SLIPPAGE
  );

  const totalWegld = checkedTokens.reduce((value, token) => {
    return value.plus(new BigNumber(token.valueWegld));
  }, new BigNumber(0));

  const totalUsd = checkedTokens.reduce((value, token) => {
    return value.plus(new BigNumber(token.valueUsd));
  }, new BigNumber(0));

  const totalWegldAfterFees = computeValueAfterFees(
    totalWegld,
    protocolFee,
    slippage
  );

  const totalTokenAfterFees = new BigNumber(totalWegldAfterFees).dividedBy(
    convertToken?.priceWEGLD ?? '1'
  );

  const totalUsdAfterFees = computeValueAfterFees(
    totalUsd,
    protocolFee,
    slippage
  );

  const handleCheckedTokens = (newCheckedTokens: AccountToken[]) => {
    setCheckedTokens(newCheckedTokens);
    setManualSlippageChange(false);
  };

  const handleChangedSlippage = (newSlippage: number) => {
    setSlippage(newSlippage);
    setManualSlippageChange(true);
  };

  useEffect(() => {
    if (manualSlippageChange || totalWegldAfterFees.isZero()) {
      return;
    }

    if (
      totalWegldAfterFees.isGreaterThan(MIN_AMOUNT) &&
      slippage === SUGGESTED_SLIPPAGE
    ) {
      setSlippage(DEFAULT_SLIPPAGE);
    } else if (
      totalWegldAfterFees.isLessThanOrEqualTo(MIN_AMOUNT) &&
      slippage !== SUGGESTED_SLIPPAGE
    ) {
      setSlippage(SUGGESTED_SLIPPAGE);
    }
  }, [totalWegldAfterFees, manualSlippageChange]);

  useEffect(() => {
    if (convertTokens.length > 0 && convertToken === undefined) {
      setConvertToken(
        convertTokens.find((t) => t.identifier.includes('WEGLD')) ??
          convertTokens[0]
      );
    }
  }, [convertTokens]);

  const hasTokens = checkedTokens.length > 0;

  useEffect(() => {
    if (success) {
      reloadTokens();
    }
  }, [success]);

  const tokens = useMemo(() => {
    return accountTokens?.filter(
      (token) => token.identifier !== convertToken?.identifier
    );
  }, [accountTokens, convertToken]);

  if (isLoading || convertTokensLoading || configLoading) {
    return <Loader />;
  }

  if (
    error ||
    protocolFee === undefined ||
    dappConfig === undefined ||
    convertTokensError
  ) {
    return (
      <div className='my-5'>
        <PageState
          icon={faClose}
          className='text-muted'
          title='Unable to load.'
        />
      </div>
    );
  }

  const handleSubmit = async (event: React.MouseEvent) => {
    event.preventDefault();

    try {
      // TODO insert token
      swapDustTokens(
        new BigNumber(totalWegldAfterFees).shiftedBy(18).toFixed(),
        checkedTokens,
        convertToken?.identifier ?? '',
        referralTag
      );
    } catch (err) {
      console.log('processConvertTransaction error', err);
    }
  };

  return (
    <div>
      <TokenTable
        tokens={tokens}
        convertToken={convertToken}
        setCheckedTokens={handleCheckedTokens}
      />
      {isLoggedIn && (
        <ConvertInfo
          token={convertToken}
          allTokens={convertTokens}
          onTokenChange={setConvertToken}
          totalToken={totalTokenAfterFees}
          totalUsd={totalUsdAfterFees}
          totalWegld={totalWegldAfterFees}
          protocolFee={protocolFee}
          slippage={slippage}
          setSlippage={handleChangedSlippage}
        />
      )}
      <ConvertButton
        handleSubmit={handleSubmit}
        disabled={!hasTokens || pending || txLoading}
        loading={pending || txLoading}
      />
      {getIsLoggedIn() && hasTokens && (
        <TransactionsSignedInfo transactions={1} />
      )}
    </div>
  );
};

export const Convert = () => (
  <ConvertLayout>
    <ConvertPage />
  </ConvertLayout>
);
