import ItemCard from "./ItemCard"

export type CategoryProps = {
    id: number;
    name: string;
};

export type StatsProps = {
    name: string;
    value: number;
};

export type ItemProps = {
    id: number;
    name: string;
    stats: StatsProps[];
};

const categories: CategoryProps[] = [
    {
        id: 1000, 
        name: "Top scores",
    },
    {
        id: 1111, 
        name: "Best",
    }
]

const items: ItemProps[] = [
    {
        id: 101,
        name: "placeholder1",
        stats: [
            {
                name: "value1",
                value: 2777
            },
            {
                name: "value2",
                value: 78
            },
            {
                name: "value3",
                value: 30
            }
        ]
    },
    {
        id: 102,
        name: "placeholder2",
        stats: [
            {
                name: "value1",
                value: 27772
            },
            {
                name: "value2",
                value: 782
            },
            {
                name: "value3",
                value: 302
            }
        ]
    },
    {
        id: 103,
        name: "placeholder3",
        stats: [
            {
                name: "value1",
                value: 2777
            },
            {
                name: "value2",
                value: 78
            },
            {
                name: "value3",
                value: 30
            }
        ]
    },
    {
        id: 104,
        name: "placeholder4",
        stats: [
            {
                name: "value1",
                value: 277745454
            },
            {
                name: "value2",
                value: 78
            },
            {
                name: "value3",
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
                <h2 className="text-2xl mb-4 pb-[2px] shadow-md text-purple-600 w-max h1-fade rounded-xl px-3 exo-2-bold">{categorie.name}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {items.map(item => (
                        <ItemCard item={item} key={item.id} />
                    ))}
                </div>
            </div>
        ))}
        </>
    )
} 

export default Categories