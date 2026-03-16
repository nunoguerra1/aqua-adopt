interface AdoptersListProps {
    adoptions: { id: string; adopterName: string }[]
}

export function AdoptersList({ adoptions }: AdoptersListProps) {
    if (adoptions.length === 0) return null;

    return (
        <div className="mt-8 p-6 bg-white rounded-2xl border border-blue-100 shadow-sm">
            <h3 className="text-lg font-bold text-blue-900 mb-4 flex items-center gap-2">
                Mural de Heróis ({adoptions.length})
            </h3>
            <div className="flex flex-wrap gap-2">
                {adoptions.map((adm) => (
                    <span
                        key={adm.id}
                        className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium border border-blue-100 animate-in fade-in zoom-in duration-300"
                    >
                        {adm.adopterName}
                    </span>
                ))}
            </div>
        </div>
    );
}