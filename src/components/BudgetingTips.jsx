const BudgetingTips = () => {
    const tips = [
        {
            title: "50/30/20 Rule",
            description: "Allocate 50% to needs, 30% to wants, and 20% to savings and debt repayment.",
            icon: "📋",
        },
        {
            title: "Track Every Expense",
            description: "Keep a detailed record of all spending to identify areas where you can cut back.",
            icon: "✏️",
        },
        {
            title: "Build an Emergency Fund",
            description: "Save 3-6 months of living expenses for unexpected situations.",
            icon: "🏦",
        },
        {
            title: "Automate Your Savings",
            description: "Set up automatic transfers to savings at the beginning of each month.",
            icon: "⚙️",
        },
    ]
    return (
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-16 mb-16">
            {/* Section Header */}
            <div className="mb-12 text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                    Budgeting Tips for Success
                </h2>
                <p className="mt-4 text-lg text-muted-foreground">
                    Master your finances with these proven strategies
                </p>
            </div>

            {/* Tips Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {tips.map(({ title, description, icon }) => (
                    <div
                        key={title}
                        className="rounded-2xl bg-base-100 p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-base-300 hover:border-primary/30 hover:scale-105"


                    >
                        <div className="text-4xl mb-4">{icon}</div>
                        <h3 className="font-semibold text-lg text-foreground">{title}</h3>
                        <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                            {description}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default BudgetingTips;
