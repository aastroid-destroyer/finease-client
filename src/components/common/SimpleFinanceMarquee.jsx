import Marquee from "react-fast-marquee";

export default function SimpleFinanceMarquee({name}) {
    return (
        <Marquee pauseOnHover={true} speed={50} gradient={false} className="mt-10">
            <div className=" mr-10 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/90 text-sm font-medium">
               {name}
            </div>
            <div className=" mr-10 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/90 text-sm font-medium">
               {name}
            </div>
            <div className=" mr-10 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/90 text-sm font-medium">
               {name}
            </div>
            <div className=" mr-10 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/90 text-sm font-medium">
               {name}
            </div>
            <div className=" mr-10 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/90 text-sm font-medium">
               {name}
            </div>
            <div className=" mr-10 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/90 text-sm font-medium">
               {name}
            </div>
            <div className=" mr-10 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/90 text-sm font-medium">
               {name}
            </div>
            <div className=" mr-10 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/90 text-sm font-medium">
               {name}
            </div>
            
            
        </Marquee>
    );
}
