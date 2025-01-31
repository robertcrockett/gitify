import React, { useContext, useMemo } from 'react';

import { AccountNotifications } from '../components/AccountNotifications';
import { AllRead } from '../components/AllRead';
import { AppContext } from '../context/App';
import { Oops } from '../components/Oops';

export const NotificationsRoute: React.FC = (props) => {
  const { notifications, requestFailed } = useContext(AppContext);

  const hasMultipleAccounts = useMemo(
    () => notifications.length > 1,
    [notifications]
  );
  const notificationsCount = useMemo(
    () =>
      notifications.reduce((memo, acc) => memo + acc.notifications.length, 0),
    [notifications]
  );
  const hasNotifications = useMemo(
    () => notificationsCount > 0,
    [notificationsCount]
  );

  if (requestFailed) {
    return <Oops />;
  }

  if (!hasNotifications) {
    return <AllRead />;
  }

  return (
    <div className="flex flex-col flex-1 bg-white dark:bg-gray-dark">
      {notifications.map((account) => (
        <AccountNotifications
          key={account.hostname}
          hostname={account.hostname}
          notifications={account.notifications}
          showAccountHostname={hasMultipleAccounts}
        />
      ))}
    </div>
  );
};
