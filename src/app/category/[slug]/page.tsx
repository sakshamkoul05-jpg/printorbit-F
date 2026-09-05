import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {
  ALL_CATEGORIES,
  getCategory,
  getDepartmentForCategory,
} from '@/lib/catalog';
import CategoryListing from './CategoryListing';

export function generateStaticParams() {
  return ALL_CATEGORIES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) return { title: 'Category not found | PrintOrbit' };
  return {
    title: `${category.name} | Custom Printing Online | PrintOrbit`,
    description: category.description,
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) notFound();

  return (
    <CategoryListing
      category={category}
      department={getDepartmentForCategory(slug)}
    />
  );
}
