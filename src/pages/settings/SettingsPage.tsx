import ProfileSettings from "../profile/ProfileSettings";

export default function SettingsPage() {
  return (
    <div className="max-w-3xl mx-auto">

      <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">
        Settings
      </h1>

      <ProfileSettings />

    </div>
  );
}