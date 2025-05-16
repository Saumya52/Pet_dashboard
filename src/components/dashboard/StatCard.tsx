import React from 'react';
import { StatCard as StatCardType } from '../../types';

interface StatCardProps {
  card: StatCardType;
}

const StatCard: React.FC<StatCardProps> = ({ card }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-md">
      <h3 className="text-gray-500 text-sm font-medium mb-2">{card.title}</h3>
      <p className={`text-3xl font-bold ${card.color}`}>{card.value}</p>
    </div>
  );
};

export default StatCard;