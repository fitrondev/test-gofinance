import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type ProfileProps = {
  source: string;
};

const Profile = ({ source }: ProfileProps) => {
  return (
    <Avatar>
      <AvatarImage src={source} />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  );
};
export default Profile;
