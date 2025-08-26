import { useNetworkStatus } from '../hooks/useNetworkStatus';

export function NetworkStatus() {
  const { isOnline, wasOffline } = useNetworkStatus();

  if (isOnline && !wasOffline) return null;

  return (
    <div className={`
      fixed top-0 left-0 right-0 z-50 text-center py-2 text-sm font-medium transition-colors duration-300
      ${isOnline 
        ? 'bg-success-600 text-white' 
        : 'bg-danger-600 text-white'
      }
    `}>
      {isOnline 
        ? '🟢 Connection restored - refreshing...' 
        : '🔴 No internet connection - working offline'
      }
    </div>
  );
}