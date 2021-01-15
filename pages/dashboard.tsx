import { useAuth } from '@lib/auth';
import { EmptyState } from '@containers/Dashboard/EmptyState';

const Dashboard = () => {
  const auth = useAuth();

  if (!auth.user) {
    return 'Loading...';
  }

  return <EmptyState />;
};

export default Dashboard;