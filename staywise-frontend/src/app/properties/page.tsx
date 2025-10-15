import { IProperty } from '../../types/property';
import SortOptions from '../../components/SortOptions'; 

async function getProperties(): Promise<IProperty[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/properties`, { 
        cache: 'no-store', 
    });
    
    if (!res.ok) throw new Error('Failed to fetch properties');
    return res.json();
  } catch (error) {
    console.error("Error fetching properties:", error);
    return [];
  }
}

export default async function PropertyListPage() {
  const properties = await getProperties();

  return (
    <div className="py-8">
      <h1 className="text-4xl font-serif font-extrabold text-sw-dark mb-10 text-center">
        Our Available Properties
      </h1>
      
        <SortOptions initialProperties={properties} />
    </div>
  );
}