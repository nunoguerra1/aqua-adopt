import Link from 'next/link';

interface AnimalCardProps {
    id: string;
    name: string;
    species: string;
    image: string;
    status: string;
}

export function AnimalCard({ id, name, species, image, status }: AnimalCardProps) {
    return (
        <div className="border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all bg-white flex flex-col">
            <img src={image} alt={name} className="w-full h-48 object-cover" />

            <div className="p-4 flex-1 flex flex-col">
                <div className="flex justify-between items-start">
                    <h3 className="text-xl font-bold text-blue-900">{name}</h3>
                    <span className="text-xs font-semibold px-2 py-1 rounded bg-blue-100 text-blue-800">
                        {status}
                    </span>
                </div>

                <p className="text-gray-600 text-sm mt-1 mb-4">{species}</p>

                <div className="mt-auto space-y-2">
                    <Link href={`/animals/${id}`}>
                        <button className="w-full bg-blue-50 text-blue-600 py-2 rounded-lg font-medium hover:bg-blue-100 transition-colors">
                            Ver detalhes
                        </button>
                    </Link>

                    <button className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                        Apadrinhar
                    </button>
                </div>
            </div>
        </div>
    );
}