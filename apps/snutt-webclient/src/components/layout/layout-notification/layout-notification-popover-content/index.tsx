import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { type ReactNode } from 'react';
import styled from 'styled-components';

import { IcCalendar } from '@/components/icons/ic-calendar';
import { IcExclamation } from '@/components/icons/ic-exclamation';
import { IcRecycle } from '@/components/icons/ic-recycle';
import { IcTrash } from '@/components/icons/ic-trash';
import { usePopoverContext } from '@/components/popover';
import { serviceContext } from '@/contexts/ServiceContext';
import { useTokenAuthContext } from '@/contexts/TokenAuthContext';
import { type Notification } from '@/entities/notification';
import { useGuardContext } from '@/hooks/useGuardContext';

export const LayoutNotificationPopoverContent = () => {
  const { show } = usePopoverContext();
  const { data } = useNotificationList(show);

  return (
    <NotificationList>
      {data?.type === 'success' &&
        data.data.map((notification) => (
          <NotificationListItem
            data-testid="layout-notification-listitem"
            key={notification.type + notification.message + notification.createdAt.toISOString()}
          >
            <NotificationListItemIcon>{notificationTypeMap[notification.type]}</NotificationListItemIcon>
            <NotificationListItemContent>
              <NotificationContent>{notification.message}</NotificationContent>{' '}
              <NotificationDate>{dayjs(notification.createdAt).format('YYYY년 MM월 DD일')}</NotificationDate>
            </NotificationListItemContent>
          </NotificationListItem>
        ))}
    </NotificationList>
  );
};

const notificationTypeMap: Record<Notification['type'], ReactNode> = {
  NORMAL: <IcExclamation />,
  COURSEBOOK: <IcCalendar />,
  LECTURE_UPDATE: <IcRecycle />,
  LECTURE_REMOVE: <IcTrash />,
  LINK_ADDR: <IcExclamation />,
};

const useNotificationList = (show: boolean) => {
  const { notificationService } = useGuardContext(serviceContext);
  const { token } = useTokenAuthContext();

  return useQuery({
    queryKey: ['NotificationService', 'getList', { token }] as const,
    queryFn: ({ queryKey }) => notificationService.getList(queryKey[2]),
    enabled: show,
  });
};

const NotificationList = styled.ul`
  overflow-y: scroll;
  max-height: 200px;
  padding: 0;
  margin: 0;
`;

const NotificationListItem = styled.li`
  border-bottom: 1px solid #eee;
  padding: 8px 0;
  display: flex;
  transition: background-color 0.1s;

  &:hover {
    background-color: #fafafa;
  }
`;

const NotificationListItemIcon = styled.div`
  width: 30px;
  min-width: 30px;
  display: flex;
  justify-content: space-between;
  height: 100%;
  align-items: center;
`;

const NotificationListItemContent = styled.div``;

const NotificationContent = styled.span`
  font-size: 14px;
`;

const NotificationDate = styled.span`
  font-size: 12px;
  opacity: 0.4;
`;
