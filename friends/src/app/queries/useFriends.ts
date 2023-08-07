import { useQuery } from '@tanstack/react-query';
import { useServiceContext } from '../../main';

export const useFriends = (req: { state: 'REQUESTED' | 'REQUESTING' | 'ACTIVE' }) => {
  const { friendService } = useServiceContext();
  return useQuery(['friends', req] as const, ({ queryKey: [, params] }) => friendService.listFriends(params));
};