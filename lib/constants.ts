// Enum representing various collection colors with corresponding gradient classes
export enum CollectionColors {
    sunset = "bg-gradient-to-r from-red-500 to-orange-500", // Sunset gradient
    poppy = "bg-gradient-to-r from-rose-400 to-red-500", // Poppy gradient
    rosebud = "bg-gradient-to-r from-violet-500 to-purple-500", // Rosebud gradient
    snowflake = "bg-gradient-to-r from-indigo-400 to-cyan-400", // Snowflake gradient
    candy = "bg-gradient-to-r from-yellow-400 via-pink-500 to-red-500", // Candy gradient
    firtree = "bg-gradient-to-r from-emerald-500 to-emerald-900", // Firtree gradient
    metal = "bg-gradient-to-r from-slate-500 to-slate-800", // Metal gradient
    powder = "bg-gradient-to-r from-violet-200 to-pink-200", // Powder gradient
}

// Define a type alias for the key of CollectionColors enum
export type CollectionColor = keyof typeof CollectionColors;
