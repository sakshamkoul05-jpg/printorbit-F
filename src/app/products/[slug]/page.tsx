import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {
  ALL_PRODUCTS,
  getProduct,
  getCategory,
  getDepartmentForCategory,
  relatedProducts,
} from '@/lib/catalog';
import ProductDetail from './ProductDetail';

export function generateStaticParams() {
  return ALL_PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return { title: 'Product not found | PrintOrbit' };
  return {
    title: `${product.name} | Customised Printing Online | PrintOrbit`,
    description: product.summary,
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const category = getCategory(product.category);

  return (
    <ProductDetail
      product={product}
      department={getDepartmentForCategory(product.category)}
      categoryName={category?.name ?? 'Products'}
      related={relatedProducts(product, 4)}
    />
  );
}
