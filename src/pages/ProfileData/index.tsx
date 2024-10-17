import Profile from "@/components/layouts/Dashboard/Profile";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type ProfileDataProps = {
  user: { name: string; avatar: string; email: string };
};

const ProfileData = ({ user }: ProfileDataProps) => {
  return (
    <Dialog>
      <DialogTrigger className="flex items-center gap-2">
        <Profile source={user.avatar} />
        <p className="text-lg font-semibold">{user.name}</p>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>User Profile</DialogTitle>
          <DialogDescription>User profile data</DialogDescription>
        </DialogHeader>

        <div className="flex flex-col items-center space-y-4">
          <div className="w-24 h-24">
            <img
              src={user.avatar}
              alt="User Avatar"
              className="rounded-full w-full h-full object-cover"
            />
          </div>

          <div className="text-center">
            <p className="text-xl font-semibold">{user.name}</p>
            <p className="text-gray-500">{user.email}</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
export default ProfileData;
