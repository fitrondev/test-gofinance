import HeroImg from "@/assets/hero.svg";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="h-[calc(100vh-64px)] flex items-center justify-center">
      <div className="container lg:h-[500px] grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="flex flex-col items-center lg:items-start justify-center gap-4">
          <h1 className="text-3xl lg:text-5xl font-bold text-primary text-center lg:text-start">
            <span className="text-foreground">GoFinance</span> is the best way
            to manage your finances
          </h1>
          <p className="sm:text-xl text-center lg:text-start">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            <br className="hidden sm:block" />
            Donec malesuada lorem max.
          </p>

          <div>
            <Button asChild>
              <Link to="/auth/register">Get Started</Link>
            </Button>
          </div>
        </div>

        <div className="flex items-center justify-center">
          <img src={HeroImg} alt="" className="size-full" />
        </div>
      </div>
    </section>
  );
};
export default Hero;
