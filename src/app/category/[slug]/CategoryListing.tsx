'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { ChevronRight, SlidersHorizontal } from 'lucide-react';
import ProductGridCard from '@/components/products/ProductGridCard';
import type { CatalogCategory, CatalogProduct, Department } from '@/lib/catalog';

const SORTS = [
  { value: 'relevance', label: 'Relevance' },
  { value: 'price_asc', label: 'Low to High' },
  { value: 'price_desc', label: 'High to Low' },
  { value: 'bestsellers', label: 'Best Sellers' },
  { value: 'latest', label: 'Latest' },
] as const;

type SortValue = (typeof SORTS)[number]['value'];

export default function CategoryListing({
  category,
  department,
}: {
  category: CatalogCategory;
  department?: Department;
}) {
  const products = category.products;

  const priceBounds = useMemo(() => {
    const prices = products.map((p) => p.price);
    return { min: Math.min(...prices), max: Math.max(...prices) };
  }, [products]);

  const [maxPrice, setMaxPrice] = useState(priceBounds.max);
  const [sort, setSort] = useState<SortValue>('relevance');
  const [sizeFilter, setSizeFilter] = useState<string | null>(null);
  const [labelFilter, setLabelFilter] = useState<string | null>(null);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const sizes = useMemo(
    () => [...new Set(products.flatMap((p) => p.sizes))],
    [products],
  );
  const labels = useMemo(
    () => [...new Set(products.flatMap((p) => p.labels))],
    [products],
  );

  const visible = useMemo(() => {
    let list: CatalogProduct[] = products.filter((p) => p.price <= maxPrice);
    if (sizeFilter) list = list.filter((p) => p.sizes.includes(sizeFilter));
    if (labelFilter) list = list.filter((p) => (p.labels as string[]).includes(labelFilter));

    const sorted = [...list];
    if (sort === 'price_asc') sorted.sort((a, b) => a.price - b.price);
    else if (sort === 'price_desc') sorted.sort((a, b) => b.price - a.price);
    else if (sort === 'bestsellers') sorted.sort((a, b) => b.reviews - a.reviews);
    else if (sort === 'latest') sorted.reverse();
    return sorted;
  }, [products, maxPrice, sizeFilter, labelFilter, sort]);

  const resetFilters = () => {
    setMaxPrice(priceBounds.max);
    setSizeFilter(null);
    setLabelFilter(null);
    setSort('relevance');
  };

  const filtersActive =
    maxPrice !== priceBounds.max || sizeFilter !== null || labelFilter !== null;

  return (
    <div style={{ backgroundColor: '#F4F2EF', minHeight: '70vh' }}>
      {/* breadcrumb */}
      <div className="bg-white border-bottom">
        <div className="container py-2">
          <nav className="d-flex align-items-center flex-wrap gap-1" style={{ fontSize: 12, color: '#6D6D6D' }}>
            <Link href="/" className="text-decoration-none" style={{ color: '#6D6D6D' }}>Home</Link>
            <ChevronRight size={12} />
            {department && (
              <>
                <Link href={`/shop/${department.slug}`} className="text-decoration-none" style={{ color: '#6D6D6D' }}>
                  {department.name}
                </Link>
                <ChevronRight size={12} />
              </>
            )}
            <span style={{ color: '#0F0F0F', fontWeight: 600 }}>{category.name}</span>
          </nav>
        </div>
      </div>

      <div className="container py-4">
        <h1 className="fw-bold mb-2" style={{ fontSize: '1.75rem', color: '#0F0F0F' }}>
          {category.name}
        </h1>
        <p className="mb-4" style={{ color: '#505050', maxWidth: '62ch', fontSize: '0.9375rem' }}>
          {category.description}
        </p>

        <button
          className="btn btn-sm d-lg-none mb-3 d-inline-flex align-items-center gap-2"
          style={{ border: '1px solid #E0DED9', backgroundColor: '#fff' }}
          onClick={() => setFiltersOpen((v) => !v)}
        >
          <SlidersHorizontal size={14} />
          Filters
        </button>

        <div className="row g-4">
          {/* ---- filters ------------------------------------------------- */}
          <aside className={`col-lg-3 ${filtersOpen ? '' : 'd-none d-lg-block'}`}>
            <div className="bg-white rounded-3 p-3" style={{ border: '1px solid #E5E5E5' }}>
              <div className="d-flex align-items-center justify-content-between mb-3">
                <h2 className="mb-0" style={{ fontSize: '0.875rem', fontWeight: 700, color: '#0F0F0F' }}>
                  Filters
                </h2>
                {filtersActive && (
                  <button className="btn btn-sm p-0 border-0" style={{ fontSize: 12, color: '#ED1C24' }} onClick={resetFilters}>
                    Clear all
                  </button>
                )}
              </div>

              <div className="mb-4">
                <h3 style={{ fontSize: 13, fontWeight: 600, color: '#0F0F0F' }}>Price</h3>
                <div style={{ fontSize: 12, color: '#6D6D6D' }} className="mb-2">
                  ₹ {priceBounds.min.toLocaleString('en-IN')}.00 – ₹ {maxPrice.toLocaleString('en-IN')}.00
                </div>
                <input
                  type="range"
                  className="form-range"
                  min={priceBounds.min}
                  max={priceBounds.max}
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  aria-label="Maximum price"
                />
              </div>

              <div className="mb-4">
                <h3 style={{ fontSize: 13, fontWeight: 600, color: '#0F0F0F' }}>Sort By</h3>
                {SORTS.map((s) => (
                  <label key={s.value} className="d-flex align-items-center gap-2 mb-1" style={{ fontSize: 13, color: '#505050' }}>
                    <input
                      type="radio"
                      name="sort"
                      className="form-check-input mt-0"
                      checked={sort === s.value}
                      onChange={() => setSort(s.value)}
                    />
                    {s.label}
                  </label>
                ))}
              </div>

              {sizes.length > 1 && (
                <div className="mb-4">
                  <h3 style={{ fontSize: 13, fontWeight: 600, color: '#0F0F0F' }}>Size</h3>
                  {sizes.map((s) => (
                    <label key={s} className="d-flex align-items-center gap-2 mb-1" style={{ fontSize: 13, color: '#505050' }}>
                      <input
                        type="checkbox"
                        className="form-check-input mt-0"
                        checked={sizeFilter === s}
                        onChange={() => setSizeFilter(sizeFilter === s ? null : s)}
                      />
                      {s}
                    </label>
                  ))}
                </div>
              )}

              <div className="mb-2">
                <h3 style={{ fontSize: 13, fontWeight: 600, color: '#0F0F0F' }}>Brand</h3>
                <label className="d-flex align-items-center gap-2 mb-1" style={{ fontSize: 13, color: '#505050' }}>
                  <input type="checkbox" className="form-check-input mt-0" checked readOnly />
                  PrintOrbit
                </label>
              </div>

              {labels.length > 0 && (
                <div>
                  <h3 style={{ fontSize: 13, fontWeight: 600, color: '#0F0F0F' }}>Labels</h3>
                  {labels.map((l) => (
                    <label key={l} className="d-flex align-items-center gap-2 mb-1" style={{ fontSize: 13, color: '#505050' }}>
                      <input
                        type="checkbox"
                        className="form-check-input mt-0"
                        checked={labelFilter === l}
                        onChange={() => setLabelFilter(labelFilter === l ? null : l)}
                      />
                      {l}
                    </label>
                  ))}
                </div>
              )}
            </div>
          </aside>

          {/* ---- grid ---------------------------------------------------- */}
          <div className="col-lg-9">
            <div className="d-flex align-items-center justify-content-between mb-3">
              <span style={{ fontSize: 13, color: '#6D6D6D' }}>
                {visible.length} {visible.length === 1 ? 'product' : 'products'}
              </span>
              <select
                className="form-select form-select-sm"
                style={{ width: 170, fontSize: 13 }}
                value={sort}
                onChange={(e) => setSort(e.target.value as SortValue)}
                aria-label="Sort products"
              >
                {SORTS.map((s) => (
                  <option key={s.value} value={s.value}>
                    Sort: {s.label}
                  </option>
                ))}
              </select>
            </div>

            {visible.length === 0 ? (
              <div className="bg-white rounded-3 p-5 text-center" style={{ border: '1px solid #E5E5E5' }}>
                <p className="mb-3" style={{ color: '#505050' }}>No products match these filters.</p>
                <button className="btn btn-sm" style={{ backgroundColor: '#ED1C24', color: '#fff' }} onClick={resetFilters}>
                  Clear filters
                </button>
              </div>
            ) : (
              <div className="row g-3">
                {visible.map((p) => (
                  <div key={p.slug} className="col-6 col-md-4">
                    <ProductGridCard product={p} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
