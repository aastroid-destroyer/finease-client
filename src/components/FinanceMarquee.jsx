import React from 'react'
import Marquee from 'react-fast-marquee'

export default function FinanceMarquee({
    items = [
        { title: 'Investment Management', value: '', hint: 'Grow & manage assets', icon: '📈' },
        { title: 'Insurance Consulting', value: '', hint: 'Risk & policy guidance', icon: '🛡️' },
        { title: 'Audit Assurance', value: '', hint: 'Compliance & verification', icon: '✅' },
        { title: 'Financial Projections', value: '', hint: 'Forecasting & modeling', icon: '📊' },
        { title: 'Business Planning', value: '', hint: 'Strategic financial setup', icon: '📋' },
        { title: 'Tax Advisory', value: '', hint: 'Optimize tax strategies', icon: '💰' },
        { title: 'Retirement Planning', value: '', hint: 'Secure future finances', icon: '🏖️' },
        { title: 'Cash Flow Management', value: '', hint: 'Optimize liquidity & operations', icon: '💵' },
        { title: 'Mergers & Acquisitions', value: '', hint: 'Strategic business growth', icon: '🤝' },
        { title: 'Debt Management', value: '', hint: 'Reduce & control liabilities', icon: '📉' }
    ],
    speed = 60,
    pauseOnHover = true,
    gradient = true,
}) {
    return (
        <div className="w-full relative overflow-hidden bg-[#644dff] shadow-[0_8px_0_#4836bb]">
            {/* Subtle pattern overlay */}
            <div className="absolute inset-0 opacity-5">
                <div className="h-full w-full" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
                }}></div>
            </div>
            
            {/* Decorative gradient overlays */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
            <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
            
            {/* Marquee content */}
            <div className="relative z-10 py-4">
                <Marquee speed={speed} pauseOnHover={pauseOnHover} gradient={gradient} gradientColor={[100, 77, 255]} gradientWidth={80}>
                    <div className="flex space-x-6 items-center px-4">
                        {items.map((it, idx) => (
                            <div
                                key={idx}
                                className="flex-shrink-0 min-w-[240px] sm:min-w-[280px] md:min-w-[320px] px-6 py-4 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/15 hover:shadow-xl hover:shadow-[#4836bb]/30 transition-all duration-300 transform hover:-translate-y-1"
                            >
                                <div className="flex items-start justify-between">
                                    <div className="flex items-center">
                                        <span className="text-2xl mr-3 filter drop-shadow-sm">{it.icon}</span>
                                        <div>
                                            <div className="text-sm font-bold text-white tracking-wide">{it.title}</div>
                                            <div className="w-10 h-0.5 bg-gradient-to-r from-green-400 to-emerald-400 mt-1.5 rounded-full"></div>
                                        </div>
                                    </div>
                                    <div className="flex items-center">
                                        <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-green-400 to-emerald-400 shadow-lg shadow-green-400/50 animate-pulse"></div>
                                    </div>
                                </div>

                                <div className="mt-3 flex items-baseline gap-3">
                                    {it.delta && (
                                        <div className={`text-sm font-semibold ${it.delta.startsWith('+') ? 'text-green-300' : 'text-red-300'} drop-shadow-sm`}>
                                            {it.delta}
                                        </div>
                                    )}
                                </div>

                                {it.hint && <div className="mt-2 text-xs text-white/80 font-medium">{it.hint}</div>}
                            </div>
                        ))}
                    </div>
                </Marquee>
            </div>
        </div>
    )
}