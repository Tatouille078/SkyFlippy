import ItemCard from "./ItemCard"

const categories = [
    {
        id: 1, 
        name: "Top score",
    },
    {
        id: 3, 
        name: "Best",
    }
]

const items = [
    {
        id: 1,
        name: "sexe",
        stats: [
            {
                name: "cost",
                value: 2777
            },
            {
                name: "sexe",
                value: 78
            },
            {
                name: "feur",
                value: 30
            }
        ]
    },
    {
        id: 2,
        name: "sexe2",
        stats: [
            {
                name: "cost",
                value: 27772
            },
            {
                name: "sexe",
                value: 782
            },
            {
                name: "feur",
                value: 302
            }
        ]
    },
    {
        id: 1,
        name: "caca1",
        stats: [
            {
                name: "cost",
                value: 2777
            },
            {
                name: "sexe",
                value: 78
            },
            {
                name: "feur",
                value: 30
            }
        ]
    },
    {
        id: 1,
        name: "caca2",
        stats: [
            {
                name: "cost",
                value: 2777
            },
            {
                name: "sexe",
                value: 78
            },
            {
                name: "feur",
                value: 30
            }
        ]
    }
]

const Categories = () => {
    return (
        <>
        {categories.map(categorie => (
            <div className="mb-12" key={categorie.id}>
                <h2 className="text-2xl font-semibold mb-4 text-purple-600">{categorie.name}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {items.map(item => (
                        <ItemCard item={item}/>
                    ))}
                </div>
            </div>
        ))}
        </>
    )
} 

export default Categories