import React from 'react';
import { LuDownload } from 'react-icons/lu';
import TransactionInfoCard from '../Cards/TransactionInfoCard';
import moment from 'moment';

const IncomeList = ({ transactions, onDelete, onDownload }) => {
  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <h5 className="text-lg">Income Sources</h5>

        <button className="card-btn" onClick={onDownload}>
          <LuDownload className="text-base" /> Download
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3">
        {transactions?.map((income, index) => (
          <TransactionInfoCard
            key={income._id || `income-${index}`}
            // ✅ Use correct backend fields instead of hardcoded "source"
            title={income.title || income.source || 'Untitled'}
            icon={income.icon || income.category?.icon || null}
            date={moment(income.date).format('Do MMM YYYY')}
            amount={income.amount}
            type="income"
            // onDelete={() => onDelete(income._id)}
            onDelete={() => {
              console.log("Deleting income with id:", income.id);  // Add this
              onDelete(income.id);
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default IncomeList;
