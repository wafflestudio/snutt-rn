import { createContext, useContext, useMemo } from 'react';
import { ErrorBoundary } from './app/components/ErrorBoundary';
import { Text, View } from 'react-native';
import { createFetchClient } from './infrastructures/createFetchClient';
import { createTimetableRepository } from './infrastructures/createTimetableRepository';
import { createTimetableService } from './infrastructures/createTimetableService';
import { TimetableService } from './usecases/timetableService';
import { App } from './app/App';

type ExternalProps = {
  'x-access-token': string;
  'x-build-number': string;
  'x-os-version': string;
  'x-device-model': string;
  'x-os-type': 'android' | 'ios';
  'x-access-apikey': string;
  'x-device-id': string;
  'x-app-type': string;
  'x-app-version': string;
};
type ServiceContext = { timetableService: TimetableService };
const serviceContext = createContext<ServiceContext | null>(null);
export const useServiceContext = () => {
  const context = useContext(serviceContext);
  if (!context) throw new Error('context not provided');
  return context;
};

export const Main = ({
  'x-access-token': xAccessToken,
  'x-access-apikey': xAccessApikey,
}: ExternalProps) => {
  const fetchClient = createFetchClient(baseUrl, xAccessToken, xAccessApikey);
  const timetableRepository = createTimetableRepository(fetchClient);
  const timetableService = createTimetableService({
    repositories: [timetableRepository],
  });

  const contextValue = useMemo(
    () => ({ timetableService }),
    [timetableService],
  );

  return (
    <ErrorBoundary
      fallback={
        <View>
          <Text>오류가 발생했습니다.</Text>
        </View>
      }
    >
      <serviceContext.Provider value={contextValue}>
        <App />
      </serviceContext.Provider>
    </ErrorBoundary>
  );
};

const baseUrl = 'https://snutt-api-dev.wafflestudio.com';
