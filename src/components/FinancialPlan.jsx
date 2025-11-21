import Button from "./common/Button";

const FinancialPlanningInfo = () => {
    const features = [
        { title: "Smart Analytics", icon: "📊", description: "Get insights into your spending and trends." },
        { title: "Budget Planning", icon: "📈", description: "Plan your budget effectively and save more." },
        { title: "Expense Tracking", icon: "💳", description: "Track every expense and stay on top of your finances." },
        { title: "Financial Goals", icon: "🎯", description: "Set and achieve your personal financial goals." },
        { title: "Investment Insights", icon: "💹", description: "Make informed decisions with investment data." },
        { title: "Secure & Private", icon: "🔒", description: "Your data stays safe and fully private." },
    ];
    return (
        <div className="relative bg-cover bg-center bg-no-repeat overflow-hidden"
            style={{
                backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url('/bg_One.jpg')`,
            }}>
  
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-700 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-700 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
            </div>

            <section className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20 lg:py-24">
                <div className="flex flex-col gap-8 md:gap-12 lg:gap-16">
                    <div className="text-center md:text-left">
                        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                            Why Financial Planning <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Matters</span>
                        </h2>

                        <div className="mt-6 space-y-4">
                            <p className="text-lg sm:text-xl text-white/90 leading-relaxed max-w-3xl">
                                Financial planning is the foundation of building wealth and securing your future. By taking control of your
                                money today, you create opportunities for tomorrow.
                            </p>

                            <p className="text-lg sm:text-xl text-white/90 leading-relaxed max-w-3xl">
                                FinEase makes it simple to track spending, set goals, and make informed financial decisions with real-time
                                insights and actionable recommendations.
                            </p>
                        </div>

                        <div className="mt-8">
                            <Button name={"Learn More"} className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold px-8 py-3 rounded-full shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl" />
                        </div>
                    </div>

                    <div className="hidden md:block w-full h-px bg-gradient-to-r from-transparent via-gray-400 to-transparent"></div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                        {features.map(({ title, icon, description }, index) => (
                            <div
                                key={title}
                                className="group rounded-2xl p-6 text-center transition-all duration-500 hover:scale-105 bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 hover:shadow-xl"
                                style={{
                                    animationDelay: `${index * 100}ms`,
                                    animation: 'fadeInUp 0.6s ease-out forwards',
                                    opacity: 0
                                }}
                            >
                                <div className="text-4xl sm:text-5xl mb-3 transform transition-transform duration-300 group-hover:scale-110">{icon}</div>
                                <h3 className="font-semibold text-white text-base sm:text-lg lg:text-xl">{title}</h3>
                                <p className="mt-2 text-sm sm:text-base text-white/80">{description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            <style jsx="true">{`
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `}</style>
        </div>
    );
};

export default FinancialPlanningInfo;