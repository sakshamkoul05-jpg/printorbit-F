export const AVAILABLE_MOCKUPS = [
  'tshirt', 'hoodie', 'mug', 'bottle', 'business-card', 'poster', 'phone-case',
  'packaging-box', 'canvas-print', 'flyer', 'brochure', 'sticker', 'label',
  'cap', 'shopping-bag', 'letterhead', 'certificate', 'menu', 'banner',
  'roll-up-standee', 'notebook', 'id-card', 'wedding-card', 'invitation',
];

export interface MockupListing {
  id: string;
  name: string;
  category: string;
  description: string;
  available: boolean;
}

export async function discoverMockups(): Promise<MockupListing[]> {
  const results: MockupListing[] = await Promise.all(
    AVAILABLE_MOCKUPS.map(async (id) => {
      try {
        const res = await fetch(`/mockups/${id}/metadata.json`);
        if (!res.ok) return { id, name: id, category: '', description: '', available: false };
        const meta = await res.json();
        return {
          id,
          name: meta.name || id,
          category: meta.category || '',
          description: meta.description || '',
          available: true,
        };
      } catch {
        return { id, name: id, category: '', description: '', available: false };
      }
    }),
  );
  return results.filter(r => r.available);
}
