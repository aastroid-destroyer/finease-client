import React, { useContext } from 'react';
import Banner from '../components/Banner';
import OverviewCards from '../components/Overview';
import BudgetingTips from '../components/BudgetingTips';
import { AuthContext } from '../conext/AuthContext';
import FinancialPlanningInfo from '../components/FinancialPlan';
import FinanceMarquee from '../components/FinanceMarquee';


const Home = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className='min-h-screen'>
      <Banner />
        {user && <OverviewCards />}
        <BudgetingTips />
        <FinanceMarquee/>
      <FinancialPlanningInfo />
    </div>
  );
};

export default Home;
