
import React from 'react';
import { PRICING_PLANS } from '../constants';
import type { Plan } from '../types';

const CheckIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
    </svg>
);


const PricingCard: React.FC<{ plan: Plan }> = ({ plan }) => (
    <div className={`relative p-8 bg-gray-900/50 rounded-2xl border border-gray-800/70 transition-all duration-300 flex flex-col ${plan.isPopular ? 'border-cyan-500 shadow-2xl shadow-cyan-500/20' : 'hover:border-gray-600'}`}>
        {plan.isPopular && (
            <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 px-4 py-1 text-sm font-semibold text-white bg-red-600 rounded-full">
                Most Popular
            </div>
        )}
        <div className="flex-grow">
            <div className="text-center mb-8">
                <div className="inline-block mb-4">{plan.icon}</div>
                <h3 className="text-2xl font-bold text-white">{plan.name}</h3>
                <p className="mt-2 text-gray-400">{plan.description}</p>
                <p className="mt-6">
                    <span className="text-4xl font-extrabold text-white">{plan.price}</span>
                    <span className="text-base font-medium text-gray-500">{plan.priceUnit}</span>
                </p>
            </div>
            <ul className="space-y-4">
                {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                        <CheckIcon />
                        <span className="ml-3 text-gray-300">{feature}</span>
                    </li>
                ))}
            </ul>
        </div>
        <div className="mt-8">
            <button className={`w-full py-3 px-6 font-semibold rounded-lg transition-transform duration-200 transform hover:scale-105 ${plan.buttonClass}`}>
                {plan.buttonText}
            </button>
        </div>
    </div>
);


const PricingView: React.FC = () => {
    return (
        <div className="space-y-8">
            <div className="text-center">
                <h1 className="text-4xl md:text-5xl font-bold text-white">
                    <span className="text-cyan-400">Choose Your Plan</span>
                </h1>
                <p className="mt-2 text-lg text-gray-400 max-w-2xl mx-auto">Select the perfect plan to match your ambition. Go from learner to beast.</p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {PRICING_PLANS.map(plan => (
                    <PricingCard key={plan.name} plan={plan} />
                ))}
            </div>
        </div>
    );
};

export default PricingView;
