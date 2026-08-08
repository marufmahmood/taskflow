import { useEffect, useState } from "react";
import { auth } from "@/services/auth.service";
import { updateProfile } from "firebase/auth";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";

export default function ProfileSettings() {
  const user = auth.currentUser;

  const [name, setName] = useState(
    user?.displayName || ""
  );

  const [email] = useState(
    user?.email || ""
  );

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user?.displayName) {
      setName(user.displayName);
    }
  }, [user]);

  const handleSave = async () => {
    if (!user) {
      toast.error("User not found.");
      return;
    }

    if (!name.trim()) {
      toast.error("Name cannot be empty.");
      return;
    }

    try {
      setLoading(true);

      await updateProfile(user, {
        displayName: name.trim(),
      });

      toast.success("Profile updated successfully!");

    } catch (error) {
      console.error(error);
      toast.error("Failed to update profile.");

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">

      <h1 className="text-3xl font-bold text-white mb-8">
        Profile Settings
      </h1>

      <Card className="p-6 bg-slate-900 border-slate-700">

        <div className="space-y-6">

          {/* Name */}

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Name
            </label>

            <Input
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              placeholder="Enter your name"
              className="bg-slate-800 border-slate-700 text-white"
            />
          </div>


          {/* Email */}

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Email
            </label>

            <Input
              value={email}
              disabled
              className="bg-slate-800 border-slate-700 text-slate-400"
            />

            <p className="text-xs text-slate-500 mt-2">
              Email cannot be changed here.
            </p>
          </div>


          {/* Role */}

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Role
            </label>

            <Input
              value="Member"
              disabled
              className="bg-slate-800 border-slate-700 text-slate-400"
            />

            <p className="text-xs text-slate-500 mt-2">
              Your role can only be changed by an Admin.
            </p>
          </div>


          {/* Save */}

          <div className="flex justify-end">

            <Button
              onClick={handleSave}
              disabled={loading}
            >
              {loading
                ? "Saving..."
                : "Save Changes"}
            </Button>

          </div>

        </div>

      </Card>

    </div>
  );
}