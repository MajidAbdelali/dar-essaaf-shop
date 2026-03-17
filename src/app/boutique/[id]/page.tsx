import { getProductById, getRelatedProducts } from '@/lib/products';
import { notFound } from 'next/navigation';
import ProductDetail from '@/components/ProductDetail';

interface Props {
  params: { id: string };
}

export default function ProductPage({ params }: Props) {
  const product = getProductById(params.id);
  if (!product) notFound();

  const related = getRelatedProducts(product.id, product.category);

  return <ProductDetail product={product} related={related} />;
}
