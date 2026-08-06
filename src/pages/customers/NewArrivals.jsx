import React from 'react';
import ProductSection from '../../components/ProductSection';
import TestimonialsSection from '../../components/TestimonialsSection';

const NewArrivals = () => {
  return (
    <div className="space-y-6">
      <ProductSection name="New Arrivals" params={{ PageSize: 12 }} />
      <TestimonialsSection />
    </div>
  );
};

export default NewArrivals;