import { Button } from "./ui/button";

const AuthLeft = () => {
  return (
    <div className="hidden w-4/6 h-full bg-gradient-to-b from-[#0575E6] via-[#02298A] to-[#021B79] text-white lg:flex flex-col justify-center pl-40 gap-4">
      <h1 className="text-4xl font-bold">GoFinance</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. <br />{" "}
        Voluptate, unde distinctio officia dolorem modi sed.
      </p>

      <div>
        <Button>Read More</Button>
      </div>
    </div>
  );
};
export default AuthLeft;
