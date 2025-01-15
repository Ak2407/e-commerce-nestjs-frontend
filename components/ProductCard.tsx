type ProductCardProps = {
  name: string;
  description: string;
  price: number;
  category: string;
};

const ProductCard = ({
  name,
  description,
  price,
  category,
}: ProductCardProps) => {
  return (
    <div className="flex flex-col border border-zinc-300 rounded-lg p-4 gap-2">
      <h1 className="text-xl font-bold">{name}</h1>
      <div className="flex flex-row gap-2 text-slate-600 italic">
        <p>{description}</p>
        <p>|</p>
        <p>{price}</p>
        <p>|</p>
        <p>{category}</p>
      </div>
    </div>
  );
};

export default ProductCard;
