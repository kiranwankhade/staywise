import { IProperty } from '../../types/property';
import PropertyCard from '../../components/PropertyCard';

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
      
      {properties.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {properties.map((property) => (
            <PropertyCard key={property._id} property={property} />
          ))}
        </div>
      ) : (
        <div className="bg-white p-10 rounded-xl shadow-xl text-center text-gray-500">
          <p className="text-xl">No properties are available at the moment.</p>
        </div>
      )}
    </div>
  );
}