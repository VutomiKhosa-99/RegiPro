import React, { createContext, useContext, useState } from 'react';
import { businessService } from '../services/businessService';

interface Business {
  id: string;
  name: string;
  industry: string;
  description: string;
  isRegistered: string;
  hasBusinessPlan: string;
  businessPlanUrl?: string;
}

interface BusinessContextType {
  businesses: Business[];
  loading: boolean;
  fetchBusinesses: () => Promise<void>;
  createBusiness: (businessData: Omit<Business, 'id'>) => Promise<Business>;
  getBusinessById: (id: string) => Promise<Business>;
}

const BusinessContext = createContext<BusinessContextType | undefined>(undefined);

export const useBusiness = () => {
  const context = useContext(BusinessContext);
  if (!context) {
    throw new Error('useBusiness must be used within a BusinessProvider');
  }
  return context;
};

export const BusinessProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchBusinesses = async () => {
    setLoading(true);
    try {
      const data = await businessService.getBusinesses();
      setBusinesses(data);
    } catch (error) {
      console.error('Error fetching businesses:', error);
    } finally {
      setLoading(false);
    }
  };

  const createBusiness = async (businessData: Omit<Business, 'id'>) => {
    try {
      const newBusiness = await businessService.createBusiness(businessData);
      setBusinesses(prev => [...prev, newBusiness]);
      return newBusiness;
    } catch (error) {
      throw error;
    }
  };

  const getBusinessById = async (id: string) => {
    try {
      return await businessService.getBusinessById(id);
    } catch (error) {
      throw error;
    }
  };

  return (
    <BusinessContext.Provider value={{
      businesses,
      loading,
      fetchBusinesses,
      createBusiness,
      getBusinessById,
    }}>
      {children}
    </BusinessContext.Provider>
  );
};