import { requireAuth } from '@/lib/auth';
import { SettingsForm } from '@/components/admin/SettingsForm';

export default async function SettingsPage() {
  await requireAuth();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-sm text-gray-500">Configure integrations and API keys.</p>
      </div>
      <SettingsForm />
    </div>
  );
}
