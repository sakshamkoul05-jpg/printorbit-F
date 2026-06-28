'use client';

import Hero from '@/components/sections/Hero';
import TrustedBy from '@/components/sections/TrustedBy';
import PopularCategories from '@/components/sections/PopularCategories';
import FeaturedProducts from '@/components/sections/FeaturedProducts';
import IndustrySolutions from '@/components/sections/IndustrySolutions';
import PrintingProcess from '@/components/sections/PrintingProcess';
import PremiumFinishes from '@/components/sections/PremiumFinishes';
import WhyChooseUs from '@/components/sections/WhyChooseUs';
import BulkPrinting from '@/components/sections/BulkPrinting';
import BusinessSolutions from '@/components/sections/BusinessSolutions';
import Templates from '@/components/sections/Templates';
import CustomerGallery from '@/components/sections/CustomerGallery';
import CustomerReviews from '@/components/sections/CustomerReviews';
import FAQ from '@/components/sections/FAQ';
import LatestBlogs from '@/components/sections/LatestBlogs';
import CTA from '@/components/sections/CTA';
import Newsletter from '@/components/sections/Newsletter';

export default function Home() {
  return (
    <>
      <Hero />
      <TrustedBy />
      <PopularCategories />
      <FeaturedProducts />
      <IndustrySolutions />
      <PrintingProcess />
      <PremiumFinishes />
      <WhyChooseUs />
      <BulkPrinting />
      <BusinessSolutions />
      <Templates />
      <CustomerGallery />
      <CustomerReviews />
      <FAQ />
      <LatestBlogs />
      <CTA />
      <Newsletter />
    </>
  );
}
