import { useEffect, useState } from 'react';
import { ReferralDetails, TierDetails } from 'types';

export const useGetReferralDetails = () => {
  // const { network } = useGetNetworkConfig();

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>();
  const [referralDetails, setReferralDetails] = useState<
    ReferralDetails | undefined
  >(undefined);
  const [tiers, setTiers] = useState<TierDetails[]>([]);

  const refetchReferralDetails = async () => {
    try {
      setIsLoading(true);

      // TODO
      setTiers([]);

      // TODO
      setReferralDetails(undefined);
    } catch (err: any) {
      console.error(error);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refetchReferralDetails();
  }, []);

  return { referralDetails, tiers, isLoading, error, refetchReferralDetails };
};
