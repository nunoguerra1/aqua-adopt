interface AnimalCardProps {
    name: string;
    species: string;
    image: string;
    status: string;
}

export function AnimalCard({ name, species, image, status }: AnimalCardProps) {
    return (
        <div className="border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow bg-white">
            <img src={image} alt={name} className="w-full h-48 object-cover" />
            <div className="p-4">
                <div className="flex justify-between items-start">
                    <h3 className="text-xl font-bold text-blue-900">{name}</h3>
                    <span className="text-xs font-semibold px-2 py-1 rounded bg-blue-100 text-blue-800">
                        {status}
                    </span>
                </div>
                <p className="text-gray-600 text-sm mt-1">{species}</p>
                <button className="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                    Apadrinhar
                </button>
            </div>
        </div>
    );
}