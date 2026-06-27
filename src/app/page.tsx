'use client';

import Hero from '@/components/sections/Hero';
import TrustedBy from '@/components/sections/TrustedBy';
import PopularCategories from '@/components/sections/PopularCategories';
import FeaturedProducts from '@/components/sections/FeaturedProducts';
import PrintingProcess from '@/components/sections/PrintingProcess';
import WhyChooseUs from '@/components/sections/WhyChooseUs';
import CustomerReviews from '@/components/sections/CustomerReviews';
import CTA from '@/components/sections/CTA';
import Newsletter from '@/components/sections/Newsletter';

export default function Home() {
  return (
    <>
      <Hero />
      <TrustedBy />
      <PopularCategories />
      <FeaturedProducts />
      <PrintingProcess />
      <WhyChooseUs />
      <CustomerReviews />
      <CTA />
      <Newsletter />
    </>
  );
}
