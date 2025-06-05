import { Product } from "./models/Product";

const words = [
  "Amazing",
  "Super",
  "Mega",
  "Ultra",
  "Pro",
  "Elite",
  "Premium",
  "Deluxe",
  "Basic",
  "Standard",
  "Essential",
  "Classic",
  "Modern",
  "Vintage",
  "Luxury",
  "Smart",
  "Digital",
  "Analog",
  "Wireless",
  "Portable",
  "Compact",
  "Mini",
  "Maxi",
  "Micro",
  "Nano",
  "Quantum",
  "Atomic",
  "Cosmic",
  "Galactic",
  "Stellar",
];

const descriptions = [
  "Innovative",
  "Revolutionary",
  "Cutting-edge",
  "State-of-the-art",
  "Advanced",
  "High-quality",
  "Premium",
  "Professional",
  "Expert",
  "Master",
  "Essential",
  "Necessary",
  "Important",
  "Vital",
  "Crucial",
  "Efficient",
  "Effective",
  "Powerful",
  "Robust",
  "Reliable",
  "Modern",
  "Contemporary",
  "Trendy",
  "Stylish",
  "Elegant",
  "Practical",
  "Functional",
  "Useful",
  "Versatile",
  "Flexible",
];

const getRandomElement = (array: string[]) =>
  array[Math.floor(Math.random() * array.length)];
const getRandomNumber = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const getRandomDate = (start: Date, end: Date) => {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime()),
  );
};

export const seedMockProducts = async () => {
  const startDate = new Date("2020-01-01");
  const endDate = new Date();

  const mockProducts = Array.from({ length: 10 }, () => {
    const createdAt = getRandomDate(startDate, endDate);
    const updatedAt = getRandomDate(createdAt, endDate);

    return {
      title: `${getRandomElement(words)} ${getRandomNumber(100, 999)}`,
      description: `${getRandomElement(descriptions)} ${getRandomElement(words)}`,
      price: getRandomNumber(5, 100),
      createdAt: createdAt,
      updatedAt: updatedAt,
    };
  });

  try {
    await Product.bulkCreate(mockProducts, { validate: true });
    console.log("Mock products seeded successfully.");
  } catch (error) {
    console.error("Failed to seed mock products:", error);
  }
};
