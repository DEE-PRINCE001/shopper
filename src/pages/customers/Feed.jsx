import React from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductSection from '../../components/ProductSection';
import TestimonialsSection from '../../components/TestimonialsSection';

const Feed = () => {
  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get('search') || '';

  const params = {};
  if (searchTerm) {
    params.SearchTerm = searchTerm;
  }

  const sectionTitle = searchTerm ? `Search Results for "${searchTerm}"` : 'All Feeds & Products';

  return (
    <div className="space-y-6">
      <ProductSection name={sectionTitle} params={params} />
      <TestimonialsSection />
    </div>
  );
};

export default Feed;